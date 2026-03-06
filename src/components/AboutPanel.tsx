"use client";

import { useState } from "react";
import { Info, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function AboutPanel() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const btnZ = hovered || open ? "z-40" : "z-[32]";

  return (
    <>
      {/* Tab button on left edge, first position */}
      <button
        onClick={() => { setOpen(true); trackEvent("panel_open", { panel: "about" }); }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`fixed left-0 top-1/2 max-sm:hidden ${btnZ} -translate-y-1/2 rounded-r-xl bg-emerald-600 px-2.5 py-4 text-white shadow-lg transition-colors hover:bg-emerald-700`}
        aria-label="Open about"
      >
        <span className="flex items-center gap-2 text-sm font-semibold [writing-mode:vertical-lr]">
          <Info className="h-4 w-4 rotate-90" />
          About
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
            <Info className="h-4 w-4" />
            About
          </h2>
          <button
            onClick={() => { setOpen(false); trackEvent("panel_close", { panel: "about" }); }}
            className="rounded p-1 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="h-[calc(100%-49px)] overflow-y-auto px-4 py-4">
          <div className="space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            <p>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">Leetcode Patterns</span> is
              a free, open-source collection of curated LeetCode questions grouped by pattern to help
              you prepare for coding interviews.
            </p>
            <p>
              In <span className="font-semibold text-zinc-900 dark:text-zinc-100">2020</span>, I built this project as a college student who couldn&apos;t afford paid interview
              content. Instead, I sought out free resources and taught myself everything I needed to know to pass technical interviews - this website is a culmination of my own study plan.
              It has helped me land roles at <span className="font-semibold text-zinc-900 dark:text-zinc-100">Twitter</span> and <span className="font-semibold text-zinc-900 dark:text-zinc-100">Square</span>, along with over <span className="font-semibold text-zinc-900 dark:text-zinc-100">6 offers</span> in my last interview gauntlet.
            </p>
            <p>
              A huge thank you to all the{" "}
              <a
                href="https://github.com/seanprashad/leetcode-patterns/graphs/contributors"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                contributors
              </a>{" "}
              who have helped improve this project - your PRs, bug reports, and suggestions help make this resource better for everyone.
            </p>
            <p>
              I plan to keep this project open source and free for as long as I can. If you find it
              helpful, feel free to{" "}
              <a
                href="mailto:seanprashad@outlook.com"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                let me know by e-mail
              </a>
              . You can also share it with others or{" "}
              <a
                href="https://github.com/SeanPrashad/leetcode-patterns"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                star the repo on GitHub
              </a>{" "}
              - thank you and good luck!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
