// Service Worker — cache-first for static assets, network-first for navigation
const CACHE_NAME = "lc-patterns-v2";

const PRECACHE_URLS = [
  "./404.html",
  "./__next.__PAGE__.txt",
  "./__next._full.txt",
  "./__next._head.txt",
  "./__next._index.txt",
  "./__next._tree.txt",
  "./_next/static/8xpJBhF1DlGWT7vOenZF-/_buildManifest.js",
  "./_next/static/8xpJBhF1DlGWT7vOenZF-/_clientMiddlewareManifest.js",
  "./_next/static/8xpJBhF1DlGWT7vOenZF-/_ssgManifest.js",
  "./_next/static/chunks/01dsj8u6opkim.js",
  "./_next/static/chunks/05-c3ty_6dwfk.js",
  "./_next/static/chunks/0cz1d0mv5g_q7.js",
  "./_next/static/chunks/0o_cxzi1i7zxi.js",
  "./_next/static/chunks/14mrh2-p_w84d.js",
  "./_next/static/chunks/1rxncug86bump.js",
  "./_next/static/chunks/27jktro2p5rq9.js",
  "./_next/static/chunks/2c-thpbvwgipu.css",
  "./_next/static/chunks/2chjglmk9r3r8.js",
  "./_next/static/chunks/2wt7gy87vomtp.js",
  "./_next/static/chunks/36ssnkm0cjgq6.js",
  "./_next/static/chunks/3hy8e7rppjzyp.js",
  "./_next/static/chunks/3jat3jevrmx64.js",
  "./_next/static/chunks/turbopack-0wzv32_tvx9f2.js",
  "./_next/static/media/32fe63294b6cd18c-s.0tc1fqk3fgfsz.woff2",
  "./_next/static/media/406d3fc8d5ec9f59-s.p.0mnr43et3sf34.woff2",
  "./_next/static/media/4fa387ec64143e14-s.2tuy5pz7dlieh.woff2",
  "./_next/static/media/53b9e256198e5412-s.390ncx5urfkfu.woff2",
  "./_next/static/media/5ce348bf30bf5439-s.31988l_ccedte.woff2",
  "./_next/static/media/6306c77e7c8268e4-s.2dbetqa9o8jxf.woff2",
  "./_next/static/media/7178b3e590c64307-s.21jp631_3pja2.woff2",
  "./_next/static/media/73091b67359a1d13-s.22yt1aol_-g3w.woff2",
  "./_next/static/media/797e433ab948586e-s.p.0r6juujl39pe6.woff2",
  "./_next/static/media/7d817b4c03b0c5f1-s.1uyisp29ctx0d.woff2",
  "./_next/static/media/8a480f0b521d4e75-s.1qq4vpdcun5oj.woff2",
  "./_next/static/media/bbc41e54d2fcbd21-s.1rgnod-3esatf.woff2",
  "./_next/static/media/caa3a2e1cccd8315-s.p.0wgildi0cnwt9.woff2",
  "./_next/static/media/fef07dbb0973bf53-s.3p2_lha1f2xer.woff2",
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
