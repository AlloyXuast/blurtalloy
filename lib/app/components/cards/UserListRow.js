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
var _reactRouter = require("react-router");
var _Follow = _interopRequireDefault(require("app/components/elements/Follow"));
var _reactRedux = require("react-redux");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var UserListRow = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(UserListRow, _React$Component);
  function UserListRow() {
    (0, _classCallCheck2["default"])(this, UserListRow);
    return _callSuper(this, UserListRow, arguments);
  }
  (0, _createClass2["default"])(UserListRow, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        user = _this$props.user,
        loggedIn = _this$props.loggedIn;
      return /*#__PURE__*/_react["default"].createElement("tr", null, loggedIn && /*#__PURE__*/_react["default"].createElement("td", {
        width: "250"
      }, /*#__PURE__*/_react["default"].createElement(_Follow["default"], {
        following: user
      })), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
        to: '/@' + user
      }, /*#__PURE__*/_react["default"].createElement("strong", null, user))));
    }
  }]);
  return UserListRow;
}(_react["default"].Component);
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, ownProps) {
  var loggedIn = state.user.hasIn(['current', 'username']);
  return _objectSpread(_objectSpread({}, ownProps), {}, {
    loggedIn: loggedIn
  });
})(UserListRow);