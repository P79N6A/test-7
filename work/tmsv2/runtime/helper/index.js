'use strict';

var path = require('path');
var _ = require('lodash');
var config = require('../config');
var debug = require('debug')('app'); // process.env.DEBUG=* 时, 才打印的信息
var assert = require('assert'); // 断言失败，则抛出异常
var logUtils = require('./log');

// 文件路径转换为url 以config.staticDir为网站根目录
function path2url(fpath, ctx) {
    var relpath = path.relative(config.staticDir, fpath);
    var pathname = relpath.split(path.sep).join('/');
    return '//' + ctx.host + '/' + pathname;
}

// response data
function resJson(ok, data) {
    if (data._id) {
        delete data._id; // 删除主键
    }

    return {
        code: ok ? 1 : 0,
        msg: ok ? 'success' : 'fail',
        data: data
    };
}

var WS = {
    path2url: path2url,
    debug: debug,
    assert: assert,
    resJson: resJson
};

_.assign(WS, logUtils);

module.exports = WS;