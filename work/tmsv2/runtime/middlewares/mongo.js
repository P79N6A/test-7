'use strict';

var koaMongo = require('koa-mongo');
var mongoOpts = require('../config/database');

function mongo() {
    return koaMongo(mongoOpts);
}

module.exports = mongo;