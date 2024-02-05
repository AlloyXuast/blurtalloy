"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireDefault(require("react"));
var _HelpContent = _interopRequireDefault(require("app/components/elements/HelpContent"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Tos = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Tos, _React$Component);
  function Tos() {
    (0, _classCallCheck2["default"])(this, Tos);
    return _callSuper(this, Tos, arguments);
  }
  (0, _createClass2["default"])(Tos, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column large-8 medium-10 small-12"
      }, /*#__PURE__*/_react["default"].createElement(_HelpContent["default"], {
        path: "tos",
        title: "Terms of Service"
      })));
    }
  }]);
  return Tos;
}(_react["default"].Component);
module.exports = {
  component: Tos,
  path: 'tos.html'
};