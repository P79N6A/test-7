import Vue from './instance/vue'
import installGlobalAPI from './global-api'
import { inBrowser, devtools } from './util/index'
import config from './config'

installGlobalAPI(Vue) //:注册全局的api

Vue.version = '1.0.24'

export default Vue

// devtools global hook
/* istanbul ignore next */
setTimeout(() => {
  if (config.devtools) {//:若设置了 Vue.config.devtools = true  ， 则初始化devtools 或提示下载devtools
    if (devtools) {
      devtools.emit('init', Vue)
    } else if (
      process.env.NODE_ENV !== 'production' &&
      inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)
    ) {
      console.log(
        'Download the Vue Devtools for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      )
    }
  }
}, 0)
