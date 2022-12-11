import { build, files, version } from '$service-worker';
const CACHE = `cache-${version}`;
 
const ASSETS = [
  ...build, // the app itself
  ...files  // everything in `static`
];
 
self.addEventListener('install', (event) => {
  // Create a new cache and add all files to it
  async function addFilesToCache() {
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSETS);
  }

  event.waitUntil(addFilesToCache());
});

self.addEventListener('fetch', function(e) {

  // e.respondWidth Responds to the fetch event
  e.respondWith(

      // Check in cache for the request being made
      caches.match(e.request)
          .then(function(response) {

              // If the request is in the cache
              if ( response ) {
                  console.log("[ServiceWorker] Found in Cache", e.request.url, response);
                  // Return the cached version
                  return response;
              }

              // If the request is NOT in the cache, fetch and cache

              var requestClone = e.request.clone();
              return fetch(requestClone)
                  .then(function(response) {

                      if ( !response ) {
                          console.log("[ServiceWorker] No response from fetch ")
                          return response;
                      }

                      var responseClone = response.clone();

                      //  Open the cache
                      caches.open(cacheName).then(function(cache) {

                          // Put the fetched response in the cache
                          cache.put(e.request, responseClone);
                          console.log('[ServiceWorker] New Data Cached', e.request.url);

                          // Return the response
                          return response;

                      }); // end caches.open
                      // returns the fresh response (not cached..)
                      return response;

                  })
                  .catch(function(err) {
                      console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
                  });


          }) // end caches.match(e.request)
          .catch(function(e){
              // this is - if we still dont have this in the cache !!!
              console.log("[ServiceWorker] ERROR WITH THIS MATCH !!!",e, arguments)
          })// enf of caches.match
  ); // end e.respondWith
});