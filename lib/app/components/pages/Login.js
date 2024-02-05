"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireDefault(require("react"));
var _LoginForm = _interopRequireDefault(require("app/components/modules/LoginForm"));
var _counterpart = _interopRequireDefault(require("counterpart"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Login = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Login, _React$Component);
  function Login() {
    (0, _classCallCheck2["default"])(this, Login);
    return _callSuper(this, Login, arguments);
  }
  (0, _createClass2["default"])(Login, [{
    key: "render",
    value: function render() {
      if (!process.env.BROWSER) {
        // don't render this page on the server
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "row"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "column"
        }, (0, _counterpart["default"])('g.loading'), ".."));
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "Login row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column"
      }, /*#__PURE__*/_react["default"].createElement(_LoginForm["default"], {
        afterLoginRedirectToWelcome: true
      })));
    }
  }]);
  return Login;
}(_react["default"].Component);
module.exports = {
  path: 'login.html',
  component: Login
};