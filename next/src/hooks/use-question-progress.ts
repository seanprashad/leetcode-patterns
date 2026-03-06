"use client";

import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./use-local-storage";
import { questions } from "@/lib/questions";

export interface DifficultyCount {
  Easy: number;
  Medium: number;
  Hard: number;
  Total: number;
}

export function useQuestionProgress() {
  const [checked, setChecked] = useLocalStorage<boolean[]>(
    "checked",
    new Array(questions.length).fill(false),
  );

  const [checkedAt, setCheckedAt] = useLocalStorage<(string | null)[]>(
    "checkedAt",
    new Array(questions.length).fill(null),
  );

  // Resize arrays if questions list has grown
  const safeChecked = useMemo(() => {
    if (checked.length >= questions.length) return checked;
    const resized = new Array(questions.length).fill(false);
    for (let i = 0; i < checked.length; i++) resized[i] = checked[i];
    return resized;
  }, [checked]);

  const safeCheckedAt = useMemo(() => {
    if (checkedAt.length >= questions.length) return checkedAt;
    const resized: (string | null)[] = new Array(questions.length).fill(null);
    for (let i = 0; i < checkedAt.length; i++) resized[i] = checkedAt[i];
    return resized;
  }, [checkedAt]);

  const difficultyCount = useMemo<DifficultyCount>(() => {
    const count: DifficultyCount = { Easy: 0, Medium: 0, Hard: 0, Total: 0 };
    for (const q of questions) {
      if (safeChecked[q.id]) {
        count[q.difficulty]++;
        count.Total++;
      }
    }
    return count;
  }, [safeChecked]);

  const totalDifficultyCount = useMemo(() => {
    const count = { Easy: 0, Medium: 0, Hard: 0, Total: questions.length };
    for (const q of questions) {
      count[q.difficulty]++;
    }
    return count;
  }, []);

  const toggleCheck = useCallback(
    (id: number, difficulty: "Easy" | "Medium" | "Hard") => {
      const next = [...safeChecked];
      next[id] = !next[id];
      setChecked(next);

      const nextAt = [...safeCheckedAt];
      nextAt[id] = next[id] ? new Date().toISOString().slice(0, 10) : null;
      setCheckedAt(nextAt);
    },
    [safeChecked, safeCheckedAt, setChecked, setCheckedAt],
  );

  const reset = useCallback(() => {
    setChecked(new Array(questions.length).fill(false));
    setCheckedAt(new Array(questions.length).fill(null));
  }, [setChecked, setCheckedAt]);

  return {
    checked: safeChecked,
    checkedAt: safeCheckedAt,
    difficultyCount,
    totalDifficultyCount,
    toggleCheck,
    reset,
  };
}
