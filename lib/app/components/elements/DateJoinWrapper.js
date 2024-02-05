"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireDefault(require("react"));
var _counterpart = _interopRequireDefault(require("counterpart"));
var _reactIntl = require("react-intl");
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var DateJoinWrapper = exports["default"] = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(DateJoinWrapper, _React$Component);
  function DateJoinWrapper() {
    (0, _classCallCheck2["default"])(this, DateJoinWrapper);
    return _callSuper(this, DateJoinWrapper, arguments);
  }
  (0, _createClass2["default"])(DateJoinWrapper, [{
    key: "render",
    value: function render() {
      var date = new Date(this.props.date === '1970-01-01T00:00:00' ? '2020-07-04T00:00:00' : this.props.date);
      return /*#__PURE__*/_react["default"].createElement("span", null, (0, _counterpart["default"])('g.joined'), ' ', /*#__PURE__*/_react["default"].createElement(_reactIntl.FormattedDate, {
        value: new Date(date),
        year: "numeric",
        month: "long"
      }));
    }
  }]);
  return DateJoinWrapper;
}(_react["default"].Component);