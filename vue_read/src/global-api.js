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

//::设置Vue命名空间下的 全局api, 如: Vue.set() , Vue.extend()

//:常用的工具函数释放到Vue命名空间下
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
   //:Vue和继承Vue的子类都关联一个options对象，在组件编译时即可获取该options( this.constructor.options 类的静态属性)
   //: this.constructor.options 可看做实例的默认选项
   //:类的静态属性Vue.options包含: 内置指令 内置元素指令 内置过滤器, replace: true
  Vue.options = {
    directives,
    elementDirectives,
    filters,
    transitions: {},
    components: {},
    partials: {},
    replace: true
  }

  /**
   * Expose useful internals
   */
   //:暴露有用的内部方法 Vue.set(), Vue.delete(), Vue.nextTick(), Vue.config,  Vue.util
   //:Vue.util下有很多实用的方法: 数据类型判断 数据类型转换 dom操作 客户端判断 事件监听
  Vue.util = util
  Vue.config = config
  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  /**
   * The following are exposed for advanced usage / plugins
   */
   //:暴露一些高级应用需要的一些插件方法
  Vue.compiler = compiler //:模板编译器 可用于动态编译
  Vue.FragmentFactory = FragmentFactory //:片段工厂
  Vue.internalDirectives = internalDirectives //:内部指令 class style prop component
  Vue.parsers = {//:内部的一些解释器
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
   //:每个组件类(包括Vue)都有cid属性 classId?
  Vue.cid = 0
  var cid = 1

  /**
   * Class inheritance
   *
   * @param {Object} extendOptions
   */
   //:派生子组件类
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {}
    var Super = this
    var isFirstExtend = Super.cid === 0 //子类派生自Vue
    if (isFirstExtend && extendOptions._Ctor) {
      return extendOptions._Ctor //:扩展选项保存生成的构造函数 extendOptions._Ctor Vue.extend(sameOptions)时 直接返回上次的构造函数
    }
    var name = extendOptions.name || Super.options.name //组件名 无指定则用父组件名
    if (process.env.NODE_ENV !== 'production') {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characaters and the hyphen.'
        )
        name = null
      }
    }
    var Sub = createClass(name || 'VueComponent') //:以options.name作为构造函数名
    Sub.prototype = Object.create(Super.prototype) //:子类的原型对象的原型指向父类的原型对象
    Sub.prototype.constructor = Sub
    Sub.cid = cid++ //表示第几次派生的类
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    )
    Sub['super'] = Super //保存对父类的引用
    // allow further extension
    Sub.extend = Super.extend //:Vue.extend直接赋值给Sub.extend 子类可再派生子类
    // create asset registers, so extended classes
    // can have their private assets too.
    config._assetTypes.forEach(function (type) {
      Sub[type] = Super[type] //:注册vue资源的方法(Vue.directive(..), Vue.component(..), ..) 同样释放到子类 从而子类可注册自身的私有资源
    })
    // enable recursive self-lookup
    if (name) {//:若options.name有指定 则子组件类中注册自身(即在子组件的模板中可调用自己)
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

  function createClass (name) {
    /* eslint-disable no-new-func */
    return new Function(
      'return function ' + classify(name) +
      ' (options) { this._init(options) }' //:返回子类的构造函数 调用原型链上的_init方法
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
    if (plugin.installed) {//:plugin为函数或对象 installed标记防止重复install
      return
    }
    // additional parameters
    var args = toArray(arguments, 1)
    args.unshift(this) //:Vue.use(plugin,...)的参数列表 替换参数1为Vue后传给plugin/plugin.install方法
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else {
      plugin.apply(null, args)
    }
    plugin.installed = true
    return this //:返回Vue 可以链式调用方法
  }

  /**
   * Apply a global mixin by merging it into the default
   * options.
   */

  Vue.mixin = function (mixin) {//:mixin的选项被混合进Vue.options
    Vue.options = mergeOptions(Vue.options, mixin)
  }

  /**
   * Create asset registration methods with the following
   * signature:
   *
   * @param {String} id
   * @param {*} definition
   */
   //:创建各种资源的注册方法 Vue.component(...)
  config._assetTypes.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {//:没传入definition 则为获取资源, 资源保存在构造函数的options上
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {//:非生产环境 使用原生html标签或保留标签则告警
          if (
            type === 'component' &&
            (commonTagRE.test(id) || reservedTagRE.test(id))
          ) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            )
          }
        }
        if (
          type === 'component' &&
          isPlainObject(definition)
        ) {//:若注册时传入的definition是对象 不是构造函数，则用注册的id作为组件的name
          definition.name = id
          definition = Vue.extend(definition) //:自动调用Vue.extend(...) 返回构造函数
        }
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })

  // expose internal transition API
  extend(Vue.transition, transition)
}
