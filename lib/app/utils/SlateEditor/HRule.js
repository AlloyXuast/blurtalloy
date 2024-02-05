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
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var HRule = exports["default"] = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(HRule, _React$Component);
  function HRule() {
    (0, _classCallCheck2["default"])(this, HRule);
    return _callSuper(this, HRule, arguments);
  }
  (0, _createClass2["default"])(HRule, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        node = _this$props.node,
        state = _this$props.state;
      var isFocused = state.selection.hasEdgeIn(node);
      var className = isFocused ? 'active' : null;
      return /*#__PURE__*/_react["default"].createElement("hr", {
        className: className
      });
    }
  }]);
  return HRule;
}(_react["default"].Component);