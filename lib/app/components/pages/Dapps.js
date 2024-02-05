"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireDefault(require("react"));
var _DappsList = _interopRequireDefault(require("../cards/DappsList"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* eslint-disable import/no-import-module-exports */
var Dapps = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Dapps, _React$Component);
  function Dapps() {
    (0, _classCallCheck2["default"])(this, Dapps);
    return _callSuper(this, Dapps, arguments);
  }
  (0, _createClass2["default"])(Dapps, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "text-center"
      }, /*#__PURE__*/_react["default"].createElement("h2", null, "dApps and Tools on Blurt Ecosystem"), /*#__PURE__*/_react["default"].createElement("hr", null), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column"
      }, /*#__PURE__*/_react["default"].createElement(_DappsList["default"], null))));
    }
  }]);
  return Dapps;
}(_react["default"].Component);
module.exports = {
  path: 'dapps',
  component: Dapps
};