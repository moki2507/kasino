// Generated at build time by scripts/serviceWorkerPlugin.ts – do not edit.
const CACHE = 'kasino-c6e5e2141908';
const FILES = ["./","./assets/index-BHDknOG3.css","./assets/index-DjSfIuzE.js","./icons/icon-180.png","./icons/icon-192.png","./icons/icon-512.png","./manifest.webmanifest"];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('kasino-') && key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    // The page: newest version when online, the stored one when offline.
    // "no-cache": always ask the server (hosts like GitHub Pages allow keeping the page 10 minutes,
    // which made updates show up late); unchanged pages cost only a tiny "not modified" answer.
    event.respondWith(
      fetch(request.url, { cache: 'no-cache', credentials: 'same-origin' })
        .then((response) => {
          const copy = response.clone();
          if (response.ok) caches.open(CACHE).then((cache) => cache.put('./', copy));
          return response;
        })
        .catch(() => caches.match('./', { ignoreVary: true })),
    );
    return;
  }
  // ignoreVary: many hosts send "Vary: Origin", and module scripts are requested with an Origin header the
  // stored copy was not – without this the stored files would not be found offline.
  event.respondWith(caches.match(request, { ignoreVary: true }).then((stored) => stored || fetch(request)));
});
