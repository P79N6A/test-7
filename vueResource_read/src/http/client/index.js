/**
 * Base client.
 */

import Promise from '../../promise';
import xhrClient from './xhr';
import { each, trim, isArray, isString, toLower } from '../../util';

export default function (request) {

    var response = (request.client || xhrClient)(request);

    return Promise.resolve(response).then((response) => {
        // promise被resolve时 修改response.headers response.ok
        if (response.headers) {

            var headers = parseHeaders(response.headers);// headers解析为对象

            response.headers = (name) => {// headers改为获取指定/全部header的函数

                if (name) {
                    return headers[toLower(name)];
                }

                return headers;
            };

        }

        response.ok = response.status >= 200 && response.status < 300;// 200-299 认为成功

        return response;
    });

}

function parseHeaders(str) {

    var headers = {}, value, name, i;

    if (isString(str)) {
        each(str.split('\n'), (row) => {// 按换行分隔， 按:分隔

            i = row.indexOf(':');
            name = trim(toLower(row.slice(0, i)));
            value = trim(row.slice(i + 1));

            if (headers[name]) {

                if (isArray(headers[name])) {// {name: []}
                    headers[name].push(value);
                } else {// {name: 'hi'} -> {name: ['hi', 'hello']} 
                    headers[name] = [headers[name], value];
                }

            } else {

                headers[name] = value;
            }

        });
    }

    return headers;
}
