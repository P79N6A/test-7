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

function randomInt (start, end) {
	var tmp;
	if (arguments.length === 1) {
		end = start;
		start = 0;
	}
	if(start>end){
		tmp = start;
		start = end;
		end = tmp;
	}
	return start + Math.floor(Math.random()* (Math.abs(end-start)+1));
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
		var oParam = {}, sParam = '';
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