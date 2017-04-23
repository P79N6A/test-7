const _ = require('lodash');
const config = require('../config');
const path = require('path');

function logfactory(type) {

    function log(...args) {
        if (_.isString(args[0])) {
            args[0] = `[${type}]: ${args[0]}`;
        } else {
            args = [`[${type}]: `, ...args];
        }
        return console.log.apply(console, args);
    }

    return log;
}

const logFnNames = ['log', 'warn', 'error', 'info'];
const logFns = _.zipObject(logFnNames, logFnNames.map(logfactory)); 

// 文件路径转换为url 以config.staticDir为网站根目录
function path2url (fpath, ctx) {
    const relpath = path.relative(config.staticDir, fpath);
    const pathname = relpath.split(path.sep).join('/');
    return `//${ctx.host}/${pathname}`;
}

const WS = {
    path2url
};
_.assign(WS, logFns);

module.exports = WS;