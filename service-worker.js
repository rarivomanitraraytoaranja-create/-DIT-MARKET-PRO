const CACHE_NAME = "edit-market-pro-v1";

const ASSETS = [
  "/",
  "/index.html",
  "/products.html",
  "/product.html",
  "/categories.html",
  "/checkout.html",
  "/login.html",
  "/register.html",

  "/assets/css/main.css",
  "/scripts/storage.js",
  "/scripts/utils.js"
];

// INSTALL
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// ACTIVATE
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// FETCH (OFFLINE STRATEGY)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
