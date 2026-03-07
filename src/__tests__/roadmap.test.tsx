import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Question } from "@/types/question";

const { mockTrackEvent } = vi.hoisted(() => ({
  mockTrackEvent: vi.fn(),
}));

vi.mock("@/lib/analytics", () => ({
  trackEvent: mockTrackEvent,
}));

const { mockSearchParams } = vi.hoisted(() => ({
  mockSearchParams: { current: new URLSearchParams() },
}));

vi.mock("next/navigation", () => ({
  useSearchParams: () => mockSearchParams.current,
}));

import ViewSwitcher from "@/components/ViewSwitcher";
import RoadmapView from "@/components/RoadmapView";
import { beginnerRoadmap, experiencedRoadmap } from "@/data/roadmaps";

const testData: Question[] = [
  {
    id: 0,
    title: "Two Sum",
    slug: "two-sum",
    pattern: ["Array", "Hash Table"],
    difficulty: "Easy",
    premium: false,
    companies: [],
  },
  {
    id: 1,
    title: "Contains Duplicate",
    slug: "contains-duplicate",
    pattern: ["Array", "Hash Table", "Sorting"],
    difficulty: "Easy",
    premium: false,
    companies: [],
  },
  {
    id: 2,
    title: "3Sum",
    slug: "3sum",
    pattern: ["Array", "Two Pointers", "Sorting"],
    difficulty: "Medium",
    premium: false,
    companies: [],
  },
];

describe("ViewSwitcher", () => {
  beforeEach(() => {
    mockTrackEvent.mockClear();
    mockSearchParams.current = new URLSearchParams();
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders all three view tabs", () => {
    render(<ViewSwitcher questions={testData} updatedDate="2025-01-01" />);
    expect(screen.getByText("All Questions")).toBeInTheDocument();
    expect(screen.getByText("Beginner Roadmap")).toBeInTheDocument();
    expect(screen.getByText("Blind 75")).toBeInTheDocument();
  });

  it("defaults to All Questions view", () => {
    render(<ViewSwitcher questions={testData} updatedDate="2025-01-01" />);
    // QuestionsTable renders search, which is unique to the table view
    expect(screen.getByPlaceholderText("Search (/)...")).toBeInTheDocument();
  });

  it("switches to beginner roadmap view", async () => {
    const user = userEvent.setup();
    render(<ViewSwitcher questions={testData} updatedDate="2025-01-01" />);
    await user.click(screen.getByText("Beginner Roadmap"));
    expect(screen.getByText(/structured path for those new/)).toBeInTheDocument();
    expect(mockTrackEvent).toHaveBeenCalledWith("switch_view", { view: "beginner" });
  });

  it("switches to experienced roadmap view", async () => {
    const user = userEvent.setup();
    render(<ViewSwitcher questions={testData} updatedDate="2025-01-01" />);
    await user.click(screen.getByText("Blind 75"));
    expect(screen.getByText(/Originally shared on Blind by/)).toBeInTheDocument();
    expect(mockTrackEvent).toHaveBeenCalledWith("switch_view", { view: "blind75" });
  });

  it("persists view selection to localStorage", async () => {
    const user = userEvent.setup();
    render(<ViewSwitcher questions={testData} updatedDate="2025-01-01" />);
    await user.click(screen.getByText("Beginner Roadmap"));
    expect(localStorage.getItem("leetcode-patterns-view")).toBe("beginner");
  });

  it("persists blind75 view to localStorage", async () => {
    const user = userEvent.setup();
    render(<ViewSwitcher questions={testData} updatedDate="2025-01-01" />);
    await user.click(screen.getByText("Blind 75"));
    expect(localStorage.getItem("leetcode-patterns-view")).toBe("blind75");
  });

  it("restores view selection from localStorage", () => {
    localStorage.setItem("leetcode-patterns-view", "blind75");
    render(<ViewSwitcher questions={testData} updatedDate="2025-01-01" />);
    expect(screen.getByText(/Originally shared on Blind by/)).toBeInTheDocument();
  });

  it("deep links to beginner roadmap via ?view=beginner", () => {
    mockSearchParams.current = new URLSearchParams("view=beginner");
    render(<ViewSwitcher questions={testData} updatedDate="2025-01-01" />);
    expect(screen.getByText(/structured path for those new/)).toBeInTheDocument();
  });

  it("deep links to Blind 75 via ?view=blind75", () => {
    mockSearchParams.current = new URLSearchParams("view=blind75");
    render(<ViewSwitcher questions={testData} updatedDate="2025-01-01" />);
    expect(screen.getByText(/Originally shared on Blind by/)).toBeInTheDocument();
  });

  it("URL param takes priority over localStorage", () => {
    localStorage.setItem("leetcode-patterns-view", "blind75");
    mockSearchParams.current = new URLSearchParams("view=beginner");
    render(<ViewSwitcher questions={testData} updatedDate="2025-01-01" />);
    expect(screen.getByText(/structured path for those new/)).toBeInTheDocument();
  });
});

describe("RoadmapView", () => {
  beforeEach(() => {
    mockTrackEvent.mockClear();
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders roadmap header and progress", () => {
    render(<RoadmapView roadmap={beginnerRoadmap} questions={testData} />);
    expect(screen.getByText(beginnerRoadmap.name)).toBeInTheDocument();
    expect(screen.getByText(/structured path for those new/)).toBeInTheDocument();
    // Should show progress with matching questions
    const completedElements = screen.getAllByText(/completed/);
    expect(completedElements.length).toBeGreaterThanOrEqual(1);
  });

  it("renders phase headers", () => {
    render(<RoadmapView roadmap={beginnerRoadmap} questions={testData} />);
    expect(screen.getByText(beginnerRoadmap.phases[0].title)).toBeInTheDocument();
  });

  it("renders questions that exist in the data", () => {
    render(<RoadmapView roadmap={beginnerRoadmap} questions={testData} />);
    // Two Sum and Contains Duplicate are in both testData and the beginner roadmap
    expect(screen.getByText("Two Sum")).toBeInTheDocument();
    expect(screen.getByText("Contains Duplicate")).toBeInTheDocument();
  });

  it("shows pre-populated notes with lightbulb", async () => {
    const user = userEvent.setup();
    render(<RoadmapView roadmap={beginnerRoadmap} questions={testData} />);
    // The beginner roadmap has notes behind a "Show hint" toggle
    const containsDupNote = beginnerRoadmap.phases[0].questions.find(
      (q) => q.slug === "contains-duplicate"
    )!.note;
    // Hint should be hidden initially
    expect(screen.queryByText(containsDupNote)).not.toBeInTheDocument();
    // Click the first "Show hint" button (contains-duplicate appears first)
    const hintButtons = screen.getAllByText("Show hint");
    await user.click(hintButtons[0]);
    expect(screen.getByText(containsDupNote)).toBeInTheDocument();
  });

  it("toggles question completion", async () => {
    const user = userEvent.setup();
    render(<RoadmapView roadmap={beginnerRoadmap} questions={testData} />);
    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[0]);
    expect(mockTrackEvent).toHaveBeenCalledWith("question_toggle", expect.objectContaining({
      completed: true,
    }));
  });

  it("collapses and expands phases", async () => {
    const user = userEvent.setup();
    render(<RoadmapView roadmap={beginnerRoadmap} questions={testData} />);
    const phaseHeader = screen.getByText(beginnerRoadmap.phases[0].title);
    const phaseButton = phaseHeader.closest("button")!;

    // Clicking should collapse
    await user.click(phaseButton);
    // Two Sum should no longer be visible (it's in phase 1)
    expect(screen.queryByText("Two Sum")).not.toBeInTheDocument();

    // Click again to expand
    await user.click(phaseButton);
    expect(screen.getByText("Two Sum")).toBeInTheDocument();
  });

  it("shows difficulty pills for each question", () => {
    render(<RoadmapView roadmap={beginnerRoadmap} questions={testData} />);
    // Both Two Sum and Contains Duplicate are Easy
    const easyPills = screen.getAllByText("Easy");
    expect(easyPills.length).toBeGreaterThanOrEqual(1);
  });

  it("renders experienced roadmap with its phases", () => {
    render(<RoadmapView roadmap={experiencedRoadmap} questions={testData} />);
    expect(screen.getByText(experiencedRoadmap.name)).toBeInTheDocument();
    expect(screen.getByText(experiencedRoadmap.phases[0].title)).toBeInTheDocument();
  });

  it("shows user notes when they exist", () => {
    localStorage.setItem("leetcode-patterns-notes", JSON.stringify({ 0: "My personal note" }));
    render(<RoadmapView roadmap={beginnerRoadmap} questions={testData} />);
    expect(screen.getByText(/My personal note/)).toBeInTheDocument();
  });

  it("toggles hint closed after opening", async () => {
    const user = userEvent.setup();
    render(<RoadmapView roadmap={beginnerRoadmap} questions={testData} />);
    const hintButtons = screen.getAllByText("Show hint");
    await user.click(hintButtons[0]);
    const containsDupNote = beginnerRoadmap.phases[0].questions.find(
      (q) => q.slug === "contains-duplicate"
    )!.note;
    expect(screen.getByText(containsDupNote)).toBeInTheDocument();
    // Click the hint area again to collapse
    await user.click(screen.getByText(containsDupNote));
    expect(screen.queryByText(containsDupNote)).not.toBeInTheDocument();
  });

  it("un-completing a question fires event with completed: false", async () => {
    const user = userEvent.setup();
    // Pre-mark question 1 (Contains Duplicate) as completed — it appears first in the Easy group
    localStorage.setItem("leetcode-patterns-completed", JSON.stringify([1]));
    render(<RoadmapView roadmap={beginnerRoadmap} questions={testData} />);
    // Wait for the useEffect to load completed state
    const checkbox = await screen.findByRole("checkbox", { checked: true });
    await user.click(checkbox);
    expect(mockTrackEvent).toHaveBeenCalledWith("question_toggle", expect.objectContaining({
      completed: false,
    }));
  });

  it("persists completion to localStorage", async () => {
    const user = userEvent.setup();
    render(<RoadmapView roadmap={beginnerRoadmap} questions={testData} />);
    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[0]);
    const stored = JSON.parse(localStorage.getItem("leetcode-patterns-completed")!);
    expect(stored).toContainEqual(expect.any(Number));
  });

  it("toggles star and tracks event", async () => {
    const user = userEvent.setup();
    render(<RoadmapView roadmap={beginnerRoadmap} questions={testData} />);
    const starButtons = screen.getAllByTitle("Star");
    await user.click(starButtons[0]);
    expect(mockTrackEvent).toHaveBeenCalledWith("star_toggle", expect.objectContaining({
      starred: true,
    }));
    // Persists to localStorage
    const stored = JSON.parse(localStorage.getItem("leetcode-patterns-starred")!);
    expect(stored.length).toBeGreaterThan(0);
  });

  it("unstars a starred question", async () => {
    const user = userEvent.setup();
    localStorage.setItem("leetcode-patterns-starred", JSON.stringify([0]));
    render(<RoadmapView roadmap={beginnerRoadmap} questions={testData} />);
    const unstarBtn = screen.getAllByTitle("Unstar");
    await user.click(unstarBtn[0]);
    expect(mockTrackEvent).toHaveBeenCalledWith("star_toggle", expect.objectContaining({
      starred: false,
    }));
  });

  it("opens note modal and saves a note", async () => {
    const user = userEvent.setup();
    render(<RoadmapView roadmap={beginnerRoadmap} questions={testData} />);
    const noteButtons = screen.getAllByTitle("Add note");
    await user.click(noteButtons[0]);
    // Modal should open
    expect(screen.getByText("Add your notes below")).toBeInTheDocument();
    const textarea = screen.getByPlaceholderText("Write your notes here...");
    await user.type(textarea, "My study note");
    await user.click(screen.getByText("Done"));
    expect(mockTrackEvent).toHaveBeenCalledWith("note_save", expect.objectContaining({
      has_content: true,
    }));
  });

  it("note modal shows unsaved changes warning on cancel", async () => {
    const user = userEvent.setup();
    render(<RoadmapView roadmap={beginnerRoadmap} questions={testData} />);
    const noteButtons = screen.getAllByTitle("Add note");
    await user.click(noteButtons[0]);
    const textarea = screen.getByPlaceholderText("Write your notes here...");
    await user.type(textarea, "unsaved text");
    await user.click(screen.getByText("Cancel"));
    expect(screen.getByText("Unsaved changes")).toBeInTheDocument();
  });

  it("note modal discard button closes without saving", async () => {
    const user = userEvent.setup();
    render(<RoadmapView roadmap={beginnerRoadmap} questions={testData} />);
    const noteButtons = screen.getAllByTitle("Add note");
    await user.click(noteButtons[0]);
    const textarea = screen.getByPlaceholderText("Write your notes here...");
    await user.type(textarea, "will discard");
    await user.click(screen.getByText("Cancel"));
    // Should show the confirm dialog
    await user.click(screen.getByText("Discard"));
    // Modal should be closed
    expect(screen.queryByText("Add your notes below")).not.toBeInTheDocument();
  });

  it("note modal keep editing returns to editor", async () => {
    const user = userEvent.setup();
    render(<RoadmapView roadmap={beginnerRoadmap} questions={testData} />);
    const noteButtons = screen.getAllByTitle("Add note");
    await user.click(noteButtons[0]);
    const textarea = screen.getByPlaceholderText("Write your notes here...");
    await user.type(textarea, "keep this");
    await user.click(screen.getByText("Cancel"));
    await user.click(screen.getByText("Keep editing"));
    // Should be back in the editor with text preserved
    expect(screen.getByPlaceholderText("Write your notes here...")).toHaveValue("keep this");
  });

  it("renders difficulty group headers for beginner roadmap", () => {
    render(<RoadmapView roadmap={beginnerRoadmap} questions={testData} />);
    // testData has Easy and Medium questions, both matched in beginner roadmap
    expect(screen.getByText("Easy")).toBeInTheDocument();
  });

  it("renders difficulty group headers for experienced roadmap", () => {
    render(<RoadmapView roadmap={experiencedRoadmap} questions={testData} />);
    expect(screen.getByText("Easy")).toBeInTheDocument();
  });

  it("beginner roadmap shows group descriptions", () => {
    render(<RoadmapView roadmap={beginnerRoadmap} questions={testData} />);
    expect(screen.getByText(/Build your foundation/)).toBeInTheDocument();
  });

  it("experienced roadmap hides group descriptions", () => {
    render(<RoadmapView roadmap={experiencedRoadmap} questions={testData} />);
    expect(screen.queryByText(/Build your foundation/)).not.toBeInTheDocument();
  });
});

describe("Roadmap data integrity", () => {
  it("beginner roadmap has no duplicate question slugs", () => {
    const slugs = beginnerRoadmap.phases.flatMap((p) => p.questions.map((q) => q.slug));
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("experienced roadmap has no duplicate question slugs", () => {
    const slugs = experiencedRoadmap.phases.flatMap((p) => p.questions.map((q) => q.slug));
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("experienced roadmap contains exactly 75 questions", () => {
    const count = experiencedRoadmap.phases.reduce(
      (sum, p) => sum + p.questions.length,
      0
    );
    expect(count).toBe(75);
  });

  it("every roadmap question has a non-empty note", () => {
    const allQuestions = [
      ...beginnerRoadmap.phases.flatMap((p) => p.questions),
      ...experiencedRoadmap.phases.flatMap((p) => p.questions),
    ];
    for (const q of allQuestions) {
      expect(q.note.length, `${q.slug} has empty note`).toBeGreaterThan(0);
    }
  });
});

describe("ViewSwitcher edge cases", () => {
  beforeEach(() => {
    mockTrackEvent.mockClear();
    mockSearchParams.current = new URLSearchParams();
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("ignores invalid ?view param and defaults to table", () => {
    mockSearchParams.current = new URLSearchParams("view=nonexistent");
    render(<ViewSwitcher questions={testData} updatedDate="2025-01-01" />);
    expect(screen.getByPlaceholderText("Search (/)...")).toBeInTheDocument();
  });

  it("switching back to table removes view param", async () => {
    const user = userEvent.setup();
    render(<ViewSwitcher questions={testData} updatedDate="2025-01-01" />);
    await user.click(screen.getByText("Beginner Roadmap"));
    await user.click(screen.getByText("All Questions"));
    expect(localStorage.getItem("leetcode-patterns-view")).toBe("table");
  });
});
