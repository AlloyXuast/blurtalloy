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
var _reactRedux = require("react-redux");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var GoogleAd = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(GoogleAd, _React$Component);
  function GoogleAd() {
    (0, _classCallCheck2["default"])(this, GoogleAd);
    return _callSuper(this, GoogleAd, arguments);
  }
  (0, _createClass2["default"])(GoogleAd, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.shouldSeeAds) {
        return;
      }
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.props.shouldSeeAds) {
        return null;
      }
      var style = Object.assign({
        display: 'inline-block',
        width: '100%'
      }, this.props.style || {});
      var className = ['adsbygoogle'].concat(this.props.env === 'development' ? ['ad-dev'] : []).concat(this.props.name ? [this.props.name] : []).join(' ');
      return /*#__PURE__*/_react["default"].createElement("ins", {
        className: className,
        style: style,
        "data-adtest": this.props.test,
        "data-ad-client": this.props.client,
        "data-ad-slot": this.props.slot,
        "data-ad-format": this.props.format || 'auto',
        "data-ad-layout-key": this.props.layoutKey,
        "data-full-width-responsive": this.props.fullWidthResponsive
      });
    }
  }]);
  return GoogleAd;
}(_react["default"].Component);
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, ownProps) {
  var env = state.app.get('env');
  var shouldSeeAds = state.app.getIn(['googleAds', 'enabled']);
  var test = state.app.getIn(['googleAds', 'test']);
  var client = state.app.getIn(['googleAds', 'client']);
  return _objectSpread({
    env: env,
    shouldSeeAds: shouldSeeAds,
    test: test,
    client: client
  }, ownProps);
})(GoogleAd);