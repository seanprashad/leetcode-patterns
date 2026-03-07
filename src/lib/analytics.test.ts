import { describe, it, expect, vi, beforeEach } from "vitest";

const { mockSendGAEvent } = vi.hoisted(() => ({
  mockSendGAEvent: vi.fn(),
}));

vi.mock("@next/third-parties/google", () => ({
  sendGAEvent: mockSendGAEvent,
}));

import { trackEvent } from "@/lib/analytics";

describe("trackEvent", () => {
  beforeEach(() => {
    mockSendGAEvent.mockClear();
  });

  it("calls sendGAEvent with event name and params", () => {
    trackEvent("test_event", { key: "value" });
    expect(mockSendGAEvent).toHaveBeenCalledWith("event", "test_event", { key: "value" });
  });

  it("passes empty object when no params provided", () => {
    trackEvent("bare_event");
    expect(mockSendGAEvent).toHaveBeenCalledWith("event", "bare_event", {});
  });

  it("handles numeric params", () => {
    trackEvent("count_event", { count: 42 });
    expect(mockSendGAEvent).toHaveBeenCalledWith("event", "count_event", { count: 42 });
  });

  it("handles boolean params", () => {
    trackEvent("toggle_event", { enabled: true });
    expect(mockSendGAEvent).toHaveBeenCalledWith("event", "toggle_event", { enabled: true });
  });
});
