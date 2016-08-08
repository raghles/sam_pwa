var cacheName   = 'cache-8a';

self.addEventListener('install', e => {
  console.log('[ServiceWorker] Install ' + cacheName);
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/',
        'index.html',
        '/index.html',
        '/home.html',
        'home.html',
        '/js/main.js',
        '/img/index.jpg',
        '/img/home.jpg',
        '/imgs/index.jpg',
        '/imgs/home.jpg',
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