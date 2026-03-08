import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { registerServiceWorker } from "@/lib/register-sw";

describe("registerServiceWorker", () => {
  let originalSW: ServiceWorkerContainer;
  const mockRegister = vi.fn(() => Promise.resolve({} as ServiceWorkerRegistration));

  beforeEach(() => {
    mockRegister.mockClear();
    originalSW = navigator.serviceWorker;
    Object.defineProperty(navigator, "serviceWorker", {
      value: { register: mockRegister },
      configurable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(navigator, "serviceWorker", {
      value: originalSW,
      configurable: true,
    });
  });

  it("registers sw.js on window load", () => {
    registerServiceWorker();
    window.dispatchEvent(new Event("load"));
    expect(mockRegister).toHaveBeenCalledWith("/sw.js");
  });

  it("includes basePath in sw.js URL", () => {
    registerServiceWorker("/leetcode-patterns");
    window.dispatchEvent(new Event("load"));
    expect(mockRegister).toHaveBeenCalledWith("/leetcode-patterns/sw.js");
  });

  it("does not throw when registration fails", () => {
    mockRegister.mockRejectedValueOnce(new Error("fail"));
    registerServiceWorker();
    expect(() => window.dispatchEvent(new Event("load"))).not.toThrow();
  });

  it("does nothing when serviceWorker is not supported", () => {
    Object.defineProperty(navigator, "serviceWorker", {
      value: undefined,
      configurable: true,
    });
    expect(() => registerServiceWorker()).not.toThrow();
    expect(mockRegister).not.toHaveBeenCalled();
  });
});
