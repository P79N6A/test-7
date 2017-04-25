'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash');

function logfactory(type) {

    function log() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        if (_.isString(args[0])) {
            args[0] = '[' + type + ']: ' + args[0];
        } else {
            args = ['[' + type + ']: '].concat((0, _toConsumableArray3.default)(args));
        }
        return console[type].apply(console, args);
    }

    return log;
}

// 以dash line 的格式，输出信息
function lineLog() {
    var _console;

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    var len = args.reduce(function (result, item) {
        return result + (_.isObject(item) ? 0 : String(item).toString().length);
    }, 0);

    var line = Array(len + 1).join('-');

    console.log('\n' + line);
    (_console = console).log.apply(_console, args);
    console.log(line + '\n');
}

var logFnNames = ['log', 'warn', 'error', 'info'];
var logFns = _.zipObject(logFnNames, logFnNames.map(logfactory));

module.exports = (0, _assign2.default)({}, logFns, { lineLog: lineLog });