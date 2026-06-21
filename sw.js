// Service Worker — cache-first for static assets, network-first for navigation
const CACHE_NAME = "lc-patterns-v2";

const PRECACHE_URLS = [
  "./404.html",
  "./__next.__PAGE__.txt",
  "./__next._full.txt",
  "./__next._head.txt",
  "./__next._index.txt",
  "./__next._tree.txt",
  "./_next/static/8XnGmOOR7oHokxzQAuBci/_buildManifest.js",
  "./_next/static/8XnGmOOR7oHokxzQAuBci/_clientMiddlewareManifest.js",
  "./_next/static/8XnGmOOR7oHokxzQAuBci/_ssgManifest.js",
  "./_next/static/chunks/0-4oo_oi06i0r.js",
  "./_next/static/chunks/011tg_p_f.0_i.css",
  "./_next/static/chunks/01xlw8hd842-c.js",
  "./_next/static/chunks/03~yq9q893hmn.js",
  "./_next/static/chunks/05ar-vfbrnxyo.js",
  "./_next/static/chunks/07qwvcoiy~jsy.js",
  "./_next/static/chunks/0d3shmwh5_nmn.js",
  "./_next/static/chunks/0ka051yepewro.js",
  "./_next/static/chunks/0l3zwcvnt61hx.js",
  "./_next/static/chunks/0pqt~8bl3ukh4.js",
  "./_next/static/chunks/0zbxgvbg0jygn.js",
  "./_next/static/chunks/10loyb0i7ab45.js",
  "./_next/static/chunks/10~oyk7imqmpj.js",
  "./_next/static/chunks/turbopack-06i.l9ahi4hs1.js",
  "./_next/static/media/32fe63294b6cd18c-s.090h5ho-armea.woff2",
  "./_next/static/media/406d3fc8d5ec9f59-s.p.06~5xv2ritwv5.woff2",
  "./_next/static/media/4fa387ec64143e14-s.0wkzw~je483f-.woff2",
  "./_next/static/media/53b9e256198e5412-s.0-wfv7uh4i7h9.woff2",
  "./_next/static/media/5ce348bf30bf5439-s.0zgw-jeven.3w.woff2",
  "./_next/static/media/6306c77e7c8268e4-s.0rhz0arwfsn~5.woff2",
  "./_next/static/media/7178b3e590c64307-s.0nx0ww8fni_q3.woff2",
  "./_next/static/media/73091b67359a1d13-s.0oa818ucctjip.woff2",
  "./_next/static/media/797e433ab948586e-s.p.08e28id.o-okb.woff2",
  "./_next/static/media/7d817b4c03b0c5f1-s.0l76wvqk9d84w.woff2",
  "./_next/static/media/8a480f0b521d4e75-s.0jzbimsg8vl84.woff2",
  "./_next/static/media/bbc41e54d2fcbd21-s.0k4k9394f2q-k.woff2",
  "./_next/static/media/caa3a2e1cccd8315-s.p.09~u27dqhyhd6.woff2",
  "./_next/static/media/fef07dbb0973bf53-s.12tyk43_3sh9u.woff2",
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
