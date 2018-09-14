var cacheName = '10001'
var CURRENT_CACHES = {
  prefetch: 'prefetch-cache-v' + cacheName
};
let arr = [
  './index.html',
  './sw/assets/css/style1.css',
  './sw/assets/img/1_img.png',
  './sw/assets/img/2_img.png',
  './sw/assets/img/3_img.png',
  './sw/assets/img/2560 1440 b.png',
  './sw/assets/img/5_img.png',
  './sw/assets/img/news_banner_img.png',
  './sw/assets/img/WeChat Image_201807121619171.jpg',
]
// Cache our known resources during install
self.addEventListener("install", function(event) {
  var now = Date.now();
  var urlsToPrefetch = arr
  event.waitUntil(
    caches
      .open(CURRENT_CACHES.prefetch)
      .then(function(cache) {
        var cachePromises = urlsToPrefetch.map(function(urlToPrefetch) {
          var url = new URL(urlToPrefetch, location.href);
          url.search += (url.search ? "&" : "?") + "cache-bust=" + now;
          var request = new Request(url, { mode: "no-cors" });
          return fetch(request)
            .then(function(response) {
              if (response.status >= 400) {
                throw new Error(
                  "request for " +
                    urlToPrefetch +
                    " failed with status " +
                    response.statusText
                );
              }

              // Use the original URL without the cache-busting parameter as the key for cache.put().
              return cache.put(urlToPrefetch, response);
            })
            .catch(function(error) {
              console.error(
                "Not caching " + urlToPrefetch + " due to " + error
              );
            });
        });

        return Promise.all(cachePromises).then(function() {
          // console.log('Pre-fetching complete.');
          // 立即变为激活状态
          self.skipWaiting();
        });
      })
      .catch(function(error) {
        console.error("Pre-fetching failed:", error);
      })
  );
});

self.addEventListener("activate", function(event) {
  var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key) {
    return CURRENT_CACHES[key];
  });

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (expectedCacheNames.indexOf(cacheName) === -1) {
            // If this cache name isn't present in the array of "expected" cache names, then delete it.
            console.log("Deleting out of date cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      ).then(() => {
        // 接管当前页面的控制，旧的work会被注销
        self.clients.claim();
      });
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    // caches.match() will look for a cache entry in all of the caches available to the service worker.
    // It's an alternative to first opening a specific named cache and then matching on that.
    caches.match(event.request).then(function(response) {
      if (response) return response;

      // event.request will always have the proper mode set ('cors, 'no-cors', etc.) so we don't
      // have to hardcode 'no-cors' like we do when fetch()ing in the install handler.
      return fetch(event.request)
        .then(function(response) {
          // console.log('Response from network is:', response);
          return response;
        })
        .catch(function(error) {
          // This catch() will handle exceptions thrown from the fetch() operation.
          // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
          // It will return a normal response object that has the appropriate error code set.
          // console.error('Fetching failed:', error);
          throw error;
        });
    })
  );
});