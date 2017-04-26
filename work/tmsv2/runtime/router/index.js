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

var pageCtrl = require('../controllers/page');

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

router.get('/my/savedata', function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
        var id, cond, data;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        id = ctx.query.id || '';
                        cond = id ? { page_id: id } : {};
                        _context2.next = 4;
                        return ctx.mongo.collection('TmsPages').findOne(cond);

                    case 4:
                        data = _context2.sent;

                        delete data._id;
                        _context2.next = 8;
                        return ctx.render('savedata', { engine: 'jade', data: (0, _stringify2.default)(data), id: id });

                    case 8:
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


router.get('/pages/query', pageCtrl.query.bind(pageCtrl));

router.get('/pages/get', pageCtrl.getById.bind(pageCtrl));

router.post('/pages/create', pageCtrl.create.bind(pageCtrl));

router.post('/pages/update', pageCtrl.replaceById.bind(pageCtrl));

router.get('/pages/publish', pageCtrl.publish.bind(pageCtrl));

// upload
router.post('/upload', upload.single('upfile'), function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
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
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}());

module.exports = router;