import config from '../config'
import { isIE9 } from './env'
import { warn } from './debug'
import { camelize } from './lang'
import { removeWithTransition } from '../transition/index'

/**
 * Query an element selector if it's not an element already.
 *
 * @param {String|Element} el
 * @return {Element}
 */
//根据selector  查询dom元素
export function query (el) {
  if (typeof el === 'string') {
    var selector = el
    el = document.querySelector(el)
    if (!el) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + selector
      )
    }
  }
  return el
}

/**
 * Check if a node is in the document.
 * Note: document.documentElement.contains should work here
 * but always returns false for comment nodes in phantomjs,
 * making unit tests difficult. This is fixed by doing the
 * contains() check on the node's parentNode instead of
 * the node itself.
 *
 * @param {Node} node
 * @return {Boolean}
 */
// 判断元素是否在document中
export function inDoc (node) {
  if (!node) return false
  var doc = node.ownerDocument.documentElement //节点所在文档的'html元素'
  var parent = node.parentNode
  return doc === node ||
    doc === parent ||
    !!(parent && parent.nodeType === 1 && (doc.contains(parent)))
}

/**
 * Get and remove an attribute from a node.
 *
 * @param {Node} node
 * @param {String} _attr
 */
// 获取并删除属性节点
export function getAttr (node, _attr) {
  var val = node.getAttribute(_attr)
  if (val !== null) {
    node.removeAttribute(_attr)
  }
  return val
}

/**
 * Get an attribute with colon or v-bind: prefix.
 *
 * @param {Node} node
 * @param {String} name
 * @return {String|null}
 */
// 获取动态绑定的属性 v-bind:msg="mymsg" 并删除
export function getBindAttr (node, name) {
  var val = getAttr(node, ':' + name) //先后尝试获取 :msg, v-bind:msg
  if (val === null) {
    val = getAttr(node, 'v-bind:' + name)
  }
  return val
}

/**
 * Check the presence of a bind attribute.
 *
 * @param {Node} node
 * @param {String} name
 * @return {Boolean}
 */
// 检测是否存在动态绑定的属性 msg, :msg, v-bind:msg
export function hasBindAttr (node, name) {
  return node.hasAttribute(name) ||
    node.hasAttribute(':' + name) ||
    node.hasAttribute('v-bind:' + name)
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */
//节点移动 insertBefore
export function before (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Insert el after target
 *
 * @param {Element} el
 * @param {Element} target
 */
//节点移动 after
export function after (el, target) {
  if (target.nextSibling) {//target存在下个兄弟节点 则before兄弟节点
    before(el, target.nextSibling)
  } else {//target为末节点 则appendChild
    target.parentNode.appendChild(el)
  }
}

/**
 * Remove el from DOM
 *
 * @param {Element} el
 */
//删除节点
export function remove (el) {
  el.parentNode.removeChild(el)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */
//内部前置节点
export function prepend (el, target) {
  if (target.firstChild) {//target.firstChild之前
    before(el, target.firstChild)
  } else {//空节点 直接appendChild
    target.appendChild(el)
  }
}

/**
 * Replace target with el
 *
 * @param {Element} target
 * @param {Element} el
 */
// 替换节点 replaceChild
export function replace (target, el) {
  var parent = target.parentNode
  if (parent) {
    parent.replaceChild(el, target)
  }
}

/**
 * Add event listener shorthand.
 *
 * @param {Element} el
 * @param {String} event
 * @param {Function} cb
 * @param {Boolean} [useCapture]
 */
// on 监听事件
export function on (el, event, cb, useCapture) {
  el.addEventListener(event, cb, useCapture)
}

/**
 * Remove event listener shorthand.
 *
 * @param {Element} el
 * @param {String} event
 * @param {Function} cb
 */
// off 取消监听
export function off (el, event, cb) {
  el.removeEventListener(event, cb)
}

/**
 * For IE9 compat: when both class and :class are present
 * getAttribute('class') returns wrong value...
 *
 * @param {Element} el
 * @return {String}
 */
// 获取className
function getClass (el) {
  var classname = el.className
  if (typeof classname === 'object') {
    classname = classname.baseVal || ''
  }
  return classname
}

/**
 * In IE9, setAttribute('class') will result in empty class
 * if the element also has the :class attribute; However in
 * PhantomJS, setting `className` does not work on SVG elements...
 * So we have to do a conditional check here.
 *
 * @param {Element} el
 * @param {String} cls
 */

export function setClass (el, cls) {
  /* istanbul ignore if */
  if (isIE9 && !/svg$/.test(el.namespaceURI)) {
    el.className = cls
  } else {
    el.setAttribute('class', cls)
  }
}

/**
 * Add class with compatibility for IE & SVG
 *
 * @param {Element} el
 * @param {String} cls
 */

export function addClass (el, cls) {
  if (el.classList) {
    el.classList.add(cls)
  } else {
    var cur = ' ' + getClass(el) + ' '
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      setClass(el, (cur + cls).trim())
    }
  }
}

/**
 * Remove class with compatibility for IE & SVG
 *
 * @param {Element} el
 * @param {String} cls
 */

export function removeClass (el, cls) {
  if (el.classList) {
    el.classList.remove(cls)
  } else {
    var cur = ' ' + getClass(el) + ' '
    var tar = ' ' + cls + ' '
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ')
    }
    setClass(el, cur.trim())
  }
  if (!el.className) {
    el.removeAttribute('class')
  }
}

/**
 * Extract raw content inside an element into a temporary
 * container div
 *
 * @param {Element} el
 * @param {Boolean} asFragment
 * @return {Element|DocumentFragment}
 */

export function extractContent (el, asFragment) {
  var child
  var rawContent
  /* istanbul ignore if */
  if (isTemplate(el) && isFragment(el.content)) {
    el = el.content
  }
  if (el.hasChildNodes()) {
    trimNode(el)
    rawContent = asFragment
      ? document.createDocumentFragment()
      : document.createElement('div')
    /* eslint-disable no-cond-assign */
    while (child = el.firstChild) {//el的子节点 转存到div or fragment中
    /* eslint-enable no-cond-assign */
      rawContent.appendChild(child)
    }
  }
  return rawContent
}

/**
 * Trim possible empty head/tail text and comment
 * nodes inside a parent.
 *
 * @param {Node} node
 */
//删掉空的文本节点或注释节点
export function trimNode (node) {
  var child
  /* eslint-disable no-sequences */
  while (child = node.firstChild, isTrimmable(child)) {
    node.removeChild(child)
  }
  while (child = node.lastChild, isTrimmable(child)) {
    node.removeChild(child)
  }
  /* eslint-enable no-sequences */
}

function isTrimmable (node) {//空的文本节点 或 注释节点 trimmable
  return node && (
    (node.nodeType === 3 && !node.data.trim()) ||
    node.nodeType === 8
  )
}

/**
 * Check if an element is a template tag.
 * Note if the template appears inside an SVG its tagName
 * will be in lowercase.
 *
 * @param {Element} el
 */
// 是否<template>标签
export function isTemplate (el) {
  return el.tagName &&
    el.tagName.toLowerCase() === 'template'
}

/**
 * Create an "anchor" for performing dom insertion/removals.
 * This is used in a number of scenarios:
 * - fragment instance
 * - v-html
 * - v-if
 * - v-for
 * - component
 *
 * @param {String} content
 * @param {Boolean} persist - IE trashes empty textNodes on
 *                            cloneNode(true), so in certain
 *                            cases the anchor needs to be
 *                            non-empty to be persisted in
 *                            templates.
 * @return {Comment|Text}
 */
// 创建注释节点 作为锚点
export function createAnchor (content, persist) {
  var anchor = config.debug
    ? document.createComment(content)
    : document.createTextNode(persist ? ' ' : '')
  anchor.__v_anchor = true
  return anchor
}

/**
 * Find a component ref attribute that starts with $.
 *
 * @param {Element} node
 * @return {String|undefined}
 */
// 查找 v-ref:table 子组件索引指令
var refRE = /^v-ref:/
export function findRef (node) {
  if (node.hasAttributes()) {
    var attrs = node.attributes
    for (var i = 0, l = attrs.length; i < l; i++) {//遍历属性节点
      var name = attrs[i].name
      if (refRE.test(name)) {
        return camelize(name.replace(refRE, '')) //v-ref:my-comp -> myComp
      }
    }
  }
}

/**
 * Map a function to a range of nodes .
 *
 * @param {Node} node
 * @param {Node} end
 * @param {Function} op
 */

export function mapNodeRange (node, end, op) {
  var next
  while (node !== end) {
    next = node.nextSibling
    op(node)
    node = next//遍历一段nodes 执行op
  }
  op(end)
}

/**
 * Remove a range of nodes with transition, store
 * the nodes in a fragment with correct ordering,
 * and call callback when done.
 *
 * @param {Node} start
 * @param {Node} end
 * @param {Vue} vm
 * @param {DocumentFragment} frag
 * @param {Function} cb
 */

export function removeNodeRange (start, end, vm, frag, cb) {
  var done = false
  var removed = 0
  var nodes = []
  mapNodeRange(start, end, function (node) {//一组节点 迭代执行操作
    if (node === end) done = true
    nodes.push(node)
    removeWithTransition(node, vm, onRemoved) //过渡方式移除节点
  })
  function onRemoved () {
    removed++
    if (done && removed >= nodes.length) {//节点遍历并移除完后  节点都存入fragment中 执行callback
      for (var i = 0; i < nodes.length; i++) {
        frag.appendChild(nodes[i])
      }
      cb && cb()
    }
  }
}

/**
 * Check if a node is a DocumentFragment.
 *
 * @param {Node} node
 * @return {Boolean}
 */

export function isFragment (node) {
  return node && node.nodeType === 11
}

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 *
 * @param {Element} el
 * @return {String}
 */
// 获取outerHTML
export function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div')
    container.appendChild(el.cloneNode(true)) //把克隆的节点( el.cloneNode(true) )存入临时新建的div中 取div.innerHTML
    return container.innerHTML
  }
}
