import { describe, it, expect, vi, beforeEach } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

// --- Helpers to build a mock Service Worker environment ---

function createMockCache() {
  const store = new Map<string, Response>();
  return {
    addAll: vi.fn(async (urls: string[]) => {
      urls.forEach((u) => store.set(u, new Response("")));
    }),
    put: vi.fn(async (req: Request | string, res: Response) => {
      const key = typeof req === "string" ? req : req.url;
      store.set(key, res);
    }),
    match: vi.fn(async (req: Request | string) => {
      const key = typeof req === "string" ? req : req.url;
      return store.get(key) ?? undefined;
    }),
    _store: store,
  };
}

type MockCache = ReturnType<typeof createMockCache>;

function createMockCaches() {
  const cacheMap = new Map<string, MockCache>();
  return {
    open: vi.fn(async (name: string) => {
      if (!cacheMap.has(name)) cacheMap.set(name, createMockCache());
      return cacheMap.get(name)!;
    }),
    keys: vi.fn(async () => [...cacheMap.keys()]),
    delete: vi.fn(async (name: string) => {
      cacheMap.delete(name);
      return true;
    }),
    match: vi.fn(async (req: Request | string) => {
      for (const cache of cacheMap.values()) {
        const hit = await cache.match(req);
        if (hit) return hit;
      }
      return undefined;
    }),
    _map: cacheMap,
  };
}

interface FetchEvent {
  request: Request;
  respondWith: ReturnType<typeof vi.fn>;
  waitUntil: ReturnType<typeof vi.fn>;
}

function loadSW(mockSelf: Record<string, unknown>) {
  const swSource = readFileSync(join(__dirname, "../../public/sw.js"), "utf-8");
  type EventHandler = (...args: unknown[]) => void;
  const listeners = new Map<string, EventHandler[]>();

  mockSelf.addEventListener = (event: string, handler: EventHandler) => {
    if (!listeners.has(event)) listeners.set(event, []);
    listeners.get(event)!.push(handler);
  };

  // Execute the SW script in context of mockSelf
  const fn = new Function(
    "self",
    "caches",
    "fetch",
    "Response",
    "Request",
    swSource
  );
  fn(mockSelf, mockSelf.caches, mockSelf.fetch, Response, Request);

  return {
    trigger(event: string, detail: Record<string, unknown>) {
      const handlers = listeners.get(event) ?? [];
      handlers.forEach((h) => h(detail));
    },
    listeners,
  };
}

// --- Tests ---

describe("Service Worker", () => {
  let mockCaches: ReturnType<typeof createMockCaches>;
  let mockFetch: ReturnType<typeof vi.fn>;
  let mockSelf: Record<string, unknown>;
  let sw: ReturnType<typeof loadSW>;

  beforeEach(() => {
    mockCaches = createMockCaches();
    mockFetch = vi.fn();
    mockSelf = {
      caches: mockCaches,
      fetch: mockFetch,
      skipWaiting: vi.fn(),
      clients: { claim: vi.fn() },
      location: { origin: "https://example.com" },
    };
    sw = loadSW(mockSelf);
  });

  describe("install", () => {
    it("precaches PRECACHE_URLS and calls skipWaiting", async () => {
      const waitPromises: Promise<unknown>[] = [];
      sw.trigger("install", {
        waitUntil: (p: Promise<unknown>) => waitPromises.push(p),
      });

      await Promise.all(waitPromises);

      const cache = await mockCaches.open("lc-patterns-v2");
      expect(cache.addAll).toHaveBeenCalledWith(
        expect.arrayContaining(["./", "./manifest.json"])
      );
      expect(mockSelf.skipWaiting).toHaveBeenCalled();
    });
  });

  describe("activate", () => {
    it("deletes old caches and claims clients", async () => {
      // Pre-populate an old cache
      await mockCaches.open("lc-patterns-v1");
      await mockCaches.open("lc-patterns-v2");

      const waitPromises: Promise<unknown>[] = [];
      sw.trigger("activate", {
        waitUntil: (p: Promise<unknown>) => waitPromises.push(p),
      });

      await Promise.all(waitPromises);

      const keys = await mockCaches.keys();
      expect(keys).not.toContain("lc-patterns-v1");
      expect(keys).toContain("lc-patterns-v2");
      expect((mockSelf.clients as { claim: () => void }).claim).toHaveBeenCalled();
    });
  });

  describe("fetch handler", () => {
    function makeFetchEvent(url: string, overrides: Partial<RequestInit & { mode: string }> = {}): FetchEvent {
      return {
        request: new Request(url, { method: "GET", ...overrides }),
        respondWith: vi.fn(),
        waitUntil: vi.fn(),
      };
    }

    it("ignores non-GET requests", () => {
      const event = makeFetchEvent("https://example.com/api", { method: "POST" });
      sw.trigger("fetch", event);
      expect(event.respondWith).not.toHaveBeenCalled();
    });

    it("ignores non-http requests", () => {
      const event = {
        request: { method: "GET", url: "chrome-extension://abc/page", mode: "navigate" },
        respondWith: vi.fn(),
      };
      sw.trigger("fetch", event);
      expect(event.respondWith).not.toHaveBeenCalled();
    });

    it("skips google-analytics.com requests", () => {
      const event = makeFetchEvent("https://www.google-analytics.com/collect");
      sw.trigger("fetch", event);
      expect(event.respondWith).not.toHaveBeenCalled();
    });

    it("skips googletagmanager.com requests", () => {
      const event = makeFetchEvent("https://www.googletagmanager.com/gtag/js");
      sw.trigger("fetch", event);
      expect(event.respondWith).not.toHaveBeenCalled();
    });

    it("skips favicon requests via s2/favicons", () => {
      const event = makeFetchEvent("https://www.google.com/s2/favicons?sz=64");
      sw.trigger("fetch", event);
      expect(event.respondWith).not.toHaveBeenCalled();
    });

    it("uses cache-first for static assets", async () => {
      // Pre-populate cache with a response
      const cache = await mockCaches.open("lc-patterns-v2");
      const cachedResponse = new Response("cached-body");
      await cache.put("https://example.com/app.js", cachedResponse);

      const event = makeFetchEvent("https://example.com/app.js");
      sw.trigger("fetch", event);

      expect(event.respondWith).toHaveBeenCalled();
      const result = await event.respondWith.mock.calls[0][0];
      expect(result).toBe(cachedResponse);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it("falls back to network for cache miss on static assets", async () => {
      const networkResponse = new Response("network-body", { status: 200 });
      mockFetch.mockResolvedValue(networkResponse);

      const event = makeFetchEvent("https://example.com/app.js");
      sw.trigger("fetch", event);

      expect(event.respondWith).toHaveBeenCalled();
      const result = await event.respondWith.mock.calls[0][0];
      expect(result).toBe(networkResponse);
      expect(mockFetch).toHaveBeenCalled();
    });

    it("caches successful same-origin static asset responses", async () => {
      const networkResponse = new Response("new-body", { status: 200 });
      mockFetch.mockResolvedValue(networkResponse);

      const event = makeFetchEvent("https://example.com/style.css");
      sw.trigger("fetch", event);
      await event.respondWith.mock.calls[0][0];

      // Wait for the async cache.put
      await new Promise((r) => setTimeout(r, 10));

      const cache = await mockCaches.open("lc-patterns-v2");
      expect(cache.put).toHaveBeenCalled();
    });

    it("does not cache cross-origin static asset responses", async () => {
      const networkResponse = new Response("external", { status: 200 });
      mockFetch.mockResolvedValue(networkResponse);

      const event = makeFetchEvent("https://cdn.other.com/lib.js");
      sw.trigger("fetch", event);
      await event.respondWith.mock.calls[0][0];

      await new Promise((r) => setTimeout(r, 10));

      const cache = await mockCaches.open("lc-patterns-v2");
      expect(cache.put).not.toHaveBeenCalled();
    });

    it("uses network-first for navigation requests", async () => {
      const networkResponse = new Response("page-html", { status: 200 });
      mockFetch.mockResolvedValue(networkResponse);

      // Create a navigation request by overriding mode
      const request = new Request("https://example.com/", { method: "GET" });
      Object.defineProperty(request, "mode", { value: "navigate" });
      const event = { request, respondWith: vi.fn(), waitUntil: vi.fn() };

      sw.trigger("fetch", event);

      expect(event.respondWith).toHaveBeenCalled();
      const result = await event.respondWith.mock.calls[0][0];
      expect(result).toBe(networkResponse);
    });

    it("falls back to cache for navigation when network fails", async () => {
      mockFetch.mockRejectedValue(new Error("offline"));

      // Pre-populate cache
      const cache = await mockCaches.open("lc-patterns-v2");
      const cachedPage = new Response("cached-page");
      const navUrl = "https://example.com/";
      await cache.put(navUrl, cachedPage);

      const request = new Request(navUrl, { method: "GET" });
      Object.defineProperty(request, "mode", { value: "navigate" });
      const event = { request, respondWith: vi.fn(), waitUntil: vi.fn() };

      sw.trigger("fetch", event);

      const result = await event.respondWith.mock.calls[0][0];
      expect(result).toBe(cachedPage);
    });
  });
});
