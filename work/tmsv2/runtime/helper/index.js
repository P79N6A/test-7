'use strict';

var path = require('path');
var crypto = require('crypto');
var _ = require('lodash');
var config = require('../config');
var debug = require('debug')('app'); // process.env.DEBUG=* 时, 才打印的信息
var assert = require('assert'); // 断言失败，则抛出异常
var logFns = require('./log');
var fsFns = require('./fs');

// 文件路径转换为url 以config.staticDir为网站根目录
function path2url(fpath, ctx) {
    var relpath = path.relative(config.staticDir, fpath);
    var pathname = relpath.split(path.sep).join('/');
    return '//' + ctx.host + '/' + pathname;
}

// response data
function resJson(ok, data) {
    return {
        code: ok ? 10000 : 10001,
        msg: ok ? 'success' : 'fail',
        data: data
    };
}

// MD5 加密
function md5(msg) {
    var newHash = crypto.createHash('md5');
    newHash.update(msg, 'utf8');
    return newHash.digest('hex');
};

var WS = {
    path2url: path2url,
    debug: debug,
    assert: assert,
    resJson: resJson,
    md5: md5
};

_.assign(WS, logFns, fsFns);

module.exports = WS;