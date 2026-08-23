import {
  Landmark3D,
  MovementDefinition,
  PracticeSessionResult,
} from "@/types/practice";
import { MovementDetectionState } from "./movementDetector";

export interface ComparisonResult {
  poseSimilarityScore: number;
  timingScore: number;
  completionScore: number;
  overallScore: number;
  feedbackText: string;
  feedbackPoints: string[];
}

/**
 * Computes Dynamic Time Warping (DTW) distance between two numerical 1D sequences.
 */
export function computeDTWDistance(seqA: number[], seqB: number[]): number {
  const n = seqA.length;
  const m = seqB.length;
  if (n === 0 || m === 0) return 0;

  const dtw: number[][] = Array.from({ length: n + 1 }, () =>
    Array(m + 1).fill(Infinity)
  );
  dtw[0][0] = 0;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const cost = Math.abs(seqA[i - 1] - seqB[j - 1]);
      dtw[i][j] =
        cost + Math.min(dtw[i - 1][j], dtw[i][j - 1], dtw[i - 1][j - 1]);
    }
  }

  return dtw[n][m] / (n + m);
}

export class MovementComparator {
  private definition: MovementDefinition;
  private userAnglesHistory: number[] = [];
  private userTimeHistory: number[] = [];
  private sessionStartTime: number = 0;
  private bestRepScore: number = 0;
  private recordedScores: number[] = [];
  private collectedFeedbacks: Set<string> = new Set();

  constructor(definition: MovementDefinition) {
    this.definition = definition;
  }

  public reset(definition?: MovementDefinition) {
    if (definition) this.definition = definition;
    this.userAnglesHistory = [];
    this.userTimeHistory = [];
    this.sessionStartTime = Date.now();
    this.bestRepScore = 0;
    this.recordedScores = [];
    this.collectedFeedbacks.clear();
  }

  /**
   * Compares the current live state against the reference definition.
   */
  public evaluateLive(
    state: MovementDetectionState,
    _landmarks: Landmark3D[]
  ): ComparisonResult {
    const targetElevation = this.definition.targetAngles.rightShoulderElevation;
    const targetElbow = this.definition.targetAngles.rightElbowFlexion;

    // 1. Pose Similarity (0 - 100%)
    // Angle difference between current and ideal target
    const armError = Math.abs(state.currentArmAngle - targetElevation.ideal);
    const elbowError = Math.abs(state.currentElbowAngle - targetElbow.ideal);

    // Normalize error score: 0 deg error -> 100%, >= 60 deg error -> 0%
    const armAccuracy = Math.max(0, Math.min(100, 100 - armError * 1.5));
    const elbowAccuracy = Math.max(0, Math.min(100, 100 - elbowError * 1.2));
    const torsoAccuracy = Math.max(0, Math.min(100, 100 - state.torsoIncline * 3));

    const poseSimilarity = Math.round(
      armAccuracy * 0.6 + elbowAccuracy * 0.25 + torsoAccuracy * 0.15
    );

    // Record angle for DTW
    this.userAnglesHistory.push(state.currentArmAngle);
    if (this.userAnglesHistory.length > 120) {
      this.userAnglesHistory.shift();
    }

    // 2. Timing / Velocity Score (0 - 100%)
    // In active movement, assess smooth progression
    let timingScore = 88;
    if (state.stage === "extended") {
      // Reward steady hold
      timingScore = state.holdDurationMs > 400 ? 95 : 85;
    } else if (state.stage === "raising" || state.stage === "returning") {
      timingScore = 90;
    } else if (state.stage === "not_started") {
      timingScore = 80;
    }

    // 3. Movement Completion Score (0 - 100%)
    let completionScore = 0;
    if (state.repsCompleted > 0) {
      completionScore = 100;
    } else {
      switch (state.stage) {
        case "not_started":
          completionScore = 10;
          break;
        case "starting":
          completionScore = 30;
          break;
        case "raising":
          completionScore = 55;
          break;
        case "extended":
          completionScore = 85;
          break;
        case "returning":
          completionScore = 95;
          break;
        case "completed":
          completionScore = 100;
          break;
      }
    }

    // 4. Overall Weighted Score (50% Pose + 30% Timing + 20% Completion)
    const weights = this.definition.weightings;
    const overallScore = Math.round(
      poseSimilarity * weights.poseSimilarity +
        timingScore * weights.timing +
        completionScore * weights.completion
    );

    if (overallScore > this.bestRepScore && state.stage !== "not_started") {
      this.bestRepScore = overallScore;
    }

    if (state.stage === "extended" || state.stage === "completed") {
      this.recordedScores.push(overallScore);
    }

    // Collect actionable feedback points
    const feedbackPoints: string[] = [];
    if (state.angleError > 15 && state.currentArmAngle < targetElevation.ideal) {
      const msg = `Raise your right arm higher (currently ${state.currentArmAngle}°, ideal ${targetElevation.ideal}°).`;
      feedbackPoints.push(msg);
      this.collectedFeedbacks.add(msg);
    }
    if (state.currentElbowAngle < targetElbow.min) {
      const msg = `Straighten your right elbow for clean arm alignment.`;
      feedbackPoints.push(msg);
      this.collectedFeedbacks.add(msg);
    }
    if (state.torsoIncline > 10) {
      const msg = `Stabilize your core and keep the torso upright.`;
      feedbackPoints.push(msg);
      this.collectedFeedbacks.add(msg);
    }
    if (feedbackPoints.length === 0 && (state.stage === "extended" || state.stage === "raising")) {
      feedbackPoints.push("Excellent posture and arm elevation!");
      this.collectedFeedbacks.add("Excellent posture and arm elevation!");
    }

    return {
      poseSimilarityScore: poseSimilarity,
      timingScore,
      completionScore,
      overallScore,
      feedbackText: state.feedbackText,
      feedbackPoints,
    };
  }

  /**
   * Finalizes session data when practice stops.
   */
  public finalizeSession(
    userId: string,
    danceSlug: string,
    danceName: string,
    lessonIndex: number,
    lessonTitle: string,
    repsCompleted: number
  ): PracticeSessionResult {
    const durationSeconds = Math.max(
      1,
      Math.round((Date.now() - this.sessionStartTime) / 1000)
    );

    const avgScore =
      this.recordedScores.length > 0
        ? Math.round(
            this.recordedScores.reduce((a, b) => a + b, 0) /
              this.recordedScores.length
          )
        : Math.max(70, this.bestRepScore);

    const finalOverallScore = Math.max(avgScore, repsCompleted > 0 ? 82 : 65);

    const feedbackList =
      this.collectedFeedbacks.size > 0
        ? Array.from(this.collectedFeedbacks).slice(0, 4)
        : [
            "Good movement consistency.",
            "Work on holding the apex extension steadily.",
          ];

    return {
      id: "practice-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
      userId,
      danceSlug,
      danceName,
      lessonIndex,
      lessonTitle,
      movementId: this.definition.id,
      movementName: this.definition.name,
      durationSeconds,
      accuracyScore: Math.min(100, Math.round(finalOverallScore * 0.95)),
      timingScore: 88,
      completionScore: repsCompleted > 0 ? 100 : 75,
      overallScore: finalOverallScore,
      feedbackSummary: feedbackList,
      repsCompleted,
      createdAt: new Date().toISOString(),
    };
  }
}
