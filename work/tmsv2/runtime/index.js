'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');

var WS = require('./helper');
var config = require('./config');

var serve = require('koa-static');
var logger = require('koa-logger');
var cors = require('kcors');
var cookie = require('koa-cookie').default;
var session = require('koa-session');
var views = require('koa-views');
var bodyparser = require('./middlewares/bodyparser');
var mongo = require('./middlewares/mongo');
var errorListen = require('./middlewares/errorListen');
var favicon = require('./middlewares/favicon');

var Koa = require('koa');
var app = new Koa();
var router = require('./router');

// signed cookie keys
app.keys = ['this is a secret key', 'tms2.0'];

//-- third part middlewares
app.use(serve(config.staticDir)); //静态文件 
config.isDev && app.use(logger());
app.use(bodyparser());
app.use(cors({
    credentials: true,
    keepHeadersOnError: true
}));
app.use(cookie());
app.use(session(app));
app.use(views(path.join(__dirname, 'views'), {
    extension: 'jade'
}));
app.use(mongo());

//-- custom middlewares
app.use(errorListen());
app.use(favicon());

// routes
app.use(router.routes()).use(router.allowedMethods());

// 404
app.use(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return next();

                    case 2:
                        ctx.throw(404);

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

function listen() {

    app.listen(config.port);
    WS.lineLog((config.isDev ? 'Developing' : 'Production') + ': Server is listening on port: %s', config.port);
}

exports.run = listen;