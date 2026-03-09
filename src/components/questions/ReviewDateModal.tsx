import { useState } from "react";
import { today } from "@/lib/reminders";

const PRESETS = [
  { label: "Tomorrow", days: 1 },
  { label: "3 days", days: 3 },
  { label: "1 week", days: 7 },
  { label: "2 weeks", days: 14 },
  { label: "1 month", days: 30 },
];

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export interface ReviewDateTarget {
  id: number;
  title: string;
}

export default function ReviewDateModal({
  target,
  onSelect,
  onClear,
  onCancel,
}: {
  target: ReviewDateTarget;
  onSelect: (id: number, date: string) => void;
  onClear?: (id: number) => void;
  onCancel: () => void;
}) {
  const todayStr = today();
  const [customDate, setCustomDate] = useState("");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-label={`Set review date for ${target.title}`}
    >
      <div
        className="mx-4 w-full max-w-[240px] rounded-lg border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Review Date</h2>
          <button
            onClick={onCancel}
            className="rounded p-0.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            aria-label="Close"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className="mb-3 flex flex-col gap-1">
          {PRESETS.map((p) => {
            const date = addDays(todayStr, p.days);
            return (
              <button
                key={p.days}
                onClick={() => onSelect(target.id, date)}
                className="flex items-center justify-between rounded px-2 py-1.5 text-xs transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <span>{p.label}</span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                  {new Date(date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </button>
            );
          })}
        </div>

        <div className="border-t border-zinc-200 pt-2 dark:border-zinc-700">
          <div className="flex gap-1.5">
            <input
              type="date"
              min={todayStr}
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className="min-w-0 flex-1 rounded border border-zinc-300 bg-transparent px-2 py-1 text-xs focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:text-zinc-200 dark:[color-scheme:dark]"
            />
            <button
              onClick={() => { if (customDate) onSelect(target.id, customDate); }}
              disabled={!customDate}
              className="rounded bg-blue-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-40"
            >
              Set
            </button>
          </div>
        </div>

        {onClear && (
          <div className="mt-2 border-t border-zinc-200 pt-2 dark:border-zinc-700">
            <button
              onClick={() => onClear(target.id)}
              className="w-full rounded px-2 py-1.5 text-xs text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
            >
              Clear review date
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
