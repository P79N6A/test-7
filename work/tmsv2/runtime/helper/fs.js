'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fsp = require('fs-promise');
var path = require('path');
var fs = require('fs');

// 确保文件路径存在, 对应文件夹没有则创建, eg: /path/to/foo/bar/a.jpg
function ensurePath(fpath) {

    return new _promise2.default(function (resolve) {
        var ok = true;

        fpath = path.resolve(fpath);
        var fileRE = /\w+\.\w{1,4}/;

        var parts = fpath.split(path.sep);
        var len = parts.length;

        parts.forEach(function (part, i) {

            if (i > 0) {
                var tmpPath = parts.slice(0, i + 1).join(path.sep);
                var exists = fs.existsSync(tmpPath);
                if (!exists) {
                    if (!(i === len - 1 && fileRE.test(tmpPath))) {
                        // 排除 末尾并且为文件名的情况
                        var err = fs.mkdirSync(tmpPath);
                        if (err) {
                            console.log('mkdir err: ', err);
                            ok = false;
                        }
                    }
                }
            }
        });

        resolve(ok);
    });
}

module.exports = {
    ensurePath: ensurePath
};