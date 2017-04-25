'use strict';

var bodyParser = require('koa-bodyparser');

var parser = bodyParser({
    formLimit: '1mb',
    onerror: function onerror(err, ctx) {
        return ctx.throw('body parse error', 422);
    }
});

module.exports = function () {
    return parser.bind(null);
};