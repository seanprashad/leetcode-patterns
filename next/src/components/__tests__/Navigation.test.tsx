import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("react-icons/fa", () => ({
  FaGithub: () => <span data-testid="github-icon" />,
}));

vi.mock("@/lib/analytics", () => ({
  trackEvent: vi.fn(),
}));

import Navigation from "@/components/Navigation";

describe("Navigation", () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.className = "";
  });

  it("renders the brand name", () => {
    render(<Navigation />);
    expect(screen.getByText("Leetcode Patterns")).toBeInTheDocument();
  });

  it("renders the GitHub link", () => {
    render(<Navigation />);
    const link = screen.getByLabelText("GitHub repository");
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/SeanPrashad/leetcode-patterns",
    );
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders the dark mode toggle", () => {
    render(<Navigation />);
    expect(screen.getByLabelText("Switch to dark mode")).toBeInTheDocument();
  });
});
