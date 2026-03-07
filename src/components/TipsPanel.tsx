"use client";

import { useState } from "react";
import { Lightbulb, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const tips = [
  { condition: "If input array is sorted", approaches: ["Binary search", "Two pointers"], examples: [
    { title: "Binary Search", slug: "binary-search" },
    { title: "Squares of a Sorted Array", slug: "squares-of-a-sorted-array" },
  ] },
  { condition: "If asked for all permutations/subsets", approaches: ["Backtracking"], examples: [
    { title: "Binary Tree Paths", slug: "binary-tree-paths" },
    { title: "Combination Sum", slug: "combination-sum" },
  ] },
  { condition: "If given a tree", approaches: ["DFS", "BFS"], examples: [
    { title: "Maximum Depth of Binary Tree", slug: "maximum-depth-of-binary-tree" },
    { title: "Binary Tree Level Order Traversal", slug: "binary-tree-level-order-traversal" },
  ] },
  { condition: "If given a graph", approaches: ["DFS", "BFS"], examples: [
    { title: "Number of Islands", slug: "number-of-islands" },
    { title: "Number of Connected Components in an Undirected Graph", slug: "number-of-connected-components-in-an-undirected-graph" },
  ] },
  { condition: "If given a linked list", approaches: ["Two pointers"], examples: [
    { title: "Linked List Cycle", slug: "linked-list-cycle" },
    { title: "Reverse Linked List", slug: "reverse-linked-list" },
  ] },
  { condition: "If recursion is banned", approaches: ["Stack"], examples: [
    { title: "Backspace String Compare", slug: "backspace-string-compare" },
    { title: "Palindrome Linked List", slug: "palindrome-linked-list" },
  ] },
  { condition: "If must solve in-place", approaches: ["Swap corresponding values", "Store one or more different values in the same pointer"], examples: [
    { title: "Move Zeroes", slug: "move-zeroes" },
    { title: "Sort Colors", slug: "sort-colors" },
  ] },
  { condition: "If asked for maximum/minimum subarray/subset/options", approaches: ["Dynamic programming", "Sliding window"], examples: [
    { title: "Best Time to Buy and Sell Stock", slug: "best-time-to-buy-and-sell-stock" },
    { title: "Maximum Average Subarray I", slug: "maximum-average-subarray-i" },
  ] },
  { condition: "If asked for top/least K items", approaches: ["Heap", "QuickSelect"], examples: [
    { title: "Kth Largest Element in an Array", slug: "kth-largest-element-in-an-array" },
    { title: "Top K Frequent Elements", slug: "top-k-frequent-elements" },
  ] },
  { condition: "If asked for common strings", approaches: ["Map", "Trie"], examples: [
    { title: "Index Pairs of a String", slug: "index-pairs-of-a-string" },
    { title: "Implement Trie (Prefix Tree)", slug: "implement-trie-prefix-tree" },
  ] },
  { condition: "Else", approaches: ["Map/Set for O(1) time & O(n) space", "Sort input for O(nlogn) time and O(1) space"], examples: [
    { title: "Two Sum", slug: "two-sum" },
    { title: "Contains Duplicate", slug: "contains-duplicate" },
  ] },
];

export default function TipsPanel() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const btnZ = hovered || open ? "z-40" : "z-[31]";

  return (
    <>
      {/* Tab button on left edge, below About */}
      <button
        onClick={() => { setOpen(true); trackEvent("panel_open", { panel: "tips" }); }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`fixed left-0 top-[calc(50%+5rem)] max-sm:hidden ${btnZ} -translate-y-1/2 rounded-r-xl bg-blue-600 px-2.5 py-4 text-white shadow-lg transition-colors hover:bg-blue-700`}
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
        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
          <h2 className="flex items-center gap-2 text-base font-semibold">
            <Lightbulb className="h-4 w-4" />
            Helpful Tips
          </h2>
          <button
            onClick={() => { setOpen(false); trackEvent("panel_close", { panel: "tips" }); }}
            className="rounded p-1 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="h-[calc(100%-49px)] overflow-y-auto px-4 py-4">
          <p className="mb-4 text-xs text-zinc-500">
            Use these heuristics to identify which pattern to apply based on the problem constraints.
          </p>
          <div className="space-y-3">
            {tips.map((tip) => (
              <div
                key={tip.condition}
                className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-800/50"
              >
                <p className="mb-1.5 text-sm font-medium">{tip.condition}</p>
                <ul className="space-y-0.5">
                  {tip.approaches.map((a) => (
                    <li
                      key={a}
                      className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400"
                    >
                      <span className="text-blue-500">→</span>
                      {a}
                    </li>
                  ))}
                </ul>
                {tip.examples.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {tip.examples.map((ex) => (
                      <a
                        key={ex.slug}
                        href={`https://leetcode.com/problems/${ex.slug}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded bg-blue-50 px-1.5 py-0.5 text-xs text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                      >
                        {ex.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
