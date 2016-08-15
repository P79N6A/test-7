/**
 * Utility functions.
 */

var util = {}, config = {}, array = [], console = window.console;

export default function (Vue) {
    util = Vue.util;
    config = Vue.config;
}

export const isArray = Array.isArray;

export function warn(msg) {
    if (console && util.warn && (!config.silent || config.debug)) {
        console.warn('[VueResource warn]: ' + msg);
    }
}

export function error(msg) {
    if (console) {
        console.error(msg);
    }
}

export function nextTick(cb, ctx) {
    return util.nextTick(cb, ctx);
}

export function trim(str) {
    return str.replace(/^\s*|\s*$/g, '');
}

export function toLower(str) {
    return str ? str.toLowerCase() : '';
}

export function isString(val) {
    return typeof val === 'string';
}

export function isFunction(val) {
    return typeof val === 'function';
}

export function isObject(obj) {// [], new Date(), /\s/,  {}
    return obj !== null && typeof obj === 'object';
}

export function isPlainObject(obj) {//{foo: 'foov' }
    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}
// vm.$options上的一些选项扩展到新的fn上(绑定特定上下文的fn)
// options(Vue.url, vm, vm.$options.url)
export function options(fn, obj, opts) {

    opts = opts || {};

    if (isFunction(opts)) {// {url: function(){ return this.base + 'some/api'; } }
        opts = opts.call(obj); // 以vm作为上下文调用的结果作为真正的opts
    }
    // 如 url: {base: 'www.exam.com', api: 'get/user'}
    // newfn = function(){ this.$vm... this.$options->url } newfn.$options->url
    return merge(fn.bind({$vm: obj, $options: opts}), fn, {$options: opts});
}

export function each(obj, iterator) {

    var i, key;

    if (typeof obj.length == 'number') {// 遍历数组/类数组 元素为迭代器的上下文
        for (i = 0; i < obj.length; i++) {
            iterator.call(obj[i], obj[i], i);
        }
    } else if (isObject(obj)) {// 遍历对象 值为迭代器的上下文
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                iterator.call(obj[key], obj[key], key);
            }
        }
    }

    return obj;
}
// 设置默认值 target不存在对应属性时 增补
export function defaults(target, source) {

    for (var key in source) {
        if (target[key] === undefined) {
            target[key] = source[key];
        }
    }

    return target;
}
// 扩展对象 extend(target, obj1, obj2,..)
export function extend(target) {

    var args = array.slice.call(arguments, 1);

    args.forEach((arg) => {
        _merge(target, arg);// 浅拷贝 {a:{a1:'hi',a2:'go'}} {a:{fo:'fv'}} -> {a: {fo:'fv'}}
    });

    return target;
}
// 扩展对象 深度扩展 merge(target, obj1, obj2,..)
export function merge(target) {

    var args = array.slice.call(arguments, 1);

    args.forEach((arg) => {
        _merge(target, arg, true);
    });

    return target;
}

function _merge(target, source, deep) {
    for (var key in source) {
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
                //源当前key的值为普通对象，目标对应key非普通对象，则目标对应key设为空对象
                target[key] = {};
            }
            if (isArray(source[key]) && !isArray(target[key])) {
                //数组时 类似上面
                target[key] = [];
            }
            //源和目标对应key同为对象/数组，则递归合并
            _merge(target[key], source[key], deep);
        } else if (source[key] !== undefined) {
            //源当前key对应的值非undefined 非对象 非数组 则直接覆盖目标对应key
            target[key] = source[key];
        }
    }
}
