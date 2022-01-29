"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _counterpart = _interopRequireDefault(require("counterpart"));

var userActions = _interopRequireWildcard(require("app/redux/UserReducer"));

var appActions = _interopRequireWildcard(require("app/redux/AppReducer"));

var _UserList = _interopRequireDefault(require("app/components/elements/UserList"));

var blurt = _interopRequireWildcard(require("@blurtfoundation/blurtjs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Settings = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Settings, _React$Component);

  var _super = _createSuper(Settings);

  function Settings(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Settings);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleDefaultBlogPayoutChange", function (event) {
      _this.props.setUserPreferences(_objectSpread(_objectSpread({}, _this.props.user_preferences), {}, {
        defaultBlogPayout: event.target.value
      }));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleDefaultCommentPayoutChange", function (event) {
      _this.props.setUserPreferences(_objectSpread(_objectSpread({}, _this.props.user_preferences), {}, {
        defaultCommentPayout: event.target.value
      }));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleDefaultCommentsSortOrderChange", function (event) {
      _this.props.setUserPreferences(_objectSpread(_objectSpread({}, _this.props.user_preferences), {}, {
        defaultCommentsSortOrder: event.target.value
      }));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleLanguageChange", function (event) {
      var locale = event.target.value;

      var userPreferences = _objectSpread(_objectSpread({}, _this.props.user_preferences), {}, {
        locale: locale
      });

      _this.props.setUserPreferences(userPreferences);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getPreferredApiEndpoint", function () {
      var preferred_api_endpoint = $STM_Config.blurtd_connection_client;

      if (typeof window !== 'undefined' && localStorage.getItem('user_preferred_api_endpoint')) {
        preferred_api_endpoint = localStorage.getItem('user_preferred_api_endpoint');
      }

      return preferred_api_endpoint;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "generateAPIEndpointOptions", function () {
      var endpoints = blurt.config.get('alternative_api_endpoints');

      if (endpoints === null || endpoints === undefined) {
        return null;
      }

      var preferred_api_endpoint = _this.getPreferredApiEndpoint();

      var entries = [];

      for (var ei = 0; ei < endpoints.length; ei += 1) {
        var endpoint = endpoints[ei]; //this one is always present even if the api config call fails

        if (endpoint !== preferred_api_endpoint) {
          var entry = /*#__PURE__*/_react["default"].createElement("option", {
            value: endpoint,
            key: endpoint
          }, endpoint);

          entries.push(entry);
        }
      }

      return entries;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handlePreferredAPIEndpointChange", function (event) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('user_preferred_api_endpoint', event.target.value);
        blurt.api.setOptions({
          url: event.target.value
        });
      }
    });
    _this.state = {
      errorMessage: '',
      successMessage: ''
    };
    _this.onNsfwPrefChange = _this.onNsfwPrefChange.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onCoalStatusChange = _this.onCoalStatusChange.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(Settings, [{
    key: "onNsfwPrefChange",
    value: function onNsfwPrefChange(e) {
      this.props.setUserPreferences(_objectSpread(_objectSpread({}, this.props.user_preferences), {}, {
        nsfwPref: e.currentTarget.value
      }));
    }
  }, {
    key: "onCoalStatusChange",
    value: function onCoalStatusChange(e) {
      this.props.setUserPreferences(_objectSpread(_objectSpread({}, this.props.user_preferences), {}, {
        coalStatus: e.currentTarget.value
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var state = this.state,
          props = this.props;
      var _this$props = this.props,
          walletUrl = _this$props.walletUrl,
          ignores = _this$props.ignores,
          account = _this$props.account,
          isOwnAccount = _this$props.isOwnAccount,
          user_preferences = _this$props.user_preferences;
      var preferred_api_endpoint = this.getPreferredApiEndpoint();
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "Settings"
      }, isOwnAccount && /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "small-12 columns"
      }, /*#__PURE__*/_react["default"].createElement("p", null, "To update your public profile, visit", ' ', /*#__PURE__*/_react["default"].createElement("a", {
        href: walletUrl + '/@' + account.name + '/settings'
      }, "blurtwallet.com"), ".")), /*#__PURE__*/_react["default"].createElement("hr", null), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", {
        className: "small-12 medium-4 large-4 columns"
      }, /*#__PURE__*/_react["default"].createElement("h4", null, (0, _counterpart["default"])('settings_jsx.preferences')), /*#__PURE__*/_react["default"].createElement("label", null, (0, _counterpart["default"])('g.choose_language'), /*#__PURE__*/_react["default"].createElement("select", {
        defaultValue: user_preferences.locale,
        onChange: this.handleLanguageChange
      }, /*#__PURE__*/_react["default"].createElement("option", {
        value: "en"
      }, "English"), /*#__PURE__*/_react["default"].createElement("option", {
        value: "es"
      }, "Spanish Espa\xF1ol"), /*#__PURE__*/_react["default"].createElement("option", {
        value: "ru"
      }, "Russian \u0440\u0443\u0441\u0441\u043A\u0438\u0439"), /*#__PURE__*/_react["default"].createElement("option", {
        value: "fr"
      }, "French fran\xE7ais"), /*#__PURE__*/_react["default"].createElement("option", {
        value: "it"
      }, "Italian italiano"), /*#__PURE__*/_react["default"].createElement("option", {
        value: "ko"
      }, "Korean \uD55C\uAD6D\uC5B4"), /*#__PURE__*/_react["default"].createElement("option", {
        value: "ja"
      }, "Japanese \u65E5\u672C\u8A9E"), /*#__PURE__*/_react["default"].createElement("option", {
        value: "pl"
      }, "Polish"), /*#__PURE__*/_react["default"].createElement("option", {
        value: "zh"
      }, "Chinese \u7B80\u4F53\u4E2D\u6587"))), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("label", null, (0, _counterpart["default"])('g.choose_preferred_endpoint'), /*#__PURE__*/_react["default"].createElement("select", {
        defaultValue: preferred_api_endpoint,
        onChange: this.handlePreferredAPIEndpointChange
      }, /*#__PURE__*/_react["default"].createElement("option", {
        value: preferred_api_endpoint
      }, preferred_api_endpoint), this.generateAPIEndpointOptions())), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("label", null, (0, _counterpart["default"])('settings_jsx.not_safe_for_work_nsfw_content')), /*#__PURE__*/_react["default"].createElement("select", {
        value: user_preferences.nsfwPref,
        onChange: this.onNsfwPrefChange
      }, /*#__PURE__*/_react["default"].createElement("option", {
        value: "hide"
      }, (0, _counterpart["default"])('settings_jsx.always_hide')), /*#__PURE__*/_react["default"].createElement("option", {
        value: "warn"
      }, (0, _counterpart["default"])('settings_jsx.always_warn')), /*#__PURE__*/_react["default"].createElement("option", {
        value: "show"
      }, (0, _counterpart["default"])('settings_jsx.always_show'))), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("label", null, (0, _counterpart["default"])('settings_jsx.coal_list')), /*#__PURE__*/_react["default"].createElement("select", {
        defaultValue: user_preferences.coalStatus || 'enabled',
        onChange: this.onCoalStatusChange
      }, /*#__PURE__*/_react["default"].createElement("option", {
        value: "enabled"
      }, (0, _counterpart["default"])('settings_jsx.enable_coal')), /*#__PURE__*/_react["default"].createElement("option", {
        value: "disabled"
      }, (0, _counterpart["default"])('settings_jsx.disable_coal'))), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("label", null, (0, _counterpart["default"])('settings_jsx.choose_default_blog_payout'), /*#__PURE__*/_react["default"].createElement("select", {
        defaultValue: user_preferences.defaultBlogPayout || '75%',
        onChange: this.handleDefaultBlogPayoutChange
      }, /*#__PURE__*/_react["default"].createElement("option", {
        value: "100%"
      }, (0, _counterpart["default"])('reply_editor.power_up_100')), /*#__PURE__*/_react["default"].createElement("option", {
        value: "75%"
      }, (0, _counterpart["default"])('reply_editor.power_up_25_75')), /*#__PURE__*/_react["default"].createElement("option", {
        value: "0%"
      }, (0, _counterpart["default"])('reply_editor.decline_payout')))), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("label", null, (0, _counterpart["default"])('settings_jsx.choose_default_comment_payout'), /*#__PURE__*/_react["default"].createElement("select", {
        defaultValue: user_preferences.defaultCommentPayout || '75%',
        onChange: this.handleDefaultCommentPayoutChange
      }, /*#__PURE__*/_react["default"].createElement("option", {
        value: "100%"
      }, (0, _counterpart["default"])('reply_editor.power_up_100')), /*#__PURE__*/_react["default"].createElement("option", {
        value: "75%"
      }, (0, _counterpart["default"])('reply_editor.power_up_25_75')), /*#__PURE__*/_react["default"].createElement("option", {
        value: "0%"
      }, (0, _counterpart["default"])('reply_editor.decline_payout')))), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("label", null, (0, _counterpart["default"])('settings_jsx.default_comments_order'), /*#__PURE__*/_react["default"].createElement("select", {
        defaultValue: user_preferences.defaultCommentsSortOrder || 'new',
        onChange: this.handleDefaultCommentsSortOrderChange
      }, /*#__PURE__*/_react["default"].createElement("option", {
        value: "new"
      }, (0, _counterpart["default"])('settings_jsx.sort_by_age')), /*#__PURE__*/_react["default"].createElement("option", {
        value: "trending"
      }, (0, _counterpart["default"])('settings_jsx.sort_by_trending')), /*#__PURE__*/_react["default"].createElement("option", {
        value: "votes"
      }, (0, _counterpart["default"])('settings_jsx.sort_by_votes')))), /*#__PURE__*/_react["default"].createElement("br", null))), ignores && ignores.size > 0 && /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "small-12 medium-6 large-6 columns"
      }, /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_UserList["default"], {
        title: (0, _counterpart["default"])('settings_jsx.muted_users'),
        users: ignores
      }))));
    }
  }]);
  return Settings;
}(_react["default"].Component);

var _default = (0, _reactRedux.connect)(function (state, ownProps) {
  var accountname = ownProps.routeParams.accountname;
  var isOwnAccount = state.user.getIn(['current', 'username'], '') == accountname;
  var ignores = isOwnAccount && state.global.getIn(['follow', 'getFollowingAsync', accountname, 'ignore_result']);
  return _objectSpread({
    accountname: accountname,
    isOwnAccount: isOwnAccount,
    ignores: ignores,
    account: state.global.getIn(['accounts', accountname]).toJS(),
    user_preferences: state.app.get('user_preferences').toJS(),
    walletUrl: state.app.get('walletUrl')
  }, ownProps);
}, function (dispatch) {
  return {
    changeLanguage: function changeLanguage(language) {
      dispatch(userActions.changeLanguage(language));
    },
    setUserPreferences: function setUserPreferences(payload) {
      dispatch(appActions.setUserPreferences(payload));
    }
  };
})(Settings);

exports["default"] = _default;