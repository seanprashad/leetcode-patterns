import { supabase } from "./supabase";
import {
  loadCompleted, saveCompleted,
  loadStarred, saveStarred,
  loadNotes, saveNotes,
  loadSolvedDates, saveSolvedDates,
  loadReminders, saveReminders,
} from "./storage";
import type { Reminder } from "./reminders";

export interface ProgressPayload {
  completed: number[];
  starred: number[];
  notes: Record<number, string>;
  solved_dates: Record<number, string>;
  reminders: Record<number, Reminder>;
  updated_at: string;
}

// Upload current localStorage state to Supabase
export async function uploadProgress(userId: string): Promise<void> {
  const payload = {
    user_id: userId,
    completed: [...loadCompleted()],
    starred: [...loadStarred()],
    notes: loadNotes(),
    solved_dates: loadSolvedDates(),
    reminders: loadReminders(),
    updated_at: new Date().toISOString(),
  };

  await supabase.from("user_progress").upsert(payload, { onConflict: "user_id" });
}

// Download remote progress and replace local state with it
export async function downloadAndMerge(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !data) {
    // No remote data yet — push local up
    await uploadProgress(userId);
    return false;
  }

  // Remote is the source of truth — overwrite local state
  saveCompleted(new Set<number>(data.completed ?? []));
  saveStarred(new Set<number>(data.starred ?? []));
  saveNotes((data.notes as Record<number, string>) ?? {});
  saveSolvedDates((data.solved_dates as Record<number, string>) ?? {});
  saveReminders((data.reminders as Record<number, Reminder>) ?? {});

  return true;
}

// Track when we last uploaded to ignore our own realtime events
let lastUploadAt = 0;

// Upload current localStorage state to Supabase
async function doUpload(userId: string): Promise<void> {
  lastUploadAt = Date.now();
  await uploadProgress(userId);
}

// Debounced upload — call after every save
let uploadTimer: ReturnType<typeof setTimeout> | null = null;
let pendingUserId: string | null = null;

export function scheduleUpload(userId: string): void {
  pendingUserId = userId;
  if (uploadTimer) clearTimeout(uploadTimer);
  uploadTimer = setTimeout(() => {
    pendingUserId = null;
    doUpload(userId);
  }, 1000);
}

// Flush any pending debounced upload immediately (e.g. on page unload)
export function flushPendingUpload(): void {
  if (uploadTimer && pendingUserId) {
    clearTimeout(uploadTimer);
    uploadTimer = null;
    const uid = pendingUserId;
    pendingUserId = null;
    doUpload(uid);
  }
}

// Merge from a realtime payload (no API call needed).
// Returns true if any data actually changed locally.
export function mergeFromRealtimePayload(data: Record<string, unknown>): boolean {
  // Skip if this update was triggered by our own upload (within 5s window)
  if (Date.now() - lastUploadAt < 5000) return false;

  let changed = false;

  const remoteCompleted = new Set<number>((data.completed as number[]) ?? []);
  const localCompleted = loadCompleted();
  if (!setsEqual(localCompleted, remoteCompleted)) {
    saveCompleted(remoteCompleted);
    changed = true;
  }

  const remoteStarred = new Set<number>((data.starred as number[]) ?? []);
  const localStarred = loadStarred();
  if (!setsEqual(localStarred, remoteStarred)) {
    saveStarred(remoteStarred);
    changed = true;
  }

  const remoteNotes = (data.notes as Record<number, string>) ?? {};
  const localNotes = loadNotes();
  if (!recordsEqual(localNotes, remoteNotes)) {
    saveNotes(remoteNotes);
    changed = true;
  }

  const remoteDates = (data.solved_dates as Record<number, string>) ?? {};
  const localDates = loadSolvedDates();
  if (!recordsEqual(localDates, remoteDates)) {
    saveSolvedDates(remoteDates);
    changed = true;
  }

  const remoteReminders = (data.reminders as Record<number, Reminder>) ?? {};
  const localReminders = loadReminders();
  if (JSON.stringify(localReminders) !== JSON.stringify(remoteReminders)) {
    saveReminders(remoteReminders);
    changed = true;
  }

  return changed;
}

function setsEqual(a: Set<number>, b: Set<number>): boolean {
  if (a.size !== b.size) return false;
  for (const v of a) if (!b.has(v)) return false;
  return true;
}

function recordsEqual(a: Record<number, string>, b: Record<number, string>): boolean {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => a[Number(k)] === b[Number(k)]);
}
