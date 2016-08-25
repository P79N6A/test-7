/**
 * Promise adapter.
 */

import { warn } from './util';
import PromiseLib from './lib/promise';

var PromiseObj = window.Promise || PromiseLib;// 原生的Promise 或 promise library

export default function Promise(executor, context) {// 创建新的Promise类 -> { promise: .., context: ..}

    if (executor instanceof PromiseObj) {
        this.promise = executor;
    } else {
        this.promise = new PromiseObj(executor.bind(context));// 绑定执行上下文的函数
    }

    this.context = context;
}

Promise.all = function (iterable, context) {
    return new Promise(PromiseObj.all(iterable), context);// PromiseObj.all(..) 返回可执行函数或promise
};

Promise.resolve = function (value, context) {
    return new Promise(PromiseObj.resolve(value), context);// PromiseObj.resolve(..), PromiseObj.reject(..)返回新的promiseObj
};

Promise.reject = function (reason, context) {
    return new Promise(PromiseObj.reject(reason), context);
};

Promise.race = function (iterable, context) {
    return new Promise(PromiseObj.race(iterable), context);
};

var p = Promise.prototype; // 新Promise类的原型对象

p.bind = function (context) {
    this.context = context;
    return this;
};

p.then = function (fulfilled, rejected) {

    if (fulfilled && fulfilled.bind && this.context) {
        fulfilled = fulfilled.bind(this.context);
    }

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }
    // fullfilled, rejected绑定上下文对象 p.promise更新为 p.promise.then(..) 返回的新promise
    this.promise = this.promise.then(fulfilled, rejected);

    return this;
};

p.catch = function (rejected) {

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    this.promise = this.promise.catch(rejected);

    return this;
};

p.finally = function (callback) {

    return this.then(function (value) {
            callback.call(this);
            return value;
        }, function (reason) {
            callback.call(this);
            return PromiseObj.reject(reason);
        }
    );
};

p.success = function (callback) {

    warn('The `success` method has been deprecated. Use the `then` method instead.');

    return this.then(function (response) {// p.success 内部调用 promise.then(...)
        return callback.call(this, response.data, response.status, response) || response;
    });
};

p.error = function (callback) {// 内部调用 p.catch

    warn('The `error` method has been deprecated. Use the `catch` method instead.');

    return this.catch(function (response) {
        return callback.call(this, response.data, response.status, response) || response;
    });
};

p.always = function (callback) {// p.then(cb, cb)

    warn('The `always` method has been deprecated. Use the `finally` method instead.');

    var cb = function (response) {
        return callback.call(this, response.data, response.status, response) || response;
    };

    return this.then(cb, cb);
};
