import config from '../config'
import { hyphenate } from './lang'

let warn
let formatComponentName

if (process.env.NODE_ENV !== 'production') {
  const hasConsole = typeof console !== 'undefined' //:非生产环境 有console对象

  warn = (msg, vm) => {
    if (hasConsole && (!config.silent)) {//:有console对象 且 配置config.slient=false
      console.error('[Vue warn]: ' + msg + (vm ? formatComponentName(vm) : ''))
    }
  }
  //:格式化组件名
  formatComponentName = vm => {//: vm._isVue 标识是否vue实例
    var name = vm._isVue ? vm.$options.name : vm.name
    return name
      ? ' (found in component: <' + hyphenate(name) + '>)'
      : ''
  }
}

export { warn }
