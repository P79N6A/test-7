/**
 * JSONP client.
 */
// 发送jsonp请求的客户端
import Url from '../../url/index';
import Promise from '../../promise';

export default function (request) {
    return new Promise((resolve) => {

        var callback = '_jsonp' + Math.random().toString(36).substr(2), response = {request: request, data: null}, handler, script;

        request.params[request.jsonp] = callback;// some/path/api.php?jsonp=_jsonptz98mt7uxhddncc
        request.cancel = () => {// request.cancel() 取消请求
            handler({type: 'cancel'});
        };

        script = document.createElement('script');
        script.src = Url(request); // request对象提取url 作为script.src
        script.type = 'text/javascript';
        script.async = true; // 指明异步执行

        window[callback] = (data) => {// 创建对应的全局回调函数
            response.data = data;
        };

        handler = (event) => {

            if (event.type === 'load' && response.data !== null) {// script加载完成
                response.status = 200;
            } else if (event.type === 'error') {
                response.status = 404;
            } else {
                response.status = 0;
            }

            resolve(response);// 用response对象 resolve promise

            delete window[callback]; // 删除临时的全局回调
            document.body.removeChild(script); // 删除临时script
        };

        script.onload = handler;
        script.onerror = handler;

        document.body.appendChild(script); // script标签加入document 才开始请求
    });
}
