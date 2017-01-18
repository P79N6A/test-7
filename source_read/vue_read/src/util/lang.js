/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 *
 * @param {Object} obj
 * @param {String} key
 * @param {*} val
 * @public
 */
//:给对象添加新属性，并触发变更通知 / 修改旧属性
export function set (obj, key, val) {
  if (hasOwn(obj, key)) {//:旧属性
    obj[key] = val
    return
  }
  if (obj._isVue) {//:obj为vue的实例 如vm  则设置vm._data
    set(obj._data, key, val)
    return
  }
  var ob = obj.__ob__ //:已经建立数据观察
  if (!ob) {
    obj[key] = val
    return
  }
  ob.convert(key, val)
  ob.dep.notify() //:通知依赖方 数据有变更
  if (ob.vms) {
    var i = ob.vms.length
    while (i--) {//:遍历observer相关的vm
      var vm = ob.vms[i]
      vm._proxy(key)
      vm._digest()
    }
  }
  return val //:返回设置后的值
}

/**
 * Delete a property and trigger change if necessary.
 *
 * @param {Object} obj
 * @param {String} key
 */
//:删除对象上的属性 并通知变更
export function del (obj, key) {
  if (!hasOwn(obj, key)) {
    return
  }
  delete obj[key]
  var ob = obj.__ob__
  if (!ob) {
    if (obj._isVue) {//:未建立数据观察 vm
      delete obj._data[key]
      obj._digest()
    }
    return
  }
  ob.dep.notify()
  if (ob.vms) {
    var i = ob.vms.length
    while (i--) {
      var vm = ob.vms[i]
      vm._unproxy(key)
      vm._digest()
    }
  }
}

var hasOwnProperty = Object.prototype.hasOwnProperty
/**
 * Check whether the object has the property.
 *
 * @param {Object} obj
 * @param {String} key
 * @return {Boolean}
 */
export function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Check if an expression is a literal value.
 *
 * @param {String} exp
 * @return {Boolean}
 */
//:检测表达式是否字面量值 如 true false 12.33 'hello' "hello"
var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/
export function isLiteral (exp) {
  return literalValueRE.test(exp)
}

/**
 * Check if a string starts with $ or _
 *
 * @param {String} str
 * @return {Boolean}
 */
//:检测字符串是否 $ 或 _ 开头
export function isReserved (str) {
  var c = (str + '').charCodeAt(0)
  return c === 0x24 || c === 0x5F
}

/**
 * Guard text output, make sure undefined outputs
 * empty string
 *
 * @param {*} value
 * @return {String}
 */

export function _toString (value) {
  return value == null
    ? ''
    : value.toString()
}

/**
 * Check and convert possible numeric strings to numbers
 * before setting back to data
 *
 * @param {*} value
 * @return {*|Number}
 */
//:转换为数值类型
export function toNumber (value) {
  if (typeof value !== 'string') {
    return value
  } else {//: string
    var parsed = Number(value)
    return isNaN(parsed)
      ? value
      : parsed
  }
}

/**
 * Convert string boolean literals into real booleans.
 *
 * @param {*} value
 * @return {*|Boolean}
 */

export function toBoolean (value) {
  return value === 'true'
    ? true
    : value === 'false'
      ? false
      : value
}

/**
 * Strip quotes from a string
 *
 * @param {String} str
 * @return {String | false}
 */
//:移除引号 'hello'  "hello"
export function stripQuotes (str) {
  var a = str.charCodeAt(0)
  var b = str.charCodeAt(str.length - 1)
  return a === b && (a === 0x22 || a === 0x27)
    ? str.slice(1, -1)
    : str
}

/**
 * Camelize a hyphen-delmited string.
 *
 * @param {String} str
 * @return {String}
 */

var camelizeRE = /-(\w)/g
export function camelize (str) {
  return str.replace(camelizeRE, toUpper) //:-后的第一个字符转换为大写
}

function toUpper (_, c) {
  return c ? c.toUpperCase() : ''
}

/**
 * Hyphenate a camelCase string.
 *
 * @param {String} str
 * @return {String}
 */
//:helloWorld -> hello-world
var hyphenateRE = /([a-z\d])([A-Z])/g
export function hyphenate (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
}

/**
 * Converts hyphen/underscore/slash delimitered names into
 * camelized classNames.
 *
 * e.g. my-component => MyComponent
 *      some_else    => SomeElse
 *      some/comp    => SomeComp
 *
 * @param {String} str
 * @return {String}
 */

var classifyRE = /(?:^|[-_\/])(\w)/g
export function classify (str) {
  return str.replace(classifyRE, toUpper) //首字母或-_/后的字母转换为大写
}

/**
 * Simple bind, faster than native
 *
 * @param {Function} fn
 * @param {Object} ctx
 * @return {Function}
 */
//:绑定函数执行上下文
export function bind (fn, ctx) {
  return function (a) {
    var l = arguments.length //:入参个数大于1 用fn.apply; 否则用fn.call
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
}

/**
 * Convert an Array-like object to a real Array.
 *
 * @param {Array-like} list
 * @param {Number} [start] - start index
 * @return {Array}
 */
//:类数组转换为真实数据
export function toArray (list, start) {
  start = start || 0
  var i = list.length - start
  var ret = new Array(i)
  while (i--) {//:遍历赋值的方式转换
    ret[i] = list[i + start]
  }
  return ret
}

/**
 * Mix properties into target object.
 *
 * @param {Object} to
 * @param {Object} from
 */
//:扩展对象
export function extend (to, from) {
  var keys = Object.keys(from)
  var i = keys.length
  while (i--) {//:遍历源对象 赋值, 似乎比较喜欢用while遍历
    to[keys[i]] = from[keys[i]]
  }
  return to
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 *
 * @param {*} obj
 * @return {Boolean}
 */
//:判断是否对象
export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 *
 * @param {*} obj
 * @return {Boolean}
 */
//:判断是否普通对象
var toString = Object.prototype.toString
var OBJECT_STRING = '[object Object]'
export function isPlainObject (obj) {
  return toString.call(obj) === OBJECT_STRING
}

/**
 * Array type check.
 *
 * @param {*} obj
 * @return {Boolean}
 */

export const isArray = Array.isArray

/**
 * Define a property.
 *
 * @param {Object} obj
 * @param {String} key
 * @param {*} val
 * @param {Boolean} [enumerable]
 */
//:用ES5 Object.defineProperty(obj, key , options) 添加属性
export function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

/**
 * Debounce a function so it only gets called after the
 * input stops arriving after the given wait period.
 *
 * @param {Function} func
 * @param {Number} wait
 * @return {Function} - the debounced function
 */
//:延迟触发回调 控制回调的调用频率
export function debounce (func, wait) {
  var timeout, args, context, timestamp, result
  var later = function () {
    var last = Date.now() - timestamp //:经过的时间
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      result = func.apply(context, args)
      if (!timeout) context = args = null
    }
  }
  return function () {
    context = this
    args = arguments
    timestamp = Date.now()
    if (!timeout) {
      timeout = setTimeout(later, wait)
    }
    return result
  }
}

/**
 * Manual indexOf because it's slightly faster than
 * native.
 *
 * @param {Array} arr
 * @param {*} obj
 */
//: Array.prototype.indexOf
export function indexOf (arr, obj) {
  var i = arr.length
  while (i--) {
    if (arr[i] === obj) return i
  }
  return -1
}

/**
 * Make a cancellable version of an async callback.
 *
 * @param {Function} fn
 * @return {Function}
 */
//:创建可取消的异步回调 newfoo = cancellabel(foo) foo.cancel();
export function cancellable (fn) {
  var cb = function () {
    if (!cb.cancelled) {//:若没被cancelled 才执行回调
      return fn.apply(this, arguments)
    }
  }
  cb.cancel = function () {
    cb.cancelled = true
  }
  return cb
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 *
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 */
//:非严格相等  引用相同 / 值相等都认为是true
export function looseEqual (a, b) {
  /* eslint-disable eqeqeq */
  return a == b || (
    isObject(a) && isObject(b)
      ? JSON.stringify(a) === JSON.stringify(b)
      : false //:都为对象 则比较序列化后的结果是否相等
  )
  /* eslint-enable eqeqeq */
}
