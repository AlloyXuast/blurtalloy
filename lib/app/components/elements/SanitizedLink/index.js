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
var _propTypes = _interopRequireDefault(require("prop-types"));
var _counterpart = _interopRequireDefault(require("counterpart"));
var _classnames = _interopRequireDefault(require("classnames"));
var _shouldComponentUpdate = _interopRequireDefault(require("app/utils/shouldComponentUpdate"));
var _Phishing = require("app/utils/Phishing");
var _reactRedux = require("react-redux");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var SanitizedLink = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(SanitizedLink, _React$Component);
  function SanitizedLink() {
    var _this;
    (0, _classCallCheck2["default"])(this, SanitizedLink);
    _this = _callSuper(this, SanitizedLink);
    // this.shouldComponentUpdate = shouldComponentUpdate(
    //     this,
    //     'SanitizedLink'
    // );
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onRevealPhishyLink", function (e) {
      e.preventDefault();
      _this.setState({
        revealPhishyLink: true
      });
    });
    _this.state = {
      revealPhishyLink: false
    };
    return _this;
  }
  (0, _createClass2["default"])(SanitizedLink, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        text = _this$props.text,
        url = _this$props.url,
        phishy_domains = _this$props.phishy_domains;
      var isPhishy = (0, _Phishing.looksPhishyDomain)(phishy_domains, url);
      var classes = (0, _classnames["default"])({
        SanitizedLink: true,
        'SanitizedLink--phishyLink': isPhishy
      });
      if (!isPhishy) {
        return /*#__PURE__*/_react["default"].createElement("a", {
          className: classes,
          href: url,
          target: "_blank",
          rel: "noopener noreferrer"
        }, text);
      }
      if (this.state.revealPhishyLink) {
        return /*#__PURE__*/_react["default"].createElement("span", {
          className: classes,
          title: (0, _counterpart["default"])('sanitizedlink_jsx.phishylink_caution')
        }, text);
      }
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: classes
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "phishylink-caution"
      }, (0, _counterpart["default"])('sanitizedlink_jsx.phishylink_caution')), /*#__PURE__*/_react["default"].createElement("span", {
        className: "phishylink-reveal-link",
        role: "button",
        onClick: this.onRevealPhishyLink
      }, (0, _counterpart["default"])('sanitizedlink_jsx.phishylink_reveal')));
    }
  }]);
  return SanitizedLink;
}(_react["default"].Component);
(0, _defineProperty2["default"])(SanitizedLink, "propTypes", {
  url: _propTypes["default"].string,
  text: _propTypes["default"].string
});
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, props) {
  var phishy_domains = state.global.getIn(['phishy_domains']) == undefined ? [] : state.global.getIn(['phishy_domains']);
  return _objectSpread(_objectSpread({}, props), {}, {
    phishy_domains: phishy_domains
  });
})(SanitizedLink);