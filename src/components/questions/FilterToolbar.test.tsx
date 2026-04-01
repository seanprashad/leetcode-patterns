import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import FilterToolbar from "@/components/questions/FilterToolbar";

vi.mock("@/lib/analytics", () => ({
  trackEvent: vi.fn(),
}));

const mockColumn = (filterValue: unknown = undefined) => ({
  getFilterValue: () => filterValue,
  setFilterValue: vi.fn(),
});

const mockTable = {
  getColumn: (id: string) => {
    if (id === "difficulty" || id === "pattern" || id === "company") return mockColumn();
    return undefined;
  },
} as never;

function renderToolbar(globalFilter = "") {
  const setGlobalFilter = vi.fn();
  const result = render(
    <FilterToolbar
      table={mockTable}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      patterns={[]}
      companies={[]}
      showStarredOnly={false}
      setShowStarredOnly={vi.fn()}
      hideCompleted={false}
      setHideCompleted={vi.fn()}
      hidePatterns={false}
      setHidePatterns={vi.fn()}
      showDueOnly={false}
      setShowDueOnly={vi.fn()}
      pickRandom={vi.fn()}
      shuffleOrder={null}
      toggleShuffle={vi.fn()}
      exportProgress={vi.fn()}
      fileInputRef={createRef()}
      importProgress={vi.fn()}
      starred={new Set()}
      notes={{}}
      completed={new Set()}
      reminders={{}}
      setClearConfirm={vi.fn()}
      searchRef={createRef()}
      columnFilters={[]}
    />,
  );
  return { ...result, setGlobalFilter };
}

describe("FilterToolbar sean10 easter egg", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not show toast when search is empty", () => {
    renderToolbar("");
    expect(screen.queryByText("successfully applied")).not.toBeInTheDocument();
  });

  it("does not show toast for unrelated search text", () => {
    renderToolbar("binary search");
    expect(screen.queryByText("successfully applied")).not.toBeInTheDocument();
  });

  it("shows toast when globalFilter is 'sean10'", () => {
    renderToolbar("sean10");
    expect(screen.getByText(/successfully applied/)).toBeInTheDocument();
  });

  it("is case-insensitive", () => {
    renderToolbar("Sean10");
    expect(screen.getByText(/successfully applied/)).toBeInTheDocument();
  });

  it("shows confetti when sean10 is typed", () => {
    const { container } = renderToolbar("sean10");
    const confettiPieces = container.querySelectorAll("[style*='sean10Fall']");
    expect(confettiPieces.length).toBe(100);
  });

  it("shows sparkle emojis around the input", () => {
    renderToolbar("sean10");
    expect(screen.getAllByText("✨").length).toBeGreaterThan(0);
    expect(screen.getAllByText("💫").length).toBeGreaterThan(0);
  });

  it("applies green border to search input when active", () => {
    renderToolbar("sean10");
    const input = screen.getByLabelText("Search questions");
    expect(input.className).toContain("border-green-500");
  });

  it("does not apply green border for normal search", () => {
    renderToolbar("arrays");
    const input = screen.getByLabelText("Search questions");
    expect(input.className).not.toContain("border-green-500");
  });

  it("fades out after 5 seconds", () => {
    const { container } = renderToolbar("sean10");
    const toastOverlay = container.querySelector(".fixed.inset-0.z-\\[9999\\].flex");
    expect(toastOverlay?.className).toContain("opacity-100");

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(toastOverlay?.className).toContain("opacity-0");
  });

  it("does not fade before 5 seconds", () => {
    const { container } = renderToolbar("sean10");
    const toastOverlay = container.querySelector(".fixed.inset-0.z-\\[9999\\].flex");

    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(toastOverlay?.className).toContain("opacity-100");
  });
});
