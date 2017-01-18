/*!
* Wui version 1.0.0
* by Idle 
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vtui"] = factory();
	else
		root["vtui"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _alert = __webpack_require__(1);
	
	var _alert2 = _interopRequireDefault(_alert);
	
	var _badge = __webpack_require__(8);
	
	var _badge2 = _interopRequireDefault(_badge);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Wui = {
		alert: _alert2.default,
		badge: _badge2.default,
		install: function install(Vue) {
			Vue.component('WuiAlert', _alert2.default);
			Vue.component('WuiBadge', _badge2.default);
		}
	};
	
	if (typeof window !== 'undefined' && typeof Vue !== 'undefined') {
		Wui.install(Vue);
	}
	
	module.exports = Wui;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(2)
	__vue_script__ = __webpack_require__(3)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\alert.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(5)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _utils = __webpack_require__(4);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
		data: function data() {
			return {
				tips: 'hello',
				show: true
			};
		},
		created: function created() {
			this.tips = _utils2.default.reverse(this.tips);
		},
	
		methods: {
			close: function close() {
				this.show = false;
			}
		}
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		reverse: function reverse(str) {
			return str.split('').reverse().join('');
		}
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "\n<div class=\"alert\" v-show=\"show\" _v-476318cc=\"\">\n\t<!-- img url -->\n\t<button class=\"close\" _v-476318cc=\"\">×</button>\n\t<div class=\"alert-con\" _v-476318cc=\"\">\n\t\t<img src=\"" + __webpack_require__(6) + "\" _v-476318cc=\"\"><strong _v-476318cc=\"\">提示：</strong> {{tips}}\n\t\t<p _v-476318cc=\"\"><img src=\"" + __webpack_require__(7) + "\" _v-476318cc=\"\"></p>\n\t</div>\n</div>\n";

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "./images/a-197.jpg";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "./images/b-0dc.jpg";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(9)
	__vue_script__ = __webpack_require__(10)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\badge.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(11)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		data: function data() {
			return {
				num: 10
			};
		},
		created: function created() {
			console.log('vtui.badge ready..');
		}
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"badge\">\n\t<em>{{num}}</em>\n\n</div>\n";

/***/ }
/******/ ])
});
;
//# sourceMappingURL=bundle.js.map