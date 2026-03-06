import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("react-markdown", () => ({
  default: ({ children }: { children: string }) => <pre>{children}</pre>,
}));

import Tips from "@/components/Tips";

describe("Tips", () => {
  it("renders the tips content", () => {
    render(<Tips />);
    expect(screen.getByText(/Binary search/)).toBeInTheDocument();
    expect(screen.getByText(/Dynamic programming/)).toBeInTheDocument();
  });
});
