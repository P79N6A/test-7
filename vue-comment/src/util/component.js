import { warn } from './debug'
import { resolveAsset } from './options'
import { getBindAttr } from './dom'

export const commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i
export const reservedTagRE = /^(slot|partial|component)$/i

let isUnknownElement
if (process.env.NODE_ENV !== 'production') {//非生产环境 则监测isUnknownElement
  isUnknownElement = function (el, tag) {
    if (tag.indexOf('-') > -1) {//标签名包含-, 如 your-tag
      // http://stackoverflow.com/a/28210364/1070244
      return (
        el.constructor === window.HTMLUnknownElement ||
        el.constructor === window.HTMLElement
      )
    } else {
      return (
        /HTMLUnknownElement/.test(el.toString()) &&
        // Chrome returns unknown for several HTML5 elements.
        // https://code.google.com/p/chromium/issues/detail?id=540526
        !/^(data|time|rtc|rb)$/.test(tag)
      )
    }
  }
}

/**
 * Check if an element is a component, if yes return its
 * component id.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Object|undefined}
 */

export function checkComponentAttr (el, options) {
  var tag = el.tagName.toLowerCase()
  var hasAttrs = el.hasAttributes()
  if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
    if (resolveAsset(options, 'components', tag)) {//tag是否在已注册的组件中
      return { id: tag }
    } else {//
      var is = hasAttrs && getIsBinding(el, options)
      if (is) {//是通过is指定的组件
        return is
      } else if (process.env.NODE_ENV !== 'production') {//非组件 并且 开发环境
        var expectedTag =
          options._componentNameMap &&
          options._componentNameMap[tag]
        if (expectedTag) {
          warn(
            'Unknown custom element: <' + tag + '> - ' +
            'did you mean <' + expectedTag + '>? ' +
            'HTML is case-insensitive, remember to use kebab-case in templates.'
          )
        } else if (isUnknownElement(el, tag)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.'
          )
        }
      }
    }
  } else if (hasAttrs) {//原生标签或保留标签 则检查is属性
    return getIsBinding(el, options)
  }
}

/**
 * Get "is" binding from an element.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Object|undefined}
 */

  function getIsBinding (el, options) {// <tag is="cmp">..</tag>  or <tag :is="cmp">..</tag>
  // dynamic syntax
  var exp = el.getAttribute('is')
  if (exp != null) {
    if (resolveAsset(options, 'components', exp)) {
      el.removeAttribute('is')
      return { id: exp }
    }
  } else {
    exp = getBindAttr(el, 'is')
    if (exp != null) {
      return { id: exp, dynamic: true }
    }
  }
}
