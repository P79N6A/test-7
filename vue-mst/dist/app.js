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

	'use strict';

	var _vue = __webpack_require__(2);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueRouter = __webpack_require__(3);

	var _vueRouter2 = _interopRequireDefault(_vueRouter);

	var _vueAsyncData = __webpack_require__(4);

	var _vueAsyncData2 = _interopRequireDefault(_vueAsyncData);

	var _routes = __webpack_require__(5);

	var _routes2 = _interopRequireDefault(_routes);

	var _extends = __webpack_require__(54);

	var _extends2 = _interopRequireDefault(_extends);

	var _ajax = __webpack_require__(79);

	var _ajax2 = _interopRequireDefault(_ajax);

	var _env = __webpack_require__(81);

	var _env2 = _interopRequireDefault(_env);

	var _vuexRouterSync = __webpack_require__(82);

	var _store = __webpack_require__(83);

	var _store2 = _interopRequireDefault(_store);

	var _App = __webpack_require__(137);

	var _App2 = _interopRequireDefault(_App);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//布局组件(相当于主页面)

	// import VueResource from 'vue-resource';
	var router; //路由器实例

	//test
	//---------------------------
	__webpack_require__(71);

	//注册全局自定义组件 指令等..
	//---------------------------
	(0, _extends2.default)(_vue2.default);

	//开发环境 则配置Vue, mock data
	//---------------------------
	if (_env2.default.active === 'dev') {
		_vue2.default.config.debug = true;
		_vue2.default.config.devTools = true;
		__webpack_require__(168);
	}

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

	router.beforeEach(function () {
		window.scrollTo(0, 0);
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

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	module.exports = Vue;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = VueRouter;

/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		'/index': {
			component: __webpack_require__(6)
		},
		'/demo': {
			component: function (resolve, reject) {
				__webpack_require__.e/* require */(1, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(44)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
			}
		},
		'/special': {
			component: function (resolve) {
				__webpack_require__.e/* require */(1/* aggressive-merge */, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(51)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
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
		}

		,
		'/special/new': {
			component: {
				template: '<h3>{{$route.path}}</h3>'
			}
		},
		'/special/new': {
			component: {
				template: '<h3>{{$route.path}}</h3>'
			}
		},
		'/special/new': {
			component: {
				template: '<h3>{{$route.path}}</h3>'
			}
		},
		'/special/new': {
			component: {
				template: '<h3>{{$route.path}}</h3>'
			}
		},
		'/special/types': {
			component: {
				template: '<h3>{{$route.path}}</h3>'
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(7);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__vue_script__ = __webpack_require__(42);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\index\\index.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(43);
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(8), __esModule: true };

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(9);
	module.exports = __webpack_require__(29).Object.keys;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(10)
	  , $keys    = __webpack_require__(12);

	__webpack_require__(27)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(11);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(13)
	  , enumBugKeys = __webpack_require__(26);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(14)
	  , toIObject    = __webpack_require__(15)
	  , arrayIndexOf = __webpack_require__(18)(false)
	  , IE_PROTO     = __webpack_require__(22)('IE_PROTO');

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
/* 14 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(16)
	  , defined = __webpack_require__(11);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(17);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(15)
	  , toLength  = __webpack_require__(19)
	  , toIndex   = __webpack_require__(21);
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(20)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(20)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(23)('keys')
	  , uid    = __webpack_require__(25);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(24)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 25 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(28)
	  , core    = __webpack_require__(29)
	  , fails   = __webpack_require__(38);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(24)
	  , core      = __webpack_require__(29)
	  , ctx       = __webpack_require__(30)
	  , hide      = __webpack_require__(32)
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
/* 29 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(31);
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
/* 31 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(33)
	  , createDesc = __webpack_require__(41);
	module.exports = __webpack_require__(37) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(34)
	  , IE8_DOM_DEFINE = __webpack_require__(36)
	  , toPrimitive    = __webpack_require__(40)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(37) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(35);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(37) && !__webpack_require__(38)(function(){
	  return Object.defineProperty(__webpack_require__(39)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(38)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(35)
	  , document = __webpack_require__(24).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(35);
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
/* 41 */
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
/* 42 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <template>
	// 	<div class="view-index">
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
/* 43 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"view-index\">\n\t<h3>最新版本更新情况 (V3.12)</h3>\n\t<ul>\n\t\t<li>档期个性化—支持走dap数据录入的档期个性化排序 档期样式更新—支持显示红包金额 专题分类管理功能—支持专题分</li>\n\t\t<li>富文本组件—可支持图文混排的专题页制作 新增专题权限管理—完善角色权限管理，支持专题分类可见 </li>\n\t\t<li>操作优化—支持在发布预览页直接调整显示隐藏...</li>\n\t</ul>\n</div>\n";

/***/ },
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */
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
/* 48 */
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
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = register;

	var _vue = __webpack_require__(2);

	var _vue2 = _interopRequireDefault(_vue);

	var _util = __webpack_require__(55);

	var _util2 = _interopRequireDefault(_util);

	var _components = __webpack_require__(56);

	var _components2 = _interopRequireDefault(_components);

	var _directives = __webpack_require__(78);

	var _directives2 = _interopRequireDefault(_directives);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @ 注册器
	 */


	function regCmps() {
		_util2.default.eachKey(_components2.default, function (options, cmpName) {
			_vue2.default.component(cmpName, options);
		});
	}

	function regDirs() {
		_util2.default.eachKey(_directives2.default, function (options, dirName) {
			_vue2.default.directive(dirName, options);
		});
	}

	function register() {
		regCmps();
		regDirs();
	}

/***/ },
/* 55 */
/***/ function(module, exports) {

	/**
	 * ------------------------------------
	 * @ 业务无关的公共函数
	 * 如： url, cookie, validate
	 * ------------------------------------
	 */


	/**
	 * @ string
	 */
	function capitalize (str) {
		if(str == null) return '';
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function camelize (str, sep) {
		var parts;
		sep = sep || '-';
		if(str.indexOf(sep) === -1) return str;

		parts = str.split(sep).map(function(part, i) {
			return i ? capitalize(part) : part;
		});
		return parts.join('');
	}

	function toArray (str) {
		if(str instanceof Array) return str;
		str = str.replace(/^\s*\[\s*|\s*\]\s*$/g, '');
		return str.split(',');
	}

	/**
	 * @ boolean
	 */
	function makeBoolean (val) {

		if(typeof val !== 'string'){
			return Boolean(val);
		}else{
			switch(val.toLowerCase()){
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
	function makeNumber (val) {
		
		return Number(val);
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
		var isObject = function(val){ return typeof val === 'object'; };
		function doExtend(dst, src) {
			eachKey(src, function (val, key) {
				if(isObject(dst[key]) && isObject(src[key]) ){//对应key都是对象 递归
					extend(dst[key], src[key]);
				}else{
					dst[key] = val;	
				}
			});
			return dst;
		}
		var args = makeArray(arguments);
		return args.reduce(doExtend);
	}

	function extendKeys (dst, src, keys) {
		eachKey(src, function(val,key){
			if(keys.indexOf(key)>-1){
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

	function range (start, size, step) {
		step = step || 1;
		size = size<1 ? 1 : size;
		var arr = (new Array(size+1)).join('v').split('');
		return arr.map(function(v,i){ return start + i*step; });
	}


	/**
	 * @ types
	 */
	function typeFactory (type) {
		function isType(type, val){
			var toString = Object.prototype.toString;
			type = type.toLowerCase();
			return toString.call(val).slice(8,-1).toLowerCase() === type;
		}
		return isType.bind(null, type);
	}
	var types = {};
	(function() {
		var dataTypes = ['number', 'boolean', 'string', 'object', 'function', 'array'];
		dataTypes.forEach(function (type) {
			types['is'+capitalize(type)] = typeFactory(type);
		});
	})();

	/**
	 * @url	
	 */
	var url = {
		queryParse: function(url){
			url = url || location.href;
			function handlePair (kv) {
				var arr = kv.split('=');
				oParam[arr[0]] = decodeURIComponent(arr[1] == null ? '' : arr[1]);
			}
			var re = /\?(.+?)(#\w*)?$/;
			var match = url.match(re);
			var oParam = {};
			if (match) {
				sParam = match[1];
				sParam.split('&').forEach(handlePair);
			}
			return oParam;
		},
		queryStringify: function(oParam){// 同$.param
			var arr = [];
			eachKey(oParam, function(val, key){
				arr.push(key+'='+encodeURIComponent(val));
			});
			return arr.join('&');
		}
	};

	/**
	 * @ shim es5
	 */
	;(function() {
		if(!Function.prototype.bind){
			Function.prototype.bind = function (context) {
				var self = this;
				var bindArgs = makeArray(arguments).slice(1);
				return function () {
					var args = bindArgs.concat(makeArray(arguments));
					return self.apply(context, args);
				};
			};
		}

		if(![].forEach){
			Array.prototype.forEach = function (iterator) {
				for(var i=0, len=this.length; i<len; i++){
					iterator(this[i], i, this);
				}
			};
		}

		if(![].map){
			Array.prototype.map = function (iterator) {
				var ret = [];
				this.forEach(function(val,i,arr) {
					ret.push(iterator(val, i, arr));
				});
				return ret;
			};
		}

		if(![].filter){
			Array.prototype.filter = function(iterator) {
				var ret = [];
				this.forEach(function(val, i, arr) {
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
	 * @ export
	 */
	 
	function setVIP() {
		if(typeof window === 'undefined') return;
		
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
		toArray: toArray
	};

	var boolUtils = {
		makeBoolean: makeBoolean
	};

	var numUtils = {
		makeNumber: makeNumber
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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @ 全局扩展自定义组件
	 */
	//import VueStrap from 'vue-strap';
	var VueStrap = __webpack_require__(57);
	var VIP = __webpack_require__(55);


	var myComponents = {
		Loading: __webpack_require__(58),
		Breadcrumb: __webpack_require__(61),
		Pager: __webpack_require__(67),
		Vtable: __webpack_require__(73)
	};

	var VueStrapPicked = {};

	VIP.extendKeys(VueStrapPicked, VueStrap, ['alert']);

	var components = VIP.extend({}, VueStrap, myComponents);

	module.exports = components;

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = VueStrap;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(7);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__vue_script__ = __webpack_require__(59);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Loading.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(60);
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
/* 59 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <template>
	// 	<div class="loading" id="loading" v-show="show">
	// 		<img src="/src/assets/images/loading.gif" alt="loading">
	// 	</div>
	// </template>
	//
	// <script>
	exports.default = {
		name: 'loading',
		props: ['show']
	};
	// </script>

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"loading\" id=\"loading\" v-show=\"show\">\n\t<img src=\"/src/assets/images/loading.gif\" alt=\"loading\">\n</div>\n";

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(7);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__vue_script__ = __webpack_require__(62);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Breadcrumb.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(66);
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
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getters = __webpack_require__(63);

	var _actions = __webpack_require__(64);

	var _actions2 = _interopRequireDefault(_actions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	// 	<ol class="breadcrumb" v-last="lastLink">
	// 		<li v-for="link in links" v-link="{path: link.url, exact: true}" v-bread="link"><a href="javascript:;">{{link.text}}</a></li>
	// 	</ol>
	// </template>
	//
	//
	// <script>
	exports.default = {
		data: function data() {
			return {};
		},

		vuex: {
			getters: {
				lastLink: _getters.lastCrumb,
				links: _getters.crumbs
			},
			actions: {
				setBreadCrumbs: _actions2.default.setBreadCrumbs
			}
		},
		ready: function ready() {
			this.setBreadCrumbs({ url: this.$route.path });
		},

		directives: {
			last: {
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

/***/ },
/* 63 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.lastCrumb = lastCrumb;
	exports.crumbs = crumbs;
	exports.asideLinks = asideLinks;
	function lastCrumb(state) {
		return state.breadCrumbs[state.breadCrumbs.length - 1];
	}

	function crumbs(state) {
		return state.breadCrumbs;
	}

	function asideLinks(state) {
		return state.asideLinkMap['/' + state.route.path.slice(1).split('/').shift()];
	}

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _mutationTypes = __webpack_require__(65);

	var types = _interopRequireWildcard(_mutationTypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.default = {
		updateTips: function updateTips(_ref, type, text) {
			var dispatch = _ref.dispatch;

			dispatch(types.TIPS_UPDATE, type, text);
		},
		addLoading: function addLoading(_ref2, inc) {
			var dispatch = _ref2.dispatch;

			dispatch(inc ? types.LOADING_INCREMENT : types.LOADING_DECREMENT);
		},
		setBreadCrumbs: function setBreadCrumbs(_ref3, link) {
			var dispatch = _ref3.dispatch;

			dispatch(types.BREADCRUMBS_SET, link);
		}
	};

/***/ },
/* 65 */
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

/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = "\n<ol class=\"breadcrumb\" v-last=\"lastLink\">\n\t<li v-for=\"link in links\" v-link=\"{path: link.url, exact: true}\" v-bread=\"link\"><a href=\"javascript:;\">{{link.text}}</a></li>\n</ol>\n";

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(7);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__webpack_require__(68);
	__vue_script__ = __webpack_require__(70);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Pager.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(72);
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
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(69);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./../../../vue-demo/node_modules/vue-loader/lib/style-rewriter.js!./../../../vue-demo/node_modules/vue-loader/lib/selector.js?type=style&index=0!./Pager.vue", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./../../../vue-demo/node_modules/vue-loader/lib/style-rewriter.js!./../../../vue-demo/node_modules/vue-loader/lib/selector.js?type=style&index=0!./Pager.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(47)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.pager-wrap{padding: 0 20px;}\t\n.pagination{margin-right: 20px;}\n.pager-info{display: inline-block; vertical-align: middle; line-height: 74px;}\n.pager-info .select-pagesize{width: 200px; margin-left: 10px;}\n.select-pagesize .form-control{display: inline; width: auto;}\n.pager-wrap i{font-style: normal;}\n", ""]);

	// exports


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _public = __webpack_require__(71);

	var _public2 = _interopRequireDefault(_public);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		name: 'Pager',
		props: {
			pageSize: { //每页记录数
				type: Number,
				coerce: _public2.default.makeNumber,
				default: 10
			},
			pageSizes: {
				type: Array,
				coerce: _public2.default.toArray,
				default: function _default() {
					return _public2.default.range(this.pageSize, 3, 10);
				}
			},
			activePage: { //当前页码
				type: Number,
				coerce: _public2.default.makeNumber,
				default: 1
			},
			totalRecords: { //结果总数
				type: Number,
				coerce: _public2.default.makeNumber,
				default: 120
			},
			viewSize: { //分页组件显示页码个数
				type: Number,
				coerce: _public2.default.makeNumber,
				default: 10
			},
			viewStart: { //分页组件开始页码
				type: Number,
				coerce: _public2.default.makeNumber,
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
				return _public2.default.range(this.viewStart, Math.min(this.viewSize, this.totalPages - (this.viewStart - 1)));
			},
			params: function params() {
				//请求接口参数
				console.warn(this.pageSize, this.activePage);
				return {
					pageSize: this.pageSize,
					page: this.activePage
				};
			}
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
		methods: {
			getPageData: function getPageData() {
				this.$http.get(this.api, this.params).then(function (res) {
					var data = res.data;
					this.totalRecords = data.totalRecords;
					this.pageSize = data.pageSize;
					this.activePage = data.page;

					// this.pageData = data.specials;
					// 数据同步给Table
					if (this.$parent.constructor.name == 'Vtable') {
						this.$parent.tableData = data.specials;
					}
				});
			},
			navPrev: function navPrev() {
				if (this.activePage > 1) {
					//未到达首页
					if (--this.activePage < this.viewStart) {
						this.viewStart = Math.max(1, this.viewStart - this.viewSize);
					}
				}
			},
			navNext: function navNext() {
				if (this.activePage < this.totalPages) {
					//未到达末尾页
					if (++this.activePage === this.viewStart + this.viewSize) {
						//页码变动
						this.viewStart = this.activePage;
					}
				}
			},
			navTo: function navTo(n) {
				this.activePage = n;
			}
		}
	};
	// </script>
	//
	// <style>
	// 	.pager-wrap{padding: 0 20px;}	
	// 	.pagination{margin-right: 20px;}
	// 	.pager-info{display: inline-block; vertical-align: middle; line-height: 74px;}
	// 	.pager-info .select-pagesize{width: 200px; margin-left: 10px;}
	// 	.select-pagesize .form-control{display: inline; width: auto;}
	// 	.pager-wrap i{font-style: normal;}
	// </style>
	// <template>
	// 	<div class="pager-wrap clearfix">
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
	// 		<nav class="pager-nav pull-right">
	// 			<ul class="pagination va-m">
	// 				<li :class="{disabled: activePage==1}"><a href="javascript:;" @click="navPrev" class="previous-btn"><span>&laquo;</span></a></li>
	// 				<li v-for="page in pages" @click="navTo(page)" :class="{active: page==activePage}"><a href="javascript:;">{{page}}</a></li>
	// 				<li :class="{disabled: activePage==totalPages}"><a href="javascript:;" @click="navNext"><span>&raquo;</span></a></li>
	// 			</ul>
	// 			<span class="total-pages">共 <i class="text-danger">{{totalPages}}</i> 页</span>
	// 		</nav>
	// 	</div>
	// </template>
	//
	// <script>

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/* ----------------------------
	 * @ 业务相关的公共函数
	 * 如：showPop, redirectTo
	 * ----------------------------
	 */

	var VIP = __webpack_require__(55);


	function redirectTo (url) {
		//codes	
	}



	var publicFns = {
		redirectTo: redirectTo
	};

	VIP.extend(VIP, publicFns, {_fns:{"public": publicFns}});

	module.exports = VIP;

/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"pager-wrap clearfix\">\n\t<div class=\"pager-info\">\n\t\t<span class=\"total-records\">共 <i class=\"text-danger\">{{totalRecords}}</i> 条结果</span>\n\t\t<div class=\"dis-ib select-pagesize\">\n\t\t\t每页 \n\t\t\t<select v-model=\"pageSize\" class=\"form-control\" number>\n\t\t\t\t<option v-for=\"ps in pageSizes\">{{ps}}</option>\n\t\t\t</select>\n\t\t\t 条\n\t\t</div>\n\t</div>\n\t<nav class=\"pager-nav pull-right\">\n\t\t<ul class=\"pagination va-m\">\n\t\t\t<li :class=\"{disabled: activePage==1}\"><a href=\"javascript:;\" @click=\"navPrev\" class=\"previous-btn\"><span>&laquo;</span></a></li>\n\t\t\t<li v-for=\"page in pages\" @click=\"navTo(page)\" :class=\"{active: page==activePage}\"><a href=\"javascript:;\">{{page}}</a></li>\n\t\t\t<li :class=\"{disabled: activePage==totalPages}\"><a href=\"javascript:;\" @click=\"navNext\"><span>&raquo;</span></a></li>\n\t\t</ul>\n\t\t<span class=\"total-pages\">共 <i class=\"text-danger\">{{totalPages}}</i> 页</span>\n\t</nav>\n</div>\n";

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(7);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__webpack_require__(74);
	__vue_script__ = __webpack_require__(76);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Vtable.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(77);
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
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(75);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./../../../vue-demo/node_modules/vue-loader/lib/style-rewriter.js!./../../../vue-demo/node_modules/vue-loader/lib/selector.js?type=style&index=0!./Vtable.vue", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./../../../vue-demo/node_modules/vue-loader/lib/style-rewriter.js!./../../../vue-demo/node_modules/vue-loader/lib/selector.js?type=style&index=0!./Vtable.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(47)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.tr-empty{display: none;}\n.table-empty .tr-empty{display: table-row;}\n.tr-empty td{line-height: 80px !important; text-align: center;}\n.glyphicon-arrow-up.disabled:before, .glyphicon-arrow-down.disabled:before{\n\tcolor:#E7E1E1;\n}\n", ""]);

	// exports


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _public = __webpack_require__(71);

	var _public2 = _interopRequireDefault(_public);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		name: 'Vtable',
		props: {
			bordered: { //样式类
				type: Boolean,
				coerce: _public2.default.makeBoolean,
				default: true
			},
			striped: {
				type: Boolean,
				coerce: _public2.default.makeBoolean,
				default: true
			},
			hover: {
				type: Boolean,
				coerce: _public2.default.makeBoolean,
				default: true
			},
			responsive: {
				type: Boolean,
				coerce: _public2.default.makeBoolean,
				default: true
			},
			checkable: { //是否可勾选
				type: Boolean,
				coerce: _public2.default.makeBoolean,
				default: true
			},
			sortKey: { //排序字段
				type: String,
				default: 'id'
			},
			columns: { //表格字段定义
				type: Array,
				default: function _default() {
					return [{ text: 'ID', name: 'id', sortable: true, order: 1 }, { text: '标题', name: 'title', sortable: true, order: 1 }, { text: '修改时间', name: 'mdate', sortable: true, order: 1 }, { text: '启用', name: 'open' }];
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
				return this.columns.filter(function (col) {
					return col.name === this.sortKey;
				}.bind(this))[0].order;
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
		created: function created() {
			/*VIP.eachKey(this.columns, function(c){
	  	if (c.sortable) {
	  		c.active = c.name === this.sortKey;
	  	}
	  }.bind(this));*/
		}

	};
	// </script>
	//
	// <style>
	// 	.tr-empty{display: none;}
	// 	.table-empty .tr-empty{display: table-row;}
	// 	.tr-empty td{line-height: 80px !important; text-align: center;}
	// 	.glyphicon-arrow-up.disabled:before, .glyphicon-arrow-down.disabled:before{
	// 		color:#E7E1E1;
	// 	}
	// </style>
	// <template>
	// 	<div class="table-wrap">
	// 		<table :class="{table:true, 'table-bordered': bordered, 'table-striped': striped, 'table-hover': hover , 'table-responsive': responsive, 'table-empty': tableData.length==0}">
	// 			<thead>
	// 				<th v-for="col in columns">{{col.text || col.name}} <span v-if="col.sortable" @click="sortBy(col)" class="glyphicon hand" :class="{'glyphicon-arrow-down': col.order<0,'glyphicon-arrow-up': col.order>0, disabled: col.name!=sortKey}"></span></th>
	// 			</thead>
	// 			<tbody>
	// 				<tr v-for="row in tableData | orderBy sortKey order"><td v-for="i in columns.length">{{row[columns[i].name]}}</td></tr>
	// 				<tr class="tr-empty"><td colspan="{{columns.length}}">暂时没有数据..</td></tr>
	// 			</tbody>
	// 			<tfoot></tfoot>
	// 		</table>
	// 		<slot name="pager"></slot>
	// 	</div>
	//
	// </template>
	//
	// <script>

/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"table-wrap\">\n\t<table :class=\"{table:true, 'table-bordered': bordered, 'table-striped': striped, 'table-hover': hover , 'table-responsive': responsive, 'table-empty': tableData.length==0}\">\n\t\t<thead>\n\t\t\t<th v-for=\"col in columns\">{{col.text || col.name}} <span v-if=\"col.sortable\" @click=\"sortBy(col)\" class=\"glyphicon hand\" :class=\"{'glyphicon-arrow-down': col.order<0,'glyphicon-arrow-up': col.order>0, disabled: col.name!=sortKey}\"></span></th>\n\t\t</thead>\n\t\t<tbody>\n\t\t\t<tr v-for=\"row in tableData | orderBy sortKey order\"><td v-for=\"i in columns.length\">{{row[columns[i].name]}}</td></tr>\n\t\t\t<tr class=\"tr-empty\"><td colspan=\"{{columns.length}}\">暂时没有数据..</td></tr>\n\t\t</tbody>\n\t\t<tfoot></tfoot>\n\t</table>\n\t<slot name=\"pager\"></slot>\n</div>\n\n";

/***/ },
/* 78 */
/***/ function(module, exports) {

	/**
	 * @ 全局扩展自定义指令
	 */
	 
	 module.exports = {
	 	bread: {
	 		bind:function(){
	 		},
	 		update: function (link) {
	 			if (!link.text) {
	 				link.text = this.el.textContent;
	 			}
	 			if (!link.level) {
	 				link.level = this.arg - 0;
	 			}
	 			//没有level参数 则不影响面包屑
	 			if (link.level == null) {return; }

	 			if (this.el.tagName.toUpperCase() === 'A') {
	 				this.el.setAttribute('href', 'javascript:xx;');
	 			}

	 			this.handler = function () {
	 				this.vm.$store.dispatch('BREADCRUMBS_SET', link);
	 			}.bind(this);
	 			this.el.addEventListener('click', this.handler);
	 		},
	 		unbind: function(){
	 			this.handler && this.el.removeEventListener('click', this.handler);
	 		}	
	 	},
	 	adaptiveHeight:{
	 		bind: function(){
	 			this.handler = function(){
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
	 			this.vm.$nextTick(function(){
	 				$(window).resize();
	 			});
	 		},
	 		unbind: function(){
	 			$(window).off('resize', this.handler);
	 		}
	 	}
	 };

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var VIP = __webpack_require__(71);
	var API = __webpack_require__(80);

	function addInterceptor(Vue, router) {
		//拦截器中 this指向vm
		Vue.http.interceptors.push({
			request: function (request) {
				// console.info('[interceptor req]: this=', this, ', app=', router.app);
				return request;
			},
			response: function (response) {
				console.info('[response]: data: %o , url: %s, res: %o', response.data, response.request.url, response);
				// router.app.loadingCount--; //ajax counter 隐藏loading
				router.app.addLoading(false);
				
				if(!response.ok){//接口调用异常
					// router.app.tips = 'URL:'+response.request.url + ', MSG:'+ response.data;
					// router.app.error = true;
					router.app.updateTips('error', 'URL:'+response.request.url + ', MSG:'+ response.data);
				}
				return response;
			}
		});
	}

	function setAjaxOptions(Vue, router) {
		var myOpts = {
			jsonp: 'jsonpCallback',
			timeout: 10000,
			emulateJSON: true,
			emulateHTTP: true,
			beforeSend: function (request) {//beforeSend其实也是interceptor ，this指向vm

				// console.info('[beforeSend]:this=', this, ', app=', router.app);
				// router.app.loadingCount++; //ajax counter 显示loading
				router.app.addLoading(true);

				request.url = API.get(request.url); //转换为正确的api
				/** 取消动态require(expr)
				if (request.url.match(/\.(js|json)$/)) { //mock
					require('../mock/' + request.url);
				}*/
				
				return request;
			},
			error: function(data){
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
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @ api表和相关方法
	 */
	var env = __webpack_require__(81);
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
			delSpecial: '/special/del'
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
			delSpecial: 'admin.php/special/del'

		}
	};

	module.exports = {
		data: apis,
		get: function (apiKey, env) {
			var api;

			env = env || currentEnv;
			env = ['dev', 'product'].indexOf(env) === -1 ? 'dev' : env;
			api = apis[env][apiKey];
			
			if (api) {
				return envConf.apiBaseUrl + api;
			}else{
				console.error('[api.get]:没有对应的api,请检查参数..');
				return apiKey;
				// return false;
			}
		}
	};


/***/ },
/* 81 */
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
/* 82 */
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
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _vue = __webpack_require__(2);

	var _vue2 = _interopRequireDefault(_vue);

	var _vuex = __webpack_require__(84);

	var _vuex2 = _interopRequireDefault(_vuex);

	var _logger = __webpack_require__(134);

	var _logger2 = _interopRequireDefault(_logger);

	var _mutations = __webpack_require__(135);

	var _mutations2 = _interopRequireDefault(_mutations);

	var _env = __webpack_require__(81);

	var _env2 = _interopRequireDefault(_env);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var debug = _env2.default.active === 'dev';

	var state = {
		breadCrumbs: [{ url: '/index', text: '首页', level: 1 }],
		loadingCount: 0,
		tips: {
			type: 'error',
			text: ''
		},

		topLinks: [{ url: '/special', text: '专题管理', level: 2, active: false }, { url: '/component', text: '组件管理', level: 2, active: false }, { url: '/config', text: '配置管理', level: 2, active: false }, { url: '/customer', text: '客户管理', level: 2, active: false }, { url: '/usergroup', text: '用户群管理', level: 2, active: false }, { url: '/log', text: '日志管理', level: 2, active: false }, { url: '/whitelist', text: '白名单管理', level: 2, active: false }],

		asideLinkMap: {
			'/special': [{ url: '/special/new', text: '新建专题', level: 3, active: false }, { url: '/special/types', text: '专题分类', level: 3, active: false }, { url: '/special/exportUrl', text: '导出URL', level: 3, active: false }],
			'/component': [{ url: '/component/new', text: '新建组件', level: 3, active: false }, { url: '/component/style', text: '样式管理', level: 3, active: false }, { url: '/component/style/types', text: '样式组分类', level: 4, active: false }],
			'/config': [{ url: '/config/new', text: '新建配置', level: 3, active: false }],
			'/customer': [{ url: '/customer/new', text: '新建客户', level: 3, active: false }, { url: '/customer/types', text: '客户类型', level: 3, active: false }, { url: '/customer/client', text: '客户端管理', level: 3, active: false }, { url: '/customer/client/edition', text: '客户端版本管理', level: 4, active: false }],
			'/usergroup': [{ url: '/usergroup/new', text: '新建用户群', level: 3, active: false }],
			'/log': [{ url: '/log/export', text: '导出日志', level: 3, active: false }],
			'/whitelist': [{ url: '/whitelist/export', text: '导出白名单', level: 3, active: false }],
			'/index': []
		}
	};

	// Vue.use(Vuex);

	exports.default = new _vuex2.default.Store({
		state: state,
		mutations: _mutations2.default,
		middlewares: debug ? [(0, _logger2.default)()] : []
	});

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _keys = __webpack_require__(7);

	var _keys2 = _interopRequireDefault(_keys);

	var _from = __webpack_require__(85);

	var _from2 = _interopRequireDefault(_from);

	var _defineProperty = __webpack_require__(107);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	var _iterator = __webpack_require__(110);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(117);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof2 = __webpack_require__(133);

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
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(87);
	__webpack_require__(100);
	module.exports = __webpack_require__(29).Array.from;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(88)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(89)(String, 'String', function(iterated){
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
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(20)
	  , defined   = __webpack_require__(11);
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
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(90)
	  , $export        = __webpack_require__(28)
	  , redefine       = __webpack_require__(91)
	  , hide           = __webpack_require__(32)
	  , has            = __webpack_require__(14)
	  , Iterators      = __webpack_require__(92)
	  , $iterCreate    = __webpack_require__(93)
	  , setToStringTag = __webpack_require__(97)
	  , getPrototypeOf = __webpack_require__(99)
	  , ITERATOR       = __webpack_require__(98)('iterator')
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
/* 90 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(32);

/***/ },
/* 92 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(94)
	  , descriptor     = __webpack_require__(41)
	  , setToStringTag = __webpack_require__(97)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(32)(IteratorPrototype, __webpack_require__(98)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(34)
	  , dPs         = __webpack_require__(95)
	  , enumBugKeys = __webpack_require__(26)
	  , IE_PROTO    = __webpack_require__(22)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(39)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(96).appendChild(iframe);
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
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(33)
	  , anObject = __webpack_require__(34)
	  , getKeys  = __webpack_require__(12);

	module.exports = __webpack_require__(37) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(24).document && document.documentElement;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(33).f
	  , has = __webpack_require__(14)
	  , TAG = __webpack_require__(98)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(23)('wks')
	  , uid        = __webpack_require__(25)
	  , Symbol     = __webpack_require__(24).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(14)
	  , toObject    = __webpack_require__(10)
	  , IE_PROTO    = __webpack_require__(22)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(30)
	  , $export        = __webpack_require__(28)
	  , toObject       = __webpack_require__(10)
	  , call           = __webpack_require__(101)
	  , isArrayIter    = __webpack_require__(102)
	  , toLength       = __webpack_require__(19)
	  , createProperty = __webpack_require__(103)
	  , getIterFn      = __webpack_require__(104);

	$export($export.S + $export.F * !__webpack_require__(106)(function(iter){ Array.from(iter); }), 'Array', {
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
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(34);
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
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(92)
	  , ITERATOR   = __webpack_require__(98)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(33)
	  , createDesc      = __webpack_require__(41);

	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(105)
	  , ITERATOR  = __webpack_require__(98)('iterator')
	  , Iterators = __webpack_require__(92);
	module.exports = __webpack_require__(29).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(17)
	  , TAG = __webpack_require__(98)('toStringTag')
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
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(98)('iterator')
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
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(108), __esModule: true };

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(109);
	var $Object = __webpack_require__(29).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(28);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(37), 'Object', {defineProperty: __webpack_require__(33).f});

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(111), __esModule: true };

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(87);
	__webpack_require__(112);
	module.exports = __webpack_require__(116).f('iterator');

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(113);
	var global        = __webpack_require__(24)
	  , hide          = __webpack_require__(32)
	  , Iterators     = __webpack_require__(92)
	  , TO_STRING_TAG = __webpack_require__(98)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(114)
	  , step             = __webpack_require__(115)
	  , Iterators        = __webpack_require__(92)
	  , toIObject        = __webpack_require__(15);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(89)(Array, 'Array', function(iterated, kind){
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
/* 114 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 115 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(98);

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(118), __esModule: true };

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(119);
	__webpack_require__(130);
	__webpack_require__(131);
	__webpack_require__(132);
	module.exports = __webpack_require__(29).Symbol;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(24)
	  , has            = __webpack_require__(14)
	  , DESCRIPTORS    = __webpack_require__(37)
	  , $export        = __webpack_require__(28)
	  , redefine       = __webpack_require__(91)
	  , META           = __webpack_require__(120).KEY
	  , $fails         = __webpack_require__(38)
	  , shared         = __webpack_require__(23)
	  , setToStringTag = __webpack_require__(97)
	  , uid            = __webpack_require__(25)
	  , wks            = __webpack_require__(98)
	  , wksExt         = __webpack_require__(116)
	  , wksDefine      = __webpack_require__(121)
	  , keyOf          = __webpack_require__(122)
	  , enumKeys       = __webpack_require__(123)
	  , isArray        = __webpack_require__(126)
	  , anObject       = __webpack_require__(34)
	  , toIObject      = __webpack_require__(15)
	  , toPrimitive    = __webpack_require__(40)
	  , createDesc     = __webpack_require__(41)
	  , _create        = __webpack_require__(94)
	  , gOPNExt        = __webpack_require__(127)
	  , $GOPD          = __webpack_require__(129)
	  , $DP            = __webpack_require__(33)
	  , $keys          = __webpack_require__(12)
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
	  __webpack_require__(128).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(125).f  = $propertyIsEnumerable;
	  __webpack_require__(124).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(90)){
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
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(32)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(25)('meta')
	  , isObject = __webpack_require__(35)
	  , has      = __webpack_require__(14)
	  , setDesc  = __webpack_require__(33).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(38)(function(){
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
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(24)
	  , core           = __webpack_require__(29)
	  , LIBRARY        = __webpack_require__(90)
	  , wksExt         = __webpack_require__(116)
	  , defineProperty = __webpack_require__(33).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(12)
	  , toIObject = __webpack_require__(15);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(12)
	  , gOPS    = __webpack_require__(124)
	  , pIE     = __webpack_require__(125);
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
/* 124 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 125 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(17);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(15)
	  , gOPN      = __webpack_require__(128).f
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
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(13)
	  , hiddenKeys = __webpack_require__(26).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(125)
	  , createDesc     = __webpack_require__(41)
	  , toIObject      = __webpack_require__(15)
	  , toPrimitive    = __webpack_require__(40)
	  , has            = __webpack_require__(14)
	  , IE8_DOM_DEFINE = __webpack_require__(36)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(37) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 130 */
/***/ function(module, exports) {

	

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(121)('asyncIterator');

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(121)('observable');

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Symbol = __webpack_require__(117)["default"];

	exports["default"] = function (obj) {
	  return obj && obj.constructor === _Symbol ? "symbol" : typeof obj;
	};

	exports.__esModule = true;

/***/ },
/* 134 */
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
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _defineProperty2 = __webpack_require__(136);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _types$BREADCRUMBS_RE;

	var _mutationTypes = __webpack_require__(65);

	var types = _interopRequireWildcard(_mutationTypes);

	var _public = __webpack_require__(71);

	var _public2 = _interopRequireDefault(_public);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getNavLinks(state) {
		if (getNavLinks.result) {
			return getNavLinks.result;
		}
		var navLinks = state.topLinks.slice(0);
		_public2.default.eachKey(state.asideLinkMap, function (links) {
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
		state.tips.type = type;
		state.tips.text = text;
	}), _types$BREADCRUMBS_RE);

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(107);

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
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(7);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__webpack_require__(138);
	__vue_script__ = __webpack_require__(140);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\App.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(167);
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
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(139);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./../../../vue-demo/node_modules/vue-loader/lib/style-rewriter.js?id=_v-4db3c1fe&scoped=true!./../../../vue-demo/node_modules/vue-loader/lib/selector.js?type=style&index=0!./App.vue", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./../../../vue-demo/node_modules/vue-loader/lib/style-rewriter.js?id=_v-4db3c1fe&scoped=true!./../../../vue-demo/node_modules/vue-loader/lib/selector.js?type=style&index=0!./App.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(47)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.button[_v-4db3c1fe]{\n\tdisplay: block;\n\tbackground-color: #212212;\n\tcolor: #fff;\n\tfont-weight: bold;\n\ttext-align: center;\n\tpadding: 1em;\n\tcursor: pointer;\n\ttext-decoration: none;\n}\n\n.button span[_v-4db3c1fe]{\n\tmargin-left: 2em;\n\tfont-size: .5rem;\n\tcolor: #d6d6d6;\n}\n\n.view[_v-4db3c1fe]{\n\tmin-height: 100px;\n\t/*border: 5px solid #ccc;*/\n\t/*padding: 20px;*/\n}\n", ""]);

	// exports


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _store = __webpack_require__(83);

	var _store2 = _interopRequireDefault(_store);

	var _actions = __webpack_require__(64);

	var _actions2 = _interopRequireDefault(_actions);

	var _getters = __webpack_require__(63);

	var _api = __webpack_require__(141);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 导入样式
	// <template>
	// 	<div class="wrapper">
	// 		<!-- navbar -->
	// 		<app-navbar :user="user" color="inverse"></app-navbar>
	// 		<!-- main -->
	// 		<div class="main">
	// 			<app-sidebar>
	// 				<app-nav type="pills" stacked="true" :links="asideLinks"></app-nav>
	// 			</app-sidebar>			
	// 			<div class="main-bd">
	// 				<breadcrumb></breadcrumb>
	// 				<div class="view" v-adaptive-height.literal="footer">
	// 					<router-view transition="slideInDown" ></router-view>
	// 				</div>
	// 			</div>
	// 		</div>
	//
	// 		<!-- footer -->
	// 		<app-footer></app-footer>
	//
	// 		<!-- tips -->
	// 		<alert :type="tips.type == 'error'? 'danger' : 'success'" class="app-tips" :show.sync="showTips" dismissable :duration="5000" width="40%"><strong>提示: </strong>{{tips.text}}</alert>
	// 		<!-- loading -->
	// 		<loading :show="loadingCount>0"></loading>
	// 	</div>
	// </template>
	//
	// <script type="text/javascript">
	__webpack_require__(142);
	__webpack_require__(145);

	exports.default = {
		name: 'App',
		components: {
			AppNavbar: __webpack_require__(147),
			AppSidebar: __webpack_require__(152),
			AppNav: __webpack_require__(157),
			AppFooter: __webpack_require__(162)
		},
		data: function data() {
			return {
				user: ''
			};
		},

		vuex: {
			getters: {
				tips: function tips(state) {
					return state.tips;
				},
				loadingCount: function loadingCount(state) {
					return state.loadingCount;
				},
				asideLinks: _getters.asideLinks
			},
			actions: {
				updateTips: _actions2.default.updateTips,
				addLoading: _actions2.default.addLoading
			}
		},
		computed: {
			showTips: function showTips() {
				return !!this.tips.text;
			}
		},
		methods: {},
		watch: {},
		created: function created() {},
		ready: function ready() {
			/*User.get({userId:123}).then(function(res){
	  	console.info('res:', res);
	  });*/
		},

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
	// <style scoped>
	// 	.button{
	// 		display: block;
	// 		background-color: #212212;
	// 		color: #fff;
	// 		font-weight: bold;
	// 		text-align: center;
	// 		padding: 1em;
	// 		cursor: pointer;
	// 		text-decoration: none;
	// 	}
	//
	// 	.button span{
	// 		margin-left: 2em;
	// 		font-size: .5rem;
	// 		color: #d6d6d6;
	// 	}
	//
	// 	.view{
	// 		min-height: 100px;
	// 		/*border: 5px solid #ccc;*/
	// 		/*padding: 20px;*/
	// 	}
	// </style>

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @ resource的方式包装与后端交互的api
	 * 如：user, special
	 */
	var Vue = __webpack_require__(2);
	var VIP = __webpack_require__(71);
	var resources = {};

	/**
	 * @url 默认会被覆盖 值任意
	 * @params 无默认参数 调用resource方法时传入 如：User.get({userId:2})
	 * @actions resource相关的方法 CURD and others
	 * @options 为action指定 默认http选项
	 */
	// Vue.resource(url, params, actions, options);


	function setResource(name, otherActions, params){
		name = VIP.capitalize(name);
		params = params || {};

		var defActions = {
			get: {
				url: 'get'+name //url为apiKey
			},query: {
				url: 'query'+name
			},save: {
				url: 'save'+name,
				method: 'POST'
			},update: {
				url: 'update'+name,
				method: 'POST'
			},remove: {
				url: 'remove'+name
			}
		};
		var actions = VIP.extend({}, defActions, otherActions);

		// /UserApi
		var resource = Vue.resource('/'+name+'Api', params, actions, {method: 'GET'});
		resources[name] =  resource;
	}

	var resourceNames = ['user', 'specail'];
	resourceNames.forEach(setResource);

	module.exports = resources;

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(143);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(144)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../../node_modules/css-loader/index.js!./../../../../vue-demo/node_modules/less-loader/index.js!./public.css", function() {
				var newContent = require("!!./../../../../../../node_modules/css-loader/index.js!./../../../../vue-demo/node_modules/less-loader/index.js!./public.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(47)();
	// imports


	// module
	exports.push([module.id, "/*vars*/\n/* .wrapper .app-sidebar{background-color: @gray;} */\n/*css*/\n.red {\n  color: red;\n}\n.hand {\n  cursor: pointer;\n}\n.dis-ib {\n  display: inline-block;\n}\n.va-m {\n  vertical-align: middle;\n}\n.loading {\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n}\n.app-tips {\n  position: fixed;\n  z-index: 100;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n}\n", ""]);

	// exports


/***/ },
/* 144 */
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
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(146);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(144)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../../node_modules/css-loader/index.js!./../../../../vue-demo/node_modules/less-loader/index.js!./vars.less", function() {
				var newContent = require("!!./../../../../../../node_modules/css-loader/index.js!./../../../../vue-demo/node_modules/less-loader/index.js!./vars.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(47)();
	// imports


	// module
	exports.push([module.id, "/*vars*/\n", ""]);

	// exports


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(7);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__webpack_require__(148);
	__vue_script__ = __webpack_require__(150);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\AppNavbar.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(151);
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
	    var id = "./AppNavbar.vue";
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

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(149);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./../../../vue-demo/node_modules/vue-loader/lib/style-rewriter.js!./../../../vue-demo/node_modules/vue-loader/lib/selector.js?type=style&index=0!./AppNavbar.vue", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./../../../vue-demo/node_modules/vue-loader/lib/style-rewriter.js!./../../../vue-demo/node_modules/vue-loader/lib/selector.js?type=style&index=0!./AppNavbar.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(47)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.wrapper .navbar{border-radius: 0;}\n", ""]);

	// exports


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _public = __webpack_require__(71);

	var _public2 = _interopRequireDefault(_public);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		name: 'AppNavbar',
		props: {
			color: {
				type: String,
				default: 'default'
			},
			position: {
				type: String
			},
			static: {
				type: Boolean,
				coerce: _public2.default.makeBoolean
			},
			user: String,
			title: {
				type: String,
				default: '专题后台管理系统'
			}
		},
		methods: {},
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
	// 	<div :class="{navbar:true, 'navbar-default':color=='default', 'navbar-inverse': color=='inverse', 'navbar-fixed-top':position=='top', 'navbar-fixed-bottom': position=='bottom', 'navbar-static-top': static}">
	// 	    <div class="container-fluid">
	// 	        <div class="navbar-header">
	// 	            <button class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
	// 	            	<span class="icon-bar"></span>
	// 	                <span class="icon-bar"></span>
	// 	                <span class="icon-bar"></span>
	// 	            </button>
	// 	            <a href="#" class="navbar-brand">{{title}}</a>
	// 	        </div>
	// 	        <div id="navbar" class="collapse navbar-collapse">
	// 		        <slot>
	// 		            <ul class="nav navbar-nav">
	// 		                <li v-for="link in links" v-link="{path: link.url}"><a v-bread:1="link">{{link.text}}</a></li>
	// 		            </ul>
	// 		        </slot>
	// 		        <slot name="navbarRight">
	// 		            <div class="navbar-right">
	// 		            	<ul class="nav navbar-nav">
	// 		            		<li><a href="#">{{user}}</a></li>
	// 		            		<li><a href="#">退出</a></li>
	// 		            	</ul>
	// 		            </div>
	// 		        </slot>
	// 	        </div>
	// 	    </div>
	// 	</div>
	// </template>
	//
	// <script>

/***/ },
/* 151 */
/***/ function(module, exports) {

	module.exports = "\n<div :class=\"{navbar:true, 'navbar-default':color=='default', 'navbar-inverse': color=='inverse', 'navbar-fixed-top':position=='top', 'navbar-fixed-bottom': position=='bottom', 'navbar-static-top': static}\">\n    <div class=\"container-fluid\">\n        <div class=\"navbar-header\">\n            <button class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\">\n            \t<span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n            </button>\n            <a href=\"#\" class=\"navbar-brand\">{{title}}</a>\n        </div>\n        <div id=\"navbar\" class=\"collapse navbar-collapse\">\n\t        <slot>\n\t            <ul class=\"nav navbar-nav\">\n\t                <li v-for=\"link in links\" v-link=\"{path: link.url}\"><a v-bread:1=\"link\">{{link.text}}</a></li>\n\t            </ul>\n\t        </slot>\n\t        <slot name=\"navbarRight\">\n\t            <div class=\"navbar-right\">\n\t            \t<ul class=\"nav navbar-nav\">\n\t            \t\t<li><a href=\"#\">{{user}}</a></li>\n\t            \t\t<li><a href=\"#\">退出</a></li>\n\t            \t</ul>\n\t            </div>\n\t        </slot>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(7);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__webpack_require__(153);
	__vue_script__ = __webpack_require__(155);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\AppSidebar.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(156);
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
	    var id = "./AppSidebar.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(154);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./../../../vue-demo/node_modules/vue-loader/lib/style-rewriter.js!./../../../vue-demo/node_modules/less-loader/index.js!./../../../vue-demo/node_modules/vue-loader/lib/selector.js?type=style&index=0!./AppSidebar.vue", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./../../../vue-demo/node_modules/vue-loader/lib/style-rewriter.js!./../../../vue-demo/node_modules/less-loader/index.js!./../../../vue-demo/node_modules/vue-loader/lib/selector.js?type=style&index=0!./AppSidebar.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(47)();
	// imports


	// module
	exports.push([module.id, "/*vars*/\n.app-sidebar {\n  position: relative;\n  float: left;\n  margin-right: 20px;\n  background-color: #DDE6ED;\n}\n.app-sidebar.collapsed {\n  margin-right: 0px;\n}\n.app-sidebar .toggle-btn {\n  position: absolute;\n  z-index: 10;\n  top: 50%;\n  right: 0;\n  width: 25px;\n  height: 50px;\n  overflow: hidden;\n}\n.app-sidebar.collapsed .toggle-btn {\n  -webkit-transform: translateX(100%);\n  transform: translateX(100%);\n}\n.app-sidebar .toggle-btn i {\n  position: absolute;\n  width: 200%;\n  height: 100%;\n  font: normal 30px/50px serif;\n  text-align: left;\n  text-indent: 10px;\n  background-color: #cfc;\n  border-radius: 50%;\n  cursor: pointer;\n  opacity: .5;\n}\n.app-sidebar.collapsed .toggle-btn i {\n  -webkit-transform: translateX(-50%);\n  transform: translateX(-50%);\n  text-indent: 23px;\n}\n.app-sidebar .toggle-btn i:hover {\n  font-weight: bold;\n  opacity: 0.8;\n}\n.main-bd {\n  overflow-x: hidden;\n}\n.sidebar-bd {\n  width: 200px;\n}\n.sidebar-bd .nav > li > a:hover {\n  background-color: #CADEED;\n}\n.sidebar-bd .nav-pills > li.active > a {\n  background-color: #337ab7;\n}\n.expand-transition {\n  -webkit-transition: width 0.3s linear;\n  transition: width 0.3s linear;\n  opacity: 1;\n}\n.expand-enter,\n.expand-leave {\n  width: 0px !important;\n  opacity: 0;\n}\n", ""]);

	// exports


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getters = __webpack_require__(63);

	exports.default = {
		props: {
			width: String,
			collapsed: {
				type: Boolean,
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
				asideLinks: _getters.asideLinks
			}
		} /*,
	   data: function(){
	   return { linksCount: 0};
	   },
	   watch: {
	   asideLinks: function(v){
	   	this.linksCount = v.length;
	   }
	   }*/
	};
	// </script>
	//
	// <style lang="less">
	// 	@import "../assets/css/vars.less";
	//
	// 	.app-sidebar{position: relative; float:left; margin-right: 20px; background-color: #DDE6ED;}
	// 	.app-sidebar.collapsed{margin-right: 0px;}
	// 	.app-sidebar .toggle-btn{position: absolute; z-index: 10; top: 50%; right: 0; width: 25px; height: 50px; overflow: hidden;}
	// 	.app-sidebar.collapsed .toggle-btn{-webkit-transform: translateX(100%); transform: translateX(100%);}
	// 	.app-sidebar .toggle-btn i{position: absolute; width: 200%; height: 100%; font: normal 30px/50px serif; text-align: left; text-indent: 10px; background-color: #cfc; border-radius: 50%; cursor:pointer; opacity:.5;}
	// 	.app-sidebar.collapsed .toggle-btn i{-webkit-transform: translateX(-50%); transform: translateX(-50%); text-indent: 23px;}
	// 	.app-sidebar .toggle-btn i:hover{font-weight: bold; opacity:0.8;}
	// 	.main-bd{overflow-x: hidden;}
	// 	.sidebar-bd{width:200px;}
	// 	.sidebar-bd .nav > li > a:hover{background-color: #CADEED;}
	// 	.sidebar-bd .nav-pills > li.active > a{ background-color: #337ab7; }
	//
	// 	.expand-transition{-webkit-transition: width 0.3s linear; transition: width 0.3s linear; opacity:1;}
	// 	.expand-enter, .expand-leave{width:0px !important; opacity:0;}
	// </style>
	// <template>
	// 	<div class="app-sidebar" v-adaptive-height.literal="footer" :class="{'collapsed':collapsed}" v-show="$route.path!=='/index'">
	// 		<span class="toggle-btn" @click="toggle"><i>{{collapsed?'<':'>'}}</i></span>
	// 		<div class="sidebar-bd" v-show="!collapsed" transition="expand" :style="{'width': width}">
	// 			<slot></slot>
	// 		</div>
	// 	</div>
	// </template>
	//
	// <script>

/***/ },
/* 156 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"app-sidebar\" v-adaptive-height.literal=\"footer\" :class=\"{'collapsed':collapsed}\" v-show=\"$route.path!=='/index'\">\n\t<span class=\"toggle-btn\" @click=\"toggle\"><i>{{collapsed?'<':'>'}}</i></span>\n\t<div class=\"sidebar-bd\" v-show=\"!collapsed\" transition=\"expand\" :style=\"{'width': width}\">\n\t\t<slot></slot>\n\t</div>\n</div>\n";

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(7);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__webpack_require__(158);
	__vue_script__ = __webpack_require__(160);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\AppNav.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(161);
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
	    var id = "./AppNav.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(159);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./../../../vue-demo/node_modules/vue-loader/lib/style-rewriter.js!./../../../vue-demo/node_modules/vue-loader/lib/selector.js?type=style&index=0!./AppNav.vue", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./../../../vue-demo/node_modules/vue-loader/lib/style-rewriter.js!./../../../vue-demo/node_modules/vue-loader/lib/selector.js?type=style&index=0!./AppNav.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(47)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.app-sidebar .nav-pills > li.active > a{border-radius: 0;}\n", ""]);

	// exports


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _public = __webpack_require__(71);

	var _public2 = _interopRequireDefault(_public);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ensureBoolean = _public2.default.makeBoolean; // <template>
	// 	<ul :class="{nav: true, 'nav-tabs': type==='tabs','nav-pills': type==='pills','nav-justified': justified,'nav-stacked': stacked}">
	// 		<li v-for="link in links" :class="{active: link.active}" @click="activate(link)" v-bread="link">
	// 			<a v-link="{path: link.url}">{{link.text}}</a>
	// 		</li>
	// 	</ul>
	// </template>
	//
	// <script>

	exports.default = {
		props: {
			type: String,
			justified: {
				type: Boolean,
				default: false,
				coerce: ensureBoolean
			},
			stacked: {
				type: Boolean,
				default: false,
				coerce: ensureBoolean
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

		methods: {
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
	// 	.app-sidebar .nav-pills > li.active > a{border-radius: 0;}
	// </style>

/***/ },
/* 161 */
/***/ function(module, exports) {

	module.exports = "\n<ul :class=\"{nav: true, 'nav-tabs': type==='tabs','nav-pills': type==='pills','nav-justified': justified,'nav-stacked': stacked}\">\n\t<li v-for=\"link in links\" :class=\"{active: link.active}\" @click=\"activate(link)\" v-bread=\"link\">\n\t\t<a v-link=\"{path: link.url}\">{{link.text}}</a>\n\t</li>\n</ul>\n";

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(7);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__webpack_require__(163);
	__vue_script__ = __webpack_require__(165);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\AppFooter.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(166);
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
	    var id = "./AppFooter.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(164);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./../../../vue-demo/node_modules/vue-loader/lib/style-rewriter.js!./../../../vue-demo/node_modules/less-loader/index.js!./../../../vue-demo/node_modules/vue-loader/lib/selector.js?type=style&index=0!./AppFooter.vue", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./../../../vue-demo/node_modules/vue-loader/lib/style-rewriter.js!./../../../vue-demo/node_modules/less-loader/index.js!./../../../vue-demo/node_modules/vue-loader/lib/selector.js?type=style&index=0!./AppFooter.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(47)();
	// imports


	// module
	exports.push([module.id, "/*vars*/\nfooter {\n  height: 50px;\n  margin-top: 20px;\n  line-height: 50px;\n  background-color: #222;\n  color: #eee;\n  text-align: center;\n}\nfooter ul,\nfooter li {\n  list-style: none;\n  margin: 0;\n}\n", ""]);

	// exports


/***/ },
/* 165 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <template>
	// 	<footer>
	// 		<ul>
	// 			<li>DESIGN BY MOBILE UED@KIMI</li>
	// 		</ul>
	// 	</footer>
	// </template>
	// <script>
	exports.default = {
		data: function data() {
			return {};
		}
	};
	// </script>
	//
	// <style lang="less">
	// 	@import "../assets/css/vars.less";
	//
	// 	footer{height: 50px; margin-top: 20px; line-height: 50px; background-color: @bgcolor; color:@color; text-align: center;}
	// 	footer ul, footer li{list-style: none; margin: 0;}
	// </style>

/***/ },
/* 166 */
/***/ function(module, exports) {

	module.exports = "\n<footer>\n\t<ul>\n\t\t<li>DESIGN BY MOBILE UED@KIMI</li>\n\t</ul>\n</footer>\n";

/***/ },
/* 167 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"wrapper\" _v-4db3c1fe=\"\">\n\t<!-- navbar -->\n\t<app-navbar :user=\"user\" color=\"inverse\" _v-4db3c1fe=\"\"></app-navbar>\n\t<!-- main -->\n\t<div class=\"main\" _v-4db3c1fe=\"\">\n\t\t<app-sidebar _v-4db3c1fe=\"\">\n\t\t\t<app-nav type=\"pills\" stacked=\"true\" :links=\"asideLinks\" _v-4db3c1fe=\"\"></app-nav>\n\t\t</app-sidebar>\t\t\t\n\t\t<div class=\"main-bd\" _v-4db3c1fe=\"\">\n\t\t\t<breadcrumb _v-4db3c1fe=\"\"></breadcrumb>\n\t\t\t<div class=\"view\" v-adaptive-height.literal=\"footer\" _v-4db3c1fe=\"\">\n\t\t\t\t<router-view transition=\"slideInDown\" _v-4db3c1fe=\"\"></router-view>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t\n\t<!-- footer -->\n\t<app-footer _v-4db3c1fe=\"\"></app-footer>\n\n\t<!-- tips -->\n\t<alert :type=\"tips.type == 'error'? 'danger' : 'success'\" class=\"app-tips\" :show.sync=\"showTips\" dismissable=\"\" :duration=\"5000\" width=\"40%\" _v-4db3c1fe=\"\"><strong _v-4db3c1fe=\"\">提示: </strong>{{tips.text}}</alert>\n\t<!-- loading -->\n\t<loading :show=\"loadingCount>0\" _v-4db3c1fe=\"\"></loading>\n</div>\n";

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var Mock = __webpack_require__(169);

	Mock.setup({timeout: 600});

	__webpack_require__(170);
	__webpack_require__(171);


/***/ },
/* 169 */
/***/ function(module, exports) {

	module.exports = Mock;

/***/ },
/* 170 */
/***/ function(module, exports) {

	
	Mock.mock(/\/user\/get/, {
		'user': '@name'
	});


	Mock.mock(/\/user\/query/, {
		'name|5-20': [{name: '@name'}]
	});

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	var VIP = __webpack_require__(71);

	Mock.mock(/\/special\/get/, {
		'special': '@name'
	});

	Mock.mock(/\/special\/query/, function (options) {
		
		var params = VIP.queryParse(options.url);
		
		var opt = {};
		// opt['specials'] = [];
		opt['specials|'+params.pageSize] = [{'id|+1':params.pageSize*(params.page-1)+1, title: '@csentence', mdate:'@datetime', 'open|1-2': false}];
		opt.pageSize = params.pageSize - 0;
		opt.page = params.page - 0;
		opt['totalRecords'] = 325;
		return Mock.mock(opt);
	});

/***/ }
/******/ ]);