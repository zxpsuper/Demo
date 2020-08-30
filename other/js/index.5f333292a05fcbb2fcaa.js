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
      url: atob(url)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Z1bGxzY3JlZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL3NyYy9zYXNzL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LXNlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Nhc3MvaW5kZXguc2Nzcz9lODg1Iiwid2VicGFjazovLy8uL3NyYy9ldmVudE1hbmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29udHJvbEJhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlkZW8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImlzTTNVOCIsInVybCIsIkVycm9yIiwidGVzdCIsImlzTVA0IiwidG9Mb3dlckNhc2UiLCJmb3JtYXRUaW1lIiwidGltZSIsInMiLCJwYWQiLCJNYXRoIiwiZmxvb3IiLCJtIiwibnVtIiwibiIsImlzVW5kZWZpbmVkIiwiU3RyaW5nIiwibGVuZ3RoIiwib2JqIiwiZmluZEVsUG9zaXRpb24iLCJlbCIsImJveCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInBhcmVudE5vZGUiLCJsZWZ0IiwidG9wIiwiZG9jRWwiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImJvZHkiLCJjbGllbnRMZWZ0Iiwic2Nyb2xsTGVmdCIsIndpbmRvdyIsInBhZ2VYT2Zmc2V0IiwiY2xpZW50VG9wIiwic2Nyb2xsVG9wIiwicGFnZVlPZmZzZXQiLCJyb3VuZCIsInJlcXVlc3RGdWxsc2NyZWVuIiwiZWxlbSIsIndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidG9VcHBlckNhc2UiLCJpbmRleE9mIiwiRWxlbWVudCIsIkFMTE9XX0tFWUJPQVJEX0lOUFVUIiwibW96UmVxdWVzdEZ1bGxTY3JlZW4iLCJleGl0RnVsbHNjcmVlbiIsIndlYmtpdENhbmNlbEZ1bGxTY3JlZW4iLCJtb3pDYW5jZWxGdWxsU2NyZWVuIiwiZnVsbHNjcmVlbiIsIndlYmtpdElzRnVsbFNjcmVlbiIsIm1vekZ1bGxTY3JlZW4iLCJwYXJzZVVybFBhcmFtIiwicGFyYW1zU3RyIiwiZXhlYyIsInBhcmFtc0FyciIsInNwbGl0IiwicGFyYW1zT2JqIiwiZm9yRWFjaCIsInBhcmFtIiwia2V5IiwidmFsIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicGFyc2VGbG9hdCIsImNvbmNhdCIsIkZ1bGxzY3JlZW5BcGkiLCJhcGlNYXAiLCJzcGVjQXBpIiwiYnJvd3NlckFwaSIsImkiLCJvbmxvYWQiLCJjb25zb2xlIiwibG9nIiwibG9jYXRpb24iLCJocmVmIiwiYWxlcnQiLCJWaWRlb1BsYXllciIsImdldEVsZW1lbnRCeUlkIiwiYXRvYiIsInN1cHBvcnRzRnVsbHNjcmVlbiIsIkV2ZW50TWFuYWdlIiwiaW5zdGFuY2UiLCJmdWxsU2NyZWVuIiwiaW5pdCIsIkNvbnRyb2xCYXIiLCIkZWwiLCJhZGRFdmVudExpc3RlbmVyIiwidG9nZ2xlIiwiX29uQ29udGFpbmVyT3ZlciIsInByb2dyZXNzIiwicXVlcnlTZWxlY3RvciIsInNsaWRlIiwiZXZlbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJwYWdlWCIsInByb2dyZXNzV2lkdGgiLCJvZmZzZXRXaWR0aCIsInBlcmNlbnQiLCJzZXRBdHRyaWJ1dGUiLCJkdXJhdGlvbiIsImN1cnJlbnRUaW1lIiwic2V0VGltZSIsImZ1bGxTY3JlZW5CdG4iLCJzdG9wUHJvcGFnYXRpb24iLCJpc0Z1bGxzY3JlZW4iLCJyZW1vdmUiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiY3JlYXRlUGxheUJ0biIsImNyZWF0ZVRpbWVHcm91cCIsImNyZWF0ZVByb2dyZXNzIiwiY3JlYXRlRnVsbFNjcmVlbkJ0biIsImRvbSIsImFwcGVuZENoaWxkIiwiaW5uZXJIVE1MIiwiY3VycmVudCIsIlZpZGVvIiwib3B0aW9ucyIsInZpZGVvIiwiX3NldFVybCIsIl9hZGRFdmVudCIsIkhscyIsImlzU3VwcG9ydGVkIiwicmVsb2FkaW5nIiwiaGxzIiwibG9hZFNvdXJjZSIsImF0dGFjaE1lZGlhIiwic3JjIiwicGxheSIsInBhdXNlIiwicGF1c2VkIiwiZXZlbnRBcnIiLCJpdGVtIiwiY3JlYXRlUGF1c2VCdXR0b24iLCJjcmVhdGVMb2FkaW5nQnV0dG9uIiwiZXZlbnRNYW5hZ2UiLCJjbGVhclRpbWVvdXQiLCJfdGltZXIiLCJzZXRUaW1lb3V0Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDakZBO0FB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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0EsS0FBSyxLQUF3QyxFQUFFLEVBRTdDOztBQUVGLFFBQVEsc0JBQWlCO0FBQ3pCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDs7QUFFQSw2QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7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USxDQUFDa0YsYUFBVCxDQUF1QixNQUF2QixDQUFUO0FBQ0F6RixJQUFFLENBQUMwRixTQUFILEdBQWUsd0RBQWY7QUFDQTFGLElBQUUsQ0FBQ2lHLFNBQUgsR0FBZSxVQUFmO0FBQ0EsU0FBT2pHLEVBQVA7QUFDSCxDIiwiZmlsZSI6ImpzL2luZGV4LjVmMzMzMjkyYTA1ZmNiYjJmY2FhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiVE14RVwiKTtcbiIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvfFxccyokKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuIiwiLyoqXG4gKiDliKTmlq3mmK/lkKbkuLptM3U4XG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNNM1U4KHVybCkge1xuICAgIGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB2aWRlbyB1cmwgc2hvdWxkIGJlIHN0cmluZyB0eXBlJylcbiAgICB9XG4gICAgcmV0dXJuIC9cXC5tM3U4JC8udGVzdCh1cmwpXG59XG4vKipcbiAqIOWIpOaWreaYr+WQpuS4um1wNFxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTVA0KHVybCkge1xuICAgIGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB2aWRlbyB1cmwgc2hvdWxkIGJlIHN0cmluZyB0eXBlJylcbiAgICB9XG4gICAgdXJsID0gdXJsLnRvTG93ZXJDYXNlKClcbiAgICByZXR1cm4gL1xcLm1wNCQvLnRlc3QodXJsKVxufVxuLyoqXG4gKiDmoLzlvI/ljJbml7bpl7TkuLrliIbpkp/lvaLlvI8wMDowMFxuICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRUaW1lKHRpbWUpIHtcbiAgICB0aW1lID0gdGltZSA8IDAgPyAwIDogdGltZVxuICAgIGNvbnN0IHMgPSBwYWQoTWF0aC5mbG9vcih0aW1lICUgNjApKVxuICAgIGNvbnN0IG0gPSBwYWQoTWF0aC5mbG9vcih0aW1lIC8gNjApKVxuICAgIHJldHVybiBgJHttfToke3N9YFxufVxuZXhwb3J0IGZ1bmN0aW9uIHBhZChudW0sIG4pIHtcbiAgICBuID0gaXNVbmRlZmluZWQobikgPyAyIDogK25cbiAgICBudW0gPSBTdHJpbmcobnVtKVxuICAgIHdoaWxlIChudW0ubGVuZ3RoIDwgbikge1xuICAgICAgICBudW0gPSAnMCcgKyBudW1cbiAgICB9XG4gICAgcmV0dXJuIG51bVxufVxuLyoqXG4gKiDmmK/lkKbkuLp1bmRlZmluZGVkXG4gKiBAcGFyYW0ge2FueX0gb2JqIFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNVbmRlZmluZWQob2JqKSB7XG4gICAgcmV0dXJuIHZvaWQgMCA9PT0gb2JqXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kRWxQb3NpdGlvbihlbCkge1xuICAgIGxldCBib3hcblxuICAgIGlmIChlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgJiYgZWwucGFyZW50Tm9kZSkge1xuICAgICAgICBib3ggPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIH1cblxuICAgIGlmICghYm94KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZG9jRWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keVxuXG4gICAgY29uc3QgY2xpZW50TGVmdCA9IGRvY0VsLmNsaWVudExlZnQgfHwgYm9keS5jbGllbnRMZWZ0IHx8IDBcbiAgICBjb25zdCBzY3JvbGxMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IGJvZHkuc2Nyb2xsTGVmdFxuICAgIGNvbnN0IGxlZnQgPSBib3gubGVmdCArIHNjcm9sbExlZnQgLSBjbGllbnRMZWZ0XG5cbiAgICBjb25zdCBjbGllbnRUb3AgPSBkb2NFbC5jbGllbnRUb3AgfHwgYm9keS5jbGllbnRUb3AgfHwgMFxuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBib2R5LnNjcm9sbFRvcFxuICAgIGNvbnN0IHRvcCA9IGJveC50b3AgKyBzY3JvbGxUb3AgLSBjbGllbnRUb3BcblxuICAgIC8vIEFuZHJvaWQgc29tZXRpbWVzIHJldHVybnMgc2xpZ2h0bHkgb2ZmIGRlY2ltYWwgdmFsdWVzLCBzbyBuZWVkIHRvIHJvdW5kXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogTWF0aC5yb3VuZChsZWZ0KSxcbiAgICAgICAgdG9wOiBNYXRoLnJvdW5kKHRvcCksXG4gICAgfVxufVxuLyoqXG4gKiDlhajlsY9cbiAqIEBwYXJhbSB7ZG9tfSBlbGVtIFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVxdWVzdEZ1bGxzY3JlZW4oZWxlbSkge1xuICAgIGlmIChlbGVtLnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgIGVsZW0ucmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIH0gZWxzZSBpZiAoZWxlbS53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgICAvLyDlr7kgQ2hyb21lIOeJueauiuWkhOeQhu+8jFxuICAgICAgICAvLyDlj4LmlbAgRWxlbWVudC5BTExPV19LRVlCT0FSRF9JTlBVVCDkvb/lhajlsY/nirbmgIHkuK3lj6/ku6XplK7nm5jovpPlhaXjgIJcbiAgICAgICAgaWYgKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvVXBwZXJDYXNlKCkuaW5kZXhPZignQ0hST01FJykgPj0gMCkge1xuICAgICAgICAgICAgZWxlbS53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbihFbGVtZW50LkFMTE9XX0tFWUJPQVJEX0lOUFVUKVxuICAgICAgICB9XG4gICAgICAgIC8vIFNhZmFyaSDmtY/op4jlmajkuK3vvIzlpoLmnpzmlrnms5XlhoXmnInlj4LmlbDvvIzliJkgRnVsbHNjcmVlbiDlip/og73kuI3lj6/nlKjjgIJcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbGVtLndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuKClcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZWxlbS5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgICBlbGVtLm1velJlcXVlc3RGdWxsU2NyZWVuKClcbiAgICB9XG59XG5cbi8qKlxuICog5Y+W5raI5YWo5bGPXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleGl0RnVsbHNjcmVlbigpIHtcbiAgICBpZiAoZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKVxuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQud2Via2l0Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgICBkb2N1bWVudC53ZWJraXRDYW5jZWxGdWxsU2NyZWVuKClcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpXG4gICAgfVxufVxuXG4vKipcbiAqIOaYr+WQpuWFqOWxj1xuICovXG5leHBvcnQgZnVuY3Rpb24gZnVsbHNjcmVlbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICBkb2N1bWVudC5mdWxsc2NyZWVuIHx8XG4gICAgICAgIGRvY3VtZW50LndlYmtpdElzRnVsbFNjcmVlbiB8fFxuICAgICAgICBkb2N1bWVudC5tb3pGdWxsU2NyZWVuIHx8XG4gICAgICAgIGZhbHNlXG4gICAgKVxufVxuXG4vKipcbiAqIOino+aekHVyTOS4reeahHF1ZXJ5XG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VVcmxQYXJhbSh1cmwpIHtcbiAgICBjb25zdCBwYXJhbXNTdHIgPSAvLitcXD8oLispJC8uZXhlYyh1cmwpWzFdOyAvLyDlsIYgPyDlkI7pnaLnmoTlrZfnrKbkuLLlj5blh7rmnaVcbiAgICBjb25zdCBwYXJhbXNBcnIgPSBwYXJhbXNTdHIuc3BsaXQoJyYnKTsgLy8g5bCG5a2X56ym5Liy5LulICYg5YiG5Ymy5ZCO5a2Y5Yiw5pWw57uE5LitXG4gICAgbGV0IHBhcmFtc09iaiA9IHt9O1xuICAgIC8vIOWwhiBwYXJhbXMg5a2Y5Yiw5a+56LGh5LitXG4gICAgcGFyYW1zQXJyLmZvckVhY2gocGFyYW0gPT4ge1xuICAgICAgaWYgKC89Ly50ZXN0KHBhcmFtKSkge1xuICAgICAgICAvLyDlpITnkIbmnIkgdmFsdWUg55qE5Y+C5pWwXG4gICAgICAgIGxldCBba2V5LCB2YWxdID0gcGFyYW0uc3BsaXQoJz0nKTsgLy8g5YiG5YmyIGtleSDlkowgdmFsdWVcbiAgICAgICAgdmFsID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbCk7IC8vIOino+eggVxuICAgICAgICB2YWwgPSAvXlxcZCskLy50ZXN0KHZhbCkgPyBwYXJzZUZsb2F0KHZhbCkgOiB2YWw7IC8vIOWIpOaWreaYr+WQpui9rOS4uuaVsOWtl1xuICBcbiAgICAgICAgaWYgKHBhcmFtc09iai5rZXkpIHtcbiAgICAgICAgICAvLyDlpoLmnpzlr7nosaHmnIkga2V577yM5YiZ5re75Yqg5LiA5Liq5YC8XG4gICAgICAgICAgcGFyYW1zT2JqW2tleV0gPSBbXS5jb25jYXQocGFyYW1zT2JqW2tleV0sIHZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8g5aaC5p6c5a+56LGh5rKh5pyJ6L+Z5LiqIGtlee+8jOWIm+W7uiBrZXkg5bm26K6+572u5YC8XG4gICAgICAgICAgcGFyYW1zT2JqW2tleV0gPSB2YWw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOWkhOeQhuayoeaciSB2YWx1ZSDnmoTlj4LmlbBcbiAgICAgICAgcGFyYW1zT2JqW3BhcmFtXSA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gIFxuICAgIHJldHVybiBwYXJhbXNPYmo7XG4gIH0iLCIvLyDph43lhpnmkq3mlL7lmajnmoTlhajlsY/vvI/lj5bmtojlhajlsY/mlrnms5XvvIzph43mlrDmjIflrprlhajlsY/nmoTlhYPntKDvvIjogIzkuI3lj6rmmK/mkq3mlL7lmajmnKzouqvvvIlcclxuXHJcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9GdWxsc2NyZWVuX0FQSVxyXG5cclxuY29uc3QgRnVsbHNjcmVlbkFwaSA9IHt9XHJcblxyXG4vLyBicm93c2VyIEFQSSBtZXRob2RzXHJcbmNvbnN0IGFwaU1hcCA9IFtcclxuICBbXHJcbiAgICAncmVxdWVzdEZ1bGxzY3JlZW4nLFxyXG4gICAgJ2V4aXRGdWxsc2NyZWVuJyxcclxuICAgICdmdWxsc2NyZWVuRWxlbWVudCcsXHJcbiAgICAnZnVsbHNjcmVlbkVuYWJsZWQnLFxyXG4gICAgJ2Z1bGxzY3JlZW5jaGFuZ2UnLFxyXG4gICAgJ2Z1bGxzY3JlZW5lcnJvcidcclxuICBdLFxyXG4gIC8vIFdlYktpdFxyXG4gIFtcclxuICAgICd3ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbicsXHJcbiAgICAnd2Via2l0RXhpdEZ1bGxzY3JlZW4nLFxyXG4gICAgJ3dlYmtpdEZ1bGxzY3JlZW5FbGVtZW50JyxcclxuICAgICd3ZWJraXRGdWxsc2NyZWVuRW5hYmxlZCcsXHJcbiAgICAnd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsXHJcbiAgICAnd2Via2l0ZnVsbHNjcmVlbmVycm9yJ1xyXG4gIF0sXHJcbiAgLy8gT2xkIFdlYktpdCAoU2FmYXJpIDUuMSlcclxuICBbXHJcbiAgICAnd2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4nLFxyXG4gICAgJ3dlYmtpdENhbmNlbEZ1bGxTY3JlZW4nLFxyXG4gICAgJ3dlYmtpdEN1cnJlbnRGdWxsU2NyZWVuRWxlbWVudCcsXHJcbiAgICAnd2Via2l0Q2FuY2VsRnVsbFNjcmVlbicsXHJcbiAgICAnd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsXHJcbiAgICAnd2Via2l0ZnVsbHNjcmVlbmVycm9yJ1xyXG4gIF0sXHJcbiAgLy8gTW96aWxsYVxyXG4gIFtcclxuICAgICdtb3pSZXF1ZXN0RnVsbFNjcmVlbicsXHJcbiAgICAnbW96Q2FuY2VsRnVsbFNjcmVlbicsXHJcbiAgICAnbW96RnVsbFNjcmVlbkVsZW1lbnQnLFxyXG4gICAgJ21vekZ1bGxTY3JlZW5FbmFibGVkJyxcclxuICAgICdtb3pmdWxsc2NyZWVuY2hhbmdlJyxcclxuICAgICdtb3pmdWxsc2NyZWVuZXJyb3InXHJcbiAgXSxcclxuICAvLyBNaWNyb3NvZnRcclxuICBbXHJcbiAgICAnbXNSZXF1ZXN0RnVsbHNjcmVlbicsXHJcbiAgICAnbXNFeGl0RnVsbHNjcmVlbicsXHJcbiAgICAnbXNGdWxsc2NyZWVuRWxlbWVudCcsXHJcbiAgICAnbXNGdWxsc2NyZWVuRW5hYmxlZCcsXHJcbiAgICAnTVNGdWxsc2NyZWVuQ2hhbmdlJyxcclxuICAgICdNU0Z1bGxzY3JlZW5FcnJvcidcclxuICBdXHJcbl1cclxuXHJcbmNvbnN0IHNwZWNBcGkgPSBhcGlNYXBbMF1cclxubGV0IGJyb3dzZXJBcGlcclxuXHJcbi8vIGRldGVybWluZSB0aGUgc3VwcG9ydGVkIHNldCBvZiBmdW5jdGlvbnNcclxuZm9yIChsZXQgaSA9IDA7IGkgPCBhcGlNYXAubGVuZ3RoOyBpKyspIHtcclxuICAvLyBjaGVjayBmb3IgZXhpdEZ1bGxzY3JlZW4gZnVuY3Rpb25cclxuICBpZiAoYXBpTWFwW2ldWzFdIGluIGRvY3VtZW50KSB7XHJcbiAgICBicm93c2VyQXBpID0gYXBpTWFwW2ldXHJcbiAgICBicmVha1xyXG4gIH1cclxufVxyXG5cclxuLy8gbWFwIHRoZSBicm93c2VyIEFQSSBuYW1lcyB0byB0aGUgc3BlYyBBUEkgbmFtZXNcclxuaWYgKGJyb3dzZXJBcGkpIHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGJyb3dzZXJBcGkubGVuZ3RoOyBpKyspIHtcclxuICAgIEZ1bGxzY3JlZW5BcGlbc3BlY0FwaVtpXV0gPSBicm93c2VyQXBpW2ldXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGdWxsc2NyZWVuQXBpXHJcbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQGNoYXJzZXQgXFxcIlVURi04XFxcIjtcXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiaWNvbmZvbnRcXFwiO1xcbiAgLyogcHJvamVjdCBpZCAyMDIyMTcwICovXFxuICBzcmM6IHVybChcXFwiLy9hdC5hbGljZG4uY29tL3QvZm9udF8yMDIyMTcwX3BrOG5mOGY4ODRtLmVvdFxcXCIpO1xcbiAgc3JjOiB1cmwoXFxcIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMjAyMjE3MF9wazhuZjhmODg0bS5lb3Q/I2llZml4XFxcIikgZm9ybWF0KFxcXCJlbWJlZGRlZC1vcGVudHlwZVxcXCIpLCB1cmwoXFxcIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMjAyMjE3MF9wazhuZjhmODg0bS53b2ZmMlxcXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFxcXCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzIwMjIxNzBfcGs4bmY4Zjg4NG0ud29mZlxcXCIpIGZvcm1hdChcXFwid29mZlxcXCIpLCB1cmwoXFxcIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMjAyMjE3MF9wazhuZjhmODg0bS50dGZcXFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIiksIHVybChcXFwiLy9hdC5hbGljZG4uY29tL3QvZm9udF8yMDIyMTcwX3BrOG5mOGY4ODRtLnN2ZyNpY29uZm9udFxcXCIpIGZvcm1hdChcXFwic3ZnXFxcIik7XFxufVxcbnZpZGVvOjotd2Via2l0LW1lZGlhLWNvbnRyb2xzIHtcXG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG59XFxuXFxuLyp2aWRlb+m7mOiupOWFqOWxj+aMiemSriovXFxudmlkZW86Oi13ZWJraXQtbWVkaWEtY29udHJvbHMtZnVsbHNjcmVlbi1idXR0b24ge1xcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xcbn1cXG5cXG4vKnZpZGVv6buY6K6kYWR1aW/pn7Pph4/mjInpkq4qL1xcbnZpZGVvOjotd2Via2l0LW1lZGlhLWNvbnRyb2xzLW11dGUtYnV0dG9uIHtcXG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG59XFxuXFxuLyp2aWRlb+m7mOiupHNldHRpbmfmjInpkq4qL1xcbnZpZGVvOjotaW50ZXJuYWwtbWVkaWEtY29udHJvbHMtb3ZlcmZsb3ctYnV0dG9uIHtcXG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG59XFxuXFxudmlkZW86Oi13ZWJraXQtbWVkaWEtY29udHJvbHMtZW5jbG9zdXJlIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbnZpZGVvOjotd2Via2l0LW1lZGlhLWNvbnRyb2xzLXBhbmVsIHtcXG4gIHdpZHRoOiBjYWxjKDEwMCUgKyAzMHB4KTtcXG59XFxuXFxuLyrohb7orq/kupHngrnmkq3npoHnlKhmaXJlZm945YWo5bGP44CB6K6+572u5oyJ6ZKuKi9cXG4udHJ1bXAtYnV0dG9uW3N1Yi1jb21wb25lbnQ9ZnVsbHNjcmVlbl9idG5dLFxcbi50cnVtcC1idXR0b25bbm93PWZ1bGxzY3JlZW5dIHtcXG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG59XFxuXFxuLnRydW1wLWJ1dHRvbltzdWItY29tcG9uZW50PXNldHRpbmddIHtcXG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG59XFxuXFxuLyrnpoHnlKh2aWRlb+eahGNvbnRyb2xz77yI6KaB5oWO6YeN77yB5LiN6KaB6L275piT6ZqQ6JeP5o6J77yM5Lya5a+86Ie054K55Ye76KeG6aKR5LiN6IO95pKt5pS+77yJKi9cXG52aWRlbzo6LXdlYmtpdC1tZWRpYS1jb250cm9scyB7XFxuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxufVxcblxcbi52cC1jb250YWluZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBjb2xvcjogI2ZmZjtcXG59XFxuLnZwLWNvbnRhaW5lci1jZW50ZXItYnV0dG9uIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJpY29uZm9udFxcXCI7XFxuICBmb250LXNpemU6IDYwcHg7XFxufVxcbi52cC1jb250YWluZXItcGF1c2UtYnV0dG9uIHtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzE3MWEyOTtcXG4gIHBhZGRpbmc6IDEwcHggMTNweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLnZwLWNvbnRhaW5lci1sb2FkaW5nLWJ1dHRvbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgd2lkdGg6IDY2cHg7XFxuICBtYXJnaW4tdG9wOiAtMzNweDtcXG4gIG1hcmdpbi1sZWZ0OiAtMzNweDtcXG4gIGFuaW1hdGlvbi1uYW1lOiByb3RhdGUtdGhlLXN1bjtcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMC44cztcXG4gIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xcbiAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogbGluZWFyO1xcbn1cXG5cXG4udnAtdmlkZW8tcGxheWluZyAudnAtY29udGFpbmVyLXBhdXNlLWJ1dHRvbixcXG4udnAtdmlkZW8tbG9hZHN0YXJ0IC52cC1jb250YWluZXItcGF1c2UtYnV0dG9uIHtcXG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG59XFxuXFxuLnZwLXZpZGVvLWxvYWRzdGFydCAudnAtY29udGFpbmVyLWxvYWRpbmctYnV0dG9uIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4udnAtdmlkZW8ge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbi52cC1jb250cm9sLWJhciB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogNTBweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvdHRvbTogLTUwcHg7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC4zcztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTcxYTI5O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJpY29uZm9udFxcXCI7XFxufVxcbi52cC1jb250cm9sLWJhcl9wbGF5YnRuIHtcXG4gIHdpZHRoOiA1MHB4O1xcbiAgaGVpZ2h0OiA1MHB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMzBweDtcXG59XFxuLnZwLWNvbnRyb2wtYmFyX3BsYXlidG46OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEU2MDdcXFwiO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJpY29uZm9udFxcXCI7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi52cC1jb250cm9sLWJhcl90aW1lZ3JvdXAge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGhlaWdodDogNTBweDtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi52cC1jb250cm9sLWJhcl9wcm9ncmVzcyB7XFxuICBmbGV4OiAxO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAwIDEwcHggMCAyMHB4O1xcbn1cXG4udnAtY29udHJvbC1iYXJfcHJvZ3Jlc3NfaW5uZXIge1xcbiAgZmxleDogMTtcXG4gIGhlaWdodDogNnB4O1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQzNDg2MTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLnZwLWNvbnRyb2wtYmFyX3Byb2dyZXNzX2lubmVyIC52cC1wcm9ncmVzcy1zbGlkZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwYzU1ZDtcXG4gIGhlaWdodDogNnB4O1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbn1cXG4udnAtY29udHJvbC1iYXJfcHJvZ3Jlc3NfaW5uZXIgLnZwLXByb2dyZXNzLXNsaWRlOjphZnRlciB7XFxuICBjb250ZW50OiBcXFwiXFxcXEU2MEJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAtNXB4O1xcbiAgcmlnaHQ6IC04cHg7XFxufVxcbi52cC1jb250cm9sLWJhcl9mdWxsLXNjcmVlbi1idG4ge1xcbiAgd2lkdGg6IDUwcHg7XFxuICBoZWlnaHQ6IDUwcHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZm9udC1zaXplOiAzMHB4O1xcbn1cXG4udnAtY29udHJvbC1iYXJfZnVsbC1zY3JlZW4tYnRuOjphZnRlciB7XFxuICBjb250ZW50OiBcXFwiXFxcXEU2MDJcXFwiO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJpY29uZm9udFxcXCI7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBmb250LXNpemU6IDIycHg7XFxufVxcblxcbi52cC1jb250YWluZXItb3ZlciAudnAtY29udHJvbC1iYXIge1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogMDtcXG59XFxuXFxuLnZwLXZpZGVvLXBsYXlpbmcgLnZwLWNvbnRyb2wtYmFyX3BsYXlidG46OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcXEU2MDZcXFwiO1xcbn1cXG5cXG4udnAtY29udGFpbmVyLWZ1bGwtc2NyZWVuIC52cC1jb250cm9sLWJhcl9mdWxsLXNjcmVlbi1idG46OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTYwM1xcXCI7XFxufVxcblxcbkBrZXlmcmFtZXMgcm90YXRlLXRoZS1zdW4ge1xcbiAgZnJvbSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDApO1xcbiAgfVxcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNTlkZWcpO1xcbiAgfVxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJpbXBvcnQgVmlkZW9QbGF5ZXIgZnJvbSAnLi9pbmRleCdcbmltcG9ydCAnLi9zYXNzL2luZGV4LnNjc3MnXG5pbXBvcnQgeyBwYXJzZVVybFBhcmFtIH0gZnJvbSAnLi91dGlscydcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyhsb2NhdGlvbi5ocmVmKVxuICAgIGxldCB1cmwgPSBwYXJzZVVybFBhcmFtKGxvY2F0aW9uLmhyZWYpLnVybFxuICAgIGlmICghdXJsKSB7XG4gICAgICAgIGFsZXJ0KCd1cmzkuI3lkIjms5UnKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIG5ldyBWaWRlb1BsYXllcih7XG4gICAgICAgICAgICBlbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvJyksXG4gICAgICAgICAgICAvLyB1cmw6ICdodHRwOi8vdmlkZW8ueGlhb2ppYW95dTEwMC5jb20vODkwODIxZTJkMjE4NDY3OWEzNmE3NzhhY2EzZDk4YzcvZTJhY2UxMmJiNTdiNDBjODk5YTgzNjE5MmI3NTgxZDAtMDdiNmM2YTU1OGY3ZTM5NzkzNjZkOGRmYTU3YmY3YjQtZmQubXA0J1xuICAgICAgICAgICAgLy8gdXJsOiAnaHR0cDovL2lxaXlpLmNkbjktb2t6eS5jb20vMjAyMDA4MjAvMTQyNTRfNzI4YjEzYTAvaW5kZXgubTN1OCdcbiAgICAgICAgICAgIHVybDogYXRvYih1cmwpXG4gICAgICAgIH0pXG4gICAgfVxufVxuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uICh0YXJnZXQsIHBhcmVudCkge1xuICBpZiAocGFyZW50KXtcbiAgICByZXR1cm4gcGFyZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcbiAgfVxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xufTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHRhcmdldCwgcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgcGFzc2luZyBmdW5jdGlvbiBpbiBvcHRpb25zLCB0aGVuIHVzZSBpdCBmb3IgcmVzb2x2ZSBcImhlYWRcIiBlbGVtZW50LlxuICAgICAgICAgICAgICAgIC8vIFVzZWZ1bCBmb3IgU2hhZG93IFJvb3Qgc3R5bGUgaS5lXG4gICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgIC8vICAgaW5zZXJ0SW50bzogZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb29cIikuc2hhZG93Um9vdCB9XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBnZXRUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQsIHBhcmVudCk7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1t0YXJnZXRdXG5cdH07XG59KSgpO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09IFwiYm9vbGVhblwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuICAgICAgICBpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlLCB0YXJnZXQpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXG5cdGlmKG9wdGlvbnMuYXR0cnMubm9uY2UgPT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBub25jZSA9IGdldE5vbmNlKCk7XG5cdFx0aWYgKG5vbmNlKSB7XG5cdFx0XHRvcHRpb25zLmF0dHJzLm5vbmNlID0gbm9uY2U7XG5cdFx0fVxuXHR9XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gZ2V0Tm9uY2UoKSB7XG5cdGlmICh0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRyZXR1cm4gX193ZWJwYWNrX25vbmNlX187XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gdHlwZW9mIG9wdGlvbnMudHJhbnNmb3JtID09PSAnZnVuY3Rpb24nXG5cdFx0ID8gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcykgXG5cdFx0IDogb3B0aW9ucy50cmFuc2Zvcm0uZGVmYXVsdChvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cbiIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCB7ZmluZEVsUG9zaXRpb24sIGZ1bGxzY3JlZW4sIHJlcXVlc3RGdWxsc2NyZWVuLCBleGl0RnVsbHNjcmVlbn0gZnJvbSAnLi91dGlscydcclxuaW1wb3J0IEZ1bGxzY3JlZW5BcGkgZnJvbSAnLi9mdWxsc2NyZWVuJ1xyXG5cclxuY29uc3Qgc3VwcG9ydHNGdWxsc2NyZWVuID0gRnVsbHNjcmVlbkFwaS5yZXF1ZXN0RnVsbHNjcmVlblxyXG5cclxuY29uc29sZS5sb2coRnVsbHNjcmVlbkFwaSlcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRNYW5hZ2Uge1xyXG4gICAgY29uc3RydWN0b3IoaW5zdGFuY2UpIHtcclxuICAgICAgICB0aGlzLmluc3RhbmNlID0gaW5zdGFuY2VcclxuICAgICAgICB0aGlzLmZ1bGxTY3JlZW4gPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuaW5pdCgpXHJcbiAgICB9XHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIGxldCBpbnN0YW5jZSA9IHRoaXMuaW5zdGFuY2UsQ29udHJvbEJhciA9IHRoaXMuaW5zdGFuY2UuQ29udHJvbEJhclxyXG5cclxuICAgICAgICB0aGlzLmluc3RhbmNlLiRlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS50b2dnbGUoKVxyXG4gICAgICAgIH0sIGZhbHNlKVxyXG5cclxuICAgICAgICB0aGlzLmluc3RhbmNlLiRlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UuX29uQ29udGFpbmVyT3ZlcigpXHJcbiAgICAgICAgfSwgZmFsc2UpXHJcbiAgICAgICAgLy8g6L+b5bqm5p2h5o6n5Yi2XHJcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudnAtY29udHJvbC1iYXJfcHJvZ3Jlc3NfaW5uZXInKSxcclxuICAgICAgICAgICAgc2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudnAtcHJvZ3Jlc3Mtc2xpZGUnKVxyXG4gICAgICAgIHByb2dyZXNzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBpbnN0YW5jZS4kZWwuY2xhc3NMaXN0LmFkZCgndnAtdmlkZW8tbG9hZHN0YXJ0JylcclxuICAgICAgICAgICAgY29uc3QgbGVmdCA9IGV2ZW50LnBhZ2VYIC0gZmluZEVsUG9zaXRpb24ocHJvZ3Jlc3MpLmxlZnRcclxuICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NXaWR0aCA9IHByb2dyZXNzLm9mZnNldFdpZHRoXHJcbiAgICAgICAgICAgIGNvbnN0IHBlcmNlbnQgPSBsZWZ0IC8gcHJvZ3Jlc3NXaWR0aCAqIDEwMFxyXG4gICAgICAgICAgICBzbGlkZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYHdpZHRoOiAke3BlcmNlbnR9JWApXHJcbiAgICAgICAgICAgIGxldCBkdXJhdGlvbiA9IGluc3RhbmNlLmR1cmF0aW9uKClcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRUaW1lID0gZHVyYXRpb24gKiBwZXJjZW50IC8gMTAwXHJcbiAgICAgICAgICAgIGluc3RhbmNlLmN1cnJlbnRUaW1lKGN1cnJlbnRUaW1lKVxyXG4gICAgICAgICAgICBDb250cm9sQmFyLnNldFRpbWUoY3VycmVudFRpbWUsIGR1cmF0aW9uKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGNvbnN0IGZ1bGxTY3JlZW5CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudnAtY29udHJvbC1iYXJfZnVsbC1zY3JlZW4tYnRuJylcclxuICAgICAgICBmdWxsU2NyZWVuQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZ1bGxTY3JlZW4pIHtcclxuICAgICAgICAgICAgICAgIGV4aXRGdWxsc2NyZWVuKClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RGdWxsc2NyZWVuKGluc3RhbmNlLiRlbClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoRnVsbHNjcmVlbkFwaVsnZnVsbHNjcmVlbmNoYW5nZSddLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzRnVsbHNjcmVlbiA9ICEhZG9jdW1lbnRbRnVsbHNjcmVlbkFwaVsnZnVsbHNjcmVlbkVsZW1lbnQnXV1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Z1bGxzY3JlZW5jaGFuZ2UnKVxyXG4gICAgICAgICAgICBpZiAoaXNGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZ1bGxTY3JlZW4gPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS4kZWwuY2xhc3NMaXN0LmFkZCgndnAtY29udGFpbmVyLWZ1bGwtc2NyZWVuJylcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnVsbFNjcmVlbiA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS4kZWwuY2xhc3NMaXN0LnJlbW92ZSgndnAtY29udGFpbmVyLWZ1bGwtc2NyZWVuJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGZhbHNlKVxyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlkZW8tcGxheWVyJykuYWRkRXZlbnRMaXN0ZW5lcigneDV2aWRlb2V4aXRmdWxsc2NyZWVuJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZ1bGxTY3JlZW4gPSBmYWxzZVxyXG4gICAgICAgICAgICBpbnN0YW5jZS4kZWwuY2xhc3NMaXN0LnJlbW92ZSgndnAtY29udGFpbmVyLWZ1bGwtc2NyZWVuJylcclxuICAgICAgICB9KVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlby1wbGF5ZXInKS5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRlbmRmdWxsc2NyZWVuJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZ1bGxTY3JlZW4gPSBmYWxzZVxyXG4gICAgICAgICAgICBpbnN0YW5jZS4kZWwuY2xhc3NMaXN0LnJlbW92ZSgndnAtY29udGFpbmVyLWZ1bGwtc2NyZWVuJylcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIiwiaW1wb3J0IHsgZm9ybWF0VGltZSwgZmluZEVsUG9zaXRpb24gfSBmcm9tICcuL3V0aWxzJ1xyXG5jbGFzcyBDb250cm9sQmFyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgIHRoaXMuZWwuY2xhc3NOYW1lID0gJ3ZwLWNvbnRyb2wtYmFyJ1xyXG4gICAgICAgIHRoaXMuY3JlYXRlUGxheUJ0bigpXHJcbiAgICAgICAgdGhpcy5jcmVhdGVUaW1lR3JvdXAoKVxyXG4gICAgICAgIHRoaXMuY3JlYXRlUHJvZ3Jlc3MoKVxyXG4gICAgICAgIHRoaXMuY3JlYXRlRnVsbFNjcmVlbkJ0bigpXHJcbiAgICB9XHJcbiAgICBjcmVhdGVQbGF5QnRuKCkge1xyXG4gICAgICAgIGxldCBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcclxuICAgICAgICBkb20uY2xhc3NOYW1lID0gJ3ZwLWNvbnRyb2wtYmFyX3BsYXlidG4nXHJcbiAgICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZChkb20pXHJcbiAgICB9XHJcbiAgICBjcmVhdGVUaW1lR3JvdXAoKSB7XHJcbiAgICAgICAgbGV0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxyXG4gICAgICAgIGRvbS5jbGFzc05hbWUgPSAndnAtY29udHJvbC1iYXJfdGltZWdyb3VwJ1xyXG4gICAgICAgIGRvbS5pbm5lckhUTUwgPVxyXG4gICAgICAgICAgICAnPHNwYW4+MDowMDwvc3Bhbj4mbmJzcDsvJm5ic3A7PHNwYW4gY2xhc3M9XCJ2cC1jb250cm9sLWJhcl90aW1lZ3JvdXBfZHVyYXRpb25cIj4wOjAwPC9zcGFuPidcclxuICAgICAgICB0aGlzLmVsLmFwcGVuZENoaWxkKGRvbSlcclxuICAgICAgICBkb20uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgY3JlYXRlRnVsbFNjcmVlbkJ0bigpIHtcclxuICAgICAgICBsZXQgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXHJcbiAgICAgICAgZG9tLmNsYXNzTmFtZSA9ICd2cC1jb250cm9sLWJhcl9mdWxsLXNjcmVlbi1idG4nXHJcbiAgICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZChkb20pXHJcbiAgICB9XHJcbiAgICBjcmVhdGVQcm9ncmVzcygpIHtcclxuICAgICAgICBsZXQgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXHJcbiAgICAgICAgZG9tLmNsYXNzTmFtZSA9ICd2cC1jb250cm9sLWJhcl9wcm9ncmVzcydcclxuICAgICAgICBkb20uaW5uZXJIVE1MID1cclxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ2cC1jb250cm9sLWJhcl9wcm9ncmVzc19pbm5lclwiPjxkaXYgY2xhc3M9XCJ2cC1wcm9ncmVzcy1sb2FkZWRcIj48L2Rpdj48ZGl2IGNsYXNzPVwidnAtcHJvZ3Jlc3Mtc2xpZGVcIj48L2Rpdj48L2Rpdj4nXHJcbiAgICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZChkb20pXHJcbiAgICAgICAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHNldFRpbWUoY3VycmVudCwgZHVyYXRpb24pIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgICAgICAnLnZwLWNvbnRyb2wtYmFyX3RpbWVncm91cCdcclxuICAgICAgICApLmlubmVySFRNTCA9IGA8c3Bhbj4ke2Zvcm1hdFRpbWUoXHJcbiAgICAgICAgICAgIGN1cnJlbnRcclxuICAgICAgICApfTwvc3Bhbj4mbmJzcDsvJm5ic3A7PHNwYW4gY2xhc3M9XCJ2cC1jb250cm9sLWJhcl90aW1lZ3JvdXBfZHVyYXRpb25cIj4ke2Zvcm1hdFRpbWUoXHJcbiAgICAgICAgICAgIGR1cmF0aW9uXHJcbiAgICAgICAgKX08L3NwYW4+YFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgQ29udHJvbEJhcigpXHJcbiIsImltcG9ydCB7IGlzTTNVOCwgaXNNUDQgfSBmcm9tICcuL3V0aWxzJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWRlbyB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy52aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcclxuICAgICAgICB0aGlzLnZpZGVvLnNldEF0dHJpYnV0ZSgnY3Jvc3NvcmlnaW4nLCAnYW5vbnltb3VzJylcclxuICAgICAgICB0aGlzLnZpZGVvLnNldEF0dHJpYnV0ZSgnaWQnLCAndmlkZW8tcGxheWVyJylcclxuICAgICAgICB0aGlzLnZpZGVvLnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAndHJ1ZScpXHJcbiAgICAgICAgdGhpcy52aWRlby5zZXRBdHRyaWJ1dGUoJ3g1LXZpZGVvLXBsYXllci1mdWxsc2NyZWVuJywgJ3RydWUnKVxyXG4gICAgICAgIHRoaXMudmlkZW8uc2V0QXR0cmlidXRlKCd4NS12aWRlby1wbGF5ZXItdHlwZScsICdoNScpXHJcbiAgICAgICAgdGhpcy52aWRlby5jbGFzc05hbWUgPSAndnAtdmlkZW8nXHJcbiAgICAgICAgaWYgKG9wdGlvbnMudXJsKSB0aGlzLl9zZXRVcmwob3B0aW9ucy51cmwpXHJcbiAgICAgICAgdGhpcy5fYWRkRXZlbnQoKVxyXG4gICAgfVxyXG4gICAgX3NldFVybCh1cmwpIHtcclxuICAgICAgICBpZiAoaXNNM1U4KHVybCkpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5IbHMgJiYgd2luZG93Lkhscy5pc1N1cHBvcnRlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZGluZyA9IHRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMuaGxzID0gbmV3IHdpbmRvdy5IbHMoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5obHMubG9hZFNvdXJjZSh1cmwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhscy5hdHRhY2hNZWRpYSh0aGlzLnZpZGVvKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgbG9hZCB0aGUgaGxzLmpzIGJlZm9yZSB2aWRlbyBpbml0JylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNNUDQodXJsKSkge1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvLnNyYyA9IHVybFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5TdXBwb3J0IHZpZGVvIHVybCcpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY3VycmVudFRpbWUodGltZSkge1xyXG4gICAgICAgIGlmICghdGltZSAmJiB0aW1lICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpZGVvICYmIHRoaXMudmlkZW8uY3VycmVudFRpbWUgfHwgMFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGltZSAhPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY3VycmVudFRpbWUgc2hvdWxkIGJlIG51bWJlcicpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy52aWRlby5jdXJyZW50VGltZSA9IHRpbWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkdXJhdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52aWRlbyAmJiB0aGlzLnZpZGVvLmR1cmF0aW9uIHx8IDBcclxuICAgIH1cclxuICAgIHBsYXkoKSB7XHJcbiAgICAgICAgdGhpcy52aWRlbyAmJiB0aGlzLnZpZGVvLnBsYXkoKVxyXG4gICAgfVxyXG4gICAgcGF1c2UoKSB7XHJcbiAgICAgICAgdGhpcy52aWRlbyAmJiB0aGlzLnZpZGVvLnBhdXNlKClcclxuICAgIH1cclxuICAgIHRvZ2dsZSgpIHtcclxuICAgICAgICBpZiAodGhpcy52aWRlby5wYXVzZWQgPT09IHRydWUpIHRoaXMucGxheSgpXHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy52aWRlby5wYXVzZWQgPT09IGZhbHNlKSB0aGlzLnBhdXNlKClcclxuICAgIH1cclxuICAgIF9hZGRFdmVudCgpIHtcclxuICAgICAgICBsZXQgZXZlbnRBcnIgPSBbJ3BsYXknLCAncGF1c2UnLCAnbG9hZHN0YXJ0JywgJ2xvYWRlZGRhdGEnLCAncHJvZ3Jlc3MnLCAnY2FucGxheScsICd0aW1ldXBkYXRlJywgJ2VuZGVkJ11cclxuICAgICAgICBldmVudEFyci5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoaXRlbSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpc1snX29uJysgaXRlbV0oKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBfb25wbGF5KCkge31cclxuICAgIF9vbnBhdXNlKCkge31cclxuICAgIF9vbmxvYWRzdGFydCgpIHt9XHJcbiAgICBfb25sb2FkZWRkYXRhKCkge31cclxuICAgIF9vbnByb2dyZXNzKCkge31cclxuICAgIF9vbmNhbnBsYXkoKSB7fVxyXG4gICAgX29udGltZXVwZGF0ZSgpIHt9XHJcbiAgICBfb25lbmRlZCgpIHt9XHJcbn0iLCJpbXBvcnQgeyBjdWJlIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCBWaWRlbyBmcm9tICcuL3ZpZGVvJ1xuaW1wb3J0IENvbnRyb2xCYXIgZnJvbSAnLi9Db250cm9sQmFyJ1xuaW1wb3J0IEV2ZW50TWFuYWdlIGZyb20gJy4vZXZlbnRNYW5hZ2UnXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWRlb1BsYXllciBleHRlbmRzIFZpZGVvIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuQ29udHJvbEJhciA9IENvbnRyb2xCYXIgLy8g5o6n5Yi25Y+wXG4gICAgICAgIHRoaXMuJGVsID0gb3B0aW9ucy5lbCB8fCBkb2N1bWVudC5ib2R5XG4gICAgICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoJ3ZwLWNvbnRhaW5lcicpXG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZENoaWxkKHRoaXMudmlkZW8pXG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZENoaWxkKGNyZWF0ZVBhdXNlQnV0dG9uKCkpXG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZENoaWxkKGNyZWF0ZUxvYWRpbmdCdXR0b24oKSlcbiAgICAgICAgdGhpcy4kZWwuYXBwZW5kQ2hpbGQoQ29udHJvbEJhci5lbClcbiAgICAgICAgdGhpcy5ldmVudE1hbmFnZSA9IG5ldyBFdmVudE1hbmFnZSh0aGlzKVxuICAgIH1cbiAgICBfb25Db250YWluZXJPdmVyKGV2ZW50KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcilcbiAgICAgICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZCgndnAtY29udGFpbmVyLW92ZXInKVxuICAgICAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kZWwuY2xhc3NMaXN0LnJlbW92ZSgndnAtY29udGFpbmVyLW92ZXInKVxuICAgICAgICB9LCAzMDAwKVxuICAgIH1cbiAgICBfb25wbGF5KCkge1xuICAgICAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKCd2cC12aWRlby1wbGF5aW5nJylcbiAgICB9XG4gICAgX29ucGF1c2UoKSB7XG4gICAgICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3ZwLXZpZGVvLXBsYXlpbmcnKVxuICAgIH1cbiAgICBfb25sb2Fkc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoJ3ZwLXZpZGVvLWxvYWRzdGFydCcpXG4gICAgfVxuICAgIF9vbmxvYWRlZGRhdGEoKSB7XG4gICAgICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3ZwLXZpZGVvLWxvYWRzdGFydCcpXG4gICAgfVxuICAgIF9vbnRpbWV1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMuQ29udHJvbEJhci5zZXRUaW1lKHRoaXMuY3VycmVudFRpbWUoKSwgdGhpcy5kdXJhdGlvbigpKVxuICAgIH1cbiAgICBfb25jYW5wbGF5KCkge1xuICAgICAgICB0aGlzLiRlbC5jbGFzc0xpc3QucmVtb3ZlKCd2cC12aWRlby1sb2Fkc3RhcnQnKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlUGF1c2VCdXR0b24oKSB7XG4gICAgbGV0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgZWwuY2xhc3NOYW1lID0gJ3ZwLWNvbnRhaW5lci1jZW50ZXItYnV0dG9uIHZwLWNvbnRhaW5lci1wYXVzZS1idXR0b24nXG4gICAgZWwuaW5uZXJIVE1MID0gJyYjeGU2MDc7J1xuICAgIHJldHVybiBlbFxufVxuZnVuY3Rpb24gY3JlYXRlTG9hZGluZ0J1dHRvbigpIHtcbiAgICBsZXQgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBlbC5jbGFzc05hbWUgPSAndnAtY29udGFpbmVyLWNlbnRlci1idXR0b24gdnAtY29udGFpbmVyLWxvYWRpbmctYnV0dG9uJ1xuICAgIGVsLmlubmVySFRNTCA9ICcmI3hlNjBhOydcbiAgICByZXR1cm4gZWxcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=