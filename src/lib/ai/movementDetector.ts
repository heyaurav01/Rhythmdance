import { Landmark3D, MovementDefinition, MovementStage } from "@/types/practice";
import {
  calculateShoulderElevation,
  calculateElbowAngle,
  calculateTorsoIncline,
} from "./geometry";

export interface MovementDetectionState {
  stage: MovementStage;
  currentArmAngle: number;
  currentElbowAngle: number;
  expectedArmAngle: number;
  expectedElbowAngle: number;
  angleError: number;
  torsoIncline: number;
  holdDurationMs: number;
  stageStartTimeMs: number;
  repsCompleted: number;
  feedbackText: string;
  isPeakReached: boolean;
}

export class MovementDetector {
  private definition: MovementDefinition;
  private state: MovementDetectionState;
  private lastTimestampMs: number = 0;
  private peakHoldMs: number = 0;
  private stageHistory: MovementStage[] = [];

  constructor(definition: MovementDefinition) {
    this.definition = definition;
    this.state = {
      stage: "not_started",
      currentArmAngle: 0,
      currentElbowAngle: 0,
      expectedArmAngle: definition.targetAngles.rightShoulderElevation.ideal,
      expectedElbowAngle: definition.targetAngles.rightElbowFlexion.ideal,
      angleError: 0,
      torsoIncline: 0,
      holdDurationMs: 0,
      stageStartTimeMs: 0,
      repsCompleted: 0,
      feedbackText: "Stand in frame to begin practice.",
      isPeakReached: false,
    };
  }

  public reset(newDefinition?: MovementDefinition) {
    if (newDefinition) {
      this.definition = newDefinition;
    }
    this.state = {
      stage: "not_started",
      currentArmAngle: 0,
      currentElbowAngle: 0,
      expectedArmAngle: this.definition.targetAngles.rightShoulderElevation.ideal,
      expectedElbowAngle: this.definition.targetAngles.rightElbowFlexion.ideal,
      angleError: 0,
      torsoIncline: 0,
      holdDurationMs: 0,
      stageStartTimeMs: 0,
      repsCompleted: 0,
      feedbackText: "Stand in frame to begin practice.",
      isPeakReached: false,
    };
    this.peakHoldMs = 0;
    this.stageHistory = [];
  }

  public update(
    landmarks: Landmark3D[],
    timestampMs: number
  ): MovementDetectionState {
    const dt = this.lastTimestampMs > 0 ? timestampMs - this.lastTimestampMs : 16;
    this.lastTimestampMs = timestampMs;

    const rightHip = landmarks[24];
    const rightShoulder = landmarks[12];
    const rightElbow = landmarks[14];
    const rightWrist = landmarks[16];
    const leftShoulder = landmarks[11];
    const leftHip = landmarks[23];

    if (!rightHip || !rightShoulder || !rightElbow || !rightWrist) {
      this.state.feedbackText = "Body not detected. Move into camera frame.";
      return { ...this.state };
    }

    // Calculate real measured angles
    const armAngle = calculateShoulderElevation(rightHip, rightShoulder, rightElbow);
    const elbowAngle = calculateElbowAngle(rightShoulder, rightElbow, rightWrist);
    const torsoIncline = calculateTorsoIncline(
      leftShoulder,
      rightShoulder,
      leftHip,
      rightHip
    );

    const targetElevation = this.definition.targetAngles.rightShoulderElevation;
    const targetElbow = this.definition.targetAngles.rightElbowFlexion;

    // Angle error relative to ideal target
    const angleError = Math.abs(armAngle - targetElevation.ideal);

    this.state.currentArmAngle = armAngle;
    this.state.currentElbowAngle = elbowAngle;
    this.state.torsoIncline = torsoIncline;
    this.state.angleError = angleError;

    // State machine transitions for Right Arm Raise / Arm Elevation
    const prevStage = this.state.stage;

    switch (this.state.stage) {
      case "not_started":
        if (armAngle < 45) {
          this.state.feedbackText = "Ready! Smoothly raise your right arm outward.";
        }
        if (armAngle >= 45 && armAngle < 85) {
          this.transitionTo("starting", timestampMs);
          this.state.feedbackText = "Starting movement: keep raising your arm.";
        }
        break;

      case "starting":
        if (armAngle >= 85 && armAngle < targetElevation.min) {
          this.transitionTo("raising", timestampMs);
          this.state.feedbackText = "Raising arm: lift higher towards shoulder/ear level.";
        } else if (armAngle < 35) {
          this.transitionTo("not_started", timestampMs);
        }
        break;

      case "raising":
        if (armAngle >= targetElevation.min) {
          this.transitionTo("extended", timestampMs);
          this.state.isPeakReached = true;
          this.peakHoldMs = 0;
          this.state.feedbackText = "Peak reached! Hold the extension.";
        } else if (armAngle < 60) {
          this.transitionTo("starting", timestampMs);
        } else {
          const delta = targetElevation.ideal - armAngle;
          if (delta > 15) {
            this.state.feedbackText = `Raise your right arm higher (currently ${armAngle}° / target ${targetElevation.ideal}°).`;
          } else {
            this.state.feedbackText = "Good elevation! Approaching ideal line.";
          }
        }
        break;

      case "extended":
        if (armAngle >= targetElevation.min - 10) {
          this.peakHoldMs += dt;
          this.state.holdDurationMs = this.peakHoldMs;

          // Check elbow alignment
          if (elbowAngle < targetElbow.min) {
            this.state.feedbackText = `Straighten your right elbow (currently ${elbowAngle}° / ideal ${targetElbow.ideal}°).`;
          } else if (torsoIncline > 10) {
            this.state.feedbackText = "Keep your spine upright and avoid leaning sideways.";
          } else {
            this.state.feedbackText = "Excellent alignment! Now lower your arm smoothly.";
          }

          if (this.peakHoldMs > 600) {
            // Once held sufficiently, ready to return
            this.state.feedbackText = "Hold completed! Return arm to starting position.";
          }
        } else if (armAngle < targetElevation.min - 15) {
          this.transitionTo("returning", timestampMs);
          this.state.feedbackText = "Returning to center position.";
        }
        break;

      case "returning":
        if (armAngle <= 45 && this.state.isPeakReached) {
          this.transitionTo("completed", timestampMs);
          this.state.repsCompleted += 1;
          this.state.isPeakReached = false;
          this.state.feedbackText = "Movement cycle completed! Great repetition.";
        } else if (armAngle > targetElevation.min) {
          this.transitionTo("extended", timestampMs);
        } else {
          this.state.feedbackText = "Lowering arm smoothly...";
        }
        break;

      case "completed":
        // Reset to not_started after short pause
        if (timestampMs - this.state.stageStartTimeMs > 800) {
          this.transitionTo("not_started", timestampMs);
          this.state.feedbackText = "Ready for next rep. Raise arm again.";
        }
        break;
    }

    return { ...this.state };
  }

  private transitionTo(nextStage: MovementStage, timestampMs: number) {
    this.stageHistory.push(this.state.stage);
    this.state.stage = nextStage;
    this.state.stageStartTimeMs = timestampMs;
  }

  public getState(): MovementDetectionState {
    return { ...this.state };
  }
}
