var cacheName   = 'cache-9';

self.addEventListener('install', e => {
  console.log('[ServiceWorker] Install ' + cacheName);
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/sam_pwa/',
        '/sam_pwa/index.html',
        '/sam_pwa/home.html',
        '/sam_pwa/js/main.js',
        '/sam_pwa/img/index.jpg',
        '/sam_pwa/img/home.jpg',
        '/sam_pwa/imgs/index.jpg',
        '/sam_pwa/imgs/home.jpg',
      ]);
    })
  )
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      console.log(event.request.url);
      return response || fetch(event.request);
    })
  );
});
