'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model = require('./model');

var PageModel = function (_Model) {
    (0, _inherits3.default)(PageModel, _Model);

    function PageModel() {
        var _ref;

        (0, _classCallCheck3.default)(this, PageModel);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return (0, _possibleConstructorReturn3.default)(this, (_ref = PageModel.__proto__ || (0, _getPrototypeOf2.default)(PageModel)).call.apply(_ref, [this].concat(args)));
    }

    return PageModel;
}(Model);

module.exports = new PageModel('TmsPages', 'page_id');