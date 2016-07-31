import config from './config'
import Dep from './observer/dep'
import { parseExpression } from './parsers/expression'
import { pushWatcher } from './batcher'
import {
  extend,
  warn,
  isArray,
  isObject,
  nextTick,
  _Set as Set
} from './util/index'

let uid = 0

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 *
 * @param {Vue} vm
 * @param {String|Function} expOrFn
 * @param {Function} cb
 * @param {Object} options
 *                 - {Array} filters
 *                 - {Boolean} twoWay
 *                 - {Boolean} deep
 *                 - {Boolean} user
 *                 - {Boolean} sync
 *                 - {Boolean} lazy
 *                 - {Function} [preProcess]
 *                 - {Function} [postProcess]
 * @constructor
 */
//:watcher会解析表达式，收集依赖；当表达式值变化时，触发回调
export default function Watcher (vm, expOrFn, cb, options) {
  // mix in options
  if (options) {
    extend(this, options)
  }
  var isFn = typeof expOrFn === 'function'
  this.vm = vm
  vm._watchers.push(this) //:watcher对象存入vm._watchers
  this.expression = expOrFn
  this.cb = cb
  this.id = ++uid // uid for batching
  this.active = true
  this.dirty = this.lazy // for lazy watchers
  this.deps = []
  this.newDeps = []
  this.depIds = new Set()
  this.newDepIds = new Set()
  this.prevError = null // for async error stacks
  // parse expression for getter/setter
  if (isFn) {
    this.getter = expOrFn
    this.setter = undefined
  } else {//: 最终表达式都是被解析为函数 如 v-model="user" 同 v-model="getUser()"
    var res = parseExpression(expOrFn, this.twoWay)
    this.getter = res.get
    this.setter = res.set
  }
  this.value = this.lazy
    ? undefined
    : this.get()  //:若为lazy的watcher 则watcher.value初始值为undefined
  // state for avoiding false triggers for deep and Array
  // watchers during vm._digest()
  this.queued = this.shallow = false
}

/**
 * Evaluate the getter, and re-collect dependencies.
 */
//:调用watcher.getter() 重新收集依赖
Watcher.prototype.get = function () {
  this.beforeGet()
  var scope = this.scope || this.vm
  var value
  try {
    value = this.getter.call(scope, scope)
  } catch (e) {
    if (
      process.env.NODE_ENV !== 'production' &&
      config.warnExpressionErrors
    ) {//:非生产环境 并 配置了提示表达式错误， 则提示
      warn(
        'Error when evaluating expression ' +
        '"' + this.expression + '": ' + e.toString(),
        this.vm
      )
    }
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value)
  }
  if (this.preProcess) {
    value = this.preProcess(value)
  }
  if (this.filters) {
    value = scope._applyFilters(value, null, this.filters, false)
  }
  if (this.postProcess) {
    value = this.postProcess(value)
  }
  this.afterGet()
  return value
}

/**
 * Set the corresponding value with the setter.
 *
 * @param {*} value
 */
//:调用watcher.setter() 设置对应绑定数据
Watcher.prototype.set = function (value) {
  var scope = this.scope || this.vm
  if (this.filters) {//:watcher.set() 时 ， 也会应用filters
    value = scope._applyFilters(
      value, this.value, this.filters, true)
  }
  try {
    this.setter.call(scope, scope, value)
  } catch (e) {
    if (
      process.env.NODE_ENV !== 'production' &&
      config.warnExpressionErrors
    ) {
      warn(
        'Error when evaluating setter ' +
        '"' + this.expression + '": ' + e.toString(),
        this.vm
      )
    }
  }
  // two-way sync for v-for alias
  var forContext = scope.$forContext
  if (forContext && forContext.alias === this.expression) {
    if (forContext.filters) {
      process.env.NODE_ENV !== 'production' && warn(
        'It seems you are using two-way binding on ' +
        'a v-for alias (' + this.expression + '), and the ' +
        'v-for has filters. This will not work properly. ' +
        'Either remove the filters or use an array of ' +
        'objects and bind to object properties instead.',
        this.vm
      )
      return
    }
    forContext._withLock(function () {
      if (scope.$key) { // original is an object
        forContext.rawValue[scope.$key] = value
      } else {
        forContext.rawValue.$set(scope.$index, value)
      }
    })
  }
}

/**
 * Prepare for dependency collection.
 */
//:依赖收集前的处理
Watcher.prototype.beforeGet = function () {
  Dep.target = this
}

/**
 * Add a dependency to this directive.
 *
 * @param {Dep} dep
 */
//:添加依赖
Watcher.prototype.addDep = function (dep) {
  var id = dep.id
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id)
    this.newDeps.push(dep)
    if (!this.depIds.has(id)) {
      dep.addSub(this)
    }
  }
}

/**
 * Clean up for dependency collection.
 */
//:依赖收集之后的清理
Watcher.prototype.afterGet = function () {
  Dep.target = null
  var i = this.deps.length
  while (i--) {//:遍历watcher.deps
    var dep = this.deps[i] 
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this)
    }
  }
  var tmp = this.depIds //:交换watcher.depIds<->watcher.newDeopIds 
  this.depIds = this.newDepIds
  this.newDepIds = tmp
  this.newDepIds.clear()
  tmp = this.deps //:交换watcher.deps<->watcher.newDeps
  this.deps = this.newDeps
  this.newDeps = tmp
  this.newDeps.length = 0
}

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 *
 * @param {Boolean} shallow
 */
//:当依赖变化时 调用watcher.update()
Watcher.prototype.update = function (shallow) {
  if (this.lazy) {//:若watcher.lazy 仅标记为dirty
    this.dirty = true
  } else if (this.sync || !config.async) {
    this.run()
  } else {
    // if queued, only overwrite shallow with non-shallow,
    // but not the other way around.
    this.shallow = this.queued
      ? shallow
        ? this.shallow
        : false
      : !!shallow
    this.queued = true
    // record before-push error stack in debug mode
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.debug) {
      this.prevError = new Error('[vue] async stack trace')
    }
    pushWatcher(this)
  }
}

/**
 * Batcher job interface.
 * Will be called by the batcher.
 */
//:调用watcher.get() 重新求值 根据需要执行回调
Watcher.prototype.run = function () {
  if (this.active) {
    var value = this.get() //:调用watcher.getter() 
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated; but only do so if this is a
      // non-shallow update (caused by a vm digest).
      ((isObject(value) || this.deep) && !this.shallow)
    ) {//:新旧值不等 or 非浅观察的前提下 求得的值为对象 或 watcher.deep
      // set new value
      var oldValue = this.value
      this.value = value
      // in debug + async mode, when a watcher callbacks
      // throws, we also throw the saved before-push error
      // so the full cross-tick stack trace is available.
      var prevError = this.prevError
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' &&
          config.debug && prevError) {
        this.prevError = null
        try {
          this.cb.call(this.vm, value, oldValue)
        } catch (e) {
          nextTick(function () {
            throw prevError
          }, 0)
          throw e
        }
      } else {
        this.cb.call(this.vm, value, oldValue)
      }
    }
    this.queued = this.shallow = false
  }
}

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
//:lazy watcher求值
Watcher.prototype.evaluate = function () {
  // avoid overwriting another watcher that is being
  // collected.
  var current = Dep.target
  this.value = this.get()
  this.dirty = false
  Dep.target = current
}

/**
 * Depend on all deps collected by this watcher.
 */
//:依赖收集?
Watcher.prototype.depend = function () {
  var i = this.deps.length
  while (i--) {//:遍历watcher.deps
    this.deps[i].depend()
  }
}

/**
 * Remove self from all dependencies' subcriber list.
 */
//:销毁watcher 相关依赖也一并移除
Watcher.prototype.teardown = function () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed or is performing a v-for
    // re-render (the watcher list is then filtered by v-for).
    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
      this.vm._watchers.$remove(this) //:从vm._watchers移除当前watcher
    }
    var i = this.deps.length
    while (i--) {
      this.deps[i].removeSub(this)
    }
    this.active = false
    this.vm = this.cb = this.value = null
  }
}

/**
 * Recrusively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 *
 * @param {*} val
 */
//:递归遍历对象 深度依赖收集
const seenObjects = new Set()
function traverse (val, seen) {
  let i, keys
  if (!seen) {
    seen = seenObjects
    seen.clear()
  }
  const isA = isArray(val)
  const isO = isObject(val)
  if (isA || isO) {//:值为数组或对象
    if (val.__ob__) {//:值为已观察数据对象
      var depId = val.__ob__.dep.id
      if (seen.has(depId)) {
        return
      } else {
        seen.add(depId)
      }
    }
    if (isA) {//:值为数组
      i = val.length
      while (i--) traverse(val[i], seen)
    } else if (isO) {//:值为对象
      keys = Object.keys(val)
      i = keys.length
      while (i--) traverse(val[keys[i]], seen)
    }
  }
}
