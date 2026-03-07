import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const { mockTrackEvent } = vi.hoisted(() => ({
  mockTrackEvent: vi.fn(),
}));

vi.mock("@/lib/analytics", () => ({
  trackEvent: mockTrackEvent,
}));

import ThemeToggle from "@/components/layout/ThemeToggle";

describe("ThemeToggle analytics", () => {
  beforeEach(() => {
    mockTrackEvent.mockClear();
    document.documentElement.classList.remove("dark");
  });

  it("tracks theme_toggle with 'dark' when switching to dark mode", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /switch to dark mode/i });
    await user.click(button);
    expect(mockTrackEvent).toHaveBeenCalledWith("theme_toggle", { theme: "dark" });
  });

  it("tracks theme_toggle with 'light' when switching to light mode", async () => {
    const user = userEvent.setup();
    document.documentElement.classList.add("dark");
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /switch to light mode/i });
    await user.click(button);
    expect(mockTrackEvent).toHaveBeenCalledWith("theme_toggle", { theme: "light" });
  });
});
