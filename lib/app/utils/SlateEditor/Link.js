"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Link = exports["default"] = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Link, _React$Component);
  function Link() {
    var _this;
    (0, _classCallCheck2["default"])(this, Link);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Link, [].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {});
    return _this;
  }
  (0, _createClass2["default"])(Link, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        node = _this$props.node,
        state = _this$props.state,
        attributes = _this$props.attributes,
        children = _this$props.children;
      var isFocused = state.selection.hasEdgeIn(node);
      var className = isFocused ? 'active' : null;
      var href = node.data.get('href');
      return /*#__PURE__*/_react["default"].createElement("a", (0, _extends2["default"])({}, attributes, {
        href: href,
        className: className
      }), children);
    }
  }]);
  return Link;
}(_react["default"].Component);