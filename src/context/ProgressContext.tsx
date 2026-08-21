"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

interface ProgressContextType {
  completedLessons: Record<string, number[]>;
  toggleLesson: (slug: string, lessonIndex: number) => void;
  isCompleted: (slug: string, lessonIndex: number) => boolean;
  getProgress: (slug: string, totalLessons: number) => number;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

const STORAGE_KEY = "rhythmofindia_progress";

function loadProgress(): Record<string, number[]> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress: Record<string, number[]>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedLessons, setCompletedLessons] = useState<
    Record<string, number[]>
  >({});

  useEffect(() => {
    setCompletedLessons(loadProgress());
  }, []);

  const toggleLesson = useCallback(
    (slug: string, lessonIndex: number) => {
      setCompletedLessons((prev) => {
        const current = prev[slug] || [];
        const updated = current.includes(lessonIndex)
          ? current.filter((i) => i !== lessonIndex)
          : [...current, lessonIndex];
        const next = { ...prev, [slug]: updated };
        saveProgress(next);
        return next;
      });
    },
    []
  );

  const isCompleted = useCallback(
    (slug: string, lessonIndex: number) => {
      return (completedLessons[slug] || []).includes(lessonIndex);
    },
    [completedLessons]
  );

  const getProgress = useCallback(
    (slug: string, totalLessons: number) => {
      if (totalLessons === 0) return 0;
      const count = (completedLessons[slug] || []).length;
      return Math.round((count / totalLessons) * 100);
    },
    [completedLessons]
  );

  return (
    <ProgressContext.Provider
      value={{ completedLessons, toggleLesson, isCompleted, getProgress }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx)
    throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
