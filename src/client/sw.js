importScripts('/cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('insruction_read.js').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/styles/main.css',
       '/../instruction_read.js'
     ]);
   })
 );
});



    self.addEventListener('fetch', function(event) {

        console.log(event.request.url);
        
        event.respondWith(
        
        caches.match(event.request).then(function(response) {
        
        return response || fetch(event.request);
        
        })
        
        );
        
        });    