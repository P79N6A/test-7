/**
 * Before Interceptor.
 */

import { isFunction } from '../util';

const exports = {

    request(request) {

        if (isFunction(request.beforeSend)) {// 拦截器处理options中的beforeSend函数
            request.beforeSend.call(this, request); // beforeSend绑定上下文
        }

        return request;
    }

};

export default exports;
