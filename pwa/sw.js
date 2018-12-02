// 每次修改版本或者页面内容，需同时更改cacheName
var cacheName = "ssfs1";

var CURRENT_CACHES = {
  prefetch: "prefetch-cache-v" + cacheName
};

// 缓存的静态资源相对路径
let arr = [
  "./index.html",
  "./sw/assets/css/style1.css",
  "./sw/assets/img/1_img.png",
  "./sw/assets/img/2_img.png",
  "./sw/assets/img/3_img.png",
  "./sw/assets/img/2560 1440 b.png",
  "./sw/assets/img/5_img.png",
  "./sw/assets/img/news_banner_img.png",
  "./sw/assets/img/WeChat Image_201807121619171.jpg"
];
// install 过程缓存资源。
self.addEventListener("install", function(event) {
  var now = Date.now();
  var urlsToPrefetch = arr;
  event.waitUntil(
    caches
      .open(CURRENT_CACHES.prefetch)
      .then(function(cache) {
        // 访问资源并存入 cache
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
        // 等待所有的异步请求
        return Promise.all(cachePromises).then(function() {
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
  console.log("server work is activate");
  var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key) {
    return CURRENT_CACHES[key];
  });

  event.waitUntil(
    // 判断 cacheName 是否有变化，若有变化则相应删除对应的缓存
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

// 网络请求，有限选择 cache
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      console.log(response, 222);
      if (response) {
        return response;
      }

      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(function(fetchResponse) {
        if (!fetchResponse || fetchResponse.status !== 200) {
          return fetchResponse;
        }

        var responseToCache = fetchResponse.clone();

        caches.open(CURRENT_CACHES.prefetch).then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return fetchResponse;
      });
    })
  );
});
