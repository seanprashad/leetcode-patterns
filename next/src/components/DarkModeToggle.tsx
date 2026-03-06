"use client";

import { useDarkMode } from "@/hooks/use-dark-mode";

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="rounded-full px-2 py-1 text-lg leading-none cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? "🌙" : "☀️"}
    </button>
  );
}
