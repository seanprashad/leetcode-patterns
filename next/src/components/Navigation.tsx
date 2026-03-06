"use client";

import { FaGithub } from "react-icons/fa";
import { trackEvent } from "@/lib/analytics";
import DarkModeToggle from "./DarkModeToggle";

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-700 dark:bg-gray-900/80">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3">
        <span
          className="text-lg font-bold cursor-pointer"
          onClick={() =>
            trackEvent("Navigation", "Clicked link", "Leetcode Patterns link")
          }
        >
          Leetcode Patterns
        </span>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/SeanPrashad/leetcode-patterns"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("Navigation", "Clicked link", "GitHub link")
            }
            aria-label="GitHub repository"
          >
            <FaGithub className="text-xl" />
          </a>
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
}
