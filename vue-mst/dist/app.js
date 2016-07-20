/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);

/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + ".chunk.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(VIP) {'use strict';

	var _vue = __webpack_require__(7);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueRouter = __webpack_require__(76);

	var _vueRouter2 = _interopRequireDefault(_vueRouter);

	var _vueAsyncData = __webpack_require__(77);

	var _vueAsyncData2 = _interopRequireDefault(_vueAsyncData);

	var _routes = __webpack_require__(78);

	var _routes2 = _interopRequireDefault(_routes);

	var _extends = __webpack_require__(132);

	var _extends2 = _interopRequireDefault(_extends);

	var _ajax = __webpack_require__(208);

	var _ajax2 = _interopRequireDefault(_ajax);

	var _env = __webpack_require__(210);

	var _env2 = _interopRequireDefault(_env);

	var _vuexRouterSync = __webpack_require__(211);

	var _store = __webpack_require__(212);

	var _store2 = _interopRequireDefault(_store);

	var _App = __webpack_require__(229);

	var _App2 = _interopRequireDefault(_App);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//布局组件(相当于主页面)

	// import VueResource from 'vue-resource';
	console.warn('VIP:', VIP);

	var router = void 0; //路由器实例

	//开发环境 则配置Vue, mock data
	//---------------------------
	if (_env2.default.active === 'dev') {
		_vue2.default.config.debug = true;
		_vue2.default.config.devtools = true;
		__webpack_require__(253);

		_vue2.default.mixin({ //组件vm设为全局 便于调试

			created: function created() {
				if (this.$options.name) {
					var key = 'vm' + this.$options.name.toLowerCase();
					if (window[key]) {
						!VIP.isArray(window[key]) && (window[key] = [window[key]]);
						window[key].push(this);
					} else {
						window[key] = this;
					}
				}
			}
		});
	}

	//注册全局自定义组件 指令等..
	//---------------------------
	(0, _extends2.default)(_vue2.default);

	//Vue插件
	//---------------------------
	_vue2.default.use(_vueRouter2.default);
	_vue2.default.use(_vueAsyncData2.default);

	//配置路由
	//---------------------------
	router = new _vueRouter2.default({
		hasbang: true,
		history: false,
		linkActiveClass: 'active'
	});

	//路由切换转场动画
	//---------------------------
	router.beforeEach(function (_ref) {
		var to = _ref.to;
		var next = _ref.next;

		var ridx = VIP.randomInt(VIP.aniNames.length - 1);
		var app = to.router.app;

		app.getAsideLinks(to.path); //更新左侧导航
		app.effect = VIP.aniNames[ridx];

		console.warn('args:', arguments, app.effect);

		window.scrollTo(0, 0);

		// next();
		app.$nextTick(next);
	});

	router.afterEach(function (_ref2) {
		var from = _ref2.from;
		var to = _ref2.to;


		var app = router.app;
		app.setBreadCrumbs({ url: to.path });

		if (to.path && to.path.match(/^\/\w+$/)) {
			//路由到顶级菜单 重置之前的左侧导航高亮
			from.path && app.resetPrevAsideLinks(VIP.segments(from.path, 1, true));
		}
	});

	router.map(_routes2.default);
	router.redirect({
		'*': '/index'
	});

	//设置ajax
	//---------------------------
	(0, _ajax2.default)(_vue2.default, router);

	//使用插件 vuex-router-sync
	//---------------------------
	(0, _vuexRouterSync.sync)(_store2.default, router);

	//启动路由
	//---------------------------
	router.start(_App2.default, '#app');
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var _stringify = __webpack_require__(4);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* ----------------------------
	 * @ 业务相关的公共函数
	 * 如：showPop, redirectTo
	 * ----------------------------
	 */
	var Vue = __webpack_require__(7);

	var VIP = __webpack_require__(8);

	function redirectTo(url) {}
	//codes	


	// 打印vue实例的数据
	function vlog(obj) {
		if (obj instanceof Vue) {
			console.warn('sorry, 不能打印vue的实例, 请打印实例内部数据');
		} else {
			return JSON.parse((0, _stringify2.default)(obj));
		}
	}

	//派生子组件
	function createSubComponent(superOpts, subOpts) {
		var Super = Vue.extend(superOpts);
		return Super.extend(subOpts);
	}

	// 获取添加/删除backdrop的transition定义
	function getTransWithBackdrop(type) {
		//type: aside, modal
		var klass = type + '-backdrop';
		var selector = '.' + klass;

		var tansitionHooks = {
			beforeEnter: function beforeEnter(el) {
				$(el).show(); //显示元素 添加backdrop
				$('<div class="' + klass + ' fade"></div>').appendTo('body');
			},
			enter: function enter(el) {
				$(el).addClass('in');
				$(selector).addClass('in');
			},
			leave: function leave(el) {
				$(el).removeClass('in');
			},
			afterLeave: function afterLeave(el) {
				$(selector).remove();
			}
		};

		return tansitionHooks;
	}

	var publicFns = {
		redirectTo: redirectTo,
		createSubComponent: createSubComponent,
		getTransWithBackdrop: getTransWithBackdrop,
		vlog: vlog
	};

	VIP.extend(VIP, publicFns, {
		_fns: {
			"public": publicFns
		}
	});

	module.exports = VIP;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(5), __esModule: true };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(6)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = Vue;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = __webpack_require__(9);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * ------------------------------------
	 * @ 业务无关的公共函数
	 * 如： url, cookie, validate
	 * ------------------------------------
	 */
	// import animations from 'extends/transitions';

	/**
	 * @ string
	 */
	function capitalize(str) {
		if (str == null) return '';
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function camelize(str, sep) {
		var parts;
		sep = sep || '-';
		if (str.indexOf(sep) === -1) return str;

		parts = str.split(sep).map(function (part, i) {
			return i ? capitalize(part) : part;
		});
		return parts.join('');
	}

	//camelCase -> kabeb-case
	function kabebCase(str) {
		return str.split('').map(function (c, i) {
			if (c.toUpperCase() === c) {
				c = (i ? '-' : '') + c.toLowerCase();
			}
			return c;
		}).join('');
	}

	function toArray(str) {
		if (str instanceof Array) return str;
		str = str.replace(/^\s*\[\s*|\s*\]\s*$/g, '');
		return str.split(',');
	}

	/**
	 * @ boolean
	 */
	function makeBoolean(val) {

		if (typeof val !== 'string') {
			return Boolean(val);
		} else {
			switch (val.toLowerCase()) {
				case 'true':
					val = true;
					break;
				case 'false':
				case 'undefined':
				case 'null':
				case 'nan':
				case '0':
					val = false;
					break;
				default:
					val = true;
			}
			return val;
		}
	}

	/**
	 * @ number
	 */
	function makeNumber(val) {

		return Number(val);
	}

	function randomInt(start, end) {
		var tmp;
		if (arguments.length === 1) {
			end = start;
			start = 0;
		}
		if (start > end) {
			tmp = start;
			start = end;
			end = tmp;
		}
		return start + Math.floor(Math.random() * (Math.abs(end - start) + 1));
	}

	/**
	 * @ object
	 */
	function eachKey(obj, iterator) {
		var key, result;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) {
				result = iterator(obj[key], key, obj);
				if (result === false) {
					break;
				}
			}
		}
	}

	function filterKey(obj, iterator) {
		var ret = {};
		eachKey(obj, function (val, key, o) {
			if (iterator.apply(obj, arguments)) {
				ret[key] = val;
			}
		});
		return ret;
	}

	// 深度拷贝
	function extend() {
		var isObject = function isObject(val) {
			return (typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) === 'object';
		};

		function doExtend(dst, src) {
			eachKey(src, function (val, key) {
				if (isObject(dst[key]) && isObject(src[key])) {
					//对应key都是对象 递归
					extend(dst[key], src[key]);
				} else {
					dst[key] = val;
				}
			});
			return dst;
		}
		var args = makeArray(arguments);
		if (isObject(this) && args.length === 1) {
			args.unshift(this);
		}
		return args.reduce(doExtend);
	}

	function extendKeys(dst, src, keys) {
		eachKey(src, function (val, key) {
			if (keys.indexOf(key) > -1) {
				dst[key] = src[key];
			}
		});
		return dst;
	}

	/**
	 * @ array
	 */
	function makeArray(arrayLike) {
		var slice = Array.prototype.slice;
		return slice.call(arrayLike);
	}

	function range(start, size, step) {
		step = step || 1;
		size = size < 1 ? 1 : size;
		var arr = new Array(size + 1).join('v').split('');
		return arr.map(function (v, i) {
			return start + i * step;
		});
	}

	/**
	 * @ types
	 */
	function typeFactory(type) {
		function isType(type, val) {
			var toString = Object.prototype.toString;
			type = type.toLowerCase();
			return toString.call(val).slice(8, -1).toLowerCase() === type;
		}
		return isType.bind(null, type);
	}
	var types = {};
	(function () {
		var dataTypes = ['number', 'boolean', 'string', 'object', 'function', 'array'];
		dataTypes.forEach(function (type) {
			types['is' + capitalize(type)] = typeFactory(type);
		});
	})();

	/**
	 * @url	
	 */
	var url = {
		queryParse: function queryParse(url) {
			url = url || location.href;

			function handlePair(kv) {
				var arr = kv.split('=');
				oParam[arr[0]] = decodeURIComponent(arr[1] == null ? '' : arr[1]);
			}
			var re = /\?(.+?)(#\w*)?$/;
			var match = url.match(re);
			var oParam = {},
			    sParam = '';
			if (match) {
				sParam = match[1];
				sParam.split('&').forEach(handlePair);
			}
			return oParam;
		},
		queryStringify: function queryStringify(oParam) {
			// 同$.param
			var arr = [];
			eachKey(oParam, function (val, key) {
				arr.push(key + '=' + encodeURIComponent(val));
			});
			return arr.join('&');
		},
		//获取url片段数组或某片段
		//segments('/foo/bar/zoo', 1, true) => '/foo'
		//segments('/foo/bar/zoo') => ['foo', 'bar', 'zoo']
		segments: function segments(path, index, isPrefix) {
			var segs = path.replace(/\s/g, '').split('/');
			!segs[0] && segs.shift();

			var tmp;
			if (arguments.length === 1) {
				return segs;
			} else {

				if (types.isBoolean(index)) {
					//参数调整
					tmp = isPrefix;
					isPrefix = index;
					index = tmp;
				}

				if (index == null && isPrefix) {
					return segs.map(function (seg) {
						return '/' + seg;
					});
				}

				index = index - 0;
				if (isNaN(index) || index > segs.length) {
					//参数校验
					debug('index 参数不合法');
					return '';
				} else {
					return (isPrefix ? '/' : '') + segs[index - 1];
				}
			}
		}
	};

	/**
	 * @ shim es5
	 */
	;
	(function () {
		if (!Function.prototype.bind) {
			Function.prototype.bind = function (context) {
				var self = this;
				var bindArgs = makeArray(arguments).slice(1);
				return function () {
					var args = bindArgs.concat(makeArray(arguments));
					return self.apply(context, args);
				};
			};
		}

		if (![].forEach) {
			Array.prototype.forEach = function (iterator) {
				for (var i = 0, len = this.length; i < len; i++) {
					iterator(this[i], i, this);
				}
			};
		}

		if (![].map) {
			Array.prototype.map = function (iterator) {
				var ret = [];
				this.forEach(function (val, i, arr) {
					ret.push(iterator(val, i, arr));
				});
				return ret;
			};
		}

		if (![].filter) {
			Array.prototype.filter = function (iterator) {
				var ret = [];
				this.forEach(function (val, i, arr) {
					var result = iterator(val, i, arr);
					if (result) {
						ret.push(result);
					}
				});
				return ret;
			};
		}
	})();

	/**
	 * @ log
	 */
	function debug(msg) {
		try {
			console.log('[DEBUG]:' + msg);
		} catch (e) {
			console.warn('[ERR]:(debug)', e);
		}
	}

	/**
	 * @ export
	 */

	function setVIP() {
		if (typeof window === 'undefined') return;

		if (typeof window.VIP === 'undefined') {
			return window.VIP = eVIP;
		}
	}

	var objUtils = {
		eachKey: eachKey,
		filterKey: filterKey,
		extendKeys: extendKeys,
		extend: extend
	};

	var arrUtils = {
		makeArray: makeArray,
		range: range
	};

	var strUtils = {
		capitalize: capitalize,
		camelize: camelize,
		kabebCase: kabebCase,
		toArray: toArray
	};

	var boolUtils = {
		makeBoolean: makeBoolean
	};

	var numUtils = {
		makeNumber: makeNumber,
		randomInt: randomInt
	};

	var utils = {
		_fns: {
			obj: objUtils,
			arr: arrUtils,
			str: strUtils,
			bool: boolUtils,
			url: url,
			type: types
		}
	};

	var eVIP = extend({}, objUtils, arrUtils, strUtils, boolUtils, numUtils, types, url, utils);

	// VIP设为全局变量
	setVIP();

	module.exports = eVIP;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(10);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(60);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(11), __esModule: true };

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(12);
	__webpack_require__(55);
	module.exports = __webpack_require__(59).f('iterator');

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(13)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(16)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(14)
	  , defined   = __webpack_require__(15);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(17)
	  , $export        = __webpack_require__(18)
	  , redefine       = __webpack_require__(32)
	  , hide           = __webpack_require__(22)
	  , has            = __webpack_require__(33)
	  , Iterators      = __webpack_require__(34)
	  , $iterCreate    = __webpack_require__(35)
	  , setToStringTag = __webpack_require__(51)
	  , getPrototypeOf = __webpack_require__(53)
	  , ITERATOR       = __webpack_require__(52)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(19)
	  , core      = __webpack_require__(6)
	  , ctx       = __webpack_require__(20)
	  , hide      = __webpack_require__(22)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 19 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(21);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(23)
	  , createDesc = __webpack_require__(31);
	module.exports = __webpack_require__(27) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(24)
	  , IE8_DOM_DEFINE = __webpack_require__(26)
	  , toPrimitive    = __webpack_require__(30)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(27) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(25);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(27) && !__webpack_require__(28)(function(){
	  return Object.defineProperty(__webpack_require__(29)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(28)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(25)
	  , document = __webpack_require__(19).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(25);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(22);

/***/ },
/* 33 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(36)
	  , descriptor     = __webpack_require__(31)
	  , setToStringTag = __webpack_require__(51)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(22)(IteratorPrototype, __webpack_require__(52)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(24)
	  , dPs         = __webpack_require__(37)
	  , enumBugKeys = __webpack_require__(49)
	  , IE_PROTO    = __webpack_require__(46)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(29)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(50).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(23)
	  , anObject = __webpack_require__(24)
	  , getKeys  = __webpack_require__(38);

	module.exports = __webpack_require__(27) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(39)
	  , enumBugKeys = __webpack_require__(49);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(33)
	  , toIObject    = __webpack_require__(40)
	  , arrayIndexOf = __webpack_require__(43)(false)
	  , IE_PROTO     = __webpack_require__(46)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(41)
	  , defined = __webpack_require__(15);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(42);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(40)
	  , toLength  = __webpack_require__(44)
	  , toIndex   = __webpack_require__(45);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(14)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(14)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(47)('keys')
	  , uid    = __webpack_require__(48);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(19)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 49 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(19).document && document.documentElement;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(23).f
	  , has = __webpack_require__(33)
	  , TAG = __webpack_require__(52)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(47)('wks')
	  , uid        = __webpack_require__(48)
	  , Symbol     = __webpack_require__(19).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(33)
	  , toObject    = __webpack_require__(54)
	  , IE_PROTO    = __webpack_require__(46)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(15);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(56);
	var global        = __webpack_require__(19)
	  , hide          = __webpack_require__(22)
	  , Iterators     = __webpack_require__(34)
	  , TO_STRING_TAG = __webpack_require__(52)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(57)
	  , step             = __webpack_require__(58)
	  , Iterators        = __webpack_require__(34)
	  , toIObject        = __webpack_require__(40);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(16)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(52);

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(61), __esModule: true };

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(62);
	__webpack_require__(73);
	__webpack_require__(74);
	__webpack_require__(75);
	module.exports = __webpack_require__(6).Symbol;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(19)
	  , has            = __webpack_require__(33)
	  , DESCRIPTORS    = __webpack_require__(27)
	  , $export        = __webpack_require__(18)
	  , redefine       = __webpack_require__(32)
	  , META           = __webpack_require__(63).KEY
	  , $fails         = __webpack_require__(28)
	  , shared         = __webpack_require__(47)
	  , setToStringTag = __webpack_require__(51)
	  , uid            = __webpack_require__(48)
	  , wks            = __webpack_require__(52)
	  , wksExt         = __webpack_require__(59)
	  , wksDefine      = __webpack_require__(64)
	  , keyOf          = __webpack_require__(65)
	  , enumKeys       = __webpack_require__(66)
	  , isArray        = __webpack_require__(69)
	  , anObject       = __webpack_require__(24)
	  , toIObject      = __webpack_require__(40)
	  , toPrimitive    = __webpack_require__(30)
	  , createDesc     = __webpack_require__(31)
	  , _create        = __webpack_require__(36)
	  , gOPNExt        = __webpack_require__(70)
	  , $GOPD          = __webpack_require__(72)
	  , $DP            = __webpack_require__(23)
	  , $keys          = __webpack_require__(38)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(71).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(68).f  = $propertyIsEnumerable;
	  __webpack_require__(67).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(17)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(22)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(48)('meta')
	  , isObject = __webpack_require__(25)
	  , has      = __webpack_require__(33)
	  , setDesc  = __webpack_require__(23).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(28)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(19)
	  , core           = __webpack_require__(6)
	  , LIBRARY        = __webpack_require__(17)
	  , wksExt         = __webpack_require__(59)
	  , defineProperty = __webpack_require__(23).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(38)
	  , toIObject = __webpack_require__(40);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(38)
	  , gOPS    = __webpack_require__(67)
	  , pIE     = __webpack_require__(68);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 67 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 68 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(42);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(40)
	  , gOPN      = __webpack_require__(71).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(39)
	  , hiddenKeys = __webpack_require__(49).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(68)
	  , createDesc     = __webpack_require__(31)
	  , toIObject      = __webpack_require__(40)
	  , toPrimitive    = __webpack_require__(30)
	  , has            = __webpack_require__(33)
	  , IE8_DOM_DEFINE = __webpack_require__(26)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(27) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 73 */
/***/ function(module, exports) {

	

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(64)('asyncIterator');

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(64)('observable');

/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = VueRouter;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	(function () {
	  var vue // lazy bind

	  var asyncData = {
	    created: function () {
	      if (!vue) {
	        console.warn('[vue-async-data] not installed!')
	        return
	      }
	      if (this.$options.asyncData) {
	        if (this._defineMeta) {
	          // 0.12 compat
	          this._defineMeta('$loadingAsyncData', true)
	        } else {
	          // ^1.0.0-alpha
	          vue.util.defineReactive(this, '$loadingAsyncData', true)
	        }
	      }
	    },
	    compiled: function () {
	      this.reloadAsyncData()
	    },
	    methods: {
	      reloadAsyncData: function () {
	        var load = this.$options.asyncData
	        if (load) {
	          var self = this
	          var resolve = function (data) {
	            if (data) {
	              for (var key in data) {
	                self.$set(key, data[key])
	              }
	            }
	            self.$loadingAsyncData = false
	            self.$emit('async-data')
	          }
	          var reject = function (reason) {
	            var msg = '[vue] async data load failed'
	            if (reason instanceof Error) {
	              console.warn(msg)
	              throw reason
	            } else {
	              console.warn(msg + ': ' + reason)
	            }
	          }
	          this.$loadingAsyncData = true
	          var res = load.call(this, resolve, reject)
	          if (res && typeof res.then === 'function') {
	            res.then(resolve, reject)
	          }
	        }
	      }
	    }
	  }

	  var api = {
	    mixin: asyncData,
	    install: function (Vue, options) {
	      vue = Vue
	      Vue.options = Vue.util.mergeOptions(Vue.options, asyncData)
	    }
	  }

	  if(true) {
	    module.exports = api
	  } else if(typeof define === 'function' && define.amd) {
	    define(function () { return api })
	  } else if (typeof window !== 'undefined') {
	    window.VueAsyncData = api
	  }
	})()


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
		'/index': {
			component: __webpack_require__(79)
		},
		'/demo': {
			component: function component(resolve, reject) {
				__webpack_require__.e/* require */(1, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(86)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
			}
		},
		'/special': {
			component: function component(resolve) {
				__webpack_require__.e/* require */(2, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(94)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
			}
		},
		'/component': {
			component: {
				template: '<h3>{{$route.path}}</h3>'
			}
		},
		'/config': {
			component: {
				template: '<h3>{{$route.path}}</h3>'
			}
		},
		'/customer': {
			component: {
				template: '<h3>{{$route.path}}</h3>'
			}
		},
		'/usergroup': {
			component: {
				template: '<h3>{{$route.path}}</h3>'
			}
		},
		'/log': {
			component: {
				template: '<h3>{{$route.path}}</h3>'
			}
		},
		'/whitelist': {
			component: {
				template: '<h3>{{$route.path}}</h3>'
			}
		},

		'/special/new': {
			component: function component(resolve) {
				__webpack_require__.e/* require */(3, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(113)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
			}
		},
		'/special/types': {
			component: function component(resolve) {
				__webpack_require__.e/* require */(4, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(116)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
			}
		},
		'/special/exportUrl': {
			component: {
				template: '<h3>{{$route.path}}</h3>'
			}
		},
		'/component/new': {
			component: {
				template: '<h3>{{$route.path}}</h3>'
			}
		},
		'/component/style': {
			component: {
				template: '<h3>{{$route.path}}</h3>'
			}
		},
		'/component/style/types': {
			component: {
				template: '<h3>{{$route.path}}</h3>'
			}
		},
		'/config/new': {
			component: {
				template: '<h3>{{$route.path}}</h3>'
			}
		},
		'/customer/new': {
			component: {
				template: '<h3>{{$route.path}}</h3>'
			}
		},
		'/customer/types': {
			component: {
				template: '<h3>{{$route.path}}</h3>'
			}
		},
		'/customer/client': {
			component: {
				template: '<h3>{{$route.path}}</h3>'
			}
		},
		'/customer/client/edition': {
			component: {
				template: '<h3>{{$route.path}}</h3>'
			}
		},
		'/usergroup/new': {
			component: {
				template: '<h3>{{$route.path}}</h3>'
			}
		},
		'/log/export': {
			component: {
				template: '<h3>{{$route.path}}</h3>'
			}
		},
		'/whitelist/export': {
			component: {
				template: '<h3>{{$route.path}}</h3>'
			}
		}
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__vue_script__ = __webpack_require__(84);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\index\\index.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(85);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./index.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(82);
	module.exports = __webpack_require__(6).Object.keys;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(54)
	  , $keys    = __webpack_require__(38);

	__webpack_require__(83)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(18)
	  , core    = __webpack_require__(6)
	  , fails   = __webpack_require__(28);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 84 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <template>
	// 	<div class="index-view">
	// 		<h3>最新版本更新情况 (V3.12)</h3>
	// 		<ul>
	// 			<li>档期个性化—支持走dap数据录入的档期个性化排序 档期样式更新—支持显示红包金额 专题分类管理功能—支持专题分</li>
	// 			<li>富文本组件—可支持图文混排的专题页制作 新增专题权限管理—完善角色权限管理，支持专题分类可见 </li>
	// 			<li>操作优化—支持在发布预览页直接调整显示隐藏...</li>
	// 		</ul>
	// 	</div>
	// </template>
	//
	// <script>

	exports.default = {
		ready: function ready() {
			console.log('index ready..');
		},
		data: function data() {
			return {
				user: 'sindy'
			};
		}
	};
	// </script>

/***/ },
/* 85 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"index-view\">\n\t<h3>最新版本更新情况 (V3.12)</h3>\n\t<ul>\n\t\t<li>档期个性化—支持走dap数据录入的档期个性化排序 档期样式更新—支持显示红包金额 专题分类管理功能—支持专题分</li>\n\t\t<li>富文本组件—可支持图文混排的专题页制作 新增专题权限管理—完善角色权限管理，支持专题分类可见 </li>\n\t\t<li>操作优化—支持在发布预览页直接调整显示隐藏...</li>\n\t</ul>\n</div>\n";

/***/ },
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
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


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
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

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
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

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if (media) {
			styleElement.setAttribute("media", media);
		}

		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.updateTips = updateTips;
	exports.addLoading = addLoading;
	exports.setBreadCrumbs = setBreadCrumbs;
	exports.resetPrevAsideLinks = resetPrevAsideLinks;
	exports.toggleSidebar = toggleSidebar;
	exports.getAsideLinks = getAsideLinks;

	var _mutationTypes = __webpack_require__(97);

	var types = _interopRequireWildcard(_mutationTypes);

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}

	function updateTips(_ref, type, text) {
	  var dispatch = _ref.dispatch;

	  dispatch(types.TIPS_UPDATE, type, text);
	}

	function addLoading(_ref2, inc) {
	  var dispatch = _ref2.dispatch;

	  dispatch(inc ? types.LOADING_INCREMENT : types.LOADING_DECREMENT);
	}

	function setBreadCrumbs(_ref3, link) {
	  var dispatch = _ref3.dispatch;

	  dispatch(types.BREADCRUMBS_SET, link);
	}

	function resetPrevAsideLinks(_ref4, key) {
	  var dispatch = _ref4.dispatch;

	  dispatch(types.RESET_PREV_ASIDE_LINKS, key);
	}

	function toggleSidebar(_ref5, show) {
	  var dispatch = _ref5.dispatch;

	  dispatch(types.TOGGLE_SIDEBAR, show);
	}

	function getAsideLinks(_ref6, path) {
	  var dispatch = _ref6.dispatch;

	  dispatch(types.GET_ASIDE_LINKS, path);
	}

/***/ },
/* 97 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var BREADCRUMBS_SET = exports.BREADCRUMBS_SET = 'BREADCRUMBS_SET';
	var BREADCRUMBS_RESET = exports.BREADCRUMBS_RESET = 'BREADCRUMBS_RESET';

	var LOADING_INCREMENT = exports.LOADING_INCREMENT = 'LOADING_INCREMENT';
	var LOADING_DECREMENT = exports.LOADING_DECREMENT = 'LOADING_DECREMENT';

	var TIPS_UPDATE = exports.TIPS_UPDATE = 'TIPS_UPDATE';

	var GET_ASIDE_LINKS = exports.GET_ASIDE_LINKS = 'GET_ASIDE_LINKS';

	var RESET_PREV_ASIDE_LINKS = exports.RESET_PREV_ASIDE_LINKS = 'RESET_PREV_ASIDE_LINKS';

	var TOGGLE_SIDEBAR = exports.TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @ resource的方式包装与后端交互的api
	 * 如：user, special
	 */
	var Vue = __webpack_require__(7);
	var VIP = __webpack_require__(2);
	var resources = {};

	/**
	 * @url 默认会被覆盖 值任意
	 * @params 无默认参数 调用resource方法时传入 如：User.get({userId:2})
	 * @actions resource相关的方法 CURD and others
	 * @options 为action指定 默认http选项
	 */
	// Vue.resource(url, params, actions, options);

	function setResource(name, otherActions, params) {
		name = VIP.capitalize(name);
		params = params || {};

		var defActions = {
			get: {
				url: 'get' + name //url为apiKey
			}, query: {
				url: 'query' + name
			}, save: {
				url: 'save' + name,
				method: 'POST'
			}, update: {
				url: 'update' + name,
				method: 'POST'
			}, remove: {
				url: 'del' + name
			}
		};
		var actions = VIP.extend({}, defActions, otherActions);

		// /UserApi
		var resource = Vue.resource('/' + name + 'Api', params, actions, { method: 'GET' });
		resources[name] = resource;
	}

	var resourceNames = ['user', 'special'];
	resourceNames.forEach(setResource);

	module.exports = resources;

/***/ },
/* 99 */,
/* 100 */,
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__webpack_require__(102);
	__vue_script__ = __webpack_require__(104);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Vtable.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(108);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./Vtable.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(103);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(90)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Vtable.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Vtable.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(89)();
	// imports


	// module
	exports.push([module.id, ".table .tr-empty {\n  display: none;\n}\n.table .tr-empty td {\n  line-height: 80px !important;\n  text-align: center;\n}\n.table-empty .tr-empty {\n  display: table-row;\n}\n.glyphicon-arrow-up.disabled:before,\n.glyphicon-arrow-down.disabled:before {\n  color: #E7E1E1;\n}\n", ""]);

	// exports


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _public = __webpack_require__(2);

	var _vue = __webpack_require__(7);

	var _vue2 = _interopRequireDefault(_vue);

	var _Vtbody = __webpack_require__(105);

	var _Vtbody2 = _interopRequireDefault(_Vtbody);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		name: 'Vtable',
		props: {
			bordered: { //样式类
				type: Boolean,
				coerce: _public.makeBoolean,
				default: true
			},
			striped: {
				type: Boolean,
				coerce: _public.makeBoolean,
				default: true
			},
			hover: {
				type: Boolean,
				coerce: _public.makeBoolean,
				default: true
			},
			responsive: {
				type: Boolean,
				coerce: _public.makeBoolean,
				default: true
			},
			checkable: { //是否可勾选
				type: Boolean,
				coerce: _public.makeBoolean,
				default: true
			},
			sortKey: { //排序字段
				type: String,
				default: 'id'
			},
			columns: { //表格字段定义
				type: Array,
				default: function _default() {
					return [];
				}
			},
			tableData: { //表格数据
				type: Array,
				default: function _default() {
					return [];
				}
			}
		},
		computed: {
			order: function order() {
				var _this = this;

				return this.columns.filter(function (col) {
					return col.name === _this.sortKey;
				})[0].order;
			}
		},
		events: {
			tableData: function tableData(data) {
				this.tableData = data;
			}
		},
		methods: {
			sortBy: function sortBy(col) {
				if (this.sortKey == col.name) {
					//当前排序字段 反序
					col.order = col.order > 0 ? -1 : 1;
				} else {
					this.sortKey = col.name;
				}
			}
		},
		components: {
			Vtbody: _Vtbody2.default
		}

	};
	// </script>
	//
	// <style lang="less">
	// 	.table .tr-empty {
	// 		display: none;
	//
	// 		td {
	// 			line-height: 80px !important;
	// 			text-align: center;
	// 		}
	// 	}
	// 	.table-empty .tr-empty {
	// 		display: table-row;
	// 	}
	// 	.glyphicon-arrow-up.disabled:before, .glyphicon-arrow-down.disabled:before {
	// 		color: #E7E1E1;
	// 	}
	// </style>
	// <template>
	// 	<div class="table-wrap" v-ahref="tableData">
	// 		<table :class="{table:true, 'table-bordered': bordered, 'table-striped': striped, 'table-hover': hover , 'table-responsive': responsive, 'table-empty': tableData.length==0}">
	// 			<thead>
	// 				<th v-for="col in columns">{{col.text || col.name}} <span v-if="col.sortable" @click="sortBy(col)" class="glyphicon hand" :class="{'glyphicon-arrow-down': col.order<0,'glyphicon-arrow-up': col.order>0, disabled: col.name!=sortKey}"></span></th>
	// 			</thead>
	// 			<tbody is="vtbody" :rows="tableData" :cols="columns"  :sort-key="sortKey"  :order="order"  :checkable="checkable"></tbody>
	// 			<tfoot></tfoot>
	// 		</table>
	// 		<slot name="pager"></slot>
	// 	</div>
	//
	// </template>
	//
	// <script>

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__vue_script__ = __webpack_require__(106);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Vtbody.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(107);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./Vtbody.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 106 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <template>
	// 	<tbody>
	// 		<tr v-for="row in rows | orderBy sortKey order">
	// 			<td v-for="n in cols.length">
	// 				<span v-if="n<cols.length-1">{{row[cols[n].name]}}</span>
	// 				<p v-else>
	// 					<a class="btn btn-primary btn-sm" @click="view(row)">查看</a>
	// 					<a class="btn btn-primary btn-sm" @click="edit(row)">编辑</a>
	// 					<a class="btn btn-primary btn-sm" @click="del(row)">删除</a>
	// 				</p>
	// 			</td>
	// 		</tr>
	// 		<tr class="tr-empty">
	// 			<td colspan="{{cols.length}}">暂时没有数据..</td>
	// 		</tr>
	// 	</tbody>
	// </template>
	//
	// <script>
	exports.default = {
		name: 'Vtbody',
		props: {
			sortKey: String,
			order: {
				type: Number,
				default: 1
			},
			rows: {
				// twoWay: true,
				type: Array,
				default: function _default() {
					[];
				}
			},
			cols: {
				type: Array,
				default: function _default() {
					return [];
				}
			}
		},
		methods: {
			view: function view() {},
			edit: function edit(row) {},
			del: function del(row) {
				this.$dispatch('showDelModal', row, this.$parent);
			}
		}
	};
	// </script>

/***/ },
/* 107 */
/***/ function(module, exports) {

	module.exports = "\n<tbody>\n\t<tr v-for=\"row in rows | orderBy sortKey order\">\n\t\t<td v-for=\"n in cols.length\">\n\t\t\t<span v-if=\"n<cols.length-1\">{{row[cols[n].name]}}</span>\n\t\t\t<p v-else>\n\t\t\t\t<a class=\"btn btn-primary btn-sm\" @click=\"view(row)\">查看</a>\n\t\t\t\t<a class=\"btn btn-primary btn-sm\" @click=\"edit(row)\">编辑</a>\n\t\t\t\t<a class=\"btn btn-primary btn-sm\" @click=\"del(row)\">删除</a>\n\t\t\t</p>\n\t\t</td>\n\t</tr>\n\t<tr class=\"tr-empty\">\n\t\t<td colspan=\"{{cols.length}}\">暂时没有数据..</td>\n\t</tr>\n</tbody>\n";

/***/ },
/* 108 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"table-wrap\" v-ahref=\"tableData\">\n\t<table :class=\"{table:true, 'table-bordered': bordered, 'table-striped': striped, 'table-hover': hover , 'table-responsive': responsive, 'table-empty': tableData.length==0}\">\n\t\t<thead>\n\t\t\t<th v-for=\"col in columns\">{{col.text || col.name}} <span v-if=\"col.sortable\" @click=\"sortBy(col)\" class=\"glyphicon hand\" :class=\"{'glyphicon-arrow-down': col.order<0,'glyphicon-arrow-up': col.order>0, disabled: col.name!=sortKey}\"></span></th>\n\t\t</thead>\n\t\t<tbody is=\"vtbody\" :rows=\"tableData\" :cols=\"columns\"  :sort-key=\"sortKey\"  :order=\"order\"  :checkable=\"checkable\"></tbody>\n\t\t<tfoot></tfoot>\n\t</table>\n\t<slot name=\"pager\"></slot>\n</div>\n\n";

/***/ },
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__webpack_require__(121);
	__vue_script__ = __webpack_require__(123);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Tab.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(127);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./Tab.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(122);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(90)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Tab.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Tab.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(89)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.tab-content > .tab-pane{display: block;}\n", ""]);

	// exports


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _TabNav = __webpack_require__(124);

	var _TabNav2 = _interopRequireDefault(_TabNav);

	var _public = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	// 	<div class="tab-wrap" v-ahref="tabNavs">
	// 		<nav is="vnav" :type="type" :justified="justified" :stacked="stacked" :links="tabNavs">
	// 			<tab-nav slot="nav-item" v-for="tabNav in tabNavs" :tab-nav="tabNav"></tab-nav>
	// 		</nav>
	// 		<div class="tab-content">
	// 			<slot></slot>
	// 		</div>
	// 	</div>
	// </template>
	//
	//
	// <script>
	exports.default = {
		name: 'Tab',
		props: {
			type: {
				type: String,
				default: 'tabs'
			},
			justified: {
				type: Boolean,
				default: false,
				coerce: _public.makeBoolean
			},
			stacked: {
				type: Boolean,
				default: false,
				coerce: _public.makeBoolean
			},
			active: {
				type: Number,
				default: 0
			}
		},
		data: function data() {
			return { tabNavs: [] };
		},
		events: {
			addTabNav: function addTabNav(item) {
				this.tabNavs.push(item);
			},
			setActiveIndex: function setActiveIndex(index) {
				this.active = index;
			}
		},
		methods: {},
		components: {
			TabNav: _TabNav2.default
		}
	};
	// </script>
	//
	// <style>
	// 	.tab-content > .tab-pane{display: block;}
	// </style>

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__vue_script__ = __webpack_require__(125);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\TabNav.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(126);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./TabNav.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 125 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <template>
	// 	<li :class="{active: tabNav.active}" @click="setActive(tabNav)">
	// 		<a data-toggle="tab">{{tabNav.header}}</a>
	// 	</li>
	// </template>
	//
	// <script>
	exports.default = {
		name: 'TabNav',
		props: {
			tabNav: Object,
			require: true
		},
		methods: {
			setActive: function setActive(tabNav) {
				this.$dispatch('activate', tabNav); // tab activate, nav 捕获事件并处理
				this.$dispatch('setActiveIndex', tabNav.index); //tabpane activate ,通过计算属性 关联activeIndex和tabpane.active
			}
		}
	};
	// </script>

/***/ },
/* 126 */
/***/ function(module, exports) {

	module.exports = "\n<li :class=\"{active: tabNav.active}\" @click=\"setActive(tabNav)\">\n\t<a data-toggle=\"tab\">{{tabNav.header}}</a>\n</li>\n";

/***/ },
/* 127 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"tab-wrap\" v-ahref=\"tabNavs\">\n\t<nav is=\"vnav\" :type=\"type\" :justified=\"justified\" :stacked=\"stacked\" :links=\"tabNavs\">\n\t\t<tab-nav slot=\"nav-item\" v-for=\"tabNav in tabNavs\" :tab-nav=\"tabNav\"></tab-nav>\n\t</nav>\n\t<div class=\"tab-content\">\n\t\t<slot></slot>\n\t</div>\n</div>\n";

/***/ },
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = register;

	var _vue = __webpack_require__(7);

	var _vue2 = _interopRequireDefault(_vue);

	var _util = __webpack_require__(8);

	var _components = __webpack_require__(133);

	var _components2 = _interopRequireDefault(_components);

	var _directives = __webpack_require__(205);

	var _directives2 = _interopRequireDefault(_directives);

	var _transitions = __webpack_require__(206);

	var _transitions2 = _interopRequireDefault(_transitions);

	var _filters = __webpack_require__(207);

	var _filters2 = _interopRequireDefault(_filters);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @ 注册器
	 */


	function doReg(method, map) {
		(0, _util.eachKey)(map, function (options, name) {
			_vue2.default[method](name, options);
		});
	}

	function register() {
		(0, _util.eachKey)({ components: _components2.default, directives: _directives2.default, transitions: _transitions2.default, filters: _filters2.default }, function (map, key) {
			var method = key.replace(/s$/, '');
			doReg(method, map);
		});
	}

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * @ 全局扩展自定义组件
	 */
	//import VueStrap from 'vue-strap';
	var VueStrap = __webpack_require__(134);

	var _require = __webpack_require__(8);

	var extendKeys = _require.extendKeys;
	var extend = _require.extend;


	var myComponents = {
		Loading: __webpack_require__(135),
		Breadcrumb: __webpack_require__(138),
		Modal: __webpack_require__(142),
		Dropdown: __webpack_require__(147),
		Tab: __webpack_require__(120),
		TabPane: __webpack_require__(150),
		Vnav: __webpack_require__(153),
		Vselect: __webpack_require__(161),
		Voption: __webpack_require__(166),
		Popover: __webpack_require__(171),
		Tooltip: __webpack_require__(176),
		Typeahead: __webpack_require__(181),
		Aside: __webpack_require__(186),
		Btn: __webpack_require__(191),
		BtnGroup: __webpack_require__(194),
		Thumbnail: __webpack_require__(197),
		Pager: __webpack_require__(200),
		Vtable: __webpack_require__(101)
	};

	var VueStrapPicked = {};

	extendKeys(VueStrapPicked, VueStrap, ['alert', 'panel', 'accordion', 'datepicker', 'checkboxGroup', 'checkboxBtn', 'radioGroup', 'radioBtn', 'affix']);

	var components = extend({}, VueStrapPicked, myComponents);

	exports.default = components;

/***/ },
/* 134 */
/***/ function(module, exports) {

	module.exports = VueStrap;

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__vue_script__ = __webpack_require__(136);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Loading.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(137);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./Loading.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _public = __webpack_require__(2);

	exports.default = {
		name: 'Loading',
		props: {
			show: {
				type: Boolean,
				coerce: _public.makeBoolean,
				default: false
			}
		}
	};
	// </script>
	// <template>
	// 	<div class="loading" id="loading" v-show="show">
	// 		<img src="/src/assets/images/loading.gif" alt="loading">
	// 	</div>
	// </template>
	//
	// <script>

/***/ },
/* 137 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"loading\" id=\"loading\" v-show=\"show\">\n\t<img src=\"/src/assets/images/loading.gif\" alt=\"loading\">\n</div>\n";

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__vue_script__ = __webpack_require__(139);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Breadcrumb.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(141);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./Breadcrumb.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getters = __webpack_require__(140);

	var _actions = __webpack_require__(96);

	// <template>
	// 	<ol class="breadcrumb" v-last="lastLink" v-ahref="links">
	// 		<li v-for="link in links" v-link="{path: link.url, exact: true}"><a>{{link.text}}</a></li>
	// 	</ol>
	// </template>
	//
	//
	// <script>
	exports.default = {
		name: 'Breadcrumb',
		data: function data() {
			return {};
		},

		vuex: {
			getters: {
				lastLink: _getters.lastCrumb,
				links: _getters.crumbs
			},
			actions: {
				setBreadCrumbs: _actions.setBreadCrumbs
			}
		},
		ready: function ready() {
			this.setBreadCrumbs({ url: this.$route.path });
		},

		directives: {
			last: { //处理最后的li不包含a
				deep: false,
				update: function update(lastLink) {
					var len = this.vm.links.length;
					Vue.nextTick(function () {
						$(this.el).find('li').each(function (i, li) {
							if (i === len - 1) {
								// last
								$(li).addClass('active').html($(li).text());
							} else {
								if (!$(li).find('a').length) {
									$(li).removeClass('active').html('<a href="javascript:;">' + $(li).text() + '</a>');
								}
							}
						});
					}.bind(this));
				}
			}
		}
	};
	// </script>
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 140 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.lastCrumb = lastCrumb;
	exports.crumbs = crumbs;
	function lastCrumb(state) {
		return state.breadCrumbs[state.breadCrumbs.length - 1];
	}

	function crumbs(state) {
		return state.breadCrumbs;
	}
	/*
	export function asideLinks (state){//路由改变，重新执行该getter, 更新左侧导航
		
		return state.asideLinkMap['/'+ state.route.path.slice(1).split('/').shift()];
	}*/

/***/ },
/* 141 */
/***/ function(module, exports) {

	module.exports = "\n<ol class=\"breadcrumb\" v-last=\"lastLink\" v-ahref=\"links\">\n\t<li v-for=\"link in links\" v-link=\"{path: link.url, exact: true}\"><a>{{link.text}}</a></li>\n</ol>\n";

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__webpack_require__(143);
	__vue_script__ = __webpack_require__(145);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Modal.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(146);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./Modal.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(144);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(90)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Modal.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Modal.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(89)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\r\n.vue-modal{display: block;}\r\n.modal {\r\n    -webkit-transition: all 0.3s ease;\r\n    transition: all 0.3s ease;\r\n}\r\n\r\n.modal.in {\r\n    background-color: rgba(0, 0, 0, 0.5);\r\n}\r\n\r\n.modal.zoom .modal-dialog {\r\n    -webkit-transform: scale(0.1);\r\n    transform: scale(0.1);\r\n    top: 300px;\r\n    opacity: 0;\r\n    -webkit-transition: all 0.3s;\r\n    transition: all 0.3s;\r\n}\r\n\r\n.modal.zoom.in .modal-dialog {\r\n    -webkit-transform: scale(1);\r\n    transform: scale(1);\r\n    -webkit-transform: translate3d(0, -300px, 0);\r\n    transform: translate3d(0, -300px, 0);\r\n    opacity: 1;\r\n}\r\n", ""]);

	// exports


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(VIP) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _public = __webpack_require__(2);

	exports.default = {
	    name: 'Modal',
	    props: {
	        type: { //弹窗类型 alert(单按钮) confirm(双按钮)
	            type: String,
	            default: 'confirm'
	        },
	        okText: {
	            type: String,
	            default: '确定'
	        },
	        cancelText: {
	            type: String,
	            default: '取消'
	        },
	        title: {
	            type: String,
	            default: '提示'
	        },
	        show: {
	            type: Boolean,
	            coerce: _public.makeBoolean,
	            twoWay: true
	        },
	        width: {
	            default: null
	        },
	        onconfirm: {
	            type: Function,
	            default: function _default() {}
	        },
	        effect: { //动画效果 fade zoom
	            type: String,
	            default: 'fade'
	        },
	        backdrop: { //是否需要背景遮罩
	            type: Boolean,
	            coerce: _public.makeBoolean,
	            default: true
	        },
	        large: {
	            type: Boolean,
	            coerce: _public.makeBoolean,
	            default: false
	        },
	        small: {
	            type: Boolean,
	            coerce: _public.makeBoolean,
	            default: false
	        }
	    },
	    transitions: {
	        'modal': VIP.getTransWithBackdrop('modal')
	    },
	    methods: {
	        close: function close() {
	            this.show = false;
	        },
	        cancelCallback: function cancelCallback() {
	            //点击取消按钮 默认关闭弹窗
	            this.close();
	        }
	    }
	};
	// </script>
	// <style>
	// .vue-modal{display: block;}
	// .modal {
	//     transition: all 0.3s ease;
	// }
	//
	// .modal.in {
	//     background-color: rgba(0, 0, 0, 0.5);
	// }
	//
	// .modal.zoom .modal-dialog {
	//     -webkit-transform: scale(0.1);
	//     -moz-transform: scale(0.1);
	//     -ms-transform: scale(0.1);
	//     transform: scale(0.1);
	//     top: 300px;
	//     opacity: 0;
	//     -webkit-transition: all 0.3s;
	//     -moz-transition: all 0.3s;
	//     transition: all 0.3s;
	// }
	//
	// .modal.zoom.in .modal-dialog {
	//     -webkit-transform: scale(1);
	//     -moz-transform: scale(1);
	//     -ms-transform: scale(1);
	//     transform: scale(1);
	//     -webkit-transform: translate3d(0, -300px, 0);
	//     transform: translate3d(0, -300px, 0);
	//     opacity: 1;
	// }
	// </style>
	// <template>
	//     <div class="modal vue-modal"  :class="{'fade':effect === 'fade', 'zoom':effect === 'zoom'}"  transition="modal" v-show="show"  role="dialog" >
	//
	//         <div v-bind:class="{'modal-dialog':true,'modal-lg':large,'modal-sm':small}" role="document" v-bind:style="{width: width}">
	//             <div class="modal-content">
	//                 <slot name="modal-header">
	//                     <div class="modal-header">
	//                         <button type="button" class="close" @click="close"><span>&times;</span></button>
	//                         <h4 class="modal-title">
	//                           <slot name="title">
	//                             {{title}}
	//                           </slot>
	//                         </h4>
	//                     </div>
	//                 </slot>
	//
	//                 <slot name="modal-body">
	//                     <div class="modal-body">default body..</div>
	//                 </slot>
	//
	//                 <slot name="modal-footer">
	//                     <div class="modal-footer">
	//                         <button type="button" class="btn btn-default"  :class=" {'btn-primary': type=='alert'}"  @click="cancelCallback">{{ cancelText }}</button>
	//                         <button type="button"  v-if="type !== 'alert'" class="btn btn-primary" @click="onconfirm">{{ okText }}</button>
	//                     </div>
	//                 </slot>
	//             </div>
	//         </div>
	//
	//     </div>
	// </template>
	// <script>
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 146 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"modal vue-modal\"  :class=\"{'fade':effect === 'fade', 'zoom':effect === 'zoom'}\"  transition=\"modal\" v-show=\"show\"  role=\"dialog\" >\n    \n    <div v-bind:class=\"{'modal-dialog':true,'modal-lg':large,'modal-sm':small}\" role=\"document\" v-bind:style=\"{width: width}\">\n        <div class=\"modal-content\">\n            <slot name=\"modal-header\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" @click=\"close\"><span>&times;</span></button>\n                    <h4 class=\"modal-title\"> \n                      <slot name=\"title\">\n                        {{title}}\n                      </slot>\n                    </h4>\n                </div>\n            </slot>\n    \n            <slot name=\"modal-body\">\n                <div class=\"modal-body\">default body..</div>\n            </slot>\n    \n            <slot name=\"modal-footer\">\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-default\"  :class=\" {'btn-primary': type=='alert'}\"  @click=\"cancelCallback\">{{ cancelText }}</button>\n                    <button type=\"button\"  v-if=\"type !== 'alert'\" class=\"btn btn-primary\" @click=\"onconfirm\">{{ okText }}</button>\n                </div>\n            </slot>\n        </div>\n    </div>\n\n</div>\n";

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__vue_script__ = __webpack_require__(148);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Dropdown.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(149);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./Dropdown.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _public = __webpack_require__(2);

	exports.default = {
	  name: 'Dropdown',
	  props: {
	    dropup: {
	      type: Boolean,
	      coerce: _public.makeBoolean,
	      default: false
	    },
	    menuRight: {
	      type: Boolean,
	      coerce: _public.makeBoolean,
	      default: false
	    },
	    open: {
	      type: Boolean,
	      coerce: _public.makeBoolean,
	      default: false
	    },
	    btnSize: { //lg, sm, xs
	      type: String,
	      default: 'md'
	    },
	    btnType: { //warning, danger, info, success, default
	      type: String,
	      default: 'default'
	    },
	    btnText: {
	      type: String,
	      default: 'Dropdown'
	    },
	    links: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    },
	    onselect: { //选择列表项回调
	      type: Function,
	      default: function _default(link, index, $event) {}
	    }
	  },
	  methods: {
	    toggle: function toggle() {
	      this.open = !this.open;
	    }
	  },
	  computed: {
	    inBtnGroup: function inBtnGroup() {
	      return this.$parent.constructor.name.toLowerCase().indexOf('btngroup') > -1;
	    },
	    btnStyle: function btnStyle() {
	      this.btnSize = this.$parent.size;
	      this.btnType = this.$parent.type;
	      return 'btn-group-' + this.$parent.size + ' btn-group-' + this.$parent.type;
	    },
	    dropdownClass: function dropdownClass() {
	      var aClass = [];
	      aClass.push(this.dropup ? 'dropup' : 'dropdown');
	      this.open && aClass.push('open');
	      this.inBtnGroup && aClass.push('btn-group', this.btnStyle);
	      return aClass.join(' ');
	    }
	  } /*,
	    directives: {
	    	open: {//dropdown显示控制 以及点击其他地方隐藏dropdown
	    		bind: function(){
	    			var self = this;
	    			var toggleOpen = function (){
	    				self.vm.open = !self.vm.open;
	    			};
	    			
	    			self.hideDropdown = function hideDropdown(event){
	    				if (!self.el.contains(event.target)) {//点击dropdown之外 隐藏dropdown
	    					self.vm.open = false;
	    				}
	    			};
	    			
	    			$('body').on('click', self.hideDropdown);//其他地方 隐藏
	    			
	    			self.on('click', toggleOpen);//点击自身 显隐切换
	    		},
	    		unbind: function(){
	    			$('body').off('click', this.hideDropdown);
	    		}
	    	}
	    }*/
	};
	// </script>
	// <template>
	//  <div class="dropdown-wrap dis-ib " :class="dropdownClass" v-ahref="links" v-click-outside="open">
	//
	//   <slot name="dropdown-toggle">
	//  		<button class="btn dropdown-toggle" :class="['btn-'+btnSize, 'btn-'+btnType]" data-toggle="dropdown" @click.stop="toggle">{{btnText}} <span class="caret"></span></button>
	// 	</slot>
	//
	// 	<slot name="dropdown-menu">
	// 	 	<ul class="dropdown-menu" :class="{'dropdown-menu-right': menuRight}"  v-show="open" transition="dropdown">
	// 			<li v-for="link in links" :class="{disabled: link.disabled, divider:!link.text}"  @click="onselect(link, $index, $event)">
	// 				<a v-link="{path: link.url}" v-if="!!link.text">{{link.text}}</a>
	// 			</li>
	// 	 	</ul>
	// 	</slot>
	//
	//  </div>
	// </template>
	// <script>

/***/ },
/* 149 */
/***/ function(module, exports) {

	module.exports = "\n <div class=\"dropdown-wrap dis-ib \" :class=\"dropdownClass\" v-ahref=\"links\" v-click-outside=\"open\">\n \t\n  <slot name=\"dropdown-toggle\">\n \t\t<button class=\"btn dropdown-toggle\" :class=\"['btn-'+btnSize, 'btn-'+btnType]\" data-toggle=\"dropdown\" @click.stop=\"toggle\">{{btnText}} <span class=\"caret\"></span></button>\n\t</slot>\n\n\t<slot name=\"dropdown-menu\">\n\t \t<ul class=\"dropdown-menu\" :class=\"{'dropdown-menu-right': menuRight}\"  v-show=\"open\" transition=\"dropdown\">\n\t\t\t<li v-for=\"link in links\" :class=\"{disabled: link.disabled, divider:!link.text}\"  @click=\"onselect(link, $index, $event)\">\n\t\t\t\t<a v-link=\"{path: link.url}\" v-if=\"!!link.text\">{{link.text}}</a>\n\t\t\t</li>\n\t \t</ul>\n\t</slot>\n \n </div>\n";

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__vue_script__ = __webpack_require__(151);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\TabPane.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(152);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./TabPane.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(VIP) {'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <template>
	// 	<div class="tab-pane animated" :transition="effect | random "  v-show="active">
	// 		<slot></slot>
	// 	</div>
	// </template>
	//
	// <script>
	exports.default = {
		name: 'TabPane',
		props: {
			header: String,
			effect: {
				type: Array,
				default: function _default() {
					return VIP.aniNames;
				}
			}
		},
		data: function data() {
			return { index: 0 };
		},

		computed: {
			active: function active() {
				return this.index === this.$parent.active;
			}
		},
		created: function created() {
			this.index = this.$parent.tabNavs.length;
			this.$dispatch('addTabNav', { header: this.header, index: this.index, active: this.active }); //创建对应的tabNav
		}
	};
	// </script>
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 152 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"tab-pane animated\" :transition=\"effect | random \"  v-show=\"active\">\n\t<slot></slot>\n</div>\n";

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__webpack_require__(154);
	__vue_script__ = __webpack_require__(156);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Vnav.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(160);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./Vnav.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(155);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(90)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Vnav.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Vnav.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(89)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.sidebar .nav-pills > li.active > a{border-radius: 0;}\n", ""]);

	// exports


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _public = __webpack_require__(2);

	var _NavItem = __webpack_require__(157);

	var _NavItem2 = _interopRequireDefault(_NavItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	// 	<ul :class="{nav: true, 'nav-tabs': type==='tabs','nav-pills': type==='pills','nav-justified': justified,'nav-stacked': stacked}" v-ahref="links">
	// 		<slot name="nav-item">
	// 			<nav-item v-for="link in links" :link="link"></nav-item>
	// 		</slot>
	// 	</ul>
	// </template>
	//
	// <script>

	exports.default = {
		name: 'Vnav',
		props: {
			type: String,
			justified: {
				type: Boolean,
				default: false,
				coerce: _public.makeBoolean
			},
			stacked: {
				type: Boolean,
				default: false,
				coerce: _public.makeBoolean
			},
			links: {
				type: Array,
				default: function _default() {
					return [];
				}
			}
		},
		data: function data() {
			return {};
		},
		components: {
			NavItem: _NavItem2.default
		},
		events: {
			activate: function activate(link) {
				this.links.forEach(function (item) {
					item.active = item === link;
				});
			}
		}
	};
	// </script>
	//
	// <style>
	// 	.sidebar .nav-pills > li.active > a{border-radius: 0;}
	// </style>

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__vue_script__ = __webpack_require__(158);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\NavItem.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(159);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./NavItem.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 158 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <template>
	// 	<li :class="{active: link.active}" @click="setActive(link)">
	// 		<a v-link="{path: link.url}">{{link.text}}</a>
	// 	</li>
	// </template>
	//
	// <script>
	exports.default = {
		name: 'NavItem',
		props: {
			link: Object,
			require: true
		},
		methods: {
			setActive: function setActive(link) {
				this.$dispatch('activate', link);
			}
		}
	};
	// </script>

/***/ },
/* 159 */
/***/ function(module, exports) {

	module.exports = "\n<li :class=\"{active: link.active}\" @click=\"setActive(link)\">\n\t<a v-link=\"{path: link.url}\">{{link.text}}</a>\n</li>\n";

/***/ },
/* 160 */
/***/ function(module, exports) {

	module.exports = "\n<ul :class=\"{nav: true, 'nav-tabs': type==='tabs','nav-pills': type==='pills','nav-justified': justified,'nav-stacked': stacked}\" v-ahref=\"links\">\n\t<slot name=\"nav-item\">\n\t\t<nav-item v-for=\"link in links\" :link=\"link\"></nav-item>\n\t</slot>\n</ul>\n";

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__webpack_require__(162);
	__vue_script__ = __webpack_require__(164);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Vselect.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(165);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./Vselect.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(163);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(90)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-62059cba&scoped=true!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Vselect.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-62059cba&scoped=true!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Vselect.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(89)();
	// imports


	// module
	exports.push([module.id, ".bs-searchbox[_v-62059cba] {\n  padding: 4px 8px;\n}\n.btn-group .dropdown-menu .notify[_v-62059cba] {\n  position: absolute;\n  bottom: 5px;\n  width: 96%;\n  margin: 0 2%;\n  min-height: 26px;\n  padding: 3px 5px;\n  background: #f5f5f5;\n  border: 1px solid #e3e3e3;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\n  pointer-events: none;\n  opacity: .9;\n}\n.select-wrap .dropdown-menu[_v-62059cba] {\n  display: block;\n}\n.select-wrap .dropdown-menu .select-item[_v-62059cba] {\n  position: relative;\n}\n", ""]);

	// exports


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _public = __webpack_require__(2);

	var _vue = __webpack_require__(7);

	var _vue2 = _interopRequireDefault(_vue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//   <div class="select-wrap btn-group">
	//       <btn class="dropdown-toggle" @click="toggleDropdown" @blur="show = false" :disabled="disabled" :type="btnType" :size="btnSize">
	//           <span class="btn-placeholder" v-show="showPlaceholder">{{placeholder}}</span>
	//           <span class="btn-content">{{ selecteds | selectedsText }}</span>
	//           <span class="caret"></span>
	//       </btn>
	//       <ul class="dropdown-menu" v-show="show" transition="dropdown">
	//           <li v-if="search" class="bs-searchbox">
	//               <input type="text" placeholder="Search" v-model="searchText" class="form-control" autocomplete="off" @focus="show=true" @blur="show=false">
	//           </li>
	//           <li is="voption" v-for="option in options | filterBy searchText "  :option="option" @selectoption="select(option);"></li>
	//           <div class="notify" v-show="showNotify" transition="fadein">Limit reached ({{limit}} items max). </div>
	//       </ul>
	//   </div>
	// </template>
	//
	// <script>
	exports.default = {
	  name: 'Vselect',
	  props: {
	    options: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    },
	    placeholder: {
	      type: String,
	      default: '请选择'
	    },
	    btnType: {
	      type: String,
	      default: 'default'
	    },
	    btnSize: {
	      type: String,
	      default: 'md'
	    },
	    multiple: { //是否多选
	      type: Boolean,
	      coerce: _public.makeBoolean,
	      default: false
	    },
	    search: { //是否可搜索
	      type: Boolean,
	      coerce: _public.makeBoolean,
	      default: false
	    },
	    limit: { //最多选择几项
	      type: Number,
	      coerce: _public.makeNumber,
	      default: 8
	    },
	    disabled: {
	      type: Boolean,
	      coerce: _public.makeBoolean,
	      default: false
	    }
	  },
	  created: function created() {
	    !this.multiple && (this.limit = 1);
	    this.options.forEach(function (opt) {
	      if (opt.selected == null) {
	        _vue2.default.set(opt, 'selected', false);
	      }
	    });
	  },
	  data: function data() {
	    return {
	      searchText: null,
	      show: false,
	      showNotify: false
	    };
	  },

	  computed: {
	    selecteds: function selecteds() {
	      //计算selecteds数组
	      return this.options.filter(function (opt) {
	        return opt.selected;
	      });
	    },
	    showPlaceholder: function showPlaceholder() {
	      return this.selecteds.length === 0;
	    }
	  },
	  watch: {},
	  methods: {
	    select: function select(opt) {
	      var _this = this;

	      //点选列表项
	      if (!opt.selected) {
	        //将勾选
	        if (!this.multiple && this.selecteds.length) {
	          //单选 且 已选
	          this.selecteds[0].selected = false; //清除原有单选项
	        }

	        if (this.selecteds.length >= this.limit) {
	          this.showNotify = true;
	          setTimeout(function () {
	            _this.showNotify = false;_this.show = false;
	          }, 1000);
	        } else {
	          opt.selected = true; //勾选 //selecteds会被立即重新计算
	        }
	      } else {
	          //将不勾选
	          opt.selected = false; //selecteds会被立即重新计算
	        }

	      if (this.selecteds.length === this.limit && !this.showNotify) {
	        //不可再勾选 则隐藏列表
	        this.toggleDropdown();
	      }

	      this.$dispatch('select', this.selecteds);
	    },
	    toggleDropdown: function toggleDropdown() {
	      //显隐下拉列表
	      this.show = !this.show;
	    }
	  },
	  filters: {
	    selectedsText: function selectedsText(selecteds) {
	      return selecteds.map(function (opt) {
	        return opt.text;
	      }).join(', ');
	    }
	  }
	};
	// </script>
	//
	// <style scoped lang="less">
	//
	//   .bs-searchbox {
	//     padding: 4px 8px;
	//   }
	//   .btn-group .dropdown-menu .notify {
	//     position: absolute;
	//     bottom: 5px;
	//     width: 96%;
	//     margin: 0 2%;
	//     min-height: 26px;
	//     padding: 3px 5px;
	//     background: #f5f5f5;
	//     border: 1px solid #e3e3e3;
	//     box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
	//      pointer-events: none;
	//     opacity: .9;
	//   }
	//   .select-wrap{
	//     .dropdown-menu {
	//       display: block;
	//       .select-item{
	//         position: relative;
	//
	//       }
	//     }
	//
	//   }
	// </style>

/***/ },
/* 165 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"select-wrap btn-group\" _v-62059cba=\"\">\n    <btn class=\"dropdown-toggle\" @click=\"toggleDropdown\" @blur=\"show = false\" :disabled=\"disabled\" :type=\"btnType\" :size=\"btnSize\" _v-62059cba=\"\">\n        <span class=\"btn-placeholder\" v-show=\"showPlaceholder\" _v-62059cba=\"\">{{placeholder}}</span>\n        <span class=\"btn-content\" _v-62059cba=\"\">{{ selecteds | selectedsText }}</span>\n        <span class=\"caret\" _v-62059cba=\"\"></span>\n    </btn>\n    <ul class=\"dropdown-menu\" v-show=\"show\" transition=\"dropdown\" _v-62059cba=\"\">\n        <li v-if=\"search\" class=\"bs-searchbox\" _v-62059cba=\"\">\n            <input type=\"text\" placeholder=\"Search\" v-model=\"searchText\" class=\"form-control\" autocomplete=\"off\" @focus=\"show=true\" @blur=\"show=false\" _v-62059cba=\"\">\n        </li>\n        <li is=\"voption\" v-for=\"option in options | filterBy searchText \" :option=\"option\" @selectoption=\"select(option);\" _v-62059cba=\"\"></li>\n        <div class=\"notify\" v-show=\"showNotify\" transition=\"fadein\" _v-62059cba=\"\">Limit reached ({{limit}} items max). </div>\n    </ul>\n</div>\n";

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__webpack_require__(167);
	__vue_script__ = __webpack_require__(169);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Voption.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(170);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./Voption.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(168);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(90)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-16988bb3&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Voption.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-16988bb3&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Voption.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(89)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.check-mark[_v-16988bb3]{\n  position: absolute;\n  display: inline-block;\n  right: 15px;\n  margin-top: 5px;\n}\n\n", ""]);

	// exports


/***/ },
/* 169 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <li class="select-item">
	//     <a @mousedown.prevent="trigger(option)">
	//       {{ option.text }}
	//       <span class="glyphicon glyphicon-ok check-mark" v-show="option.selected"></span>
	//     </a>
	//   </li>
	// </template>
	//
	// <script>
	exports.default = {
	  props: {
	    option: {
	      type: Object
	    }
	  },
	  methods: {
	    trigger: function trigger(option) {
	      this.$dispatch('selectoption', option);
	    }
	  }
	};
	// </script>
	//
	// <style scoped>
	//   .check-mark{
	//     position: absolute;
	//     display: inline-block;
	//     right: 15px;
	//     margin-top: 5px;
	//   }
	//
	// </style>

/***/ },
/* 170 */
/***/ function(module, exports) {

	module.exports = "\n<li class=\"select-item\" _v-16988bb3=\"\">\n  <a @mousedown.prevent=\"trigger(option)\" _v-16988bb3=\"\">\n    {{ option.text }}\n    <span class=\"glyphicon glyphicon-ok check-mark\" v-show=\"option.selected\" _v-16988bb3=\"\"></span>\n  </a>\n</li>\n";

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__webpack_require__(172);
	__vue_script__ = __webpack_require__(174);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Popover.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(175);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./Popover.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(173);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(90)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Popover.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Popover.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(89)();
	// imports


	// module
	exports.push([module.id, "/*vars*/\n.popoverBottom {\n  left: 50%;\n  top: auto;\n  bottom: -11px;\n  -webkit-transform: translate(-50%, 100%);\n  transform: translate(-50%, 100%);\n}\n.popoverLeft {\n  left: 0;\n  top: 50%;\n  -webkit-transform: translate(-100%, -50%);\n  transform: translate(-100%, -50%);\n}\n.popoverRight {\n  left: auto;\n  right: -11px;\n  top: 50%;\n  -webkit-transform: translate(100%, -50%);\n  transform: translate(100%, -50%);\n}\n.popover-wrap {\n  position: relative;\n  overflow: visible;\n  display: inline-block;\n}\n.popover-wrap .popover {\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  min-width: 180px;\n}\n.popover-wrap .popover.top {\n  left: 50%;\n  top: 0;\n  -webkit-transform: translate(-50%, -100%);\n  transform: translate(-50%, -100%);\n}\n.popover-wrap .popover.bottom {\n  left: 50%;\n  top: auto;\n  bottom: -11px;\n  -webkit-transform: translate(-50%, 100%);\n  transform: translate(-50%, 100%);\n}\n.popover-wrap .popover.left {\n  left: 0;\n  top: 50%;\n  -webkit-transform: translate(-100%, -50%);\n  transform: translate(-100%, -50%);\n}\n.popover-wrap .popover.right {\n  left: auto;\n  right: -11px;\n  top: 50%;\n  -webkit-transform: translate(100%, -50%);\n  transform: translate(100%, -50%);\n}\n", ""]);

	// exports


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _public = __webpack_require__(2);

	exports.default = {
	  props: {
	    trigger: { //click, focus, hover
	      type: String,
	      default: 'click'
	    },
	    effect: { //fadein, scale
	      type: String,
	      default: 'fadein'
	    },
	    header: {
	      type: String
	    },
	    content: {
	      type: String
	    },
	    placement: { //left, right, top, bottom
	      type: String,
	      default: 'top'
	    }
	  },
	  data: function data() {
	    return {
	      show: false
	    };
	  },

	  methods: {
	    toggle: function toggle(isShow) {
	      if (isShow == null) {
	        this.show = !this.show;
	      } else {
	        this.show = isShow;
	      }
	    }
	  },
	  directives: {
	    bindEvent: {
	      update: function update(trigger) {
	        var _this = this;

	        this.handler = function (evt) {
	          var vm = _this.vm;
	          switch (evt.type) {
	            case 'mouseenter':
	            case 'focus':
	              vm.toggle(true);
	              break;
	            case 'mouseleave':
	            case 'blur':
	              vm.toggle(false);
	              break;
	            case 'click':
	              vm.toggle();
	              break;
	            default:
	              console.warn('[popover] prop "trigger" is not valid');
	          }
	        };

	        this.events = {
	          'hover': 'mouseenter mouseleave',
	          'focus': 'focus blur',
	          'click': 'click'
	        };

	        $(this.el).on(this.events[trigger], this.handler);
	      },
	      unbind: function unbind() {
	        $(this.el).off(this.events[this.vm.trigger], this.hanlder);
	      }
	    }
	  }
	};
	// </script>
	//
	// <style lang="less">
	// 	@import '../assets/css/vars.less';
	//
	// 	.popover-wrap{
	// 		.popoverWrap;
	// 	}
	// 	.popover-wrap .popover{
	// 		.popover;
	// 	}
	// 	.popover-wrap .popover.top{
	// 		.popoverTop;
	// 	}
	// 	.popover-wrap .popover.bottom{
	// 		.popoverBottom;
	// 	}
	// 	.popover-wrap .popover.left{
	// 		.popoverLeft;
	// 	}
	// 	.popover-wrap .popover.right{
	// 		.popoverRight;
	// 	}
	//
	// </style>
	//
	// <template>
	// 	<div class="popover-wrap" v-click-outside="show">
	// 	  <span v-el:trigger v-bind-event="trigger">
	// 	    <slot><button class="btn btn-default">show popover</button></slot>
	// 	  </span>
	// 	  <div class="popover" :class="placement" v-el:popover v-show="show" :transition="effect">
	// 	      <div class="arrow"></div>
	// 	      <h3 class="popover-title" v-show="header">
	// 	          <slot name="header">
	// 	            {{header}}
	// 	          </slot>
	// 	      </h3>
	// 	      <div class="popover-content">
	// 	        <slot name="content">
	// 	            {{{content}}}
	// 	        </slot>
	// 	      </div>
	// 	  </div>
	// 	</div>
	// </template>
	//
	// <script>
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 175 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"popover-wrap\" v-click-outside=\"show\">\n  <span v-el:trigger v-bind-event=\"trigger\">\n    <slot><button class=\"btn btn-default\">show popover</button></slot>\n  </span>\n  <div class=\"popover\" :class=\"placement\" v-el:popover v-show=\"show\" :transition=\"effect\">\n      <div class=\"arrow\"></div>\n      <h3 class=\"popover-title\" v-show=\"header\"> \n          <slot name=\"header\">\n            {{header}} \n          </slot> \n      </h3>\n      <div class=\"popover-content\">\n        <slot name=\"content\"> \n            {{{content}}} \n        </slot> \n      </div>\n  </div>\n</div>\n";

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__webpack_require__(177);
	__vue_script__ = __webpack_require__(179);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Tooltip.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(180);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./Tooltip.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(178);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(90)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Tooltip.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Tooltip.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(89)();
	// imports


	// module
	exports.push([module.id, "/*vars*/\n.popoverBottom {\n  left: 50%;\n  top: auto;\n  bottom: -11px;\n  -webkit-transform: translate(-50%, 100%);\n  transform: translate(-50%, 100%);\n}\n.popoverLeft {\n  left: 0;\n  top: 50%;\n  -webkit-transform: translate(-100%, -50%);\n  transform: translate(-100%, -50%);\n}\n.popoverRight {\n  left: auto;\n  right: -11px;\n  top: 50%;\n  -webkit-transform: translate(100%, -50%);\n  transform: translate(100%, -50%);\n}\n.tooltip {\n  opacity: .9;\n  white-space: nowrap;\n}\n.tooltip-wrap {\n  position: relative;\n  overflow: visible;\n  display: inline-block;\n}\n.tooltip-wrap .tooltip {\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  min-width: auto;\n}\n.tooltip-wrap .tooltip.top {\n  left: 50%;\n  top: 0;\n  -webkit-transform: translate(-50%, -100%);\n  transform: translate(-50%, -100%);\n}\n.tooltip-wrap .tooltip.bottom {\n  left: 50%;\n  top: auto;\n  bottom: -11px;\n  -webkit-transform: translate(-50%, 100%);\n  transform: translate(-50%, 100%);\n}\n.tooltip-wrap .tooltip.left {\n  left: 0;\n  top: 50%;\n  -webkit-transform: translate(-100%, -50%);\n  transform: translate(-100%, -50%);\n}\n.tooltip-wrap .tooltip.right {\n  left: auto;\n  right: -11px;\n  top: 50%;\n  -webkit-transform: translate(100%, -50%);\n  transform: translate(100%, -50%);\n}\n", ""]);

	// exports


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Popover = __webpack_require__(171);

	var _Popover2 = _interopRequireDefault(_Popover);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  mixins: [_Popover2.default],
	  props: {
	    trigger: {
	      type: String,
	      default: 'hover'
	    },
	    effect: {
	      type: String,
	      default: 'scale'
	    }
	  }
	};
	// </script>
	//
	// <style lang="less">
	//   @import "../assets/css/vars.less";
	//
	//   .tooltip {
	//     opacity: .9;
	//     white-space: nowrap;
	//   }
	//
	//   .tooltip-wrap{
	//   	.popoverWrap;
	//   }
	//   .tooltip-wrap .tooltip{
	//   	.popover(auto);
	//   }
	//   .tooltip-wrap .tooltip.top{
	//   	.popoverTop;
	//   }
	//   .tooltip-wrap .tooltip.bottom{
	//   	.popoverBottom;
	//   }
	//   .tooltip-wrap .tooltip.left{
	//   	.popoverLeft;
	//   }
	//   .tooltip-wrap .tooltip.right{
	//   	.popoverRight;
	//   }
	//
	// </style>
	// <template>
	//   <div class="tooltip-wrap" v-click-outside="show">
	//
	//     <span v-el:trigger v-bind-event="trigger">
	//   	  <slot></slot>
	//   	</span>
	//
	//   	<div class="tooltip" :class="placement" v-el:popover v-show="show" :transition="effect" role="tooltip">
	//   	  <div class="tooltip-arrow"></div>
	//   	  <div class="tooltip-inner">
	//   	     <slot name="content"> {{{content}}} </slot>
	//   	 </div>
	//   	</div>
	//
	//   </div>
	// </template>
	//
	// <script>

/***/ },
/* 180 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"tooltip-wrap\" v-click-outside=\"show\">\n\t\n  <span v-el:trigger v-bind-event=\"trigger\">\n\t  <slot></slot>\n\t</span>\n\n\t<div class=\"tooltip\" :class=\"placement\" v-el:popover v-show=\"show\" :transition=\"effect\" role=\"tooltip\">\n\t  <div class=\"tooltip-arrow\"></div>\n\t  <div class=\"tooltip-inner\">\n\t     <slot name=\"content\"> {{{content}}} </slot>\n\t </div>\n\t</div>\n\n</div>\n";

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__webpack_require__(182);
	__vue_script__ = __webpack_require__(184);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Typeahead.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(185);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./Typeahead.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(183);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(90)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Typeahead.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Typeahead.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(89)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.typeahead-wrap{\n\tposition: relative;\n}\n\n.dropdown-menu > li > a {\n  cursor: pointer;\n}\n", ""]);

	// exports


/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(VIP) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _public = __webpack_require__(2);

	exports.default = {
	  props: {
	    data: { //提供静态数据 从中筛选
	      type: Array
	    },
	    api: { //后端接口，获取列表数据, 形如:http://site.com/some/api.php?city={query}&other=foo
	      type: String
	    },
	    ondata: {
	      type: Function,
	      default: function _default(res) {
	        this.items = res.data.data;
	        this.showDropdown = this.items.length > 0;
	      }
	    },
	    value: {
	      twoWay: true,
	      type: String
	    },
	    onselect: {
	      type: Function,
	      default: function _default(item, vm) {}
	    },
	    placeholder: {
	      type: String,
	      default: '请输入关键字'
	    },
	    itemHtml: {
	      type: String
	    },
	    debounce: { //input后延时查询
	      type: Number,
	      coerce: _public.makeNumber,
	      default: 100
	    }
	  },
	  data: function data() {
	    return {
	      query: '',
	      current: 0,
	      showDropdown: false,
	      selected: false, //是否已选
	      items: []
	    };
	  },

	  computed: {},
	  watch: {
	    query: function updateList(query, oldQuery) {
	      //关键字改变则更新列表
	      var api,
	          lower = function lower(s) {
	        return s.toLowerCase();
	      };
	      if (!query || this.selected) return;

	      if (this.data) {
	        this.items = this.data.filter(function (item) {
	          return lower(item).indexOf(lower(query)) > -1;
	        });
	        this.showDropdown = this.items.length > 0;
	      } else if (this.api) {
	        api = this.api.replace('{query}', encodeURIComponent(query));
	        this.$http.get(api).then(this.apiCallback);
	      }
	    }
	  },
	  partials: {
	    'item': '<a><span v-html="item | highlight query"></span></a>'
	  },
	  created: function created() {
	    if (this.itemHtml) {
	      this.$options.partials.item = this.itemHtml;
	    }
	  },

	  methods: {
	    reset: function reset() {
	      this.items = [];
	      this.query = '';
	      this.showDropdown = false;
	    },
	    select: function select(item) {
	      //选择列表项
	      this.query = item; //文本框赋值
	      this.value = item; //值传递给外部
	      this.selected = true;
	      this.showDropdown = false; //隐藏列表
	      this.onselect(item, this);
	    },
	    up: function up() {
	      if (this.current > 0) this.current--;
	    },
	    down: function down() {
	      if (this.current < this.items.length - 1) this.current++;
	    }
	  },
	  filters: {
	    highlight: function highlight(value, phrase) {
	      return VIP.isString(value) ? value.replace(new RegExp('(' + phrase + ')', 'gi'), '<strong>$1</strong>') : value;
	    }
	  }
	};

	// </script>
	//
	// <style>
	// 	.typeahead-wrap{
	// 		position: relative;
	// 	}
	//
	// 	.dropdown-menu > li > a {
	// 	  cursor: pointer;
	// 	}
	// </style>
	// <template>
	// 	<div class="typeahead-wrap">
	//
	// 	  <input type="text" class="form-control" :placeholder="placeholder" autocomplete="off" v-model="query" @keydown.up="up" @keydown.down="down" @keydown.enter= "select(items[current])" @keydown.esc="reset" @blur="showDropdown = false" @focus="selected=false" :debounce="debounce" v-el:inputbox />
	// 	  <input type="hidden" name="selectedVal" v-model="value" />
	//
	// 	  <ul class="dropdown-menu" v-show="showDropdown" transition="dropdown">
	// 	    <li v-for="item in items" track-by="$index" :class="{'active': current === $index}" @mouseover="current = $index" @mousedown.prevent="select(item)">
	// 	      <partial name="item"></partial>
	// 	    </li>
	// 	  </ul>
	//
	// 	</div>
	//
	// </template>
	//
	// <script>
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 185 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"typeahead-wrap\">\n\n  <input type=\"text\" class=\"form-control\" :placeholder=\"placeholder\" autocomplete=\"off\" v-model=\"query\" @keydown.up=\"up\" @keydown.down=\"down\" @keydown.enter= \"select(items[current])\" @keydown.esc=\"reset\" @blur=\"showDropdown = false\" @focus=\"selected=false\" :debounce=\"debounce\" v-el:inputbox />\n  <input type=\"hidden\" name=\"selectedVal\" v-model=\"value\" />\n\n  <ul class=\"dropdown-menu\" v-show=\"showDropdown\" transition=\"dropdown\">\n    <li v-for=\"item in items\" track-by=\"$index\" :class=\"{'active': current === $index}\" @mouseover=\"current = $index\" @mousedown.prevent=\"select(item)\">\n      <partial name=\"item\"></partial>\n    </li>\n  </ul>\n\n</div>\n\n";

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__webpack_require__(187);
	__vue_script__ = __webpack_require__(189);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Aside.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(190);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./Aside.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(188);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(90)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Aside.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Aside.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(89)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.aside-open {\n  -webkit-transition: -webkit-transform 0.3s;\n  transition: -webkit-transform 0.3s;\n  transition: transform 0.3s;\n  transition: transform 0.3s, -webkit-transform 0.3s;\n}\n.aside-open.has-push-right {\n  -webkit-transform: translateX(-300px);\n          transform: translateX(-300px);\n}\n.aside {\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    z-index: 1049;\n    overflow: auto;\n    background: #fff;\n}\n.aside.left {\n  left: 0;\n  right: auto;\n}\n.aside.right {\n  left: auto;\n  right: 0;\n}\n\n.slideleft-enter {\n  -webkit-animation:slideleft-in .3s;\n          animation:slideleft-in .3s;\n}\n.slideleft-leave {\n  -webkit-animation:slideleft-out .3s;\n          animation:slideleft-out .3s;\n}\n@-webkit-keyframes slideleft-in {\n  0% {\n    -webkit-transform: translateX(-100%);\n            transform: translateX(-100%);\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes slideleft-in {\n  0% {\n    -webkit-transform: translateX(-100%);\n            transform: translateX(-100%);\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes slideleft-out {\n  0% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: translateX(-100%);\n            transform: translateX(-100%);\n    opacity: 0;\n  }\n}\n@keyframes slideleft-out {\n  0% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: translateX(-100%);\n            transform: translateX(-100%);\n    opacity: 0;\n  }\n}\n.slideright-enter {\n  -webkit-animation:slideright-in .3s;\n          animation:slideright-in .3s;\n}\n.slideright-leave {\n  -webkit-animation:slideright-out .3s;\n          animation:slideright-out .3s;\n}\n@-webkit-keyframes slideright-in {\n  0% {\n    -webkit-transform: translateX(100%);\n            transform: translateX(100%);\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes slideright-in {\n  0% {\n    -webkit-transform: translateX(100%);\n            transform: translateX(100%);\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes slideright-out {\n  0% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: translateX(100%);\n            transform: translateX(100%);\n    opacity: 0;\n  }\n}\n@keyframes slideright-out {\n  0% {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: translateX(100%);\n            transform: translateX(100%);\n    opacity: 0;\n  }\n}\n\n.aside:focus {\n    outline: 0\n}\n\n@media (max-width: 991px) {\n    .aside {\n        min-width:240px\n    }\n}\n\n.aside.left {\n    right: auto;\n    left: 0\n}\n\n.aside.right {\n    right: 0;\n    left: auto\n}\n\n.aside .aside-dialog .aside-header {\n    border-bottom: 1px solid #e5e5e5;\n    min-height: 16.43px;\n    padding: 6px 15px;\n    background: #337ab7;\n    color: #fff\n}\n\n.aside .aside-dialog .aside-header .close {\n    margin-right: -8px;\n    padding: 4px 8px;\n    color: #fff;\n    font-size: 25px;\n    opacity: .8\n}\n\n.aside .aside-dialog .aside-body {\n    position: relative;\n    padding: 15px\n}\n\n.aside .aside-dialog .aside-footer {\n    padding: 15px;\n    text-align: right;\n    border-top: 1px solid #e5e5e5\n}\n\n.aside .aside-dialog .aside-footer .btn+.btn {\n    margin-left: 5px;\n    margin-bottom: 0\n}\n\n.aside .aside-dialog .aside-footer .btn-group .btn+.btn {\n    margin-left: -1px\n}\n\n.aside .aside-dialog .aside-footer .btn-block+.btn-block {\n    margin-left: 0\n}\n\n.aside-backdrop {\n    position: fixed;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    z-index: 1040;\n    opacity: 0;\n    -webkit-transition: opacity .3s ease;\n    transition: opacity .3s ease;\n    background-color: #000\n}\n\n\n.aside-backdrop.in {\n    opacity: .5;\n    filter: alpha(opacity=50)\n}\n", ""]);

	// exports


/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(VIP) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _public = __webpack_require__(2);

	exports.default = {
	  props: {
	    show: {
	      type: Boolean,
	      coerce: _public.makeBoolean,
	      default: true,
	      twoWay: true
	    },
	    placement: {
	      type: String,
	      default: 'right'
	    },
	    header: {
	      type: String
	    },
	    width: {
	      type: Number,
	      coerce: _public.makeNumber,
	      default: '320'
	    }
	  },
	  methods: {
	    close: function close() {
	      this.show = false;
	    }
	  },
	  transitions: {
	    'slideright': VIP.getTransWithBackdrop('aside'),
	    'slideleft': VIP.getTransWithBackdrop('aside')
	  }
	};
	// </script>
	//
	// <style>
	//   .aside-open {
	//     transition: transform 0.3s;
	//   }
	//   .aside-open.has-push-right {
	//     transform: translateX(-300px);
	//   }
	//   .aside {
	//       position: fixed;
	//       top: 0;
	//       bottom: 0;
	//       z-index: 1049;
	//       overflow: auto;
	//       background: #fff;
	//   }
	//   .aside.left {
	//     left: 0;
	//     right: auto;
	//   }
	//   .aside.right {
	//     left: auto;
	//     right: 0;
	//   }
	//
	//   .slideleft-enter {
	//     animation:slideleft-in .3s;
	//   }
	//   .slideleft-leave {
	//     animation:slideleft-out .3s;
	//   }
	//   @keyframes slideleft-in {
	//     0% {
	//       transform: translateX(-100%);
	//       opacity: 0;
	//     }
	//     100% {
	//       transform: translateX(0);
	//       opacity: 1;
	//     }
	//   }
	//   @keyframes slideleft-out {
	//     0% {
	//       transform: translateX(0);
	//       opacity: 1;
	//     }
	//     100% {
	//       transform: translateX(-100%);
	//       opacity: 0;
	//     }
	//   }
	//   .slideright-enter {
	//     animation:slideright-in .3s;
	//   }
	//   .slideright-leave {
	//     animation:slideright-out .3s;
	//   }
	//   @keyframes slideright-in {
	//     0% {
	//       transform: translateX(100%);
	//       opacity: 0;
	//     }
	//     100% {
	//       transform: translateX(0);
	//       opacity: 1;
	//     }
	//   }
	//   @keyframes slideright-out {
	//     0% {
	//       transform: translateX(0);
	//       opacity: 1;
	//     }
	//     100% {
	//       transform: translateX(100%);
	//       opacity: 0;
	//     }
	//   }
	//
	//   .aside:focus {
	//       outline: 0
	//   }
	//
	//   @media (max-width: 991px) {
	//       .aside {
	//           min-width:240px
	//       }
	//   }
	//
	//   .aside.left {
	//       right: auto;
	//       left: 0
	//   }
	//
	//   .aside.right {
	//       right: 0;
	//       left: auto
	//   }
	//
	//   .aside .aside-dialog .aside-header {
	//       border-bottom: 1px solid #e5e5e5;
	//       min-height: 16.43px;
	//       padding: 6px 15px;
	//       background: #337ab7;
	//       color: #fff
	//   }
	//
	//   .aside .aside-dialog .aside-header .close {
	//       margin-right: -8px;
	//       padding: 4px 8px;
	//       color: #fff;
	//       font-size: 25px;
	//       opacity: .8
	//   }
	//
	//   .aside .aside-dialog .aside-body {
	//       position: relative;
	//       padding: 15px
	//   }
	//
	//   .aside .aside-dialog .aside-footer {
	//       padding: 15px;
	//       text-align: right;
	//       border-top: 1px solid #e5e5e5
	//   }
	//
	//   .aside .aside-dialog .aside-footer .btn+.btn {
	//       margin-left: 5px;
	//       margin-bottom: 0
	//   }
	//
	//   .aside .aside-dialog .aside-footer .btn-group .btn+.btn {
	//       margin-left: -1px
	//   }
	//
	//   .aside .aside-dialog .aside-footer .btn-block+.btn-block {
	//       margin-left: 0
	//   }
	//
	//   .aside-backdrop {
	//       position: fixed;
	//       top: 0;
	//       right: 0;
	//       bottom: 0;
	//       left: 0;
	//       z-index: 1040;
	//       opacity: 0;
	//       transition: opacity .3s ease;
	//       background-color: #000
	//   }
	//
	//
	//   .aside-backdrop.in {
	//       opacity: .5;
	//       filter: alpha(opacity=50)
	//   }
	// </style>
	// <template>
	//   <div class="aside" :style="{width:width + 'px'}" :class="{left:placement === 'left', right:placement === 'right'}" v-show="show" :transition="(this.placement === 'left') ? 'slideleft' : 'slideright'" >
	//     <div class="aside-dialog">
	//       <div class="aside-content">
	//
	//         <div class="aside-header">
	//           <button type="button" class="close" @click='close'><span>&times;</span></button>
	//           <h4 class="aside-title">  
	//             <slot name="header"> {{ header }} </slot>
	//           </h4>
	//         </div>
	//
	//         <div class="aside-body">
	//           <slot></slot>
	//         </div>
	//
	//       </div>
	//     </div>
	//   </div>
	// </template>
	//
	// <script>
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 190 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"aside\" :style=\"{width:width + 'px'}\" :class=\"{left:placement === 'left', right:placement === 'right'}\" v-show=\"show\" :transition=\"(this.placement === 'left') ? 'slideleft' : 'slideright'\" >\n  <div class=\"aside-dialog\">\n    <div class=\"aside-content\">\n      \n      <div class=\"aside-header\">\n        <button type=\"button\" class=\"close\" @click='close'><span>&times;</span></button>\n        <h4 class=\"aside-title\">   \n          <slot name=\"header\"> {{ header }} </slot>\n        </h4>\n      </div>\n\n      <div class=\"aside-body\">\n        <slot></slot>\n      </div>\n      \n    </div>\n  </div>\n</div>\n";

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__vue_script__ = __webpack_require__(192);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Btn.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(193);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./Btn.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _public = __webpack_require__(2);

	exports.default = {
		name: 'Btn',
		props: {
			size: { //sm,xs,lg
				type: String,
				default: ''
			},
			type: { //default,success,danger,info,warning
				type: String,
				default: 'default'
			},
			disabled: {
				type: Boolean,
				coerce: _public.makeBoolean,
				default: false
			}
		},
		computed: {
			inBtnGroup: function inBtnGroup() {
				return this.$parent.constructor.name.toLowerCase().indexOf('btngroup') > -1;
			},
			btnStyle: function btnStyle() {
				return this.$parent.size + '-' + this.$parent.type;
			}
		},
		methods: {
			update: function update() {
				var parent = this.$parent;
				if (this.inBtnGroup) {
					//同步btnGroup的设置
					this.type = parent.type;
					this.size = parent.size;
				}
			}
		},
		created: function created() {
			this.update();
		},

		watch: {
			btnStyle: function btnStyle() {
				this.inBtnGroup && this.update();
			}
		}
	};
	// </script>
	// <template>
	// 	<button class="btn" :class="[size?'btn-'+size:'', 'btn-'+type]">
	// 		<slot>
	// 			{{btn.text}}
	// 		</slot>
	// 	</button>
	// </template>
	//
	// <script>

/***/ },
/* 193 */
/***/ function(module, exports) {

	module.exports = "\n<button class=\"btn\" :class=\"[size?'btn-'+size:'', 'btn-'+type]\">\n\t<slot>\n\t\t{{btn.text}}\n\t</slot>\n</button>\n";

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__vue_script__ = __webpack_require__(195);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\BtnGroup.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(196);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./BtnGroup.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _public = __webpack_require__(2);

	exports.default = {
		name: 'BtnGroup',
		props: {
			size: { //sm,xs,lg
				type: String,
				size: ''
			},
			type: { //default,success,danger,info,warning
				type: String,
				default: 'default'
			},
			vertical: {
				type: Boolean,
				coerce: _public.makeBoolean,
				default: false
			}
		}
	};
	// </script>
	// <template>
	// 	<div class="btn-group" :class="[size?'btn-group-'+size:'', 'btn-group-'+type, vertical?'btn-group-vertical':'']">
	// 		<slot></slot>
	// 	</div>
	// </template>
	//
	// <script>

/***/ },
/* 196 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"btn-group\" :class=\"[size?'btn-group-'+size:'', 'btn-group-'+type, vertical?'btn-group-vertical':'']\">\n\t<slot></slot>\n</div>\n";

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__vue_script__ = __webpack_require__(198);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Thumbnail.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(199);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./Thumbnail.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _public = __webpack_require__(2);

	exports.default = {
		props: {
			imgLink: String,
			imgSrc: String,
			title: String,
			hasCaption: {
				type: Boolean,
				coerce: _public.makeBoolean
			}
		},
		created: function created() {
			if (this.hasCaption == null && this.title) {
				this.hasCaption = true;
			}
		}
	};
	// </script>
	// <template>
	// 	<div class="thumbnail">
	// 		<a :href="imgLink" v-if="imgSrc"><img :src="imgSrc"></a>
	// 		<div class="caption" v-if="hasCaption">
	// 			<slot name="title">
	// 				<h3>{{title}}</h3>
	// 			</slot>
	// 			<slot></slot>
	// 		</div>
	// 	</div>
	// </template>
	//
	// <script>

/***/ },
/* 199 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"thumbnail\">\n\t<a :href=\"imgLink\" v-if=\"imgSrc\"><img :src=\"imgSrc\"></a>\n\t<div class=\"caption\" v-if=\"hasCaption\">\n\t\t<slot name=\"title\">\n\t\t\t<h3>{{title}}</h3>\n\t\t</slot>\n\t\t<slot></slot>\n\t</div>\n</div>\n";

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__webpack_require__(201);
	__vue_script__ = __webpack_require__(203);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Pager.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(204);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./Pager.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(202);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(90)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Pager.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Pager.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(89)();
	// imports


	// module
	exports.push([module.id, ".pager-wrap {\n  padding: 0 20px;\n}\n.pager-wrap i {\n  font-style: normal;\n}\n.pager-wrap .pager-info {\n  display: inline-block;\n  vertical-align: middle;\n  line-height: 74px;\n}\n.pager-wrap .pager-info .select-pagesize {\n  width: 200px;\n  margin-left: 10px;\n}\n.pager-wrap .pager-info .select-pagesize .form-control {\n  display: inline;\n  width: auto;\n}\n.pager-wrap .pagination {\n  margin-right: 20px;\n}\n", ""]);

	// exports


/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _public = __webpack_require__(2);

	exports.default = {
		name: 'Pager',
		props: {
			pageSize: { //每页记录数
				type: Number,
				coerce: _public.makeNumber,
				default: 10
			},
			pageSizes: {
				type: Array,
				coerce: _public.toArray,
				default: function _default() {
					return (0, _public.range)(this.pageSize, 3, 10);
				}
			},
			activePage: { //当前页码
				type: Number,
				coerce: _public.makeNumber,
				default: 1
			},
			totalRecords: { //结果总数
				type: Number,
				coerce: _public.makeNumber,
				default: 120
			},
			viewSize: { //分页组件显示页码个数
				type: Number,
				coerce: _public.makeNumber,
				default: 10
			},
			viewStart: { //分页组件开始页码
				type: Number,
				coerce: _public.makeNumber,
				default: 1
			},
			pageData: {
				twoWay: true,
				type: Array,
				default: function _default() {
					return [];
				}
			},
			api: String, //获取数据的API
			table: String //关联的表格 <vtable v-ref:specialtbl..>
		},
		computed: {
			totalPages: function totalPages() {
				//总页数
				return Math.ceil(this.totalRecords / this.pageSize);
			},
			pages: function pages() {
				//页码数组
				return (0, _public.range)(this.viewStart, Math.min(this.viewSize, this.totalPages - (this.viewStart - 1)));
			},
			params: function params() {
				//请求接口参数
				return {
					pageSize: this.pageSize,
					page: this.activePage
				};
			}
		},
		data: function data() {
			return { loadingData: false };
		},
		watch: {
			activePage: function activePage() {
				//这里不用deep也可以
				this.getPageData();
			},
			pageSize: function pageSize(size) {
				this.viewStart = 1;
				if (this.activePage !== 1) {
					this.activePage = 1;
				} else {
					this.getPageData();
				}
			}
		},
		ready: function ready() {
			this.getPageData();
		},

		events: {
			reload: 'getPageData'
		},
		methods: {
			getPageData: function getPageData() {
				this.loadingData = true;
				this.$http.get(this.api, this.params).then(function (res) {
					this.loadingData = false;
					var data = res.data;
					this.totalRecords = data.totalRecords;
					this.pageSize = data.pageSize;
					this.activePage = data.page;

					// this.pageData = data.specials;
					// 数据同步给Table
					/*if(this.$parent.constructor.name.toLowerCase().indexOf('table')>-1 ){
	    	this.$parent.tableData = data.specials;
	    }*/
					this.$dispatch('tableData', data.specials);
				});
			},
			navPrev: function navPrev() {
				if (this.loadingData) return;
				if (this.activePage > 1) {
					//未到达首页
					if (--this.activePage < this.viewStart) {
						this.viewStart = Math.max(1, this.viewStart - this.viewSize);
					}
				}
			},
			navNext: function navNext() {
				if (this.loadingData) return;
				if (this.activePage < this.totalPages) {
					//未到达末尾页
					if (++this.activePage === this.viewStart + this.viewSize) {
						//页码变动
						this.viewStart = this.activePage;
					}
				}
			},
			navTo: function navTo(n) {
				if (this.loadingData) return;
				this.activePage = n;
			}
		}
	};
	// </script>
	//
	// <style lang="less">
	// 	.pager-wrap {
	// 		padding: 0 20px;
	//
	// 		i {
	// 			font-style: normal;
	// 		}
	// 		.pager-info {
	// 			display: inline-block;
	// 			vertical-align: middle;
	// 			line-height: 74px;
	//
	// 			.select-pagesize {
	// 				width: 200px;
	// 				margin-left: 10px;
	//
	// 				.form-control {
	// 					display: inline;
	// 					width: auto;
	// 				}
	// 			}
	// 		}
	// 		.pagination {
	// 			margin-right: 20px;
	// 		}
	// 	}
	//
	// </style>
	// <template>
	// 	<div class="pager-wrap clearfix">
	//
	// 		<div class="pager-info">
	// 			<span class="total-records">共 <i class="text-danger">{{totalRecords}}</i> 条结果</span>
	// 			<div class="dis-ib select-pagesize">
	// 				每页
	// 				<select v-model="pageSize" class="form-control" number>
	// 					<option v-for="ps in pageSizes">{{ps}}</option>
	// 				</select>
	// 				 条
	// 			</div>
	// 		</div>
	//
	// 		<nav class="pager-nav pull-right" v-ahref="pages">
	// 			<ul class="pagination va-m">
	// 				<li :class="{disabled: activePage==1}"><a @click="navPrev" class="previous-btn"><span>&laquo;</span></a></li>
	// 				<li v-for="page in pages" @click="navTo(page)" :class="{active: page==activePage}"><a>{{page}}</a></li>
	// 				<li :class="{disabled: activePage==totalPages}"><a @click="navNext"><span>&raquo;</span></a></li>
	// 			</ul>
	// 			<span class="total-pages">共 <i class="text-danger">{{totalPages}}</i> 页</span>
	// 		</nav>
	//
	// 	</div>
	// </template>
	//
	// <script>

/***/ },
/* 204 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"pager-wrap clearfix\">\n\n\t<div class=\"pager-info\">\n\t\t<span class=\"total-records\">共 <i class=\"text-danger\">{{totalRecords}}</i> 条结果</span>\n\t\t<div class=\"dis-ib select-pagesize\">\n\t\t\t每页 \n\t\t\t<select v-model=\"pageSize\" class=\"form-control\" number>\n\t\t\t\t<option v-for=\"ps in pageSizes\">{{ps}}</option>\n\t\t\t</select>\n\t\t\t 条\n\t\t</div>\n\t</div>\n\n\t<nav class=\"pager-nav pull-right\" v-ahref=\"pages\">\n\t\t<ul class=\"pagination va-m\">\n\t\t\t<li :class=\"{disabled: activePage==1}\"><a @click=\"navPrev\" class=\"previous-btn\"><span>&laquo;</span></a></li>\n\t\t\t<li v-for=\"page in pages\" @click=\"navTo(page)\" :class=\"{active: page==activePage}\"><a>{{page}}</a></li>\n\t\t\t<li :class=\"{disabled: activePage==totalPages}\"><a @click=\"navNext\"><span>&raquo;</span></a></li>\n\t\t</ul>\n\t\t<span class=\"total-pages\">共 <i class=\"text-danger\">{{totalPages}}</i> 页</span>\n\t</nav>\n\n</div>\n";

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	/**
	 * @ 全局扩展自定义指令
	 */

	function appendDirective(name, options) {
		exports[name] = options;
	}

	//设置A的href
	appendDirective('ahref', {
		update: function update(data) {
			this.vm.$nextTick(function () {
				$(this.$el).find('a:not([href])').attr('href', 'javascript:;');
			});
		}
	});

	//点击元素以外区域 隐藏元素
	appendDirective('clickOutside', {
		twoWay: true,
		bind: function bind(el) {
			var _this = this;

			var clickOutCallback = function clickOutCallback(evt) {
				if (_this.el && !_this.el.contains(evt.target)) {
					_this.set(false); //隐藏元素
				}
			};

			//注: 由于vue自动stopPropagation()的机制，事件不一定能冒泡到body
			$('body').on('click', clickOutCallback);
		}
	});

	//设置元素高度适应窗口高度
	appendDirective('higher', {
		bind: function bind() {
			this.handler = function () {
				var clientH = document.documentElement.clientHeight;
				var offsetTop = $(this.el).offset().top;
				var $offsetEle = $(this.expression);

				var padTop = parseFloat($(this.el).css('paddingTop'));
				var padBtm = parseFloat($(this.el).css('paddingBottom'));
				var brdTop = parseFloat($(this.el).css('borderTop'));
				var brdBtm = parseFloat($(this.el).css('borderBottom'));
				$(this.el).height(clientH - offsetTop - padTop - padBtm - brdTop - brdBtm - $offsetEle.outerHeight(true));
			}.bind(this);

			$(window).on('resize', this.handler);
			this.vm.$nextTick(function () {
				$(window).resize();
			});
		},
		unbind: function unbind() {
			$(window).off('resize', this.handler);
		}
	});

	appendDirective('hide', function (isHide) {
		undefined.el.style.display = isHide ? 'none' : 'block';
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(VIP, $) {'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getAnimations() {
		var aniMap = {};
		var effects = ['bounce', 'fade', 'zoom', 'slide', 'rotate'];
		var dirs = ['left', 'right', 'up', 'down', ''];
		var specEffects = ['flip'];
		var specDirs = ['x', 'y'];
		var specEffects2 = ['lightSpeed', 'roll'];
		var specDirs2 = [''];

		var others = ['flash', 'jello', 'headShake', 'puls', 'shake', 'rubberBand', 'swing', 'tada', 'wobble', 'hinge'];

		function setAniMap(effects, directions) {

			effects.forEach(function (effect) {
				var dirs = directions.slice(0);
				if (effect === 'slide') {
					dirs.pop();
				}

				dirs.forEach(function (dir) {
					var o = {},
					    aniName = VIP.camelize('ani-' + effect + '-' + dir);
					o.enterClass = VIP.camelize(effect + '-in-' + dir);
					o.leaveClass = VIP.camelize(effect + '-out-' + dir);
					// o.type = 'animation';
					aniMap[aniName] = o;
				});
			});
		}

		function setOthers(effects) {
			effects.forEach(function (effect) {
				aniMap[effect] = {
					enterClass: effect,
					leaveClass: 'fadeOut'
				};
			});
		}

		setAniMap(effects, dirs);
		setAniMap(specEffects, specDirs);
		setAniMap(specEffects2, specDirs2);
		setOthers(others);

		return aniMap;
	}

	var animations = getAnimations();
	VIP.extend({
		ani: animations
	});

	VIP.aniNames = (0, _keys2.default)(animations);

	animations.dropdown = {
		beforeEnter: function beforeEnter(el) {
			$(el).height($(el).height());
		},
		afterLeave: function afterLeave(el) {
			$(el).height('');
		}
	};

	exports.default = animations;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(VIP) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @ 全局扩展自定义过滤器
	 */

	var filters = {};

	filters.random = function (arr) {
	  var r = arr[VIP.randomInt(arr.length - 1)];
	  return r;
	};

	exports.default = filters;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var VIP = __webpack_require__(2);
	var API = __webpack_require__(209);

	function addInterceptor(Vue, router) {
		//拦截器中 this指向vm
		Vue.http.interceptors.push({
			request: function request(_request) {
				// console.info('[interceptor req]: this=', this, ', app=', router.app);
				return _request;
			},
			response: function response(_response) {
				console.info('[response]: data: %o , url: %s, res: %o', _response.data, _response.request.url, _response);
				router.app.addLoading(false);

				if (!_response.ok) {
					//接口调用异常 提示
					// router.app.tips = 'URL:'+response.request.url + ', MSG:'+ response.data;
					// router.app.error = true;
					router.app.updateTips('error', 'URL:' + _response.request.url + ', MSG:' + _response.data);
				}
				return _response;
			}
		});
	}

	function setAjaxOptions(Vue, router) {
		var myOpts = {
			jsonp: 'jsonpCallback',
			timeout: 10000,
			emulateJSON: true,
			emulateHTTP: true,
			beforeSend: function beforeSend(request) {
				//beforeSend其实也是interceptor ，this指向vm

				// console.info('[beforeSend]:this=', this, ', app=', router.app);
				router.app.addLoading(true);

				request.url = API.get(request.url); //转换为正确的api
				/** 取消动态require(expr)
	   if (request.url.match(/\.(js|json)$/)) { //mock
	   	require('../mock/' + request.url);
	   }*/

				return request;
			},
			error: function error(data) {
				console.log('[Error]:', data);
			}
		};

		VIP.extend(Vue.http.options, myOpts);
	}

	module.exports = function setupAjax(Vue, router) {
		if (!Vue.http) return;

		//设置ajax选项
		setAjaxOptions.apply(null, arguments);

		//添加http拦截器
		addInterceptor.apply(null, arguments);
	};

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @ api表和相关方法
	 */
	var env = __webpack_require__(210);
	var currentEnv = env.active;
	var envConf = env[currentEnv];
	var apis;

	apis = {
		dev: {
			queryUser: '/user/query',
			getUser: '/user/get',
			saveUser: '/user/save',
			updateUser: '/user/update',
			delUser: '/user/del',

			querySpecial: '/special/query',
			getSpecial: '/special/get',
			saveSpecial: '/special/save',
			updateSpecial: '/special/update',
			delSpecial: '/special/del',

			queryCity: '/city/query'
		},
		product: {
			queryUser: 'admin.php/user/query',
			getUser: 'admin.php/user/get',
			saveUser: 'admin.php/user/save',
			updateUser: 'admin.php/user/update',
			delUser: 'admin.php/user/del',

			querySpecial: 'admin.php/special/query',
			getSpecial: 'admin.php/special/get',
			saveSpecial: 'admin.php/special/save',
			updateSpecial: 'admin.php/special/update',
			delSpecial: 'admin.php/special/del',

			queryCity: 'admin.php/city/query'

		}
	};

	module.exports = {
		data: apis,
		get: function get(apiKey, env) {
			var api,
			    qs = '',
			    parts = apiKey.split('?');

			env = env || currentEnv;
			env = ['dev', 'product'].indexOf(env) === -1 ? 'dev' : env;

			if (parts.length > 1) {
				apiKey = parts[0];
				qs = parts[1];
			}
			api = apis[env][apiKey];

			if (api) {
				return envConf.apiBaseUrl + api + (qs ? '?' : '') + qs;
			} else {
				console.error('[api.get]:没有对应的api,请检查参数..');
				return apiKey;
				// return false;
			}
		}
	};

/***/ },
/* 210 */
/***/ function(module, exports) {

	module.exports = {
		"active": "dev",
		"dev": {
			"apiBaseUrl": ""
		},
		"product": {
			"apiBaseUrl": "http://mst-admin.vip.com/"
		}
	};

/***/ },
/* 211 */
/***/ function(module, exports) {

	'use strict';

	exports.sync = function (store, router) {
	  patchStore(store);
	  store.router = router;

	  var isTimeTraveling = false;
	  var currentPath;

	  // sync router on store change
	  store.watch(function (state) {
	    return state.route;
	  }, function (route) {
	    if (route.path === currentPath) {
	      return;
	    }
	    isTimeTraveling = true;
	    currentPath = route.path;
	    router.go(route.path);
	  }, { deep: true, sync: true });

	  // sync store on router navigation
	  router.afterEach(function (transition) {
	    if (isTimeTraveling) {
	      isTimeTraveling = false;
	      return;
	    }
	    var to = transition.to;
	    currentPath = to.path;
	    store.dispatch('router/ROUTE_CHANGED', {
	      path: to.path,
	      query: to.query,
	      params: to.params
	    });
	  });
	};

	function patchStore(store) {
	  // add state
	  var set = store._vm.constructor.parsers.path.setPath;
	  store._dispatching = true;
	  set(store._vm._data, 'route', {
	    path: '',
	    query: null,
	    params: null
	  });
	  store._dispatching = false;
	  // add mutations
	  store.hotUpdate({
	    modules: {
	      route: {
	        mutations: {
	          'router/ROUTE_CHANGED': function routerROUTE_CHANGED(state, to) {
	            state.path = to.path;
	            state.query = to.query;
	            state.params = to.params;
	          }
	        }
	      }
	    }
	  });
	}

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _vue = __webpack_require__(7);

	var _vue2 = _interopRequireDefault(_vue);

	var _vuex = __webpack_require__(213);

	var _vuex2 = _interopRequireDefault(_vuex);

	var _logger = __webpack_require__(226);

	var _logger2 = _interopRequireDefault(_logger);

	var _mutations = __webpack_require__(227);

	var _mutations2 = _interopRequireDefault(_mutations);

	var _env = __webpack_require__(210);

	var _env2 = _interopRequireDefault(_env);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var debug = _env2.default.active === 'dev';

	var state = {
		//面包屑
		breadCrumbs: [{ url: '/index', text: '首页', level: 1 }],
		// ajax计数器
		loadingCount: 0,
		// 全局提示
		tips: {
			type: 'error',
			text: ''
		},
		// 顶部导航
		topLinks: [{ url: '/special', text: '专题管理', level: 2, active: false }, { url: '/component', text: '组件管理', level: 2, active: false }, { url: '/config', text: '配置管理', level: 2, active: false }, { url: '/customer', text: '客户管理', level: 2, active: false }, { url: '/usergroup', text: '用户群管理', level: 2, active: false }, { url: '/log', text: '日志管理', level: 2, active: false }, { url: '/whitelist', text: '白名单管理', level: 2, active: false }, { url: '/demo', text: '组件DEMOS', level: 2, active: false }],
		// 侧栏导航
		asideLinkMap: {
			'/special': [{ url: '/special/new', text: '新建专题', level: 3, active: false }, { url: '/special/types', text: '专题分类', level: 3, active: false }, { url: '/special/exportUrl', text: '导出URL', level: 3, active: false }],
			'/component': [{ url: '/component/new', text: '新建组件', level: 3, active: false }, { url: '/component/style', text: '样式管理', level: 3, active: false }, { url: '/component/style/types', text: '样式组分类', level: 4, active: false }],
			'/config': [{ url: '/config/new', text: '新建配置', level: 3, active: false }],
			'/customer': [{ url: '/customer/new', text: '新建客户', level: 3, active: false }, { url: '/customer/types', text: '客户类型', level: 3, active: false }, { url: '/customer/client', text: '客户端管理', level: 3, active: false }, { url: '/customer/client/edition', text: '客户端版本管理', level: 4, active: false }],
			'/usergroup': [{ url: '/usergroup/new', text: '新建用户群', level: 3, active: false }],
			'/log': [{ url: '/log/export', text: '导出日志', level: 3, active: false }],
			'/whitelist': [{ url: '/whitelist/export', text: '导出白名单', level: 3, active: false }],
			'/index': [],
			'/demo': []
		},
		asideLinks: [],
		//侧栏导航显隐
		sidebarShown: true
	};

	// Vue.use(Vuex);

	exports.default = new _vuex2.default.Store({
		state: state,
		mutations: _mutations2.default,
		middlewares: debug ? [(0, _logger2.default)()] : []
	});

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	var _from = __webpack_require__(214);

	var _from2 = _interopRequireDefault(_from);

	var _defineProperty = __webpack_require__(223);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	var _iterator = __webpack_require__(10);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(60);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof2 = __webpack_require__(9);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*!
	 * Vuex v0.6.3
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	  ( false ? 'undefined' : (0, _typeof3.default)(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.Vuex = factory();
	})(undefined, function () {
	  'use strict';

	  var babelHelpers = {};
	  babelHelpers.typeof = typeof _symbol2.default === "function" && (0, _typeof3.default)(_iterator2.default) === "symbol" ? function (obj) {
	    return typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj);
	  } : function (obj) {
	    return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj);
	  };

	  babelHelpers.classCallCheck = function (instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  };

	  babelHelpers.createClass = function () {
	    function defineProperties(target, props) {
	      for (var i = 0; i < props.length; i++) {
	        var descriptor = props[i];
	        descriptor.enumerable = descriptor.enumerable || false;
	        descriptor.configurable = true;
	        if ("value" in descriptor) descriptor.writable = true;
	        (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	      }
	    }

	    return function (Constructor, protoProps, staticProps) {
	      if (protoProps) defineProperties(Constructor.prototype, protoProps);
	      if (staticProps) defineProperties(Constructor, staticProps);
	      return Constructor;
	    };
	  }();

	  babelHelpers.toConsumableArray = function (arr) {
	    if (Array.isArray(arr)) {
	      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	        arr2[i] = arr[i];
	      }return arr2;
	    } else {
	      return (0, _from2.default)(arr);
	    }
	  };

	  babelHelpers;

	  /**
	   * Merge an array of objects into one.
	   *
	   * @param {Array<Object>} arr
	   * @return {Object}
	   */

	  function mergeObjects(arr) {
	    return arr.reduce(function (prev, obj) {
	      (0, _keys2.default)(obj).forEach(function (key) {
	        var existing = prev[key];
	        if (existing) {
	          // allow multiple mutation objects to contain duplicate
	          // handlers for the same mutation type
	          if (Array.isArray(existing)) {
	            existing.push(obj[key]);
	          } else {
	            prev[key] = [prev[key], obj[key]];
	          }
	        } else {
	          prev[key] = obj[key];
	        }
	      });
	      return prev;
	    }, {});
	  }

	  /**
	   * Deep clone an object. Faster than JSON.parse(JSON.stringify()).
	   *
	   * @param {*} obj
	   * @return {*}
	   */

	  function deepClone(obj) {
	    if (Array.isArray(obj)) {
	      return obj.map(deepClone);
	    } else if (obj && (typeof obj === 'undefined' ? 'undefined' : babelHelpers.typeof(obj)) === 'object') {
	      var cloned = {};
	      var keys = (0, _keys2.default)(obj);
	      for (var i = 0, l = keys.length; i < l; i++) {
	        var key = keys[i];
	        cloned[key] = deepClone(obj[key]);
	      }
	      return cloned;
	    } else {
	      return obj;
	    }
	  }

	  /**
	   * Hacks to get access to Vue internals.
	   * Maybe we should expose these...
	   */

	  var Watcher = void 0;
	  function getWatcher(vm) {
	    if (!Watcher) {
	      var unwatch = vm.$watch('__vuex__', function (a) {
	        return a;
	      });
	      Watcher = vm._watchers[0].constructor;
	      unwatch();
	    }
	    return Watcher;
	  }

	  var Dep = void 0;
	  function getDep(vm) {
	    if (!Dep) {
	      Dep = vm._data.__ob__.dep.constructor;
	    }
	    return Dep;
	  }

	  var hook = typeof window !== 'undefined' && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	  var devtoolMiddleware = {
	    onInit: function onInit(state, store) {
	      if (!hook) return;
	      hook.emit('vuex:init', store);
	      hook.on('vuex:travel-to-state', function (targetState) {
	        var currentState = store._vm._data;
	        store._dispatching = true;
	        (0, _keys2.default)(targetState).forEach(function (key) {
	          currentState[key] = targetState[key];
	        });
	        store._dispatching = false;
	      });
	    },
	    onMutation: function onMutation(mutation, state) {
	      if (!hook) return;
	      hook.emit('vuex:mutation', mutation, state);
	    }
	  };

	  function override(Vue) {
	    // override init and inject vuex init procedure
	    var _init = Vue.prototype._init;
	    Vue.prototype._init = function () {
	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      options.init = options.init ? [vuexInit].concat(options.init) : vuexInit;
	      _init.call(this, options);
	    };

	    /**
	     * Vuex init hook, injected into each instances init hooks list.
	     */

	    function vuexInit() {
	      var options = this.$options;
	      var store = options.store;
	      var vuex = options.vuex;
	      // store injection

	      if (store) {
	        this.$store = store;
	      } else if (options.parent && options.parent.$store) {
	        this.$store = options.parent.$store;
	      }
	      // vuex option handling
	      if (vuex) {
	        if (!this.$store) {
	          console.warn('[vuex] store not injected. make sure to ' + 'provide the store option in your root component.');
	        }
	        var state = vuex.state;
	        var getters = vuex.getters;
	        var actions = vuex.actions;
	        // handle deprecated state option

	        if (state && !getters) {
	          console.warn('[vuex] vuex.state option will been deprecated in 1.0. ' + 'Use vuex.getters instead.');
	          getters = state;
	        }
	        // getters
	        if (getters) {
	          options.computed = options.computed || {};
	          for (var key in getters) {
	            defineVuexGetter(this, key, getters[key]);
	          }
	        }
	        // actions
	        if (actions) {
	          options.methods = options.methods || {};
	          for (var _key in actions) {
	            options.methods[_key] = makeBoundAction(this.$store, actions[_key], _key);
	          }
	        }
	      }
	    }

	    /**
	     * Setter for all getter properties.
	     */

	    function setter() {
	      throw new Error('vuex getter properties are read-only.');
	    }

	    /**
	     * Define a Vuex getter on an instance.
	     *
	     * @param {Vue} vm
	     * @param {String} key
	     * @param {Function} getter
	     */

	    function defineVuexGetter(vm, key, getter) {
	      if (typeof getter !== 'function') {
	        console.warn('[vuex] Getter bound to key \'vuex.getters.' + key + '\' is not a function.');
	      } else {
	        (0, _defineProperty2.default)(vm, key, {
	          enumerable: true,
	          configurable: true,
	          get: makeComputedGetter(vm.$store, getter),
	          set: setter
	        });
	      }
	    }

	    /**
	     * Make a computed getter, using the same caching mechanism of computed
	     * properties. In addition, it is cached on the raw getter function using
	     * the store's unique cache id. This makes the same getter shared
	     * across all components use the same underlying watcher, and makes
	     * the getter evaluated only once during every flush.
	     *
	     * @param {Store} store
	     * @param {Function} getter
	     */

	    function makeComputedGetter(store, getter) {
	      var id = store._getterCacheId;

	      // cached
	      if (getter[id]) {
	        return getter[id];
	      }
	      var vm = store._vm;
	      var Watcher = getWatcher(vm);
	      var Dep = getDep(vm);
	      var watcher = new Watcher(vm, function (state) {
	        return getter(state);
	      }, null, { lazy: true });
	      var computedGetter = function computedGetter() {
	        if (watcher.dirty) {
	          watcher.evaluate();
	        }
	        if (Dep.target) {
	          watcher.depend();
	        }
	        return watcher.value;
	      };
	      getter[id] = computedGetter;
	      return computedGetter;
	    }

	    /**
	     * Make a bound-to-store version of a raw action function.
	     *
	     * @param {Store} store
	     * @param {Function} action
	     * @param {String} key
	     */

	    function makeBoundAction(store, action, key) {
	      if (typeof action !== 'function') {
	        console.warn('[vuex] Action bound to key \'vuex.actions.' + key + '\' is not a function.');
	      }
	      return function vuexBoundAction() {
	        for (var _len = arguments.length, args = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
	          args[_key2] = arguments[_key2];
	        }

	        return action.call.apply(action, [this, store].concat(args));
	      };
	    }

	    // option merging
	    var merge = Vue.config.optionMergeStrategies.computed;
	    Vue.config.optionMergeStrategies.vuex = function (toVal, fromVal) {
	      if (!toVal) return fromVal;
	      if (!fromVal) return toVal;
	      return {
	        getters: merge(toVal.getters, fromVal.getters),
	        state: merge(toVal.state, fromVal.state),
	        actions: merge(toVal.actions, fromVal.actions)
	      };
	    };
	  }

	  var Vue = void 0;
	  var uid = 0;

	  var Store = function () {

	    /**
	     * @param {Object} options
	     *        - {Object} state
	     *        - {Object} actions
	     *        - {Object} mutations
	     *        - {Array} middlewares
	     *        - {Boolean} strict
	     */

	    function Store() {
	      var _this = this;

	      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      var _ref$state = _ref.state;
	      var state = _ref$state === undefined ? {} : _ref$state;
	      var _ref$mutations = _ref.mutations;
	      var mutations = _ref$mutations === undefined ? {} : _ref$mutations;
	      var _ref$modules = _ref.modules;
	      var modules = _ref$modules === undefined ? {} : _ref$modules;
	      var _ref$middlewares = _ref.middlewares;
	      var middlewares = _ref$middlewares === undefined ? [] : _ref$middlewares;
	      var _ref$strict = _ref.strict;
	      var strict = _ref$strict === undefined ? false : _ref$strict;
	      babelHelpers.classCallCheck(this, Store);

	      this._getterCacheId = 'vuex_store_' + uid++;
	      this._dispatching = false;
	      this._rootMutations = this._mutations = mutations;
	      this._modules = modules;
	      // bind dispatch to self
	      var dispatch = this.dispatch;
	      this.dispatch = function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        dispatch.apply(_this, args);
	      };
	      // use a Vue instance to store the state tree
	      // suppress warnings just in case the user has added
	      // some funky global mixins
	      if (!Vue) {
	        throw new Error('[vuex] must call Vue.use(Vuex) before creating a store instance.');
	      }
	      var silent = Vue.config.silent;
	      Vue.config.silent = true;
	      this._vm = new Vue({
	        data: state
	      });
	      Vue.config.silent = silent;
	      this._setupModuleState(state, modules);
	      this._setupModuleMutations(modules);
	      this._setupMiddlewares(middlewares, state);
	      // add extra warnings in strict mode
	      if (strict) {
	        this._setupMutationCheck();
	      }
	    }

	    /**
	     * Getter for the entire state tree.
	     * Read only.
	     *
	     * @return {Object}
	     */

	    babelHelpers.createClass(Store, [{
	      key: 'dispatch',

	      /**
	       * Dispatch an action.
	       *
	       * @param {String} type
	       */

	      value: function dispatch(type) {
	        for (var _len2 = arguments.length, payload = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	          payload[_key2 - 1] = arguments[_key2];
	        }

	        var silent = false;
	        // compatibility for object actions, e.g. FSA
	        if ((typeof type === 'undefined' ? 'undefined' : babelHelpers.typeof(type)) === 'object' && type.type && arguments.length === 1) {
	          payload = [type.payload];
	          if (type.silent) silent = true;
	          type = type.type;
	        }
	        var mutation = this._mutations[type];
	        var state = this.state;
	        if (mutation) {
	          this._dispatching = true;
	          // apply the mutation
	          if (Array.isArray(mutation)) {
	            mutation.forEach(function (m) {
	              return m.apply(undefined, [state].concat(babelHelpers.toConsumableArray(payload)));
	            });
	          } else {
	            mutation.apply(undefined, [state].concat(babelHelpers.toConsumableArray(payload)));
	          }
	          this._dispatching = false;
	          if (!silent) this._applyMiddlewares(type, payload);
	        } else {
	          console.warn('[vuex] Unknown mutation: ' + type);
	        }
	      }

	      /**
	       * Watch state changes on the store.
	       * Same API as Vue's $watch, except when watching a function,
	       * the function gets the state as the first argument.
	       *
	       * @param {String|Function} expOrFn
	       * @param {Function} cb
	       * @param {Object} [options]
	       */

	    }, {
	      key: 'watch',
	      value: function watch(expOrFn, cb, options) {
	        var _this2 = this;

	        return this._vm.$watch(function () {
	          return typeof expOrFn === 'function' ? expOrFn(_this2.state) : _this2._vm.$get(expOrFn);
	        }, cb, options);
	      }

	      /**
	       * Hot update mutations & modules.
	       *
	       * @param {Object} options
	       *        - {Object} [mutations]
	       *        - {Object} [modules]
	       */

	    }, {
	      key: 'hotUpdate',
	      value: function hotUpdate() {
	        var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        var mutations = _ref2.mutations;
	        var modules = _ref2.modules;

	        this._rootMutations = this._mutations = mutations || this._rootMutations;
	        this._setupModuleMutations(modules || this._modules);
	      }

	      /**
	       * Attach sub state tree of each module to the root tree.
	       *
	       * @param {Object} state
	       * @param {Object} modules
	       */

	    }, {
	      key: '_setupModuleState',
	      value: function _setupModuleState(state, modules) {
	        (0, _keys2.default)(modules).forEach(function (key) {
	          Vue.set(state, key, modules[key].state || {});
	        });
	      }

	      /**
	       * Bind mutations for each module to its sub tree and
	       * merge them all into one final mutations map.
	       *
	       * @param {Object} updatedModules
	       */

	    }, {
	      key: '_setupModuleMutations',
	      value: function _setupModuleMutations(updatedModules) {
	        var modules = this._modules;
	        var allMutations = [this._rootMutations];
	        (0, _keys2.default)(updatedModules).forEach(function (key) {
	          modules[key] = updatedModules[key];
	        });
	        (0, _keys2.default)(modules).forEach(function (key) {
	          var module = modules[key];
	          if (!module || !module.mutations) return;
	          // bind mutations to sub state tree
	          var mutations = {};
	          (0, _keys2.default)(module.mutations).forEach(function (name) {
	            var original = module.mutations[name];
	            mutations[name] = function (state) {
	              for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	                args[_key3 - 1] = arguments[_key3];
	              }

	              original.apply(undefined, [state[key]].concat(args));
	            };
	          });
	          allMutations.push(mutations);
	        });
	        this._mutations = mergeObjects(allMutations);
	      }

	      /**
	       * Setup mutation check: if the vuex instance's state is mutated
	       * outside of a mutation handler, we throw en error. This effectively
	       * enforces all mutations to the state to be trackable and hot-reloadble.
	       * However, this comes at a run time cost since we are doing a deep
	       * watch on the entire state tree, so it is only enalbed with the
	       * strict option is set to true.
	       */

	    }, {
	      key: '_setupMutationCheck',
	      value: function _setupMutationCheck() {
	        var _this3 = this;

	        var Watcher = getWatcher(this._vm);
	        /* eslint-disable no-new */
	        new Watcher(this._vm, '$data', function () {
	          if (!_this3._dispatching) {
	            throw new Error('[vuex] Do not mutate vuex store state outside mutation handlers.');
	          }
	        }, { deep: true, sync: true });
	        /* eslint-enable no-new */
	      }

	      /**
	       * Setup the middlewares. The devtools middleware is always
	       * included, since it does nothing if no devtool is detected.
	       *
	       * A middleware can demand the state it receives to be
	       * "snapshots", i.e. deep clones of the actual state tree.
	       *
	       * @param {Array} middlewares
	       * @param {Object} state
	       */

	    }, {
	      key: '_setupMiddlewares',
	      value: function _setupMiddlewares(middlewares, state) {
	        var _this4 = this;

	        this._middlewares = [devtoolMiddleware].concat(middlewares);
	        this._needSnapshots = middlewares.some(function (m) {
	          return m.snapshot;
	        });
	        if (this._needSnapshots) {
	          console.log('[vuex] One or more of your middlewares are taking state snapshots ' + 'for each mutation. Make sure to use them only during development.');
	        }
	        var initialSnapshot = this._prevSnapshot = this._needSnapshots ? deepClone(state) : null;
	        // call init hooks
	        this._middlewares.forEach(function (m) {
	          if (m.onInit) {
	            m.onInit(m.snapshot ? initialSnapshot : state, _this4);
	          }
	        });
	      }

	      /**
	       * Apply the middlewares on a given mutation.
	       *
	       * @param {String} type
	       * @param {Array} payload
	       */

	    }, {
	      key: '_applyMiddlewares',
	      value: function _applyMiddlewares(type, payload) {
	        var _this5 = this;

	        var state = this.state;
	        var prevSnapshot = this._prevSnapshot;
	        var snapshot = void 0,
	            clonedPayload = void 0;
	        if (this._needSnapshots) {
	          snapshot = this._prevSnapshot = deepClone(state);
	          clonedPayload = deepClone(payload);
	        }
	        this._middlewares.forEach(function (m) {
	          if (m.onMutation) {
	            if (m.snapshot) {
	              m.onMutation({ type: type, payload: clonedPayload }, snapshot, prevSnapshot, _this5);
	            } else {
	              m.onMutation({ type: type, payload: payload }, state, _this5);
	            }
	          }
	        });
	      }
	    }, {
	      key: 'state',
	      get: function get() {
	        return this._vm._data;
	      },
	      set: function set(v) {
	        throw new Error('[vuex] Vuex root state is read only.');
	      }
	    }]);
	    return Store;
	  }();

	  function install(_Vue) {
	    if (Vue) {
	      console.warn('[vuex] already installed. Vue.use(Vuex) should be called only once.');
	      return;
	    }
	    Vue = _Vue;
	    override(Vue);
	  }

	  // auto install in dist mode
	  if (typeof window !== 'undefined' && window.Vue) {
	    install(window.Vue);
	  }

	  function createLogger() {
	    console.warn('[vuex] Vuex.createLogger has been deprecated.' + 'Use `import createLogger from \'vuex/logger\' instead.');
	  }

	  var index = {
	    Store: Store,
	    install: install,
	    createLogger: createLogger
	  };

	  return index;
	});

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(215), __esModule: true };

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(12);
	__webpack_require__(216);
	module.exports = __webpack_require__(6).Array.from;

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(20)
	  , $export        = __webpack_require__(18)
	  , toObject       = __webpack_require__(54)
	  , call           = __webpack_require__(217)
	  , isArrayIter    = __webpack_require__(218)
	  , toLength       = __webpack_require__(44)
	  , createProperty = __webpack_require__(219)
	  , getIterFn      = __webpack_require__(220);

	$export($export.S + $export.F * !__webpack_require__(222)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(24);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(34)
	  , ITERATOR   = __webpack_require__(52)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(23)
	  , createDesc      = __webpack_require__(31);

	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(221)
	  , ITERATOR  = __webpack_require__(52)('iterator')
	  , Iterators = __webpack_require__(34);
	module.exports = __webpack_require__(6).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(42)
	  , TAG = __webpack_require__(52)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(52)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(224), __esModule: true };

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(225);
	var $Object = __webpack_require__(6).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(18);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(27), 'Object', {defineProperty: __webpack_require__(23).f});

/***/ },
/* 226 */
/***/ function(module, exports) {

	'use strict';

	// Credits: borrowed code from fcomb/redux-logger

	function createLogger() {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var _ref$collapsed = _ref.collapsed;
	  var collapsed = _ref$collapsed === undefined ? true : _ref$collapsed;
	  var _ref$transformer = _ref.transformer;
	  var transformer = _ref$transformer === undefined ? function (state) {
	    return state;
	  } : _ref$transformer;
	  var _ref$mutationTransfor = _ref.mutationTransformer;
	  var mutationTransformer = _ref$mutationTransfor === undefined ? function (mut) {
	    return mut;
	  } : _ref$mutationTransfor;

	  return {
	    snapshot: true,
	    onMutation: function onMutation(mutation, nextState, prevState) {
	      if (typeof console === 'undefined') {
	        return;
	      }
	      var time = new Date();
	      var formattedTime = ' @ ' + pad(time.getHours(), 2) + ':' + pad(time.getMinutes(), 2) + ':' + pad(time.getSeconds(), 2) + '.' + pad(time.getMilliseconds(), 3);
	      var formattedMutation = mutationTransformer(mutation);
	      var message = 'mutation ' + mutation.type + formattedTime;
	      var startMessage = collapsed ? console.groupCollapsed : console.group;

	      // render
	      try {
	        startMessage.call(console, message);
	      } catch (e) {
	        console.log(message);
	      }

	      console.log('%c prev state', 'color: #9E9E9E; font-weight: bold', prevState);
	      console.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
	      console.log('%c next state', 'color: #4CAF50; font-weight: bold', nextState);

	      try {
	        console.groupEnd();
	      } catch (e) {
	        console.log('—— log end ——');
	      }
	    }
	  };
	}

	function repeat(str, times) {
	  return new Array(times + 1).join(str);
	}

	function pad(num, maxLength) {
	  return repeat('0', maxLength - num.toString().length) + num;
	}

	module.exports = createLogger;

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _defineProperty2 = __webpack_require__(228);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _types$BREADCRUMBS_RE;

	var _mutationTypes = __webpack_require__(97);

	var types = _interopRequireWildcard(_mutationTypes);

	var _public = __webpack_require__(2);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getNavLinks(state) {
		if (getNavLinks.result) {
			return getNavLinks.result;
		}
		var navLinks = state.topLinks.slice(0);
		(0, _public.eachKey)(state.asideLinkMap, function (links) {
			navLinks = navLinks.concat(links);
		});

		getNavLinks.result = navLinks;
		return navLinks;
	}

	//解析出面包屑路径数组 /foo/bar/zoo -> ['/foo', '/foo/bar', '/foo/bar/zoo'];
	function parsePath(path) {
		function concatStr(str1, str2) {
			return str1 + str2;
		}
		var parts = [];
		path.replace(/\/\w+/g, function (m) {
			parts.push(m);
		});
		return parts.map(function (part, i) {
			if (i) {
				return parts.slice(0, i + 1).reduce(concatStr);
			} else {
				return part;
			}
		});
	}

	//显隐左侧导航
	function toggleSidebar(state, show) {
		state.sidebarShown = show == null ? !state.sidebarShown : show;
	}

	exports.default = (_types$BREADCRUMBS_RE = {}, (0, _defineProperty3.default)(_types$BREADCRUMBS_RE, types.BREADCRUMBS_RESET, function (state, crumbs) {
		state.breadCrumbs = crumbs;
	}), (0, _defineProperty3.default)(_types$BREADCRUMBS_RE, types.BREADCRUMBS_SET, function (state, link) {
		var len = state.breadCrumbs.length;
		var navLinks = getNavLinks(state);
		var paths = parsePath(link.url);
		var links = paths.map(function (path) {
			return navLinks.filter(function (link) {
				return link.url === path;
			})[0];
		});

		if (links) {
			state.breadCrumbs = state.breadCrumbs.slice(0, 1).concat(links);
		}
		if (link.url === '/index') {
			state.breadCrumbs = state.breadCrumbs.slice(0, 1);
		}
		// state.breadCrumbs.splice(link.level, len-link.level, link);
	}), (0, _defineProperty3.default)(_types$BREADCRUMBS_RE, types.LOADING_INCREMENT, function (state) {
		state.loadingCount++;
	}), (0, _defineProperty3.default)(_types$BREADCRUMBS_RE, types.LOADING_DECREMENT, function (state) {
		state.loadingCount--;
	}), (0, _defineProperty3.default)(_types$BREADCRUMBS_RE, types.TIPS_UPDATE, function (state, type, text) {
		state.tips = { 'type': type, 'text': text };
	}), (0, _defineProperty3.default)(_types$BREADCRUMBS_RE, types.RESET_PREV_ASIDE_LINKS, function (state, key) {
		state.asideLinkMap[key].forEach(function (link) {
			return link.active = false;
		});
	}), (0, _defineProperty3.default)(_types$BREADCRUMBS_RE, types.TOGGLE_SIDEBAR, toggleSidebar), (0, _defineProperty3.default)(_types$BREADCRUMBS_RE, types.GET_ASIDE_LINKS, function (state, path) {
		var key = path.replace(/^(\/\w+).*/, '$1');

		var hasLinks = state.asideLinks.length > 0;
		state.asideLinks = state.asideLinkMap[key];
		var newHasLinks = state.asideLinks.length > 0;

		if (hasLinks != newHasLinks || !state.route.path) {
			//首次打开 route.path = ''
			toggleSidebar(state, newHasLinks);
		}
	}), _types$BREADCRUMBS_RE);

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(223);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__webpack_require__(230);
	__vue_script__ = __webpack_require__(232);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\App.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(252);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./App.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(231);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(90)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-fbaa0b2e&scoped=true!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./App.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-fbaa0b2e&scoped=true!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./App.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(89)();
	// imports


	// module
	exports.push([module.id, ".viewport[_v-fbaa0b2e] {\n  min-height: 100px;\n}\n.view[_v-fbaa0b2e] {\n  -webkit-animation-duration: 0.3s;\n  animation-duration: 0.3s;\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n}\n", ""]);

	// exports


/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _store = __webpack_require__(212);

	var _store2 = _interopRequireDefault(_store);

	var _actions = __webpack_require__(96);

	var _getters = __webpack_require__(140);

	var _api = __webpack_require__(98);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 导入样式
	// <template>
	// 	<div class="wrapper">
	// 		<!-- navbar -->
	// 		<navbar :user="user" inverse="true" title="专题后台管理系统"></navbar>
	//
	// 		<!-- main -->
	// 		<div class="main">
	// 			<sidebar>
	// 				<nav is="vnav" type="pills" stacked="true" :links="asideLinks"></nav>
	// 			</sidebar>
	// 			<div class="main-bd">
	// 				<breadcrumb></breadcrumb>
	// 				<div class="viewport" v-higher.literal="footer">
	// 					<router-view class="view animated" :transition="effect" transition-mode="out-in"></router-view>
	// 				</div>
	// 			</div>
	// 		</div>
	//
	// 		<!-- footer -->
	// 		<footer is="vfooter"></footer>
	//
	// 		<!-- tips -->
	// 		<alert :type="tips.type == 'error'? 'danger' : 'success'" class="app-tips" :show.sync="showTips" dismissable :duration="3000" width="40%">	<strong>提示: </strong>{{tips.text}}
	// 		</alert>
	// 		<!-- loading -->
	// 		<loading :show="loadingCount>0"></loading>
	// 	</div>
	// </template>
	//
	// <script>
	__webpack_require__(233);
	__webpack_require__(234);

	exports.default = {
		name: 'App',
		components: {
			Navbar: __webpack_require__(237),
			Sidebar: __webpack_require__(242),
			Vfooter: __webpack_require__(247)
		},
		data: function data() {
			return {
				user: '',
				effect: 'aniFade'
			};
		},

		watch: {
			tips: {
				deep: true,
				handler: function handler(t) {
					showTips = !!this.tips.text;
				}
			}
		},
		vuex: {
			getters: {
				tips: function tips(state) {
					return state.tips;
				},
				loadingCount: function loadingCount(state) {
					return state.loadingCount;
				},
				asideLinks: function asideLinks(state) {
					return state.asideLinks;
				}
			},
			actions: {
				updateTips: _actions.updateTips,
				addLoading: _actions.addLoading,
				setBreadCrumbs: _actions.setBreadCrumbs,
				resetPrevAsideLinks: _actions.resetPrevAsideLinks,
				getAsideLinks: _actions.getAsideLinks,
				toggleSidebar: _actions.toggleSidebar
			}
		},
		computed: {
			showTips: {
				get: function get() {
					return !!this.tips.text;
				},
				set: function set(val) {
					if (!val) {
						//隐藏 则提示信息置空
						this.tips.text = '';
					}
				}
			} /*,
	    sidebarShown(){
	    console.warn('in computed....shown..');
	    return this.asidelinks? this.asidelinks.length > 0 : false;
	    }*/
		},
		methods: {},
		asyncData: function asyncData() {
			return _api.User.get({ userId: 123 }).then(function (res) {
				return res.data; //自动 vm.$set(..);
			});
		},

		store: _store2.default
	};
	// </script>
	//
	//
	// <style scoped lang="less">
	// 	.viewport {
	// 		min-height: 100px;
	// 	}
	// 	.view {
	// 		-webkit-animation-duration: 0.3s;
	// 		animation-duration: 0.3s;
	// 		-webkit-animation-fill-mode: both;
	// 		animation-fill-mode: both;
	// 	}
	// </style>

/***/ },
/* 233 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(235);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(236)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./vars.less", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./vars.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(89)();
	// imports


	// module
	exports.push([module.id, "/*vars*/\n.popoverBottom {\n  left: 50%;\n  top: auto;\n  bottom: -11px;\n  -webkit-transform: translate(-50%, 100%);\n  transform: translate(-50%, 100%);\n}\n.popoverLeft {\n  left: 0;\n  top: 50%;\n  -webkit-transform: translate(-100%, -50%);\n  transform: translate(-100%, -50%);\n}\n.popoverRight {\n  left: auto;\n  right: -11px;\n  top: 50%;\n  -webkit-transform: translate(100%, -50%);\n  transform: translate(100%, -50%);\n}\n", ""]);

	// exports


/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
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

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
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

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__webpack_require__(238);
	__vue_script__ = __webpack_require__(240);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Navbar.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(241);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./Navbar.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(239);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(90)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Navbar.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Navbar.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(89)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.wrapper .navbar{border-radius: 0;}\n", ""]);

	// exports


/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _public = __webpack_require__(2);

	exports.default = {
		name: 'Navbar',
		props: {
			inverse: {
				type: Boolean,
				coerce: _public.makeBoolean,
				default: false
			},
			position: {
				type: String
			},
			static: {
				type: Boolean,
				coerce: _public.makeBoolean
			},
			user: String,
			title: {
				type: String,
				default: 'Brand'
			}
		},
		data: function data() {
			return { collapsed: false };
		},
		methods: {
			toggleCollapsed: function toggleCollapsed() {
				this.collapsed = !this.collapsed;
			}
		},
		vuex: {
			getters: {
				links: function links(state) {
					return state.topLinks;
				}
			}
		}

	};
	// </script>
	//
	// <style>
	// 	.wrapper .navbar{border-radius: 0;}
	// </style>
	// <template>
	// 	<div :class="{navbar:true, 'navbar-default':!inverse, 'navbar-inverse': inverse, 'navbar-fixed-top':position=='top', 'navbar-fixed-bottom': position=='bottom', 'navbar-static-top': static}" v-ahref="links">
	// 	    <div class="container-fluid">
	//
	// 	        <div class="navbar-header">
	// 	            <button class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" @click="toggleCollapsed">
	// 	            	<span class="icon-bar"></span>
	// 	                <span class="icon-bar"></span>
	// 	                <span class="icon-bar"></span>
	// 	            </button>
	// 	            <a v-link="{path: '/index'}" class="navbar-brand">{{title}}</a>
	// 	        </div>
	//
	// 	        <div id="navbar" class="collapse navbar-collapse" :class="{in: !collapsed}">
	//
	// 		        <slot>
	// 		            <ul class="nav navbar-nav">
	// 		                <li v-for="link in links" v-link="{path: link.url}"><a>{{link.text}}</a></li>
	// 		            </ul>
	// 		        </slot>
	//
	// 		        <slot name="navbarRight">
	// 		            <div class="navbar-right">
	// 		            	<ul class="nav navbar-nav">
	// 		            		<li><a href="#">{{user}}</a></li>
	// 		            		<li><a href="#">退出</a></li>
	// 		            	</ul>
	// 		            </div>
	// 		        </slot>
	//
	// 	        </div>
	//
	// 	    </div>
	// 	</div>
	// </template>
	//
	// <script>

/***/ },
/* 241 */
/***/ function(module, exports) {

	module.exports = "\n<div :class=\"{navbar:true, 'navbar-default':!inverse, 'navbar-inverse': inverse, 'navbar-fixed-top':position=='top', 'navbar-fixed-bottom': position=='bottom', 'navbar-static-top': static}\" v-ahref=\"links\">\n    <div class=\"container-fluid\">\n    \n        <div class=\"navbar-header\">\n            <button class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" @click=\"toggleCollapsed\">\n            \t<span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n            </button>\n            <a v-link=\"{path: '/index'}\" class=\"navbar-brand\">{{title}}</a>\n        </div>\n        \n        <div id=\"navbar\" class=\"collapse navbar-collapse\" :class=\"{in: !collapsed}\">\n\n\t        <slot>\n\t            <ul class=\"nav navbar-nav\">\n\t                <li v-for=\"link in links\" v-link=\"{path: link.url}\"><a>{{link.text}}</a></li>\n\t            </ul>\n\t        </slot>\n\n\t        <slot name=\"navbarRight\">\n\t            <div class=\"navbar-right\">\n\t            \t<ul class=\"nav navbar-nav\">\n\t            \t\t<li><a href=\"#\">{{user}}</a></li>\n\t            \t\t<li><a href=\"#\">退出</a></li>\n\t            \t</ul>\n\t            </div>\n\t        </slot>\n\n        </div>\n\n    </div>\n</div>\n";

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__webpack_require__(243);
	__vue_script__ = __webpack_require__(245);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Sidebar.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(246);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./Sidebar.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(244);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(90)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Sidebar.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Sidebar.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(89)();
	// imports


	// module
	exports.push([module.id, "/*vars*/\n.popoverBottom {\n  left: 50%;\n  top: auto;\n  bottom: -11px;\n  -webkit-transform: translate(-50%, 100%);\n  transform: translate(-50%, 100%);\n}\n.popoverLeft {\n  left: 0;\n  top: 50%;\n  -webkit-transform: translate(-100%, -50%);\n  transform: translate(-100%, -50%);\n}\n.popoverRight {\n  left: auto;\n  right: -11px;\n  top: 50%;\n  -webkit-transform: translate(100%, -50%);\n  transform: translate(100%, -50%);\n}\n.sidebar {\n  position: relative;\n  float: left;\n  /*margin-right: 20px;*/\n  background-color: #4C4C4C;\n  border-radius: 0 4px 4px 0;\n}\n.sidebar.collapsed {\n  margin-right: 0px;\n}\n.sidebar.collapsed .toggle-btn {\n  -webkit-transform: translateX(100%);\n  transform: translateX(100%);\n}\n.sidebar.collapsed .toggle-btn i {\n  -webkit-transform: translateX(-50%);\n  transform: translateX(-50%);\n  text-indent: 23px;\n}\n.sidebar .toggle-btn {\n  position: absolute;\n  z-index: 10;\n  top: 50%;\n  right: 0;\n  width: 25px;\n  height: 50px;\n  overflow: hidden;\n}\n.sidebar .toggle-btn i {\n  position: absolute;\n  width: 200%;\n  height: 100%;\n  font: normal 30px/50px serif;\n  text-align: left;\n  text-indent: 10px;\n  background-color: #cfc;\n  border-radius: 50%;\n  cursor: pointer;\n  opacity: .5;\n}\n.sidebar .toggle-btn i:hover {\n  font-weight: bold;\n  opacity: 0.8;\n}\n.sidebar-bd {\n  width: 200px;\n}\n.sidebar-bd .nav > li > a:hover {\n  background-color: #CADEED;\n}\n.sidebar-bd .nav-pills > li.active > a {\n  background-color: #337ab7;\n}\n.expand-transition {\n  -webkit-transition: width 0.3s linear;\n  transition: width 0.3s linear;\n  opacity: 1;\n}\n.expand-enter,\n.expand-leave {\n  width: 0px !important;\n  opacity: 0;\n}\n", ""]);

	// exports


/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getters = __webpack_require__(140);

	var _actions = __webpack_require__(96);

	var _public = __webpack_require__(2);

	exports.default = {
		name: 'Sidebar',
		props: {
			width: String,
			collapsed: {
				type: Boolean,
				coerce: _public.makeBoolean,
				twoWay: true,
				default: false
			}
		},
		methods: {
			toggle: function toggle() {
				this.collapsed = !this.collapsed;
			}
		},
		ready: function ready() {},

		vuex: {
			getters: {
				show: function show(state) {
					return state.sidebarShown;
				}
			}
		}
	};
	// </script>
	//
	// <style lang="less">
	// 	@import "../assets/css/vars.less";
	//
	// 	.sidebar {
	// 		position: relative;
	// 		float: left;
	// 		/*margin-right: 20px;*/
	// 		background-color: #4C4C4C;
	// 		border-radius:0 4px 4px 0;
	//
	// 		&.collapsed {
	// 			margin-right: 0px;
	//
	// 			.toggle-btn {
	// 				-webkit-transform: translateX(100%);
	// 				transform: translateX(100%);
	//
	// 				i {
	// 					-webkit-transform: translateX(-50%);
	// 					transform: translateX(-50%);
	// 					text-indent: 23px;
	// 				}
	// 			}
	// 		}
	// 		.toggle-btn {
	// 			position: absolute;
	// 			z-index: 10;
	// 			top: 50%;
	// 			right: 0;
	// 			width: 25px;
	// 			height: 50px;
	// 			overflow: hidden;
	//
	// 			i {
	// 				position: absolute;
	// 				width: 200%;
	// 				height: 100%;
	// 				font: normal 30px/50px serif;
	// 				text-align: left;
	// 				text-indent: 10px;
	// 				background-color: #cfc;
	// 				border-radius: 50%;
	// 				cursor: pointer;
	// 				opacity: .5;
	//
	// 				&:hover {
	// 					font-weight: bold;
	// 					opacity: 0.8;
	// 				}
	// 			}
	// 		}
	// 	}
	//
	// 	.sidebar-bd {
	// 		width: 200px;
	//
	// 		.nav > li > a:hover {
	// 			background-color: #CADEED;
	// 		}
	// 		.nav-pills > li.active > a {
	// 			background-color: #337ab7;
	// 		}
	// 	}
	// 	.expand-transition {
	// 		-webkit-transition: width 0.3s linear;
	// 		transition: width 0.3s linear;
	// 		opacity: 1;
	// 	}
	// 	.expand-enter, .expand-leave {
	// 		width: 0px !important;
	// 		opacity: 0;
	// 	}
	// </style>
	// <template>
	// 	<div class="sidebar" v-higher.literal="footer" :class="{'collapsed':collapsed}" v-show="show">
	// 		<span class="toggle-btn" @click="toggle"><i>{{collapsed?'<':'>'}}</i></span>
	// 		<div class="sidebar-bd" v-show="!collapsed" transition="expand" :style="{'width': width}">
	// 			<slot></slot>
	// 		</div>
	// 	</div>
	// </template>
	//
	// <script>

/***/ },
/* 246 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"sidebar\" v-higher.literal=\"footer\" :class=\"{'collapsed':collapsed}\" v-show=\"show\">\n\t<span class=\"toggle-btn\" @click=\"toggle\"><i>{{collapsed?'<':'>'}}</i></span>\n\t<div class=\"sidebar-bd\" v-show=\"!collapsed\" transition=\"expand\" :style=\"{'width': width}\">\n\t\t<slot></slot>\n\t</div>\n</div>\n";

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__webpack_require__(248);
	__vue_script__ = __webpack_require__(250);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Vfooter.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(251);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./Vfooter.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(249);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(90)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Vfooter.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Vfooter.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(89)();
	// imports


	// module
	exports.push([module.id, "/*vars*/\n.popoverBottom {\n  left: 50%;\n  top: auto;\n  bottom: -11px;\n  -webkit-transform: translate(-50%, 100%);\n  transform: translate(-50%, 100%);\n}\n.popoverLeft {\n  left: 0;\n  top: 50%;\n  -webkit-transform: translate(-100%, -50%);\n  transform: translate(-100%, -50%);\n}\n.popoverRight {\n  left: auto;\n  right: -11px;\n  top: 50%;\n  -webkit-transform: translate(100%, -50%);\n  transform: translate(100%, -50%);\n}\nfooter {\n  height: 50px;\n  margin-top: 20px;\n  line-height: 50px;\n  background-color: #222;\n  color: #eee;\n  text-align: center;\n}\nfooter ul,\nfooter li {\n  list-style: none;\n  margin: 0;\n}\n", ""]);

	// exports


/***/ },
/* 250 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <template>
	// 	<footer>
	// 		<ul> <li>DESIGN BY MOBILE UED@KIMI</li> </ul>
	// 	</footer>
	// </template>
	// <script>
	exports.default = {
		name: 'Vfooter',
		data: function data() {
			return {};
		}
	};

	// </script>
	//
	// <style lang="less">
	// 	@import '../assets/css/vars.less';
	//
	// 	footer{
	// 		height: 50px;
	// 		margin-top: 20px;
	// 		line-height: 50px;
	// 		background-color: @bgcolor;
	// 		color: @color;
	// 		text-align: center;
	//
	// 		ul, li {
	// 			list-style: none;
	// 			margin: 0;
	// 		}
	//
	// 	}
	// </style>

/***/ },
/* 251 */
/***/ function(module, exports) {

	module.exports = "\n<footer>\n\t<ul> <li>DESIGN BY MOBILE UED@KIMI</li> </ul>\n</footer>\n";

/***/ },
/* 252 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"wrapper\" _v-fbaa0b2e=\"\">\n\t<!-- navbar -->\n\t<navbar :user=\"user\" inverse=\"true\" title=\"专题后台管理系统\" _v-fbaa0b2e=\"\"></navbar>\n\n\t<!-- main -->\n\t<div class=\"main\" _v-fbaa0b2e=\"\">\n\t\t<sidebar _v-fbaa0b2e=\"\">\n\t\t\t<nav is=\"vnav\" type=\"pills\" stacked=\"true\" :links=\"asideLinks\" _v-fbaa0b2e=\"\"></nav>\n\t\t</sidebar>\n\t\t<div class=\"main-bd\" _v-fbaa0b2e=\"\">\n\t\t\t<breadcrumb _v-fbaa0b2e=\"\"></breadcrumb>\n\t\t\t<div class=\"viewport\" v-higher.literal=\"footer\" _v-fbaa0b2e=\"\">\n\t\t\t\t<router-view class=\"view animated\" :transition=\"effect\" transition-mode=\"out-in\" _v-fbaa0b2e=\"\"></router-view>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<!-- footer -->\n\t<footer is=\"vfooter\" _v-fbaa0b2e=\"\"></footer>\n\n\t<!-- tips -->\n\t<alert :type=\"tips.type == 'error'? 'danger' : 'success'\" class=\"app-tips\" :show.sync=\"showTips\" dismissable=\"\" :duration=\"3000\" width=\"40%\" _v-fbaa0b2e=\"\">\t<strong _v-fbaa0b2e=\"\">提示: </strong>{{tips.text}}\n\t</alert>\n\t<!-- loading -->\n\t<loading :show=\"loadingCount>0\" _v-fbaa0b2e=\"\"></loading>\n</div>\n";

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Mock = __webpack_require__(254);

	Mock.setup({ timeout: 600 });

	__webpack_require__(255);
	__webpack_require__(256);
	__webpack_require__(257);

/***/ },
/* 254 */
/***/ function(module, exports) {

	module.exports = Mock;

/***/ },
/* 255 */
/***/ function(module, exports) {

	'use strict';

	Mock.mock(/\/user\/get/, {
		'user': '@name'
	});

	Mock.mock(/\/user\/query/, {
		'name|5-20': [{ name: '@name' }]
	});

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var VIP = __webpack_require__(2);

	Mock.mock(/\/special\/get/, {
		'special': '@name'
	});

	Mock.mock(/\/special\/query/, function (options) {

		var params = VIP.queryParse(options.url);

		var opt = {};
		// opt['specials'] = [];
		opt['specials|' + params.pageSize] = [{ 'id|+1': params.pageSize * (params.page - 1) + 1, title: '@csentence', mdate: '@datetime', 'open|1-2': false }];
		opt.pageSize = params.pageSize - 0;
		opt.page = params.page - 0;
		opt['totalRecords'] = 325;
		return Mock.mock(opt);
	});

	Mock.mock(/\/special\/del/, {
		msg: 'del ok'
	});

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var VIP = __webpack_require__(2);

	// /city/query?name=xxx
	Mock.mock(/\/city\/query/, function (options) {
		var params = VIP.queryParse(options.url);

		var cityname = params.name;
		var cities = Mock.mock({ 'data|50': ['@city'] });
		cities.data = cities.data.filter(function (city) {
			return city.indexOf(cityname) >= 0;
		});

		return cities;
	});

/***/ }
/******/ ]);