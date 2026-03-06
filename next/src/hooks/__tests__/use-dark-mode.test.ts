import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDarkMode } from "@/hooks/use-dark-mode";

describe("useDarkMode", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("defaults to light mode", () => {
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.darkMode).toBe(false);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("toggles to dark mode", () => {
    const { result } = renderHook(() => useDarkMode());
    act(() => {
      result.current.toggleDarkMode();
    });
    expect(result.current.darkMode).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("persists dark mode preference", () => {
    const { result } = renderHook(() => useDarkMode());
    act(() => {
      result.current.toggleDarkMode();
    });
    expect(JSON.parse(localStorage.getItem("darkMode")!)).toBe(true);
  });
});
