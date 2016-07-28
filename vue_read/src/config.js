import { compileRegex } from './parsers/text'

//::Vue框架的配置项

//:定界符
let delimiters = ['{{', '}}']
let unsafeDelimiters = ['{{{', '}}}']
  
const config = {

  /**
   * Whether to print debug messages.
   * Also enables stack trace for warnings.
   *
   * @type {Boolean}
   */
   //:开启则会打印调试信息和warning时的调用栈
  debug: false,

  /**
   * Whether to suppress warnings.
   *
   * @type {Boolean}
   */
  //:是否打印warning信息
  silent: false,

  /**
   * Whether to use async rendering.
   */
   //:是否批量异步渲染DOM
  async: true,

  /**
   * Whether to warn against errors caught when evaluating
   * expressions.
   */
   //表达式求值出错, 是否warning提示
  warnExpressionErrors: true,

  /**
   * Whether to allow devtools inspection.
   * Disabled by default in production builds.
   */
   //:是否允许devtools检查viewmodel, 生产环境默认禁止
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Internal flag to indicate the delimiters have been
   * changed.
   *
   * @type {Boolean}
   */
   //:标记delimiters是否重新设置
  _delimitersChanged: true,

  /**
   * List of asset types that a component can own.
   *
   * @type {Array}
   */
   //:组件可拥有的资源类型: 子组件 指令 元素指令 过滤器 过度 片段
  _assetTypes: [
    'component',
    'directive',
    'elementDirective',
    'filter',
    'transition',
    'partial'
  ],

  /**
   * prop binding modes
   */
   //:组件属性的绑定模式: 单向绑定 双向绑定 单次绑定
  _propBindingModes: {
    ONE_WAY: 0,
    TWO_WAY: 1,
    ONE_TIME: 2
  },

  /**
   * Max circular updates allowed in a batcher flush cycle.
   */
   //:最大更新次数
  _maxUpdateCount: 100,

  /**
   * Interpolation delimiters. Changing these would trigger
   * the text parser to re-compile the regular expressions.
   *
   * @type {Array<String>}
   */
   //:delimiters设置为getter setter属性
  get delimiters () {
    return delimiters
  },

  set delimiters (val) {
    delimiters = val
    compileRegex()
  },

  get unsafeDelimiters () {
    return unsafeDelimiters
  },

  set unsafeDelimiters (val) {
    unsafeDelimiters = val
    compileRegex() //:修改delimiters 则更新正则 tagRE htmlRE
  }
}

export default config
