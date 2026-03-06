"use client";

import { useEffect, useCallback } from "react";
import { useLocalStorage } from "./use-local-storage";

export function useDarkMode() {
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, [setDarkMode]);

  return { darkMode, toggleDarkMode };
}
