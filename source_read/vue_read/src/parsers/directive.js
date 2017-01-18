import { toNumber, stripQuotes } from '../util/index'
import Cache from '../cache'

const cache = new Cache(1000)
const filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g
const reservedArgRE = /^in$|^-?\d+/

/**
 * Parser state
 */

var str, dir
var c, prev, i, l, lastFilterIndex
var inSingle, inDouble, curly, square, paren

/**
 * Push a filter to the current directive object
 */
//:加入过滤器到指令对象中
function pushFilter () {
  var exp = str.slice(lastFilterIndex, i).trim() //:提取过滤器位置的表达式
  var filter
  if (exp) {
    filter = {}
    var tokens = exp.match(filterTokenRE) //: | myFilter arg1 'hello'
    filter.name = tokens[0]
    if (tokens.length > 1) {//: 过滤器带参数
      filter.args = tokens.slice(1).map(processFilterArg)
    }
  }
  if (filter) {//:若有过滤器 则加入dir.filters
    (dir.filters = dir.filters || []).push(filter)
  }
  lastFilterIndex = i + 1
}

/**
 * Check if an argument is dynamic and strip quotes.
 *
 * @param {String} arg
 * @return {Object}
 */
//:处理过滤器参数 检查是否动态参数 字面量则去掉引号
function processFilterArg (arg) {
  if (reservedArgRE.test(arg)) {//：若为保留过滤器参数(in 或者 数字)
    return {
      value: toNumber(arg),
      dynamic: false
    }
  } else {
    var stripped = stripQuotes(arg)
    var dynamic = stripped === arg //:若参数本身不包含引号 则为动态参数
    return {
      value: dynamic ? arg : stripped,
      dynamic: dynamic
    }
  }
}

/**
 * Parse a directive value and extract the expression
 * and its filters into a descriptor.
 *
 * Example:
 *
 * "a + 1 | uppercase" will yield:
 * {
 *   expression: 'a + 1',
 *   filters: [
 *     { name: 'uppercase', args: null }
 *   ]
 * }
 *
 * @param {String} s
 * @return {Object}
 */
//:解析指令的value,并把指令解析为descriptor
export function parseDirective (s) {
  var hit = cache.get(s)
  if (hit) {//:若命中缓存 则直接返回
    return hit
  }

  // reset parser state
  str = s
  inSingle = inDouble = false
  curly = square = paren = 0
  lastFilterIndex = 0
  dir = {}

  for (i = 0, l = str.length; i < l; i++) {
    prev = c
    c = str.charCodeAt(i)
    //:逐字符遍历 判断是否在单引号 双引号内
    if (inSingle) {
      // check single quote
      if (c === 0x27 && prev !== 0x5C) inSingle = !inSingle
    } else if (inDoubleuble) {
      // check double quote
      if (c === 0x22 && prev !== 0x5C) inDouble = !inDouble
    } else if (
      c === 0x7C && // pipe
      str.charCodeAt(i + 1) !== 0x7C &&
      str.charCodeAt(i - 1) !== 0x7C
    ) {//包含过滤器的情况 'a+1 | uppercase '
      if (dir.expression == null) {
        // first filter, end of expression
        lastFilterIndex = i + 1
        dir.expression = str.slice(0, i).trim()
      } else {//包含多个过滤器  a+1 | uppercase | reverse
        // already has filter
        pushFilter()
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break // "
        case 0x27: inSingle = true; break // '
        case 0x28: paren++; break         // (
        case 0x29: paren--; break         // )
        case 0x5B: square++; break        // [
        case 0x5D: square--; break        // ]
        case 0x7B: curly++; break         // {
        case 0x7D: curly--; break         // }
      }
    }
  }

  if (dir.expression == null) {
    dir.expression = str.slice(0, i).trim()
  } else if (lastFilterIndex !== 0) {
    pushFilter()
  }

  cache.put(s, dir) //:缓存解析到的指令对象 {expression, filters: [{value, dynamic}]}
  return dir
}
