/**
 * Service for sending network requests.
 */

const jsonType = {'Content-Type': 'application/json'};

import cors from './cors';
import mime from './mime';
import jsonp from './jsonp';
import before from './before';
import method from './method';
import header from './header';
import timeout from './timeout';
import interceptor from './interceptor';
import Client from './client/index';
import Promise from '../promise';
import { error, extend, merge, isFunction, isObject } from '../util';
// 发送请求 Http(url, options)
export default function Http(url, options) {

    var self = this || {}, client = Client, request, promise;

    Http.interceptors.forEach((handler) => {// 设置http拦截器 handler ->{request:.., response:.. } or factoryfn
        client = interceptor(handler, self.$vm)(client);// 设置好拦截器的http客户端?
    });

    // 参数1为对象则认为是options, 否则认为是url
    options = isObject(url) ? url : extend({url: url}, options);
    // 合并Http.options , vm.$options, 和入参的options 得到请求对象
    request = merge({}, Http.options, self.$options, options);
    //client发请求绑定vm做为上下文对象(vm.$http)
    promise = client(request).bind(self.$vm).then((response) => {
        // 请求成功 根据response.ok 决定promise是否成功兑现
        return response.ok ? response : Promise.reject(response);

    }, (response) => {

        if (response instanceof Error) {// response为Error的实例 则打印错误信息
            error(response);
        }

        return Promise.reject(response);
    });

    if (request.success) {// 有request.success, request.error 回调, 则注册为promise完成时resolve/reject的回调
        promise.success(request.success);
    }

    if (request.error) {
        promise.error(request.error);
    }

    return promise;
}

Http.options = {
    method: 'get',
    data: '',
    params: {},
    headers: {},
    xhr: null,
    upload: null,
    jsonp: 'callback',
    beforeSend: null,
    crossOrigin: null,
    emulateHTTP: false,
    emulateJSON: false,
    timeout: 0
};

Http.headers = {
    put: jsonType,
    post: jsonType,
    patch: jsonType,
    delete: jsonType,
    common: {'Accept': 'application/json, text/plain, */*'},
    custom: {'X-Requested-With': 'XMLHttpRequest'}
};
// 默认的拦截器数组
Http.interceptors = [before, timeout, jsonp, method, mime, header, cors];

['get', 'put', 'post', 'patch', 'delete', 'jsonp'].forEach(function (method) {
    // http动词注册为对应方法
    Http[method] = function (url, data, success, options) {

        if (isFunction(data)) {// 参数2是函数则作为成功回调,参数3作为options
            options = success;
            success = data;
            data = undefined;
        }

        if (isObject(success)) {// 参数3为对象则作为options
            options = success;
            success = undefined;
        }

        return this(url, extend({method: method, data: data, success: success}, options));
    };
});
