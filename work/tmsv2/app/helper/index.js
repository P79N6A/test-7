const path = require('path');
const crypto = require('crypto');
const _ = require('lodash');
const config = require('../config');
const debug = require('debug')('app'); // process.env.DEBUG=* 时, 才打印的信息
const assert = require('assert'); // 断言失败，则抛出异常
const logFns = require('./log');
const fsFns = require('./fs');


// 文件路径转换为url 以config.staticDir为网站根目录
function path2url(fpath, ctx) {
    const relpath = path.relative(config.staticDir, fpath);
    const pathname = relpath.split(path.sep).join('/');
    return `//${ctx.host}/${pathname}`;
}


// response data
function resJson(ok, data) {
    return {
        code: ok ? 10000 : 10001,
        msg: ok ? 'success' : 'fail',
        data
    };
}


// MD5 加密
function md5(msg) {
    var newHash = crypto.createHash('md5');
    newHash.update(msg, 'utf8');
    return newHash.digest('hex');
};

const WS = {
    path2url,
    debug,
    assert,
    resJson,
    md5
};

_.assign(WS, logFns, fsFns);

module.exports = WS;