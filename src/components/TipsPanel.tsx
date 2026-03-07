"use client";

import { useState, useCallback, useEffect, Fragment } from "react";
import { createPortal } from "react-dom";
import { Lightbulb, X, Copy, Check } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

function formatApproach(text: string) {
  const parts = text.split(/(O\([^)]*\)|\bK\b)/g);
  return parts.map((part, i) =>
    /^O\(/.test(part) || /^\bK\b$/.test(part) ? (
      <code key={i} className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">{part}</code>
    ) : (
      part
    )
  );
}

const tipGroups = [
  { label: "Arrays & Strings", tips: [
    { condition: "If input array is sorted", approaches: ["Binary search", "Two pointers"] },
    { condition: "If need O(1) lookup", approaches: ["Hash table", "Hash set"] },
    { condition: "If must solve in-place", approaches: ["Swap corresponding values", "Store multiple values in the same pointer"] },
    { condition: "If asked for common strings", approaches: ["Map", "Trie"] },
    { condition: "If asked to count bits or use XOR", approaches: ["Bit manipulation"] },
  ]},
  { label: "Subarrays & Sequences", tips: [
    { condition: "If asked for max/min subarray/subset", approaches: ["Dynamic programming", "Sliding window"] },
    { condition: "If asked for sliding window max/min", approaches: ["Monotonic queue"] },
    { condition: "If asked for next greater/smaller element", approaches: ["Monotonic stack"] },
    { condition: "If need range sum/frequency queries", approaches: ["Prefix sum", "Binary indexed tree", "Segment tree"] },
  ]},
  { label: "Trees & Graphs", tips: [
    { condition: "If given a tree", approaches: ["DFS", "BFS"] },
    { condition: "If given a graph", approaches: ["DFS", "BFS", "Union-Find"] },
    { condition: "If given a matrix", approaches: ["BFS", "DFS", "Dynamic programming"] },
    { condition: "If asked for connectivity/grouping", approaches: ["Union-Find", "DFS"] },
    { condition: "If asked for ordering/scheduling", approaches: ["Topological sort"] },
  ]},
  { label: "Linked Lists & Stacks", tips: [
    { condition: "If given a linked list", approaches: ["Two pointers"] },
    { condition: "If recursion is banned", approaches: ["Stack"] },
  ]},
  { label: "Sorting & Intervals", tips: [
    { condition: "If asked for top/least K items", approaches: ["Heap", "Quickselect", "Bucket sort"] },
    { condition: "If asked to merge sorted lists/intervals", approaches: ["Merge sort", "Heap"] },
    { condition: "If asked for overlapping intervals", approaches: ["Sorting", "Sweep line"] },
    { condition: "If given a stream of data", approaches: ["Heap", "Design"] },
  ]},
  { label: "Optimization", tips: [
    { condition: "If asked for all permutations/subsets", approaches: ["Backtracking"] },
    { condition: "If need to count/divide optimally", approaches: ["Greedy", "Dynamic programming"] },
  ]},
  { label: "General", tips: [
    { condition: "Else", approaches: ["Map/Set for O(1) time & O(n) space", "Sort input for O(nlogn) time and O(1) space"] },
  ]},
];

export default function TipsPanel() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toastFading, setToastFading] = useState(false);

  const copyToClipboard = useCallback(() => {
    const text = tipGroups
      .map((group) => {
        const rows = group.tips
          .map((tip) => `  ${tip.condition} → ${tip.approaches.join(", ")}`)
          .join("\n");
        return `${group.label}\n${rows}`;
      })
      .join("\n\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setToastFading(false);
    trackEvent("copy_tips");
  }, []);

  useEffect(() => {
    if (!copied) return;
    const fadeTimer = setTimeout(() => setToastFading(true), 1500);
    const removeTimer = setTimeout(() => { setCopied(false); setToastFading(false); }, 2200);
    return () => { clearTimeout(fadeTimer); clearTimeout(removeTimer); };
  }, [copied]);

  return (
    <>
      {/* Tab button – rendered inline inside the fixed flex wrapper in page.tsx */}
      <button
        onClick={() => { setOpen(true); trackEvent("panel_open", { panel: "tips" }); }}
        className="rounded-r-xl bg-blue-600 px-2.5 py-4 text-white shadow-lg transition-colors hover:bg-blue-700"
        aria-label="Open tips"
      >
        <span className="flex items-center gap-2 text-sm font-semibold [writing-mode:vertical-lr]">
          <Lightbulb className="h-4 w-4 rotate-90" />
          Helpful Tips
        </span>
      </button>

      {/* Panel */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-80 transform border-r border-zinc-200 bg-white shadow-xl transition-transform duration-300 ease-in-out dark:border-zinc-700 dark:bg-zinc-900 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between bg-blue-600 px-4 py-3 text-white">
          <h2 className="flex items-center gap-2 text-base font-semibold">
            <Lightbulb className="h-4 w-4" />
            Helpful Tips
          </h2>
          <div className="flex items-center gap-1">
            <button
              onClick={copyToClipboard}
              className="rounded p-1 transition-colors hover:bg-blue-700"
              title="Copy to clipboard"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
            <button
              onClick={() => { setOpen(false); trackEvent("panel_close", { panel: "tips" }); }}
              className="rounded p-1 transition-colors hover:bg-blue-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="h-[calc(100%-49px)] overflow-y-auto px-4 py-4">
          <p className="mb-4 text-xs text-zinc-500">
            Based on the problem constraints, use these heuristics to identify possible approaches when unsure.
          </p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-700">
                <th className="pb-2 text-left font-semibold">Condition</th>
                <th className="pb-2 text-left font-semibold">Approach</th>
              </tr>
            </thead>
            <tbody>
              {tipGroups.map((group) => (
                <Fragment key={group.label}>
                  <tr>
                    <td colSpan={2} className="pt-4 pb-1 text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                      {group.label}
                    </td>
                  </tr>
                  {group.tips.map((tip) => (
                    <tr key={tip.condition} className="border-b border-zinc-100 dark:border-zinc-800">
                      <td className="py-2 pr-3 align-top text-zinc-700 dark:text-zinc-300">{formatApproach(tip.condition)}</td>
                      <td className="py-2 align-top text-zinc-600 dark:text-zinc-400">
                        {tip.approaches.map((a, i) => (
                          <span key={i}>{i > 0 && ", "}{formatApproach(a)}</span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Copy toast – portalled to body so it centres on the viewport */}
      {copied && createPortal(
        <div
          className={`fixed inset-x-0 bottom-6 z-50 mx-auto w-fit animate-[fadeInUp_0.3s_ease-out] rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800 shadow-lg transition-opacity duration-700 ease-in-out dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200 ${toastFading ? "opacity-0" : "opacity-100"}`}
        >
          ✓ Tips copied to clipboard
        </div>,
        document.body
      )}
    </>
  );
}
