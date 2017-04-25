'use strict';

var config = {
    env: 'dev',
    dev: {},
    product: {}
};

var NODE_ENV = process.env.NODE_ENV;
NODE_ENV && (config.env = NODE_ENV);

config.isDev = config.env === 'dev';

module.exports = config;