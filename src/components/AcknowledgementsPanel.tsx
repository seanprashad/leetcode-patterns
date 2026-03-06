"use client";

import { useState } from "react";
import { Heart, X } from "lucide-react";

const sources = [
  {
    title: "Blind Curated 75 Question List",
    url: "https://www.teamblind.com/post/New-Year-Gift---Curated-List-of-Top-100-LeetCode-Questions-to-Save-Your-Time-OaM1orEU",
    image: "/images/Blind.png",
  },
  {
    title: "Grokking the Coding Interview: Patterns for Coding Questions",
    url: "https://www.designgurus.io/course/grokking-the-coding-interview",
    image: "/images/DesignGurus.png",
  },
  {
    title: "14 Patterns to Ace Any Coding Interview Question",
    url: "https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed",
    image: "/images/Hackernoon.png",
  },
];

export default function AcknowledgementsPanel() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const btnZ = hovered || open ? "z-40" : "z-30";

  return (
    <>
      {/* Tab button on left edge, below Tips */}
      <button
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`fixed left-0 top-[calc(50%+12rem)] max-sm:hidden ${btnZ} -translate-y-1/2 rounded-r-xl bg-amber-600 px-2.5 py-4 text-white shadow-lg transition-colors hover:bg-amber-700`}
        aria-label="Open acknowledgements"
      >
        <span className="flex items-center gap-2 text-sm font-semibold [writing-mode:vertical-lr]">
          <Heart className="h-4 w-4 rotate-90" />
          Acknowledgements
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
            <Heart className="h-4 w-4" />
            Acknowledgements
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="rounded p-1 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="h-[calc(100%-49px)] overflow-y-auto px-4 py-4">
          <p className="mb-4 text-xs text-zinc-500">
            The following sources were used in aggregating this question list.
          </p>
          <div className="space-y-4">
            {sources.map((source) => (
              <a
                key={source.title}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-lg border border-zinc-200 transition-colors hover:border-blue-300 dark:border-zinc-800 dark:hover:border-blue-700"
              >
                <img
                  src={source.image}
                  alt={source.title}
                  className="h-32 w-full object-cover"
                />
                <div className="p-3">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {source.title}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
