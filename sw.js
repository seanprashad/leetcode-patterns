// Service Worker — cache-first for static assets, network-first for navigation
const CACHE_NAME = "lc-patterns-v2";

const PRECACHE_URLS = [
  "./404.html",
  "./__next.__PAGE__.txt",
  "./__next._full.txt",
  "./__next._tree.txt",
  "./_next/static/IojUh1Dy6Fln83A3FF3Yl/_buildManifest.js",
  "./_next/static/IojUh1Dy6Fln83A3FF3Yl/_clientMiddlewareManifest.js",
  "./_next/static/IojUh1Dy6Fln83A3FF3Yl/_ssgManifest.js",
  "./_next/static/chunks/03lt0o4zdxwe3.js",
  "./_next/static/chunks/05he_2-lv6pqb.js",
  "./_next/static/chunks/05wjci380js-5.js",
  "./_next/static/chunks/0cz1d0mv5g_q7.js",
  "./_next/static/chunks/0umf92h1sb77c.js",
  "./_next/static/chunks/1hwbgd4nvvhg8.js",
  "./_next/static/chunks/1yxqg9ufcex1n.css",
  "./_next/static/chunks/22p_zeshnzse_.js",
  "./_next/static/chunks/2n5qeheznvl4u.js",
  "./_next/static/chunks/3srfjz42u14tx.js",
  "./_next/static/chunks/3woxqsr35dvl7.js",
  "./_next/static/chunks/turbopack-42vtg5b9fm9ll.js",
  "./_next/static/media/02bc3a0a268a7888-s.0tc1fqk3fgfsz.woff2",
  "./_next/static/media/07935285219a259d-s.1qq4vpdcun5oj.woff2",
  "./_next/static/media/07a39a8a4660cc7c-s.p.0r6juujl39pe6.woff2",
  "./_next/static/media/10034b965cbc3a26-s.p.0mnr43et3sf34.woff2",
  "./_next/static/media/2a04751c893bf294-s.1rgnod-3esatf.woff2",
  "./_next/static/media/2bb852295097cd96-s.2dbetqa9o8jxf.woff2",
  "./_next/static/media/4f6667dd39116621-s.3p2_lha1f2xer.woff2",
  "./_next/static/media/605ce01b664af129-s.p.0wgildi0cnwt9.woff2",
  "./_next/static/media/6e342921ee4dcd9d-s.2tuy5pz7dlieh.woff2",
  "./_next/static/media/77814b00d5ca94a4-s.21jp631_3pja2.woff2",
  "./_next/static/media/9eb5a876700c0028-s.1uyisp29ctx0d.woff2",
  "./_next/static/media/b0c6b664fd57c2c6-s.31988l_ccedte.woff2",
  "./_next/static/media/f58031ded4338640-s.390ncx5urfkfu.woff2",
  "./_next/static/media/f61789f76661d50c-s.22yt1aol_-g3w.woff2",
  "./_not-found/__next._full.txt",
  "./_not-found/__next._not-found.__PAGE__.txt",
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
