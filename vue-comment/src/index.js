import Vue from './instance/vue'
import installGlobalAPI from './global-api'
import { inBrowser, devtools } from './util/index'
import config from './config'

installGlobalAPI(Vue) //设置全局的方法 Vue.set, Vue.config..

Vue.version = '1.0.24'

export default Vue

// devtools global hook
/* istanbul ignore next */
setTimeout(() => {
  if (config.devtools) {//若设置 config.devtools = true
    if (devtools) {//若有devtools  则初始化
      devtools.emit('init', Vue)
    } else if (
      process.env.NODE_ENV !== 'production' &&
      inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)
    ) {//在chrome浏览中 并且为开发环境 则提示下载vue-devtools
      console.log(
        'Download the Vue Devtools for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      )
    }
  }
}, 0)
