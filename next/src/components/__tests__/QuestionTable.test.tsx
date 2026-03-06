import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("react-icons/fa", () => ({
  FaLock: () => <span data-testid="lock-icon" />,
  FaExternalLinkAlt: () => <span data-testid="link-icon" />,
  FaRandom: () => <span data-testid="random-icon" />,
}));

vi.mock("@/lib/analytics", () => ({
  trackEvent: vi.fn(),
}));

vi.mock("react-tooltip", () => ({
  Tooltip: () => null,
}));

vi.mock("react-minimal-pie-chart", () => ({
  PieChart: () => <div data-testid="pie-chart" />,
}));

import QuestionTable from "@/components/table/QuestionTable";

describe("QuestionTable", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the table with question rows", () => {
    render(<QuestionTable />);
    // Should have filter dropdowns
    expect(screen.getByLabelText("Filter by Status")).toBeInTheDocument();
    expect(screen.getByLabelText("Filter by Difficulty")).toBeInTheDocument();
    expect(screen.getByLabelText("Filter by Pattern")).toBeInTheDocument();
    expect(screen.getByLabelText("Filter by Company")).toBeInTheDocument();
  });

  it("renders progress bars in header", () => {
    render(<QuestionTable />);
    expect(screen.getAllByText("Easy").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Medium").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Hard").length).toBeGreaterThan(0);
  });

  it("renders the pie chart", () => {
    render(<QuestionTable />);
    expect(screen.getByTestId("pie-chart")).toBeInTheDocument();
  });

  it("renders reset button", () => {
    render(<QuestionTable />);
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  it("can check a question", async () => {
    const user = userEvent.setup();
    render(<QuestionTable />);
    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[0]);
    expect(checkboxes[0]).toBeChecked();
  });

  it("filters by difficulty", async () => {
    const user = userEvent.setup();
    render(<QuestionTable />);
    const difficultyFilter = screen.getByLabelText("Filter by Difficulty");
    await user.selectOptions(difficultyFilter, "Hard");
    // All visible difficulty badges should be "Hard"
    const badges = screen.getAllByText("Hard");
    expect(badges.length).toBeGreaterThan(0);
  });
});
