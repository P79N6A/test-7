import { warn } from './debug'
import { resolveAsset } from './options'
import { getBindAttr } from './dom'
//:原生html标签 vue的保留标签
export const commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i
export const reservedTagRE = /^(slot|partial|component)$/i

let isUnknownElement
if (process.env.NODE_ENV !== 'production') {
  isUnknownElement = function (el, tag) {
    if (tag.indexOf('-') > -1) {//: some-tag
      // http://stackoverflow.com/a/28210364/1070244
      return (
        el.constructor === window.HTMLUnknownElement ||
        el.constructor === window.HTMLElement
      )
    } else {//:sometag
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
//:检测dom元素是否组件
export function checkComponentAttr (el, options) {
  var tag = el.tagName.toLowerCase()
  var hasAttrs = el.hasAttributes() //:dom元素是否有属性节点
  if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
    if (resolveAsset(options, 'components', tag)) {
      return { id: tag }
    } else {
      var is = hasAttrs && getIsBinding(el, options) //: <div is="cmp">..</div>
      if (is) {
        return is
      } else if (process.env.NODE_ENV !== 'production') {
        var expectedTag =
          options._componentNameMap &&
          options._componentNameMap[tag]
        if (expectedTag) {//:非生产环境 提示有自定义的tag 但又不是注册的组件
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
  } else if (hasAttrs) {//:原生tag  或 vue保留tag 则检测是否带is
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

function getIsBinding (el, options) {
  // dynamic syntax
  var exp = el.getAttribute('is')
  if (exp != null) {
    if (resolveAsset(options, 'components', exp)) {//:resolveAsset 解析vue资源
      el.removeAttribute('is')
      return { id: exp }
    }
  } else {// 动态组件  :is="cmpName" or b-bind:is="cmpName"
    exp = getBindAttr(el, 'is')
    if (exp != null) {
      return { id: exp, dynamic: true }
    }
  }
}
