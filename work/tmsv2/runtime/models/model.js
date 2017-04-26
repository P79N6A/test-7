'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WS = require('../helper');

/**
 * 基类 Model
 */

var Model = function () {
    function Model(col) {
        var pk = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
        (0, _classCallCheck3.default)(this, Model);

        this.col = col; // collection name, eg: TmsPages
        this.pk = pk; // primary key , eg: page_id
    }

    (0, _createClass3.default)(Model, [{
        key: 'init',
        value: function init(ctx) {
            this.collection = ctx.mongo.collection(this.col);
            return this;
        }
    }, {
        key: 'count',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                var count;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.collection.count();

                            case 2:
                                count = _context.sent;
                                return _context.abrupt('return', count);

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function count() {
                return _ref.apply(this, arguments);
            }

            return count;
        }()
    }, {
        key: 'newId',
        value: function newId() {
            var ts = 'TMS' + Date.now();
            return WS.md5(ts);
        }
    }, {
        key: 'find',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
                var cond = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var project = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                var docs;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.collection.find(cond, project).toArray();

                            case 2:
                                docs = _context2.sent;
                                return _context2.abrupt('return', docs);

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function find() {
                return _ref2.apply(this, arguments);
            }

            return find;
        }()
    }, {
        key: 'findOne',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
                var cond = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var project = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                var doc;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.collection.findOne(cond, project);

                            case 2:
                                doc = _context3.sent;
                                return _context3.abrupt('return', doc);

                            case 4:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function findOne() {
                return _ref3.apply(this, arguments);
            }

            return findOne;
        }()
    }, {
        key: 'findById',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(id) {
                var project = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                var cond, doc;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                cond = {};

                                cond[this.pk] = id;

                                _context4.next = 4;
                                return this.findOne(cond, project);

                            case 4:
                                doc = _context4.sent;
                                return _context4.abrupt('return', doc);

                            case 6:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function findById(_x6) {
                return _ref4.apply(this, arguments);
            }

            return findById;
        }()
    }, {
        key: 'insert',
        value: function () {
            var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(data) {
                var _this = this;

                var count, result;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return this.count();

                            case 2:
                                count = _context5.sent;

                                data = data instanceof Array ? data : [data];

                                data.forEach(function (item, i) {
                                    // page_id: 'P001'
                                    item[_this.pk] = _this.newId();
                                });

                                _context5.next = 7;
                                return this.collection.insertMany(data);

                            case 7:
                                result = _context5.sent;
                                return _context5.abrupt('return', result);

                            case 9:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function insert(_x8) {
                return _ref5.apply(this, arguments);
            }

            return insert;
        }()
    }, {
        key: 'update',
        value: function () {
            var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(cond, data) {
                var result;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return this.collection.updateMany(cond, data);

                            case 2:
                                result = _context6.sent;
                                return _context6.abrupt('return', result);

                            case 4:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function update(_x9, _x10) {
                return _ref6.apply(this, arguments);
            }

            return update;
        }()
    }, {
        key: 'updateOne',
        value: function () {
            var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(cond, data) {
                var result;
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.next = 2;
                                return this.collection.updateOne(cond, data);

                            case 2:
                                result = _context7.sent;
                                return _context7.abrupt('return', result);

                            case 4:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function updateOne(_x11, _x12) {
                return _ref7.apply(this, arguments);
            }

            return updateOne;
        }()
    }, {
        key: 'updateById',
        value: function () {
            var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(id, data) {
                var cond, result;
                return _regenerator2.default.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                cond = {};

                                cond[this.pk] = id;

                                _context8.next = 4;
                                return this.updateOne(cond, data);

                            case 4:
                                result = _context8.sent;
                                return _context8.abrupt('return', result);

                            case 6:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function updateById(_x13, _x14) {
                return _ref8.apply(this, arguments);
            }

            return updateById;
        }()
    }, {
        key: 'replace',
        value: function () {
            var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(cond, data) {
                var result;
                return _regenerator2.default.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                _context9.next = 2;
                                return this.collection.replaceMany(cond, data);

                            case 2:
                                result = _context9.sent;
                                return _context9.abrupt('return', result);

                            case 4:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function replace(_x15, _x16) {
                return _ref9.apply(this, arguments);
            }

            return replace;
        }()
    }, {
        key: 'replaceOne',
        value: function () {
            var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(cond, data) {
                var result;
                return _regenerator2.default.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                _context10.next = 2;
                                return this.collection.replaceOne(cond, data);

                            case 2:
                                result = _context10.sent;
                                return _context10.abrupt('return', result);

                            case 4:
                            case 'end':
                                return _context10.stop();
                        }
                    }
                }, _callee10, this);
            }));

            function replaceOne(_x17, _x18) {
                return _ref10.apply(this, arguments);
            }

            return replaceOne;
        }()
    }, {
        key: 'replaceById',
        value: function () {
            var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(id, data) {
                var cond, result;
                return _regenerator2.default.wrap(function _callee11$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                cond = {};

                                cond[this.pk] = id;

                                _context11.next = 4;
                                return this.replaceOne(cond, data);

                            case 4:
                                result = _context11.sent;
                                return _context11.abrupt('return', result);

                            case 6:
                            case 'end':
                                return _context11.stop();
                        }
                    }
                }, _callee11, this);
            }));

            function replaceById(_x19, _x20) {
                return _ref11.apply(this, arguments);
            }

            return replaceById;
        }()
    }, {
        key: 'remove',
        value: function () {
            var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(cond) {
                var result;
                return _regenerator2.default.wrap(function _callee12$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                _context12.next = 2;
                                return this.collection.removeMany(cond);

                            case 2:
                                result = _context12.sent;
                                return _context12.abrupt('return', result);

                            case 4:
                            case 'end':
                                return _context12.stop();
                        }
                    }
                }, _callee12, this);
            }));

            function remove(_x21) {
                return _ref12.apply(this, arguments);
            }

            return remove;
        }()
    }, {
        key: 'removeOne',
        value: function () {
            var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13(cond) {
                var result;
                return _regenerator2.default.wrap(function _callee13$(_context13) {
                    while (1) {
                        switch (_context13.prev = _context13.next) {
                            case 0:
                                _context13.next = 2;
                                return this.collection.removeOne(cond);

                            case 2:
                                result = _context13.sent;
                                return _context13.abrupt('return', result);

                            case 4:
                            case 'end':
                                return _context13.stop();
                        }
                    }
                }, _callee13, this);
            }));

            function removeOne(_x22) {
                return _ref13.apply(this, arguments);
            }

            return removeOne;
        }()
    }]);
    return Model;
}();

module.exports = Model;