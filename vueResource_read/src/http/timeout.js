/**
 * Timeout Interceptor.
 */
// 处理options.timeout的拦截器
const exports = function () {

    var timeout;

    return {

        request(request) {

            if (request.timeout) {// 若设置timeout参数
                timeout = setTimeout(() => {// 设置超时则取消请求
                    request.cancel();
                }, request.timeout);
            }

            return request;
        },

        response(response) {

            clearTimeout(timeout);// 若在超时前收到响应 则取消定时器

            return response;
        }

    };
};

export default exports;
