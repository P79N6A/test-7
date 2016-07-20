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
function kabebCase (str) {
	return str.split('').map(function(c, i){
		if(c.toUpperCase() === c){
			c = (i ? '-' : '') +c.toLowerCase() ;
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
	var isObject = function (val) {
		return typeof val === 'object';
	};

	function doExtend(dst, src) {
		eachKey(src, function (val, key) {
			if (isObject(dst[key]) && isObject(src[key])) { //对应key都是对象 递归
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
 * @date
 */
 // 格式化日期 2015-06-04 22:00:22
 // sFormat: date, time, datetime
 function formatDate(oDate,sFormat){
 	function getFormats (opts) {
	 	function d2(n,i,arr){
	 		if (n<10) {
	 			arr[i] = '0'+n;
	 		}
	 	}
 		var dt = opts.date;
 		var date = [dt.getFullYear(), dt.getMonth()+1, dt.getDate()], time = [dt.getHours(), dt.getMinutes(), dt.getSeconds()];
 		if (opts.zeroFill) {
 			date.forEach(d2);
 			time.forEach(d2);
 		}

 		if (!opts.hasSecond) {
 			time.pop();
 		}

 		date = date.join(opts.delimeter);
 		time = time.join(':');

 		return {date: date, time: time, datetime: date + ' ' + time};
 	}

 	// 默认值 
 	var opts = {
 		delimeter: '/',
 		zeroFill: true,
 		hasSecond: true,
 		date: new Date(),
 		format: 'datetime'
 	};
 	if(oDate instanceof Date){
 		opts.date = oDate;
 	}else if(typeof oDate === 'object'){
 		extend(opts, oDate);
 	}
	sFormat && (opts.format = sFormat);
 	
	return getFormats(opts)[opts.format];
 }

 //获取某天的日期对象 
 //2015-06-15 10:02:30 makeDate(2015,6,15,10,2,30) makeDate('2015-12-02 9:02:22')
 function makeDate(y, m, d, h, i, s) {
 	var dateStr;
 	if(typeof y === 'string' && isNaN(Number(y))){
 		dateStr = y;
 		return new Date(dateStr.replace(/\-/g, '/'));
 	}
 	if(!arguments.length) return new Date();
 	var dt = new Date();
 	dt.setFullYear(y, m-1, d);
 	h && dt.setHours(h, i||0, s||0);
 	return dt;
 }

 // 获取某月最后1天是几号  
 // 如：getLastDay(9,2015) 为 2015年9月最后1天号数
 function getLastDate(month, year){
 	var today = new Date();
 	month = month || today.getMonth() + 1;
 	year = year || today.getFullYear();
 	var firstDate = new Date(year, month, 1); //下个月1号
 	return (new Date( firstDate.getTime() - 24*60*60*1000 )).getDate();
 }

 // 倒计时 每秒执行操作 完成时执行回调
 function countdown(seconds, handler, callback, step) {
 	var timer;
 	step = step ? Math.abs(step) : 1; //计时器 隔多少秒重新执行
 	function iterator() {
 		timer = setTimeout(function () {
 			seconds -= step;
 			handler( seconds );//执行操作后 倒计时减少

 			if (seconds > 0) {
 				iterator();
 			} else {//倒计时结束
 				isFunction(callback) && callback();
 			}
 		}, step*1000);
 	}

 	try{
 		arguments.callee.stop = function(){
 			clearTimeout(timer);
 		};
 	}catch(e){
 		console.log(e);
 	}

 	iterator();
 }

 // 获取服务器时间
 function getServerTime (callback) {
 	var xhr = new XMLHttpRequest(), dt;
 	if(!xhr){
 		xhr = new ActiveXObject('Microsoft.XMLHTTP');
 	}
 	if(!xhr){ log('浏览器版本太低，不支持XMLHttpRequest'); return;}
 	xhr.open('HEAD', location.href, true);
 	xhr.onreadystatechange = function(){
 		if(xhr.readyState == 4){
 			if (xhr.status == 200) {
 				dt = xhr.getResponseHeader('Date');
 			} else {
 				log('获取服务器时间失败，用本地时间替代');
 				dt = formatDate('now', 3);
 			}

 			isFunction(callback) && callback(dt);
 		}
 	};
 	xhr.send();

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
	var arr = (new Array(size + 1)).join('v').split('');
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
	queryParse: function (url) {
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
	queryStringify: function (oParam) { // 同$.param
		var arr = [];
		eachKey(oParam, function (val, key) {
			arr.push(key + '=' + encodeURIComponent(val));
		});
		return arr.join('&');
	},
	//获取url片段数组或某片段
	//segments('/foo/bar/zoo', 1, true) => '/foo'
	//segments('/foo/bar/zoo') => ['foo', 'bar', 'zoo']
	segments: function (path, index, isPrefix) {
		var segs = path.replace(/\s/g, '').split('/');
		!segs[0] && segs.shift();

		var tmp;
		if (arguments.length === 1) {
			return segs;
		} else {

			if (types.isBoolean(index)) { //参数调整
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
			if (isNaN(index) || index > segs.length) { //参数校验
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
;(function () {
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

	if (![].every) {
		Array.prototype.every = function (iterator) {
			var ret = true;
			for (var i = 0, len = this.length; i < len; i++) {
				if( !iterator(this[i], i, this) ){
					ret = false;
					break;
				}
			}
			return ret;
		};
	}

	if (![].some) {
		Array.prototype.some = function (iterator) {
			var ret = false;
			for (var i = 0, len = this.length; i < len; i++) {
				if( iterator(this[i], i, this) ){
					ret = true;
					break;
				}
			}
			return ret;
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

var dateUtils = {
	formatDate: formatDate,
	makeDate: makeDate,
	getLastDate: getLastDate,
	countdown: countdown,
	getServerTime: getServerTime
};

var utils = {
	_fns: {
		obj: objUtils,
		arr: arrUtils,
		str: strUtils,
		bool: boolUtils,
		date: dateUtils,
		url: url,
		type: types
	}
};

var eVIP = extend({}, objUtils, arrUtils, strUtils, boolUtils, numUtils, dateUtils, types, url, utils);

// VIP设为全局变量
setVIP();

module.exports = eVIP;