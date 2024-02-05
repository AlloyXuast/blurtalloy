"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* eslint react/prop-types: 0 */
var UserWallet = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(UserWallet, _React$Component);
  function UserWallet() {
    (0, _classCallCheck2["default"])(this, UserWallet);
    return _callSuper(this, UserWallet, arguments);
  }
  (0, _createClass2["default"])(UserWallet, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        account = _this$props.account,
        walletUrl = _this$props.walletUrl;
      if (!account) return null;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "UserWallet"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "wallet-link row zebra"
      }, /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("a", {
        href: walletUrl
      }, "Go to wallet"))));
    }
  }]);
  return UserWallet;
}(_react["default"].Component);
var _default = exports["default"] = (0, _reactRedux.connect)(
// mapStateToProps
function (state, ownProps) {
  var walletUrl = state.app.get('walletUrl');
  return _objectSpread({
    walletUrl: walletUrl
  }, ownProps);
})(UserWallet);