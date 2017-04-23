var fs = require('fs');
var path = require('path');

var config = {
    env: 'dev',
    get isDev() { return config.env === 'dev' },
    get port() { return process.env.PORT || 3000; },
    get uploadDir() { return path.join(config.staticDir, 'uploads');},
    staticDir: path.join(__dirname, '../../www'),
    dev: {

    },
    product: {

    }
};

const NODE_ENV = process.env.NODE_ENV;
NODE_ENV && (config.env = NODE_ENV);

module.exports = config;
