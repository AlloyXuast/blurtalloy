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
var _reactRouter = require("react-router");
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* eslint react/prop-types: 0 */
var ChangePassword = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(ChangePassword, _React$Component);
  function ChangePassword() {
    (0, _classCallCheck2["default"])(this, ChangePassword);
    return _callSuper(this, ChangePassword, arguments);
  }
  (0, _createClass2["default"])(ChangePassword, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", null, (0, _counterpart["default"])('g.external_link_message'), ': ', /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
        to: "".concat($STM_Config.wallet_url)
      }, "Wallet"));
    }
  }]);
  return ChangePassword;
}(_react["default"].Component);
var _default = exports["default"] = reduxForm()(ChangePassword);