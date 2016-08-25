/**
 * Mime Interceptor.
 */

import Url from '../url/index';
import { isObject, isPlainObject } from '../util';
// 处理options.emulateJSON的拦截器
const exports = {

    request(request) {

        if (request.emulateJSON && isPlainObject(request.data)) {
            request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            request.data = Url.params(request.data); // request.data序列化为form-data  修改header content-type
        }

        if (isObject(request.data) && /FormData/i.test(request.data.toString())) {// upload?
            delete request.headers['Content-Type'];
        }

        if (isPlainObject(request.data)) {
            request.data = JSON.stringify(request.data);// 序列化为json
        }

        return request;
    },

    response(response) {

        try {
            response.data = JSON.parse(response.data); //json数据 反序列化
        } catch (e) {}

        return response;
    }

};

export default exports;
