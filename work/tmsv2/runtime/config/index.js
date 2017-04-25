'use strict';

var fs = require('fs');
var path = require('path');

var config = {
    env: process.env.NODE_ENV || 'product',
    get isDev() {
        return config.env === 'dev';
    },
    get port() {
        return process.env.PORT || 3000;
    },
    get uploadDir() {
        return path.join(config.staticDir, 'uploads');
    },
    staticDir: path.join(__dirname, '../../www'),
    dev: {},
    product: {}
};

module.exports = config;