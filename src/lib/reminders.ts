export interface Reminder {
  nextReview: string; // ISO date string (date only, e.g. "2026-03-09")
  interval: number;   // current interval in days
}

const SCHEDULE = [1, 3, 7, 14, 30];

// Helper: add days to an ISO date string and return a new ISO date string (date-only)
function addDays(isoDate: string, days: number): string {
  const d = new Date(isoDate + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

// Get today as YYYY-MM-DD
export function today(): string {
  return new Date().toISOString().slice(0, 10);
}

// Create the first reminder from a solved date
export function initReminder(solvedDate: string): Reminder {
  const dateOnly = solvedDate.slice(0, 10);
  return { nextReview: addDays(dateOnly, SCHEDULE[0]), interval: SCHEDULE[0] };
}

// Advance to the next interval. Returns null if past the last interval (schedule complete).
export function advanceReminder(current: Reminder): Reminder | null {
  const idx = SCHEDULE.indexOf(current.interval);
  const nextIdx = idx + 1;
  if (nextIdx >= SCHEDULE.length) return null;
  return {
    nextReview: addDays(today(), SCHEDULE[nextIdx]),
    interval: SCHEDULE[nextIdx],
  };
}

// Check if a reminder is due (nextReview <= today)
export function isDue(reminder: Reminder): boolean {
  return reminder.nextReview <= today();
}

// Override nextReview with a custom date, preserving the current interval
export function setCustomDate(reminder: Reminder, date: string): Reminder {
  return { ...reminder, nextReview: date.slice(0, 10) };
}

// Return IDs of all questions that are due for review
export function getDueReminders(reminders: Record<number, Reminder>): number[] {
  return Object.entries(reminders)
    .filter(([, r]) => isDue(r))
    .map(([id]) => Number(id));
}
