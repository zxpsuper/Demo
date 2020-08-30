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
      var slide = document.querySelector('.vp-progress-slide');
      var percent = current / duration * 100;
      slide.setAttribute('style', "width: ".concat(percent, "%"));
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
      this.$el.classList.remove('vp-video-loadstart');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Z1bGxzY3JlZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL3NyYy9zYXNzL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LXNlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Nhc3MvaW5kZXguc2Nzcz9lODg1Iiwid2VicGFjazovLy8uL3NyYy9ldmVudE1hbmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29udHJvbEJhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlkZW8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImlzTTNVOCIsInVybCIsIkVycm9yIiwidGVzdCIsImlzTVA0IiwidG9Mb3dlckNhc2UiLCJmb3JtYXRUaW1lIiwidGltZSIsInMiLCJwYWQiLCJNYXRoIiwiZmxvb3IiLCJtIiwibnVtIiwibiIsImlzVW5kZWZpbmVkIiwiU3RyaW5nIiwibGVuZ3RoIiwib2JqIiwiZmluZEVsUG9zaXRpb24iLCJlbCIsImJveCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInBhcmVudE5vZGUiLCJsZWZ0IiwidG9wIiwiZG9jRWwiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImJvZHkiLCJjbGllbnRMZWZ0Iiwic2Nyb2xsTGVmdCIsIndpbmRvdyIsInBhZ2VYT2Zmc2V0IiwiY2xpZW50VG9wIiwic2Nyb2xsVG9wIiwicGFnZVlPZmZzZXQiLCJyb3VuZCIsInJlcXVlc3RGdWxsc2NyZWVuIiwiZWxlbSIsIndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidG9VcHBlckNhc2UiLCJpbmRleE9mIiwiRWxlbWVudCIsIkFMTE9XX0tFWUJPQVJEX0lOUFVUIiwibW96UmVxdWVzdEZ1bGxTY3JlZW4iLCJleGl0RnVsbHNjcmVlbiIsIndlYmtpdENhbmNlbEZ1bGxTY3JlZW4iLCJtb3pDYW5jZWxGdWxsU2NyZWVuIiwiZnVsbHNjcmVlbiIsIndlYmtpdElzRnVsbFNjcmVlbiIsIm1vekZ1bGxTY3JlZW4iLCJwYXJzZVVybFBhcmFtIiwicGFyYW1zU3RyIiwiZXhlYyIsInBhcmFtc0FyciIsInNwbGl0IiwicGFyYW1zT2JqIiwiZm9yRWFjaCIsInBhcmFtIiwia2V5IiwidmFsIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicGFyc2VGbG9hdCIsImNvbmNhdCIsIkZ1bGxzY3JlZW5BcGkiLCJhcGlNYXAiLCJzcGVjQXBpIiwiYnJvd3NlckFwaSIsImkiLCJvbmxvYWQiLCJjb25zb2xlIiwibG9nIiwibG9jYXRpb24iLCJocmVmIiwiYWxlcnQiLCJWaWRlb1BsYXllciIsImdldEVsZW1lbnRCeUlkIiwiYXRvYiIsInN1cHBvcnRzRnVsbHNjcmVlbiIsIkV2ZW50TWFuYWdlIiwiaW5zdGFuY2UiLCJmdWxsU2NyZWVuIiwiaW5pdCIsIkNvbnRyb2xCYXIiLCIkZWwiLCJhZGRFdmVudExpc3RlbmVyIiwidG9nZ2xlIiwiX29uQ29udGFpbmVyT3ZlciIsInByb2dyZXNzIiwicXVlcnlTZWxlY3RvciIsInNsaWRlIiwiZXZlbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJwYWdlWCIsInByb2dyZXNzV2lkdGgiLCJvZmZzZXRXaWR0aCIsInBlcmNlbnQiLCJzZXRBdHRyaWJ1dGUiLCJkdXJhdGlvbiIsImN1cnJlbnRUaW1lIiwic2V0VGltZSIsImZ1bGxTY3JlZW5CdG4iLCJzdG9wUHJvcGFnYXRpb24iLCJpc0Z1bGxzY3JlZW4iLCJyZW1vdmUiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiY3JlYXRlUGxheUJ0biIsImNyZWF0ZVRpbWVHcm91cCIsImNyZWF0ZVByb2dyZXNzIiwiY3JlYXRlRnVsbFNjcmVlbkJ0biIsImRvbSIsImFwcGVuZENoaWxkIiwiaW5uZXJIVE1MIiwiY3VycmVudCIsIlZpZGVvIiwib3B0aW9ucyIsInZpZGVvIiwiX3NldFVybCIsIl9hZGRFdmVudCIsIkhscyIsImlzU3VwcG9ydGVkIiwicmVsb2FkaW5nIiwiaGxzIiwibG9hZFNvdXJjZSIsImF0dGFjaE1lZGlhIiwic3JjIiwicGxheSIsInBhdXNlIiwicGF1c2VkIiwiZXZlbnRBcnIiLCJpdGVtIiwiY3JlYXRlUGF1c2VCdXR0b24iLCJjcmVhdGVMb2FkaW5nQnV0dG9uIiwiZXZlbnRNYW5hZ2UiLCJjbGVhclRpbWVvdXQiLCJfdGltZXIiLCJzZXRUaW1lb3V0Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxXQUFXLEVBQUU7QUFDckQsd0NBQXdDLFdBQVcsRUFBRTs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxzQ0FBc0M7QUFDdEMsR0FBRztBQUNIO0FBQ0EsOERBQThEO0FBQzlEOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEZBOzs7O0FBSU8sU0FBU0EsTUFBVCxDQUFnQkMsR0FBaEIsRUFBcUI7QUFDeEIsTUFBSSxPQUFPQSxHQUFQLEtBQWUsUUFBbkIsRUFBNkI7QUFDekIsVUFBTSxJQUFJQyxLQUFKLENBQVUscUNBQVYsQ0FBTjtBQUNIOztBQUNELFNBQU8sVUFBVUMsSUFBVixDQUFlRixHQUFmLENBQVA7QUFDSDtBQUNEOzs7OztBQUlPLFNBQVNHLEtBQVQsQ0FBZUgsR0FBZixFQUFvQjtBQUN2QixNQUFJLE9BQU9BLEdBQVAsS0FBZSxRQUFuQixFQUE2QjtBQUN6QixVQUFNLElBQUlDLEtBQUosQ0FBVSxxQ0FBVixDQUFOO0FBQ0g7O0FBQ0RELEtBQUcsR0FBR0EsR0FBRyxDQUFDSSxXQUFKLEVBQU47QUFDQSxTQUFPLFNBQVNGLElBQVQsQ0FBY0YsR0FBZCxDQUFQO0FBQ0g7QUFDRDs7Ozs7QUFJTyxTQUFTSyxVQUFULENBQW9CQyxJQUFwQixFQUEwQjtBQUM3QkEsTUFBSSxHQUFHQSxJQUFJLEdBQUcsQ0FBUCxHQUFXLENBQVgsR0FBZUEsSUFBdEI7QUFDQSxNQUFNQyxDQUFDLEdBQUdDLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDQyxLQUFMLENBQVdKLElBQUksR0FBRyxFQUFsQixDQUFELENBQWI7QUFDQSxNQUFNSyxDQUFDLEdBQUdILEdBQUcsQ0FBQ0MsSUFBSSxDQUFDQyxLQUFMLENBQVdKLElBQUksR0FBRyxFQUFsQixDQUFELENBQWI7QUFDQSxtQkFBVUssQ0FBVixjQUFlSixDQUFmO0FBQ0g7QUFDTSxTQUFTQyxHQUFULENBQWFJLEdBQWIsRUFBa0JDLENBQWxCLEVBQXFCO0FBQ3hCQSxHQUFDLEdBQUdDLFdBQVcsQ0FBQ0QsQ0FBRCxDQUFYLEdBQWlCLENBQWpCLEdBQXFCLENBQUNBLENBQTFCO0FBQ0FELEtBQUcsR0FBR0csTUFBTSxDQUFDSCxHQUFELENBQVo7O0FBQ0EsU0FBT0EsR0FBRyxDQUFDSSxNQUFKLEdBQWFILENBQXBCLEVBQXVCO0FBQ25CRCxPQUFHLEdBQUcsTUFBTUEsR0FBWjtBQUNIOztBQUNELFNBQU9BLEdBQVA7QUFDSDtBQUNEOzs7OztBQUlPLFNBQVNFLFdBQVQsQ0FBcUJHLEdBQXJCLEVBQTBCO0FBQzdCLFNBQU8sS0FBSyxDQUFMLEtBQVdBLEdBQWxCO0FBQ0g7QUFFTSxTQUFTQyxjQUFULENBQXdCQyxFQUF4QixFQUE0QjtBQUMvQixNQUFJQyxHQUFKOztBQUVBLE1BQUlELEVBQUUsQ0FBQ0UscUJBQUgsSUFBNEJGLEVBQUUsQ0FBQ0csVUFBbkMsRUFBK0M7QUFDM0NGLE9BQUcsR0FBR0QsRUFBRSxDQUFDRSxxQkFBSCxFQUFOO0FBQ0g7O0FBRUQsTUFBSSxDQUFDRCxHQUFMLEVBQVU7QUFDTixXQUFPO0FBQ0hHLFVBQUksRUFBRSxDQURIO0FBRUhDLFNBQUcsRUFBRTtBQUZGLEtBQVA7QUFJSDs7QUFFRCxNQUFNQyxLQUFLLEdBQUdDLFFBQVEsQ0FBQ0MsZUFBdkI7QUFDQSxNQUFNQyxJQUFJLEdBQUdGLFFBQVEsQ0FBQ0UsSUFBdEI7QUFFQSxNQUFNQyxVQUFVLEdBQUdKLEtBQUssQ0FBQ0ksVUFBTixJQUFvQkQsSUFBSSxDQUFDQyxVQUF6QixJQUF1QyxDQUExRDtBQUNBLE1BQU1DLFVBQVUsR0FBR0MsTUFBTSxDQUFDQyxXQUFQLElBQXNCSixJQUFJLENBQUNFLFVBQTlDO0FBQ0EsTUFBTVAsSUFBSSxHQUFHSCxHQUFHLENBQUNHLElBQUosR0FBV08sVUFBWCxHQUF3QkQsVUFBckM7QUFFQSxNQUFNSSxTQUFTLEdBQUdSLEtBQUssQ0FBQ1EsU0FBTixJQUFtQkwsSUFBSSxDQUFDSyxTQUF4QixJQUFxQyxDQUF2RDtBQUNBLE1BQU1DLFNBQVMsR0FBR0gsTUFBTSxDQUFDSSxXQUFQLElBQXNCUCxJQUFJLENBQUNNLFNBQTdDO0FBQ0EsTUFBTVYsR0FBRyxHQUFHSixHQUFHLENBQUNJLEdBQUosR0FBVVUsU0FBVixHQUFzQkQsU0FBbEMsQ0F2QitCLENBeUIvQjs7QUFDQSxTQUFPO0FBQ0hWLFFBQUksRUFBRWQsSUFBSSxDQUFDMkIsS0FBTCxDQUFXYixJQUFYLENBREg7QUFFSEMsT0FBRyxFQUFFZixJQUFJLENBQUMyQixLQUFMLENBQVdaLEdBQVg7QUFGRixHQUFQO0FBSUg7QUFDRDs7Ozs7QUFJTyxTQUFTYSxpQkFBVCxDQUEyQkMsSUFBM0IsRUFBaUM7QUFDcEMsTUFBSUEsSUFBSSxDQUFDRCxpQkFBVCxFQUE0QjtBQUN4QkMsUUFBSSxDQUFDRCxpQkFBTDtBQUNILEdBRkQsTUFFTyxJQUFJQyxJQUFJLENBQUNDLHVCQUFULEVBQWtDO0FBQ3JDO0FBQ0E7QUFDQSxRQUFJUixNQUFNLENBQUNTLFNBQVAsQ0FBaUJDLFNBQWpCLENBQTJCQyxXQUEzQixHQUF5Q0MsT0FBekMsQ0FBaUQsUUFBakQsS0FBOEQsQ0FBbEUsRUFBcUU7QUFDakVMLFVBQUksQ0FBQ0MsdUJBQUwsQ0FBNkJLLE9BQU8sQ0FBQ0Msb0JBQXJDO0FBQ0gsS0FGRCxDQUdBO0FBSEEsU0FJSztBQUNEUCxZQUFJLENBQUNDLHVCQUFMO0FBQ0g7QUFDSixHQVZNLE1BVUEsSUFBSUQsSUFBSSxDQUFDUSxvQkFBVCxFQUErQjtBQUNsQ1IsUUFBSSxDQUFDUSxvQkFBTDtBQUNIO0FBQ0o7QUFFRDs7OztBQUdPLFNBQVNDLGNBQVQsR0FBMEI7QUFDN0IsTUFBSXJCLFFBQVEsQ0FBQ3FCLGNBQWIsRUFBNkI7QUFDekJyQixZQUFRLENBQUNxQixjQUFUO0FBQ0gsR0FGRCxNQUVPLElBQUlyQixRQUFRLENBQUNzQixzQkFBYixFQUFxQztBQUN4Q3RCLFlBQVEsQ0FBQ3NCLHNCQUFUO0FBQ0gsR0FGTSxNQUVBLElBQUl0QixRQUFRLENBQUN1QixtQkFBYixFQUFrQztBQUNyQ3ZCLFlBQVEsQ0FBQ3VCLG1CQUFUO0FBQ0g7QUFDSjtBQUVEOzs7O0FBR08sU0FBU0MsVUFBVCxHQUFzQjtBQUN6QixTQUNJeEIsUUFBUSxDQUFDd0IsVUFBVCxJQUNBeEIsUUFBUSxDQUFDeUIsa0JBRFQsSUFFQXpCLFFBQVEsQ0FBQzBCLGFBRlQsSUFHQSxLQUpKO0FBTUg7QUFFRDs7Ozs7QUFJTyxTQUFTQyxhQUFULENBQXVCckQsR0FBdkIsRUFBNEI7QUFDL0IsTUFBTXNELFNBQVMsR0FBRyxZQUFZQyxJQUFaLENBQWlCdkQsR0FBakIsRUFBc0IsQ0FBdEIsQ0FBbEIsQ0FEK0IsQ0FDYTs7QUFDNUMsTUFBTXdELFNBQVMsR0FBR0YsU0FBUyxDQUFDRyxLQUFWLENBQWdCLEdBQWhCLENBQWxCLENBRitCLENBRVM7O0FBQ3hDLE1BQUlDLFNBQVMsR0FBRyxFQUFoQixDQUgrQixDQUkvQjs7QUFDQUYsV0FBUyxDQUFDRyxPQUFWLENBQWtCLFVBQUFDLEtBQUssRUFBSTtBQUN6QixRQUFJLElBQUkxRCxJQUFKLENBQVMwRCxLQUFULENBQUosRUFBcUI7QUFDbkI7QUFEbUIseUJBRUZBLEtBQUssQ0FBQ0gsS0FBTixDQUFZLEdBQVosQ0FGRTtBQUFBO0FBQUEsVUFFZEksR0FGYztBQUFBLFVBRVRDLEdBRlMscUJBRWdCOzs7QUFDbkNBLFNBQUcsR0FBR0Msa0JBQWtCLENBQUNELEdBQUQsQ0FBeEIsQ0FIbUIsQ0FHWTs7QUFDL0JBLFNBQUcsR0FBRyxRQUFRNUQsSUFBUixDQUFhNEQsR0FBYixJQUFvQkUsVUFBVSxDQUFDRixHQUFELENBQTlCLEdBQXNDQSxHQUE1QyxDQUptQixDQUk4Qjs7QUFFakQsVUFBSUosU0FBUyxDQUFDRyxHQUFkLEVBQW1CO0FBQ2pCO0FBQ0FILGlCQUFTLENBQUNHLEdBQUQsQ0FBVCxHQUFpQixHQUFHSSxNQUFILENBQVVQLFNBQVMsQ0FBQ0csR0FBRCxDQUFuQixFQUEwQkMsR0FBMUIsQ0FBakI7QUFDRCxPQUhELE1BR087QUFDTDtBQUNBSixpQkFBUyxDQUFDRyxHQUFELENBQVQsR0FBaUJDLEdBQWpCO0FBQ0Q7QUFDRixLQWJELE1BYU87QUFDTDtBQUNBSixlQUFTLENBQUNFLEtBQUQsQ0FBVCxHQUFtQixJQUFuQjtBQUNEO0FBQ0YsR0FsQkQ7QUFvQkEsU0FBT0YsU0FBUDtBQUNELEM7Ozs7Ozs7Ozs7OztBQzNKSDtBQUFBO0FBRUE7QUFFQSxJQUFNUSxhQUFhLEdBQUcsRUFBdEIsQyxDQUVBOztBQUNBLElBQU1DLE1BQU0sR0FBRyxDQUNiLENBQ0UsbUJBREYsRUFFRSxnQkFGRixFQUdFLG1CQUhGLEVBSUUsbUJBSkYsRUFLRSxrQkFMRixFQU1FLGlCQU5GLENBRGEsRUFTYjtBQUNBLENBQ0UseUJBREYsRUFFRSxzQkFGRixFQUdFLHlCQUhGLEVBSUUseUJBSkYsRUFLRSx3QkFMRixFQU1FLHVCQU5GLENBVmEsRUFrQmI7QUFDQSxDQUNFLHlCQURGLEVBRUUsd0JBRkYsRUFHRSxnQ0FIRixFQUlFLHdCQUpGLEVBS0Usd0JBTEYsRUFNRSx1QkFORixDQW5CYSxFQTJCYjtBQUNBLENBQ0Usc0JBREYsRUFFRSxxQkFGRixFQUdFLHNCQUhGLEVBSUUsc0JBSkYsRUFLRSxxQkFMRixFQU1FLG9CQU5GLENBNUJhLEVBb0NiO0FBQ0EsQ0FDRSxxQkFERixFQUVFLGtCQUZGLEVBR0UscUJBSEYsRUFJRSxxQkFKRixFQUtFLG9CQUxGLEVBTUUsbUJBTkYsQ0FyQ2EsQ0FBZjtBQStDQSxJQUFNQyxPQUFPLEdBQUdELE1BQU0sQ0FBQyxDQUFELENBQXRCO0FBQ0EsSUFBSUUsVUFBSixDLENBRUE7O0FBQ0EsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSCxNQUFNLENBQUNuRCxNQUEzQixFQUFtQ3NELENBQUMsRUFBcEMsRUFBd0M7QUFDdEM7QUFDQSxNQUFJSCxNQUFNLENBQUNHLENBQUQsQ0FBTixDQUFVLENBQVYsS0FBZ0I1QyxRQUFwQixFQUE4QjtBQUM1QjJDLGNBQVUsR0FBR0YsTUFBTSxDQUFDRyxDQUFELENBQW5CO0FBQ0E7QUFDRDtBQUNGLEMsQ0FFRDs7O0FBQ0EsSUFBSUQsVUFBSixFQUFnQjtBQUNkLE9BQUssSUFBSUMsRUFBQyxHQUFHLENBQWIsRUFBZ0JBLEVBQUMsR0FBR0QsVUFBVSxDQUFDckQsTUFBL0IsRUFBdUNzRCxFQUFDLEVBQXhDLEVBQTRDO0FBQzFDSixpQkFBYSxDQUFDRSxPQUFPLENBQUNFLEVBQUQsQ0FBUixDQUFiLEdBQTRCRCxVQUFVLENBQUNDLEVBQUQsQ0FBdEM7QUFDRDtBQUNGOztBQUVjSiw0RUFBZixFOzs7Ozs7Ozs7OztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGdCQUFnQjtBQUNuRCxJQUFJO0FBQ0o7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0JBQW9CO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxjQUFjOztBQUVsRTtBQUNBOzs7Ozs7Ozs7Ozs7QUMzRUEsMkJBQTJCLG1CQUFPLENBQUMsMkRBQStDO0FBQ2xGOzs7QUFHQTtBQUNBLGNBQWMsUUFBUyxzQkFBc0IsY0FBYyw4QkFBOEIsNkZBQTZGLDhaQUE4WixHQUFHLGlDQUFpQyw2QkFBNkIsR0FBRyxzRUFBc0UsNkJBQTZCLEdBQUcscUVBQXFFLDZCQUE2QixHQUFHLDJFQUEyRSw2QkFBNkIsR0FBRyw2Q0FBNkMscUJBQXFCLEdBQUcseUNBQXlDLDZCQUE2QixHQUFHLDRHQUE0Ryw2QkFBNkIsR0FBRywwQ0FBMEMsNkJBQTZCLEdBQUcsa0ZBQWtGLDZCQUE2QixHQUFHLG1CQUFtQiwyQkFBMkIsdUJBQXVCLHFCQUFxQixnQkFBZ0IsR0FBRywrQkFBK0IsdUJBQXVCLGFBQWEsY0FBYyw4QkFBOEIsb0JBQW9CLEdBQUcsOEJBQThCLHFDQUFxQyx1QkFBdUIsOEJBQThCLHVCQUF1QixvQkFBb0IsR0FBRyxnQ0FBZ0Msa0JBQWtCLHVCQUF1QixnQkFBZ0Isc0JBQXNCLHVCQUF1QixtQ0FBbUMsNkJBQTZCLHdDQUF3QyxzQ0FBc0MsR0FBRyxtR0FBbUcsNkJBQTZCLEdBQUcsc0RBQXNELG1CQUFtQixHQUFHLGVBQWUsZ0JBQWdCLGlCQUFpQixHQUFHLHFCQUFxQixnQkFBZ0IsaUJBQWlCLHVCQUF1QixrQkFBa0IseUJBQXlCLGtCQUFrQiw4QkFBOEIsOEJBQThCLEdBQUcsMkJBQTJCLGdCQUFnQixpQkFBaUIsa0JBQWtCLDRCQUE0Qix3QkFBd0Isb0JBQW9CLEdBQUcsbUNBQW1DLHdCQUF3Qiw4QkFBOEIsb0JBQW9CLEdBQUcsNkJBQTZCLGtCQUFrQixpQkFBaUIsb0JBQW9CLHdCQUF3QixHQUFHLDRCQUE0QixZQUFZLGtCQUFrQix3QkFBd0IsMkJBQTJCLEdBQUcsa0NBQWtDLFlBQVksZ0JBQWdCLHVCQUF1Qiw4QkFBOEIsb0JBQW9CLHVCQUF1QixHQUFHLHFEQUFxRCx1QkFBdUIsWUFBWSw4QkFBOEIsZ0JBQWdCLHVCQUF1QixHQUFHLDREQUE0RCx3QkFBd0IsdUJBQXVCLGNBQWMsZ0JBQWdCLEdBQUcsbUNBQW1DLGdCQUFnQixpQkFBaUIsa0JBQWtCLDRCQUE0Qix3QkFBd0Isb0JBQW9CLEdBQUcsMENBQTBDLHdCQUF3Qiw4QkFBOEIsb0JBQW9CLG9CQUFvQixHQUFHLHdDQUF3QyxjQUFjLFlBQVksR0FBRyx1REFBdUQsd0JBQXdCLEdBQUcsc0VBQXNFLHdCQUF3QixHQUFHLCtCQUErQixVQUFVLDJCQUEyQixLQUFLLFFBQVEsZ0NBQWdDLEtBQUssR0FBRzs7QUFFam5JOzs7Ozs7Ozs7Ozs7O0FDUEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7QUFDQW5DLE1BQU0sQ0FBQ3dDLE1BQVAsR0FBZ0IsWUFBVztBQUN2QkMsU0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVEsQ0FBQ0MsSUFBckI7QUFDQSxNQUFJM0UsR0FBRyxHQUFHcUQsNERBQWEsQ0FBQ3FCLFFBQVEsQ0FBQ0MsSUFBVixDQUFiLENBQTZCM0UsR0FBdkM7O0FBQ0EsTUFBSSxDQUFDQSxHQUFMLEVBQVU7QUFDTjRFLFNBQUssQ0FBQyxRQUFELENBQUw7QUFDSCxHQUZELE1BRU87QUFDSCxRQUFJQyw4Q0FBSixDQUFnQjtBQUNaMUQsUUFBRSxFQUFFTyxRQUFRLENBQUNvRCxjQUFULENBQXdCLE9BQXhCLENBRFE7QUFFWjtBQUNBO0FBQ0E5RSxTQUFHLEVBQUUrRSxJQUFJLENBQUMvRSxHQUFEO0FBSkcsS0FBaEI7QUFNSDtBQUNKLENBYkQsQzs7Ozs7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBLGNBQWMsbUJBQU8sQ0FBQyxvQkFBUTs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQixtQkFBbUI7QUFDcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLHNCQUFzQjtBQUN2Qzs7QUFFQTtBQUNBLG1CQUFtQiwyQkFBMkI7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsbUJBQW1CO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsMkJBQTJCO0FBQzVDO0FBQ0E7O0FBRUEsUUFBUSx1QkFBdUI7QUFDL0I7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxpQkFBaUIsdUJBQXVCO0FBQ3hDO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYzs7QUFFZCxrREFBa0Qsc0JBQXNCO0FBQ3hFO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0EsS0FBSyxLQUF3QyxFQUFFLEVBRTdDOztBQUVGLFFBQVEsc0JBQWlCO0FBQ3pCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDs7QUFFQSw2QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7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QkFBVCxHQUE2QjtBQUN6QixNQUFJcEgsRUFBRSxHQUFHTyxRQUFRLENBQUNrRixhQUFULENBQXVCLE1BQXZCLENBQVQ7QUFDQXpGLElBQUUsQ0FBQzBGLFNBQUgsR0FBZSxzREFBZjtBQUNBMUYsSUFBRSxDQUFDaUcsU0FBSCxHQUFlLFVBQWY7QUFDQSxTQUFPakcsRUFBUDtBQUNIOztBQUNELFNBQVNxSCxtQkFBVCxHQUErQjtBQUMzQixNQUFJckgsRUFBRSxHQUFHTyxRQUFRLENBQUNrRixhQUFULENBQXVCLE1BQXZCLENBQVQ7QUFDQXpGLElBQUUsQ0FBQzBGLFNBQUgsR0FBZSx3REFBZjtBQUNBMUYsSUFBRSxDQUFDaUcsU0FBSCxHQUFlLFVBQWY7QUFDQSxTQUFPakcsRUFBUDtBQUNILEMiLCJmaWxlIjoianMvaW5kZXguZDdiZmUyZGMzMWZjMWZmY2EyYjUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCJUTXhFXCIpO1xuIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC98XFxzKiQpL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG4iLCIvKipcbiAqIOWIpOaWreaYr+WQpuS4um0zdThcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc00zVTgodXJsKSB7XG4gICAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHZpZGVvIHVybCBzaG91bGQgYmUgc3RyaW5nIHR5cGUnKVxuICAgIH1cbiAgICByZXR1cm4gL1xcLm0zdTgkLy50ZXN0KHVybClcbn1cbi8qKlxuICog5Yik5pat5piv5ZCm5Li6bXA0XG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNNUDQodXJsKSB7XG4gICAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHZpZGVvIHVybCBzaG91bGQgYmUgc3RyaW5nIHR5cGUnKVxuICAgIH1cbiAgICB1cmwgPSB1cmwudG9Mb3dlckNhc2UoKVxuICAgIHJldHVybiAvXFwubXA0JC8udGVzdCh1cmwpXG59XG4vKipcbiAqIOagvOW8j+WMluaXtumXtOS4uuWIhumSn+W9ouW8jzAwOjAwXG4gKiBAcGFyYW0ge251bWJlcn0gdGltZSBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFRpbWUodGltZSkge1xuICAgIHRpbWUgPSB0aW1lIDwgMCA/IDAgOiB0aW1lXG4gICAgY29uc3QgcyA9IHBhZChNYXRoLmZsb29yKHRpbWUgJSA2MCkpXG4gICAgY29uc3QgbSA9IHBhZChNYXRoLmZsb29yKHRpbWUgLyA2MCkpXG4gICAgcmV0dXJuIGAke219OiR7c31gXG59XG5leHBvcnQgZnVuY3Rpb24gcGFkKG51bSwgbikge1xuICAgIG4gPSBpc1VuZGVmaW5lZChuKSA/IDIgOiArblxuICAgIG51bSA9IFN0cmluZyhudW0pXG4gICAgd2hpbGUgKG51bS5sZW5ndGggPCBuKSB7XG4gICAgICAgIG51bSA9ICcwJyArIG51bVxuICAgIH1cbiAgICByZXR1cm4gbnVtXG59XG4vKipcbiAqIOaYr+WQpuS4unVuZGVmaW5kZWRcbiAqIEBwYXJhbSB7YW55fSBvYmogXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1VuZGVmaW5lZChvYmopIHtcbiAgICByZXR1cm4gdm9pZCAwID09PSBvYmpcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRFbFBvc2l0aW9uKGVsKSB7XG4gICAgbGV0IGJveFxuXG4gICAgaWYgKGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCAmJiBlbC5wYXJlbnROb2RlKSB7XG4gICAgICAgIGJveCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgfVxuXG4gICAgaWYgKCFib3gpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBkb2NFbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5XG5cbiAgICBjb25zdCBjbGllbnRMZWZ0ID0gZG9jRWwuY2xpZW50TGVmdCB8fCBib2R5LmNsaWVudExlZnQgfHwgMFxuICAgIGNvbnN0IHNjcm9sbExlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgYm9keS5zY3JvbGxMZWZ0XG4gICAgY29uc3QgbGVmdCA9IGJveC5sZWZ0ICsgc2Nyb2xsTGVmdCAtIGNsaWVudExlZnRcblxuICAgIGNvbnN0IGNsaWVudFRvcCA9IGRvY0VsLmNsaWVudFRvcCB8fCBib2R5LmNsaWVudFRvcCB8fCAwXG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGJvZHkuc2Nyb2xsVG9wXG4gICAgY29uc3QgdG9wID0gYm94LnRvcCArIHNjcm9sbFRvcCAtIGNsaWVudFRvcFxuXG4gICAgLy8gQW5kcm9pZCBzb21ldGltZXMgcmV0dXJucyBzbGlnaHRseSBvZmYgZGVjaW1hbCB2YWx1ZXMsIHNvIG5lZWQgdG8gcm91bmRcbiAgICByZXR1cm4ge1xuICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKGxlZnQpLFxuICAgICAgICB0b3A6IE1hdGgucm91bmQodG9wKSxcbiAgICB9XG59XG4vKipcbiAqIOWFqOWxj1xuICogQHBhcmFtIHtkb219IGVsZW0gXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXF1ZXN0RnVsbHNjcmVlbihlbGVtKSB7XG4gICAgaWYgKGVsZW0ucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgZWxlbS5yZXF1ZXN0RnVsbHNjcmVlbigpXG4gICAgfSBlbHNlIGlmIChlbGVtLndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuKSB7XG4gICAgICAgIC8vIOWvuSBDaHJvbWUg54m55q6K5aSE55CG77yMXG4gICAgICAgIC8vIOWPguaVsCBFbGVtZW50LkFMTE9XX0tFWUJPQVJEX0lOUFVUIOS9v+WFqOWxj+eKtuaAgeS4reWPr+S7pemUruebmOi+k+WFpeOAglxuICAgICAgICBpZiAod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9VcHBlckNhc2UoKS5pbmRleE9mKCdDSFJPTUUnKSA+PSAwKSB7XG4gICAgICAgICAgICBlbGVtLndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuKEVsZW1lbnQuQUxMT1dfS0VZQk9BUkRfSU5QVVQpXG4gICAgICAgIH1cbiAgICAgICAgLy8gU2FmYXJpIOa1j+iniOWZqOS4re+8jOWmguaenOaWueazleWGheacieWPguaVsO+8jOWImSBGdWxsc2NyZWVuIOWKn+iDveS4jeWPr+eUqOOAglxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVsZW0ud2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4oKVxuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChlbGVtLm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XG4gICAgICAgIGVsZW0ubW96UmVxdWVzdEZ1bGxTY3JlZW4oKVxuICAgIH1cbn1cblxuLyoqXG4gKiDlj5bmtojlhajlsY9cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4aXRGdWxsc2NyZWVuKCkge1xuICAgIGlmIChkb2N1bWVudC5leGl0RnVsbHNjcmVlbikge1xuICAgICAgICBkb2N1bWVudC5leGl0RnVsbHNjcmVlbigpXG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC53ZWJraXRDYW5jZWxGdWxsU2NyZWVuKSB7XG4gICAgICAgIGRvY3VtZW50LndlYmtpdENhbmNlbEZ1bGxTY3JlZW4oKVxuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgICBkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKClcbiAgICB9XG59XG5cbi8qKlxuICog5piv5ZCm5YWo5bGPXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmdWxsc2NyZWVuKCkge1xuICAgIHJldHVybiAoXG4gICAgICAgIGRvY3VtZW50LmZ1bGxzY3JlZW4gfHxcbiAgICAgICAgZG9jdW1lbnQud2Via2l0SXNGdWxsU2NyZWVuIHx8XG4gICAgICAgIGRvY3VtZW50Lm1vekZ1bGxTY3JlZW4gfHxcbiAgICAgICAgZmFsc2VcbiAgICApXG59XG5cbi8qKlxuICog6Kej5p6QdXJM5Lit55qEcXVlcnlcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVVybFBhcmFtKHVybCkge1xuICAgIGNvbnN0IHBhcmFtc1N0ciA9IC8uK1xcPyguKykkLy5leGVjKHVybClbMV07IC8vIOWwhiA/IOWQjumdoueahOWtl+espuS4suWPluWHuuadpVxuICAgIGNvbnN0IHBhcmFtc0FyciA9IHBhcmFtc1N0ci5zcGxpdCgnJicpOyAvLyDlsIblrZfnrKbkuLLku6UgJiDliIblibLlkI7lrZjliLDmlbDnu4TkuK1cbiAgICBsZXQgcGFyYW1zT2JqID0ge307XG4gICAgLy8g5bCGIHBhcmFtcyDlrZjliLDlr7nosaHkuK1cbiAgICBwYXJhbXNBcnIuZm9yRWFjaChwYXJhbSA9PiB7XG4gICAgICBpZiAoLz0vLnRlc3QocGFyYW0pKSB7XG4gICAgICAgIC8vIOWkhOeQhuaciSB2YWx1ZSDnmoTlj4LmlbBcbiAgICAgICAgbGV0IFtrZXksIHZhbF0gPSBwYXJhbS5zcGxpdCgnPScpOyAvLyDliIblibIga2V5IOWSjCB2YWx1ZVxuICAgICAgICB2YWwgPSBkZWNvZGVVUklDb21wb25lbnQodmFsKTsgLy8g6Kej56CBXG4gICAgICAgIHZhbCA9IC9eXFxkKyQvLnRlc3QodmFsKSA/IHBhcnNlRmxvYXQodmFsKSA6IHZhbDsgLy8g5Yik5pat5piv5ZCm6L2s5Li65pWw5a2XXG4gIFxuICAgICAgICBpZiAocGFyYW1zT2JqLmtleSkge1xuICAgICAgICAgIC8vIOWmguaenOWvueixoeaciSBrZXnvvIzliJnmt7vliqDkuIDkuKrlgLxcbiAgICAgICAgICBwYXJhbXNPYmpba2V5XSA9IFtdLmNvbmNhdChwYXJhbXNPYmpba2V5XSwgdmFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyDlpoLmnpzlr7nosaHmsqHmnInov5nkuKoga2V577yM5Yib5bu6IGtleSDlubborr7nva7lgLxcbiAgICAgICAgICBwYXJhbXNPYmpba2V5XSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8g5aSE55CG5rKh5pyJIHZhbHVlIOeahOWPguaVsFxuICAgICAgICBwYXJhbXNPYmpbcGFyYW1dID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgXG4gICAgcmV0dXJuIHBhcmFtc09iajtcbiAgfSIsIi8vIOmHjeWGmeaSreaUvuWZqOeahOWFqOWxj++8j+WPlua2iOWFqOWxj+aWueazle+8jOmHjeaWsOaMh+WumuWFqOWxj+eahOWFg+e0oO+8iOiAjOS4jeWPquaYr+aSreaUvuWZqOacrOi6q++8iVxyXG5cclxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0Z1bGxzY3JlZW5fQVBJXHJcblxyXG5jb25zdCBGdWxsc2NyZWVuQXBpID0ge31cclxuXHJcbi8vIGJyb3dzZXIgQVBJIG1ldGhvZHNcclxuY29uc3QgYXBpTWFwID0gW1xyXG4gIFtcclxuICAgICdyZXF1ZXN0RnVsbHNjcmVlbicsXHJcbiAgICAnZXhpdEZ1bGxzY3JlZW4nLFxyXG4gICAgJ2Z1bGxzY3JlZW5FbGVtZW50JyxcclxuICAgICdmdWxsc2NyZWVuRW5hYmxlZCcsXHJcbiAgICAnZnVsbHNjcmVlbmNoYW5nZScsXHJcbiAgICAnZnVsbHNjcmVlbmVycm9yJ1xyXG4gIF0sXHJcbiAgLy8gV2ViS2l0XHJcbiAgW1xyXG4gICAgJ3dlYmtpdFJlcXVlc3RGdWxsc2NyZWVuJyxcclxuICAgICd3ZWJraXRFeGl0RnVsbHNjcmVlbicsXHJcbiAgICAnd2Via2l0RnVsbHNjcmVlbkVsZW1lbnQnLFxyXG4gICAgJ3dlYmtpdEZ1bGxzY3JlZW5FbmFibGVkJyxcclxuICAgICd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJyxcclxuICAgICd3ZWJraXRmdWxsc2NyZWVuZXJyb3InXHJcbiAgXSxcclxuICAvLyBPbGQgV2ViS2l0IChTYWZhcmkgNS4xKVxyXG4gIFtcclxuICAgICd3ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbicsXHJcbiAgICAnd2Via2l0Q2FuY2VsRnVsbFNjcmVlbicsXHJcbiAgICAnd2Via2l0Q3VycmVudEZ1bGxTY3JlZW5FbGVtZW50JyxcclxuICAgICd3ZWJraXRDYW5jZWxGdWxsU2NyZWVuJyxcclxuICAgICd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJyxcclxuICAgICd3ZWJraXRmdWxsc2NyZWVuZXJyb3InXHJcbiAgXSxcclxuICAvLyBNb3ppbGxhXHJcbiAgW1xyXG4gICAgJ21velJlcXVlc3RGdWxsU2NyZWVuJyxcclxuICAgICdtb3pDYW5jZWxGdWxsU2NyZWVuJyxcclxuICAgICdtb3pGdWxsU2NyZWVuRWxlbWVudCcsXHJcbiAgICAnbW96RnVsbFNjcmVlbkVuYWJsZWQnLFxyXG4gICAgJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLFxyXG4gICAgJ21vemZ1bGxzY3JlZW5lcnJvcidcclxuICBdLFxyXG4gIC8vIE1pY3Jvc29mdFxyXG4gIFtcclxuICAgICdtc1JlcXVlc3RGdWxsc2NyZWVuJyxcclxuICAgICdtc0V4aXRGdWxsc2NyZWVuJyxcclxuICAgICdtc0Z1bGxzY3JlZW5FbGVtZW50JyxcclxuICAgICdtc0Z1bGxzY3JlZW5FbmFibGVkJyxcclxuICAgICdNU0Z1bGxzY3JlZW5DaGFuZ2UnLFxyXG4gICAgJ01TRnVsbHNjcmVlbkVycm9yJ1xyXG4gIF1cclxuXVxyXG5cclxuY29uc3Qgc3BlY0FwaSA9IGFwaU1hcFswXVxyXG5sZXQgYnJvd3NlckFwaVxyXG5cclxuLy8gZGV0ZXJtaW5lIHRoZSBzdXBwb3J0ZWQgc2V0IG9mIGZ1bmN0aW9uc1xyXG5mb3IgKGxldCBpID0gMDsgaSA8IGFwaU1hcC5sZW5ndGg7IGkrKykge1xyXG4gIC8vIGNoZWNrIGZvciBleGl0RnVsbHNjcmVlbiBmdW5jdGlvblxyXG4gIGlmIChhcGlNYXBbaV1bMV0gaW4gZG9jdW1lbnQpIHtcclxuICAgIGJyb3dzZXJBcGkgPSBhcGlNYXBbaV1cclxuICAgIGJyZWFrXHJcbiAgfVxyXG59XHJcblxyXG4vLyBtYXAgdGhlIGJyb3dzZXIgQVBJIG5hbWVzIHRvIHRoZSBzcGVjIEFQSSBuYW1lc1xyXG5pZiAoYnJvd3NlckFwaSkge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYnJvd3NlckFwaS5sZW5ndGg7IGkrKykge1xyXG4gICAgRnVsbHNjcmVlbkFwaVtzcGVjQXBpW2ldXSA9IGJyb3dzZXJBcGlbaV1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZ1bGxzY3JlZW5BcGlcclxuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJAY2hhcnNldCBcXFwiVVRGLThcXFwiO1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJpY29uZm9udFxcXCI7XFxuICAvKiBwcm9qZWN0IGlkIDIwMjIxNzAgKi9cXG4gIHNyYzogdXJsKFxcXCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzIwMjIxNzBfcGs4bmY4Zjg4NG0uZW90XFxcIik7XFxuICBzcmM6IHVybChcXFwiLy9hdC5hbGljZG4uY29tL3QvZm9udF8yMDIyMTcwX3BrOG5mOGY4ODRtLmVvdD8jaWVmaXhcXFwiKSBmb3JtYXQoXFxcImVtYmVkZGVkLW9wZW50eXBlXFxcIiksIHVybChcXFwiLy9hdC5hbGljZG4uY29tL3QvZm9udF8yMDIyMTcwX3BrOG5mOGY4ODRtLndvZmYyXFxcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXFxcIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMjAyMjE3MF9wazhuZjhmODg0bS53b2ZmXFxcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIiksIHVybChcXFwiLy9hdC5hbGljZG4uY29tL3QvZm9udF8yMDIyMTcwX3BrOG5mOGY4ODRtLnR0ZlxcXCIpIGZvcm1hdChcXFwidHJ1ZXR5cGVcXFwiKSwgdXJsKFxcXCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzIwMjIxNzBfcGs4bmY4Zjg4NG0uc3ZnI2ljb25mb250XFxcIikgZm9ybWF0KFxcXCJzdmdcXFwiKTtcXG59XFxudmlkZW86Oi13ZWJraXQtbWVkaWEtY29udHJvbHMge1xcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xcbn1cXG5cXG4vKnZpZGVv6buY6K6k5YWo5bGP5oyJ6ZKuKi9cXG52aWRlbzo6LXdlYmtpdC1tZWRpYS1jb250cm9scy1mdWxsc2NyZWVuLWJ1dHRvbiB7XFxuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxufVxcblxcbi8qdmlkZW/pu5jorqRhZHVpb+mfs+mHj+aMiemSriovXFxudmlkZW86Oi13ZWJraXQtbWVkaWEtY29udHJvbHMtbXV0ZS1idXR0b24ge1xcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xcbn1cXG5cXG4vKnZpZGVv6buY6K6kc2V0dGluZ+aMiemSriovXFxudmlkZW86Oi1pbnRlcm5hbC1tZWRpYS1jb250cm9scy1vdmVyZmxvdy1idXR0b24ge1xcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xcbn1cXG5cXG52aWRlbzo6LXdlYmtpdC1tZWRpYS1jb250cm9scy1lbmNsb3N1cmUge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxudmlkZW86Oi13ZWJraXQtbWVkaWEtY29udHJvbHMtcGFuZWwge1xcbiAgd2lkdGg6IGNhbGMoMTAwJSArIDMwcHgpO1xcbn1cXG5cXG4vKuiFvuiur+S6keeCueaSreemgeeUqGZpcmVmb3jlhajlsY/jgIHorr7nva7mjInpkq4qL1xcbi50cnVtcC1idXR0b25bc3ViLWNvbXBvbmVudD1mdWxsc2NyZWVuX2J0bl0sXFxuLnRydW1wLWJ1dHRvbltub3c9ZnVsbHNjcmVlbl0ge1xcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xcbn1cXG5cXG4udHJ1bXAtYnV0dG9uW3N1Yi1jb21wb25lbnQ9c2V0dGluZ10ge1xcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xcbn1cXG5cXG4vKuemgeeUqHZpZGVv55qEY29udHJvbHPvvIjopoHmhY7ph43vvIHkuI3opoHovbvmmJPpmpDol4/mjonvvIzkvJrlr7zoh7Tngrnlh7vop4bpopHkuI3og73mkq3mlL7vvIkqL1xcbnZpZGVvOjotd2Via2l0LW1lZGlhLWNvbnRyb2xzIHtcXG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG59XFxuXFxuLnZwLWNvbnRhaW5lciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGNvbG9yOiAjZmZmO1xcbn1cXG4udnAtY29udGFpbmVyLWNlbnRlci1idXR0b24ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxuICBmb250LWZhbWlseTogXFxcImljb25mb250XFxcIjtcXG4gIGZvbnQtc2l6ZTogNjBweDtcXG59XFxuLnZwLWNvbnRhaW5lci1wYXVzZS1idXR0b24ge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTcxYTI5O1xcbiAgcGFkZGluZzogMTBweCAxM3B4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4udnAtY29udGFpbmVyLWxvYWRpbmctYnV0dG9uIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB3aWR0aDogNjZweDtcXG4gIG1hcmdpbi10b3A6IC0zM3B4O1xcbiAgbWFyZ2luLWxlZnQ6IC0zM3B4O1xcbiAgYW5pbWF0aW9uLW5hbWU6IHJvdGF0ZS10aGUtc3VuO1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjhzO1xcbiAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XFxuICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBsaW5lYXI7XFxufVxcblxcbi52cC12aWRlby1wbGF5aW5nIC52cC1jb250YWluZXItcGF1c2UtYnV0dG9uLFxcbi52cC12aWRlby1sb2Fkc3RhcnQgLnZwLWNvbnRhaW5lci1wYXVzZS1idXR0b24ge1xcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xcbn1cXG5cXG4udnAtdmlkZW8tbG9hZHN0YXJ0IC52cC1jb250YWluZXItbG9hZGluZy1idXR0b24ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi52cC12aWRlbyB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuXFxuLnZwLWNvbnRyb2wtYmFyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiA1MHB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiAtNTBweDtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjNzO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxNzFhMjk7XFxuICBmb250LWZhbWlseTogXFxcImljb25mb250XFxcIjtcXG59XFxuLnZwLWNvbnRyb2wtYmFyX3BsYXlidG4ge1xcbiAgd2lkdGg6IDUwcHg7XFxuICBoZWlnaHQ6IDUwcHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZm9udC1zaXplOiAzMHB4O1xcbn1cXG4udnAtY29udHJvbC1iYXJfcGxheWJ0bjo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTYwN1xcXCI7XFxuICBmb250LWZhbWlseTogXFxcImljb25mb250XFxcIjtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLnZwLWNvbnRyb2wtYmFyX3RpbWVncm91cCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgaGVpZ2h0OiA1MHB4O1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuLnZwLWNvbnRyb2wtYmFyX3Byb2dyZXNzIHtcXG4gIGZsZXg6IDE7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDAgMTBweCAwIDIwcHg7XFxufVxcbi52cC1jb250cm9sLWJhcl9wcm9ncmVzc19pbm5lciB7XFxuICBmbGV4OiAxO1xcbiAgaGVpZ2h0OiA2cHg7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDM0ODYxO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4udnAtY29udHJvbC1iYXJfcHJvZ3Jlc3NfaW5uZXIgLnZwLXByb2dyZXNzLXNsaWRlIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBjNTVkO1xcbiAgaGVpZ2h0OiA2cHg7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxufVxcbi52cC1jb250cm9sLWJhcl9wcm9ncmVzc19pbm5lciAudnAtcHJvZ3Jlc3Mtc2xpZGU6OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTYwQlxcXCI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IC01cHg7XFxuICByaWdodDogLThweDtcXG59XFxuLnZwLWNvbnRyb2wtYmFyX2Z1bGwtc2NyZWVuLWJ0biB7XFxuICB3aWR0aDogNTBweDtcXG4gIGhlaWdodDogNTBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDMwcHg7XFxufVxcbi52cC1jb250cm9sLWJhcl9mdWxsLXNjcmVlbi1idG46OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTYwMlxcXCI7XFxuICBmb250LWZhbWlseTogXFxcImljb25mb250XFxcIjtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGZvbnQtc2l6ZTogMjJweDtcXG59XFxuXFxuLnZwLWNvbnRhaW5lci1vdmVyIC52cC1jb250cm9sLWJhciB7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbn1cXG5cXG4udnAtdmlkZW8tcGxheWluZyAudnAtY29udHJvbC1iYXJfcGxheWJ0bjo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFxcRTYwNlxcXCI7XFxufVxcblxcbi52cC1jb250YWluZXItZnVsbC1zY3JlZW4gLnZwLWNvbnRyb2wtYmFyX2Z1bGwtc2NyZWVuLWJ0bjo6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXFxFNjAzXFxcIjtcXG59XFxuXFxuQGtleWZyYW1lcyByb3RhdGUtdGhlLXN1biB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMCk7XFxuICB9XFxuICB0byB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDM1OWRlZyk7XFxuICB9XFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImltcG9ydCBWaWRlb1BsYXllciBmcm9tICcuL2luZGV4J1xuaW1wb3J0ICcuL3Nhc3MvaW5kZXguc2NzcydcbmltcG9ydCB7IHBhcnNlVXJsUGFyYW0gfSBmcm9tICcuL3V0aWxzJ1xud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKGxvY2F0aW9uLmhyZWYpXG4gICAgbGV0IHVybCA9IHBhcnNlVXJsUGFyYW0obG9jYXRpb24uaHJlZikudXJsXG4gICAgaWYgKCF1cmwpIHtcbiAgICAgICAgYWxlcnQoJ3VybOS4jeWQiOazlScpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgbmV3IFZpZGVvUGxheWVyKHtcbiAgICAgICAgICAgIGVsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlkZW8nKSxcbiAgICAgICAgICAgIC8vIHVybDogJ2h0dHA6Ly92aWRlby54aWFvamlhb3l1MTAwLmNvbS84OTA4MjFlMmQyMTg0Njc5YTM2YTc3OGFjYTNkOThjNy9lMmFjZTEyYmI1N2I0MGM4OTlhODM2MTkyYjc1ODFkMC0wN2I2YzZhNTU4ZjdlMzk3OTM2NmQ4ZGZhNTdiZjdiNC1mZC5tcDQnXG4gICAgICAgICAgICAvLyB1cmw6ICdodHRwOi8vaXFpeWkuY2RuOS1va3p5LmNvbS8yMDIwMDgyMC8xNDI1NF83MjhiMTNhMC9pbmRleC5tM3U4J1xuICAgICAgICAgICAgdXJsOiBhdG9iKHVybClcbiAgICAgICAgfSlcbiAgICB9XG59XG4iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gKHRhcmdldCwgcGFyZW50KSB7XG4gIGlmIChwYXJlbnQpe1xuICAgIHJldHVybiBwYXJlbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuICB9XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG59O1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24odGFyZ2V0LCBwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBwYXNzaW5nIGZ1bmN0aW9uIGluIG9wdGlvbnMsIHRoZW4gdXNlIGl0IGZvciByZXNvbHZlIFwiaGVhZFwiIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgLy8gVXNlZnVsIGZvciBTaGFkb3cgUm9vdCBzdHlsZSBpLmVcbiAgICAgICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAgICAgLy8gICBpbnNlcnRJbnRvOiBmdW5jdGlvbiAoKSB7IHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvb1wiKS5zaGFkb3dSb290IH1cbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHZhciBzdHlsZVRhcmdldCA9IGdldFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCwgcGFyZW50KTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3RhcmdldF1cblx0fTtcbn0pKCk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG4gICAgICAgIGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUsIHRhcmdldCk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cblx0aWYob3B0aW9ucy5hdHRycy5ub25jZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIG5vbmNlID0gZ2V0Tm9uY2UoKTtcblx0XHRpZiAobm9uY2UpIHtcblx0XHRcdG9wdGlvbnMuYXR0cnMubm9uY2UgPSBub25jZTtcblx0XHR9XG5cdH1cblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBnZXROb25jZSgpIHtcblx0aWYgKHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHJldHVybiBfX3dlYnBhY2tfbm9uY2VfXztcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSB0eXBlb2Ygb3B0aW9ucy50cmFuc2Zvcm0gPT09ICdmdW5jdGlvbidcblx0XHQgPyBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKSBcblx0XHQgOiBvcHRpb25zLnRyYW5zZm9ybS5kZWZhdWx0KG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiaW1wb3J0IHtmaW5kRWxQb3NpdGlvbiwgZnVsbHNjcmVlbiwgcmVxdWVzdEZ1bGxzY3JlZW4sIGV4aXRGdWxsc2NyZWVufSBmcm9tICcuL3V0aWxzJ1xyXG5pbXBvcnQgRnVsbHNjcmVlbkFwaSBmcm9tICcuL2Z1bGxzY3JlZW4nXHJcblxyXG5jb25zdCBzdXBwb3J0c0Z1bGxzY3JlZW4gPSBGdWxsc2NyZWVuQXBpLnJlcXVlc3RGdWxsc2NyZWVuXHJcblxyXG5jb25zb2xlLmxvZyhGdWxsc2NyZWVuQXBpKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudE1hbmFnZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihpbnN0YW5jZSkge1xyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSBpbnN0YW5jZVxyXG4gICAgICAgIHRoaXMuZnVsbFNjcmVlbiA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5pbml0KClcclxuICAgIH1cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgbGV0IGluc3RhbmNlID0gdGhpcy5pbnN0YW5jZSxDb250cm9sQmFyID0gdGhpcy5pbnN0YW5jZS5Db250cm9sQmFyXHJcblxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UuJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLnRvZ2dsZSgpXHJcbiAgICAgICAgfSwgZmFsc2UpXHJcblxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UuJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5fb25Db250YWluZXJPdmVyKClcclxuICAgICAgICB9LCBmYWxzZSlcclxuICAgICAgICAvLyDov5vluqbmnaHmjqfliLZcclxuICAgICAgICBjb25zdCBwcm9ncmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52cC1jb250cm9sLWJhcl9wcm9ncmVzc19pbm5lcicpLFxyXG4gICAgICAgICAgICBzbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52cC1wcm9ncmVzcy1zbGlkZScpXHJcbiAgICAgICAgcHJvZ3Jlc3MuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLiRlbC5jbGFzc0xpc3QuYWRkKCd2cC12aWRlby1sb2Fkc3RhcnQnKVxyXG4gICAgICAgICAgICBjb25zdCBsZWZ0ID0gZXZlbnQucGFnZVggLSBmaW5kRWxQb3NpdGlvbihwcm9ncmVzcykubGVmdFxyXG4gICAgICAgICAgICBjb25zdCBwcm9ncmVzc1dpZHRoID0gcHJvZ3Jlc3Mub2Zmc2V0V2lkdGhcclxuICAgICAgICAgICAgY29uc3QgcGVyY2VudCA9IGxlZnQgLyBwcm9ncmVzc1dpZHRoICogMTAwXHJcbiAgICAgICAgICAgIHNsaWRlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgd2lkdGg6ICR7cGVyY2VudH0lYClcclxuICAgICAgICAgICAgbGV0IGR1cmF0aW9uID0gaW5zdGFuY2UuZHVyYXRpb24oKVxyXG4gICAgICAgICAgICBsZXQgY3VycmVudFRpbWUgPSBkdXJhdGlvbiAqIHBlcmNlbnQgLyAxMDBcclxuICAgICAgICAgICAgaW5zdGFuY2UuY3VycmVudFRpbWUoY3VycmVudFRpbWUpXHJcbiAgICAgICAgICAgIENvbnRyb2xCYXIuc2V0VGltZShjdXJyZW50VGltZSwgZHVyYXRpb24pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgY29uc3QgZnVsbFNjcmVlbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52cC1jb250cm9sLWJhcl9mdWxsLXNjcmVlbi1idG4nKVxyXG4gICAgICAgIGZ1bGxTY3JlZW5CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnVsbFNjcmVlbikge1xyXG4gICAgICAgICAgICAgICAgZXhpdEZ1bGxzY3JlZW4oKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEZ1bGxzY3JlZW4oaW5zdGFuY2UuJGVsKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihGdWxsc2NyZWVuQXBpWydmdWxsc2NyZWVuY2hhbmdlJ10sICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXNGdWxsc2NyZWVuID0gISFkb2N1bWVudFtGdWxsc2NyZWVuQXBpWydmdWxsc2NyZWVuRWxlbWVudCddXVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZnVsbHNjcmVlbmNoYW5nZScpXHJcbiAgICAgICAgICAgIGlmIChpc0Z1bGxzY3JlZW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnVsbFNjcmVlbiA9IHRydWVcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlLiRlbC5jbGFzc0xpc3QuYWRkKCd2cC1jb250YWluZXItZnVsbC1zY3JlZW4nKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mdWxsU2NyZWVuID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlLiRlbC5jbGFzc0xpc3QucmVtb3ZlKCd2cC1jb250YWluZXItZnVsbC1zY3JlZW4nKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZmFsc2UpXHJcblxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlby1wbGF5ZXInKS5hZGRFdmVudExpc3RlbmVyKCd4NXZpZGVvZXhpdGZ1bGxzY3JlZW4nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZnVsbFNjcmVlbiA9IGZhbHNlXHJcbiAgICAgICAgICAgIGluc3RhbmNlLiRlbC5jbGFzc0xpc3QucmVtb3ZlKCd2cC1jb250YWluZXItZnVsbC1zY3JlZW4nKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvLXBsYXllcicpLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdGVuZGZ1bGxzY3JlZW4nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZnVsbFNjcmVlbiA9IGZhbHNlXHJcbiAgICAgICAgICAgIGluc3RhbmNlLiRlbC5jbGFzc0xpc3QucmVtb3ZlKCd2cC1jb250YWluZXItZnVsbC1zY3JlZW4nKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iLCJpbXBvcnQgeyBmb3JtYXRUaW1lLCBmaW5kRWxQb3NpdGlvbiB9IGZyb20gJy4vdXRpbHMnXHJcbmNsYXNzIENvbnRyb2xCYXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgdGhpcy5lbC5jbGFzc05hbWUgPSAndnAtY29udHJvbC1iYXInXHJcbiAgICAgICAgdGhpcy5jcmVhdGVQbGF5QnRuKClcclxuICAgICAgICB0aGlzLmNyZWF0ZVRpbWVHcm91cCgpXHJcbiAgICAgICAgdGhpcy5jcmVhdGVQcm9ncmVzcygpXHJcbiAgICAgICAgdGhpcy5jcmVhdGVGdWxsU2NyZWVuQnRuKClcclxuICAgIH1cclxuICAgIGNyZWF0ZVBsYXlCdG4oKSB7XHJcbiAgICAgICAgbGV0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxyXG4gICAgICAgIGRvbS5jbGFzc05hbWUgPSAndnAtY29udHJvbC1iYXJfcGxheWJ0bidcclxuICAgICAgICB0aGlzLmVsLmFwcGVuZENoaWxkKGRvbSlcclxuICAgIH1cclxuICAgIGNyZWF0ZVRpbWVHcm91cCgpIHtcclxuICAgICAgICBsZXQgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXHJcbiAgICAgICAgZG9tLmNsYXNzTmFtZSA9ICd2cC1jb250cm9sLWJhcl90aW1lZ3JvdXAnXHJcbiAgICAgICAgZG9tLmlubmVySFRNTCA9XHJcbiAgICAgICAgICAgICc8c3Bhbj4wOjAwPC9zcGFuPiZuYnNwOy8mbmJzcDs8c3BhbiBjbGFzcz1cInZwLWNvbnRyb2wtYmFyX3RpbWVncm91cF9kdXJhdGlvblwiPjA6MDA8L3NwYW4+J1xyXG4gICAgICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQoZG9tKVxyXG4gICAgICAgIGRvbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBjcmVhdGVGdWxsU2NyZWVuQnRuKCkge1xyXG4gICAgICAgIGxldCBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcclxuICAgICAgICBkb20uY2xhc3NOYW1lID0gJ3ZwLWNvbnRyb2wtYmFyX2Z1bGwtc2NyZWVuLWJ0bidcclxuICAgICAgICB0aGlzLmVsLmFwcGVuZENoaWxkKGRvbSlcclxuICAgIH1cclxuICAgIGNyZWF0ZVByb2dyZXNzKCkge1xyXG4gICAgICAgIGxldCBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcclxuICAgICAgICBkb20uY2xhc3NOYW1lID0gJ3ZwLWNvbnRyb2wtYmFyX3Byb2dyZXNzJ1xyXG4gICAgICAgIGRvbS5pbm5lckhUTUwgPVxyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInZwLWNvbnRyb2wtYmFyX3Byb2dyZXNzX2lubmVyXCI+PGRpdiBjbGFzcz1cInZwLXByb2dyZXNzLWxvYWRlZFwiPjwvZGl2PjxkaXYgY2xhc3M9XCJ2cC1wcm9ncmVzcy1zbGlkZVwiPjwvZGl2PjwvZGl2PidcclxuICAgICAgICB0aGlzLmVsLmFwcGVuZENoaWxkKGRvbSlcclxuICAgICAgICBkb20uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgc2V0VGltZShjdXJyZW50LCBkdXJhdGlvbikge1xyXG4gICAgICAgIGxldCBzbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52cC1wcm9ncmVzcy1zbGlkZScpXHJcbiAgICAgICAgY29uc3QgcGVyY2VudCA9IGN1cnJlbnQgLyBkdXJhdGlvbiAqIDEwMFxyXG4gICAgICAgIHNsaWRlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgd2lkdGg6ICR7cGVyY2VudH0lYClcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAgICAgJy52cC1jb250cm9sLWJhcl90aW1lZ3JvdXAnXHJcbiAgICAgICAgKS5pbm5lckhUTUwgPSBgPHNwYW4+JHtmb3JtYXRUaW1lKFxyXG4gICAgICAgICAgICBjdXJyZW50XHJcbiAgICAgICAgKX08L3NwYW4+Jm5ic3A7LyZuYnNwOzxzcGFuIGNsYXNzPVwidnAtY29udHJvbC1iYXJfdGltZWdyb3VwX2R1cmF0aW9uXCI+JHtmb3JtYXRUaW1lKFxyXG4gICAgICAgICAgICBkdXJhdGlvblxyXG4gICAgICAgICl9PC9zcGFuPmBcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IENvbnRyb2xCYXIoKVxyXG4iLCJpbXBvcnQgeyBpc00zVTgsIGlzTVA0IH0gZnJvbSAnLi91dGlscydcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlkZW8ge1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMudmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXHJcbiAgICAgICAgdGhpcy52aWRlby5zZXRBdHRyaWJ1dGUoJ2Nyb3Nzb3JpZ2luJywgJ2Fub255bW91cycpXHJcbiAgICAgICAgdGhpcy52aWRlby5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3ZpZGVvLXBsYXllcicpXHJcbiAgICAgICAgdGhpcy52aWRlby5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJ3RydWUnKVxyXG4gICAgICAgIHRoaXMudmlkZW8uc2V0QXR0cmlidXRlKCd4NS12aWRlby1wbGF5ZXItZnVsbHNjcmVlbicsICd0cnVlJylcclxuICAgICAgICB0aGlzLnZpZGVvLnNldEF0dHJpYnV0ZSgneDUtdmlkZW8tcGxheWVyLXR5cGUnLCAnaDUnKVxyXG4gICAgICAgIHRoaXMudmlkZW8uY2xhc3NOYW1lID0gJ3ZwLXZpZGVvJ1xyXG4gICAgICAgIGlmIChvcHRpb25zLnVybCkgdGhpcy5fc2V0VXJsKG9wdGlvbnMudXJsKVxyXG4gICAgICAgIHRoaXMuX2FkZEV2ZW50KClcclxuICAgIH1cclxuICAgIF9zZXRVcmwodXJsKSB7XHJcbiAgICAgICAgaWYgKGlzTTNVOCh1cmwpKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuSGxzICYmIHdpbmRvdy5IbHMuaXNTdXBwb3J0ZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWxvYWRpbmcgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhscyA9IG5ldyB3aW5kb3cuSGxzKClcclxuICAgICAgICAgICAgICAgIHRoaXMuaGxzLmxvYWRTb3VyY2UodXJsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5obHMuYXR0YWNoTWVkaWEodGhpcy52aWRlbylcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIGxvYWQgdGhlIGhscy5qcyBiZWZvcmUgdmlkZW8gaW5pdCcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGlzTVA0KHVybCkpIHtcclxuICAgICAgICAgICAgdGhpcy52aWRlby5zcmMgPSB1cmxcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuU3VwcG9ydCB2aWRlbyB1cmwnKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGN1cnJlbnRUaW1lKHRpbWUpIHtcclxuICAgICAgICBpZiAoIXRpbWUgJiYgdGltZSAhPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52aWRlbyAmJiB0aGlzLnZpZGVvLmN1cnJlbnRUaW1lIHx8IDBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRpbWUgIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2N1cnJlbnRUaW1lIHNob3VsZCBiZSBudW1iZXInKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudmlkZW8uY3VycmVudFRpbWUgPSB0aW1lXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHVyYXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmlkZW8gJiYgdGhpcy52aWRlby5kdXJhdGlvbiB8fCAwXHJcbiAgICB9XHJcbiAgICBwbGF5KCkge1xyXG4gICAgICAgIHRoaXMudmlkZW8gJiYgdGhpcy52aWRlby5wbGF5KClcclxuICAgIH1cclxuICAgIHBhdXNlKCkge1xyXG4gICAgICAgIHRoaXMudmlkZW8gJiYgdGhpcy52aWRlby5wYXVzZSgpXHJcbiAgICB9XHJcbiAgICB0b2dnbGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmlkZW8ucGF1c2VkID09PSB0cnVlKSB0aGlzLnBsYXkoKVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMudmlkZW8ucGF1c2VkID09PSBmYWxzZSkgdGhpcy5wYXVzZSgpXHJcbiAgICB9XHJcbiAgICBfYWRkRXZlbnQoKSB7XHJcbiAgICAgICAgbGV0IGV2ZW50QXJyID0gWydwbGF5JywgJ3BhdXNlJywgJ2xvYWRzdGFydCcsICdsb2FkZWRkYXRhJywgJ3Byb2dyZXNzJywgJ2NhbnBsYXknLCAndGltZXVwZGF0ZScsICdlbmRlZCddXHJcbiAgICAgICAgZXZlbnRBcnIuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgdGhpcy52aWRlby5hZGRFdmVudExpc3RlbmVyKGl0ZW0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXNbJ19vbicrIGl0ZW1dKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgX29ucGxheSgpIHt9XHJcbiAgICBfb25wYXVzZSgpIHt9XHJcbiAgICBfb25sb2Fkc3RhcnQoKSB7fVxyXG4gICAgX29ubG9hZGVkZGF0YSgpIHt9XHJcbiAgICBfb25wcm9ncmVzcygpIHt9XHJcbiAgICBfb25jYW5wbGF5KCkge31cclxuICAgIF9vbnRpbWV1cGRhdGUoKSB7fVxyXG4gICAgX29uZW5kZWQoKSB7fVxyXG59IiwiaW1wb3J0IHsgY3ViZSB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgVmlkZW8gZnJvbSAnLi92aWRlbydcbmltcG9ydCBDb250cm9sQmFyIGZyb20gJy4vQ29udHJvbEJhcidcbmltcG9ydCBFdmVudE1hbmFnZSBmcm9tICcuL2V2ZW50TWFuYWdlJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlkZW9QbGF5ZXIgZXh0ZW5kcyBWaWRlbyB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKVxuICAgICAgICB0aGlzLkNvbnRyb2xCYXIgPSBDb250cm9sQmFyIC8vIOaOp+WItuWPsFxuICAgICAgICB0aGlzLiRlbCA9IG9wdGlvbnMuZWwgfHwgZG9jdW1lbnQuYm9keVxuICAgICAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKCd2cC1jb250YWluZXInKVxuICAgICAgICB0aGlzLiRlbC5hcHBlbmRDaGlsZCh0aGlzLnZpZGVvKVxuICAgICAgICB0aGlzLiRlbC5hcHBlbmRDaGlsZChjcmVhdGVQYXVzZUJ1dHRvbigpKVxuICAgICAgICB0aGlzLiRlbC5hcHBlbmRDaGlsZChjcmVhdGVMb2FkaW5nQnV0dG9uKCkpXG4gICAgICAgIHRoaXMuJGVsLmFwcGVuZENoaWxkKENvbnRyb2xCYXIuZWwpXG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2UgPSBuZXcgRXZlbnRNYW5hZ2UodGhpcylcbiAgICB9XG4gICAgX29uQ29udGFpbmVyT3ZlcihldmVudCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpXG4gICAgICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoJ3ZwLWNvbnRhaW5lci1vdmVyJylcbiAgICAgICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3ZwLWNvbnRhaW5lci1vdmVyJylcbiAgICAgICAgfSwgMzAwMClcbiAgICB9XG4gICAgX29ucGxheSgpIHtcbiAgICAgICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZCgndnAtdmlkZW8tcGxheWluZycpXG4gICAgICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3ZwLXZpZGVvLWxvYWRzdGFydCcpXG4gICAgfVxuICAgIF9vbnBhdXNlKCkge1xuICAgICAgICB0aGlzLiRlbC5jbGFzc0xpc3QucmVtb3ZlKCd2cC12aWRlby1wbGF5aW5nJylcbiAgICB9XG4gICAgX29ubG9hZHN0YXJ0KCkge1xuICAgICAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKCd2cC12aWRlby1sb2Fkc3RhcnQnKVxuICAgIH1cbiAgICBfb25sb2FkZWRkYXRhKCkge1xuICAgICAgICB0aGlzLiRlbC5jbGFzc0xpc3QucmVtb3ZlKCd2cC12aWRlby1sb2Fkc3RhcnQnKVxuICAgIH1cbiAgICBfb250aW1ldXBkYXRlKCkge1xuICAgICAgICB0aGlzLkNvbnRyb2xCYXIuc2V0VGltZSh0aGlzLmN1cnJlbnRUaW1lKCksIHRoaXMuZHVyYXRpb24oKSlcbiAgICB9XG4gICAgX29uY2FucGxheSgpIHtcbiAgICAgICAgdGhpcy4kZWwuY2xhc3NMaXN0LnJlbW92ZSgndnAtdmlkZW8tbG9hZHN0YXJ0JylcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBhdXNlQnV0dG9uKCkge1xuICAgIGxldCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGVsLmNsYXNzTmFtZSA9ICd2cC1jb250YWluZXItY2VudGVyLWJ1dHRvbiB2cC1jb250YWluZXItcGF1c2UtYnV0dG9uJ1xuICAgIGVsLmlubmVySFRNTCA9ICcmI3hlNjA3OydcbiAgICByZXR1cm4gZWxcbn1cbmZ1bmN0aW9uIGNyZWF0ZUxvYWRpbmdCdXR0b24oKSB7XG4gICAgbGV0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgZWwuY2xhc3NOYW1lID0gJ3ZwLWNvbnRhaW5lci1jZW50ZXItYnV0dG9uIHZwLWNvbnRhaW5lci1sb2FkaW5nLWJ1dHRvbidcbiAgICBlbC5pbm5lckhUTUwgPSAnJiN4ZTYwYTsnXG4gICAgcmV0dXJuIGVsXG59XG4iXSwic291cmNlUm9vdCI6IiJ9