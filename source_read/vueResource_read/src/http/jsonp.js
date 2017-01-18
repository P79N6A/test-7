/**
 * JSONP Interceptor.
 */
// 处理options.method === JSONP 的拦截器
import jsonpClient from './client/jsonp';

const exports = {

    request(request) {

        if (request.method == 'JSONP') {
            request.client = jsonpClient;
        }

        return request;
    }

};

export default exports;
