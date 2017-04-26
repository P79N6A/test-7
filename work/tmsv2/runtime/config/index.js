'use strict';

var fs = require('fs');
var path = require('path');

var config = {
    env: process.env.NODE_ENV === 'dev' ? 'dev' : 'product',
    get isDev() {
        return config.env === 'dev';
    },
    get port() {
        return process.env.PORT || 3000;
    },
    get uploadDir() {
        return path.join(config.staticDir, 'uploads');
    },
    get publishedPath() {
        return config[config.env].publishedPath;
    },

    staticDir: path.join(__dirname, '../../www'),
    dev: {
        "publishedPath": "/opt/tms_dev/online"
    },
    product: {
        "publishedPath": "/data/wwwroot/tms-online-oss"
    }
};

module.exports = config;