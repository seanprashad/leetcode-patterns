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
});
