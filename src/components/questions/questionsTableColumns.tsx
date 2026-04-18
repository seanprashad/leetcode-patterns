"use client";

import { useState, useMemo, useCallback, useEffect, useRef, type ReactNode } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { ExternalLink, Star, Check } from "lucide-react";
import FormattedNote from "@/components/questions/FormattedNote";
import { type Reminder } from "@/lib/reminders";
import { Question } from "@/types/question";

const columnHelper = createColumnHelper<Question>();

export const difficultyColor: Record<string, string> = {
  Easy: "text-green-700 dark:text-green-400",
  Medium: "text-yellow-700 dark:text-yellow-400",
  Hard: "text-red-700 dark:text-red-400",
};

const difficultyPill: Record<string, string> = {
  Easy: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
  Hard: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
};

export function makeColumns(
  completed: Set<number>,
  toggleCompleted: (id: number) => void,
  starred: Set<number>,
  toggleStarred: (id: number) => void,
  notes: Record<number, string>,
  openNoteModal: (id: number, title: string) => void,
  hidePatterns: boolean,
  companyFilter: string[],
  updatedDate: string,
  solvedDates: Record<number, string>,
  reminders: Record<number, Reminder>,
  openReviewModal: (id: number, title: string) => void,
  completeReminder: (id: number) => void
) {
  return [
    columnHelper.display({
      id: "completed",
      header: () => <Check className="h-4 w-4" />,
      size: 40,
      cell: (info) => (
        <input
          type="checkbox"
          checked={completed.has(info.row.original.id)}
          onChange={() => toggleCompleted(info.row.original.id)}
          className="h-4 w-4 pointer-events-none accent-blue-600"
          aria-label={`Mark ${info.row.original.title} as ${completed.has(info.row.original.id) ? "incomplete" : "complete"}`}
        />
      ),
      meta: { clickable: true },
    }),
    columnHelper.display({
      id: "starred",
      header: "★",
      size: 40,
      cell: (info) => (
        <span
          role="checkbox"
          aria-checked={starred.has(info.row.original.id)}
          aria-label={`Star ${info.row.original.title}`}
        >
          <Star
            className={`h-4 w-4 pointer-events-none ${
              starred.has(info.row.original.id)
                ? "fill-amber-400 text-amber-400"
                : "text-zinc-300 dark:text-zinc-600"
            }`}
          />
        </span>
      ),
      meta: { clickable: true, toggleFn: "starred" },
      enableSorting: false,
    }),
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => (
        <a
          href={`https://leetcode.com/problems/${info.row.original.slug}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          {info.getValue()}
          {info.row.original.premium && (
            <span className="ml-1 text-xs text-amber-500">🔒</span>
          )}
        </a>
      ),
    }),
    columnHelper.display({
      id: "solutions",
      header: "Solutions",
      size: 75,
      cell: (info) => (
        <a
          href={`https://leetcode.com/problems/${info.row.original.slug}/solutions/`}
          target="_blank"
          rel="noopener noreferrer"
          title="View solutions"
          aria-label={`View solutions for ${info.row.original.title}`}
          className="inline-flex items-center text-zinc-400 hover:text-blue-600 dark:text-zinc-500 dark:hover:text-blue-400"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      ),
      enableSorting: false,
      meta: { hideOnMobile: true },
    }),
    columnHelper.accessor("difficulty", {
      header: "Difficulty",
      cell: (info) => (
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${difficultyPill[info.getValue()]} ${completed.has(info.row.original.id) ? "line-through opacity-60" : ""}`}>
          {info.getValue()}
        </span>
      ),
      filterFn: (row, _columnId, filterValue: string[]) => {
        if (!filterValue || filterValue.length === 0) return true;
        return filterValue.includes(row.original.difficulty);
      },
      meta: { hideOnMobile: true },
    }),
    columnHelper.accessor("pattern", {
      header: "Pattern(s)",
      cell: (info) => (
        <div className="flex flex-wrap gap-1">
          {info.getValue().map((p) => (
            <span
              key={p}
              className="whitespace-nowrap rounded-full bg-zinc-100 px-2 py-0.5 text-xs dark:bg-zinc-800"
            >
              {hidePatterns ? "•".repeat(p.length) : p}
            </span>
          ))}
        </div>
      ),
      filterFn: (row, _columnId, filterValue: string[]) => {
        if (!filterValue || filterValue.length === 0) return true;
        return row.original.pattern.some((p) =>
          filterValue.some((f) => p.toLowerCase() === f.toLowerCase())
        );
      },
    }),
    columnHelper.accessor("companies", {
      header: () => (
        <div>
          <span>Companies</span>
          <div className="text-[10px] font-normal text-zinc-400 dark:text-zinc-500">
            0–6 months, via{" "}
            <a href="https://leetcode.com/subscribe/" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted">
              LC Premium
            </a>
            {", "}
            {new Date(updatedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </div>
        </div>
      ),
      meta: { hideOnMobile: true },
      cell: (info) => (
        <div className="flex w-[156px] flex-wrap gap-1">
          {info.getValue().map((c) => (
            <span key={c.slug} className="group/icon relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icons/${c.slug}.png`}
                alt={c.name}
                className="h-5 w-5 rounded-sm object-contain bg-white/0 p-px dark:bg-white/90 dark:rounded"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  const fallback = `https://www.google.com/s2/favicons?sz=64&domain_url=https://${c.slug}.com`;
                  if (!img.dataset.triedFallback) {
                    img.dataset.triedFallback = "1";
                    img.src = fallback;
                  } else {
                    img.style.display = "none";
                    img.nextElementSibling?.classList.remove("hidden");
                  }
                }}
              />
              <span className="hidden rounded-full bg-zinc-100 px-2 py-0.5 text-xs dark:bg-zinc-800">
                {c.name}
              </span>
              <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-xs text-white opacity-0 shadow transition-opacity group-hover/icon:opacity-100 dark:bg-zinc-200 dark:text-zinc-900">
                {c.name} - asked {c.frequency} {c.frequency === 1 ? "time" : "times"} in the last 6 months
              </span>
            </span>
          ))}
        </div>
      ),
      enableSorting: companyFilter.length === 1,
      sortingFn: (rowA, rowB) => {
        const slug = companyFilter[0];
        const freqA = rowA.original.companies.find((c) => c.slug === slug)?.frequency ?? 0;
        const freqB = rowB.original.companies.find((c) => c.slug === slug)?.frequency ?? 0;
        return freqA - freqB;
      },
      filterFn: (row, _columnId, filterValue: string[]) => {
        if (!filterValue || filterValue.length === 0) return true;
        return row.original.companies.some(
          (c) => filterValue.includes(c.slug)
        );
      },
    }),
    columnHelper.display({
      id: "notes",
      header: "Notes",
      size: 100,
      meta: { hideOnMobile: true, noStrikethrough: true },
      cell: (info) => {
        const note = notes[info.row.original.id];
        return (
          <NoteCell note={note}>
            <button
              onClick={() =>
                openNoteModal(info.row.original.id, info.row.original.title)
              }

              aria-label={`${note ? "Edit" : "Add"} note for ${info.row.original.title}`}
              className="block max-w-[100px] cursor-pointer truncate text-left text-sm text-zinc-400 hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-400"
            >
              {note || <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>}
            </button>
          </NoteCell>
        );
      },
      enableSorting: false,
    }),
    columnHelper.display({
      id: "review",
      header: "Review",
      size: 160,
      meta: { hideOnMobile: true, noStrikethrough: true },
      cell: (info) => {
        const solvedDate = solvedDates[info.row.original.id];
        const reminder = reminders[info.row.original.id];
        if (!solvedDate && !reminder) return <span className="text-zinc-300 dark:text-zinc-700">—</span>;
        const dateFmt = { month: "short" as const, day: "numeric" as const, year: "numeric" as const };
        return (
          <div className="flex flex-col items-start gap-0.5">
            {solvedDate && (
              <span
                className="whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ring-inset bg-zinc-100 text-zinc-600 ring-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:ring-zinc-700"
                title={new Date(solvedDate).toLocaleDateString("en-US", dateFmt)}
              >
                Solved {relativeDate(solvedDate, "past")}
              </span>
            )}
            {reminder ? (
              <span className={`inline-flex items-center whitespace-nowrap rounded-full text-xs font-semibold ring-1 ring-inset ${reviewPillStyle(reminder.nextReview)}`}>
                <button
                  className="inline-flex items-center gap-1 cursor-pointer pl-2 pr-1.5 py-0.5 rounded-l-full transition-opacity hover:opacity-80"
                  title={`${new Date(reminder.nextReview + "T00:00:00").toLocaleDateString("en-US", dateFmt)} · Click to change`}
                  onClick={(e) => { e.stopPropagation(); openReviewModal(info.row.original.id, info.row.original.title); }}
                >
                  {relativeDate(reminder.nextReview, "future")}
                </button>
                <span className="w-px self-stretch bg-current opacity-20" />
                <button
                  className="inline-flex items-center justify-center cursor-pointer px-1.5 py-0.5 rounded-r-full transition-opacity hover:opacity-80"
                  title="Mark review as completed"
                  onClick={(e) => { e.stopPropagation(); completeReminder(info.row.original.id); }}
                >
                  <Check className="h-3 w-3" strokeWidth={2.5} />
                </button>
              </span>
            ) : solvedDate && (
              <button
                className="inline-flex items-center gap-1 whitespace-nowrap cursor-pointer rounded-full px-2 py-0.5 text-xs ring-1 ring-inset ring-dashed transition-colors text-zinc-400 ring-zinc-300 hover:text-zinc-600 hover:ring-zinc-400 dark:text-zinc-500 dark:ring-zinc-600 dark:hover:text-zinc-400 dark:hover:ring-zinc-500"
                title="Set a review date"
                onClick={(e) => { e.stopPropagation(); openReviewModal(info.row.original.id, info.row.original.title); }}
              >
                + Set review
              </button>
            )}
          </div>
        );
      },
      enableSorting: false,
    }),
  ];
}

function daysDiff(isoDate: string): number {
  const todayStr = new Date().toISOString().slice(0, 10);
  const target = isoDate.slice(0, 10);
  const todayMs = new Date(todayStr + "T00:00:00Z").getTime();
  const targetMs = new Date(target + "T00:00:00Z").getTime();
  return Math.round((targetMs - todayMs) / 86_400_000);
}

function reviewPillStyle(isoDate: string): string {
  const diff = daysDiff(isoDate);
  if (diff < 0) return "bg-red-100 text-red-700 ring-red-200 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-400 dark:ring-red-800 dark:hover:bg-red-900/60";
  if (diff === 0) return "bg-orange-100 text-orange-700 ring-orange-200 hover:bg-orange-200 dark:bg-orange-900/40 dark:text-orange-400 dark:ring-orange-800 dark:hover:bg-orange-900/60";
  if (diff === 1) return "bg-amber-100 text-amber-700 ring-amber-200 hover:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-400 dark:ring-amber-800 dark:hover:bg-amber-900/60";
  if (diff <= 3) return "bg-yellow-100 text-yellow-700 ring-yellow-200 hover:bg-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-400 dark:ring-yellow-800 dark:hover:bg-yellow-900/60";
  if (diff <= 7) return "bg-lime-100 text-lime-700 ring-lime-200 hover:bg-lime-200 dark:bg-lime-900/40 dark:text-lime-400 dark:ring-lime-800 dark:hover:bg-lime-900/60";
  if (diff <= 14) return "bg-emerald-100 text-emerald-700 ring-emerald-200 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400 dark:ring-emerald-800 dark:hover:bg-emerald-900/60";
  if (diff <= 30) return "bg-cyan-100 text-cyan-700 ring-cyan-200 hover:bg-cyan-200 dark:bg-cyan-900/40 dark:text-cyan-400 dark:ring-cyan-800 dark:hover:bg-cyan-900/60";
  return "bg-zinc-100 text-zinc-600 ring-zinc-200 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:ring-zinc-700 dark:hover:bg-zinc-700";
}

function relativeDate(isoDate: string, mode: "past" | "future"): string {
  const diffDays = daysDiff(isoDate);
  if (mode === "past") {
    const ago = -diffDays;
    if (ago <= 0) return "today";
    if (ago === 1) return "yesterday";
    return `${ago}d ago`;
  }
  if (diffDays < 0) return `Overdue ${-diffDays}d`;
  if (diffDays === 0) return "Due today";
  if (diffDays === 1) return "Review tomorrow";
  return `Review in ${diffDays}d`;
}

function NoteCell({ note, children }: { note: string | undefined; children: ReactNode }) {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const hideTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const show = useCallback(() => {
    clearTimeout(hideTimeout.current);
    if (!note || !ref.current) return;
    setRect(ref.current.getBoundingClientRect());
  }, [note]);

  const hide = useCallback(() => {
    hideTimeout.current = setTimeout(() => setRect(null), 100);
  }, []);

  useEffect(() => () => clearTimeout(hideTimeout.current), []);

  const style = useMemo(() => {
    if (!rect) return undefined;
    const gap = 8;
    const spaceAbove = rect.top - gap;
    const spaceBelow = window.innerHeight - rect.bottom - gap;
    const above = spaceAbove >= Math.min(200, spaceBelow);
    const maxH = Math.min(300, above ? spaceAbove : spaceBelow);
    return {
      left: rect.left,
      maxHeight: maxH,
      ...(above
        ? { bottom: window.innerHeight - rect.top + gap }
        : { top: rect.bottom + gap }),
    };
  }, [rect]);

  return (
    <div
      ref={ref}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {children}
      {note && style && (
        <div
          className="fixed z-50 max-w-xs overflow-y-auto rounded-lg border border-zinc-200 bg-white p-3 text-sm shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
          style={style}
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          <FormattedNote text={note} className="whitespace-pre-wrap wrap-break-word text-zinc-700 dark:text-zinc-300" />
        </div>
      )}
    </div>
  );
}
