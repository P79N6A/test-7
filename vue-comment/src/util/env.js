/* global MutationObserver */

// can we use __proto__?
export const hasProto = '__proto__' in {}  //__proto__可读并可枚举.  Object.getPrototypeOf(obj)

// Browser environment sniffing
export const inBrowser =
  typeof window !== 'undefined' &&
  Object.prototype.toString.call(window) !== '[object Object]' //[object global]

// detect devtools
export const devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__

// UA sniffing for working around browser-specific quirks
const UA = inBrowser && window.navigator.userAgent.toLowerCase()
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
export const isAndroid = UA && UA.indexOf('android') > 0
export const isIos = UA && /(iphone|ipad|ipod|ios)/i.test(UA)
export const isWechat = UA && UA.indexOf('micromessenger') > 0

let transitionProp
let transitionEndEvent
let animationProp
let animationEndEvent

// Transition property/event sniffing
if (inBrowser && !isIE9) {
  const isWebkitTrans =
    window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  const isWebkitAnim =
    window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  transitionProp = isWebkitTrans
    ? 'WebkitTransition'
    : 'transition'
  transitionEndEvent = isWebkitTrans
    ? 'webkitTransitionEnd'
    : 'transitionend'
  animationProp = isWebkitAnim
    ? 'WebkitAnimation'
    : 'animation'
  animationEndEvent = isWebkitAnim
    ? 'webkitAnimationEnd'
    : 'animationend'
}

export {
  transitionProp,
  transitionEndEvent,
  animationProp,
  animationEndEvent
}

/**
 * Defer a task to execute it asynchronously. Ideally this
 * should be executed as a microtask, so we leverage
 * MutationObserver if it's available, and fallback to
 * setTimeout(0).
 *
 * @param {Function} cb
 * @param {Object} ctx
 */
// like process.nextTick， also like setTimeout(fn,0)
export const nextTick = (function () {
  var callbacks = []
  var pending = false
  var timerFunc
  function nextTickHandler () {
    pending = false
    var copies = callbacks.slice(0)
    callbacks = []
    for (var i = 0; i < copies.length; i++) {//遍历执行回调数组
      copies[i]()
    }
  }

  /* istanbul ignore if */
  if (typeof MutationObserver !== 'undefined' && !(isWechat && isIos)) {//支持MutationObserver 且 非微信和IOS
    var counter = 1
    var observer = new MutationObserver(nextTickHandler) //dom变动之后 执行回调数组
    var textNode = document.createTextNode(counter)
    observer.observe(textNode, {
      characterData: true
    })
    timerFunc = function () {//修改文本节点的内容 会异步触发 MutationObserver的callback
      counter = (counter + 1) % 2
      textNode.data = counter
    }
  } else {//当不支持MutationObserver
    // webpack attempts to inject a shim for setImmediate
    // if it is used as a global, so we have to work around that to
    // avoid bundling unnecessary code.
    const context = inBrowser
      ? window
      : typeof global !== 'undefined' ? global : {}
    timerFunc = context.setImmediate || setTimeout
  }
  return function (cb, ctx) {//nextTick(callback, context)
    var func = ctx
      ? function () { cb.call(ctx) }
      : cb  //func = cb.bind(ctx) or cb
    callbacks.push(func)
    if (pending) return
    pending = true
    timerFunc(nextTickHandler, 0)
  }
})()

let _Set
/* istanbul ignore if */
if (typeof Set !== 'undefined' && Set.toString().match(/native code/)) {
  // use native Set when available.
  _Set = Set
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = function () {
    this.set = Object.create(null)
  }
  _Set.prototype.has = function (key) {
    return this.set[key] !== undefined
  }
  _Set.prototype.add = function (key) {
    this.set[key] = 1
  }
  _Set.prototype.clear = function () {
    this.set = Object.create(null)
  }
}

export { _Set }
