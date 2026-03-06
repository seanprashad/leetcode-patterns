import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("@/lib/analytics", () => ({
  trackEvent: vi.fn(),
}));

vi.mock("react-markdown", () => ({
  default: ({ children }: { children: string }) => <pre>{children}</pre>,
}));

vi.mock("@/components/table/QuestionTable", () => ({
  default: () => <div data-testid="question-table">QuestionTable</div>,
}));

import Tabs from "@/components/Tabs";

describe("Tabs", () => {
  it("renders all three tab buttons", () => {
    render(<Tabs />);
    expect(screen.getByText("Question List")).toBeInTheDocument();
    expect(screen.getByText("Tips")).toBeInTheDocument();
    expect(screen.getByText("Acknowledgements")).toBeInTheDocument();
  });

  it("shows question list tab by default", () => {
    render(<Tabs />);
    expect(screen.getByTestId("question-table")).toBeInTheDocument();
  });

  it("switches to Tips tab", async () => {
    const user = userEvent.setup();
    render(<Tabs />);
    await user.click(screen.getByText("Tips"));
    expect(
      screen.getByText(/If input array is sorted then/),
    ).toBeInTheDocument();
  });

  it("switches to Acknowledgements tab", async () => {
    const user = userEvent.setup();
    render(<Tabs />);
    await user.click(screen.getByText("Acknowledgements"));
    expect(
      screen.getByText(/The following sources were used/),
    ).toBeInTheDocument();
  });
});
