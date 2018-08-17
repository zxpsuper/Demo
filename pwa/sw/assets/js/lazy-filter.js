const filter = {
  progressive(listener, options) {
    if (listener.el.getAttribute("imgtype") === "0") {
      listener.el.setAttribute("lazy-progressive", "true");
      listener.loading = require("../img/lazy-load/1_img.png");
    } else if (listener.el.getAttribute("imgtype") === "1") {
      listener.el.setAttribute("lazy-progressive", "true");
      listener.loading = require("../img/lazy-load/2_img.png");
    } else if (listener.el.getAttribute("imgtype") === "2") {
      listener.el.setAttribute("lazy-progressive", "true");
      listener.loading = require("../img/lazy-load/3_img.png");
    } else if (listener.el.getAttribute("imgtype") === "3") {
      listener.el.setAttribute("lazy-progressive", "true");
      listener.loading = require("../img/lazy-load/4_img.png");
    } else if (listener.el.getAttribute("imgtype") === "4") {
      listener.el.setAttribute("lazy-progressive", "true");
      listener.loading = require("../img/lazy-load/5_img.png");
    } else if (listener.el.getAttribute("imgtype") === "5") {
      listener.el.setAttribute("lazy-progressive", "true");
      listener.loading = require("../img/lazy-load/6_img.png");
    } else {
      listener.el.setAttribute("lazy-progressive", "true");
      listener.loading = require("../img/lazy-load/6_img.png");
    }
  }
};
export default filter