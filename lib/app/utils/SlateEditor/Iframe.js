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
var _EmbeddedPlayers = require("app/components/elements/EmbeddedPlayers");
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Iframe = exports["default"] = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Iframe, _React$Component);
  function Iframe() {
    var _this;
    (0, _classCallCheck2["default"])(this, Iframe);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Iframe, [].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "normalizeEmbedUrl", function (url) {
      var validEmbedUrl = (0, _EmbeddedPlayers.normalizeEmbedUrl)(url);
      if (validEmbedUrl !== false) {
        return validEmbedUrl;
      }
      console.log('unable to auto-detect embed url', url);
      return null;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onChange", function (e) {
      var _this$props = _this.props,
        node = _this$props.node,
        editor = _this$props.editor;
      var value = e.target.value;
      var src = _this.normalizeEmbedUrl(value) || value;
      var next = editor.getState().transform().setNodeByKey(node.key, {
        data: {
          src: src
        }
      }).apply();
      editor.onChange(next);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onClick", function (e) {
      // stop propagation so that the void node itself isn't focused, since that would unfocus the input.
      e.stopPropagation();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "render", function () {
      var _this$props2 = _this.props,
        node = _this$props2.node,
        state = _this$props2.state,
        attributes = _this$props2.attributes;
      var isFocused = state.selection.hasEdgeIn(node);
      var className = isFocused ? 'active' : null;
      var lockStyle = {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.1)'
      };
      return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({}, attributes, {
        className: className
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "videoWrapper"
      }, _this.renderFrame(), /*#__PURE__*/_react["default"].createElement("div", {
        style: lockStyle
      }, isFocused && /*#__PURE__*/_react["default"].createElement("span", null, _this.renderInput()))));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderFrame", function () {
      var src = _this.props.node.data.get('src');
      src = _this.normalizeEmbedUrl(src) || src;
      return /*#__PURE__*/_react["default"].createElement("iframe", {
        type: "text/html",
        width: "640",
        height: "360",
        src: src,
        frameBorder: "0",
        webkitallowfullscreen: true,
        mozallowfullscreen: true,
        allowfullscreen: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderInput", function () {
      var src = _this.props.node.data.get('src');
      var style = {
        fontFamily: 'Arial',
        margin: '200px auto',
        width: '90%',
        padding: '1rem 0.5rem',
        background: 'rgba(255,255,255,0.9)',
        display: 'block',
        textAlign: 'center',
        color: 'black',
        borderRadius: '5px'
      };
      return /*#__PURE__*/_react["default"].createElement("input", {
        value: src,
        onChange: _this.onChange,
        onClick: _this.onClick,
        placeholder: "Enter a YouTube or Vimeo URL...",
        style: style
      });
    });
    return _this;
  }
  return (0, _createClass2["default"])(Iframe);
}(_react["default"].Component);