const CACHE_NAME = "submisi1-v1";

var filesToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/pages/about.html",
    "/pages/footer.html",
    "/pages/portfolio.html",
    "/pages/services.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    '/images/profile.jpeg',
    '/images/slider/slider-1.jpg',
    '/images/slider/slider-2.jpg',
    '/images/slider/slider-3.jpg',
    '/images/portfolio/1.png',
    '/images/portfolio/2.png',
    '/images/portfolio/3.png',
    '/images/portfolio/4.png',
    '/images/portfolio/5.png',
    '/images/portfolio/6.png'
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function(response) {
                if (response) {
                    console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                }

                console.log(
                    "ServiceWorker: Memuat aset dari server: ",
                    event.request.url
                );
                return fetch(event.request);
            })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

