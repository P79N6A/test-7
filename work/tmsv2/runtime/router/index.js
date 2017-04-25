'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = require('koa-router');
var upload = require('../middlewares/multer');
var WS = require('../helper');
var config = require('../config');

var router = new Router();

router.get('/', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        ctx.type = 'html';
                        ctx.body = '<h1>Welcome to TMS2.0</h1>';

                    case 2:
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

router.get('/home', function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
        var data;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return ctx.mongo.collection('TmsPages').findOne();

                    case 2:
                        data = _context2.sent;

                        delete data._id;
                        _context2.next = 6;
                        return ctx.render('home', { type: 'test-type', engine: 'jade', data: (0, _stringify2.default)(data) });

                    case 6:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}());

router.get('/save/test', function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
        var data, page_id, n, res;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return ctx.mongo.collection('TmsPages').findOne();

                    case 2:
                        data = _context3.sent;
                        page_id = data.page_id;

                        delete data._id;

                        n = Math.floor(1000 * Math.random());

                        data.count = n;

                        _context3.next = 9;
                        return ctx.mongo.collection('TmsPages').replaceOne({ page_id: page_id }, data);

                    case 9:
                        res = _context3.sent;

                        ctx.body = res.result;

                    case 11:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}());

//-- pages

// query
router.get('/pages/list', function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
        var data;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        data = { list: [{ p1: 'page1' }, { p2: 'page2' }] };

                        ctx.body = WS.resJson(true, data);

                    case 2:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}());

// find one
router.get('/pages/find', function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
        var pageId, data;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        pageId = ctx.query.id;

                        WS.assert.notEqual(pageId, null, '参数缺少id');

                        // data = await ctx.mongo.db('tms').collection('TmsPages').findOne();
                        _context5.next = 4;
                        return ctx.mongo.collection('TmsPages').findOne();

                    case 4:
                        data = _context5.sent;

                        ctx.body = WS.resJson(true, data);

                    case 6:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function (_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}());

// create
router.post('/pages/create', function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx, next) {
        var data;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        data = ctx.request.body || {};
                        // insert to db

                        ctx.body = WS.resJson(true, { result: 'save ok', id: 22 });

                    case 2:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function (_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}());

// update: update some fields of doc
router.post('/pages/update', function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(ctx, next) {
        var pageId;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        // const pageId = ctx.query.id;
                        pageId = 'P101';

                        ctx.body = WS.resJson(true, { result: 'update ok', id: 33 });

                    case 2:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined);
    }));

    return function (_x13, _x14) {
        return _ref7.apply(this, arguments);
    };
}());

// save: replace the doc
router.post('/pages/save', function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(ctx, next) {
        var id, pageId, res;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        id = ctx.query.id;

                        WS.assert.notEqual(id, null, '参数缺少id');

                        pageId = 'P101';
                        _context8.next = 5;
                        return ctx.mongo.collection('TmsPages').replaceOne({ page_id: pageId }, ctx.request.body);

                    case 5:
                        res = _context8.sent;

                        ctx.body = res.result;

                    case 7:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, undefined);
    }));

    return function (_x15, _x16) {
        return _ref8.apply(this, arguments);
    };
}());

// upload
router.post('/upload', upload.single('upfile'), function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(ctx, next) {
        return _regenerator2.default.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        // WS.log('req.body', ctx.req.body);
                        // WS.log('req.file:', ctx.req.file);

                        ctx.body = {
                            code: 1,
                            status: 'success',
                            data: {
                                url: WS.path2url(ctx.req.file.path, ctx)
                            }
                        };

                    case 1:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, undefined);
    }));

    return function (_x17, _x18) {
        return _ref9.apply(this, arguments);
    };
}());

module.exports = router;