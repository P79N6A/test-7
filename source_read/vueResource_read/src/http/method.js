/**
 * HTTP method override Interceptor.
 */
// 处理options.emulateHTTP选项的拦截器
const exports = {

    request(request) {

        if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
            request.headers['X-HTTP-Method-Override'] = request.method; // 修改method 添加header说明原始method
            request.method = 'POST';
        }

        return request;
    }

};

export default exports;
