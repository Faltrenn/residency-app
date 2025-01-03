const cacheName = "residency";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(["./", "../manifest.webmanifest", "../index.html"]);
    }),
  );
  return self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  self.clients.claim();
});

self.addEventListener("fetch", async (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkFirst(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkFirst(req) {
  const cache = await caches.open(cacheName);
  try {
    const refresh = await fetch(req);
    cache.put(req, refresh.clone());
    return refresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}
