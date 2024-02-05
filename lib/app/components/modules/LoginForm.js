"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _immutable = require("immutable");
var transactionActions = _interopRequireWildcard(require("app/redux/TransactionReducer"));
var globalActions = _interopRequireWildcard(require("app/redux/GlobalReducer"));
var userActions = _interopRequireWildcard(require("app/redux/UserReducer"));
var _ChainValidation = require("app/utils/ChainValidation");
var _SteemKeychain = require("app/utils/SteemKeychain");
var _BrowserTests = _interopRequireDefault(require("app/utils/BrowserTests"));
var _shouldComponentUpdate = _interopRequireDefault(require("app/utils/shouldComponentUpdate"));
var _ReactForm = _interopRequireDefault(require("app/utils/ReactForm"));
var _ServerApiClient = require("app/utils/ServerApiClient");
var _counterpart = _interopRequireDefault(require("counterpart"));
var _client_config = require("app/client_config");
var _ecc = require("@blurtfoundation/blurtjs/lib/auth/ecc");
var _constants = require("shared/constants");
var _PdfDownload = _interopRequireDefault(require("app/components/elements/PdfDownload"));
var _UserUtil = require("app/utils/UserUtil");
var _reactRouter = require("react-router");
var _reactRedux = require("react-redux");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* eslint react/prop-types: 0 */
var LoginForm = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(LoginForm, _Component);
  function LoginForm(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, LoginForm);
    _this = _callSuper(this, LoginForm);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "shouldComponentUpdate", (0, _shouldComponentUpdate["default"])((0, _assertThisInitialized2["default"])(_this), 'LoginForm'));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "useKeychainToggle", function () {
      var useKeychain = _this.state.useKeychain;
      useKeychain.props.onChange(!useKeychain.value);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "saveLoginToggle", function () {
      var saveLogin = _this.state.saveLogin;
      saveLoginDefault = !saveLoginDefault;
      localStorage.setItem('saveLogin', saveLoginDefault ? 'yes' : 'no');
      saveLogin.props.onChange(saveLoginDefault); // change UI
    });
    var cryptoTestResult = (0, _BrowserTests["default"])();
    var cryptographyFailure = false;
    _this.SignUp = _this.SignUp.bind((0, _assertThisInitialized2["default"])(_this));
    if (cryptoTestResult !== undefined) {
      console.error('CreateAccount - cryptoTestResult: ', cryptoTestResult);
      cryptographyFailure = true;
    }
    _this.state = {
      cryptographyFailure: cryptographyFailure
    };
    _this.usernameOnChange = function (e) {
      var value = e.target.value.toLowerCase();
      _this.state.username.props.onChange(value);
    };
    _this.onCancel = function (e) {
      if (e.preventDefault) e.preventDefault();
      var _this$props = _this.props,
        onCancel = _this$props.onCancel,
        loginBroadcastOperation = _this$props.loginBroadcastOperation;
      var errorCallback = loginBroadcastOperation && loginBroadcastOperation.get('errorCallback');
      if (errorCallback) errorCallback('Canceled');
      if (onCancel) onCancel();
    };
    _this.qrReader = function () {
      var qrReader = props.qrReader;
      var password = _this.state.password;
      qrReader(function (data) {
        password.props.onChange(data);
      });
    };
    _this.initForm(props);
    return _this;
  }
  (0, _createClass2["default"])(LoginForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.refs.username && !this.refs.username.value) {
        this.refs.username.focus();
      }
      if (this.refs.username && this.refs.username.value) {
        this.refs.pw.focus();
      }

      // fix login redirect for logged in user
      var data = localStorage.getItem('autopost2');
      if (data) {
        var _extractLoginData = (0, _UserUtil.extractLoginData)(data),
          _extractLoginData2 = (0, _slicedToArray2["default"])(_extractLoginData, 1),
          username = _extractLoginData2[0];
        var feedURL = '/@' + username + '/feed';
        if (feedURL && document.location.pathname === '/') {
          _reactRouter.browserHistory.push(feedURL);
        } else {
          _reactRouter.browserHistory.push('/@' + username + '/feed');
        }
      }
    }
  }, {
    key: "initForm",
    value: function initForm(props) {
      (0, _ReactForm["default"])({
        name: 'login',
        instance: this,
        fields: ['username', 'password', 'saveLogin:checked', 'useKeychain:checked'],
        initialValues: props.initialValues,
        validation: function validation(values) {
          return {
            username: !values.username ? (0, _counterpart["default"])('g.required') : (0, _ChainValidation.validate_account_name)(values.username.split('/')[0]),
            password: values.useKeychain ? null : !values.password ? (0, _counterpart["default"])('g.required') : _ecc.PublicKey.fromString(values.password) ? (0, _counterpart["default"])('loginform_jsx.you_need_a_private_password_or_key') : null
          };
        }
      });
    }
  }, {
    key: "SignUp",
    value: function SignUp() {
      var onType = document.getElementsByClassName('OpAction')[0].textContent;
      (0, _ServerApiClient.serverApiRecordEvent)('FreeMoneySignUp', onType);
      window.location.href = _constants.SIGNUP_URL;
    }
  }, {
    key: "GetKeychain",
    value: function GetKeychain() {
      window.location.href = _constants.KEYCHAIN_URL;
    }
  }, {
    key: "render",
    value: function render() {
      if (!process.env.BROWSER) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "row"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "column"
        }, /*#__PURE__*/_react["default"].createElement("p", null, "loading...")));
      }
      if (this.state.cryptographyFailure) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "row"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "column"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "callout alert"
        }, /*#__PURE__*/_react["default"].createElement("h4", null, (0, _counterpart["default"])('loginform_jsx.cryptography_test_failed')), /*#__PURE__*/_react["default"].createElement("p", null, (0, _counterpart["default"])('loginform_jsx.unable_to_log_you_in')), /*#__PURE__*/_react["default"].createElement("p", null, (0, _counterpart["default"])('loginform_jsx.the_latest_versions_of'), ' ', /*#__PURE__*/_react["default"].createElement("a", {
          href: "https://www.google.com/chrome/"
        }, "Chrome"), ' ', (0, _counterpart["default"])('g.and'), ' ', /*#__PURE__*/_react["default"].createElement("a", {
          href: "https://www.mozilla.org/en-US/firefox/new/"
        }, "Firefox"), ' ', (0, _counterpart["default"])('loginform_jsx.are_well_tested_and_known_to_work_with', {
          APP_URL: _client_config.APP_URL
        })))));
      }
      if ($STM_Config.read_only_mode) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "row"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "column"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "callout alert"
        }, /*#__PURE__*/_react["default"].createElement("p", null, (0, _counterpart["default"])('loginform_jsx.due_to_server_maintenance')))));
      }
      var _this$props2 = this.props,
        walletUrl = _this$props2.walletUrl,
        showLoginWarning = _this$props2.showLoginWarning,
        loginBroadcastOperation = _this$props2.loginBroadcastOperation,
        dispatchSubmit = _this$props2.dispatchSubmit,
        reallySubmit = _this$props2.reallySubmit,
        hideWarning = _this$props2.hideWarning,
        afterLoginRedirectToWelcome = _this$props2.afterLoginRedirectToWelcome,
        msg = _this$props2.msg;
      var _this$state = this.state,
        username = _this$state.username,
        password = _this$state.password,
        useKeychain = _this$state.useKeychain,
        saveLogin = _this$state.saveLogin;
      var _this$state$login = this.state.login,
        submitting = _this$state$login.submitting,
        valid = _this$state$login.valid,
        handleSubmit = _this$state$login.handleSubmit;
      var usernameOnChange = this.usernameOnChange,
        onCancel = this.onCancel;
      var disabled = submitting || !valid;
      var opType = loginBroadcastOperation ? loginBroadcastOperation.get('type') : null;
      var postType = '';
      if (opType === 'vote') {
        postType = (0, _counterpart["default"])('loginform_jsx.login_to_vote');
      } else if (opType === 'custom_json' && loginBroadcastOperation.getIn(['operation', 'id']) === 'follow') {
        postType = 'Login to Follow Users';
      } else if (loginBroadcastOperation) {
        // check for post or comment in operation
        postType = loginBroadcastOperation.getIn(['operation', 'title']) ? (0, _counterpart["default"])('loginform_jsx.login_to_post') : (0, _counterpart["default"])('g.confirm_password');
      }
      var title = postType || (0, _counterpart["default"])('g.login');
      var authType = /^vote|comment/.test(opType) ? (0, _counterpart["default"])('loginform_jsx.posting') : (0, _counterpart["default"])('loginform_jsx.active_or_owner');
      var submitLabel = showLoginWarning ? (0, _counterpart["default"])('loginform_jsx.continue_anyway') : loginBroadcastOperation ? (0, _counterpart["default"])('g.sign_in') : (0, _counterpart["default"])('g.login');
      var error = password.touched && password.error ? password.error : this.props.loginError;
      if (error === 'owner_login_blocked') {
        error = /*#__PURE__*/_react["default"].createElement("span", null, (0, _counterpart["default"])('loginform_jsx.this_password_is_bound_to_your_account_owner_key'), ' ', (0, _counterpart["default"])('loginform_jsx.however_you_can_use_it_to'), (0, _counterpart["default"])('loginform_jsx.update_your_password'), ' ', (0, _counterpart["default"])('loginform_jsx.to_obtain_a_more_secure_set_of_keys'));
      } else if (error === 'active_login_blocked') {
        error = /*#__PURE__*/_react["default"].createElement("span", null, (0, _counterpart["default"])('loginform_jsx.this_password_is_bound_to_your_account_active_key'));
      }
      var message = null;
      if (msg) {
        if (msg === 'accountcreated') {
          message = /*#__PURE__*/_react["default"].createElement("div", {
            className: "callout primary"
          }, /*#__PURE__*/_react["default"].createElement("p", null, (0, _counterpart["default"])('loginform_jsx.you_account_has_been_successfully_created')));
        } else if (msg === 'passwordupdated') {
          message = /*#__PURE__*/_react["default"].createElement("div", {
            className: "callout primary"
          }, /*#__PURE__*/_react["default"].createElement("p", null, (0, _counterpart["default"])('loginform_jsx.password_update_succes', {
            accountName: username.value
          })));
        }
      }
      var password_info = !useKeychain.value && checkPasswordChecksum(password.value) === false ? (0, _counterpart["default"])('loginform_jsx.password_info') : null;
      var titleText = /*#__PURE__*/_react["default"].createElement("h3", null, (0, _counterpart["default"])('loginform_jsx.returning_users'), /*#__PURE__*/_react["default"].createElement("span", {
        className: "OpAction"
      }, title));
      var signupLink = /*#__PURE__*/_react["default"].createElement("div", {
        className: "sign-up"
      }, /*#__PURE__*/_react["default"].createElement("hr", null), /*#__PURE__*/_react["default"].createElement("p", null, (0, _counterpart["default"])('loginform_jsx.join_our'), ' ', /*#__PURE__*/_react["default"].createElement("em", null, (0, _counterpart["default"])('loginform_jsx.amazing_community')), (0, _counterpart["default"])('loginform_jsx.to_comment_and_reward_others')), /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        className: "button hollow",
        onClick: this.SignUp
      }, (0, _counterpart["default"])('loginform_jsx.sign_up_get_steem')), /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        className: "button hollow",
        onClick: this.GetKeychain,
        style: {
          "float": 'right'
        }
      }, (0, _counterpart["default"])('loginform_jsx.get_keychain')));
      var form = /*#__PURE__*/_react["default"].createElement("form", {
        onSubmit: handleSubmit(function (_ref) {
          var data = _ref.data;
          // bind redux-form to react-redux
          console.log('Login\tdispatchSubmit');
          return dispatchSubmit(data, useKeychain.value, loginBroadcastOperation, afterLoginRedirectToWelcome);
        }),
        onChange: this.props.clearError,
        method: "post"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "input-group"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "input-group-label"
      }, "@"), /*#__PURE__*/_react["default"].createElement("input", (0, _extends2["default"])({
        className: "input-group-field",
        type: "text",
        required: true,
        placeholder: (0, _counterpart["default"])('loginform_jsx.enter_your_username'),
        ref: "username"
      }, username.props, {
        onChange: usernameOnChange,
        autoComplete: "on",
        disabled: submitting
      }))), username.touched && username.blur && username.error ? /*#__PURE__*/_react["default"].createElement("div", {
        className: "error"
      }, username.error, "\xA0") : null, useKeychain.value ? /*#__PURE__*/_react["default"].createElement("div", null, error && /*#__PURE__*/_react["default"].createElement("div", {
        className: "error"
      }, error, "\xA0")) : /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("input", (0, _extends2["default"])({
        type: "password",
        required: true,
        ref: "pw",
        placeholder: (0, _counterpart["default"])('loginform_jsx.password_or_wif')
      }, password.props, {
        autoComplete: "on",
        disabled: submitting
      })), error && /*#__PURE__*/_react["default"].createElement("div", {
        className: "error"
      }, error, "\xA0"), error && password_info && /*#__PURE__*/_react["default"].createElement("div", {
        className: "warning"
      }, password_info, "\xA0")), loginBroadcastOperation && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "info"
      }, (0, _counterpart["default"])('loginform_jsx.this_operation_requires_your_key_or_master_password', {
        authType: authType
      }))), (0, _SteemKeychain.hasCompatibleKeychain)() && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
        className: "LoginForm__save-login",
        htmlFor: "useKeychain"
      }, /*#__PURE__*/_react["default"].createElement("input", (0, _extends2["default"])({
        id: "useKeychain",
        type: "checkbox",
        ref: "pw"
      }, useKeychain.props, {
        onChange: this.useKeychainToggle,
        disabled: submitting
      })), (0, _counterpart["default"])('loginform_jsx.use_keychain'))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
        className: "LoginForm__save-login",
        htmlFor: "saveLogin"
      }, /*#__PURE__*/_react["default"].createElement("input", (0, _extends2["default"])({
        id: "saveLogin",
        type: "checkbox",
        ref: "pw"
      }, saveLogin.props, {
        onChange: this.saveLoginToggle,
        disabled: submitting
      })), (0, _counterpart["default"])('loginform_jsx.keep_me_logged_in'))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "login-modal-buttons"
      }, /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("button", {
        type: "submit",
        disabled: submitting || disabled,
        className: "button block-button"
      }, submitLabel), this.props.onCancel && /*#__PURE__*/_react["default"].createElement("button", {
        type: "button float-right",
        disabled: submitting,
        className: "button hollow",
        onClick: onCancel
      }, (0, _counterpart["default"])('g.cancel'))), signupLink);
      var loginWarningTitleText = /*#__PURE__*/_react["default"].createElement("h3", null, (0, _counterpart["default"])('loginform_jsx.login_warning_title'));
      var loginWarningForm = /*#__PURE__*/_react["default"].createElement("form", {
        onSubmit: handleSubmit(function () {
          console.log('Login\treallySubmit');
          var data = {
            username: username.value,
            password: password.value,
            saveLogin: saveLogin.value,
            loginBroadcastOperation: loginBroadcastOperation
          };
          reallySubmit(data, afterLoginRedirectToWelcome);
        }),
        method: "post"
      }, /*#__PURE__*/_react["default"].createElement("p", null, (0, _counterpart["default"])('loginform_jsx.login_warning_body')), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_PdfDownload["default"], {
        name: username.value,
        password: password.value,
        widthInches: 8.5,
        heightInches: 11.0,
        label: "Download a PDF with keys and instructions"
      }), /*#__PURE__*/_react["default"].createElement("a", {
        href: "".concat(walletUrl, "/@").concat(username.value, "/permissions"),
        target: "_blank",
        rel: "noopener noreferrer"
      }, (0, _counterpart["default"])('loginform_jsx.login_warning_link_text'))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "login-modal-buttons"
      }, /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("button", {
        type: "submit",
        disabled: submitting,
        className: "button block-button",
        onClick: function onClick(e) {
          e.preventDefault();
          console.log('Login\thideWarning');
          hideWarning();
        }
      }, (0, _counterpart["default"])('g.try_again'))));
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "LoginForm row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column"
      }, message, showLoginWarning ? loginWarningTitleText : titleText, showLoginWarning ? loginWarningForm : form));
    }
  }]);
  return LoginForm;
}(_react.Component);
(0, _defineProperty2["default"])(LoginForm, "propTypes", {
  // Steemit.
  loginError: _propTypes["default"].string,
  onCancel: _propTypes["default"].func
});
(0, _defineProperty2["default"])(LoginForm, "defaultProps", {
  afterLoginRedirectToWelcome: false
});
var hasError;
var saveLoginDefault = true;
if (process.env.BROWSER) {
  var s = localStorage.getItem('saveLogin');
  if (s === 'no') saveLoginDefault = false;
}
function urlAccountName() {
  var suggestedAccountName = '';
  var account_match = window.location.hash.match(/account\=([\w\d\-\.]+)/);
  if (account_match && account_match.length > 1) {
    suggestedAccountName = account_match[1];
  }
  return suggestedAccountName;
}
function checkPasswordChecksum(password) {
  // A Steemit generated password is a WIF prefixed with a P ..
  // It is possible to login directly with a WIF
  var wif = /^P/.test(password) ? password.substring(1) : password;
  if (!/^5[HJK].{45,}/i.test(wif)) {
    // 51 is the wif length
    // not even close
    return undefined;
  }
  return _ecc.PrivateKey.isWif(wif);
}
var _default = exports["default"] = (0, _reactRedux.connect)(
// mapStateToProps
function (state) {
  var walletUrl = state.app.get('walletUrl');
  var showLoginWarning = state.user.get('show_login_warning');
  var loginError = state.user.get('login_error');
  var currentUser = state.user.get('current');
  var loginBroadcastOperation = state.user.get('loginBroadcastOperation');
  var initialValues = {
    useKeychain: !!(0, _SteemKeychain.hasCompatibleKeychain)(),
    saveLogin: saveLoginDefault
  };

  // The username input has a value prop, so it should not use initialValues
  var initialUsername = currentUser && currentUser.has('username') ? currentUser.get('username') : urlAccountName();
  var loginDefault = state.user.get('loginDefault');
  if (loginDefault) {
    var _loginDefault$toJS = loginDefault.toJS(),
      username = _loginDefault$toJS.username,
      authType = _loginDefault$toJS.authType;
    if (username && authType) {
      initialValues.username = username + '/' + authType;
    }
  } else if (initialUsername) {
    initialValues.username = initialUsername;
  }
  var offchainUser = state.offchain.get('user');
  if (!initialUsername && offchainUser && offchainUser.get('account')) {
    initialValues.username = offchainUser.get('account');
  }
  var msg = '';
  var msg_match = window.location.hash.match(/msg\=([\w]+)/);
  if (msg_match && msg_match.length > 1) msg = msg_match[1];
  hasError = !!loginError;
  return {
    walletUrl: walletUrl,
    showLoginWarning: showLoginWarning,
    loginError: loginError,
    loginBroadcastOperation: loginBroadcastOperation,
    initialValues: initialValues,
    initialUsername: initialUsername,
    msg: msg,
    offchain_user: state.offchain.get('user')
  };
},
// mapDispatchToProps
function (dispatch) {
  return {
    dispatchSubmit: function dispatchSubmit(data, useKeychain, loginBroadcastOperation, afterLoginRedirectToWelcome) {
      var password = data.password,
        saveLogin = data.saveLogin;
      var username = data.username.trim().toLowerCase();
      if (loginBroadcastOperation) {
        var _loginBroadcastOperat = loginBroadcastOperation.toJS(),
          type = _loginBroadcastOperat.type,
          operation = _loginBroadcastOperat.operation,
          successCallback = _loginBroadcastOperat.successCallback,
          errorCallback = _loginBroadcastOperat.errorCallback;
        dispatch(transactionActions.broadcastOperation({
          type: type,
          operation: operation,
          username: username,
          password: password,
          useKeychain: useKeychain,
          successCallback: successCallback,
          errorCallback: errorCallback
        }));
        dispatch(userActions.usernamePasswordLogin({
          username: username,
          password: password,
          useKeychain: useKeychain,
          saveLogin: saveLogin,
          afterLoginRedirectToWelcome: afterLoginRedirectToWelcome,
          operationType: type
        }));
        (0, _ServerApiClient.serverApiRecordEvent)('SignIn', type);
        dispatch(userActions.closeLogin());
      } else {
        dispatch(userActions.checkKeyType({
          username: username,
          password: password,
          useKeychain: useKeychain,
          saveLogin: saveLogin,
          afterLoginRedirectToWelcome: afterLoginRedirectToWelcome
        }));
      }
    },
    reallySubmit: function reallySubmit(_ref2, afterLoginRedirectToWelcome) {
      var username = _ref2.username,
        password = _ref2.password,
        saveLogin = _ref2.saveLogin,
        loginBroadcastOperation = _ref2.loginBroadcastOperation;
      var _ref3 = loginBroadcastOperation ? loginBroadcastOperation.toJS() : {},
        type = _ref3.type;
      (0, _ServerApiClient.serverApiRecordEvent)('SignIn', type);
      dispatch(userActions.usernamePasswordLogin({
        username: username,
        password: password,
        saveLogin: saveLogin,
        afterLoginRedirectToWelcome: afterLoginRedirectToWelcome
      }));
    },
    hideWarning: function hideWarning() {
      dispatch(userActions.hideLoginWarning());
    },
    clearError: function clearError() {
      if (hasError) dispatch(userActions.loginError({
        error: null
      }));
    },
    qrReader: function qrReader(dataCallback) {
      dispatch(globalActions.showDialog({
        name: 'qr_reader',
        params: {
          handleScan: dataCallback
        }
      }));
    }
  };
})(LoginForm);