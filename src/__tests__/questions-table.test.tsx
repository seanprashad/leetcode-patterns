import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act, waitFor, cleanup, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Question } from "@/types/question";

const { mockTrackEvent } = vi.hoisted(() => ({
  mockTrackEvent: vi.fn(),
}));

vi.mock("@/lib/analytics", () => ({
  trackEvent: mockTrackEvent,
}));

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ replace: vi.fn() }),
}));

import QuestionsTable from "@/components/QuestionsTable";

const testData: Question[] = [
  {
    id: 0,
    title: "Two Sum",
    slug: "two-sum",
    pattern: ["Arrays"],
    difficulty: "Easy",
    premium: false,
    companies: [{ name: "Google", slug: "google", frequency: 5 }],
  },
  {
    id: 1,
    title: "Add Two Numbers",
    slug: "add-two-numbers",
    pattern: ["Linked List"],
    difficulty: "Medium",
    premium: false,
    companies: [{ name: "Amazon", slug: "amazon", frequency: 3 }],
  },
  {
    id: 2,
    title: "Median of Two Sorted Arrays",
    slug: "median-of-two-sorted-arrays",
    pattern: ["Binary Search"],
    difficulty: "Hard",
    premium: false,
    companies: [],
  },
];

describe("QuestionsTable analytics", () => {
  beforeEach(() => {
    mockTrackEvent.mockClear();
    localStorage.clear();
    window.open = vi.fn();
    URL.createObjectURL = vi.fn(() => "blob:test");
    URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("tracks question_toggle when checking a question", async () => {
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    const checkboxes = screen.getAllByRole("checkbox", { name: "" });
    const cell = checkboxes[0].closest("td")!;
    await user.click(cell);
    expect(mockTrackEvent).toHaveBeenCalledWith("question_toggle", {
      question_id: 0,
      completed: true,
    });
  });

  it("tracks question_toggle with completed=false when unchecking", async () => {
    localStorage.setItem("leetcode-patterns-completed", JSON.stringify([0]));
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    const checkboxes = screen.getAllByRole("checkbox", { name: "" });
    const cell = checkboxes[0].closest("td")!;
    await user.click(cell);
    expect(mockTrackEvent).toHaveBeenCalledWith("question_toggle", {
      question_id: 0,
      completed: false,
    });
  });

  it("tracks note_save when saving a note", async () => {
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    const noteBtn = screen.getAllByText("Add a note...")[0];
    await user.click(noteBtn);
    const textarea = screen.getByPlaceholderText("Write your notes here...");
    await user.type(textarea, "my test note");
    await user.click(screen.getByText("Done"));
    expect(mockTrackEvent).toHaveBeenCalledWith("note_save", {
      question_id: 0,
      has_content: true,
    });
  });

  it("tracks search with debounce", async () => {
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    const searchInput = screen.getByPlaceholderText("Search (/)...");
    await user.type(searchInput, "two");
    await waitFor(() => {
      expect(mockTrackEvent).toHaveBeenCalledWith("search", { query: "two" });
    }, { timeout: 2000 });
  });

  it("tracks filter_difficulty when selecting a difficulty filter", async () => {
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    await user.click(screen.getByText("All Difficulties"));
    await user.click(screen.getByLabelText("Easy"));
    expect(mockTrackEvent).toHaveBeenCalledWith("filter_difficulty", { values: "Easy" });
  });

  it("tracks filter_pattern when selecting a pattern filter", async () => {
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    await user.click(screen.getByText("All Patterns"));
    await user.click(screen.getByLabelText("Arrays"));
    expect(mockTrackEvent).toHaveBeenCalledWith("filter_pattern", { values: "Arrays" });
  });

  it("tracks filter_company when selecting a company filter", async () => {
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    await user.click(screen.getByText("All Companies"));
    await user.click(screen.getByLabelText("Amazon"));
    expect(mockTrackEvent).toHaveBeenCalledWith("filter_company", { values: "amazon" });
  });

  it("tracks random_question when picking a random question", async () => {
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    const shuffleContainer = screen.getByText("Random question").closest("div")!;
    const shuffleBtn = shuffleContainer.querySelector("button")!;
    await user.click(shuffleBtn);
    expect(mockTrackEvent).toHaveBeenCalledWith(
      "random_question",
      expect.objectContaining({ question_id: expect.any(Number), slug: expect.any(String) })
    );
  });

  it("tracks export_progress when exporting", async () => {
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    const exportContainer = screen.getByText("Export progress").closest("div")!;
    const exportBtn = exportContainer.querySelector("button")!;
    await user.click(exportBtn);
    expect(mockTrackEvent).toHaveBeenCalledWith("export_progress", {
      completed_count: 0,
      notes_count: 0,
    });
  });

  it("tracks hide_completed when toggling", async () => {
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    await user.click(screen.getByLabelText("Hide completed"));
    expect(mockTrackEvent).toHaveBeenCalledWith("hide_completed", { enabled: true });
  });

  it("tracks hide_patterns when toggling", async () => {
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    await user.click(screen.getByLabelText("Hide patterns"));
    expect(mockTrackEvent).toHaveBeenCalledWith("hide_patterns", { enabled: true });
  });

  it("tracks sort_column when clicking a sortable header", async () => {
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    await user.click(screen.getByText("Title"));
    expect(mockTrackEvent).toHaveBeenCalledWith("sort_column", {
      column: "title",
      direction: "asc",
    });
  });

  it("tracks clear_all_progress when clearing all questions", async () => {
    localStorage.setItem("leetcode-patterns-completed", JSON.stringify([0]));
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    const clearContainer = screen.getByText("Clear all progress").closest("div")!;
    const clearBtn = clearContainer.querySelector("button")!;
    await user.click(clearBtn);
    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(mockTrackEvent).toHaveBeenCalledWith("clear_all_progress");
  });

  it("tracks clear_all_notes when clearing all notes", async () => {
    localStorage.setItem("leetcode-patterns-notes", JSON.stringify({ 0: "test note" }));
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    const clearNotesContainer = screen.getByText("Clear all notes").closest("div")!;
    const clearNotesBtn = clearNotesContainer.querySelector("button")!;
    await user.click(clearNotesBtn);
    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(mockTrackEvent).toHaveBeenCalledWith("clear_all_notes");
  });

  it("tracks reset_group when resetting a difficulty group", async () => {
    localStorage.setItem("leetcode-patterns-completed", JSON.stringify([0]));
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    const resetBtns = screen.getAllByText("Reset");
    await user.click(resetBtns[0]);
    // Modal has heading "Reset Easy progress" — find the confirm button inside it
    const modal = screen.getByText("Reset Easy progress").closest("div[class*='rounded-xl']")!;
    const confirmBtn = within(modal).getByRole("button", { name: "Reset" });
    await user.click(confirmBtn);
    expect(mockTrackEvent).toHaveBeenCalledWith("reset_group", { difficulty: "Easy" });
  });

  it("truncates long notes in the notes column", async () => {
    const longNote = "a".repeat(300);
    localStorage.setItem("leetcode-patterns-notes", JSON.stringify({ 0: longNote }));
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    const noteBtn = screen.getByText(longNote);
    expect(noteBtn).toHaveClass("truncate", "max-w-[200px]");
  });

  it("shows progress stats scoped to filtered questions", async () => {
    localStorage.setItem("leetcode-patterns-completed", JSON.stringify([0, 1]));
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);

    // Unfiltered: 2 of 3 completed
    expect(screen.getByText("2/3 completed (67%)")).toBeInTheDocument();

    // Filter to Easy only — 1 of 1 completed, only Easy breakdown shown
    await user.click(screen.getByText("All Difficulties"));
    await user.click(screen.getByLabelText("Easy"));
    expect(screen.getByText("1/1 completed (100%)")).toBeInTheDocument();
    expect(screen.getByText(/Easy: 1\/1/)).toBeInTheDocument();
    expect(screen.queryByText(/Medium:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Hard:/)).not.toBeInTheDocument();
  });

  it("progress bar is not affected by hide completed toggle", async () => {
    localStorage.setItem("leetcode-patterns-completed", JSON.stringify([0]));
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);

    // Before hiding: 1 of 3 completed
    expect(screen.getByText("1/3 completed (33%)")).toBeInTheDocument();

    // Toggle hide completed
    await user.click(screen.getByLabelText("Hide completed"));

    // Row is hidden but progress bar still shows 1/3
    expect(screen.queryByText("Two Sum")).not.toBeInTheDocument();
    expect(screen.getByText("1/3 completed (33%)")).toBeInTheDocument();
  });

  it("progress bar reflects all difficulties when hide completed is on", async () => {
    localStorage.setItem("leetcode-patterns-completed", JSON.stringify([0, 1]));
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);

    // 2 of 3 completed
    expect(screen.getByText("2/3 completed (67%)")).toBeInTheDocument();

    await user.click(screen.getByLabelText("Hide completed"));

    // Progress bar still shows 2/3 with all difficulty breakdowns
    expect(screen.getByText("2/3 completed (67%)")).toBeInTheDocument();
    expect(screen.getByText(/Easy: 1\/1/)).toBeInTheDocument();
    expect(screen.getByText(/Medium: 1\/1/)).toBeInTheDocument();
    expect(screen.getByText(/Hard: 0\/1/)).toBeInTheDocument();
  });

  it("progress bar respects difficulty filter even when hide completed is on", async () => {
    localStorage.setItem("leetcode-patterns-completed", JSON.stringify([0]));
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);

    // Filter to Easy + hide completed
    await user.click(screen.getByText("All Difficulties"));
    await user.click(screen.getByLabelText("Easy"));
    await user.click(screen.getByLabelText("Hide completed"));

    // Two Sum (Easy, completed) is hidden from table but still counted in progress
    expect(screen.queryByText("Two Sum")).not.toBeInTheDocument();
    expect(screen.getByText("1/1 completed (100%)")).toBeInTheDocument();
  });

  it("progress bar respects pattern filter even when hide completed is on", async () => {
    localStorage.setItem("leetcode-patterns-completed", JSON.stringify([0]));
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);

    // Filter to Arrays pattern + hide completed
    await user.click(screen.getByText("All Patterns"));
    await user.click(screen.getByLabelText("Arrays"));
    await user.click(screen.getByLabelText("Hide completed"));

    // Two Sum is the only Arrays question, completed and hidden, but still in progress
    expect(screen.queryByText("Two Sum")).not.toBeInTheDocument();
    expect(screen.getByText("1/1 completed (100%)")).toBeInTheDocument();
  });

  it("progress bar excludes completed items that don't match active filters", async () => {
    localStorage.setItem("leetcode-patterns-completed", JSON.stringify([0, 1]));
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);

    // Filter to Hard only + hide completed
    await user.click(screen.getByText("All Difficulties"));
    await user.click(screen.getByLabelText("Hard"));
    await user.click(screen.getByLabelText("Hide completed"));

    // Only the Hard question (id=2, not completed) should count — Easy/Medium are filtered out
    expect(screen.getByText("0/1 completed (0%)")).toBeInTheDocument();
  });

  it("tracks star_toggle when starring a question", async () => {
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    const starCells = screen.getAllByRole("row").slice(2).map((row) => row.querySelectorAll("td")[1]);
    await user.click(starCells[0]);
    expect(mockTrackEvent).toHaveBeenCalledWith("star_toggle", {
      question_id: 0,
      starred: true,
    });
  });

  it("tracks star_toggle with starred=false when unstarring", async () => {
    localStorage.setItem("leetcode-patterns-starred", JSON.stringify([0]));
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    const starCells = screen.getAllByRole("row").slice(2).map((row) => row.querySelectorAll("td")[1]);
    await user.click(starCells[0]);
    expect(mockTrackEvent).toHaveBeenCalledWith("star_toggle", {
      question_id: 0,
      starred: false,
    });
  });

  it("filters to starred only when toggling starred only checkbox", async () => {
    localStorage.setItem("leetcode-patterns-starred", JSON.stringify([0]));
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);

    // All 3 questions visible
    expect(screen.getByText("Two Sum")).toBeInTheDocument();
    expect(screen.getByText("Add Two Numbers")).toBeInTheDocument();

    await user.click(screen.getByLabelText("Starred only"));
    expect(screen.getByText("Two Sum")).toBeInTheDocument();
    expect(screen.queryByText("Add Two Numbers")).not.toBeInTheDocument();
    expect(screen.queryByText("Median of Two Sorted Arrays")).not.toBeInTheDocument();
  });

  it("tracks clear_all_starred when clearing all stars", async () => {
    localStorage.setItem("leetcode-patterns-starred", JSON.stringify([0, 1]));
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    const clearStarsContainer = screen.getByText("Clear all stars").closest("div")!;
    const clearStarsBtn = clearStarsContainer.querySelector("button")!;
    await user.click(clearStarsBtn);
    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(mockTrackEvent).toHaveBeenCalledWith("clear_all_starred");
  });

  it("persists starred only checkbox to localStorage", async () => {
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    await user.click(screen.getByLabelText("Starred only"));
    expect(localStorage.getItem("leetcode-patterns-starred-only")).toBe("true");
  });

  it("restores starred only checkbox from localStorage", () => {
    localStorage.setItem("leetcode-patterns-starred-only", "true");
    localStorage.setItem("leetcode-patterns-starred", JSON.stringify([0]));
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    expect(screen.getByLabelText("Starred only")).toBeChecked();
    expect(screen.getByText("Two Sum")).toBeInTheDocument();
    expect(screen.queryByText("Add Two Numbers")).not.toBeInTheDocument();
  });

  it("persists hide completed checkbox to localStorage", async () => {
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    await user.click(screen.getByLabelText("Hide completed"));
    expect(localStorage.getItem("leetcode-patterns-hide-completed")).toBe("true");
  });

  it("restores hide completed checkbox from localStorage", () => {
    localStorage.setItem("leetcode-patterns-hide-completed", "true");
    localStorage.setItem("leetcode-patterns-completed", JSON.stringify([0]));
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    expect(screen.getByLabelText("Hide completed")).toBeChecked();
    expect(screen.queryByText("Two Sum")).not.toBeInTheDocument();
  });

  it("persists hide patterns checkbox to localStorage", async () => {
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    await user.click(screen.getByLabelText("Hide patterns"));
    expect(localStorage.getItem("leetcode-patterns-hide-patterns")).toBe("true");
  });

  it("restores hide patterns checkbox from localStorage", () => {
    localStorage.setItem("leetcode-patterns-hide-patterns", "true");
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    expect(screen.getByLabelText("Hide patterns")).toBeChecked();
  });

  it("tracks shuffle_questions when clicking shuffle", async () => {
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    const shuffleBtn = screen.getByText("Shuffle questions").closest("div")!.querySelector("button")!;
    await user.click(shuffleBtn);
    expect(mockTrackEvent).toHaveBeenCalledWith("shuffle_questions");
  });

  it("persists shuffle order to localStorage", async () => {
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    const shuffleBtn = screen.getByText("Shuffle questions").closest("div")!.querySelector("button")!;
    await user.click(shuffleBtn);
    const stored = localStorage.getItem("leetcode-patterns-shuffle-order");
    expect(stored).not.toBeNull();
    const order = JSON.parse(stored!);
    expect(order).toHaveLength(3);
    expect(order.sort()).toEqual([0, 1, 2]);
  });

  it("removes difficulty group headers when shuffled", async () => {
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    const getGroupHeaders = () =>
      screen.getAllByRole("row").filter((row) =>
        row.querySelector(".text-base.font-bold")
      );
    expect(getGroupHeaders()).toHaveLength(3);

    const shuffleBtn = screen.getByText("Shuffle questions").closest("div")!.querySelector("button")!;
    await user.click(shuffleBtn);
    expect(getGroupHeaders()).toHaveLength(0);
  });

  it("toggles between shuffle and restore on the same button", async () => {
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    const getGroupHeaders = () =>
      screen.getAllByRole("row").filter((row) =>
        row.querySelector(".text-base.font-bold")
      );

    // Initially shows "Shuffle questions"
    expect(screen.getByText("Shuffle questions")).toBeInTheDocument();

    // Click to shuffle
    const shuffleBtn = screen.getByText("Shuffle questions").closest("div")!.querySelector("button")!;
    await user.click(shuffleBtn);
    expect(mockTrackEvent).toHaveBeenCalledWith("shuffle_questions");
    expect(getGroupHeaders()).toHaveLength(0);

    // Button now shows "Restore order"
    expect(screen.getByText("Restore order")).toBeInTheDocument();
    expect(screen.queryByText("Shuffle questions")).not.toBeInTheDocument();

    // Click to restore
    const restoreBtn = screen.getByText("Restore order").closest("div")!.querySelector("button")!;
    await user.click(restoreBtn);
    expect(mockTrackEvent).toHaveBeenCalledWith("restore_order");
    expect(getGroupHeaders().length).toBeGreaterThan(0);

    // Button shows "Shuffle questions" again
    expect(screen.getByText("Shuffle questions")).toBeInTheDocument();
  });

  it("clears shuffle order from localStorage on restore", async () => {
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    const shuffleBtn = screen.getByText("Shuffle questions").closest("div")!.querySelector("button")!;
    await user.click(shuffleBtn);
    expect(localStorage.getItem("leetcode-patterns-shuffle-order")).not.toBeNull();

    const restoreBtn = screen.getByText("Restore order").closest("div")!.querySelector("button")!;
    await user.click(restoreBtn);
    expect(localStorage.getItem("leetcode-patterns-shuffle-order")).toBeNull();
  });

  it("restores shuffle order from localStorage on mount", () => {
    localStorage.setItem("leetcode-patterns-shuffle-order", JSON.stringify([2, 0, 1]));
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    const groupHeaders = screen.getAllByRole("row").filter((row) =>
      row.querySelector(".text-base.font-bold")
    );
    expect(groupHeaders).toHaveLength(0);
    // Button shows "Restore order" since shuffle is active
    expect(screen.getByText("Restore order")).toBeInTheDocument();
    const rows = screen.getAllByRole("row").filter((row) => row.querySelector("td"));
    expect(rows).toHaveLength(3);
  });

  it("tracks import_progress when importing a file", async () => {
    const user = userEvent.setup();
    render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
    const importContainer = screen.getByText("Import progress").closest("div")!;
    const fileInput = importContainer.querySelector("input[type='file']")! as HTMLInputElement;
    const importData = JSON.stringify({ completed: [0, 1], notes: { 0: "note" } });
    const file = new File([importData], "progress.json", { type: "application/json" });
    await user.upload(fileInput, file);
    await waitFor(() => {
      expect(mockTrackEvent).toHaveBeenCalledWith("import_progress", {
        completed_count: 2,
        notes_count: 1,
      });
    });
  });

  describe("legacy V1 migration", () => {
    it("migrates old checked array to new completed format via slug matching", () => {
      // Old V1 format: boolean array indexed by old 0-based id
      // two-sum was at legacy index 147, add-two-numbers at 57
      const checked = new Array(175).fill(false);
      checked[147] = true; // two-sum
      checked[57] = true;  // add-two-numbers
      localStorage.setItem("checked", JSON.stringify(checked));
      render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);

      // Both questions should be checked
      const checkboxes = screen.getAllByRole("checkbox", { name: "" });
      expect(checkboxes[0]).toBeChecked(); // Two Sum (id: 0)
      expect(checkboxes[1]).toBeChecked(); // Add Two Numbers (id: 1)
      expect(checkboxes[2]).not.toBeChecked(); // Median of Two Sorted Arrays

      // Old keys should be cleaned up
      expect(localStorage.getItem("checked")).toBeNull();

      // New format should be saved
      const stored = JSON.parse(localStorage.getItem("leetcode-patterns-completed")!);
      expect(stored.sort()).toEqual([0, 1]);
    });

    it("shows a toast after migration", () => {
      const checked = new Array(175).fill(false);
      checked[147] = true;
      localStorage.setItem("checked", JSON.stringify(checked));
      render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
      expect(screen.getByText(/Migrated 1 completed question from V1/)).toBeInTheDocument();
    });

    it("only runs migration once", () => {
      const checked = new Array(175).fill(false);
      checked[147] = true;
      localStorage.setItem("checked", JSON.stringify(checked));
      const { unmount } = render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
      unmount();

      // Re-add old key to simulate a second visit
      localStorage.setItem("checked", JSON.stringify(checked));
      render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);

      // Migration flag prevents re-running — old key should still be there
      expect(localStorage.getItem("checked")).not.toBeNull();
    });

    it("merges legacy progress with existing new progress", () => {
      localStorage.setItem("leetcode-patterns-completed", JSON.stringify([2]));
      const checked = new Array(175).fill(false);
      checked[147] = true; // two-sum -> id 0
      localStorage.setItem("checked", JSON.stringify(checked));
      render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);

      const stored = JSON.parse(localStorage.getItem("leetcode-patterns-completed")!);
      expect(stored.sort()).toEqual([0, 2]);
    });

    it("does nothing when no legacy data exists", () => {
      render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
      expect(screen.queryByText(/Migrated/)).not.toBeInTheDocument();
      expect(screen.getByText("0/3 completed (0%)")).toBeInTheDocument();
    });

    it("cleans up old showPatterns and hidePatterns keys", () => {
      const checked = new Array(175).fill(false);
      checked[147] = true;
      localStorage.setItem("checked", JSON.stringify(checked));
      localStorage.setItem("showPatterns", JSON.stringify([true]));
      localStorage.setItem("hidePatterns", JSON.stringify([false]));
      render(<QuestionsTable data={testData} updatedDate="2025-01-01" />);
      expect(localStorage.getItem("showPatterns")).toBeNull();
      expect(localStorage.getItem("hidePatterns")).toBeNull();
    });
  });
});
