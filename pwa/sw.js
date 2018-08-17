'use strict';

importScripts('./sw-toolbox.js');
toolbox.options = {
  cache: {
    name: 'sw-toolbox-cache'
  }
}
toolbox.precache(
  [
    "./index2.html",
    "./sw/assets/css/style1.css",
    "./sw/assets/img/1_img.png"
  ]
);

toolbox.router.get('./index2.html', toolbox.networkFirst);

toolbox.router.get('./sw/assets/img/*', toolbox.cacheFirst);

toolbox.router.get('./*', toolbox.fastest, {
  networkTimeoutSeconds: 5
});
