"use client";

import { useState, useMemo, useCallback, useEffect, useRef, Fragment } from "react";
import { useSearchParams } from "next/navigation";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,

  createColumnHelper,
  flexRender,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { Question } from "@/types/question";
import { ExternalLink, RotateCcw, Shuffle, ChevronRight, ChevronDown, Download, Upload, Trash2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const STORAGE_KEY = "leetcode-patterns-completed";

function loadCompleted(): Set<number> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw) as number[]);
  } catch {}
  return new Set();
}

function saveCompleted(ids: Set<number>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

const NOTES_KEY = "leetcode-patterns-notes";

function loadNotes(): Record<number, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

function saveNotes(notes: Record<number, string>) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}


const columnHelper = createColumnHelper<Question>();

const difficultyColor: Record<string, string> = {
  Easy: "text-green-600 dark:text-green-400",
  Medium: "text-yellow-600 dark:text-yellow-400",
  Hard: "text-red-600 dark:text-red-400",
};

const makeColumns = (
  completed: Set<number>,
  toggleCompleted: (id: number) => void,
  notes: Record<number, string>,
  openNoteModal: (id: number, title: string) => void,
  hidePatterns: boolean,
  companyFilter: string[],
  updatedDate: string
) => [
  columnHelper.display({
    id: "completed",
    header: "✓",
    size: 40,
    cell: (info) => (
      <input
        type="checkbox"
        checked={completed.has(info.row.original.id)}
        onChange={() => toggleCompleted(info.row.original.id)}
        className="h-4 w-4 pointer-events-none accent-blue-600"
        tabIndex={-1}
      />
    ),
    meta: { clickable: true },
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
      <span className={`font-medium ${difficultyColor[info.getValue()]}`}>
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
            className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs dark:bg-zinc-800"
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
      <span>
        Companies
        <span className="ml-1.5 text-[10px] font-normal text-zinc-400 dark:text-zinc-500">
          (updated {new Date(updatedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })})
        </span>
      </span>
    ),
    meta: { hideOnMobile: true },
    cell: (info) => (
      <div className="flex w-[156px] flex-wrap gap-1">
        {info.getValue().map((c) => (
          <span key={c.slug} className="group/icon relative">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icons/${c.slug}.png`}
              alt={c.name}
              className="h-5 w-5 rounded-sm object-contain dark:brightness-90"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
              }}
            />
            <span className="hidden rounded-full bg-zinc-100 px-2 py-0.5 text-xs dark:bg-zinc-800">
              {c.name}
            </span>
            <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-xs text-white opacity-0 shadow transition-opacity group-hover/icon:opacity-100 dark:bg-zinc-200 dark:text-zinc-900">
              Asked {c.frequency} {c.frequency === 1 ? "time" : "times"} by {c.name}
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
    size: 200,
    meta: { hideOnMobile: true },
    cell: (info) => {
      const note = notes[info.row.original.id];
      return (
        <button
          onClick={() =>
            openNoteModal(info.row.original.id, info.row.original.title)
          }
          className="block max-w-[200px] cursor-pointer truncate text-left text-sm text-zinc-400 hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-400"
        >
          {note || "Add a note..."}
        </button>
      );
    },
    enableSorting: false,
  }),
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

function parseInitialFilters(searchParams: URLSearchParams) {
  const filters: ColumnFiltersState = [];
  const difficulty = searchParams.get("difficulty");
  if (difficulty) filters.push({ id: "difficulty", value: difficulty.split(",") });
  const pattern = searchParams.get("pattern");
  if (pattern) filters.push({ id: "pattern", value: pattern.split(",") });
  const companies = searchParams.get("companies");
  if (companies) filters.push({ id: "companies", value: companies.split(",") });
  return filters;
}

export default function QuestionsTable({ data, updatedDate }: { data: Question[]; updatedDate: string }) {
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() =>
    parseInitialFilters(searchParams)
  );
  const [globalFilter, setGlobalFilter] = useState(
    () => searchParams.get("q") ?? ""
  );
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const [notes, setNotes] = useState<Record<number, string>>({});

  useEffect(() => {
    setCompleted(loadCompleted());
    setNotes(loadNotes());
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (globalFilter) params.set("q", globalFilter);
    const difficulty = columnFilters.find((f) => f.id === "difficulty")?.value as string[] | undefined;
    if (difficulty?.length) params.set("difficulty", difficulty.join(","));
    const pattern = columnFilters.find((f) => f.id === "pattern")?.value as string[] | undefined;
    if (pattern?.length) params.set("pattern", pattern.join(","));
    const companies = columnFilters.find((f) => f.id === "companies")?.value as string[] | undefined;
    if (companies?.length) params.set("companies", companies.join(","));
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [globalFilter, columnFilters]);

  const toggleCompleted = useCallback((id: number) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      const completing = !next.has(id);
      if (completing) next.add(id);
      else next.delete(id);
      saveCompleted(next);
      trackEvent("question_toggle", { question_id: id, completed: completing });
      return next;
    });
  }, []);

  const patterns = useMemo(() => {
    const set = new Set<string>();
    data.forEach((q) => q.pattern.forEach((p) => set.add(p)));
    return Array.from(set).sort();
  }, [data]);

  const companies = useMemo(() => {
    const map = new Map<string, string>();
    data.forEach((q) =>
      q.companies.forEach((c) => {
        if (!map.has(c.slug)) map.set(c.slug, c.name);
      })
    );
    return Array.from(map.entries())
      .sort(([, a], [, b]) => a.localeCompare(b));
  }, [data]);

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

  const [editingNote, setEditingNote] = useState<{
    id: number;
    title: string;
    draft: string;
    confirmDiscard: boolean;
  } | null>(null);

  const openNoteModal = useCallback((id: number, title: string) => {
    setEditingNote({ id, title, draft: notes[id] ?? "", confirmDiscard: false });
  }, [notes]);

  const [hideCompleted, setHideCompleted] = useState(false);
  const [hidePatterns, setHidePatterns] = useState(false);

  const activeCompanyFilter = useMemo(
    () => (columnFilters.find((f) => f.id === "companies")?.value as string[]) ?? [],
    [columnFilters]
  );

  const columns = useMemo(
    () => makeColumns(completed, toggleCompleted, notes, openNoteModal, hidePatterns, activeCompanyFilter, updatedDate),
    [completed, toggleCompleted, notes, openNoteModal, hidePatterns, activeCompanyFilter, updatedDate]
  );

  useEffect(() => {
    if (activeCompanyFilter.length === 1) {
      setSorting([{ id: "companies", desc: true }]);
    } else {
      setSorting((prev) =>
        prev.some((s) => s.id === "companies")
          ? prev.filter((s) => s.id !== "companies")
          : prev
      );
    }
  }, [activeCompanyFilter]);

  const filteredData = useMemo(
    () => (hideCompleted ? data.filter((q) => !completed.has(q.id)) : data),
    [data, completed, hideCompleted]
  );

  const columnVisibility = useMemo(() => {
    if (!isMobile) return {};
    const vis: Record<string, boolean> = {};
    columns.forEach((col) => {
      const id = "accessorKey" in col ? (col.accessorKey as string) : (col as { id?: string }).id;
      if (id && (col.meta as { hideOnMobile?: boolean })?.hideOnMobile) {
        vis[id] = false;
      }
    });
    return vis;
  }, [isMobile, columns]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, columnFilters, globalFilter, columnVisibility },
    globalFilterFn: (row, _columnId, filterValue: string) => {
      const q = row.original;
      const search = filterValue.toLowerCase();
      return (
        q.title.toLowerCase().includes(search) ||
        q.difficulty.toLowerCase().includes(search) ||
        q.pattern.some((p) => p.toLowerCase().includes(search)) ||
        q.companies.some((c) => c.name.toLowerCase().includes(search))
      );
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const stats = useMemo(() => {
    const totals = { Easy: 0, Medium: 0, Hard: 0 };
    const done = { Easy: 0, Medium: 0, Hard: 0 };
    data.forEach((q) => {
      totals[q.difficulty]++;
      if (completed.has(q.id)) done[q.difficulty]++;
    });
    return { totals, done, total: data.length, totalDone: completed.size };
  }, [data, completed]);

  const pickRandom = useCallback(() => {
    const unsolved = table
      .getFilteredRowModel()
      .rows.filter((r) => !completed.has(r.original.id));
    if (unsolved.length === 0) return;
    const pick = unsolved[Math.floor(Math.random() * unsolved.length)];
    trackEvent("random_question", { question_id: pick.original.id, slug: pick.original.slug });
    window.open(
      `https://leetcode.com/problems/${pick.original.slug}/description/`,
      "_blank"
    );
  }, [table, completed]);

  const [resetConfirmGroup, setResetConfirmGroup] = useState<string | null>(null);
  const [clearConfirm, setClearConfirm] = useState<"notes" | "questions" | null>(null);
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = useCallback((group: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  }, []);

  const resetGroupProgress = useCallback((difficulty: string) => {
    const ids = data.filter((q) => q.difficulty === difficulty).map((q) => q.id);
    setCompleted((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.delete(id));
      saveCompleted(next);
      return next;
    });
    setNotes((prev) => {
      const next = { ...prev };
      ids.forEach((id) => delete next[id]);
      saveNotes(next);
      return next;
    });
    trackEvent("reset_group", { difficulty });
    setResetConfirmGroup(null);
  }, [data]);

  const clearAllNotes = useCallback(() => {
    setNotes({});
    saveNotes({});
    trackEvent("clear_all_notes");
    setClearConfirm(null);
  }, []);

  const clearAllQuestions = useCallback(() => {
    setCompleted(new Set());
    saveCompleted(new Set());
    trackEvent("clear_all_progress");
    setClearConfirm(null);
  }, []);

  const exportProgress = useCallback(() => {
    const payload = { completed: [...completed], notes };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leetcode-patterns-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    trackEvent("export_progress", { completed_count: completed.size, notes_count: Object.keys(notes).length });
  }, [completed, notes]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const importProgress = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (Array.isArray(parsed.completed)) {
          const imported = new Set<number>(parsed.completed);
          setCompleted(imported);
          saveCompleted(imported);
        }
        if (parsed.notes && typeof parsed.notes === "object") {
          setNotes(parsed.notes);
          saveNotes(parsed.notes);
        }
        trackEvent("import_progress", { completed_count: parsed.completed?.length ?? 0, notes_count: parsed.notes ? Object.keys(parsed.notes).length : 0 });
      } catch {}
    };
    reader.readAsText(file);
  }, []);

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "/" ) {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key === "r") {
        pickRandom();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pickRandom]);

  // Track filter changes
  const activeDifficultyFilter = useMemo(
    () => (columnFilters.find((f) => f.id === "difficulty")?.value as string[])?.join(",") ?? "",
    [columnFilters]
  );
  const activePatternFilter = useMemo(
    () => (columnFilters.find((f) => f.id === "pattern")?.value as string[])?.join(",") ?? "",
    [columnFilters]
  );
  const activeCompanyFilterStr = useMemo(
    () => activeCompanyFilter.join(","),
    [activeCompanyFilter]
  );

  useEffect(() => {
    if (activeDifficultyFilter) trackEvent("filter_difficulty", { values: activeDifficultyFilter });
  }, [activeDifficultyFilter]);

  useEffect(() => {
    if (activePatternFilter) trackEvent("filter_pattern", { values: activePatternFilter });
  }, [activePatternFilter]);

  useEffect(() => {
    if (activeCompanyFilterStr) trackEvent("filter_company", { values: activeCompanyFilterStr });
  }, [activeCompanyFilterStr]);

  // Track search with debounce
  useEffect(() => {
    if (!globalFilter) return;
    const timer = setTimeout(() => {
      trackEvent("search", { query: globalFilter });
    }, 500);
    return () => clearTimeout(timer);
  }, [globalFilter]);

  // Track sorting
  useEffect(() => {
    if (sorting.length > 0) {
      trackEvent("sort_column", { column: sorting[0].id, direction: sorting[0].desc ? "desc" : "asc" });
    }
  }, [sorting]);

  const difficultyFilter =
    (table.getColumn("difficulty")?.getFilterValue() as string[]) ?? [];
  const [difficultyDropdownOpen, setDifficultyDropdownOpen] = useState(false);
  const difficultyDropdownRef = useRef<HTMLDivElement>(null);

  const patternFilter =
    (table.getColumn("pattern")?.getFilterValue() as string[]) ?? [];
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

  const companyFilter =
    (table.getColumn("companies")?.getFilterValue() as string[]) ?? [];
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
    const handleClick = (e: MouseEvent) => {
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
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const pct = stats.total > 0 ? Math.round((stats.totalDone / stats.total) * 100) : 0;

  const companySortActive = sorting.some((s) => s.id === "companies");
  const companySortDesc = sorting.find((s) => s.id === "companies")?.desc ?? true;

  const groupedRows = useMemo(() => {
    const rows = table.getRowModel().rows;

    if (companySortActive && activeCompanyFilter.length === 1) {
      const slug = activeCompanyFilter[0];
      const sorted = [...rows].sort((a, b) => {
        const freqA = a.original.companies.find((c) => c.slug === slug)?.frequency ?? 0;
        const freqB = b.original.companies.find((c) => c.slug === slug)?.frequency ?? 0;
        return companySortDesc ? freqB - freqA : freqA - freqB;
      });
      return [{ key: null as string | null, rows: sorted }];
    }

    const groupMap = new Map<string, typeof rows>();
    for (const row of rows) {
      const key = row.original.difficulty;
      if (!groupMap.has(key)) groupMap.set(key, []);
      groupMap.get(key)!.push(row);
    }

    return ["Easy", "Medium", "Hard"]
      .filter((k) => groupMap.has(k))
      .map((key) => ({ key: key as string | null, rows: groupMap.get(key)! }));
  }, [table, sorting, columnFilters, globalFilter, hideCompleted, completed, companySortActive, companySortDesc, activeCompanyFilter]);

  return (
    <div className="space-y-4">
      {/* Sticky: Progress + Filters */}
      <div className="sticky top-0 z-20 -mx-4 space-y-4 bg-background px-4 pb-4">
      {/* Progress */}
      <div className="group relative rounded-lg border border-zinc-200 bg-zinc-50 p-3 sm:p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium">
          <span>{stats.totalDone}/{stats.total} completed ({pct}%)</span>
          <div className="flex gap-4 sm:opacity-0 sm:transition-opacity sm:duration-500 sm:ease-in-out sm:group-hover:opacity-100">
            <span className="text-green-600 dark:text-green-400">
              Easy: {stats.done.Easy}/{stats.totals.Easy}
            </span>
            <span className="text-yellow-600 dark:text-yellow-400">
              Medium: {stats.done.Medium}/{stats.totals.Medium}
            </span>
            <span className="text-red-600 dark:text-red-400">
              Hard: {stats.done.Hard}/{stats.totals.Hard}
            </span>
          </div>
        </div>
        <div className="relative h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
          {/* Default: solid blue bar */}
          <div
            className="absolute inset-0 h-full bg-blue-500 transition-opacity duration-500 ease-in-out sm:group-hover:opacity-0 max-sm:hidden"
            style={{ width: `${pct}%` }}
          />
          {/* Hover: blended difficulty gradient */}
          <div
            className="absolute inset-0 h-full transition-opacity duration-500 ease-in-out max-sm:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
            style={{
              width: `${pct}%`,
              background: (() => {
                if (!stats.totalDone) return "#22c55e";
                const easyPct = (stats.done.Easy / stats.totalDone) * 100;
                const medPct = ((stats.done.Easy + stats.done.Medium) / stats.totalDone) * 100;
                return `linear-gradient(90deg, #22c55e ${Math.max(easyPct - 10, 0)}%, #eab308 ${Math.min(easyPct + 10, medPct - 10)}%, #eab308 ${Math.max(medPct - 10, easyPct + 10)}%, #ef4444 ${medPct + 10}%)`;
              })(),
            }}
          />
        </div>

      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search (/)..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-36 rounded border border-zinc-300 bg-white px-2 py-1.5 shadow-sm focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
        />
        <div ref={difficultyDropdownRef} className="relative">
          <button
            onClick={() => setDifficultyDropdownOpen((o) => !o)}
            className="flex items-center gap-1 rounded border border-zinc-300 bg-white px-2 py-1.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
          >
            <span className="flex items-center gap-1">
              {difficultyFilter.length === 0 ? (
                "All Difficulties"
              ) : (
                <>
                  {difficultyFilter.map((d) => (
                    <span
                      key={d}
                      className="inline-flex items-center gap-0.5 rounded bg-blue-100 px-1.5 py-0.5 text-xs text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                    >
                      {d}
                      <span
                        role="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const next = difficultyFilter.filter((x) => x !== d);
                          table
                            .getColumn("difficulty")
                            ?.setFilterValue(next.length ? next : undefined);
                        }}
                        className="ml-0.5 cursor-pointer hover:text-blue-900 dark:hover:text-blue-100"
                      >
                        ×
                      </span>
                    </span>
                  ))}
                </>
              )}
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
            className="flex items-center gap-1 rounded border border-zinc-300 bg-white px-2 py-1.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
          >
            <span className="flex items-center gap-1">
              {patternFilter.length === 0 ? (
                "All Patterns"
              ) : (
                <>
                  {patternFilter.slice(0, 2).map((p) => (
                    <span
                      key={p}
                      className="inline-flex items-center gap-0.5 rounded bg-blue-100 px-1.5 py-0.5 text-xs text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                    >
                      {p}
                      <span
                        role="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const next = patternFilter.filter((x) => x !== p);
                          table
                            .getColumn("pattern")
                            ?.setFilterValue(next.length ? next : undefined);
                        }}
                        className="ml-0.5 cursor-pointer hover:text-blue-900 dark:hover:text-blue-100"
                      >
                        ×
                      </span>
                    </span>
                  ))}
                  {patternFilter.length > 2 && (
                    <span className="text-xs text-zinc-500">
                      +{patternFilter.length - 2}
                    </span>
                  )}
                </>
              )}
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
            className="flex items-center gap-1 rounded border border-zinc-300 bg-white px-2 py-1.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
          >
            <span className="flex items-center gap-1">
              {companyFilter.length === 0 ? (
                "All Companies"
              ) : (
                <>
                  {companyFilter.slice(0, 2).map((slug) => {
                    const name = companies.find(([s]) => s === slug)?.[1] ?? slug;
                    return (
                      <span
                        key={slug}
                        className="inline-flex items-center gap-0.5 rounded bg-blue-100 px-1.5 py-0.5 text-xs text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                      >
                        {name}
                        <span
                          role="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const next = companyFilter.filter((s) => s !== slug);
                            table
                              .getColumn("companies")
                              ?.setFilterValue(next.length ? next : undefined);
                          }}
                          className="ml-0.5 cursor-pointer hover:text-blue-900 dark:hover:text-blue-100"
                        >
                          ×
                        </span>
                      </span>
                    );
                  })}
                  {companyFilter.length > 2 && (
                    <span className="text-xs text-zinc-500">
                      +{companyFilter.length - 2}
                    </span>
                  )}
                </>
              )}
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
        <label className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap">
          <input
            type="checkbox"
            checked={hideCompleted}
            onChange={(e) => { setHideCompleted(e.target.checked); trackEvent("hide_completed", { enabled: e.target.checked }); }}
            className="h-3.5 w-3.5 accent-blue-600"
          />
          Hide completed
        </label>
        <label className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap">
          <input
            type="checkbox"
            checked={hidePatterns}
            onChange={(e) => { setHidePatterns(e.target.checked); trackEvent("hide_patterns", { enabled: e.target.checked }); }}
            className="h-3.5 w-3.5 accent-blue-600"
          />
          Hide patterns
        </label>
        <div className="group/random relative">
          <button
            onClick={pickRandom}
            className="rounded border border-zinc-300 p-1.5 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            <Shuffle className="h-3.5 w-3.5" />
          </button>
          <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-xs text-white opacity-0 shadow transition-opacity group-hover/random:opacity-100 dark:bg-zinc-200 dark:text-zinc-900">
            Random question <kbd className="ml-1 rounded bg-zinc-600 px-1 font-mono dark:bg-zinc-400">r</kbd>
          </span>
        </div>
        <div className="group/export relative">
          <button
            onClick={exportProgress}
            className="rounded border border-zinc-300 p-1.5 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
          <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-xs text-white opacity-0 shadow transition-opacity group-hover/export:opacity-100 dark:bg-zinc-200 dark:text-zinc-900">
            Export progress
          </span>
        </div>
        <div className="group/import relative">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="rounded border border-zinc-300 p-1.5 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            <Upload className="h-3.5 w-3.5" />
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
          <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-xs text-white opacity-0 shadow transition-opacity group-hover/import:opacity-100 dark:bg-zinc-200 dark:text-zinc-900">
            Import progress
          </span>
        </div>
        {Object.keys(notes).length > 0 && (
          <div className="group/clearnotes relative">
            <button
              onClick={() => setClearConfirm("notes")}
              className="rounded border border-zinc-300 p-1.5 transition-colors hover:bg-red-50 hover:text-red-600 dark:border-zinc-700 dark:hover:bg-red-900/30 dark:hover:text-red-400"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
            <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-xs text-white opacity-0 shadow transition-opacity group-hover/clearnotes:opacity-100 dark:bg-zinc-200 dark:text-zinc-900">
              Clear all notes
            </span>
          </div>
        )}
        {completed.size > 0 && (
          <div className="group/clearqs relative">
            <button
              onClick={() => setClearConfirm("questions")}
              className="rounded border border-zinc-300 p-1.5 transition-colors hover:bg-red-50 hover:text-red-600 dark:border-zinc-700 dark:hover:bg-red-900/30 dark:hover:text-red-400"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
            <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-xs text-white opacity-0 shadow transition-opacity group-hover/clearqs:opacity-100 dark:bg-zinc-200 dark:text-zinc-900">
              Clear all progress
            </span>
          </div>
        )}
      </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-2 py-2 font-semibold whitespace-nowrap select-none sm:px-4 sm:py-3"
                    style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                    onClick={header.column.getToggleSortingHandler()}
                    role={header.column.getCanSort() ? "button" : undefined}
                  >
                    <span className="flex items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{ asc: " ▲", desc: " ▼" }[
                        header.column.getIsSorted() as string
                      ] ?? null}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {groupedRows.map((group) => {
              const isCollapsed = group.key !== null && collapsedGroups.has(group.key);
              const groupDone = group.rows.filter((r) => completed.has(r.original.id)).length;
              return (
                <Fragment key={group.key ?? "all"}>
                  {group.key !== null && (
                  <tr
                    className={`cursor-pointer select-none border-l-4 ${{
                      Easy: "border-l-green-500 bg-green-50 hover:bg-green-100 dark:bg-green-900/30 dark:hover:bg-green-900/50",
                      Medium: "border-l-yellow-500 bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50",
                      Hard: "border-l-red-500 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50",
                    }[group.key] ?? ""}`}
                    onClick={() => toggleGroup(group.key!)}
                  >
                    <td
                      colSpan={columns.length}
                      className="px-2 py-2.5 sm:px-4 sm:py-3"
                    >
                      <span className="flex items-center gap-2">
                        {isCollapsed ? (
                          <ChevronRight className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                        <span className={`text-base font-bold ${difficultyColor[group.key] ?? ""}`}>
                          {group.key}
                        </span>
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          {groupDone}/{group.rows.length} completed
                        </span>
                        {groupDone > 0 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setResetConfirmGroup(group.key!);
                            }}
                            className="ml-auto flex items-center gap-1 rounded px-1.5 py-1 text-xs text-zinc-400 transition-colors hover:bg-zinc-200 hover:text-zinc-600 dark:hover:bg-zinc-600 dark:hover:text-zinc-300"
                          >
                            <RotateCcw className="h-3 w-3" />
                            <span className="hidden sm:inline">Reset</span>
                          </button>
                        )}
                      </span>
                    </td>
                  </tr>
                  )}
                  {!isCollapsed &&
                    group.rows.map((row) => (
                      <tr
                        key={row.id}
                        className={
                          completed.has(row.original.id)
                            ? `text-zinc-400 line-through decoration-zinc-300 dark:text-zinc-500 dark:decoration-zinc-600 ${
                                {
                                  Easy: "bg-green-100/60 hover:bg-green-100 dark:bg-green-900/30 dark:hover:bg-green-900/40",
                                  Medium: "bg-yellow-100/60 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/40",
                                  Hard: "bg-red-100/60 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/40",
                                }[row.original.difficulty]
                              }`
                            : "hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                        }
                      >
                        {row.getVisibleCells().map((cell) => {
                          const isClickable = (cell.column.columnDef.meta as { clickable?: boolean })?.clickable;
                          return (
                            <td
                              key={cell.id}
                              className={`px-2 py-2 sm:px-4 sm:py-3 ${isClickable ? "cursor-pointer select-none" : ""}`}
                              onClick={isClickable ? () => toggleCompleted(row.original.id) : undefined}
                            >
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Note Modal */}
      {editingNote && (() => {
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
                  <h2 className="mb-2 text-lg font-semibold">Unsaved changes</h2>
                  <p className="mb-3 text-sm text-zinc-500">
                    Your note for <span className="font-medium text-foreground">{editingNote.title}</span> has
                    been modified but not saved. Would you like to go back and save
                    your changes, or discard them?
                  </p>
                  <div className="mb-4 rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm dark:border-zinc-700 dark:bg-zinc-800">
                    <p className="mb-1 text-xs font-medium text-zinc-400">Your unsaved note:</p>
                    <p className="whitespace-pre-wrap text-zinc-600 dark:text-zinc-300">
                      {editingNote.draft || <span className="italic text-zinc-400">(empty)</span>}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() =>
                        setEditingNote({ ...editingNote, confirmDiscard: false })
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
                  <h2 className="mb-1 text-lg font-semibold">{editingNote.title}</h2>
                  <p className="mb-4 text-sm text-zinc-500">Add your notes below</p>
                  <textarea
                    autoFocus
                    rows={4}
                    value={editingNote.draft}
                    onChange={(e) =>
                      setEditingNote({ ...editingNote, draft: e.target.value })
                    }
                    placeholder="Write your notes here..."
                    className="w-full resize-none rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-700"
                  />
                  {hasChanges && (
                    <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
                      ⚠ You have unsaved changes
                    </p>
                  )}
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

      {/* Reset Confirmation Modal */}
      {resetConfirmGroup && (() => {
        const groupIds = data.filter((q) => q.difficulty === resetConfirmGroup).map((q) => q.id);
        const doneCount = groupIds.filter((id) => completed.has(id)).length;
        const noteCount = groupIds.filter((id) => notes[id]).length;
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => setResetConfirmGroup(null)}
          >
            <div
              className="mx-4 w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="mb-2 text-lg font-semibold">
                Reset {resetConfirmGroup} progress
              </h2>
              <p className="mb-4 text-sm text-zinc-500">
                This will clear {doneCount} completed question(s)
                {noteCount > 0 && ` and ${noteCount} note(s)`} in the{" "}
                <span className={`font-medium ${difficultyColor[resetConfirmGroup] ?? ""}`}>
                  {resetConfirmGroup}
                </span>{" "}
                group. This action cannot be undone.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setResetConfirmGroup(null)}
                  className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => resetGroupProgress(resetConfirmGroup)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Clear All Confirmation Modal */}
      {clearConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setClearConfirm(null)}
        >
          <div
            className="mx-4 w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-2 text-lg font-semibold">
              {clearConfirm === "notes" ? "Clear all notes" : "Clear all progress"}
            </h2>
            <p className="mb-4 text-sm text-zinc-500">
              {clearConfirm === "notes"
                ? `This will delete ${Object.keys(notes).length} note(s). This action cannot be undone.`
                : `This will clear ${completed.size} completed question(s). This action cannot be undone.`}
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setClearConfirm(null)}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                onClick={clearConfirm === "notes" ? clearAllNotes : clearAllQuestions}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
