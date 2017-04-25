var  semver = require('semver');
var  versionOK = semver.satisfies(process.version, '^7.9.0');

var app = {};

if (process.env.NODE_ENV === 'dev') {// dev
    if (!versionOK) {// 开发环境 实时转码
        require('babel-core/register'); // need babel trasnform
    }
    app = require('./app');
} else {// product
    if (!versionOK) {//生产环境，访问预转码好的
        app = require('./runtime');
    } else {
        app = require('./app');
    }
}

app.run();