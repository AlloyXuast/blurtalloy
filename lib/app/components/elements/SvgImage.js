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
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var SvgImage = exports["default"] = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(SvgImage, _React$Component);
  function SvgImage() {
    (0, _classCallCheck2["default"])(this, SvgImage);
    return _callSuper(this, SvgImage, arguments);
  }
  (0, _createClass2["default"])(SvgImage, [{
    key: "render",
    value: function render() {
      var style = {
        display: 'inline-block',
        width: this.props.width,
        height: this.props.height
      };
      var image = require("assets/images/".concat(this.props.name, ".svg"));
      var cn = 'SvgImage' + (this.props.className ? ' ' + this.props.className : '');
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: cn,
        style: style,
        dangerouslySetInnerHTML: {
          __html: image
        }
      });
    }
  }]);
  return SvgImage;
}(_react["default"].Component);
(0, _defineProperty2["default"])(SvgImage, "propTypes", {
  name: _propTypes["default"].string.isRequired,
  width: _propTypes["default"].string.isRequired,
  height: _propTypes["default"].string.isRequired,
  className: _propTypes["default"].string
});