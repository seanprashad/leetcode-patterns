"use client";

import { useState, useEffect } from "react";
import { Info, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function AboutPanel() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); trackEvent("panel_close", { panel: "about" }); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

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
        <div className="flex items-center justify-between bg-emerald-600 px-4 py-3 text-white">
          <h2 className="flex items-center gap-2 text-base font-semibold">
            <Info className="h-4 w-4" />
            About
          </h2>
          <button
            onClick={() => { setOpen(false); trackEvent("panel_close", { panel: "about" }); }}
            className="rounded p-1 transition-colors hover:bg-emerald-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="h-[calc(100%-49px)] overflow-y-auto px-5 py-5">
          <div className="space-y-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            <p>
              In <span className="font-semibold text-zinc-900 dark:text-zinc-100">2019</span>, as a broke college
              student who couldn&apos;t afford premium interview resources, I spent countless hours searching
              for free materials and teaching myself React to build{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">Leetcode Patterns</span>.
            </p>
            <p>
              I believe <span className="font-semibold text-zinc-900 dark:text-zinc-100">everyone</span>{" "}deserves
              access to high-quality interview material - regardless of their financial situation. It&apos;s why I chose to make this website{" "}
              <a
                href="https://github.com/seanprashad/leetcode-patterns/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
              >free and open source</a>.
            </p>
            <p>
              Best of luck on your journey!
            </p>
            <p className="text-2xl text-zinc-900 dark:text-zinc-100" style={{ fontFamily: "var(--font-dancing-script)" }}>
              <a
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
