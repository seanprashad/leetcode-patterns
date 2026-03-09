import { useState, useMemo, useEffect, useRef } from "react";
import { type Table } from "@tanstack/react-table";
import { Question } from "@/types/question";
import { RotateCcw, Shuffle, Download, Upload, Trash2, StarOff, Dices, ListOrdered, CalendarOff } from "lucide-react";
import type { Reminder } from "@/lib/reminders";
import { trackEvent } from "@/lib/analytics";

const difficultyColor: Record<string, string> = {
  Easy: "text-green-700 dark:text-green-400",
  Medium: "text-yellow-700 dark:text-yellow-400",
  Hard: "text-red-700 dark:text-red-400",
};

interface FilterToolbarProps {
  table: Table<Question>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  patterns: string[];
  companies: [string, string][];
  showStarredOnly: boolean;
  setShowStarredOnly: (value: boolean) => void;
  hideCompleted: boolean;
  setHideCompleted: (value: boolean) => void;
  hidePatterns: boolean;
  setHidePatterns: (value: boolean) => void;
  showDueOnly: boolean;
  setShowDueOnly: (value: boolean) => void;
  pickRandom: () => void;
  shuffleOrder: number[] | null;
  toggleShuffle: () => void;
  exportProgress: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  importProgress: (file: File) => void;
  starred: Set<number>;
  notes: Record<number, string>;
  completed: Set<number>;
  reminders: Record<number, Reminder>;
  setClearConfirm: (value: "notes" | "questions" | "starred" | "reminders" | null) => void;
  searchRef: React.RefObject<HTMLInputElement | null>;
  columnFilters: { id: string; value: unknown }[];
}

export default function FilterToolbar({
  table,
  globalFilter,
  setGlobalFilter,
  patterns,
  companies,
  showStarredOnly,
  setShowStarredOnly,
  hideCompleted,
  setHideCompleted,
  hidePatterns,
  setHidePatterns,
  showDueOnly,
  setShowDueOnly,
  pickRandom,
  shuffleOrder,
  toggleShuffle,
  exportProgress,
  fileInputRef,
  importProgress,
  starred,
  notes,
  completed,
  reminders,
  setClearConfirm,
  searchRef,
  columnFilters,
}: FilterToolbarProps) {
  const difficultyFilter = useMemo(
    () => (table.getColumn("difficulty")?.getFilterValue() as string[]) ?? [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [table, columnFilters]
  );
  const [difficultyDropdownOpen, setDifficultyDropdownOpen] = useState(false);
  const difficultyDropdownRef = useRef<HTMLDivElement>(null);

  const patternFilter = useMemo(
    () => (table.getColumn("pattern")?.getFilterValue() as string[]) ?? [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [table, columnFilters]
  );
  const [patternDropdownOpen, setPatternDropdownOpen] = useState(false);
  const [patternSearch, setPatternSearch] = useState("");
  const patternDropdownRef = useRef<HTMLDivElement>(null);

  const filteredPatterns = useMemo(() => {
    const list = patternSearch
      ? patterns.filter((p) =>
          p.toLowerCase().includes(patternSearch.toLowerCase())
        )
      : patterns;
    return [...list].sort((a, b) => {
      const aChecked = patternFilter.includes(a);
      const bChecked = patternFilter.includes(b);
      if (aChecked !== bChecked) return aChecked ? -1 : 1;
      return 0;
    });
  }, [patterns, patternSearch, patternFilter]);

  const companyFilter = useMemo(
    () => (table.getColumn("companies")?.getFilterValue() as string[]) ?? [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [table, columnFilters]
  );
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [companySearch, setCompanySearch] = useState("");
  const companyDropdownRef = useRef<HTMLDivElement>(null);

  const filteredCompanies = useMemo(() => {
    const list = companySearch
      ? companies.filter(([, name]) =>
          name.toLowerCase().includes(companySearch.toLowerCase())
        )
      : companies;
    return [...list].sort((a, b) => {
      const aChecked = companyFilter.includes(a[0]);
      const bChecked = companyFilter.includes(b[0]);
      if (aChecked !== bChecked) return aChecked ? -1 : 1;
      return 0;
    });
  }, [companies, companySearch, companyFilter]);

  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (difficultyDropdownRef.current && !difficultyDropdownRef.current.contains(e.target as Node)) {
        setDifficultyDropdownOpen(false);
      }
      if (patternDropdownRef.current && !patternDropdownRef.current.contains(e.target as Node)) {
        setPatternDropdownOpen(false);
        setPatternSearch("");
      }
      if (companyDropdownRef.current && !companyDropdownRef.current.contains(e.target as Node)) {
        setCompanyDropdownOpen(false);
        setCompanySearch("");
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
      <div className="relative">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          aria-label="Search questions"
          className="w-36 rounded border border-zinc-300 bg-white px-2 py-1.5 pr-7 shadow-sm focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
        />
        <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded bg-zinc-200 px-1 py-0.5 text-[10px] font-mono leading-none text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">/</kbd>
      </div>
      <div ref={difficultyDropdownRef} className="relative">
        <button
          onClick={() => setDifficultyDropdownOpen((o) => !o)}
          aria-expanded={difficultyDropdownOpen}
          aria-haspopup="listbox"
          className="flex items-center gap-1 whitespace-nowrap rounded border border-zinc-300 bg-white px-2 py-1.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
        >
          <span>
            {difficultyFilter.length === 0
              ? "All Difficulties"
              : `Difficulty (${difficultyFilter.length})`}
          </span>
          <svg className="h-3 w-3 shrink-0 opacity-50" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 5l3 3 3-3" />
          </svg>
        </button>
        {difficultyDropdownOpen && (
          <div className="absolute left-0 top-full z-20 mt-1 w-48 rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
            {difficultyFilter.length > 0 && (
              <button
                onClick={() => {
                  table.getColumn("difficulty")?.setFilterValue(undefined);
                }}
                className="w-full border-b border-zinc-200 px-3 py-1.5 text-left text-xs text-blue-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-blue-400 dark:hover:bg-zinc-800"
              >
                Clear all ({difficultyFilter.length})
              </button>
            )}
            <div className="py-1">
              {(["Easy", "Medium", "Hard"] as const).map((d) => (
                <label
                  key={d}
                  className="flex cursor-pointer items-center gap-2 px-3 py-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  <input
                    type="checkbox"
                    checked={difficultyFilter.includes(d)}
                    onChange={() => {
                      const next = difficultyFilter.includes(d)
                        ? difficultyFilter.filter((x) => x !== d)
                        : [...difficultyFilter, d];
                      table
                        .getColumn("difficulty")
                        ?.setFilterValue(next.length ? next : undefined);
                    }}
                    className="h-3.5 w-3.5 accent-blue-600"
                  />
                  <span className={`font-medium ${difficultyColor[d]}`}>{d}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      <div ref={patternDropdownRef} className="relative">
        <button
          onClick={() => setPatternDropdownOpen((o) => !o)}
          aria-expanded={patternDropdownOpen}
          aria-haspopup="listbox"
          className="flex items-center gap-1 whitespace-nowrap rounded border border-zinc-300 bg-white px-2 py-1.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
        >
          <span>
            {patternFilter.length === 0
              ? "All Patterns"
              : `Patterns (${patternFilter.length})`}
          </span>
          <svg className="h-3 w-3 shrink-0 opacity-50" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 5l3 3 3-3" />
          </svg>
        </button>
        {patternDropdownOpen && (
          <div className="absolute left-0 top-full z-20 mt-1 w-64 rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
            <div className="border-b border-zinc-200 p-2 dark:border-zinc-700">
              <input
                type="text"
                placeholder="Search patterns..."
                value={patternSearch}
                onChange={(e) => setPatternSearch(e.target.value)}
                className="w-full rounded border border-zinc-300 bg-transparent px-2 py-1 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-700"
                autoFocus
              />
            </div>
            {patternFilter.length > 0 && (
              <button
                onClick={() => {
                  table.getColumn("pattern")?.setFilterValue(undefined);
                  setPatternSearch("");
                }}
                className="w-full border-b border-zinc-200 px-3 py-1.5 text-left text-xs text-blue-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-blue-400 dark:hover:bg-zinc-800"
              >
                Clear all ({patternFilter.length})
              </button>
            )}
            <div className="max-h-52 overflow-y-auto py-1">
              {filteredPatterns.length === 0 ? (
                <p className="px-3 py-2 text-xs text-zinc-400">No patterns found</p>
              ) : (
                filteredPatterns.map((p) => (
                  <label
                    key={p}
                    className="flex cursor-pointer items-center gap-2 px-3 py-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    <input
                      type="checkbox"
                      checked={patternFilter.includes(p)}
                      onChange={() => {
                        const next = patternFilter.includes(p)
                          ? patternFilter.filter((x) => x !== p)
                          : [...patternFilter, p];
                        table
                          .getColumn("pattern")
                          ?.setFilterValue(next.length ? next : undefined);
                      }}
                      className="h-3.5 w-3.5 accent-blue-600"
                    />
                    {p}
                  </label>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      <div ref={companyDropdownRef} className="relative">
        <button
          onClick={() => setCompanyDropdownOpen((o) => !o)}
          aria-expanded={companyDropdownOpen}
          aria-haspopup="listbox"
          className="flex items-center gap-1 whitespace-nowrap rounded border border-zinc-300 bg-white px-2 py-1.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
        >
          <span>
            {companyFilter.length === 0
              ? "All Companies"
              : `Companies (${companyFilter.length})`}
          </span>
          <svg className="h-3 w-3 shrink-0 opacity-50" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 5l3 3 3-3" />
          </svg>
        </button>
        {companyDropdownOpen && (
          <div className="absolute left-0 top-full z-20 mt-1 w-64 rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
            <div className="border-b border-zinc-200 p-2 dark:border-zinc-700">
              <input
                type="text"
                placeholder="Search companies..."
                value={companySearch}
                onChange={(e) => setCompanySearch(e.target.value)}
                className="w-full rounded border border-zinc-300 bg-transparent px-2 py-1 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-700"
                autoFocus
              />
            </div>
            {companyFilter.length > 0 && (
              <button
                onClick={() => {
                  table.getColumn("companies")?.setFilterValue(undefined);
                  setCompanySearch("");
                }}
                className="w-full border-b border-zinc-200 px-3 py-1.5 text-left text-xs text-blue-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-blue-400 dark:hover:bg-zinc-800"
              >
                Clear all ({companyFilter.length})
              </button>
            )}
            <div className="max-h-52 overflow-y-auto py-1">
              {filteredCompanies.length === 0 ? (
                <p className="px-3 py-2 text-xs text-zinc-400">No companies found</p>
              ) : (
                filteredCompanies.map(([slug, name]) => (
                  <label
                    key={slug}
                    className="flex cursor-pointer items-center gap-2 px-3 py-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    <input
                      type="checkbox"
                      checked={companyFilter.includes(slug)}
                      onChange={() => {
                        const next = companyFilter.includes(slug)
                          ? companyFilter.filter((s) => s !== slug)
                          : [...companyFilter, slug];
                        table
                          .getColumn("companies")
                          ?.setFilterValue(next.length ? next : undefined);
                      }}
                      className="h-3.5 w-3.5 accent-blue-600"
                    />
                    {name}
                  </label>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-1 rounded-lg border border-zinc-200 px-1 py-0.5 dark:border-zinc-800">
        {([
          { label: "Starred only", checked: showStarredOnly, onChange: (v: boolean) => { setShowStarredOnly(v); trackEvent("show_starred_only", { enabled: v }); } },
          { label: "Due for review", checked: showDueOnly, onChange: (v: boolean) => { setShowDueOnly(v); trackEvent("show_due_only", { enabled: v }); } },
          { label: "Hide completed", checked: hideCompleted, onChange: (v: boolean) => { setHideCompleted(v); trackEvent("hide_completed", { enabled: v }); } },
          { label: "Hide patterns", checked: hidePatterns, onChange: (v: boolean) => { setHidePatterns(v); trackEvent("hide_patterns", { enabled: v }); } },
        ] as const).map((opt) => (
          <label key={opt.label} className={`flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded px-2 py-1.5 transition-colors select-none ${opt.checked ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800"}`}>
            <input
              type="checkbox"
              checked={opt.checked}
              onChange={(e) => opt.onChange(e.target.checked)}
              className="h-3.5 w-3.5 accent-blue-600"
            />
            {opt.label}
          </label>
        ))}
      </div>
      {/* Random & Shuffle */}
      <div className="flex items-center gap-1 rounded-lg border border-zinc-200 px-1 py-0.5 dark:border-zinc-800">
        <button
          onClick={pickRandom}
          className="inline-flex items-center gap-1 whitespace-nowrap rounded px-2 py-1.5 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <Shuffle className="h-3.5 w-3.5" />
          Random
          <kbd className="rounded bg-zinc-200 px-1 py-0.5 text-[10px] font-mono leading-none text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">r</kbd>
        </button>
        <button
          onClick={toggleShuffle}
          className={`inline-flex items-center gap-1 whitespace-nowrap rounded px-2 py-1.5 transition-colors ${
            shuffleOrder
              ? "bg-violet-50 text-violet-600 hover:bg-violet-100 dark:bg-violet-900/30 dark:text-violet-400 dark:hover:bg-violet-900/50"
              : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }`}
        >
          {shuffleOrder ? <ListOrdered className="h-3.5 w-3.5" /> : <Dices className="h-3.5 w-3.5" />}
          {shuffleOrder ? "Unshuffle" : "Shuffle"}
        </button>
      </div>
      {/* Import & Export */}
      <div className="flex items-center gap-1 rounded-lg border border-zinc-200 px-1 py-0.5 dark:border-zinc-800">
        <button
          onClick={exportProgress}
          className="inline-flex items-center gap-1 whitespace-nowrap rounded px-2 py-1.5 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <Download className="h-3.5 w-3.5" />
          Export
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-1 whitespace-nowrap rounded px-2 py-1.5 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <Upload className="h-3.5 w-3.5" />
          Import
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) importProgress(file);
            e.target.value = "";
          }}
        />
      </div>

      {/* Clear */}
      {(starred.size > 0 || Object.keys(notes).length > 0 || completed.size > 0 || Object.keys(reminders).length > 0) && (
        <div className="flex items-center gap-1 rounded-lg border border-red-200 px-1 py-0.5 dark:border-red-900/40">
          {starred.size > 0 && (
            <button
              onClick={() => setClearConfirm("starred")}
              className="inline-flex items-center gap-1 whitespace-nowrap rounded px-2 py-1.5 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
            >
              <StarOff className="h-3.5 w-3.5" />
              Stars
            </button>
          )}
          {Object.keys(notes).length > 0 && (
            <button
              onClick={() => setClearConfirm("notes")}
              className="inline-flex items-center gap-1 whitespace-nowrap rounded px-2 py-1.5 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Notes
            </button>
          )}
          {Object.keys(reminders).length > 0 && (
            <button
              onClick={() => setClearConfirm("reminders")}
              className="inline-flex items-center gap-1 whitespace-nowrap rounded px-2 py-1.5 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
            >
              <CalendarOff className="h-3.5 w-3.5" />
              Reminders
            </button>
          )}
          {completed.size > 0 && (
            <button
              onClick={() => setClearConfirm("questions")}
              className="inline-flex items-center gap-1 whitespace-nowrap rounded px-2 py-1.5 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Progress
            </button>
          )}
        </div>
      )}
    </div>
  );
}
