import Vue from '../instance/vue'
import config from '../config'
import {
  extend,
  set,
  isObject,
  isArray,
  isPlainObject,
  hasOwn,
  camelize,
  hyphenate
} from './lang'
import { warn } from './debug'
import { commonTagRE, reservedTagRE } from './component'

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 *
 * All strategy functions follow the same signature:
 *
 * @param {*} parentVal
 * @param {*} childVal
 * @param {Vue} [vm]
 */
 //:选项合并策略函数 决定 父组件和子组件的options如何合并
var strats = config.optionMergeStrategies = Object.create(null)

/**
 * Helper that recursively merges two data objects together.
 */
//:递归地合并两个对象 补增方式，同名非对象值的忽略
//: data:{a:100}, data:{a:200,b:'fine'} -> data: {a:100, b:'fine'}
function mergeData (to, from) {
  var key, toVal, fromVal
  for (key in from) {
    toVal = to[key]
    fromVal = from[key]
    if (!hasOwn(to, key)) {//:目标对象没有对应key 则添加响应属性
      set(to, key, fromVal)
    } else if (isObject(toVal) && isObject(fromVal)) {//:对应key在源对象和目标对象都存在 且值为对象 则递归调用
      mergeData(toVal, fromVal)
    }
  }
  return to
}

/**
 * Data
 */
//:options.data的合并策略
strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {//: Vue.extend(..) data非函数 告警
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      )
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      //:parent.options.data , child.options.data同时存在 合并函数调用的返回值
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
  //:有vm参数传入(即实例化), 且parent.options.data, child.options.data 只有1个
    return function mergedInstanceDataFn () {
      // instance merge   //: new MyCmp({data:..})
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

/**
 * El
 */
//: options.el的合并策略
strats.el = function (parentVal, childVal, vm) {
  if (!vm && childVal && typeof childVal !== 'function') {//非生产环境 Vue.extend(..) options.el非函数 则告警
    process.env.NODE_ENV !== 'production' && warn(
      'The "el" option should be a function ' +
      'that returns a per-instance value in component ' +
      'definitions.',
      vm
    )
    return
  }
  var ret = childVal || parentVal
  // invoke the element factory if this is instance merge
  return vm && typeof ret === 'function'
    ? ret.call(vm)
    : ret
}

/**
 * Hooks and param attributes are merged as arrays.
 */
//:声明周期钩子函数合并策略 变为函数数组,都执行
strats.init =
strats.created =
strats.ready =
strats.attached =
strats.detached =
strats.beforeCompile =
strats.compiled =
strats.beforeDestroy =
strats.destroyed =
strats.activate = function (parentVal, childVal) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
//:实例化时，实例传入的options和子类的options和父类的options 三方合并
//:vm.$options 的原型 指向构造函数的options
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null)
  //: {scmp1,scmp2, __proto__: parentCmps}
  return childVal
    ? extend(res, guardArrayAssets(childVal))
    : res
}
//:各种vue资源一样的合并策略 同名覆盖
config._assetTypes.forEach(function (type) {
  strats[type + 's'] = mergeAssets
})

/**
 * Events & Watchers.
 *
 * Events & watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
//:events watchers 一样的合并策略，合并为数组
//: events:{ev1:cb1}, events:{ev1:cb2} -> events:{ev1:[cb1,cb2]}
strats.watch =
strats.events = function (parentVal, childVal) {
  if (!childVal) return parentVal
  if (!parentVal) return childVal
  var ret = {}
  extend(ret, parentVal)
  for (var key in childVal) {
    var parent = ret[key]
    var child = childVal[key]
    if (parent && !isArray(parent)) {
      parent = [parent]
    }
    ret[key] = parent
      ? parent.concat(child)
      : [child]
  }
  return ret
}

/**
 * Other object hashes.
 */
//:props, methods, computed相同合并策略， 同名覆盖
//:props:{prop1:{default:1}}, props:{prop1:{default:2}} -> props:{prop1:{default:2}}
strats.props =
strats.methods =
strats.computed = function (parentVal, childVal) {
  if (!childVal) return parentVal
  if (!parentVal) return childVal
  var ret = Object.create(null)
  extend(ret, parentVal)
  extend(ret, childVal)
  return ret
}

/**
 * Default strategy.
 */
//:默认合并策略 只取其一 child优先
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
}

/**
 * Make sure component options get converted to actual
 * constructors.
 *
 * @param {Object} options
 */
//:遍历options.components 若为object 则执行Vue.extend(cmpOptions) 保证值为构造函数
function guardComponents (options) {
  if (options.components) {
    var components = options.components =
      guardArrayAssets(options.components)
    var ids = Object.keys(components) //:组件id数组
    var def
    if (process.env.NODE_ENV !== 'production') {
      var map = options._componentNameMap = {}
    }
    for (var i = 0, l = ids.length; i < l; i++) {
      var key = ids[i]
      if (commonTagRE.test(key) || reservedTagRE.test(key)) {//:原生tag 或 保留tag提示并跳过
        process.env.NODE_ENV !== 'production' && warn(
          'Do not use built-in or reserved HTML elements as component ' +
          'id: ' + key
        )
        continue
      }
      // record a all lowercase <-> kebab-case mapping for
      // possible custom element case error warning
      if (process.env.NODE_ENV !== 'production') {
        //:options._componentNameMap sometag: some-tag
        map[key.replace(/-/g, '').toLowerCase()] = hyphenate(key)
      }
      def = components[key]
      if (isPlainObject(def)) {
        components[key] = Vue.extend(def)
      }
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 *
 * @param {Object} options
 */
//:规范化props属性 确保每个prop的值都为对象
function guardProps (options) {
  var props = options.props
  var i, val
  if (isArray(props)) {
    options.props = {}
    i = props.length
    while (i--) {
      val = props[i]
      if (typeof val === 'string') {
        //: props: ['attr1', 'attr2'] -> props: { attr1: null, attr2:null}
        options.props[val] = null
      } else if (val.name) {
        //: props:[{name:'prop1', type:Array,..}] -> props:{prop1:{name:'prop1', type:..}} }
        options.props[val.name] = val
      }
    }
  } else if (isPlainObject(props)) {//:props:{prop1:{..}, prop2: fn}
    var keys = Object.keys(props)
    i = keys.length
    while (i--) {
      val = props[keys[i]]
      if (typeof val === 'function') {
        //:->props:{prop1:{..}, prop2: {type:fn}}
        props[keys[i]] = { type: val }
      }
    }
  }
}

/**
 * Guard an Array-format assets option and converted it
 * into the key-value Object format.
 *
 * @param {Object|Array} assets
 * @return {Object}
 */
//:数组形式的vue资源 转换为对象形式 components:[cmp1, cmp2] -> components:{n1:cmp1,n2:cmp2}
function guardArrayAssets (assets) {
  if (isArray(assets)) {
    var res = {}
    var i = assets.length
    var asset
    while (i--) {
      asset = assets[i]
      //:如 options:{components: [cmp1, cmp2]}
      //:cmp为函数则用cmp.options.name||cmp.id; 为对象则用cmp.name||cmp.id
      var id = typeof asset === 'function'
        ? ((asset.options && asset.options.name) || asset.id)
        : (asset.name || asset.id)
      if (!id) {
        process.env.NODE_ENV !== 'production' && warn(
          'Array-syntax assets must provide a "name" or "id" field.'
        )
      } else {
        res[id] = asset
      }
    }
    return res
  }
  return assets
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 *
 * @param {Object} parent
 * @param {Object} child
 * @param {Vue} [vm] - if vm is present, indicates this is
 *                     an instantiation merge.
 */
//:合并两个options 实例化和继承时用到的核心功能
export function mergeOptions (parent, child, vm) {
  guardComponents(child)
  guardProps(child)
  if (process.env.NODE_ENV !== 'production') {
    if (child.propsData && !vm) {//:有vm参数表示为 Cmp.extend(); propsData只能用在实例化时
      warn('propsData can only be used as an instantiation option.')
    }
  }
  var options = {}
  var key
  //:先处理childOptions.extends 再处理mixins
  if (child.extends) {
    //:childOptions有extends 且为函数，则认为时构造函数 合并该构造函数的options和父类的options; extends为对象 则作为options和父类的合并
    //:递归的mergeOptions
    parent = typeof child.extends === 'function'
      ? mergeOptions(parent, child.extends.options, vm)
      : mergeOptions(parent, child.extends, vm)
  }
  if (child.mixins) {//:childOptions的mixins数组 遍历并合并
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm)
    }
  }
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat //:选择合并策略
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 *
 * @param {Object} options
 * @param {String} type
 * @param {String} id
 * @param {Boolean} warnMissing
 * @return {Object|Function}
 */
//:解析vue资源, 子类实例需要访问继承链上的vue资源
export function resolveAsset (options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type]
  var camelizedId
  //:options.components.id  若id为:my-tab ->则尝试my-tab myTab, MyTab
  var res = assets[id] ||
    // camelCase ID
    assets[camelizedId = camelize(id)] ||
    // Pascal Case ID
    assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)]
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    )
  }
  return res
}
