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
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* eslint-disable react/no-string-refs */ /* eslint-disable react/no-find-dom-node */ /* eslint-disable react/forbid-prop-types */ /* eslint-disable react/static-property-placement */
var HelpTip = exports["default"] = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(HelpTip, _React$Component);
  function HelpTip(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, HelpTip);
    _this = _callSuper(this, HelpTip, [props]);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "show", function () {
      return _this.setVisibility(true);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "hide", function () {
      return _this.setVisibility(false);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "setVisibility", function (visible) {
      _this.setState({
        visible: visible
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleTouch", function () {
      _this.show();
      _this.assignOutsideTouchHandler();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "assignOutsideTouchHandler", function () {
      var handler = function handler(e) {
        var currentNode = e.target;
        var componentNode = _reactDom["default"].findDOMNode(_this.refs.instance);
        while (currentNode.parentNode) {
          if (currentNode === componentNode) return;
          currentNode = currentNode.parentNode;
        }
        if (currentNode !== document) return;
        _this.hide();
        document.removeEventListener('touchstart', handler);
      };
      document.addEventListener('touchstart', handler);
    });
    _this.state = {
      visible: false
    };
    return _this;
  }
  (0, _createClass2["default"])(HelpTip, [{
    key: "render",
    value: function render() {
      var props = this.props,
        state = this.state,
        show = this.show,
        hide = this.hide,
        handleTouch = this.handleTouch;
      return /*#__PURE__*/_react["default"].createElement("div", {
        onMouseEnter: show,
        onMouseLeave: hide,
        onTouchStart: handleTouch,
        ref: "helptip",
        className: "helptip"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "helptip__target"
      }, props.children), state.visible && /*#__PURE__*/_react["default"].createElement("div", {
        ref: "helptip",
        className: "helptip__box"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        ref: "helptip-content",
        className: "helptip__box-content"
      }, props.content)));
    }
  }]);
  return HelpTip;
}(_react["default"].Component);
(0, _defineProperty2["default"])(HelpTip, "propTypes", {
  children: _propTypes["default"].any.isRequired,
  content: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].array, _propTypes["default"].object]).isRequired
});