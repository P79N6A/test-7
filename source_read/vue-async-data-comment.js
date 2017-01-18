(function () {
  var vue // lazy bind

  var asyncData = {
    created: function () {
      if (!vue) {
        console.warn('[vue-async-data] not installed!')
        return
      }
      if (this.$options.asyncData) {//存在asyncData选项则 定义元数据 $loadingAsyncData
        if (this._defineMeta) {
          // 0.12 compat 
          this._defineMeta('$loadingAsyncData', true)
        } else {
          // ^1.0.0-alpha
          vue.util.defineReactive(this, '$loadingAsyncData', true)
        }
      }
    },
    compiled: function () {
      this.reloadAsyncData() //获取后端数据
    },
    methods: {
      reloadAsyncData: function () {
        var load = this.$options.asyncData
        if (load) {
          var self = this
          var resolve = function (data) {
            if (data) {
              for (var key in data) {//遍历对象的key  vm.$set(key, val)
                self.$set(key, data[key])
              }
            }
            self.$loadingAsyncData = false
            self.$emit('async-data')
          }
          var reject = function (reason) {
            var msg = '[vue] async data load failed'
            if (reason instanceof Error) {
              console.warn(msg)
              throw reason
            } else {
              console.warn(msg + ': ' + reason)
            }
          }
          this.$loadingAsyncData = true
          var res = load.call(this, resolve, reject) //以vm为上下文对象 传入 resolve reject函数参数 调用asyncData函数
          if (res && typeof res.then === 'function') {//若asyncData函数返回的是promise 则用promise接口 
            res.then(resolve, reject) //promise resolveCallback rejectCallback
          }
        }
      }
    }
  }

  var api = {
    mixin: asyncData,
    install: function (Vue, options) {
      vue = Vue
      Vue.options = Vue.util.mergeOptions(Vue.options, asyncData)
    }
  }

  if(typeof exports === 'object' && typeof module === 'object') {//support cmd
    module.exports = api
  } else if(typeof define === 'function' && define.amd) {//support amd 
    define(function () { return api })
  } else if (typeof window !== 'undefined') {//browser 
    window.VueAsyncData = api
  }
})()
