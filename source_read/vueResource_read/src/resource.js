/**
 * Service for interacting with RESTful services.
 */

import Http from './http/index';
import { each, extend, merge, isFunction } from './util';

export default function Resource(url, params, actions, options) {

    var self = this || {}, resource = {};
    // 浅拷贝 合并默认actions 和 入参的actions
    actions = extend({},
        Resource.actions,
        actions
    );
    // actions -> { get:.., post:.., myaction:{url:.., method:.., ..}}
    each(actions, (action, name) => {
        // 深度拷贝 扩展选项 action 为指定方法对应的设置 合并 {url:.., params:..},  {url:.., method:.., data:.., header:..}, actionOptions
        action = merge({url: url, params: params || {}}, options, action);

        resource[name] = function () {// 注册resource的方法, 如: User.query(arg1, arg2), User.save(arg1,..)
            return (self.$http || Http)(opts(action, arguments));// 调用vm.$http(..) 或 Http 发请求
        };
    });

    return resource;
}

function opts(action, args) {
    // resource方法的默认选项 和 调用时入参的选项合并
    var options = extend({}, action), params = {}, data, success, error;

    switch (args.length) {

        case 4:
            // User.update({uid:1}, {uname: 'cici'}, sucCb, errCb)
            error = args[3];
            success = args[2];

        case 3:
        case 2:

            if (isFunction(args[1])) {

                if (isFunction(args[0])) {
                    // User.query(sucCb, errCb)
                    success = args[0];
                    error = args[1];

                    break;
                }
                // User.get({uid:12}, sucCb, errCb)
                success = args[1];
                error = args[2];

            } else {
                // resource[method](params, data, success)
                // User.update({uid: 12}, {uname: 'coco'}, sucCb)  
                params = args[0];
                data = args[1];
                success = args[2];

                break;
            }

        case 1:

            if (isFunction(args[0])) {// User.query(sucCb)
                success = args[0];
            } else if (/^(POST|PUT|PATCH)$/i.test(options.method)) {// User.save({uname: 'coco'}); 非GET则 认为是data; 否则认为是params
                data = args[0];
            } else {
                params = args[0];
            }

            break;

        case 0:

            break;

        default:

            throw 'Expected up to 4 arguments [params, data, success, error], got ' + args.length + ' arguments';
    }

    options.data = data;
    options.params = extend({}, options.params, params); // data 和 params扩展默认options

    if (success) {
        options.success = success;
    }

    if (error) {
        options.error = error;
    }

    return options;
}

Resource.actions = {// 默认actions

    get: {method: 'GET'},
    save: {method: 'POST'},
    query: {method: 'GET'},
    update: {method: 'PUT'},
    remove: {method: 'DELETE'},
    delete: {method: 'DELETE'}

};
