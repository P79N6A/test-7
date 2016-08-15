/**
 * Install plugin.
 */

import Url from './url/index';
import Http from './http/index';
import Promise from './promise';
import Resource from './resource';
import Util, { options } from './util';

function plugin(Vue) {

    if (plugin.installed) {
        return;
    }

    Util(Vue); // 把Vue.util, Vue.config提供给 util.js 内部使用

    Vue.url = Url;// 把一些方法添加到Vue命名空间下
    Vue.http = Http;
    Vue.resource = Resource;
    Vue.Promise = Promise;
    // 给vue实例添加对应的方法vm.$url, vm.$http, vm.$resource, vm.$promise
    Object.defineProperties(Vue.prototype, {

        $url: {
            get() {// vm.$url 其实是Vue.url 绑定特定上下文和合并vm.$options.url选项的版本
                return options(Vue.url, this, this.$options.url);
            }
        },

        $http: {
            get() {// 同上
                return options(Vue.http, this, this.$options.http);
            }
        },

        $resource: {
            get() {// Vue.resource函数绑定vm作为上下文的新版本
                return Vue.resource.bind(this);
            }
        },

        $promise: {
            get() {// Vue.Promise的实例
                return (executor) => new Vue.Promise(executor, this);
            }
        }

    });
}
// 若为浏览器环境 直接启用插件
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

export default plugin;
