import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const { mockTrackEvent } = vi.hoisted(() => ({
  mockTrackEvent: vi.fn(),
}));

vi.mock("@/lib/analytics", () => ({
  trackEvent: mockTrackEvent,
}));

import AboutPanel from "@/components/panels/AboutPanel";
import TipsPanel from "@/components/panels/TipsPanel";
import AcknowledgementsPanel from "@/components/panels/AcknowledgementsPanel";

describe("AboutPanel analytics", () => {
  beforeEach(() => {
    mockTrackEvent.mockClear();
  });

  it("tracks panel_open when About tab is clicked", async () => {
    const user = userEvent.setup();
    render(<AboutPanel />);
    await user.click(screen.getByLabelText("Open about"));
    expect(mockTrackEvent).toHaveBeenCalledWith("panel_open", { panel: "about" });
  });

  it("tracks panel_close when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<AboutPanel />);
    await user.click(screen.getByLabelText("Open about"));
    mockTrackEvent.mockClear();
    const heading = screen.getByRole("heading", { name: /about/i });
    const closeBtn = heading.closest("div")!.querySelector("button")!;
    await user.click(closeBtn);
    expect(mockTrackEvent).toHaveBeenCalledWith("panel_close", { panel: "about" });
  });
});

describe("TipsPanel analytics", () => {
  beforeEach(() => {
    mockTrackEvent.mockClear();
  });

  it("tracks panel_open when Tips tab is clicked", async () => {
    const user = userEvent.setup();
    render(<TipsPanel />);
    await user.click(screen.getByLabelText("Open tips"));
    expect(mockTrackEvent).toHaveBeenCalledWith("panel_open", { panel: "tips" });
  });

  it("tracks panel_close when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<TipsPanel />);
    await user.click(screen.getByLabelText("Open tips"));
    mockTrackEvent.mockClear();
    const heading = screen.getByRole("heading", { name: /helpful tips/i });
    const buttons = heading.closest("div")!.querySelectorAll("button");
    const closeBtn = buttons[buttons.length - 1];
    await user.click(closeBtn);
    expect(mockTrackEvent).toHaveBeenCalledWith("panel_close", { panel: "tips" });
  });
});

describe("AcknowledgementsPanel analytics", () => {
  beforeEach(() => {
    mockTrackEvent.mockClear();
  });

  it("tracks panel_open when Acknowledgements tab is clicked", async () => {
    const user = userEvent.setup();
    render(<AcknowledgementsPanel />);
    await user.click(screen.getByLabelText("Open acknowledgements"));
    expect(mockTrackEvent).toHaveBeenCalledWith("panel_open", { panel: "acknowledgements" });
  });

  it("tracks panel_close when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<AcknowledgementsPanel />);
    await user.click(screen.getByLabelText("Open acknowledgements"));
    mockTrackEvent.mockClear();
    const heading = screen.getByRole("heading", { name: /acknowledgements/i });
    const closeBtn = heading.closest("div")!.querySelector("button")!;
    await user.click(closeBtn);
    expect(mockTrackEvent).toHaveBeenCalledWith("panel_close", { panel: "acknowledgements" });
  });
});
