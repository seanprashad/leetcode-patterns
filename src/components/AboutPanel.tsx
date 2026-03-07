"use client";

import { useState } from "react";
import { Info, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function AboutPanel() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Tab button – rendered inline inside the fixed flex wrapper in page.tsx */}
      <button
        onClick={() => { setOpen(true); trackEvent("panel_open", { panel: "about" }); }}
        className="rounded-r-xl bg-emerald-600 px-2.5 py-4 text-white shadow-lg transition-colors hover:bg-emerald-700"
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
              In <span className="font-semibold text-zinc-900 dark:text-zinc-100">2019</span>, as a broke college
              student who couldn&apos;t afford premium interview resources, I spent{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">countless hours</span> searching
              for free materials, taught myself React, and built{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">Leetcode Patterns</span> before{" "}
              <a
                href="https://www.reddit.com/r/csMajors/comments/cvy1fg/leetcode_pattern_study_guide/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                sharing it with Reddit
              </a>.
            </p>
            <p>
              Since opening, the site has attracted more than{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">150k users every year</span> from{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">128 countries</span>.</p>
            <p>
              Along the way, I&apos;ve <span className="font-semibold text-zinc-900 dark:text-zinc-100">turned down every ad offer</span> and
              watched copycat sites pop up without credit. While frustrating, this will always be{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">the free original</span>, thanks to the{" "}
              <a
                href="https://github.com/seanprashad/leetcode-patterns/graphs/contributors"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                many contributors
              </a>
              {" "}who continue to make it better.
            </p>
            <p>
              I believe <span className="font-semibold text-zinc-900 dark:text-zinc-100">everyone</span> deserves
              access to high-quality interview prep resources regardless of their financial situation. Therefore, it is
              my commitment to you that this site will remain {" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">free and open source</span> for as long as it can.
            </p>
            <p className="pt-2 italic">
              Thank you and best of luck studying!
            </p>
            <p className="text-2xl text-zinc-900 dark:text-zinc-100" style={{ fontFamily: "var(--font-dancing-script)" }}>
              - <a
                href="https://github.com/SeanPrashad"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted underline-offset-4 hover:text-blue-600 hover:decoration-solid dark:hover:text-blue-400"
              >Sean</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
