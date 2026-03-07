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

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ replace: vi.fn() }),
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
    expect(mockTrackEvent).toHaveBeenCalledWith("switch_view", { view: "experienced" });
  });

  it("persists view selection to localStorage", async () => {
    const user = userEvent.setup();
    render(<ViewSwitcher questions={testData} updatedDate="2025-01-01" />);
    await user.click(screen.getByText("Beginner Roadmap"));
    expect(localStorage.getItem("leetcode-patterns-view")).toBe("beginner");
  });

  it("restores view selection from localStorage", () => {
    localStorage.setItem("leetcode-patterns-view", "experienced");
    render(<ViewSwitcher questions={testData} updatedDate="2025-01-01" />);
    expect(screen.getByText(/Originally shared on Blind by/)).toBeInTheDocument();
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
});
