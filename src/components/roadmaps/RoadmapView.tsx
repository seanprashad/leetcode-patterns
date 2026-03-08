"use client";

import { useState, useMemo, useCallback, useEffect, Fragment } from "react";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  NotebookPen,
  Check,
  Star,
  Lock,
} from "lucide-react";
import { Question } from "@/types/question";
import { Roadmap } from "@/data/roadmaps";
import { trackEvent } from "@/lib/analytics";
import { loadCompleted, saveCompleted, loadStarred, saveStarred, loadNotes, saveNotes, loadSolvedDates, saveSolvedDates } from "@/lib/storage";

function InlineMarkdown({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          {line.split(/(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g).map((part, pi) => {
            if (/^\*\*\*(.+)\*\*\*$/.test(part))
              return <strong key={pi}><em>{part.slice(3, -3)}</em></strong>;
            if (/^\*\*(.+)\*\*$/.test(part))
              return <strong key={pi}>{part.slice(2, -2)}</strong>;
            if (/^\*(.+)\*$/.test(part))
              return <em key={pi}>{part.slice(1, -1)}</em>;
            if (/^`(.+)`$/.test(part))
              return <code key={pi} className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">{part.slice(1, -1)}</code>;
            const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
            if (linkMatch)
              return <a key={pi} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline decoration-dotted hover:decoration-solid dark:text-blue-400">{linkMatch[1]}</a>;
            return part;
          })}
        </Fragment>
      ))}
    </>
  );
}

const difficultyPill: Record<string, string> = {
  Easy: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  Medium:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
  Hard: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
};

interface Props {
  roadmap: Roadmap;
  questions: Question[];
}

export default function RoadmapView({ roadmap, questions }: Props) {
  const slugToQuestion = useMemo(() => {
    const map = new Map<string, Question>();
    questions.forEach((q) => map.set(q.slug, q));
    return map;
  }, [questions]);

  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [starred, setStarred] = useState<Set<number>>(new Set());
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [solvedDates, setSolvedDates] = useState<Record<number, string>>({});
  const [collapsedPhases, setCollapsedPhases] = useState<Set<string | number>>(
    new Set()
  );
  const [expandedHints, setExpandedHints] = useState<Set<string>>(new Set());
  const [editingNote, setEditingNote] = useState<{
    id: number;
    title: string;
    draft: string;
    confirmDiscard: boolean;
  } | null>(null);

  useEffect(() => {
    setCompleted(loadCompleted());
    setStarred(loadStarred());
    setNotes(loadNotes());
    setSolvedDates(loadSolvedDates());
  }, []);

  const toggleCompleted = useCallback((id: number) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      const completing = !next.has(id);
      if (completing) next.add(id);
      else next.delete(id);
      saveCompleted(next);
      trackEvent("question_toggle", {
        question_id: id,
        completed: completing,
      });
      return next;
    });
    setSolvedDates((prev) => {
      const next = { ...prev };
      next[id] = new Date().toISOString();
      saveSolvedDates(next);
      return next;
    });
  }, []);

  const toggleStarred = useCallback((id: number) => {
    setStarred((prev) => {
      const next = new Set(prev);
      const starring = !next.has(id);
      if (starring) next.add(id);
      else next.delete(id);
      saveStarred(next);
      trackEvent("star_toggle", { question_id: id, starred: starring });
      return next;
    });
  }, []);

  const updateNote = useCallback((id: number, value: string) => {
    setNotes((prev) => {
      const next = { ...prev };
      if (value) next[id] = value;
      else delete next[id];
      saveNotes(next);
      trackEvent("note_save", { question_id: id, has_content: !!value });
      return next;
    });
  }, []);

  const openNoteModal = useCallback(
    (id: number, title: string) => {
      setEditingNote({
        id,
        title,
        draft: notes[id] ?? "",
        confirmDiscard: false,
      });
    },
    [notes]
  );

  const togglePhase = useCallback((index: string | number) => {
    setCollapsedPhases((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }, []);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (editingNote) {
        const saved = notes[editingNote.id] ?? "";
        if (editingNote.draft !== saved) {
          setEditingNote({ ...editingNote, confirmDiscard: true });
        } else {
          setEditingNote(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editingNote, notes]);

  // Compute stats
  const stats = useMemo(() => {
    let total = 0;
    let done = 0;
    const doneByDiff = { Easy: 0, Medium: 0, Hard: 0 };
    const totalByDiff = { Easy: 0, Medium: 0, Hard: 0 };
    roadmap.phases.forEach((phase) => {
      phase.questions.forEach((rq) => {
        const q = slugToQuestion.get(rq.slug);
        if (q) {
          total++;
          if (q.difficulty in totalByDiff) totalByDiff[q.difficulty as keyof typeof totalByDiff]++;
          if (completed.has(q.id)) {
            done++;
            if (q.difficulty in doneByDiff) doneByDiff[q.difficulty as keyof typeof doneByDiff]++;
          }
        }
      });
    });
    return { total, done, pct: total > 0 ? Math.round((done / total) * 100) : 0, doneByDiff, totalByDiff };
  }, [roadmap, slugToQuestion, completed]);

  const phaseStats = useMemo(() => {
    return roadmap.phases.map((phase) => {
      let total = 0;
      let done = 0;
      phase.questions.forEach((rq) => {
        const q = slugToQuestion.get(rq.slug);
        if (q) {
          total++;
          if (completed.has(q.id)) done++;
        }
      });
      return { total, done };
    });
  }, [roadmap, slugToQuestion, completed]);

  // For beginner roadmap: group by difficulty, then phases within each
  const difficultyGroups = useMemo(() => {
    if (!["beginner", "experienced"].includes(roadmap.id)) return null;
    const difficulties = ["Easy", "Medium", "Hard"] as const;
    const groups = difficulties
      .map((diff) => {
        const phases = roadmap.phases
          .map((phase, phaseIndex) => {
            const qs = phase.questions.filter((rq) => {
              const q = slugToQuestion.get(rq.slug);
              return q?.difficulty === diff;
            });
            if (qs.length === 0) return null;
            return { phase, phaseIndex, questions: qs };
          })
          .filter(Boolean) as {
          phase: (typeof roadmap.phases)[number];
          phaseIndex: number;
          questions: (typeof roadmap.phases)[number]["questions"];
        }[];
        if (phases.length === 0) return null;
        const total = phases.reduce((sum, p) => sum + p.questions.length, 0);
        const done = phases.reduce(
          (sum, p) =>
            sum +
            p.questions.filter((rq) => {
              const q = slugToQuestion.get(rq.slug);
              return q && completed.has(q.id);
            }).length,
          0
        );
        return { difficulty: diff, phases, total, done, phaseOffset: 0 };
      })
      .filter(Boolean) as {
      difficulty: string;
      phases: {
        phase: (typeof roadmap.phases)[number];
        phaseIndex: number;
        questions: (typeof roadmap.phases)[number]["questions"];
      }[];
      total: number;
      done: number;
      phaseOffset: number;
    }[];

    let offset = 0;
    for (const group of groups) {
      group.phaseOffset = offset;
      offset += group.phases.length;
    }
    return groups;
  }, [roadmap, slugToQuestion, completed]);

  const renderQuestionRow = (q: Question, rq: { slug: string; note: string }, { showDifficulty = true } = {}) => {
    const isDone = completed.has(q.id);
    const isStarred = starred.has(q.id);
    const userNote = notes[q.id];

    return (
      <div
        key={rq.slug}
        className={`flex items-start gap-3 border-b border-zinc-100 px-4 py-3 last:border-b-0 dark:border-zinc-800/50 ${
          isDone ? "bg-green-50/30 dark:bg-green-950/20" : ""
        }`}
      >
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => toggleCompleted(q.id)}
          className="mt-1 h-4 w-4 shrink-0 accent-blue-600"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={`https://leetcode.com/problems/${q.slug}/`}
              target="_blank"
              rel="noopener noreferrer"
              className={`font-medium hover:underline ${
                isDone
                  ? "text-zinc-400 line-through dark:text-zinc-500"
                  : "text-blue-600 dark:text-blue-400"
              }`}
            >
              {q.title}
              {q.premium && (
                <Lock className="ml-1 inline h-3 w-3 text-amber-500" />
              )}
            </a>
            {showDifficulty && (
              <span
                className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${difficultyPill[q.difficulty]}`}
              >
                {q.difficulty}
              </span>
            )}
            <div className="flex flex-wrap gap-1">
              {q.pattern.map((p) => (
                <span
                  key={p}
                  className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs dark:bg-zinc-800"
                >
                  {p}
                </span>
              ))}
            </div>
            {q.companies.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {q.companies.map((c) => (
                  <span key={c.slug} className="group/icon relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icons/${c.slug}.png`}
                      alt={c.name}
                      className="h-4 w-4 rounded-sm object-contain dark:brightness-90"
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
                    <span className="hidden rounded-full bg-zinc-100 px-1.5 py-0.5 text-[10px] dark:bg-zinc-800">
                      {c.name}
                    </span>
                    <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-xs text-white opacity-0 shadow transition-opacity group-hover/icon:opacity-100 dark:bg-zinc-200 dark:text-zinc-900">
                      {c.name} - asked {c.frequency} {c.frequency === 1 ? "time" : "times"} in the last 6 months
                    </span>
                  </span>
                ))}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() =>
              setExpandedHints((prev) => {
                const next = new Set(prev);
                if (next.has(rq.slug)) next.delete(rq.slug);
                else next.add(rq.slug);
                return next;
              })
            }
            className={`mt-1.5 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm transition-colors ${
              expandedHints.has(rq.slug)
                ? "bg-amber-50 text-zinc-600 dark:bg-amber-950/30 dark:text-zinc-300"
                : "bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:hover:bg-amber-950/50"
            }`}
          >
            💡
            {expandedHints.has(rq.slug) ? (
              <span className="break-words text-left">{rq.note}</span>
            ) : (
              <span>Show hint</span>
            )}
          </button>
          {userNote && (
            <p className="mt-1 break-words text-sm text-zinc-600 dark:text-zinc-300">
              <NotebookPen className="inline h-3.5 w-3.5 shrink-0 text-blue-500" /> {userNote}
            </p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={() => toggleStarred(q.id)}
            className="rounded p-1 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            title={isStarred ? "Unstar" : "Star"}
          >
            <Star
              className={`h-4 w-4 ${
                isStarred
                  ? "fill-amber-400 text-amber-400"
                  : "text-zinc-300 dark:text-zinc-600"
              }`}
            />
          </button>
          <button
            onClick={() => openNoteModal(q.id, q.title)}
            className="rounded p-1 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            title="Add note"
          >
            <NotebookPen
              className={`h-4 w-4 ${
                userNote
                  ? "text-blue-500"
                  : "text-zinc-300 dark:text-zinc-600"
              }`}
            />
          </button>
          <a
            href={`https://leetcode.com/problems/${q.slug}/solutions/`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded p-1 text-zinc-300 transition-colors hover:bg-zinc-100 hover:text-blue-600 dark:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-blue-400"
            title="View solutions"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="group rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-bold">{roadmap.name}</h2>
        <p className="mt-1 text-sm text-zinc-500"><InlineMarkdown text={roadmap.description} /></p>
        <div className="mt-3">
          <div className="mb-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium">
            <span>{stats.done}/{stats.total} completed ({stats.pct}%)</span>
            <div className="flex gap-4 sm:opacity-0 sm:transition-opacity sm:duration-500 sm:ease-in-out sm:group-hover:opacity-100">
              {stats.totalByDiff.Easy > 0 && (
                <span className="text-green-700 dark:text-green-400">
                  Easy: {stats.doneByDiff.Easy}/{stats.totalByDiff.Easy}
                </span>
              )}
              {stats.totalByDiff.Medium > 0 && (
                <span className="text-yellow-700 dark:text-yellow-400">
                  Medium: {stats.doneByDiff.Medium}/{stats.totalByDiff.Medium}
                </span>
              )}
              {stats.totalByDiff.Hard > 0 && (
                <span className="text-red-700 dark:text-red-400">
                  Hard: {stats.doneByDiff.Hard}/{stats.totalByDiff.Hard}
                </span>
              )}
            </div>
          </div>
          <div className="relative h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
            {/* Default: solid blue bar */}
            <div
              className="absolute inset-0 h-full bg-blue-500 transition-opacity duration-500 ease-in-out sm:group-hover:opacity-0 max-sm:hidden"
              style={{ width: `${stats.pct}%` }}
            />
            {/* Hover: blended difficulty gradient */}
            <div
              className="absolute inset-0 h-full transition-opacity duration-500 ease-in-out max-sm:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
              style={{
                width: `${stats.pct}%`,
                background: (() => {
                  if (!stats.done) return "var(--color-green-500)";
                  const easyPct = (stats.doneByDiff.Easy / stats.done) * 100;
                  const medPct = ((stats.doneByDiff.Easy + stats.doneByDiff.Medium) / stats.done) * 100;
                  return `linear-gradient(90deg, var(--color-green-500) ${Math.max(easyPct - 3, 0)}%, var(--color-yellow-500) ${Math.min(easyPct + 3, medPct - 3)}%, var(--color-yellow-500) ${Math.max(medPct - 3, easyPct + 3)}%, var(--color-red-500) ${medPct + 3}%)`;
                })(),
              }}
            />
          </div>
        </div>
      </div>

      {/* Beginner: group by difficulty → phases */}
      {difficultyGroups ? (
        <div className="space-y-8">
          {difficultyGroups.map((group) => {
            const diffBorder: Record<string, string> = {
              Easy: "border-green-300 dark:border-green-800",
              Medium: "border-yellow-300 dark:border-yellow-800",
              Hard: "border-red-300 dark:border-red-800",
            };
            const diffHeaderBg: Record<string, string> = {
              Easy: "bg-green-50 dark:bg-green-950/30",
              Medium: "bg-yellow-50 dark:bg-yellow-950/30",
              Hard: "bg-red-50 dark:bg-red-950/30",
            };
            const diffPill: Record<string, string> = {
              Easy: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400",
              Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400",
              Hard: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400",
            };
            const diffSubtitle: Record<string, string> = {
              Easy: "Build your foundation with these introductory problems",
              Medium: "Medium difficulty problems begin introducing new techniques and algorithms - most of the time you will need to study the optimal solution",
              Hard: "Avoid these unless you have a lot of time - 99.9999% of the time you will have to study the optimal solution",
            };
            const groupPct = group.total > 0 ? Math.round((group.done / group.total) * 100) : 0;

            return (
              <div key={group.difficulty} className={`overflow-hidden rounded-xl border ${diffBorder[group.difficulty]}`}>
                {/* Difficulty header */}
                <div className={`px-4 py-3 ${diffHeaderBg[group.difficulty]}`}>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-sm font-bold ${diffPill[group.difficulty]}`}>
                      {group.difficulty}
                    </span>
                    <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                      {group.done}/{group.total} completed ({groupPct}%)
                    </span>
                  </div>
                  {roadmap.id === "beginner" && (
                    <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                      {diffSubtitle[group.difficulty]}
                    </p>
                  )}
                </div>

                {/* Phases within this difficulty */}
                <div className="relative p-4">
                  {group.phases.map((entry, idx) => {
                    const collapseKey = `${group.difficulty}-${entry.phaseIndex}`;
                    const isCollapsed = collapsedPhases.has(collapseKey);
                    const phaseDone = entry.questions.filter((rq) => {
                      const q = slugToQuestion.get(rq.slug);
                      return q && completed.has(q.id);
                    }).length;
                    const phaseComplete = phaseDone === entry.questions.length;

                    return (
                      <Fragment key={collapseKey}>
                        {idx > 0 && (
                          <div className="flex justify-center py-1">
                            <div className={`h-6 w-0.5 ${
                              (() => {
                                const prevEntry = group.phases[idx - 1];
                                const prevDone = prevEntry.questions.filter((rq) => {
                                  const q = slugToQuestion.get(rq.slug);
                                  return q && completed.has(q.id);
                                }).length;
                                return prevDone === prevEntry.questions.length
                                  ? "bg-green-400 dark:bg-green-600"
                                  : "bg-zinc-300 dark:bg-zinc-700";
                              })()
                            }`} />
                          </div>
                        )}

                        <div className={`rounded-lg border transition-colors ${
                          phaseComplete
                            ? "border-green-300 bg-green-50/50 dark:border-green-800 dark:bg-green-950/30"
                            : "border-zinc-200 dark:border-zinc-800"
                        }`}>
                          <button
                            onClick={() => togglePhase(collapseKey)}
                            className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                              phaseComplete
                                ? "hover:bg-green-100/50 dark:hover:bg-green-900/20"
                                : "hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                            }`}
                          >
                            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                              phaseComplete
                                ? "bg-green-500 text-white"
                                : phaseDone > 0
                                  ? "bg-blue-500 text-white"
                                  : "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
                            }`}>
                              {phaseComplete ? <Check className="h-4 w-4" /> : entry.phaseIndex + 1}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{entry.phase.title}</span>
                                <span className="text-xs text-zinc-500">
                                  {phaseDone}/{entry.questions.length}
                                </span>
                              </div>
                              {roadmap.id === "beginner" && (
                                <p className="mt-0.5 text-xs text-zinc-500">
                                  <InlineMarkdown text={
                                    group.difficulty !== "Easy" && entry.phase.mediumDescription
                                      ? entry.phase.mediumDescription
                                      : entry.phase.description
                                  } />
                                </p>
                              )}
                            </div>
                            {isCollapsed ? (
                              <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400" />
                            ) : (
                              <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400" />
                            )}
                          </button>

                          {!isCollapsed && (
                            <div className="border-t border-zinc-200 dark:border-zinc-800">
                              {entry.questions.map((rq) => {
                                const q = slugToQuestion.get(rq.slug);
                                if (!q) return null;
                                return renderQuestionRow(q, rq, { showDifficulty: false });
                              })}
                            </div>
                          )}
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Experienced / default: flat phases */
        <div className="relative">
          {roadmap.phases.map((phase, phaseIndex) => {
            const isCollapsed = collapsedPhases.has(phaseIndex);
            const ps = phaseStats[phaseIndex];
            const phaseComplete = ps.done === ps.total && ps.total > 0;

            return (
              <Fragment key={phaseIndex}>
                {phaseIndex > 0 && (
                  <div className="flex justify-center py-1">
                    <div
                      className={`h-6 w-0.5 ${
                        phaseStats[phaseIndex - 1].done ===
                          phaseStats[phaseIndex - 1].total &&
                        phaseStats[phaseIndex - 1].total > 0
                          ? "bg-green-400 dark:bg-green-600"
                          : "bg-zinc-300 dark:bg-zinc-700"
                      }`}
                    />
                  </div>
                )}

                <div
                  className={`rounded-lg border transition-colors ${
                    phaseComplete
                      ? "border-green-300 bg-green-50/50 dark:border-green-800 dark:bg-green-950/30"
                      : "border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  <button
                    onClick={() => togglePhase(phaseIndex)}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                      phaseComplete
                        ? "hover:bg-green-100/50 dark:hover:bg-green-900/20"
                        : "hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        phaseComplete
                          ? "bg-green-500 text-white"
                          : ps.done > 0
                            ? "bg-blue-500 text-white"
                            : "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      {phaseComplete ? <Check className="h-4 w-4" /> : phaseIndex + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{phase.title}</span>
                        <span className="text-xs text-zinc-500">
                          {ps.done}/{ps.total}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-zinc-500">
                        <InlineMarkdown text={phase.description} />
                      </p>
                    </div>
                    {isCollapsed ? (
                      <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400" />
                    )}
                  </button>

                  {!isCollapsed && (
                    <div className="border-t border-zinc-200 dark:border-zinc-800">
                      {phase.questions.map((rq) => {
                        const q = slugToQuestion.get(rq.slug);
                        if (!q) return null;
                        return renderQuestionRow(q, rq);
                      })}
                    </div>
                  )}
                </div>
              </Fragment>
            );
          })}
        </div>
      )}

      {/* Note Modal - same as QuestionsTable */}
      {editingNote &&
        (() => {
          const saved = notes[editingNote.id] ?? "";
          const hasChanges = editingNote.draft !== saved;
          const tryDismiss = () => {
            if (hasChanges) {
              setEditingNote({ ...editingNote, confirmDiscard: true });
            } else {
              setEditingNote(null);
            }
          };
          return (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
              onClick={tryDismiss}
            >
              <div
                className="mx-4 w-full max-w-lg rounded-xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
                onClick={(e) => e.stopPropagation()}
              >
                {editingNote.confirmDiscard ? (
                  <>
                    <h2 className="mb-2 text-lg font-semibold">
                      Unsaved changes
                    </h2>
                    <p className="mb-3 text-sm text-zinc-500">
                      Your note for{" "}
                      <span className="font-medium text-foreground">
                        {editingNote.title}
                      </span>{" "}
                      has been modified but not saved. Would you like to go back
                      and save your changes, or discard them?
                    </p>
                    <div className="mb-4 rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm dark:border-zinc-700 dark:bg-zinc-800">
                      <p className="mb-1 text-xs font-medium text-zinc-400">
                        Your unsaved note:
                      </p>
                      <p className="whitespace-pre-wrap break-words text-zinc-600 dark:text-zinc-300">
                        {editingNote.draft || (
                          <span className="italic text-zinc-400">(empty)</span>
                        )}
                      </p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          setEditingNote({
                            ...editingNote,
                            confirmDiscard: false,
                          })
                        }
                        className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                      >
                        Keep editing
                      </button>
                      <button
                        onClick={() => setEditingNote(null)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                      >
                        Discard
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="mb-1 text-lg font-semibold">
                      {editingNote.title}
                    </h2>
                    <p className="mb-4 text-sm text-zinc-500">
                      Add your notes below
                    </p>
                    <textarea
                      autoFocus
                      rows={4}
                      value={editingNote.draft}
                      onChange={(e) =>
                        setEditingNote({
                          ...editingNote,
                          draft: e.target.value,
                        })
                      }
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          (e.metaKey || e.ctrlKey)
                        ) {
                          e.preventDefault();
                          updateNote(editingNote.id, editingNote.draft);
                          setEditingNote(null);
                        }
                      }}
                      placeholder="Write your notes here..."
                      className="w-full resize-y rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm break-words focus:border-blue-500 focus:outline-none dark:border-zinc-700"
                    />
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-zinc-400">
                        {editingNote.draft.length} character
                        {editingNote.draft.length !== 1 ? "s" : ""}
                      </span>
                      {hasChanges ? (
                        <span className="text-xs text-amber-600 dark:text-amber-400">
                          ⚠ Unsaved changes ·{" "}
                          {navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}
                          +Enter to save
                        </span>
                      ) : (
                        <span className="text-xs text-zinc-400">
                          {navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}
                          +Enter to save
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <button
                        onClick={tryDismiss}
                        className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          updateNote(editingNote.id, editingNote.draft);
                          setEditingNote(null);
                        }}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        Done
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })()}
    </div>
  );
}
