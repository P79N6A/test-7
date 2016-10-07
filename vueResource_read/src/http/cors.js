/**
 * CORS Interceptor.
 */

import Url from '../url/index';
import xdrClient from './client/xdr';
// 处理跨域的拦截器
const originUrl = Url.parse(location.href);
const supportCors = 'withCredentials' in new XMLHttpRequest(); // 判断是否支持CORS

const exports = {

    request(request) {

        if (request.crossOrigin === null) {// 若无指定 optins.crossOrigin 则自动检测request 和 当前location 是否同源
            request.crossOrigin = crossOrigin(request);
        }

        if (request.crossOrigin) {

            if (!supportCors) {// 若跨域且不支持CORS
                request.client = xdrClient;
            }

            request.emulateHTTP = false;
        }

        return request;
    }

};

function crossOrigin(request) {// 检测是否跨域

    var requestUrl = Url.parse(Url(request));

    return (requestUrl.protocol !== originUrl.protocol || requestUrl.host !== originUrl.host);// 只判断 协议和主机  端口呢?
}

export default exports;
