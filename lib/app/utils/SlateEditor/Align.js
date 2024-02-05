"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Align = exports["default"] = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Align, _React$Component);
  function Align() {
    var _this;
    (0, _classCallCheck2["default"])(this, Align);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Align, [].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getAlignClass", function () {
      var node = _this.props.node;
      switch (node.data.get('align')) {
        case 'text-right':
          return 'text-right';
        case 'text-left':
          return 'text-left';
        case 'text-center':
          return 'text-center';
        case 'pull-right':
          return 'pull-right';
        case 'pull-left':
          return 'pull-left';
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "render", function () {
      var _this$props = _this.props,
        node = _this$props.node,
        attributes = _this$props.attributes,
        children = _this$props.children;
      var className = _this.getAlignClass();
      return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({}, attributes, {
        className: className
      }), children);
    });
    return _this;
  }
  return (0, _createClass2["default"])(Align);
}(_react["default"].Component);