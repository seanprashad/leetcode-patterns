import { describe, it, expect, vi, afterEach } from "vitest";
import {
  initReminder,
  advanceReminder,
  isDue,
  setCustomDate,
  getDueReminders,
} from "@/lib/reminders";
import type { Reminder } from "@/lib/reminders";

describe("initReminder", () => {
  it("returns nextReview +1 day and interval 1", () => {
    const r = initReminder("2026-03-08");
    expect(r).toEqual({ nextReview: "2026-03-09", interval: 1 });
  });

  it("handles full ISO datetime strings (slices to date-only)", () => {
    const r = initReminder("2026-03-08T14:30:00.000Z");
    expect(r).toEqual({ nextReview: "2026-03-09", interval: 1 });
  });
});

describe("advanceReminder", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("progresses through the schedule [1, 3, 7, 14, 30]", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-10"));

    let r: Reminder | null = { nextReview: "2026-03-09", interval: 1 };

    r = advanceReminder(r);
    expect(r).toEqual({ nextReview: "2026-03-13", interval: 3 });

    r = advanceReminder(r!);
    expect(r).toEqual({ nextReview: "2026-03-17", interval: 7 });

    r = advanceReminder(r!);
    expect(r).toEqual({ nextReview: "2026-03-24", interval: 14 });

    r = advanceReminder(r!);
    expect(r).toEqual({ nextReview: "2026-04-09", interval: 30 });
  });

  it("returns null after the last interval (30)", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-10"));

    const r: Reminder = { nextReview: "2026-04-09", interval: 30 };
    expect(advanceReminder(r)).toBeNull();
  });
});

describe("isDue", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns true when nextReview is today", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-10"));

    expect(isDue({ nextReview: "2026-03-10", interval: 1 })).toBe(true);
  });

  it("returns true when nextReview is in the past", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-12"));

    expect(isDue({ nextReview: "2026-03-10", interval: 1 })).toBe(true);
  });

  it("returns false when nextReview is in the future", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-08"));

    expect(isDue({ nextReview: "2026-03-10", interval: 1 })).toBe(false);
  });
});

describe("setCustomDate", () => {
  it("overrides nextReview while keeping interval", () => {
    const r: Reminder = { nextReview: "2026-03-09", interval: 3 };
    const updated = setCustomDate(r, "2026-04-01");
    expect(updated).toEqual({ nextReview: "2026-04-01", interval: 3 });
  });

  it("slices full ISO datetime to date-only", () => {
    const r: Reminder = { nextReview: "2026-03-09", interval: 7 };
    const updated = setCustomDate(r, "2026-04-01T12:00:00.000Z");
    expect(updated).toEqual({ nextReview: "2026-04-01", interval: 7 });
  });
});

describe("getDueReminders", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns only question IDs that are due", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-10"));

    const reminders: Record<number, Reminder> = {
      1: { nextReview: "2026-03-09", interval: 1 },  // past — due
      2: { nextReview: "2026-03-10", interval: 3 },  // today — due
      3: { nextReview: "2026-03-15", interval: 7 },  // future — not due
    };

    const due = getDueReminders(reminders);
    expect(due).toEqual(expect.arrayContaining([1, 2]));
    expect(due).toHaveLength(2);
  });

  it("returns empty array when nothing is due", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-01"));

    const reminders: Record<number, Reminder> = {
      1: { nextReview: "2026-03-09", interval: 1 },
      2: { nextReview: "2026-03-10", interval: 3 },
    };

    expect(getDueReminders(reminders)).toEqual([]);
  });
});
