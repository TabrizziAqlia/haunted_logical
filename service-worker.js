const CACHE_NAME = 'logika-proposisional-v1';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    './assets/haunted_house.png', 
    './assets/icon-192.png',
    './assets/icon-512.png'
];

// Instalasi Service Worker dan Caching Awal
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Intercept Fetch Requests (Mengambil dari cache jika offline)
self.addEventListener('fetch', event => {
    // Abaikan permintaan eksternal (seperti MathJax)
    if (event.request.url.startsWith('http') && !event.request.url.includes(location.host)) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Aktivasi dan Pembersihan Cache Lama
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName); 
                    }
                })
            );
        })
    );
});
