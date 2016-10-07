/**
 * Service for URL templating.
 */

const ie = document.documentMode;
const el = document.createElement('a');

import root from './root';
import query from './query';
import legacy from './legacy';
import template from './template';
import { each, merge, isArray, isFunction, isObject, isPlainObject, isString } from '../util';

export default function Url(url, params) {

    var self = this || {}, options = url, transform;

    if (isString(url)) {// 若参数1为string
        options = {url: url, params: params};
    }
    // 合并options: 默认options vm.$options, 入参的url params
    options = merge({}, Url.options, self.$options, options);

    Url.transforms.forEach((handler) => {
        transform = factory(handler, transform, self.$vm);
    });

    return transform(options);
}

/**
 * Url options.
 */

Url.options = {
    url: '',
    root: null,
    params: {}
};

/**
 * Url transforms.
 */

Url.transforms = [template, legacy, query, root];

/**
 * Encodes a Url parameter string.
 *
 * @param {Object} obj
 */

Url.params = function (obj) {// url查询参数序列化

    var params = [], escape = encodeURIComponent;

    params.add = function (key, value) {// 添加url参数

        if (isFunction(value)) {
            value = value();
        }

        if (value === null) {
            value = '';
        }

        this.push(escape(key) + '=' + escape(value));
    };

    serialize(params, obj);

    return params.join('&').replace(/%20/g, '+');
};

/**
 * Parse a URL and return its components.
 *
 * @param {String} url
 */

Url.parse = function (url) {// 解析url

    if (ie) {
        el.href = url;
        url = el.href;
    }

    el.href = url;// a.href = url

    return {
        href: el.href,
        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
        port: el.port,
        host: el.host,
        hostname: el.hostname,
        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
        search: el.search ? el.search.replace(/^\?/, '') : '',
        hash: el.hash ? el.hash.replace(/^#/, '') : ''
    };
};

function factory(handler, next, vm) {
    return (options) => {
        return handler.call(vm, options, next);
    };
}

function serialize(params, obj, scope) {// 序列化查询参数

    var array = isArray(obj), plain = isPlainObject(obj), hash;

    each(obj, (value, key) => {

        hash = isObject(value) || isArray(value);// value为数组或对象

        if (scope) {
            key = scope + '[' + (plain || hash ? key : '') + ']';
        }

        if (!scope && array) {// obj -> [{name:.., value:..}, ..]
            params.add(value.name, value.value);
        } else if (hash) {
            serialize(params, value, key);
        } else {// params = ['foo=bar']  obj ={'goo': 'hoo' } -> params.add('goo', 'hoo')
            params.add(key, value);
        }
    });
}
