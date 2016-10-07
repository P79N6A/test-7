/**
 * Header Interceptor.
 */
// 处理options.headers的拦截器
import Http from './index';
import { extend, isPlainObject } from '../util';

const exports = {

    request(request) {

        request.method = request.method.toUpperCase(); // method转为大写
        request.headers = extend({}, Http.headers.common,
            !request.crossOrigin ? Http.headers.custom : {},
            Http.headers[request.method.toLowerCase()],
            request.headers
        ); // 合并headers: 各方法的公共header, 自定义header, 方法对应的header, 调用入参的header

        if (isPlainObject(request.data) && /^(GET|JSONP)$/i.test(request.method)) {// GET JSONP方法 options.data扩展到 options.params
            extend(request.params, request.data);
            delete request.data;
        }

        return request;
    }

};

export default exports;
