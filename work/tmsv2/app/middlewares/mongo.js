const koaMongo = require('koa-mongo');
const mongoOpts = require('../config/database');

function mongo() {
    return koaMongo(mongoOpts);
}

module.exports = mongo;