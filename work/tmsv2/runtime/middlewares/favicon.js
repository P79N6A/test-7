'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var send = require('koa-send');
var path = require('path');

function favicon() {
    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!ctx.path.match(/^\/favicon/)) {
                                _context.next = 5;
                                break;
                            }

                            _context.next = 3;
                            return send(ctx, ctx.path, {
                                root: path.join(__dirname, '../../')
                            });

                        case 3:
                            _context.next = 7;
                            break;

                        case 5:
                            _context.next = 7;
                            return next();

                        case 7:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
}

module.exports = favicon;