const fsp = require('fs-promise');
const path = require('path');
const fs = require('fs');

// 确保文件路径存在, 对应文件夹没有则创建, eg: /path/to/foo/bar/a.jpg
function ensurePath(fpath) {

    return new Promise(function (resolve) {
        let ok = true;

        fpath = path.resolve(fpath);
        const fileRE = /\w+\.\w{1,4}/;

        const parts = fpath.split(path.sep);
        const len = parts.length;
        

        parts.forEach(function(part, i) {

            if (i > 0) {
                const tmpPath = parts.slice(0, i + 1).join(path.sep);
                const exists = fs.existsSync(tmpPath);
                if (!exists) {
                    if (!(i === len - 1 && fileRE.test(tmpPath))) { // 排除 末尾并且为文件名的情况
                        const err = fs.mkdirSync(tmpPath);
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
    ensurePath
};
