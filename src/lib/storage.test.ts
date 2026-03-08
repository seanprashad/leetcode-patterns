import { describe, it, expect, beforeEach } from "vitest";
import type { Question } from "@/types/question";
import {
  loadCompleted, saveCompleted,
  loadStarred, saveStarred,
  loadNotes, saveNotes,
  loadSolvedDates, saveSolvedDates,
  loadShuffleOrder, saveShuffleOrder,
  migrateLegacyProgress,
} from "@/lib/storage";

beforeEach(() => {
  localStorage.clear();
});

const makeQuestion = (id: number, slug: string, difficulty: "Easy" | "Medium" | "Hard" = "Easy"): Question => ({
  id,
  title: slug,
  slug,
  pattern: [],
  difficulty,
  premium: false,
  companies: [],
});

describe("completed", () => {
  it("returns empty set when nothing stored", () => {
    expect(loadCompleted()).toEqual(new Set());
  });

  it("round-trips through save and load", () => {
    const ids = new Set([1, 5, 42]);
    saveCompleted(ids);
    expect(loadCompleted()).toEqual(ids);
  });

  it("returns empty set on corrupted JSON", () => {
    localStorage.setItem("leetcode-patterns-completed", "not-json");
    expect(loadCompleted()).toEqual(new Set());
  });
});

describe("starred", () => {
  it("returns empty set when nothing stored", () => {
    expect(loadStarred()).toEqual(new Set());
  });

  it("round-trips through save and load", () => {
    const ids = new Set([3, 7]);
    saveStarred(ids);
    expect(loadStarred()).toEqual(ids);
  });
});

describe("notes", () => {
  it("returns empty object when nothing stored", () => {
    expect(loadNotes()).toEqual({});
  });

  it("round-trips through save and load", () => {
    const notes = { 1: "first note", 2: "second note" };
    saveNotes(notes);
    expect(loadNotes()).toEqual(notes);
  });
});

describe("solvedDates", () => {
  it("returns empty object when nothing stored", () => {
    expect(loadSolvedDates()).toEqual({});
  });

  it("round-trips through save and load", () => {
    const dates = { 1: "2025-06-01T00:00:00.000Z" };
    saveSolvedDates(dates);
    expect(loadSolvedDates()).toEqual(dates);
  });
});

describe("shuffleOrder", () => {
  it("returns null when nothing stored", () => {
    expect(loadShuffleOrder()).toBeNull();
  });

  it("round-trips through save and load", () => {
    saveShuffleOrder([2, 0, 1]);
    expect(loadShuffleOrder()).toEqual([2, 0, 1]);
  });

  it("removes key when saving null", () => {
    saveShuffleOrder([1, 2, 3]);
    expect(localStorage.getItem("leetcode-patterns-shuffle-order")).not.toBeNull();
    saveShuffleOrder(null);
    expect(localStorage.getItem("leetcode-patterns-shuffle-order")).toBeNull();
    expect(loadShuffleOrder()).toBeNull();
  });
});

describe("migrateLegacyProgress", () => {
  const testData: Question[] = [
    makeQuestion(0, "two-sum"),
    makeQuestion(1, "add-two-numbers", "Medium"),
    makeQuestion(2, "median-of-two-sorted-arrays", "Hard"),
  ];

  it("returns null when no legacy data exists", () => {
    expect(migrateLegacyProgress(testData)).toBeNull();
  });

  it("returns null when already migrated", () => {
    localStorage.setItem("leetcode-patterns-migrated", "1");
    const checked = new Array(175).fill(false);
    checked[147] = true; // two-sum
    localStorage.setItem("checked", JSON.stringify(checked));
    expect(migrateLegacyProgress(testData)).toBeNull();
  });

  it("maps legacy boolean array to new IDs via slug matching", () => {
    // two-sum is at legacy index 147, add-two-numbers at 57
    const checked = new Array(175).fill(false);
    checked[147] = true;
    checked[57] = true;
    localStorage.setItem("checked", JSON.stringify(checked));

    const result = migrateLegacyProgress(testData)!;
    expect(result).toEqual(new Set([0, 1]));
  });

  it("saves migrated IDs to new storage key", () => {
    const checked = new Array(175).fill(false);
    checked[147] = true;
    localStorage.setItem("checked", JSON.stringify(checked));
    migrateLegacyProgress(testData);

    const stored = JSON.parse(localStorage.getItem("leetcode-patterns-completed")!);
    expect(stored).toContain(0);
  });

  it("merges with existing completed progress", () => {
    localStorage.setItem("leetcode-patterns-completed", JSON.stringify([2]));
    const checked = new Array(175).fill(false);
    checked[147] = true; // two-sum -> id 0
    localStorage.setItem("checked", JSON.stringify(checked));

    const result = migrateLegacyProgress(testData)!;
    expect(result).toEqual(new Set([0, 2]));
  });

  it("removes legacy keys after migration", () => {
    const checked = new Array(175).fill(false);
    checked[147] = true;
    localStorage.setItem("checked", JSON.stringify(checked));
    localStorage.setItem("showPatterns", JSON.stringify([true]));
    localStorage.setItem("hidePatterns", JSON.stringify([false]));
    migrateLegacyProgress(testData);

    expect(localStorage.getItem("checked")).toBeNull();
    expect(localStorage.getItem("showPatterns")).toBeNull();
    expect(localStorage.getItem("hidePatterns")).toBeNull();
  });

  it("sets migration flag to prevent re-running", () => {
    const checked = new Array(175).fill(false);
    checked[147] = true;
    localStorage.setItem("checked", JSON.stringify(checked));
    migrateLegacyProgress(testData);

    expect(localStorage.getItem("leetcode-patterns-migrated")).toBe("1");
  });

  it("returns null when legacy array has no matching slugs", () => {
    const checked = new Array(175).fill(false);
    checked[0] = true; // contains-duplicate — not in testData
    localStorage.setItem("checked", JSON.stringify(checked));

    // Still sets migration flag and cleans up, but returns null (no ids matched)
    const result = migrateLegacyProgress(testData);
    expect(result).toBeNull();
    expect(localStorage.getItem("checked")).toBeNull();
  });

  it("ignores indices beyond LEGACY_SLUGS length", () => {
    const checked = new Array(200).fill(false);
    checked[199] = true; // beyond legacy slug list
    checked[147] = true; // two-sum
    localStorage.setItem("checked", JSON.stringify(checked));

    const result = migrateLegacyProgress(testData)!;
    expect(result).toEqual(new Set([0]));
  });

  it("handles corrupted legacy JSON gracefully", () => {
    localStorage.setItem("checked", "not-valid-json");
    const result = migrateLegacyProgress(testData);
    expect(result).toBeNull();
  });
});
