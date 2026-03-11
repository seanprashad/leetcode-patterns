import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  saveCompleted,
  saveStarred,
  saveNotes,
  saveSolvedDates,
  saveReminders,
  loadCompleted,
  loadStarred,
  loadNotes,
  loadSolvedDates,
  loadReminders,
} from "@/lib/storage";

const { mockUpsert, mockSingle } = vi.hoisted(() => ({
  mockUpsert: vi.fn().mockResolvedValue({ error: null }),
  mockSingle: vi.fn().mockResolvedValue({ data: null, error: { code: "PGRST116" } }),
}));

// Mock supabase before importing sync
vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: () => ({
      upsert: mockUpsert,
      select: () => ({
        eq: () => ({
          single: mockSingle,
        }),
      }),
    }),
  },
}));

import { mergeFromRealtimePayload, uploadProgress, downloadAndMerge, scheduleUpload, flushPendingUpload } from "@/lib/sync";

beforeEach(() => {
  localStorage.clear();
  mockUpsert.mockClear();
  mockSingle.mockClear();
});

describe("mergeFromRealtimePayload", () => {
  it("applies remote completed when local is empty", () => {
    const changed = mergeFromRealtimePayload({
      completed: [1, 2, 3],
      starred: [],
      notes: {},
      solved_dates: {},
      reminders: {},
    });

    expect(changed).toBe(true);
    expect(loadCompleted()).toEqual(new Set([1, 2, 3]));
  });

  it("applies remote starred when local is empty", () => {
    const changed = mergeFromRealtimePayload({
      completed: [],
      starred: [5, 10],
      notes: {},
      solved_dates: {},
      reminders: {},
    });

    expect(changed).toBe(true);
    expect(loadStarred()).toEqual(new Set([5, 10]));
  });

  it("applies remote notes when local is empty", () => {
    const changed = mergeFromRealtimePayload({
      completed: [],
      starred: [],
      notes: { 1: "hello" },
      solved_dates: {},
      reminders: {},
    });

    expect(changed).toBe(true);
    expect(loadNotes()).toEqual({ 1: "hello" });
  });

  it("detects changed note values (not just key count)", () => {
    saveNotes({ 1: "old note" });

    const changed = mergeFromRealtimePayload({
      completed: [],
      starred: [],
      notes: { 1: "updated note" },
      solved_dates: {},
      reminders: {},
    });

    expect(changed).toBe(true);
    expect(loadNotes()).toEqual({ 1: "updated note" });
  });

  it("returns false when remote and local are identical", () => {
    saveCompleted(new Set([1, 2]));
    saveStarred(new Set([3]));
    saveNotes({ 1: "note" });
    saveSolvedDates({ 1: "2026-01-01" });
    saveReminders({ 1: { nextReview: "2026-01-02", interval: 1 } });

    const changed = mergeFromRealtimePayload({
      completed: [1, 2],
      starred: [3],
      notes: { 1: "note" },
      solved_dates: { 1: "2026-01-01" },
      reminders: { 1: { nextReview: "2026-01-02", interval: 1 } },
    });

    expect(changed).toBe(false);
  });

  it("detects removed completed items", () => {
    saveCompleted(new Set([1, 2, 3]));

    const changed = mergeFromRealtimePayload({
      completed: [1, 2],
      starred: [],
      notes: {},
      solved_dates: {},
      reminders: {},
    });

    expect(changed).toBe(true);
    expect(loadCompleted()).toEqual(new Set([1, 2]));
  });

  it("applies remote solved_dates", () => {
    const changed = mergeFromRealtimePayload({
      completed: [],
      starred: [],
      notes: {},
      solved_dates: { 5: "2026-03-10T00:00:00Z" },
      reminders: {},
    });

    expect(changed).toBe(true);
    expect(loadSolvedDates()).toEqual({ 5: "2026-03-10T00:00:00Z" });
  });

  it("applies remote reminders", () => {
    const changed = mergeFromRealtimePayload({
      completed: [],
      starred: [],
      notes: {},
      solved_dates: {},
      reminders: { 1: { nextReview: "2026-03-15", interval: 3 } },
    });

    expect(changed).toBe(true);
    expect(loadReminders()).toEqual({ 1: { nextReview: "2026-03-15", interval: 3 } });
  });

  it("detects changed reminder values", () => {
    saveReminders({ 1: { nextReview: "2026-03-10", interval: 1 } });

    const changed = mergeFromRealtimePayload({
      completed: [],
      starred: [],
      notes: {},
      solved_dates: {},
      reminders: { 1: { nextReview: "2026-03-15", interval: 3 } },
    });

    expect(changed).toBe(true);
    expect(loadReminders()).toEqual({ 1: { nextReview: "2026-03-15", interval: 3 } });
  });

  it("handles null/undefined fields in payload gracefully", () => {
    const changed = mergeFromRealtimePayload({
      completed: null,
      starred: undefined,
      notes: null,
      solved_dates: undefined,
      reminders: null,
    } as unknown as Record<string, unknown>);

    expect(changed).toBe(false);
  });

  it("detects deleted notes (remote has fewer keys)", () => {
    saveNotes({ 1: "note one", 2: "note two" });

    const changed = mergeFromRealtimePayload({
      completed: [],
      starred: [],
      notes: { 1: "note one" },
      solved_dates: {},
      reminders: {},
    });

    expect(changed).toBe(true);
    expect(loadNotes()).toEqual({ 1: "note one" });
  });

  it("detects removed starred items", () => {
    saveStarred(new Set([1, 2, 3]));

    const changed = mergeFromRealtimePayload({
      completed: [],
      starred: [1],
      notes: {},
      solved_dates: {},
      reminders: {},
    });

    expect(changed).toBe(true);
    expect(loadStarred()).toEqual(new Set([1]));
  });

  it("detects changed solved_dates values", () => {
    saveSolvedDates({ 1: "2026-01-01" });

    const changed = mergeFromRealtimePayload({
      completed: [],
      starred: [],
      notes: {},
      solved_dates: { 1: "2026-03-10" },
      reminders: {},
    });

    expect(changed).toBe(true);
    expect(loadSolvedDates()).toEqual({ 1: "2026-03-10" });
  });
});

describe("uploadProgress", () => {
  it("upserts current localStorage state to Supabase", async () => {
    saveCompleted(new Set([1, 2]));
    saveStarred(new Set([3]));
    saveNotes({ 1: "note" });
    saveSolvedDates({ 1: "2026-01-01" });
    saveReminders({ 1: { nextReview: "2026-01-02", interval: 1 } });

    await uploadProgress("user-123");

    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: "user-123",
        completed: [1, 2],
        starred: [3],
        notes: { 1: "note" },
        solved_dates: { 1: "2026-01-01" },
        reminders: { 1: { nextReview: "2026-01-02", interval: 1 } },
      }),
      { onConflict: "user_id" },
    );
  });

  it("uploads empty data when localStorage is empty", async () => {
    await uploadProgress("user-123");

    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: "user-123",
        completed: [],
        starred: [],
        notes: {},
        solved_dates: {},
        reminders: {},
      }),
      { onConflict: "user_id" },
    );
  });
});

describe("downloadAndMerge", () => {
  it("uploads local data when no remote data exists", async () => {
    mockSingle.mockResolvedValueOnce({ data: null, error: { code: "PGRST116" } });
    saveCompleted(new Set([1]));

    const result = await downloadAndMerge("user-123");

    expect(result).toBe(false);
    expect(mockUpsert).toHaveBeenCalled();
  });

  it("merges remote and local completed via union", async () => {
    saveCompleted(new Set([1, 2]));
    mockSingle.mockResolvedValueOnce({
      data: { completed: [2, 3], starred: [], notes: {}, solved_dates: {}, reminders: {} },
      error: null,
    });

    const result = await downloadAndMerge("user-123");

    expect(result).toBe(true);
    expect(loadCompleted()).toEqual(new Set([1, 2, 3]));
  });

  it("prefers local notes over remote", async () => {
    saveNotes({ 1: "local note" });
    mockSingle.mockResolvedValueOnce({
      data: { completed: [], starred: [], notes: { 1: "remote note", 2: "remote only" }, solved_dates: {}, reminders: {} },
      error: null,
    });

    await downloadAndMerge("user-123");

    const notes = loadNotes();
    expect(notes[1]).toBe("local note");
    expect(notes[2]).toBe("remote only");
  });

  it("prefers local solved_dates over remote", async () => {
    saveSolvedDates({ 1: "2026-03-10" });
    mockSingle.mockResolvedValueOnce({
      data: { completed: [], starred: [], notes: {}, solved_dates: { 1: "2026-01-01", 2: "2026-02-02" }, reminders: {} },
      error: null,
    });

    await downloadAndMerge("user-123");

    const dates = loadSolvedDates();
    expect(dates[1]).toBe("2026-03-10");
    expect(dates[2]).toBe("2026-02-02");
  });

  it("pushes merged state back to Supabase", async () => {
    mockSingle.mockResolvedValueOnce({
      data: { completed: [1], starred: [], notes: {}, solved_dates: {}, reminders: {} },
      error: null,
    });

    await downloadAndMerge("user-123");

    expect(mockUpsert).toHaveBeenCalled();
  });
});

describe("scheduleUpload", () => {
  it("debounces upload calls", async () => {
    vi.useFakeTimers();

    scheduleUpload("user-123");
    scheduleUpload("user-123");
    scheduleUpload("user-123");

    expect(mockUpsert).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(2000);

    expect(mockUpsert).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});

describe("flushPendingUpload", () => {
  it("fires the pending upload immediately without waiting for debounce", async () => {
    vi.useFakeTimers();

    scheduleUpload("user-flush");

    expect(mockUpsert).not.toHaveBeenCalled();

    flushPendingUpload();

    // Upload should fire synchronously (the async upsert is mocked)
    await vi.advanceTimersByTimeAsync(0);
    expect(mockUpsert).toHaveBeenCalledTimes(1);
    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({ user_id: "user-flush" }),
      { onConflict: "user_id" },
    );

    // Original debounce timer should no longer fire a second upload
    await vi.advanceTimersByTimeAsync(2000);
    expect(mockUpsert).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it("does nothing when there is no pending upload", () => {
    flushPendingUpload();
    expect(mockUpsert).not.toHaveBeenCalled();
  });

  it("does nothing after the debounce has already fired", async () => {
    vi.useFakeTimers();

    scheduleUpload("user-123");
    await vi.advanceTimersByTimeAsync(2000);
    expect(mockUpsert).toHaveBeenCalledTimes(1);

    mockUpsert.mockClear();
    flushPendingUpload();
    expect(mockUpsert).not.toHaveBeenCalled();

    vi.useRealTimers();
  });
});
