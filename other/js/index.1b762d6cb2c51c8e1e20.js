/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "TMxE");
/******/ })
/************************************************************************/
/******/ ({

/***/ "9tPo":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "Al62":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: isM3U8, isMP4, formatTime, pad, isUndefined, findElPosition, requestFullscreen, exitFullscreen, fullscreen, parseUrlParam */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isM3U8", function() { return isM3U8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMP4", function() { return isMP4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatTime", function() { return formatTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pad", function() { return pad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUndefined", function() { return isUndefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findElPosition", function() { return findElPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestFullscreen", function() { return requestFullscreen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exitFullscreen", function() { return exitFullscreen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fullscreen", function() { return fullscreen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseUrlParam", function() { return parseUrlParam; });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * 判断是否为m3u8
 * @param {string} url 
 */
function isM3U8(url) {
  if (typeof url !== 'string') {
    throw new Error('The video url should be string type');
  }

  return /\.m3u8$/.test(url);
}
/**
 * 判断是否为mp4
 * @param {string} url 
 */

function isMP4(url) {
  if (typeof url !== 'string') {
    throw new Error('The video url should be string type');
  }

  url = url.toLowerCase();
  return /\.mp4$/.test(url);
}
/**
 * 格式化时间为分钟形式00:00
 * @param {number} time 
 */

function formatTime(time) {
  time = time < 0 ? 0 : time;
  var s = pad(Math.floor(time % 60));
  var m = pad(Math.floor(time / 60));
  return "".concat(m, ":").concat(s);
}
function pad(num, n) {
  n = isUndefined(n) ? 2 : +n;
  num = String(num);

  while (num.length < n) {
    num = '0' + num;
  }

  return num;
}
/**
 * 是否为undefinded
 * @param {any} obj 
 */

function isUndefined(obj) {
  return void 0 === obj;
}
function findElPosition(el) {
  var box;

  if (el.getBoundingClientRect && el.parentNode) {
    box = el.getBoundingClientRect();
  }

  if (!box) {
    return {
      left: 0,
      top: 0
    };
  }

  var docEl = document.documentElement;
  var body = document.body;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;
  var scrollLeft = window.pageXOffset || body.scrollLeft;
  var left = box.left + scrollLeft - clientLeft;
  var clientTop = docEl.clientTop || body.clientTop || 0;
  var scrollTop = window.pageYOffset || body.scrollTop;
  var top = box.top + scrollTop - clientTop; // Android sometimes returns slightly off decimal values, so need to round

  return {
    left: Math.round(left),
    top: Math.round(top)
  };
}
/**
 * 全屏
 * @param {dom} elem 
 */

function requestFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullScreen) {
    // 对 Chrome 特殊处理，
    // 参数 Element.ALLOW_KEYBOARD_INPUT 使全屏状态中可以键盘输入。
    if (window.navigator.userAgent.toUpperCase().indexOf('CHROME') >= 0) {
      elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    } // Safari 浏览器中，如果方法内有参数，则 Fullscreen 功能不可用。
    else {
        elem.webkitRequestFullScreen();
      }
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  }
}
/**
 * 取消全屏
 */

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  }
}
/**
 * 是否全屏
 */

function fullscreen() {
  return document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || false;
}
/**
 * 解析urL中的query
 * @param {string} url 
 */

function parseUrlParam(url) {
  var paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来

  var paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中

  var paramsObj = {}; // 将 params 存到对象中

  paramsArr.forEach(function (param) {
    if (/=/.test(param)) {
      // 处理有 value 的参数
      var _param$split = param.split('='),
          _param$split2 = _slicedToArray(_param$split, 2),
          key = _param$split2[0],
          val = _param$split2[1]; // 分割 key 和 value


      val = decodeURIComponent(val); // 解码

      val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字

      if (paramsObj.key) {
        // 如果对象有 key，则添加一个值
        paramsObj[key] = [].concat(paramsObj[key], val);
      } else {
        // 如果对象没有这个 key，创建 key 并设置值
        paramsObj[key] = val;
      }
    } else {
      // 处理没有 value 的参数
      paramsObj[param] = true;
    }
  });
  return paramsObj;
}

/***/ }),

/***/ "DF0S":
/*!***************************!*\
  !*** ./src/fullscreen.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// 重写播放器的全屏／取消全屏方法，重新指定全屏的元素（而不只是播放器本身）
// https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
var FullscreenApi = {}; // browser API methods

var apiMap = [['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'], // WebKit
['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'], // Old WebKit (Safari 5.1)
['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'], // Mozilla
['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'], // Microsoft
['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']];
var specApi = apiMap[0];
var browserApi; // determine the supported set of functions

for (var i = 0; i < apiMap.length; i++) {
  // check for exitFullscreen function
  if (apiMap[i][1] in document) {
    browserApi = apiMap[i];
    break;
  }
} // map the browser API names to the spec API names


if (browserApi) {
  for (var _i = 0; _i < browserApi.length; _i++) {
    FullscreenApi[specApi[_i]] = browserApi[_i];
  }
}

/* harmony default export */ __webpack_exports__["default"] = (FullscreenApi);

/***/ }),

/***/ "I1BE":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "ILuB":
/*!**********************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/dist/cjs.js!./src/sass/index.scss ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "I1BE")(false);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n@font-face {\n  font-family: \"iconfont\";\n  /* project id 2022170 */\n  src: url(\"//at.alicdn.com/t/font_2022170_pk8nf8f884m.eot\");\n  src: url(\"//at.alicdn.com/t/font_2022170_pk8nf8f884m.eot?#iefix\") format(\"embedded-opentype\"), url(\"//at.alicdn.com/t/font_2022170_pk8nf8f884m.woff2\") format(\"woff2\"), url(\"//at.alicdn.com/t/font_2022170_pk8nf8f884m.woff\") format(\"woff\"), url(\"//at.alicdn.com/t/font_2022170_pk8nf8f884m.ttf\") format(\"truetype\"), url(\"//at.alicdn.com/t/font_2022170_pk8nf8f884m.svg#iconfont\") format(\"svg\");\n}\nvideo::-webkit-media-controls {\n  display: none !important;\n}\n\n/*video默认全屏按钮*/\nvideo::-webkit-media-controls-fullscreen-button {\n  display: none !important;\n}\n\n/*video默认aduio音量按钮*/\nvideo::-webkit-media-controls-mute-button {\n  display: none !important;\n}\n\n/*video默认setting按钮*/\nvideo::-internal-media-controls-overflow-button {\n  display: none !important;\n}\n\nvideo::-webkit-media-controls-enclosure {\n  overflow: hidden;\n}\n\nvideo::-webkit-media-controls-panel {\n  width: calc(100% + 30px);\n}\n\n/*腾讯云点播禁用firefox全屏、设置按钮*/\n.trump-button[sub-component=fullscreen_btn],\n.trump-button[now=fullscreen] {\n  display: none !important;\n}\n\n.trump-button[sub-component=setting] {\n  display: none !important;\n}\n\n/*禁用video的controls（要慎重！不要轻易隐藏掉，会导致点击视频不能播放）*/\nvideo::-webkit-media-controls {\n  display: none !important;\n}\n\n.vp-container {\n  background-color: #000;\n  position: relative;\n  overflow: hidden;\n  color: #fff;\n}\n.vp-container-center-button {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  font-family: \"iconfont\";\n  font-size: 60px;\n}\n.vp-container-pause-button {\n  transform: translate(-50%, -50%);\n  border-radius: 50%;\n  background-color: #171a29;\n  padding: 10px 13px;\n  cursor: pointer;\n}\n.vp-container-loading-button {\n  display: none;\n  text-align: center;\n  width: 66px;\n  margin-top: -33px;\n  margin-left: -33px;\n  animation-name: rotate-the-sun;\n  animation-duration: 0.8s;\n  animation-iteration-count: infinite;\n  animation-timing-function: linear;\n}\n\n.vp-video-playing .vp-container-pause-button,\n.vp-video-loadstart .vp-container-pause-button {\n  display: none !important;\n}\n\n.vp-video-loadstart .vp-container-loading-button {\n  display: block;\n}\n\n.vp-video {\n  width: 100%;\n  height: 100%;\n}\n\n.vp-control-bar {\n  width: 100%;\n  height: 50px;\n  position: absolute;\n  bottom: -50px;\n  transition: all 0.3s;\n  display: flex;\n  background-color: #171a29;\n  font-family: \"iconfont\";\n}\n.vp-control-bar_playbtn {\n  width: 50px;\n  height: 50px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 30px;\n}\n.vp-control-bar_playbtn::before {\n  content: \"\\E607\";\n  font-family: \"iconfont\";\n  cursor: pointer;\n}\n.vp-control-bar_timegroup {\n  display: flex;\n  height: 50px;\n  font-size: 14px;\n  align-items: center;\n}\n.vp-control-bar_progress {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  padding: 0 10px 0 20px;\n}\n.vp-control-bar_progress_inner {\n  flex: 1;\n  height: 6px;\n  border-radius: 6px;\n  background-color: #434861;\n  cursor: pointer;\n  position: relative;\n}\n.vp-control-bar_progress_inner .vp-progress-slide {\n  position: absolute;\n  left: 0;\n  background-color: #00c55d;\n  height: 6px;\n  border-radius: 6px;\n}\n.vp-control-bar_progress_inner .vp-progress-slide::after {\n  content: \"\\E60B\";\n  position: absolute;\n  top: -5px;\n  right: -8px;\n}\n.vp-control-bar_full-screen-btn {\n  width: 50px;\n  height: 50px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 30px;\n}\n.vp-control-bar_full-screen-btn::after {\n  content: \"\\E602\";\n  font-family: \"iconfont\";\n  cursor: pointer;\n  font-size: 22px;\n}\n\n.vp-container-over .vp-control-bar {\n  bottom: 0;\n  left: 0;\n}\n\n.vp-video-playing .vp-control-bar_playbtn::before {\n  content: \"\\E606\";\n}\n\n.vp-container-full-screen .vp-control-bar_full-screen-btn::after {\n  content: \"\\E603\";\n}\n\n@keyframes rotate-the-sun {\n  from {\n    transform: rotate(0);\n  }\n  to {\n    transform: rotate(359deg);\n  }\n}", ""]);

// exports


/***/ }),

/***/ "TMxE":
/*!*****************************!*\
  !*** ./src/index-server.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "tjUo");
/* harmony import */ var _sass_index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sass/index.scss */ "hcPW");
/* harmony import */ var _sass_index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_sass_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "Al62");




window.onload = function () {
  console.log(location.href);
  var url = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["parseUrlParam"])(location.href).url;

  if (!url) {
    alert('url不合法');
  } else {
    new _index__WEBPACK_IMPORTED_MODULE_0__["default"]({
      el: document.getElementById('video'),
      // url: 'http://video.xiaojiaoyu100.com/890821e2d2184679a36a778aca3d98c7/e2ace12bb57b40c899a836192b7581d0-07b6c6a558f7e3979366d8dfa57bf7b4-fd.mp4'
      // url: 'http://iqiyi.cdn9-okzy.com/20200820/14254_728b13a0/index.m3u8'
      url: decodeURIComponent(url)
    });
  }
};

/***/ }),

/***/ "aET+":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "9tPo");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "hcPW":
/*!*****************************!*\
  !*** ./src/sass/index.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/sass-loader/dist/cjs.js!./index.scss */ "ILuB");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "aET+")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "lKqa":
/*!****************************!*\
  !*** ./src/eventManage.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventManage; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "Al62");
/* harmony import */ var _fullscreen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fullscreen */ "DF0S");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var supportsFullscreen = _fullscreen__WEBPACK_IMPORTED_MODULE_1__["default"].requestFullscreen;
console.log(_fullscreen__WEBPACK_IMPORTED_MODULE_1__["default"]);

var EventManage = /*#__PURE__*/function () {
  function EventManage(instance) {
    _classCallCheck(this, EventManage);

    this.instance = instance;
    this.fullScreen = false;
    this.init();
  }

  _createClass(EventManage, [{
    key: "init",
    value: function init() {
      var _this = this;

      var instance = this.instance,
          ControlBar = this.instance.ControlBar;
      this.instance.$el.addEventListener('click', function () {
        _this.instance.toggle();
      }, false);
      this.instance.$el.addEventListener('mousemove', function () {
        _this.instance._onContainerOver();
      }, false); // 进度条控制

      var progress = document.querySelector('.vp-control-bar_progress_inner'),
          slide = document.querySelector('.vp-progress-slide');
      progress.addEventListener('mousedown', function (event) {
        instance.$el.classList.add('vp-video-loadstart');
        var left = event.pageX - Object(_utils__WEBPACK_IMPORTED_MODULE_0__["findElPosition"])(progress).left;
        var progressWidth = progress.offsetWidth;
        var percent = left / progressWidth * 100;
        slide.setAttribute('style', "width: ".concat(percent, "%"));
        var duration = instance.duration();
        var currentTime = duration * percent / 100;
        instance.currentTime(currentTime);
        ControlBar.setTime(currentTime, duration);
      });
      var fullScreenBtn = document.querySelector('.vp-control-bar_full-screen-btn');
      fullScreenBtn.addEventListener('click', function (event) {
        event.stopPropagation();

        if (_this.fullScreen) {
          Object(_utils__WEBPACK_IMPORTED_MODULE_0__["exitFullscreen"])();
        } else {
          Object(_utils__WEBPACK_IMPORTED_MODULE_0__["requestFullscreen"])(instance.$el);
        }
      });
      document.addEventListener(_fullscreen__WEBPACK_IMPORTED_MODULE_1__["default"]['fullscreenchange'], function () {
        var isFullscreen = !!document[_fullscreen__WEBPACK_IMPORTED_MODULE_1__["default"]['fullscreenElement']];
        console.log('fullscreenchange');

        if (isFullscreen) {
          _this.fullScreen = true;
          instance.$el.classList.add('vp-container-full-screen');
        } else {
          _this.fullScreen = false;
          instance.$el.classList.remove('vp-container-full-screen');
        }
      }, false);
      document.getElementById('video-player').addEventListener('x5videoexitfullscreen', function () {
        _this.fullScreen = false;
        instance.$el.classList.remove('vp-container-full-screen');
      });
      document.getElementById('video-player').addEventListener('webkitendfullscreen', function () {
        _this.fullScreen = false;
        instance.$el.classList.remove('vp-container-full-screen');
      });
    }
  }]);

  return EventManage;
}();



/***/ }),

/***/ "pyml":
/*!***************************!*\
  !*** ./src/ControlBar.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "Al62");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var ControlBar = /*#__PURE__*/function () {
  function ControlBar() {
    _classCallCheck(this, ControlBar);

    this.el = document.createElement('div');
    this.el.className = 'vp-control-bar';
    this.createPlayBtn();
    this.createTimeGroup();
    this.createProgress();
    this.createFullScreenBtn();
  }

  _createClass(ControlBar, [{
    key: "createPlayBtn",
    value: function createPlayBtn() {
      var dom = document.createElement('span');
      dom.className = 'vp-control-bar_playbtn';
      this.el.appendChild(dom);
    }
  }, {
    key: "createTimeGroup",
    value: function createTimeGroup() {
      var dom = document.createElement('span');
      dom.className = 'vp-control-bar_timegroup';
      dom.innerHTML = '<span>0:00</span>&nbsp;/&nbsp;<span class="vp-control-bar_timegroup_duration">0:00</span>';
      this.el.appendChild(dom);
      dom.addEventListener('click', function (event) {
        event.stopPropagation();
      });
    }
  }, {
    key: "createFullScreenBtn",
    value: function createFullScreenBtn() {
      var dom = document.createElement('span');
      dom.className = 'vp-control-bar_full-screen-btn';
      this.el.appendChild(dom);
    }
  }, {
    key: "createProgress",
    value: function createProgress() {
      var dom = document.createElement('span');
      dom.className = 'vp-control-bar_progress';
      dom.innerHTML = '<div class="vp-control-bar_progress_inner"><div class="vp-progress-loaded"></div><div class="vp-progress-slide"></div></div>';
      this.el.appendChild(dom);
      dom.addEventListener('click', function (event) {
        event.stopPropagation();
      });
    }
  }, {
    key: "setTime",
    value: function setTime(current, duration) {
      document.querySelector('.vp-control-bar_timegroup').innerHTML = "<span>".concat(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["formatTime"])(current), "</span>&nbsp;/&nbsp;<span class=\"vp-control-bar_timegroup_duration\">").concat(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["formatTime"])(duration), "</span>");
    }
  }]);

  return ControlBar;
}();

/* harmony default export */ __webpack_exports__["default"] = (new ControlBar());

/***/ }),

/***/ "rwzW":
/*!**********************!*\
  !*** ./src/video.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Video; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "Al62");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Video = /*#__PURE__*/function () {
  function Video(options) {
    _classCallCheck(this, Video);

    this.video = document.createElement('video');
    this.video.setAttribute('crossorigin', 'anonymous');
    this.video.setAttribute('id', 'video-player');
    this.video.setAttribute('playsinline', 'true');
    this.video.setAttribute('x5-video-player-fullscreen', 'true');
    this.video.setAttribute('x5-video-player-type', 'h5');
    this.video.className = 'vp-video';
    if (options.url) this._setUrl(options.url);

    this._addEvent();
  }

  _createClass(Video, [{
    key: "_setUrl",
    value: function _setUrl(url) {
      if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isM3U8"])(url)) {
        if (window.Hls && window.Hls.isSupported()) {
          this.reloading = true;
          this.hls = new window.Hls();
          this.hls.loadSource(url);
          this.hls.attachMedia(this.video);
        } else {
          throw new Error('Please load the hls.js before video init');
        }
      } else if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isMP4"])(url)) {
        this.video.src = url;
      } else {
        throw new Error('UnSupport video url');
      }
    }
  }, {
    key: "currentTime",
    value: function currentTime(time) {
      if (!time && time !== 0) {
        return this.video && this.video.currentTime || 0;
      } else {
        if (typeof time !== 'number') {
          throw new Error('currentTime should be number');
        }

        this.video.currentTime = time;
      }
    }
  }, {
    key: "duration",
    value: function duration() {
      return this.video && this.video.duration || 0;
    }
  }, {
    key: "play",
    value: function play() {
      this.video && this.video.play();
    }
  }, {
    key: "pause",
    value: function pause() {
      this.video && this.video.pause();
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.video.paused === true) this.play();else if (this.video.paused === false) this.pause();
    }
  }, {
    key: "_addEvent",
    value: function _addEvent() {
      var _this = this;

      var eventArr = ['play', 'pause', 'loadstart', 'loadeddata', 'progress', 'canplay', 'timeupdate', 'ended'];
      eventArr.forEach(function (item) {
        _this.video.addEventListener(item, function () {
          _this['_on' + item]();
        });
      });
    }
  }, {
    key: "_onplay",
    value: function _onplay() {}
  }, {
    key: "_onpause",
    value: function _onpause() {}
  }, {
    key: "_onloadstart",
    value: function _onloadstart() {}
  }, {
    key: "_onloadeddata",
    value: function _onloadeddata() {}
  }, {
    key: "_onprogress",
    value: function _onprogress() {}
  }, {
    key: "_oncanplay",
    value: function _oncanplay() {}
  }, {
    key: "_ontimeupdate",
    value: function _ontimeupdate() {}
  }, {
    key: "_onended",
    value: function _onended() {}
  }]);

  return Video;
}();



/***/ }),

/***/ "tjUo":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return VideoPlayer; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "Al62");
/* harmony import */ var _video__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./video */ "rwzW");
/* harmony import */ var _ControlBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ControlBar */ "pyml");
/* harmony import */ var _eventManage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventManage */ "lKqa");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






var VideoPlayer = /*#__PURE__*/function (_Video) {
  _inherits(VideoPlayer, _Video);

  var _super = _createSuper(VideoPlayer);

  function VideoPlayer(options) {
    var _this;

    _classCallCheck(this, VideoPlayer);

    _this = _super.call(this, options);
    _this.ControlBar = _ControlBar__WEBPACK_IMPORTED_MODULE_2__["default"]; // 控制台

    _this.$el = options.el || document.body;

    _this.$el.classList.add('vp-container');

    _this.$el.appendChild(_this.video);

    _this.$el.appendChild(createPauseButton());

    _this.$el.appendChild(createLoadingButton());

    _this.$el.appendChild(_ControlBar__WEBPACK_IMPORTED_MODULE_2__["default"].el);

    _this.eventManage = new _eventManage__WEBPACK_IMPORTED_MODULE_3__["default"](_assertThisInitialized(_this));
    return _this;
  }

  _createClass(VideoPlayer, [{
    key: "_onContainerOver",
    value: function _onContainerOver(event) {
      var _this2 = this;

      clearTimeout(this._timer);
      this.$el.classList.add('vp-container-over');
      this._timer = setTimeout(function () {
        _this2.$el.classList.remove('vp-container-over');
      }, 3000);
    }
  }, {
    key: "_onplay",
    value: function _onplay() {
      this.$el.classList.add('vp-video-playing');
    }
  }, {
    key: "_onpause",
    value: function _onpause() {
      this.$el.classList.remove('vp-video-playing');
    }
  }, {
    key: "_onloadstart",
    value: function _onloadstart() {
      this.$el.classList.add('vp-video-loadstart');
    }
  }, {
    key: "_onloadeddata",
    value: function _onloadeddata() {
      this.$el.classList.remove('vp-video-loadstart');
    }
  }, {
    key: "_ontimeupdate",
    value: function _ontimeupdate() {
      this.ControlBar.setTime(this.currentTime(), this.duration());
    }
  }, {
    key: "_oncanplay",
    value: function _oncanplay() {
      this.$el.classList.remove('vp-video-loadstart');
    }
  }]);

  return VideoPlayer;
}(_video__WEBPACK_IMPORTED_MODULE_1__["default"]);



function createPauseButton() {
  var el = document.createElement('span');
  el.className = 'vp-container-center-button vp-container-pause-button';
  el.innerHTML = '&#xe607;';
  return el;
}

function createLoadingButton() {
  var el = document.createElement('span');
  el.className = 'vp-container-center-button vp-container-loading-button';
  el.innerHTML = '&#xe60a;';
  return el;
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Z1bGxzY3JlZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL3NyYy9zYXNzL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LXNlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Nhc3MvaW5kZXguc2Nzcz9lODg1Iiwid2VicGFjazovLy8uL3NyYy9ldmVudE1hbmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29udHJvbEJhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlkZW8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImlzTTNVOCIsInVybCIsIkVycm9yIiwidGVzdCIsImlzTVA0IiwidG9Mb3dlckNhc2UiLCJmb3JtYXRUaW1lIiwidGltZSIsInMiLCJwYWQiLCJNYXRoIiwiZmxvb3IiLCJtIiwibnVtIiwibiIsImlzVW5kZWZpbmVkIiwiU3RyaW5nIiwibGVuZ3RoIiwib2JqIiwiZmluZEVsUG9zaXRpb24iLCJlbCIsImJveCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInBhcmVudE5vZGUiLCJsZWZ0IiwidG9wIiwiZG9jRWwiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImJvZHkiLCJjbGllbnRMZWZ0Iiwic2Nyb2xsTGVmdCIsIndpbmRvdyIsInBhZ2VYT2Zmc2V0IiwiY2xpZW50VG9wIiwic2Nyb2xsVG9wIiwicGFnZVlPZmZzZXQiLCJyb3VuZCIsInJlcXVlc3RGdWxsc2NyZWVuIiwiZWxlbSIsIndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidG9VcHBlckNhc2UiLCJpbmRleE9mIiwiRWxlbWVudCIsIkFMTE9XX0tFWUJPQVJEX0lOUFVUIiwibW96UmVxdWVzdEZ1bGxTY3JlZW4iLCJleGl0RnVsbHNjcmVlbiIsIndlYmtpdENhbmNlbEZ1bGxTY3JlZW4iLCJtb3pDYW5jZWxGdWxsU2NyZWVuIiwiZnVsbHNjcmVlbiIsIndlYmtpdElzRnVsbFNjcmVlbiIsIm1vekZ1bGxTY3JlZW4iLCJwYXJzZVVybFBhcmFtIiwicGFyYW1zU3RyIiwiZXhlYyIsInBhcmFtc0FyciIsInNwbGl0IiwicGFyYW1zT2JqIiwiZm9yRWFjaCIsInBhcmFtIiwia2V5IiwidmFsIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicGFyc2VGbG9hdCIsImNvbmNhdCIsIkZ1bGxzY3JlZW5BcGkiLCJhcGlNYXAiLCJzcGVjQXBpIiwiYnJvd3NlckFwaSIsImkiLCJvbmxvYWQiLCJjb25zb2xlIiwibG9nIiwibG9jYXRpb24iLCJocmVmIiwiYWxlcnQiLCJWaWRlb1BsYXllciIsImdldEVsZW1lbnRCeUlkIiwic3VwcG9ydHNGdWxsc2NyZWVuIiwiRXZlbnRNYW5hZ2UiLCJpbnN0YW5jZSIsImZ1bGxTY3JlZW4iLCJpbml0IiwiQ29udHJvbEJhciIsIiRlbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0b2dnbGUiLCJfb25Db250YWluZXJPdmVyIiwicHJvZ3Jlc3MiLCJxdWVyeVNlbGVjdG9yIiwic2xpZGUiLCJldmVudCIsImNsYXNzTGlzdCIsImFkZCIsInBhZ2VYIiwicHJvZ3Jlc3NXaWR0aCIsIm9mZnNldFdpZHRoIiwicGVyY2VudCIsInNldEF0dHJpYnV0ZSIsImR1cmF0aW9uIiwiY3VycmVudFRpbWUiLCJzZXRUaW1lIiwiZnVsbFNjcmVlbkJ0biIsInN0b3BQcm9wYWdhdGlvbiIsImlzRnVsbHNjcmVlbiIsInJlbW92ZSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJjcmVhdGVQbGF5QnRuIiwiY3JlYXRlVGltZUdyb3VwIiwiY3JlYXRlUHJvZ3Jlc3MiLCJjcmVhdGVGdWxsU2NyZWVuQnRuIiwiZG9tIiwiYXBwZW5kQ2hpbGQiLCJpbm5lckhUTUwiLCJjdXJyZW50IiwiVmlkZW8iLCJvcHRpb25zIiwidmlkZW8iLCJfc2V0VXJsIiwiX2FkZEV2ZW50IiwiSGxzIiwiaXNTdXBwb3J0ZWQiLCJyZWxvYWRpbmciLCJobHMiLCJsb2FkU291cmNlIiwiYXR0YWNoTWVkaWEiLCJzcmMiLCJwbGF5IiwicGF1c2UiLCJwYXVzZWQiLCJldmVudEFyciIsIml0ZW0iLCJjcmVhdGVQYXVzZUJ1dHRvbiIsImNyZWF0ZUxvYWRpbmdCdXR0b24iLCJldmVudE1hbmFnZSIsImNsZWFyVGltZW91dCIsIl90aW1lciIsInNldFRpbWVvdXQiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNqRkE7QUFDQTtBQUNB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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBLEtBQUssS0FBd0MsRUFBRSxFQUU3Qzs7QUFFRixRQUFRLHNCQUFpQjtBQUN6Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7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Q2lGLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBVDtBQUNBeEYsSUFBRSxDQUFDeUYsU0FBSCxHQUFlLHdEQUFmO0FBQ0F6RixJQUFFLENBQUNnRyxTQUFILEdBQWUsVUFBZjtBQUNBLFNBQU9oRyxFQUFQO0FBQ0gsQyIsImZpbGUiOiJqcy9pbmRleC4xYjc2MmQ2Y2IyYzUxYzhlMWUyMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIlRNeEVcIik7XG4iLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcL3xcXHMqJCkvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcbiIsIi8qKlxuICog5Yik5pat5piv5ZCm5Li6bTN1OFxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTTNVOCh1cmwpIHtcbiAgICBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgdmlkZW8gdXJsIHNob3VsZCBiZSBzdHJpbmcgdHlwZScpXG4gICAgfVxuICAgIHJldHVybiAvXFwubTN1OCQvLnRlc3QodXJsKVxufVxuLyoqXG4gKiDliKTmlq3mmK/lkKbkuLptcDRcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc01QNCh1cmwpIHtcbiAgICBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgdmlkZW8gdXJsIHNob3VsZCBiZSBzdHJpbmcgdHlwZScpXG4gICAgfVxuICAgIHVybCA9IHVybC50b0xvd2VyQ2FzZSgpXG4gICAgcmV0dXJuIC9cXC5tcDQkLy50ZXN0KHVybClcbn1cbi8qKlxuICog5qC85byP5YyW5pe26Ze05Li65YiG6ZKf5b2i5byPMDA6MDBcbiAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIFxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0VGltZSh0aW1lKSB7XG4gICAgdGltZSA9IHRpbWUgPCAwID8gMCA6IHRpbWVcbiAgICBjb25zdCBzID0gcGFkKE1hdGguZmxvb3IodGltZSAlIDYwKSlcbiAgICBjb25zdCBtID0gcGFkKE1hdGguZmxvb3IodGltZSAvIDYwKSlcbiAgICByZXR1cm4gYCR7bX06JHtzfWBcbn1cbmV4cG9ydCBmdW5jdGlvbiBwYWQobnVtLCBuKSB7XG4gICAgbiA9IGlzVW5kZWZpbmVkKG4pID8gMiA6ICtuXG4gICAgbnVtID0gU3RyaW5nKG51bSlcbiAgICB3aGlsZSAobnVtLmxlbmd0aCA8IG4pIHtcbiAgICAgICAgbnVtID0gJzAnICsgbnVtXG4gICAgfVxuICAgIHJldHVybiBudW1cbn1cbi8qKlxuICog5piv5ZCm5Li6dW5kZWZpbmRlZFxuICogQHBhcmFtIHthbnl9IG9iaiBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVW5kZWZpbmVkKG9iaikge1xuICAgIHJldHVybiB2b2lkIDAgPT09IG9ialxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZEVsUG9zaXRpb24oZWwpIHtcbiAgICBsZXQgYm94XG5cbiAgICBpZiAoZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ICYmIGVsLnBhcmVudE5vZGUpIHtcbiAgICAgICAgYm94ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICB9XG5cbiAgICBpZiAoIWJveCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGRvY0VsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHlcblxuICAgIGNvbnN0IGNsaWVudExlZnQgPSBkb2NFbC5jbGllbnRMZWZ0IHx8IGJvZHkuY2xpZW50TGVmdCB8fCAwXG4gICAgY29uc3Qgc2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldCB8fCBib2R5LnNjcm9sbExlZnRcbiAgICBjb25zdCBsZWZ0ID0gYm94LmxlZnQgKyBzY3JvbGxMZWZ0IC0gY2xpZW50TGVmdFxuXG4gICAgY29uc3QgY2xpZW50VG9wID0gZG9jRWwuY2xpZW50VG9wIHx8IGJvZHkuY2xpZW50VG9wIHx8IDBcbiAgICBjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgYm9keS5zY3JvbGxUb3BcbiAgICBjb25zdCB0b3AgPSBib3gudG9wICsgc2Nyb2xsVG9wIC0gY2xpZW50VG9wXG5cbiAgICAvLyBBbmRyb2lkIHNvbWV0aW1lcyByZXR1cm5zIHNsaWdodGx5IG9mZiBkZWNpbWFsIHZhbHVlcywgc28gbmVlZCB0byByb3VuZFxuICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6IE1hdGgucm91bmQobGVmdCksXG4gICAgICAgIHRvcDogTWF0aC5yb3VuZCh0b3ApLFxuICAgIH1cbn1cbi8qKlxuICog5YWo5bGPXG4gKiBAcGFyYW0ge2RvbX0gZWxlbSBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3RGdWxsc2NyZWVuKGVsZW0pIHtcbiAgICBpZiAoZWxlbS5yZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICBlbGVtLnJlcXVlc3RGdWxsc2NyZWVuKClcbiAgICB9IGVsc2UgaWYgKGVsZW0ud2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgLy8g5a+5IENocm9tZSDnibnmrorlpITnkIbvvIxcbiAgICAgICAgLy8g5Y+C5pWwIEVsZW1lbnQuQUxMT1dfS0VZQk9BUkRfSU5QVVQg5L2/5YWo5bGP54q25oCB5Lit5Y+v5Lul6ZSu55uY6L6T5YWl44CCXG4gICAgICAgIGlmICh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b1VwcGVyQ2FzZSgpLmluZGV4T2YoJ0NIUk9NRScpID49IDApIHtcbiAgICAgICAgICAgIGVsZW0ud2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4oRWxlbWVudC5BTExPV19LRVlCT0FSRF9JTlBVVClcbiAgICAgICAgfVxuICAgICAgICAvLyBTYWZhcmkg5rWP6KeI5Zmo5Lit77yM5aaC5p6c5pa55rOV5YaF5pyJ5Y+C5pWw77yM5YiZIEZ1bGxzY3JlZW4g5Yqf6IO95LiN5Y+v55So44CCXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZWxlbS53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbigpXG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGVsZW0ubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgZWxlbS5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpXG4gICAgfVxufVxuXG4vKipcbiAqIOWPlua2iOWFqOWxj1xuICovXG5leHBvcnQgZnVuY3Rpb24gZXhpdEZ1bGxzY3JlZW4oKSB7XG4gICAgaWYgKGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgIGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKClcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LndlYmtpdENhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgZG9jdW1lbnQud2Via2l0Q2FuY2VsRnVsbFNjcmVlbigpXG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XG4gICAgICAgIGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKVxuICAgIH1cbn1cblxuLyoqXG4gKiDmmK/lkKblhajlsY9cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZ1bGxzY3JlZW4oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgZG9jdW1lbnQuZnVsbHNjcmVlbiB8fFxuICAgICAgICBkb2N1bWVudC53ZWJraXRJc0Z1bGxTY3JlZW4gfHxcbiAgICAgICAgZG9jdW1lbnQubW96RnVsbFNjcmVlbiB8fFxuICAgICAgICBmYWxzZVxuICAgIClcbn1cblxuLyoqXG4gKiDop6PmnpB1ckzkuK3nmoRxdWVyeVxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVXJsUGFyYW0odXJsKSB7XG4gICAgY29uc3QgcGFyYW1zU3RyID0gLy4rXFw/KC4rKSQvLmV4ZWModXJsKVsxXTsgLy8g5bCGID8g5ZCO6Z2i55qE5a2X56ym5Liy5Y+W5Ye65p2lXG4gICAgY29uc3QgcGFyYW1zQXJyID0gcGFyYW1zU3RyLnNwbGl0KCcmJyk7IC8vIOWwhuWtl+espuS4suS7pSAmIOWIhuWJsuWQjuWtmOWIsOaVsOe7hOS4rVxuICAgIGxldCBwYXJhbXNPYmogPSB7fTtcbiAgICAvLyDlsIYgcGFyYW1zIOWtmOWIsOWvueixoeS4rVxuICAgIHBhcmFtc0Fyci5mb3JFYWNoKHBhcmFtID0+IHtcbiAgICAgIGlmICgvPS8udGVzdChwYXJhbSkpIHtcbiAgICAgICAgLy8g5aSE55CG5pyJIHZhbHVlIOeahOWPguaVsFxuICAgICAgICBsZXQgW2tleSwgdmFsXSA9IHBhcmFtLnNwbGl0KCc9Jyk7IC8vIOWIhuWJsiBrZXkg5ZKMIHZhbHVlXG4gICAgICAgIHZhbCA9IGRlY29kZVVSSUNvbXBvbmVudCh2YWwpOyAvLyDop6PnoIFcbiAgICAgICAgdmFsID0gL15cXGQrJC8udGVzdCh2YWwpID8gcGFyc2VGbG9hdCh2YWwpIDogdmFsOyAvLyDliKTmlq3mmK/lkKbovazkuLrmlbDlrZdcbiAgXG4gICAgICAgIGlmIChwYXJhbXNPYmoua2V5KSB7XG4gICAgICAgICAgLy8g5aaC5p6c5a+56LGh5pyJIGtlee+8jOWImea3u+WKoOS4gOS4quWAvFxuICAgICAgICAgIHBhcmFtc09ialtrZXldID0gW10uY29uY2F0KHBhcmFtc09ialtrZXldLCB2YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIOWmguaenOWvueixoeayoeaciei/meS4qiBrZXnvvIzliJvlu7oga2V5IOW5tuiuvue9ruWAvFxuICAgICAgICAgIHBhcmFtc09ialtrZXldID0gdmFsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDlpITnkIbmsqHmnIkgdmFsdWUg55qE5Y+C5pWwXG4gICAgICAgIHBhcmFtc09ialtwYXJhbV0gPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICBcbiAgICByZXR1cm4gcGFyYW1zT2JqO1xuICB9IiwiLy8g6YeN5YaZ5pKt5pS+5Zmo55qE5YWo5bGP77yP5Y+W5raI5YWo5bGP5pa55rOV77yM6YeN5paw5oyH5a6a5YWo5bGP55qE5YWD57Sg77yI6ICM5LiN5Y+q5piv5pKt5pS+5Zmo5pys6Lqr77yJXHJcblxyXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRnVsbHNjcmVlbl9BUElcclxuXHJcbmNvbnN0IEZ1bGxzY3JlZW5BcGkgPSB7fVxyXG5cclxuLy8gYnJvd3NlciBBUEkgbWV0aG9kc1xyXG5jb25zdCBhcGlNYXAgPSBbXHJcbiAgW1xyXG4gICAgJ3JlcXVlc3RGdWxsc2NyZWVuJyxcclxuICAgICdleGl0RnVsbHNjcmVlbicsXHJcbiAgICAnZnVsbHNjcmVlbkVsZW1lbnQnLFxyXG4gICAgJ2Z1bGxzY3JlZW5FbmFibGVkJyxcclxuICAgICdmdWxsc2NyZWVuY2hhbmdlJyxcclxuICAgICdmdWxsc2NyZWVuZXJyb3InXHJcbiAgXSxcclxuICAvLyBXZWJLaXRcclxuICBbXHJcbiAgICAnd2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4nLFxyXG4gICAgJ3dlYmtpdEV4aXRGdWxsc2NyZWVuJyxcclxuICAgICd3ZWJraXRGdWxsc2NyZWVuRWxlbWVudCcsXHJcbiAgICAnd2Via2l0RnVsbHNjcmVlbkVuYWJsZWQnLFxyXG4gICAgJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLFxyXG4gICAgJ3dlYmtpdGZ1bGxzY3JlZW5lcnJvcidcclxuICBdLFxyXG4gIC8vIE9sZCBXZWJLaXQgKFNhZmFyaSA1LjEpXHJcbiAgW1xyXG4gICAgJ3dlYmtpdFJlcXVlc3RGdWxsU2NyZWVuJyxcclxuICAgICd3ZWJraXRDYW5jZWxGdWxsU2NyZWVuJyxcclxuICAgICd3ZWJraXRDdXJyZW50RnVsbFNjcmVlbkVsZW1lbnQnLFxyXG4gICAgJ3dlYmtpdENhbmNlbEZ1bGxTY3JlZW4nLFxyXG4gICAgJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLFxyXG4gICAgJ3dlYmtpdGZ1bGxzY3JlZW5lcnJvcidcclxuICBdLFxyXG4gIC8vIE1vemlsbGFcclxuICBbXHJcbiAgICAnbW96UmVxdWVzdEZ1bGxTY3JlZW4nLFxyXG4gICAgJ21vekNhbmNlbEZ1bGxTY3JlZW4nLFxyXG4gICAgJ21vekZ1bGxTY3JlZW5FbGVtZW50JyxcclxuICAgICdtb3pGdWxsU2NyZWVuRW5hYmxlZCcsXHJcbiAgICAnbW96ZnVsbHNjcmVlbmNoYW5nZScsXHJcbiAgICAnbW96ZnVsbHNjcmVlbmVycm9yJ1xyXG4gIF0sXHJcbiAgLy8gTWljcm9zb2Z0XHJcbiAgW1xyXG4gICAgJ21zUmVxdWVzdEZ1bGxzY3JlZW4nLFxyXG4gICAgJ21zRXhpdEZ1bGxzY3JlZW4nLFxyXG4gICAgJ21zRnVsbHNjcmVlbkVsZW1lbnQnLFxyXG4gICAgJ21zRnVsbHNjcmVlbkVuYWJsZWQnLFxyXG4gICAgJ01TRnVsbHNjcmVlbkNoYW5nZScsXHJcbiAgICAnTVNGdWxsc2NyZWVuRXJyb3InXHJcbiAgXVxyXG5dXHJcblxyXG5jb25zdCBzcGVjQXBpID0gYXBpTWFwWzBdXHJcbmxldCBicm93c2VyQXBpXHJcblxyXG4vLyBkZXRlcm1pbmUgdGhlIHN1cHBvcnRlZCBzZXQgb2YgZnVuY3Rpb25zXHJcbmZvciAobGV0IGkgPSAwOyBpIDwgYXBpTWFwLmxlbmd0aDsgaSsrKSB7XHJcbiAgLy8gY2hlY2sgZm9yIGV4aXRGdWxsc2NyZWVuIGZ1bmN0aW9uXHJcbiAgaWYgKGFwaU1hcFtpXVsxXSBpbiBkb2N1bWVudCkge1xyXG4gICAgYnJvd3NlckFwaSA9IGFwaU1hcFtpXVxyXG4gICAgYnJlYWtcclxuICB9XHJcbn1cclxuXHJcbi8vIG1hcCB0aGUgYnJvd3NlciBBUEkgbmFtZXMgdG8gdGhlIHNwZWMgQVBJIG5hbWVzXHJcbmlmIChicm93c2VyQXBpKSB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBicm93c2VyQXBpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBGdWxsc2NyZWVuQXBpW3NwZWNBcGlbaV1dID0gYnJvd3NlckFwaVtpXVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRnVsbHNjcmVlbkFwaVxyXG4iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkBjaGFyc2V0IFxcXCJVVEYtOFxcXCI7XFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogXFxcImljb25mb250XFxcIjtcXG4gIC8qIHByb2plY3QgaWQgMjAyMjE3MCAqL1xcbiAgc3JjOiB1cmwoXFxcIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMjAyMjE3MF9wazhuZjhmODg0bS5lb3RcXFwiKTtcXG4gIHNyYzogdXJsKFxcXCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzIwMjIxNzBfcGs4bmY4Zjg4NG0uZW90PyNpZWZpeFxcXCIpIGZvcm1hdChcXFwiZW1iZWRkZWQtb3BlbnR5cGVcXFwiKSwgdXJsKFxcXCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzIwMjIxNzBfcGs4bmY4Zjg4NG0ud29mZjJcXFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcXFwiLy9hdC5hbGljZG4uY29tL3QvZm9udF8yMDIyMTcwX3BrOG5mOGY4ODRtLndvZmZcXFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKSwgdXJsKFxcXCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzIwMjIxNzBfcGs4bmY4Zjg4NG0udHRmXFxcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpLCB1cmwoXFxcIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMjAyMjE3MF9wazhuZjhmODg0bS5zdmcjaWNvbmZvbnRcXFwiKSBmb3JtYXQoXFxcInN2Z1xcXCIpO1xcbn1cXG52aWRlbzo6LXdlYmtpdC1tZWRpYS1jb250cm9scyB7XFxuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxufVxcblxcbi8qdmlkZW/pu5jorqTlhajlsY/mjInpkq4qL1xcbnZpZGVvOjotd2Via2l0LW1lZGlhLWNvbnRyb2xzLWZ1bGxzY3JlZW4tYnV0dG9uIHtcXG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG59XFxuXFxuLyp2aWRlb+m7mOiupGFkdWlv6Z+z6YeP5oyJ6ZKuKi9cXG52aWRlbzo6LXdlYmtpdC1tZWRpYS1jb250cm9scy1tdXRlLWJ1dHRvbiB7XFxuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxufVxcblxcbi8qdmlkZW/pu5jorqRzZXR0aW5n5oyJ6ZKuKi9cXG52aWRlbzo6LWludGVybmFsLW1lZGlhLWNvbnRyb2xzLW92ZXJmbG93LWJ1dHRvbiB7XFxuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxufVxcblxcbnZpZGVvOjotd2Via2l0LW1lZGlhLWNvbnRyb2xzLWVuY2xvc3VyZSB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG52aWRlbzo6LXdlYmtpdC1tZWRpYS1jb250cm9scy1wYW5lbCB7XFxuICB3aWR0aDogY2FsYygxMDAlICsgMzBweCk7XFxufVxcblxcbi8q6IW+6K6v5LqR54K55pKt56aB55SoZmlyZWZveOWFqOWxj+OAgeiuvue9ruaMiemSriovXFxuLnRydW1wLWJ1dHRvbltzdWItY29tcG9uZW50PWZ1bGxzY3JlZW5fYnRuXSxcXG4udHJ1bXAtYnV0dG9uW25vdz1mdWxsc2NyZWVuXSB7XFxuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxufVxcblxcbi50cnVtcC1idXR0b25bc3ViLWNvbXBvbmVudD1zZXR0aW5nXSB7XFxuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxufVxcblxcbi8q56aB55SodmlkZW/nmoRjb250cm9sc++8iOimgeaFjumHje+8geS4jeimgei9u+aYk+makOiXj+aOie+8jOS8muWvvOiHtOeCueWHu+inhumikeS4jeiDveaSreaUvu+8iSovXFxudmlkZW86Oi13ZWJraXQtbWVkaWEtY29udHJvbHMge1xcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xcbn1cXG5cXG4udnAtY29udGFpbmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgY29sb3I6ICNmZmY7XFxufVxcbi52cC1jb250YWluZXItY2VudGVyLWJ1dHRvbiB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiaWNvbmZvbnRcXFwiO1xcbiAgZm9udC1zaXplOiA2MHB4O1xcbn1cXG4udnAtY29udGFpbmVyLXBhdXNlLWJ1dHRvbiB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxNzFhMjk7XFxuICBwYWRkaW5nOiAxMHB4IDEzcHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi52cC1jb250YWluZXItbG9hZGluZy1idXR0b24ge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHdpZHRoOiA2NnB4O1xcbiAgbWFyZ2luLXRvcDogLTMzcHg7XFxuICBtYXJnaW4tbGVmdDogLTMzcHg7XFxuICBhbmltYXRpb24tbmFtZTogcm90YXRlLXRoZS1zdW47XFxuICBhbmltYXRpb24tZHVyYXRpb246IDAuOHM7XFxuICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcXG4gIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGxpbmVhcjtcXG59XFxuXFxuLnZwLXZpZGVvLXBsYXlpbmcgLnZwLWNvbnRhaW5lci1wYXVzZS1idXR0b24sXFxuLnZwLXZpZGVvLWxvYWRzdGFydCAudnAtY29udGFpbmVyLXBhdXNlLWJ1dHRvbiB7XFxuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxufVxcblxcbi52cC12aWRlby1sb2Fkc3RhcnQgLnZwLWNvbnRhaW5lci1sb2FkaW5nLWJ1dHRvbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLnZwLXZpZGVvIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4udnAtY29udHJvbC1iYXIge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDUwcHg7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3R0b206IC01MHB4O1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3M7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzE3MWEyOTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiaWNvbmZvbnRcXFwiO1xcbn1cXG4udnAtY29udHJvbC1iYXJfcGxheWJ0biB7XFxuICB3aWR0aDogNTBweDtcXG4gIGhlaWdodDogNTBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDMwcHg7XFxufVxcbi52cC1jb250cm9sLWJhcl9wbGF5YnRuOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFNjA3XFxcIjtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiaWNvbmZvbnRcXFwiO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4udnAtY29udHJvbC1iYXJfdGltZWdyb3VwIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBoZWlnaHQ6IDUwcHg7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG4udnAtY29udHJvbC1iYXJfcHJvZ3Jlc3Mge1xcbiAgZmxleDogMTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcGFkZGluZzogMCAxMHB4IDAgMjBweDtcXG59XFxuLnZwLWNvbnRyb2wtYmFyX3Byb2dyZXNzX2lubmVyIHtcXG4gIGZsZXg6IDE7XFxuICBoZWlnaHQ6IDZweDtcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0MzQ4NjE7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcbi52cC1jb250cm9sLWJhcl9wcm9ncmVzc19pbm5lciAudnAtcHJvZ3Jlc3Mtc2xpZGUge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMGM1NWQ7XFxuICBoZWlnaHQ6IDZweDtcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG59XFxuLnZwLWNvbnRyb2wtYmFyX3Byb2dyZXNzX2lubmVyIC52cC1wcm9ncmVzcy1zbGlkZTo6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXFxFNjBCXFxcIjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogLTVweDtcXG4gIHJpZ2h0OiAtOHB4O1xcbn1cXG4udnAtY29udHJvbC1iYXJfZnVsbC1zY3JlZW4tYnRuIHtcXG4gIHdpZHRoOiA1MHB4O1xcbiAgaGVpZ2h0OiA1MHB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMzBweDtcXG59XFxuLnZwLWNvbnRyb2wtYmFyX2Z1bGwtc2NyZWVuLWJ0bjo6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXFxFNjAyXFxcIjtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiaWNvbmZvbnRcXFwiO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZm9udC1zaXplOiAyMnB4O1xcbn1cXG5cXG4udnAtY29udGFpbmVyLW92ZXIgLnZwLWNvbnRyb2wtYmFyIHtcXG4gIGJvdHRvbTogMDtcXG4gIGxlZnQ6IDA7XFxufVxcblxcbi52cC12aWRlby1wbGF5aW5nIC52cC1jb250cm9sLWJhcl9wbGF5YnRuOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXFxFNjA2XFxcIjtcXG59XFxuXFxuLnZwLWNvbnRhaW5lci1mdWxsLXNjcmVlbiAudnAtY29udHJvbC1iYXJfZnVsbC1zY3JlZW4tYnRuOjphZnRlciB7XFxuICBjb250ZW50OiBcXFwiXFxcXEU2MDNcXFwiO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHJvdGF0ZS10aGUtc3VuIHtcXG4gIGZyb20ge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwKTtcXG4gIH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzU5ZGVnKTtcXG4gIH1cXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiaW1wb3J0IFZpZGVvUGxheWVyIGZyb20gJy4vaW5kZXgnXG5pbXBvcnQgJy4vc2Fzcy9pbmRleC5zY3NzJ1xuaW1wb3J0IHsgcGFyc2VVcmxQYXJhbSB9IGZyb20gJy4vdXRpbHMnXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2cobG9jYXRpb24uaHJlZilcbiAgICBsZXQgdXJsID0gcGFyc2VVcmxQYXJhbShsb2NhdGlvbi5ocmVmKS51cmxcbiAgICBpZiAoIXVybCkge1xuICAgICAgICBhbGVydCgndXJs5LiN5ZCI5rOVJylcbiAgICB9IGVsc2Uge1xuICAgICAgICBuZXcgVmlkZW9QbGF5ZXIoe1xuICAgICAgICAgICAgZWw6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlbycpLFxuICAgICAgICAgICAgLy8gdXJsOiAnaHR0cDovL3ZpZGVvLnhpYW9qaWFveXUxMDAuY29tLzg5MDgyMWUyZDIxODQ2NzlhMzZhNzc4YWNhM2Q5OGM3L2UyYWNlMTJiYjU3YjQwYzg5OWE4MzYxOTJiNzU4MWQwLTA3YjZjNmE1NThmN2UzOTc5MzY2ZDhkZmE1N2JmN2I0LWZkLm1wNCdcbiAgICAgICAgICAgIC8vIHVybDogJ2h0dHA6Ly9pcWl5aS5jZG45LW9renkuY29tLzIwMjAwODIwLzE0MjU0XzcyOGIxM2EwL2luZGV4Lm0zdTgnXG4gICAgICAgICAgICB1cmw6IGRlY29kZVVSSUNvbXBvbmVudCh1cmwpXG4gICAgICAgIH0pXG4gICAgfVxufVxuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uICh0YXJnZXQsIHBhcmVudCkge1xuICBpZiAocGFyZW50KXtcbiAgICByZXR1cm4gcGFyZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcbiAgfVxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xufTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHRhcmdldCwgcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgcGFzc2luZyBmdW5jdGlvbiBpbiBvcHRpb25zLCB0aGVuIHVzZSBpdCBmb3IgcmVzb2x2ZSBcImhlYWRcIiBlbGVtZW50LlxuICAgICAgICAgICAgICAgIC8vIFVzZWZ1bCBmb3IgU2hhZG93IFJvb3Qgc3R5bGUgaS5lXG4gICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgIC8vICAgaW5zZXJ0SW50bzogZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb29cIikuc2hhZG93Um9vdCB9XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBnZXRUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQsIHBhcmVudCk7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1t0YXJnZXRdXG5cdH07XG59KSgpO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09IFwiYm9vbGVhblwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuICAgICAgICBpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlLCB0YXJnZXQpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXG5cdGlmKG9wdGlvbnMuYXR0cnMubm9uY2UgPT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBub25jZSA9IGdldE5vbmNlKCk7XG5cdFx0aWYgKG5vbmNlKSB7XG5cdFx0XHRvcHRpb25zLmF0dHJzLm5vbmNlID0gbm9uY2U7XG5cdFx0fVxuXHR9XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gZ2V0Tm9uY2UoKSB7XG5cdGlmICh0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRyZXR1cm4gX193ZWJwYWNrX25vbmNlX187XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gdHlwZW9mIG9wdGlvbnMudHJhbnNmb3JtID09PSAnZnVuY3Rpb24nXG5cdFx0ID8gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcykgXG5cdFx0IDogb3B0aW9ucy50cmFuc2Zvcm0uZGVmYXVsdChvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cbiIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCB7ZmluZEVsUG9zaXRpb24sIGZ1bGxzY3JlZW4sIHJlcXVlc3RGdWxsc2NyZWVuLCBleGl0RnVsbHNjcmVlbn0gZnJvbSAnLi91dGlscydcclxuaW1wb3J0IEZ1bGxzY3JlZW5BcGkgZnJvbSAnLi9mdWxsc2NyZWVuJ1xyXG5cclxuY29uc3Qgc3VwcG9ydHNGdWxsc2NyZWVuID0gRnVsbHNjcmVlbkFwaS5yZXF1ZXN0RnVsbHNjcmVlblxyXG5cclxuY29uc29sZS5sb2coRnVsbHNjcmVlbkFwaSlcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRNYW5hZ2Uge1xyXG4gICAgY29uc3RydWN0b3IoaW5zdGFuY2UpIHtcclxuICAgICAgICB0aGlzLmluc3RhbmNlID0gaW5zdGFuY2VcclxuICAgICAgICB0aGlzLmZ1bGxTY3JlZW4gPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuaW5pdCgpXHJcbiAgICB9XHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIGxldCBpbnN0YW5jZSA9IHRoaXMuaW5zdGFuY2UsQ29udHJvbEJhciA9IHRoaXMuaW5zdGFuY2UuQ29udHJvbEJhclxyXG5cclxuICAgICAgICB0aGlzLmluc3RhbmNlLiRlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS50b2dnbGUoKVxyXG4gICAgICAgIH0sIGZhbHNlKVxyXG5cclxuICAgICAgICB0aGlzLmluc3RhbmNlLiRlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UuX29uQ29udGFpbmVyT3ZlcigpXHJcbiAgICAgICAgfSwgZmFsc2UpXHJcbiAgICAgICAgLy8g6L+b5bqm5p2h5o6n5Yi2XHJcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudnAtY29udHJvbC1iYXJfcHJvZ3Jlc3NfaW5uZXInKSxcclxuICAgICAgICAgICAgc2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudnAtcHJvZ3Jlc3Mtc2xpZGUnKVxyXG4gICAgICAgIHByb2dyZXNzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBpbnN0YW5jZS4kZWwuY2xhc3NMaXN0LmFkZCgndnAtdmlkZW8tbG9hZHN0YXJ0JylcclxuICAgICAgICAgICAgY29uc3QgbGVmdCA9IGV2ZW50LnBhZ2VYIC0gZmluZEVsUG9zaXRpb24ocHJvZ3Jlc3MpLmxlZnRcclxuICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NXaWR0aCA9IHByb2dyZXNzLm9mZnNldFdpZHRoXHJcbiAgICAgICAgICAgIGNvbnN0IHBlcmNlbnQgPSBsZWZ0IC8gcHJvZ3Jlc3NXaWR0aCAqIDEwMFxyXG4gICAgICAgICAgICBzbGlkZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYHdpZHRoOiAke3BlcmNlbnR9JWApXHJcbiAgICAgICAgICAgIGxldCBkdXJhdGlvbiA9IGluc3RhbmNlLmR1cmF0aW9uKClcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRUaW1lID0gZHVyYXRpb24gKiBwZXJjZW50IC8gMTAwXHJcbiAgICAgICAgICAgIGluc3RhbmNlLmN1cnJlbnRUaW1lKGN1cnJlbnRUaW1lKVxyXG4gICAgICAgICAgICBDb250cm9sQmFyLnNldFRpbWUoY3VycmVudFRpbWUsIGR1cmF0aW9uKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGNvbnN0IGZ1bGxTY3JlZW5CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudnAtY29udHJvbC1iYXJfZnVsbC1zY3JlZW4tYnRuJylcclxuICAgICAgICBmdWxsU2NyZWVuQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZ1bGxTY3JlZW4pIHtcclxuICAgICAgICAgICAgICAgIGV4aXRGdWxsc2NyZWVuKClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RGdWxsc2NyZWVuKGluc3RhbmNlLiRlbClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoRnVsbHNjcmVlbkFwaVsnZnVsbHNjcmVlbmNoYW5nZSddLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzRnVsbHNjcmVlbiA9ICEhZG9jdW1lbnRbRnVsbHNjcmVlbkFwaVsnZnVsbHNjcmVlbkVsZW1lbnQnXV1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Z1bGxzY3JlZW5jaGFuZ2UnKVxyXG4gICAgICAgICAgICBpZiAoaXNGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZ1bGxTY3JlZW4gPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS4kZWwuY2xhc3NMaXN0LmFkZCgndnAtY29udGFpbmVyLWZ1bGwtc2NyZWVuJylcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnVsbFNjcmVlbiA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS4kZWwuY2xhc3NMaXN0LnJlbW92ZSgndnAtY29udGFpbmVyLWZ1bGwtc2NyZWVuJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGZhbHNlKVxyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlkZW8tcGxheWVyJykuYWRkRXZlbnRMaXN0ZW5lcigneDV2aWRlb2V4aXRmdWxsc2NyZWVuJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZ1bGxTY3JlZW4gPSBmYWxzZVxyXG4gICAgICAgICAgICBpbnN0YW5jZS4kZWwuY2xhc3NMaXN0LnJlbW92ZSgndnAtY29udGFpbmVyLWZ1bGwtc2NyZWVuJylcclxuICAgICAgICB9KVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlby1wbGF5ZXInKS5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRlbmRmdWxsc2NyZWVuJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZ1bGxTY3JlZW4gPSBmYWxzZVxyXG4gICAgICAgICAgICBpbnN0YW5jZS4kZWwuY2xhc3NMaXN0LnJlbW92ZSgndnAtY29udGFpbmVyLWZ1bGwtc2NyZWVuJylcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIiwiaW1wb3J0IHsgZm9ybWF0VGltZSwgZmluZEVsUG9zaXRpb24gfSBmcm9tICcuL3V0aWxzJ1xyXG5jbGFzcyBDb250cm9sQmFyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgIHRoaXMuZWwuY2xhc3NOYW1lID0gJ3ZwLWNvbnRyb2wtYmFyJ1xyXG4gICAgICAgIHRoaXMuY3JlYXRlUGxheUJ0bigpXHJcbiAgICAgICAgdGhpcy5jcmVhdGVUaW1lR3JvdXAoKVxyXG4gICAgICAgIHRoaXMuY3JlYXRlUHJvZ3Jlc3MoKVxyXG4gICAgICAgIHRoaXMuY3JlYXRlRnVsbFNjcmVlbkJ0bigpXHJcbiAgICB9XHJcbiAgICBjcmVhdGVQbGF5QnRuKCkge1xyXG4gICAgICAgIGxldCBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcclxuICAgICAgICBkb20uY2xhc3NOYW1lID0gJ3ZwLWNvbnRyb2wtYmFyX3BsYXlidG4nXHJcbiAgICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZChkb20pXHJcbiAgICB9XHJcbiAgICBjcmVhdGVUaW1lR3JvdXAoKSB7XHJcbiAgICAgICAgbGV0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxyXG4gICAgICAgIGRvbS5jbGFzc05hbWUgPSAndnAtY29udHJvbC1iYXJfdGltZWdyb3VwJ1xyXG4gICAgICAgIGRvbS5pbm5lckhUTUwgPVxyXG4gICAgICAgICAgICAnPHNwYW4+MDowMDwvc3Bhbj4mbmJzcDsvJm5ic3A7PHNwYW4gY2xhc3M9XCJ2cC1jb250cm9sLWJhcl90aW1lZ3JvdXBfZHVyYXRpb25cIj4wOjAwPC9zcGFuPidcclxuICAgICAgICB0aGlzLmVsLmFwcGVuZENoaWxkKGRvbSlcclxuICAgICAgICBkb20uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgY3JlYXRlRnVsbFNjcmVlbkJ0bigpIHtcclxuICAgICAgICBsZXQgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXHJcbiAgICAgICAgZG9tLmNsYXNzTmFtZSA9ICd2cC1jb250cm9sLWJhcl9mdWxsLXNjcmVlbi1idG4nXHJcbiAgICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZChkb20pXHJcbiAgICB9XHJcbiAgICBjcmVhdGVQcm9ncmVzcygpIHtcclxuICAgICAgICBsZXQgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXHJcbiAgICAgICAgZG9tLmNsYXNzTmFtZSA9ICd2cC1jb250cm9sLWJhcl9wcm9ncmVzcydcclxuICAgICAgICBkb20uaW5uZXJIVE1MID1cclxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ2cC1jb250cm9sLWJhcl9wcm9ncmVzc19pbm5lclwiPjxkaXYgY2xhc3M9XCJ2cC1wcm9ncmVzcy1sb2FkZWRcIj48L2Rpdj48ZGl2IGNsYXNzPVwidnAtcHJvZ3Jlc3Mtc2xpZGVcIj48L2Rpdj48L2Rpdj4nXHJcbiAgICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZChkb20pXHJcbiAgICAgICAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHNldFRpbWUoY3VycmVudCwgZHVyYXRpb24pIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgICAgICAnLnZwLWNvbnRyb2wtYmFyX3RpbWVncm91cCdcclxuICAgICAgICApLmlubmVySFRNTCA9IGA8c3Bhbj4ke2Zvcm1hdFRpbWUoXHJcbiAgICAgICAgICAgIGN1cnJlbnRcclxuICAgICAgICApfTwvc3Bhbj4mbmJzcDsvJm5ic3A7PHNwYW4gY2xhc3M9XCJ2cC1jb250cm9sLWJhcl90aW1lZ3JvdXBfZHVyYXRpb25cIj4ke2Zvcm1hdFRpbWUoXHJcbiAgICAgICAgICAgIGR1cmF0aW9uXHJcbiAgICAgICAgKX08L3NwYW4+YFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgQ29udHJvbEJhcigpXHJcbiIsImltcG9ydCB7IGlzTTNVOCwgaXNNUDQgfSBmcm9tICcuL3V0aWxzJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWRlbyB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy52aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcclxuICAgICAgICB0aGlzLnZpZGVvLnNldEF0dHJpYnV0ZSgnY3Jvc3NvcmlnaW4nLCAnYW5vbnltb3VzJylcclxuICAgICAgICB0aGlzLnZpZGVvLnNldEF0dHJpYnV0ZSgnaWQnLCAndmlkZW8tcGxheWVyJylcclxuICAgICAgICB0aGlzLnZpZGVvLnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAndHJ1ZScpXHJcbiAgICAgICAgdGhpcy52aWRlby5zZXRBdHRyaWJ1dGUoJ3g1LXZpZGVvLXBsYXllci1mdWxsc2NyZWVuJywgJ3RydWUnKVxyXG4gICAgICAgIHRoaXMudmlkZW8uc2V0QXR0cmlidXRlKCd4NS12aWRlby1wbGF5ZXItdHlwZScsICdoNScpXHJcbiAgICAgICAgdGhpcy52aWRlby5jbGFzc05hbWUgPSAndnAtdmlkZW8nXHJcbiAgICAgICAgaWYgKG9wdGlvbnMudXJsKSB0aGlzLl9zZXRVcmwob3B0aW9ucy51cmwpXHJcbiAgICAgICAgdGhpcy5fYWRkRXZlbnQoKVxyXG4gICAgfVxyXG4gICAgX3NldFVybCh1cmwpIHtcclxuICAgICAgICBpZiAoaXNNM1U4KHVybCkpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5IbHMgJiYgd2luZG93Lkhscy5pc1N1cHBvcnRlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZGluZyA9IHRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMuaGxzID0gbmV3IHdpbmRvdy5IbHMoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5obHMubG9hZFNvdXJjZSh1cmwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhscy5hdHRhY2hNZWRpYSh0aGlzLnZpZGVvKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgbG9hZCB0aGUgaGxzLmpzIGJlZm9yZSB2aWRlbyBpbml0JylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNNUDQodXJsKSkge1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvLnNyYyA9IHVybFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5TdXBwb3J0IHZpZGVvIHVybCcpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY3VycmVudFRpbWUodGltZSkge1xyXG4gICAgICAgIGlmICghdGltZSAmJiB0aW1lICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpZGVvICYmIHRoaXMudmlkZW8uY3VycmVudFRpbWUgfHwgMFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGltZSAhPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY3VycmVudFRpbWUgc2hvdWxkIGJlIG51bWJlcicpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy52aWRlby5jdXJyZW50VGltZSA9IHRpbWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkdXJhdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52aWRlbyAmJiB0aGlzLnZpZGVvLmR1cmF0aW9uIHx8IDBcclxuICAgIH1cclxuICAgIHBsYXkoKSB7XHJcbiAgICAgICAgdGhpcy52aWRlbyAmJiB0aGlzLnZpZGVvLnBsYXkoKVxyXG4gICAgfVxyXG4gICAgcGF1c2UoKSB7XHJcbiAgICAgICAgdGhpcy52aWRlbyAmJiB0aGlzLnZpZGVvLnBhdXNlKClcclxuICAgIH1cclxuICAgIHRvZ2dsZSgpIHtcclxuICAgICAgICBpZiAodGhpcy52aWRlby5wYXVzZWQgPT09IHRydWUpIHRoaXMucGxheSgpXHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy52aWRlby5wYXVzZWQgPT09IGZhbHNlKSB0aGlzLnBhdXNlKClcclxuICAgIH1cclxuICAgIF9hZGRFdmVudCgpIHtcclxuICAgICAgICBsZXQgZXZlbnRBcnIgPSBbJ3BsYXknLCAncGF1c2UnLCAnbG9hZHN0YXJ0JywgJ2xvYWRlZGRhdGEnLCAncHJvZ3Jlc3MnLCAnY2FucGxheScsICd0aW1ldXBkYXRlJywgJ2VuZGVkJ11cclxuICAgICAgICBldmVudEFyci5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoaXRlbSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpc1snX29uJysgaXRlbV0oKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBfb25wbGF5KCkge31cclxuICAgIF9vbnBhdXNlKCkge31cclxuICAgIF9vbmxvYWRzdGFydCgpIHt9XHJcbiAgICBfb25sb2FkZWRkYXRhKCkge31cclxuICAgIF9vbnByb2dyZXNzKCkge31cclxuICAgIF9vbmNhbnBsYXkoKSB7fVxyXG4gICAgX29udGltZXVwZGF0ZSgpIHt9XHJcbiAgICBfb25lbmRlZCgpIHt9XHJcbn0iLCJpbXBvcnQgeyBjdWJlIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCBWaWRlbyBmcm9tICcuL3ZpZGVvJ1xuaW1wb3J0IENvbnRyb2xCYXIgZnJvbSAnLi9Db250cm9sQmFyJ1xuaW1wb3J0IEV2ZW50TWFuYWdlIGZyb20gJy4vZXZlbnRNYW5hZ2UnXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWRlb1BsYXllciBleHRlbmRzIFZpZGVvIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuQ29udHJvbEJhciA9IENvbnRyb2xCYXIgLy8g5o6n5Yi25Y+wXG4gICAgICAgIHRoaXMuJGVsID0gb3B0aW9ucy5lbCB8fCBkb2N1bWVudC5ib2R5XG4gICAgICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoJ3ZwLWNvbnRhaW5lcicpXG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZENoaWxkKHRoaXMudmlkZW8pXG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZENoaWxkKGNyZWF0ZVBhdXNlQnV0dG9uKCkpXG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZENoaWxkKGNyZWF0ZUxvYWRpbmdCdXR0b24oKSlcbiAgICAgICAgdGhpcy4kZWwuYXBwZW5kQ2hpbGQoQ29udHJvbEJhci5lbClcbiAgICAgICAgdGhpcy5ldmVudE1hbmFnZSA9IG5ldyBFdmVudE1hbmFnZSh0aGlzKVxuICAgIH1cbiAgICBfb25Db250YWluZXJPdmVyKGV2ZW50KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcilcbiAgICAgICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZCgndnAtY29udGFpbmVyLW92ZXInKVxuICAgICAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kZWwuY2xhc3NMaXN0LnJlbW92ZSgndnAtY29udGFpbmVyLW92ZXInKVxuICAgICAgICB9LCAzMDAwKVxuICAgIH1cbiAgICBfb25wbGF5KCkge1xuICAgICAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKCd2cC12aWRlby1wbGF5aW5nJylcbiAgICB9XG4gICAgX29ucGF1c2UoKSB7XG4gICAgICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3ZwLXZpZGVvLXBsYXlpbmcnKVxuICAgIH1cbiAgICBfb25sb2Fkc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoJ3ZwLXZpZGVvLWxvYWRzdGFydCcpXG4gICAgfVxuICAgIF9vbmxvYWRlZGRhdGEoKSB7XG4gICAgICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3ZwLXZpZGVvLWxvYWRzdGFydCcpXG4gICAgfVxuICAgIF9vbnRpbWV1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMuQ29udHJvbEJhci5zZXRUaW1lKHRoaXMuY3VycmVudFRpbWUoKSwgdGhpcy5kdXJhdGlvbigpKVxuICAgIH1cbiAgICBfb25jYW5wbGF5KCkge1xuICAgICAgICB0aGlzLiRlbC5jbGFzc0xpc3QucmVtb3ZlKCd2cC12aWRlby1sb2Fkc3RhcnQnKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlUGF1c2VCdXR0b24oKSB7XG4gICAgbGV0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgZWwuY2xhc3NOYW1lID0gJ3ZwLWNvbnRhaW5lci1jZW50ZXItYnV0dG9uIHZwLWNvbnRhaW5lci1wYXVzZS1idXR0b24nXG4gICAgZWwuaW5uZXJIVE1MID0gJyYjeGU2MDc7J1xuICAgIHJldHVybiBlbFxufVxuZnVuY3Rpb24gY3JlYXRlTG9hZGluZ0J1dHRvbigpIHtcbiAgICBsZXQgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBlbC5jbGFzc05hbWUgPSAndnAtY29udGFpbmVyLWNlbnRlci1idXR0b24gdnAtY29udGFpbmVyLWxvYWRpbmctYnV0dG9uJ1xuICAgIGVsLmlubmVySFRNTCA9ICcmI3hlNjBhOydcbiAgICByZXR1cm4gZWxcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=