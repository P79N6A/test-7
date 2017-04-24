const path = require('path');
const _ = require('lodash');
const config = require('../config');
const debug = require('debug')('app'); // process.env.DEBUG=* 时, 才打印的信息
const assert = require('assert'); // 断言失败，则抛出异常
const logUtils = require('./log');

// 文件路径转换为url 以config.staticDir为网站根目录
function path2url(fpath, ctx) {
    const relpath = path.relative(config.staticDir, fpath);
    const pathname = relpath.split(path.sep).join('/');
    return `//${ctx.host}/${pathname}`;
}


// response data
function resJson(ok, data) {
    if (data._id) {
        delete data._id // 删除主键
    }

    return {
        code: ok ? 1 : 0,
        msg: ok ? 'success' : 'fail',
        data
    };
}

const WS = {
    path2url,
    debug,
    assert,
    resJson
};

_.assign(WS, logUtils);

module.exports = WS;