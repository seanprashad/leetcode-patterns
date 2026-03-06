"use client";

import { useMemo, useState, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";
import { Tooltip } from "react-tooltip";
import { PieChart } from "react-minimal-pie-chart";
import { FaLock, FaExternalLinkAlt, FaRandom } from "react-icons/fa";
import { questions, updated } from "@/lib/questions";
import { useQuestionProgress } from "@/hooks/use-question-progress";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { trackEvent } from "@/lib/analytics";
import type { Question } from "@/types/question";
import ProgressBar from "./ProgressBar";
import ResetModal from "./ResetModal";

function getInitialFilters(): ColumnFiltersState {
  if (typeof window === "undefined") return [];
  const filters: ColumnFiltersState = [];
  const keys = ["checkbox", "difficulty", "pattern", "companyNames"] as const;
  for (const key of keys) {
    const value = localStorage.getItem(key);
    if (value) filters.push({ id: key, value });
  }
  return filters;
}

export default function QuestionTable() {
  const {
    checked,
    checkedAt,
    difficultyCount,
    totalDifficultyCount,
    toggleCheck,
    reset,
  } = useQuestionProgress();

  const [showPatterns, setShowPatterns] = useLocalStorage("showPatterns", true);
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(getInitialFilters);
  const [sorting, setSorting] = useState<SortingState>([]);

  const data = useMemo(() => {
    return questions.map((q) => ({
      ...q,
      checkbox: checked[q.id] ? ("Checked" as const) : ("Unchecked" as const),
    }));
  }, [checked]);

  const setFilterWithPersist = useCallback((id: string, value: string) => {
    localStorage.setItem(id, value);
    setColumnFilters((prev) => {
      const next = prev.filter((f) => f.id !== id);
      if (value) next.push({ id, value });
      return next;
    });
  }, []);

  const columns = useMemo<ColumnDef<Question>[]>(
    () => [
      {
        id: "checkbox",
        accessorFn: (row) => (checked[row.id] ? "Checked" : "Unchecked"),
        header: () => (
          <div className="flex flex-col items-center gap-2">
            <PieChart
              data={[
                {
                  title: "Done",
                  value: difficultyCount.Total,
                  color: "#ffa929",
                },
              ]}
              totalValue={totalDifficultyCount.Total}
              label={() =>
                `${difficultyCount.Total} / ${totalDifficultyCount.Total}`
              }
              labelPosition={0}
              labelStyle={{ fill: "#A54800", fontSize: "14px" }}
              startAngle={-90}
              lineWidth={12}
              className="w-16 h-16"
              background="#e9ecef"
            />
            <ResetModal onReset={reset} />
          </div>
        ),
        cell: ({ row }) => (
          <label className="flex items-center justify-center cursor-pointer">
            <input
              type="checkbox"
              checked={checked[row.original.id] || false}
              onChange={() =>
                toggleCheck(row.original.id, row.original.difficulty)
              }
            />
          </label>
        ),
        enableSorting: false,
        filterFn: (row, _columnId, filterValue) => {
          if (!filterValue) return true;
          const isChecked = checked[row.original.id];
          return filterValue === "Checked" ? isChecked : !isChecked;
        },
        size: 80,
      },
      {
        id: "questions",
        accessorKey: "title",
        header: () => {
          const handleRandom = () => {
            const filteredRows = table.getFilteredRowModel().rows;
            if (filteredRows.length === 0) return;
            const random = Math.floor(Math.random() * filteredRows.length);
            const slug = filteredRows[random].original.slug;
            window.open(`https://leetcode.com/problems/${slug}/`, "_blank");
          };

          return (
            <div>
              <div className="mb-2 space-y-1">
                <ProgressBar
                  name="Easy"
                  value={difficultyCount.Easy}
                  total={totalDifficultyCount.Easy}
                  colorClass="bg-green-500"
                />
                <ProgressBar
                  name="Medium"
                  value={difficultyCount.Medium}
                  total={totalDifficultyCount.Medium}
                  colorClass="bg-yellow-500"
                />
                <ProgressBar
                  name="Hard"
                  value={difficultyCount.Hard}
                  total={totalDifficultyCount.Hard}
                  colorClass="bg-red-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <span>Questions</span>
                <button
                  onClick={handleRandom}
                  className="rounded bg-gray-800 p-1 text-white dark:bg-gray-600 cursor-pointer"
                  data-tooltip-id="main-tooltip"
                  data-tooltip-content="Try a random question!"
                >
                  <FaRandom className="text-xs" />
                </button>
              </div>
            </div>
          );
        },
        cell: ({ row }) => (
          <a
            href={`https://leetcode.com/problems/${row.original.slug}/`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent(
                "Table",
                "Clicked question title",
                `${row.original.title} question title`,
              )
            }
          >
            {row.original.premium && (
              <span
                data-tooltip-id="main-tooltip"
                data-tooltip-content="Requires leetcode premium to view"
              >
                <FaLock className="mr-1 inline text-xs" />
              </span>
            )}
            {row.original.title}
          </a>
        ),
        enableSorting: false,
        enableColumnFilter: false,
      },
      {
        id: "solutions",
        header: "Solutions",
        cell: ({ row }) => (
          <a
            href={`https://leetcode.com/problems/${row.original.slug}/discuss/?currentPage=1&orderBy=most_votes`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
            onClick={() =>
              trackEvent(
                "Table",
                "Clicked solution",
                `${row.original.slug} solution`,
              )
            }
          >
            <FaExternalLinkAlt />
          </a>
        ),
        enableSorting: false,
        enableColumnFilter: false,
      },
      {
        id: "pattern",
        accessorFn: (row) => row.pattern.join(","),
        header: () => (
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <span>Patterns</span>
              <button
                onClick={() => setShowPatterns((prev) => !prev)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                  showPatterns ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${
                    showPatterns ? "translate-x-4.5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </label>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1">
            {row.original.pattern.map((p) => (
              <span
                key={p}
                className="rounded-full bg-gray-200 px-2 py-0.5 text-xs dark:bg-gray-700"
              >
                {showPatterns || checked[row.original.id] ? p : "***"}
              </span>
            ))}
          </div>
        ),
        filterFn: (row, _columnId, filterValue) => {
          if (!filterValue) return true;
          return row.original.pattern.includes(filterValue);
        },
        enableSorting: false,
      },
      {
        id: "difficulty",
        accessorKey: "difficulty",
        header: "Difficulty",
        cell: ({ row }) => {
          const colorMap: Record<string, string> = {
            Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
            Medium:
              "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
            Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
          };
          return (
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${colorMap[row.original.difficulty]}`}
            >
              {row.original.difficulty}
            </span>
          );
        },
        filterFn: (row, _columnId, filterValue) => {
          if (!filterValue) return true;
          return row.original.difficulty === filterValue;
        },
        enableSorting: false,
      },
      {
        id: "companyNames",
        accessorFn: (row) => row.companyNames.join(","),
        header: () => {
          const date = new Date(updated);
          const tooltipText = `[Leetcode Premium] Companies who have asked the question 0-6 months ago - retrieved on ${date.toLocaleString("default", { month: "long" })} ${date.getDate()}, ${date.getFullYear()}`;
          return (
            <span
              data-tooltip-id="main-tooltip"
              data-tooltip-content={tooltipText}
            >
              Companies ❓
            </span>
          );
        },
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-0.5">
            {row.original.companies.map((company) => (
              <img
                key={`${row.original.slug}-${company.slug}`}
                src={`/static/icons/${company.slug}.png`}
                alt={company.name}
                className="h-5 w-5"
                data-tooltip-id="main-tooltip"
                data-tooltip-content={`Asked by ${company.name} ${company.frequency} times`}
              />
            ))}
          </div>
        ),
        filterFn: (row, _columnId, filterValue) => {
          if (!filterValue) return true;
          return row.original.companyNames.includes(filterValue);
        },
        sortingFn: (a, b) =>
          a.original.companies.length - b.original.companies.length,
      },
      {
        id: "lastSolvedOn",
        header: "Last Solved On",
        cell: ({ row }) => (
          <span className="text-sm">{checkedAt[row.original.id] || ""}</span>
        ),
        enableSorting: false,
        enableColumnFilter: false,
      },
    ],
    [
      checked,
      checkedAt,
      difficultyCount,
      totalDifficultyCount,
      showPatterns,
      reset,
      toggleCheck,
      setShowPatterns,
    ],
  );

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters, sorting },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Compute unique pattern and company options for filter dropdowns
  const patternOptions = useMemo(() => {
    const set = new Set<string>();
    for (const q of questions) q.pattern.forEach((p) => set.add(p));
    return [...set].sort();
  }, []);

  const companyOptions = useMemo(() => {
    const set = new Set<string>();
    const rows = table.getFilteredRowModel().rows;
    for (const row of rows) {
      row.original.companyNames.forEach((c) => set.add(c));
    }
    return [...set].sort();
  }, [table.getFilteredRowModel().rows]);

  // Pattern frequency for filtered rows
  const activeFilters = columnFilters.filter((f) =>
    ["difficulty", "companyNames"].includes(f.id),
  );
  const patternFrequencies = useMemo(() => {
    if (activeFilters.length === 0) return null;
    const rows = table.getFilteredRowModel().rows;
    const freq: Record<string, number> = {};
    for (const row of rows) {
      for (const p of row.original.pattern) {
        freq[p] = (freq[p] || 0) + 1;
      }
    }
    return Object.entries(freq).sort((a, b) => b[1] - a[1]);
  }, [table.getFilteredRowModel().rows, activeFilters.length]);

  return (
    <div>
      <Tooltip id="main-tooltip" />

      {/* Filter controls */}
      <div className="mb-4 flex flex-wrap gap-3">
        <FilterDropdown
          label="Status"
          value={
            (columnFilters.find((f) => f.id === "checkbox")?.value as string) ||
            ""
          }
          options={["Checked", "Unchecked"]}
          onChange={(v) => setFilterWithPersist("checkbox", v)}
        />
        <FilterDropdown
          label="Difficulty"
          value={
            (columnFilters.find((f) => f.id === "difficulty")
              ?.value as string) || ""
          }
          options={["Easy", "Medium", "Hard"]}
          onChange={(v) => setFilterWithPersist("difficulty", v)}
        />
        <FilterDropdown
          label="Pattern"
          value={
            (columnFilters.find((f) => f.id === "pattern")?.value as string) ||
            ""
          }
          options={patternOptions}
          onChange={(v) => setFilterWithPersist("pattern", v)}
        />
        <FilterDropdown
          label="Company"
          value={
            (columnFilters.find((f) => f.id === "companyNames")
              ?.value as string) || ""
          }
          options={companyOptions}
          onChange={(v) => setFilterWithPersist("companyNames", v)}
        />
      </div>

      {/* Pattern frequencies */}
      {patternFrequencies && (
        <div className="mb-4">
          <h5 className="mb-2 text-sm font-semibold">
            Problems pattern frequency
          </h5>
          <div className="flex flex-wrap gap-1">
            {patternFrequencies.map(([pattern, count]) => (
              <span
                key={pattern}
                className="rounded-full bg-gray-200 px-2 py-0.5 text-xs dark:bg-gray-700"
                data-tooltip-id="main-tooltip"
                data-tooltip-content={`${count} "${pattern}" related problems`}
              >
                {pattern}: {count}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-2 py-2 text-left text-xs font-medium"
                    style={{
                      width:
                        header.column.getSize() !== 150
                          ? header.column.getSize()
                          : undefined,
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{ asc: " 🔼", desc: " 🔽" }[
                          header.column.getIsSorted() as string
                        ] ?? ""}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-100 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-2 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800"
      aria-label={`Filter by ${label}`}
    >
      <option value="">All {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
