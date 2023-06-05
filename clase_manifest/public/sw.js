self.addEventListener('install', function(event) {
    self.skipWaiting();
    console.log('SW: Instalado');
});

self.addEventListener('activate', function(event) {
    console.log('SW: Activado');

});

self.addEventListener('beforeinstallprompt', function(event) {
    console.log('SW: beforeinstallprompt');
    event.userChoice.then(function(choiceResult) {
        console.log(choiceResult.outcome);
        if(choiceResult.outcome == 'dismissed') {
            console.log('El usuario canceló la instalación');
        } else {
            console.log('El usuario aceptó la instalación');
        }
    });
});

self.addEventListener('fetch', function(event) {

});