const CACHE_NAME = "residency-v8"; // Trocar sempre que tiver mudança em arquivos da aplicação
const ASSETS = [
  "./",
  "./index.html",
  "./pages/login.html",
  "./pages/home.html",
  "./js/pages/login.js",
  "./js/pages/home.js",
  "./js/pages/home2.js",
  "./js/app.js",
  "./images/icons/icon-192x192.png",
  "./images/icons/icon-512x512.png",
  "./images/icons/apple-touch-icon.png",
  "./images/icons/favicon-96x96.png",
  "./images/icons/favicon.ico",
  "./images/icons/favicon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(ASSETS);
    }),
  );
  self.skipWaiting(); // força a ativação
});

// Executado uma vez por versão nova
// Limpar caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
        }),
      );
    }),
  );
  self.clients.claim(); // Deixe o novo service worker no controle de todas as abas do PWA
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.add(event.request, responseClone);
        });
        return response;
      })
      .catch((e) => {
        alert("Erro", e);
        caches.match(event.request);
      }),
  );
});
