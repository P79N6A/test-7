import {
  extend,
  bind,
  on,
  off,
  getAttr,
  getBindAttr,
  camelize,
  hyphenate,
  nextTick,
  warn
} from './util/index'
import Watcher from './watcher'
import { parseExpression, isSimplePath } from './parsers/expression'
//:空操作函数
function noop () {}

//:指令关联所在的dom元素和表达式的值，注册表达式的观察器 当表达式值改变则调用指令的update方法
/**
 * A directive links a DOM element with a piece of data,
 * which is the result of evaluating an expression.
 * It registers a watcher with the expression and calls
 * the DOM update function when a change is triggered.
 *
 * @param {Object} descriptor
 *                 - {String} name
 *                 - {Object} def
 *                 - {String} expression
 *                 - {Array<Object>} [filters]
 *                 - {Object} [modifiers]
 *                 - {Boolean} literal
 *                 - {String} attr
 *                 - {String} arg
 *                 - {String} raw
 *                 - {String} [ref]
 *                 - {Array<Object>} [interp]
 *                 - {Boolean} [hasOneTime]
 * @param {Vue} vm
 * @param {Node} el
 * @param {Vue} [host] - transclusion host component
 * @param {Object} [scope] - v-for scope
 * @param {Fragment} [frag] - owner fragment
 * @constructor
 */

export default function Directive (descriptor, vm, el, host, scope, frag) {
  this.vm = vm
  this.el = el
  // copy descriptor properties
  this.descriptor = descriptor
  this.name = descriptor.name //:descriptor的部分属性(name, expression, arg, modifiers, filters)释放到指令对象上
  this.expression = descriptor.expression
  this.arg = descriptor.arg
  this.modifiers = descriptor.modifiers
  this.filters = descriptor.filters
  this.literal = this.modifiers && this.modifiers.literal
  // private //:私有属性
  this._locked = false
  this._bound = false
  this._listeners = null
  // link context //:指令的链接上下文
  this._host = host
  this._scope = scope
  this._frag = frag
  // store directives on node in dev mode
  if (process.env.NODE_ENV !== 'production' && this.el) {
    this.el._vue_directives = this.el._vue_directives || []
    this.el._vue_directives.push(this) //:若为开发环境则指令对象保存到dom对象上(this.el._vue_directives)
  }
}

/**
 * Initialize the directive, mixin definition properties,
 * setup the watcher, call definition bind() and update()
 * if present.
 */
//:初始化指令 混合选项 设置watcher 调用bind和update函数
Directive.prototype._bind = function () {
  var name = this.name
  var descriptor = this.descriptor

  // remove attribute
  if (
    (name !== 'cloak' || this.vm._isCompiled) &&
    this.el && this.el.removeAttribute
  ) {
    var attr = descriptor.attr || ('v-' + name)
    this.el.removeAttribute(attr) //:删除指令属性节点 如 v-test="hello"
  }

  // copy def properties
  var def = descriptor.def
  if (typeof def === 'function') {
    this.update = def //:默认选项为函数 则作为update参数
  } else {
    extend(this, def) //:默认选项为对象 则扩展到指令对象上 {bind:..., update:..}
  }

  // setup directive params
  this._setupParams()

  // initial bind
  if (this.bind) {
    this.bind() //:有bind钩子函数则调用 无参数传入
  }
  this._bound = true //:标记指令已绑定

  if (this.literal) {
    this.update && this.update(descriptor.raw) //:若指令标明绑定字面量则 descriptor.raw 传入update
  } else if (
    (this.expression || this.modifiers) &&
    (this.update || this.twoWay) &&
    !this._checkStatement()
  ) {
    // wrapped updater for context
    var dir = this
    if (this.update) {
      this._update = function (val, oldVal) {//:包装this.update为this._update
        if (!dir._locked) {
          dir.update(val, oldVal)
        }
      }
    } else {
      this._update = noop
    }
    var preProcess = this._preProcess
      ? bind(this._preProcess, this)
      : null
    var postProcess = this._postProcess
      ? bind(this._postProcess, this)
      : null
    var watcher = this._watcher = new Watcher(//:指令对象_watcher保存对应的数据观察
      this.vm,
      this.expression,
      this._update, // callback
      {
        filters: this.filters,
        twoWay: this.twoWay,
        deep: this.deep,
        preProcess: preProcess,
        postProcess: postProcess,
        scope: this._scope
      }
    )
    // v-model with inital inline value need to sync back to
    // model instead of update to DOM on init. They would
    // set the afterBind hook to indicate that.
    if (this.afterBind) {//:有afterBind钩子 则调用
      this.afterBind()
    } else if (this.update) {
      this.update(watcher.value) //:update钩子被调用时，默认传入value
    }
  }
}

/**
 * Setup all param attributes, e.g. track-by,
 * transition-mode, etc...
 */
// 设置参数属性 如 track-by="name"
Directive.prototype._setupParams = function () {
  if (!this.params) {
    return
  }
  var params = this.params
  // swap the params array with a fresh object.
  this.params = Object.create(null)
  var i = params.length
  var key, val, mappedKey
  while (i--) {
    key = hyphenate(params[i])
    mappedKey = camelize(key)
    val = getBindAttr(this.el, key)
    if (val != null) {
      // dynamic
      this._setupParamWatcher(mappedKey, val)
    } else {
      // static
      val = getAttr(this.el, key)
      if (val != null) {
        this.params[mappedKey] = val === '' ? true : val
      }
    }
  }
}

/**
 * Setup a watcher for a dynamic param.
 *
 * @param {String} key
 * @param {String} expression
 */
//:为动态参数设置watcher
Directive.prototype._setupParamWatcher = function (key, expression) {
  var self = this
  var called = false
  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
    self.params[key] = val
    // since we are in immediate mode,
    // only call the param change callbacks if this is not the first update.
    if (called) {
      var cb = self.paramWatchers && self.paramWatchers[key]
      if (cb) {
        cb.call(self, val, oldVal)
      }
    } else {
      called = true
    }
  }, {
    immediate: true,
    user: false
  })
  ;(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch)
}

/**
 * Check if the directive is a function caller
 * and if the expression is a callable one. If both true,
 * we wrap up the expression and use it as the event
 * handler.
 *
 * e.g. on-click="a++"
 *
 * @return {Boolean}
 */
//:检测指令的表达式是否函数调用，是则用函数包装它 包装后的函数作为event handler
Directive.prototype._checkStatement = function () {
  var expression = this.expression
  //:指令设置了acceptStatement 且表达式为statement
  if (
    expression && this.acceptStatement &&
    !isSimplePath(expression)
  ) {
    var fn = parseExpression(expression).get //:表达式包装为函数
    var scope = this._scope || this.vm
    var handler = function (e) {//:再次包装
      scope.$event = e
      fn.call(scope, scope)
      scope.$event = null
    }
    if (this.filters) {//:若有filters
      handler = scope._applyFilters(handler, null, this.filters)
    }
    this.update(handler) //传入update函数的默认参数不是value, 是包装后的函数
    return true
  }
}

/**
 * Set the corresponding value with the setter.
 * This should only be used in two-way directives
 * e.g. v-model.
 *
 * @param {*} value
 * @public
 */
//:双向绑定指令 this.set(..) 设置对应的绑定数据
Directive.prototype.set = function (value) {
  /* istanbul ignore else */
  if (this.twoWay) {
    this._withLock(function () {
      this._watcher.set(value)
    })
  } else if (process.env.NODE_ENV !== 'production') {//:非生产环境 则提示 this.set() 使用有误
    warn(
      'Directive.set() can only be used inside twoWay' +
      'directives.'
    )
  }
}

/**
 * Execute a function while preventing that function from
 * triggering updates on this directive instance.
 *
 * @param {Function} fn
 */
//:让被执行的函数不会触发当前指令对象的update
Directive.prototype._withLock = function (fn) {
  var self = this
  self._locked = true
  fn.call(self)
  nextTick(function () {
    self._locked = false
  })
}

/**
 * Convenience method that attaches a DOM event listener
 * to the directive element and autometically tears it down
 * during unbind.
 *
 * @param {String} event
 * @param {Function} handler
 * @param {Boolean} [useCapture]
 */
//:绑定dom事件的便捷方法 所绑定事件会跟随指令一起销毁
Directive.prototype.on = function (event, handler, useCapture) {
  on(this.el, event, handler, useCapture)
  ;(this._listeners || (this._listeners = []))
    .push([event, handler]) //:指令对象._listeners保存相关事件监听
}

/**
 * Teardown the watcher and call unbind.
 */
//:销毁指令 删除watcher并调用unbind
Directive.prototype._teardown = function () {
  if (this._bound) {//:_bound 指令是否绑定的标记
    this._bound = false
    if (this.unbind) {
      this.unbind()
    }
    if (this._watcher) {//:销毁watcher
      this._watcher.teardown()
    }
    var listeners = this._listeners
    var i
    if (listeners) {
      i = listeners.length
      while (i--) {//:遍历_listeners, 解除事件绑定
        off(this.el, listeners[i][0], listeners[i][1])
      }
    }
    var unwatchFns = this._paramUnwatchFns
    if (unwatchFns) {
      i = unwatchFns.length
      while (i--) {//:销毁参数属性的watchers
        unwatchFns[i]()
      }
    }
    if (process.env.NODE_ENV !== 'production' && this.el) {
      this.el._vue_directives.$remove(this) //:非生产环境 移除dom元素上保存的指令对象
    }
    this.vm = this.el = this._watcher = this._listeners = null
  }
}
