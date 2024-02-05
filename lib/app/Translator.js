"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.FormattedHTMLMessage = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _reactIntl = require("react-intl");
var _en = _interopRequireDefault(require("react-intl/locale-data/en"));
var _es = _interopRequireDefault(require("react-intl/locale-data/es"));
var _ru = _interopRequireDefault(require("react-intl/locale-data/ru"));
var _fr = _interopRequireDefault(require("react-intl/locale-data/fr"));
var _it = _interopRequireDefault(require("react-intl/locale-data/it"));
var _ko = _interopRequireDefault(require("react-intl/locale-data/ko"));
var _zh = _interopRequireDefault(require("react-intl/locale-data/zh"));
var _pl = _interopRequireDefault(require("react-intl/locale-data/pl"));
var _ja = _interopRequireDefault(require("react-intl/locale-data/ja"));
var _client_config = require("app/client_config");
var _counterpart = _interopRequireDefault(require("counterpart"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
(0, _reactIntl.addLocaleData)([].concat((0, _toConsumableArray2["default"])(_en["default"]), (0, _toConsumableArray2["default"])(_es["default"]), (0, _toConsumableArray2["default"])(_ru["default"]), (0, _toConsumableArray2["default"])(_fr["default"]), (0, _toConsumableArray2["default"])(_it["default"]), (0, _toConsumableArray2["default"])(_ko["default"]), (0, _toConsumableArray2["default"])(_zh["default"]), (0, _toConsumableArray2["default"])(_pl["default"]), (0, _toConsumableArray2["default"])(_ja["default"])));
_counterpart["default"].registerTranslations('en', require('counterpart/locales/en'));
_counterpart["default"].registerTranslations('en', require('app/locales/en.json'));
_counterpart["default"].registerTranslations('es', require('app/locales/counterpart/es'));
_counterpart["default"].registerTranslations('es', require('app/locales/es.json'));
_counterpart["default"].registerTranslations('ru', require('counterpart/locales/ru'));
_counterpart["default"].registerTranslations('ru', require('app/locales/ru.json'));
_counterpart["default"].registerTranslations('fr', require('app/locales/counterpart/fr'));
_counterpart["default"].registerTranslations('fr', require('app/locales/fr.json'));
_counterpart["default"].registerTranslations('it', require('app/locales/counterpart/it'));
_counterpart["default"].registerTranslations('it', require('app/locales/it.json'));
_counterpart["default"].registerTranslations('ko', require('app/locales/counterpart/ko'));
_counterpart["default"].registerTranslations('ko', require('app/locales/ko.json'));
_counterpart["default"].registerTranslations('zh', require('app/locales/counterpart/zh'));
_counterpart["default"].registerTranslations('zh', require('app/locales/zh.json'));
_counterpart["default"].registerTranslations('pl', require('app/locales/counterpart/pl'));
_counterpart["default"].registerTranslations('pl', require('app/locales/pl.json'));
_counterpart["default"].registerTranslations('ja', require('app/locales/counterpart/ja'));
_counterpart["default"].registerTranslations('ja', require('app/locales/ja.json'));
if (process.env.NODE_ENV === 'production') {
  _counterpart["default"].setFallbackLocale('en');
}
var Translator = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Translator, _React$Component);
  function Translator() {
    (0, _classCallCheck2["default"])(this, Translator);
    return _callSuper(this, Translator, arguments);
  }
  (0, _createClass2["default"])(Translator, [{
    key: "render",
    value: function render() {
      var language = this.props.locale;
      _counterpart["default"].setLocale(language);
      return /*#__PURE__*/_react["default"].createElement(_reactIntl.IntlProvider
      // to ensure dynamic language change, "key" property with same "locale" info must be added
      // see: https://github.com/yahoo/react-intl/wiki/Components#multiple-intl-contexts
      , {
        key: language,
        locale: language,
        defaultLocale: _client_config.DEFAULT_LANGUAGE
      }, this.props.children);
    }
  }]);
  return Translator;
}(_react["default"].Component);
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, ownProps) {
  var locale = state.app.getIn(['user_preferences', 'locale']);
  return _objectSpread(_objectSpread({}, ownProps), {}, {
    locale: locale
  });
})(Translator);
var FormattedHTMLMessage = exports.FormattedHTMLMessage = function FormattedHTMLMessage(_ref) {
  var id = _ref.id,
    params = _ref.params,
    className = _ref.className;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: 'FormattedHTMLMessage' + (className ? " ".concat(className) : ''),
    dangerouslySetInnerHTML: {
      __html: (0, _counterpart["default"])(id, params)
    }
  });
};