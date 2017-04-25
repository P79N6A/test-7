'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('./index');

var dbConfig = {
    host: '10.66.48.163',
    port: 27017,
    user: '',
    pass: '',
    db: 'tms',
    max: 100,
    min: 1,
    timeout: 30000,
    log: false,
    dev: {},
    product: {}
};

function updateDbConfig() {
    var env = config.isDev ? 'dev' : 'product';
    (0, _assign2.default)(dbConfig, dbConfig[env]);
}

function mongoOpts() {
    var opts = (0, _assign2.default)({}, dbConfig);
    delete opts.dev;
    delete opts.product;
    return opts;
}

updateDbConfig();

module.exports = mongoOpts();