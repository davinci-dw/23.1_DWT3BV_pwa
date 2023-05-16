self.addEventListener('install', function(event) {
    self.skipWaiting();
    console.log('(SW) - SW instalado');
});

self.addEventListener('activate', function(event) {
    console.log('(SW) - SW activado');
});

self.addEventListener('fetch', function(event) {
    console.log('(SW) - SW capturó un fetch');
    /*event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );*/
});

self.addEventListener('beforeinstallprompt', function(event) {
    console.log('(SW) - SW capturó un beforeinstallprompt');
    event.preventDefault();
    return false;
});