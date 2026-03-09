// Service Worker — cache-first for static assets, network-first for navigation
const CACHE_NAME = "lc-patterns-v2";

const PRECACHE_URLS = [
  "./404.html",
  "./__next.__PAGE__.txt",
  "./__next._full.txt",
  "./__next._head.txt",
  "./__next._index.txt",
  "./__next._tree.txt",
  "./_next/static/bzooqDfLhSvir9M5gYofV/_buildManifest.js",
  "./_next/static/bzooqDfLhSvir9M5gYofV/_clientMiddlewareManifest.json",
  "./_next/static/bzooqDfLhSvir9M5gYofV/_ssgManifest.js",
  "./_next/static/chunks/0eb0bf3b97e880b5.css",
  "./_next/static/chunks/53d02eea1ad60916.js",
  "./_next/static/chunks/640c112d1b9a4643.js",
  "./_next/static/chunks/73faf0d6d7f524a6.js",
  "./_next/static/chunks/79ac1610dc0243d2.js",
  "./_next/static/chunks/79d1674b52b6b294.js",
  "./_next/static/chunks/7c92e96509cd355e.js",
  "./_next/static/chunks/82abf2d65f5428ae.js",
  "./_next/static/chunks/88f96e801fa4d4cc.js",
  "./_next/static/chunks/a6dad97d9634a72d.js",
  "./_next/static/chunks/c0a4fb305e87a8ab.js",
  "./_next/static/chunks/d2be314c3ece3fbe.js",
  "./_next/static/chunks/ff1a16fafef87110.js",
  "./_next/static/chunks/turbopack-0f438a843bbea8cb.js",
  "./_next/static/media/32fe63294b6cd18c-s.7f335ffb.woff2",
  "./_next/static/media/406d3fc8d5ec9f59-s.p.3f4cab70.woff2",
  "./_next/static/media/4fa387ec64143e14-s.c1fdd6c2.woff2",
  "./_next/static/media/7178b3e590c64307-s.b97b3418.woff2",
  "./_next/static/media/73091b67359a1d13-s.48aa4bab.woff2",
  "./_next/static/media/797e433ab948586e-s.p.dbea232f.woff2",
  "./_next/static/media/8a480f0b521d4e75-s.8e0177b5.woff2",
  "./_next/static/media/bbc41e54d2fcbd21-s.799d8ef8.woff2",
  "./_next/static/media/caa3a2e1cccd8315-s.p.853070df.woff2",
  "./_not-found/__next._full.txt",
  "./_not-found/__next._head.txt",
  "./_not-found/__next._index.txt",
  "./_not-found/__next._not-found.__PAGE__.txt",
  "./_not-found/__next._not-found.txt",
  "./_not-found/__next._tree.txt",
  "./_not-found.html",
  "./_not-found.txt",
  "./index.html",
  "./index.txt",
  "./manifest.json",
  "./robots.txt"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Skip non-GET and chrome-extension requests
  if (request.method !== "GET" || !request.url.startsWith("http")) return;

  // Skip analytics and external API calls
  if (
    request.url.includes("google-analytics.com") ||
    request.url.includes("googletagmanager.com") ||
    request.url.includes("s2/favicons")
  ) return;

  // Navigation requests: network-first with cache fallback
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("./")))
    );
    return;
  }

  // Static assets: cache-first with network fallback
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((response) => {
          // Only cache successful same-origin responses
          if (response.ok && request.url.startsWith(self.location.origin)) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
    )
  );
});
