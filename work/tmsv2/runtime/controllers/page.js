'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var fs = require('fs');
var WS = require('../helper');
var config = require('../config');

var Controller = require('./controller');

var PageCtrl = function (_Controller) {
    (0, _inherits3.default)(PageCtrl, _Controller);

    function PageCtrl() {
        var _ref;

        (0, _classCallCheck3.default)(this, PageCtrl);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return (0, _possibleConstructorReturn3.default)(this, (_ref = PageCtrl.__proto__ || (0, _getPrototypeOf2.default)(PageCtrl)).call.apply(_ref, [this].concat(args)));
    }

    (0, _createClass3.default)(PageCtrl, [{
        key: 'publish',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
                var _this2 = this;

                var id, data, fileName, fpath, handleData, dumpJson, done;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                // 发布

                                id = ctx.query.id;

                                WS.assert.notEqual(id, null, '缺少必要参数:id');

                                _context2.next = 4;
                                return this.model.init(ctx).findById(id);

                            case 4:
                                data = _context2.sent;

                                WS.assert.notEqual(data, null, '\u6CA1\u6709\u6570\u636Eid=' + id);

                                fileName = (data.page_name || 'unknown') + '.json';
                                fpath = path.join(config.publishedPath, fileName);

                                handleData = function handleData(data) {
                                    delete data._id;
                                    delete data.publish;

                                    // data = { layout_main: [{dist: {}}, ..]} -> data = { layout_main: [ dist, ..]}
                                    if (data.layout_main) {
                                        data.layout_main = data.layout_main.map(function (layout) {
                                            return layout.dist || layout;
                                        });
                                    }

                                    return data;
                                };

                                dumpJson = function () {
                                    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                                        var err, result;
                                        return _regenerator2.default.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        err = fs.writeFileSync(fpath, (0, _stringify2.default)(data, null, 4), 'utf8');

                                                        if (!err) {
                                                            _context.next = 5;
                                                            break;
                                                        }

                                                        WS.error(' write file error :', err);
                                                        _context.next = 9;
                                                        break;

                                                    case 5:
                                                        _context.next = 7;
                                                        return _this2.model.init(ctx).updateById(id, { $set: { publish: { ok: true } } });

                                                    case 7:
                                                        result = _context.sent;

                                                        ctx.body = WS.resJson(true, { id: id, result: result });

                                                    case 9:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, _this2);
                                    }));

                                    return function dumpJson() {
                                        return _ref3.apply(this, arguments);
                                    };
                                }();

                                handleData(data);

                                _context2.next = 13;
                                return WS.ensurePath(fpath, dumpJson);

                            case 13:
                                done = _context2.sent;

                                if (!done) {
                                    _context2.next = 19;
                                    break;
                                }

                                _context2.next = 17;
                                return dumpJson();

                            case 17:
                                _context2.next = 20;
                                break;

                            case 19:
                                ctx.body = WS.resJson(false, { reason: '创建路径的文件夹失败..' });

                            case 20:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function publish(_x, _x2) {
                return _ref2.apply(this, arguments);
            }

            return publish;
        }()
    }]);
    return PageCtrl;
}(Controller);

module.exports = new PageCtrl('page');