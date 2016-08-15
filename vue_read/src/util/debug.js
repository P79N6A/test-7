import config from '../config'
import { hyphenate } from './lang'

let warn
let formatComponentName

if (process.env.NODE_ENV !== 'production') {
  const hasConsole = typeof console !== 'undefined'

  warn = (msg, vm) => {
    if (hasConsole && (!config.silent)) {//:有console对象 且 配置config.slient=false
      console.error('[Vue warn]: ' + msg + (vm ? formatComponentName(vm) : ''))
    }
  }

  formatComponentName = vm => {//: vm._isVue 标识是否vue实例
    var name = vm._isVue ? vm.$options.name : vm.name
    return name
      ? ' (found in component: <' + hyphenate(name) + '>)'
      : ''
  }
}

export { warn }
