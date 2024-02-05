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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var ServerError = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(ServerError, _Component);
  function ServerError() {
    (0, _classCallCheck2["default"])(this, ServerError);
    return _callSuper(this, ServerError, arguments);
  }
  (0, _createClass2["default"])(ServerError, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "float-center",
        style: {
          width: '640px',
          textAlign: 'center'
        }
      }, /*#__PURE__*/_react["default"].createElement("img", {
        width: "640px",
        height: "480px",
        src: "/images/500.jpg"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          width: '300px',
          position: 'relative',
          left: '400px',
          top: '-400px',
          textAlign: 'left'
        }
      }, /*#__PURE__*/_react["default"].createElement("h4", null, "Sorry."), /*#__PURE__*/_react["default"].createElement("p", null, "Looks like something went wrong on our end."), /*#__PURE__*/_react["default"].createElement("p", null, "Head back to ", /*#__PURE__*/_react["default"].createElement("a", {
        href: "/"
      }, "Blurt"), " homepage.")));
    }
  }]);
  return ServerError;
}(_react.Component);
var _default = exports["default"] = ServerError;