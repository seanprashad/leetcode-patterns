import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/analytics", () => ({
  trackEvent: vi.fn(),
}));

import Acknowledgements from "@/components/Acknowledgements";

describe("Acknowledgements", () => {
  it("renders all three cards", () => {
    render(<Acknowledgements />);
    expect(
      screen.getByText("Blind Curated 75 Question List"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Grokking the Coding Interview/),
    ).toBeInTheDocument();
    expect(screen.getByText(/14 Patterns to Ace/)).toBeInTheDocument();
  });

  it("renders correct links", () => {
    render(<Acknowledgements />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute("target", "_blank");
  });
});
