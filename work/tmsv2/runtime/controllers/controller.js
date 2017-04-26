'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 基类 Controller
 */
var path = require('path');
var WS = require('../helper');
var config = require('../config');

var Controller = function () {
    function Controller(mod) {
        (0, _classCallCheck3.default)(this, Controller);

        this.mod = mod;
        this.init(mod);
    }

    (0, _createClass3.default)(Controller, [{
        key: 'init',
        value: function init(mod) {
            var modPath = path.join(__dirname, '../models/' + mod);
            try {
                this.model = require(modPath);
            } catch (err) {
                WS.error('\u83B7\u53D6\u6A21\u5757(' + modPath + ')\u9519\u8BEF: %o', err);
            }
        }
    }, {
        key: 'query',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
                var data;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.model.init(ctx).find();

                            case 2:
                                data = _context.sent;

                                this.afterFetch(data);

                                ctx.body = WS.resJson(true, data);

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function query(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return query;
        }()
    }, {
        key: 'getById',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
                var id, data;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                // one, get by id
                                id = ctx.query.id;

                                WS.assert.notEqual(id, null, '缺少必要参数:id');

                                _context2.next = 4;
                                return this.model.init(ctx).findById(id);

                            case 4:
                                data = _context2.sent;

                                this.afterFetch(data);

                                ctx.body = WS.resJson(true, data);

                            case 7:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getById(_x3, _x4) {
                return _ref2.apply(this, arguments);
            }

            return getById;
        }()
    }, {
        key: 'get',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
                var cond, data;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                // one
                                cond = ctx.query;
                                _context3.next = 3;
                                return this.model.init(ctx).findOne(cond);

                            case 3:
                                data = _context3.sent;


                                this.afterFetch(data);

                                ctx.body = WS.resJson(data);

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function get(_x5, _x6) {
                return _ref3.apply(this, arguments);
            }

            return get;
        }()
    }, {
        key: 'beforeSave',
        value: function beforeSave(data, cond) {
            // 更新或添加前数据处理
            delete data._id; // 删除主键
            return data;
        }
    }, {
        key: 'afterFetch',
        value: function afterFetch(data) {
            // 查询数据后，返回给接口前处理
            delete data._id;
            return data;
        }
    }, {
        key: 'create',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
                var data, result;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                data = ctx.request.body || {};

                                WS.assert.notEqual((0, _keys2.default)(data).length, 0, '数据不能为空');

                                data = this.beforeSave(data);
                                _context4.next = 5;
                                return this.model.init(ctx).insert(data);

                            case 5:
                                result = _context4.sent;

                                ctx.body = WS.resJson(true, result);

                            case 7:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function create(_x7, _x8) {
                return _ref4.apply(this, arguments);
            }

            return create;
        }()
    }, {
        key: 'update',
        value: function () {
            var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
                var cond, data, result;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                cond = ctx.query;
                                data = ctx.request.body;


                                data = this.beforeSave(data, cond);
                                _context5.next = 5;
                                return this.model.init(ctx).update(cond, data);

                            case 5:
                                result = _context5.sent;

                                ctx.body = WS.resJson(true, result);

                            case 7:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function update(_x9, _x10) {
                return _ref5.apply(this, arguments);
            }

            return update;
        }()
    }, {
        key: 'replaceById',
        value: function () {
            var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx, next) {
                var id, data, result;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                id = ctx.query.id;

                                WS.assert.notEqual(id, null, '缺少必要参数:id');
                                data = ctx.request.body;


                                data = this.beforeSave(data);
                                _context6.next = 6;
                                return this.model.init(ctx).replaceById(id, data);

                            case 6:
                                result = _context6.sent;

                                ctx.body = WS.resJson(true, result);

                            case 8:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function replaceById(_x11, _x12) {
                return _ref6.apply(this, arguments);
            }

            return replaceById;
        }()
    }]);
    return Controller;
}();

module.exports = Controller;