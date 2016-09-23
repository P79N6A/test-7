import config from './config'
import directives from './directives/public/index'
import elementDirectives from './directives/element/index'
import filters from './filters/index'
import * as util from './util/index'
import * as compiler from './compiler/index'
import * as path from './parsers/path'
import * as text from './parsers/text'
import * as template from './parsers/template'
import * as directive from './parsers/directive'
import * as expression from './parsers/expression'
import * as transition from './transition/index'
import FragmentFactory from './fragment/factory'
import internalDirectives from './directives/internal/index'

import {
  set,
  del,
  nextTick,
  mergeOptions,
  classify,
  toArray,
  commonTagRE,
  reservedTagRE,
  warn,
  isPlainObject,
  extend
} from './util/index'

export default function (Vue) {
  /**
   * Vue and every constructor that extends Vue has an
   * associated options object, which can be accessed during
   * compilation steps as `this.constructor.options`.
   *
   * These can be seen as the default options of every
   * Vue instance.
   */
   //组件类都有一个关联的options(Vue.options, MyCmp.options), 该options可认为是组件实例的默认options
  Vue.options = {
    directives, //内置指令 v-on v-bind
    elementDirectives, //内置元素指令 router-view
    filters, //内置过滤器 orderBy filterBy
    transitions: {},
    components: {},
    partials: {},
    replace: true
  }

  /**
   * Expose useful internals
   */
   //有用的方法 暴露到Vue命名空间下
  Vue.util = util
  Vue.config = config
  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  /**
   * The following are exposed for advanced usage / plugins
   */
  // 暴露高级用法和插件需要的api
  Vue.compiler = compiler
  Vue.FragmentFactory = FragmentFactory
  Vue.internalDirectives = internalDirectives //内部指令 class style component transition
  Vue.parsers = {
    path,
    text,
    template,
    directive,
    expression
  }

  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
   //构造函数id
  Vue.cid = 0
  var cid = 1

  /**
   * Class inheritance
   *
   * @param {Object} extendOptions
   */

  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {}
    var Super = this
    var isFirstExtend = Super.cid === 0
    if (isFirstExtend && extendOptions._Ctor) {
      return extendOptions._Ctor
    }
    var name = extendOptions.name || Super.options.name //组件类的名称
    if (process.env.NODE_ENV !== 'production') {//非生产环境 则检测name
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characaters and the hyphen.'
        )
        name = null
      }
    }
    var Sub = createClass(name || 'VueComponent')
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.cid = cid++
    Sub.options = mergeOptions(//扩展options 
      Super.options,
      extendOptions
    )
    Sub['super'] = Super
    // allow further extension
    Sub.extend = Super.extend
    // create asset registers, so extended classes
    // can have their private assets too.
    config._assetTypes.forEach(function (type) {
      Sub[type] = Super[type] //MyCmp.directive(..) 子组件类可以注册自身的资源
    })
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub
    }
    // cache constructor
    if (isFirstExtend) {
      extendOptions._Ctor = Sub
    }
    return Sub
  }

  /**
   * A function that returns a sub-class constructor with the
   * given name. This gives us much nicer output when
   * logging instances in the console.
   *
   * @param {String} name
   * @return {Function}
   */

  function createClass (name) {//返回构造函数
    /* eslint-disable no-new-func */
    return new Function(
      'return function ' + classify(name) +
      ' (options) { this._init(options) }'
    )()
    /* eslint-enable no-new-func */
  }

  /**
   * Plugin system
   *
   * @param {Object} plugin
   */

  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {//instanlled标识
      return
    }
    // additional parameters
    var args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args) //传入Vue 和参数列表  , Vue.use(myPlugin, a,b,c), myPlugin.install(Vue,a,b,c)
    } else {
      plugin.apply(null, args)
    }
    plugin.installed = true
    return this
  }

  /**
   * Apply a global mixin by merging it into the default
   * options.
   */

  Vue.mixin = function (mixin) {//全局mixin， 其实是merge到 Vue.options
    Vue.options = mergeOptions(Vue.options, mixin)
  }

  /**
   * Create asset registration methods with the following
   * signature:
   *
   * @param {String} id
   * @param {*} definition
   */

  config._assetTypes.forEach(function (type) {//创建资源注册方法 Vue.directive(..) Vue.component(..)
    Vue[type] = function (id, definition) {
      if (!definition) {//没有definition 则获取已注册资源
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          if (
            type === 'component' &&
            (commonTagRE.test(id) || reservedTagRE.test(id))
          ) {//当注册与html标签同名的component时，告警
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            )
          }
        }
        if (
          type === 'component' &&
          isPlainObject(definition)
        ) {//若注册component, 但传入的definition不是构造函数
          definition.name = id //全局注册的话 id自动设置为name
          definition = Vue.extend(definition)
        }
        this.options[type + 's'][id] = definition //注册 只是把构造函数存入对应的key  Vue.options.components, Vue.options.directives..
        return definition  //返回构造函数
      }
    }
  })

  // expose internal transition API
  extend(Vue.transition, transition)
}
