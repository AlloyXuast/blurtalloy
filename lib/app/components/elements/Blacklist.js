"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _Icon = _interopRequireDefault(require("./Icon"));
var _HelpTip = _interopRequireDefault(require("./HelpTip"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Blacklist = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(Blacklist, _Component);
  function Blacklist() {
    (0, _classCallCheck2["default"])(this, Blacklist);
    return _callSuper(this, Blacklist, arguments);
  }
  (0, _createClass2["default"])(Blacklist, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        blacklist = _this$props.blacklist,
        author = _this$props.author,
        coalStatus = _this$props.coalStatus; // redux

      if (coalStatus === 'enabled') {
        var blacklisted = blacklist.get(author);
        if (blacklisted !== undefined) {
          var description = /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("strong", null, "Reason Code: "), blacklisted.reason, /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("strong", null, "Notes: "), blacklisted.notes, /*#__PURE__*/_react["default"].createElement("br", null), "If you believe this to be an error, please contact us in #appeals channel in the", ' ', /*#__PURE__*/_react["default"].createElement("a", {
            href: "https://discord.blurt.world"
          }, "Blurt Discord server"), ".");
          return /*#__PURE__*/_react["default"].createElement(_HelpTip["default"], {
            content: description
          }, /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
            name: "alert"
          }));
        }
      }
      return null;
    }
  }]);
  return Blacklist;
}(_react.Component); // eslint-disable-next-line no-unused-vars
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, ownProps) {
  var userPreferences = state.app.get('user_preferences').toJS();
  var coalStatus = userPreferences.coalStatus || 'enabled';
  var blacklist = state.global.getIn(['blacklist']) == undefined ? undefined : state.global.getIn(['blacklist']);
  return {
    blacklist: blacklist,
    coalStatus: coalStatus
  };
})(Blacklist);