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
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRouter = require("react-router");
var _Icon = _interopRequireDefault(require("app/components/elements/Icon"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var ShareMenu = exports["default"] = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(ShareMenu, _React$Component);
  function ShareMenu() {
    (0, _classCallCheck2["default"])(this, ShareMenu);
    return _callSuper(this, ShareMenu, arguments);
  }
  (0, _createClass2["default"])(ShareMenu, [{
    key: "render",
    value: function render() {
      var title = this.props.title;
      var items = this.props.menu;
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: 'shareMenu'
      }, /*#__PURE__*/_react["default"].createElement("ul", {
        className: 'shareItems'
      }, title && /*#__PURE__*/_react["default"].createElement("li", {
        className: "title"
      }, title), items.map(function (i) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          key: i.value
        }, i.link ? /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
          to: i.link,
          onClick: i.onClick,
          title: i.title
        }, i.icon && /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
          name: i.icon
        }), "\xA0 ", i.addon) : /*#__PURE__*/_react["default"].createElement("span", null, i.icon && /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
          name: i.icon
        }), i.label ? i.label : i.value));
      })));
    }
  }]);
  return ShareMenu;
}(_react["default"].Component);
(0, _defineProperty2["default"])(ShareMenu, "propTypes", {
  menu: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
  title: _propTypes["default"].string
});