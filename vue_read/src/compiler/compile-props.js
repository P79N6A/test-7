import config from '../config'
import { parseDirective } from '../parsers/directive'
import { isSimplePath } from '../parsers/expression'
import { defineReactive, withoutConversion } from '../observer/index'
import propDef from '../directives/internal/prop'
import {
  warn,
  camelize,
  hyphenate,
  getAttr,
  getBindAttr,
  isLiteral,
  toBoolean,
  toNumber,
  stripQuotes,
  isArray,
  isPlainObject,
  isObject,
  hasOwn
} from '../util/index'

const propBindingModes = config._propBindingModes // 单向 双向 一次
const empty = {}

// regexes 命名规则 keypath  obj.hi obj['hi']
const identRE = /^[$_a-zA-Z]+[\w$]*$/
const settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/ // a.b a['b']


/**
 * Compile props on a root element and return
 * a props link function.
 *
 * @param {Element|DocumentFragment} el
 * @param {Array} propOptions
 * @param {Vue} vm
 * @return {Function} propsLinkFn
 */
// 编译根元素上的prop，返回link函数
export function compileProps (el, propOptions, vm) {
  var props = []
  var names = Object.keys(propOptions) // {props: {a: {}, b:{}}}
  var i = names.length
  var options, name, attr, value, path, parsed, prop
  while (i--) {
    name = names[i]
    options = propOptions[name] || empty // {a: {type: String, default: 'hello'}}
    // propName 不能为$data
    if (process.env.NODE_ENV !== 'production' && name === '$data') {
      warn('Do not use $data as prop.', vm)
      continue
    }

    // props could contain dashes, which will be
    // interpreted as minus calculations by the parser
    // so we need to camelize the path here
    path = camelize(name) // propName 需为camelize风格, foo-bar会被理解为减法运算
    if (!identRE.test(path)) {// propName 非合法标识符，则提示
      process.env.NODE_ENV !== 'production' && warn(
        'Invalid prop key: "' + name + '". Prop keys ' +
        'must be valid identifiers.',
        vm
      )
      continue
    }

    prop = {
      name: name, //is-show   attr's name
      path: path, //isShow  obj's keypath
      options: options, //propName: options
      mode: propBindingModes.ONE_WAY,
      raw: null  // :is-show="so" so
    }

    attr = hyphenate(name) // isShow -> is-show
    // first check dynamic version
    if ((value = getBindAttr(el, attr)) === null) {
      if ((value = getBindAttr(el, attr + '.sync')) !== null) {
        prop.mode = propBindingModes.TWO_WAY // 双向绑定的动态属性 :is-show.sync="so"
      } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
        prop.mode = propBindingModes.ONE_TIME //单次绑定的动态属性 :is-show.once="so"
      }
    }
    if (value !== null) {// :is-show="so" 单向绑定的动态属性
      // has dynamic binding!
      prop.raw = value 
      parsed = parseDirective(value) //解析指令 {expression:.., filters:..}
      value = parsed.expression
      prop.filters = parsed.filters
      // check binding type
      if (isLiteral(value) && !parsed.filters) {
        // 指令的值为字面量且没有过滤器 无需设置属性绑定 如: :is-show="true"
        // for expressions containing literal numbers and
        // booleans, there's no need to setup a prop binding,
        // so we can optimize them as a one-time set.
        prop.optimizedLiteral = true // 指令的值是字面量时，会被优化
      } else {
        prop.dynamic = true
        // check non-settable path for two-way bindings
        if (process.env.NODE_ENV !== 'production' &&
            prop.mode === propBindingModes.TWO_WAY &&
            !settablePathRE.test(value)) {//双向绑定要求 指令值是可设置的 如: user.name, user['name'], user; 否则改为单向绑定并提示
          prop.mode = propBindingModes.ONE_WAY
          warn(
            'Cannot bind two-way prop with non-settable ' +
            'parent path: ' + value,
            vm
          )
        }
      }
      prop.parentPath = value // :is-show="so" -> isShow.parentPath == 'so'

      // warn required two-way
      if (
        process.env.NODE_ENV !== 'production' &&
        options.twoWay &&
        prop.mode !== propBindingModes.TWO_WAY
      ) {// 若prop定义了为双向绑定，但模板中无双向绑定语法 则提示 如: {show: {twoWay: true, type: Boolean}}   <cmp :show="so">..</cmp>  :show.sync="so"
        warn(
          'Prop "' + name + '" expects a two-way binding type.',
          vm
        )
      }
    } else if ((value = getAttr(el, attr)) !== null) {//普通静态属性 pos="top"
      // has literal binding!
      prop.raw = value
    } else if (process.env.NODE_ENV !== 'production') {//没有对应的动态或静态属性 则检测其他可能
      // check possible camelCase prop usage
      var lowerCaseName = path.toLowerCase()
      // propName : foo-bar, path: fooBar 则尝试全小写的属性是否有 foobar
      value = /[A-Z\-]/.test(name) && (
        el.getAttribute(lowerCaseName) ||
        el.getAttribute(':' + lowerCaseName) ||
        el.getAttribute('v-bind:' + lowerCaseName) ||
        el.getAttribute(':' + lowerCaseName + '.once') ||
        el.getAttribute('v-bind:' + lowerCaseName + '.once') ||
        el.getAttribute(':' + lowerCaseName + '.sync') ||
        el.getAttribute('v-bind:' + lowerCaseName + '.sync')
      )
      if (value) {
      //若有全小写对应的属性 则提示可能模板属性语法有误  
      //如: props:{fooBar:{..}} <cmp foobar="bad"></cmp> 则提示应该用 foo-bar="bad"
        warn(
          'Possible usage error for prop `' + lowerCaseName + '` - ' +
          'did you mean `' + attr + '`? HTML is case-insensitive, remember to use ' +
          'kebab-case for props in templates.',
          vm
        )
      } else if (options.required) {//若prop定义为必须 则提示缺少该属性
        // warn missing required
        warn('Missing required prop: ' + name, vm)
      }
    }
    // push prop
    props.push(prop)
  }
  return makePropsLinkFn(props)
}

/**
 * Build a function that applies props to a vm.
 *
 * @param {Array} props
 * @return {Function} propsLinkFn
 */
// 创建props的link函数 把props应用到vm
function makePropsLinkFn (props) {
  return function propsLinkFn (vm, scope) {
    // store resolved props info
    vm._props = {}
    var inlineProps = vm.$options.propsData
    var i = props.length
    var prop, path, options, value, raw
    while (i--) {// 遍历props数组 [{name:'isShow', mode:0, raw: 'so', path:'isShow'},..]
      prop = props[i]
      raw = prop.raw
      path = prop.path
      options = prop.options
      vm._props[path] = prop //props数组转为对象形式存在vm._props上
      if (inlineProps && hasOwn(inlineProps, path)) {// options.propData有对应的属性值
        initProp(vm, prop, inlineProps[path])
      } if (raw === null) {//组件定义了prop 但模板中组件实例无提供对应属性 
        // initialize absent prop
        initProp(vm, prop, undefined) // props:{foo:..} <cmp bar="barv"></cmp>
      } else if (prop.dynamic) {//若为动态属性
        // dynamic prop
        if (prop.mode === propBindingModes.ONE_TIME) {
          // one time binding
          value = (scope || vm._context || vm).$get(prop.parentPath)// :is-show="so" -> prop.parentPath == 'so' prop.path == 'isShow'
          initProp(vm, prop, value)
        } else {// 非单次绑定
          if (vm._context) {// 有vm._context表示非根实例
            // dynamic binding
            vm._bindDir({
              name: 'prop',
              def: propDef,
              prop: prop
            }, null, null, scope) // el, host, scope
          } else {
            // root instance
            initProp(vm, prop, vm.$get(prop.parentPath))
          }
        }
      } else if (prop.optimizedLiteral) {// 若属性值为字面量
        // optimized literal, cast it and just set once
        var stripped = stripQuotes(raw)
        value = stripped === raw
          ? toBoolean(toNumber(raw))
          : stripped
        initProp(vm, prop, value)
      } else {
        // string literal, but we need to cater for
        // Boolean props with no value, or with same
        // literal value (e.g. disabled="disabled")
        // see https://github.com/vuejs/vue-loader/issues/182
        value = (
          options.type === Boolean &&
          (raw === '' || raw === hyphenate(prop.name))
        ) ? true
          : raw  // <cmp disabled></cmp> <cmp disabled="disabled"></cmp> {disabled:Boolean} 
        initProp(vm, prop, value)
      }
    }
  }
}

/**
 * Process a prop with a rawValue, applying necessary coersions,
 * default values & assertions and call the given callback with
 * processed value.
 *
 * @param {Vue} vm
 * @param {Object} prop
 * @param {*} rawValue
 * @param {Function} fn
 */
// 处理prop的值
function processPropValue (vm, prop, rawValue, fn) {
  const isSimple = prop.dynamic && isSimplePath(prop.parentPath)
  let value = rawValue
  if (value === undefined) {//模板中无设置对应属性 则用默认值
    value = getPropDefaultValue(vm, prop)
  }
  value = coerceProp(prop, value) //检测值是否符合prop指定的数据类型 不符合等同无该属性
  const coerced = value !== rawValue
  if (!assertProp(prop, value, vm)) {
    value = undefined
  }
  if (isSimple && !coerced) {
    withoutConversion(() => {
      fn(value)
    })
  } else {
    fn(value)
  }
}

/**
 * Set a prop's initial value on a vm and its data object.
 *
 * @param {Vue} vm
 * @param {Object} prop
 * @param {*} value
 */
// 把prop应用到vm上，并设为响应式的属性
export function initProp (vm, prop, value) {
  processPropValue(vm, prop, value, value => {
    defineReactive(vm, prop.path, value)
  })
}

/**
 * Update a prop's value on a vm.
 *
 * @param {Vue} vm
 * @param {Object} prop
 * @param {*} value
 */
// 更新prop的值
export function updateProp (vm, prop, value) {
  processPropValue(vm, prop, value, value => {
    vm[prop.path] = value
  })
}

/**
 * Get the default value of a prop.
 *
 * @param {Vue} vm
 * @param {Object} prop
 * @return {*}
 */
// 获取prop的默认值
function getPropDefaultValue (vm, prop) {
  // no default, return undefined
  const options = prop.options
  if (!hasOwn(options, 'default')) {
    //prop没定义default，则布尔属性默认为false,其他类型属性默认为undefined
    // absent boolean value defaults to false
    return options.type === Boolean
      ? false
      : undefined
  }
  var def = options.default
  // warn against non-factory defaults for Object & Array
  if (isObject(def)) {//默认值如果是对象或数组 应用函数返回, 否则提示
    process.env.NODE_ENV !== 'production' && warn(
      'Invalid default value for prop "' + prop.name + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    )
  }
  //若prop类型不是函数，而默认值为函数，则真正的默认值为函数执行的结果
  // call factory function for non-Function types
  return typeof def === 'function' && options.type !== Function
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 *
 * @param {Object} prop
 * @param {*} value
 * @param {Vue} vm
 */
// 断言模板中组件实例提供的属性值是否合法
function assertProp (prop, value, vm) {
  if (
    !prop.options.required && ( // non-required
      prop.raw === null ||      // abscent
      value == null             // null or undefined
    )
  ) {// 非必须属性 组件实例无提供，合法
    return true
  }
  var options = prop.options
  var type = options.type
  var valid = !type // type: null -> valid == true
  var expectedTypes = []
  if (type) {
    if (!isArray(type)) {// isShow: {type: Boolean} , type -> [Boolean]
      type = [type]
    }
    for (var i = 0; i < type.length && !valid; i++) {// 若已能判断合法 则不会继续循环
      var assertedType = assertType(value, type[i]) //断言是否符合类型的值
      expectedTypes.push(assertedType.expectedType)
      valid = assertedType.valid
    }
  }
  if (!valid) {//属性值类型不符合 则提示
    if (process.env.NODE_ENV !== 'production') {
      warn(
        'Invalid prop: type check failed for prop "' + prop.name + '".' +
        ' Expected ' + expectedTypes.map(formatType).join(', ') +
        ', got ' + formatValue(value) + '.',
        vm
      )
    }
    return false
  }
  var validator = options.validator
  if (validator) {//类型符合外，还要检验属性值
    if (!validator(value)) {//校验不通过 则提示
      process.env.NODE_ENV !== 'production' && warn(
        'Invalid prop: custom validator check failed for prop "' + prop.name + '".',
        vm
      )
      return false
    }
  }
  return true
}

/**
 * Force parsing value with coerce option.
 *
 * @param {*} value
 * @param {Object} options
 * @return {*}
 */
// 强制转换属性值的类型
function coerceProp (prop, value) {
  var coerce = prop.options.coerce
  if (!coerce) {
    return value
  }
  // coerce is a function
  return coerce(value)
}

/**
 * Assert the type of a value
 *
 * @param {*} value
 * @param {Function} type
 * @return {Object}
 */
// 断言属性值是否符合指定数据类型
function assertType (value, type) {
  var valid
  var expectedType
  if (type === String) {
    expectedType = 'string'
    valid = typeof value === expectedType
  } else if (type === Number) {
    expectedType = 'number'
    valid = typeof value === expectedType
  } else if (type === Boolean) {
    expectedType = 'boolean'
    valid = typeof value === expectedType
  } else if (type === Function) {
    expectedType = 'function'
    valid = typeof value === expectedType
  } else if (type === Object) {
    expectedType = 'object'
    valid = isPlainObject(value)
  } else if (type === Array) {
    expectedType = 'array'
    valid = isArray(value)
  } else {
    valid = value instanceof type
  }
  return {
    valid,
    expectedType
  }
}

/**
 * Format type for output
 *
 * @param {String} type
 * @return {String}
 */
// 为输出的提示 格式化type
function formatType (type) {
  return type
    ? type.charAt(0).toUpperCase() + type.slice(1)
    : 'custom type'
}

/**
 * Format value
 *
 * @param {*} value
 * @return {String}
 */
// 获取属性值的数据类型
function formatValue (val) {
  return Object.prototype.toString.call(val).slice(8, -1)
}
