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
var _Reveal = _interopRequireDefault(require("app/components/elements/Reveal"));
var _CloseButton = _interopRequireDefault(require("app/components/elements/CloseButton"));
var _TimeAgoWrapper = _interopRequireDefault(require("app/components/elements/TimeAgoWrapper"));
var _reactRouter = require("react-router");
var _counterpart = _interopRequireDefault(require("counterpart"));
var _reactIntl = require("react-intl");
var _reactRedux = require("react-redux");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* eslint react/prop-types: 0 */
var CheckLoginOwner = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(CheckLoginOwner, _React$Component);
  function CheckLoginOwner() {
    var _this;
    (0, _classCallCheck2["default"])(this, CheckLoginOwner);
    _this = _callSuper(this, CheckLoginOwner);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "hide", function () {
      var understood = _this.state.understood;
      if (understood) {
        var last_valid_time = _this.state.last_valid_time;
        localStorage[_this.getKey()] = last_valid_time;
      }
      _this.setState({
        last_valid_time: null,
        last_valid_date: null
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getKey", function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props;
      var previous_owner_authority = props.previous_owner_authority;
      var username = previous_owner_authority.get('account');
      var key = "".concat(username, "_previous_owner_authority_last_valid_time");
      return key;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "recover", function () {
      _this.hide();
      _reactRouter.browserHistory.push('/recover_account_step_1');
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onUnderstood", function (e) {
      var understood = e.target.checked;
      console.log('understood', understood);
      _this.setState({
        understood: understood
      });
    });
    _this.state = {};
    return _this;
  }
  (0, _createClass2["default"])(CheckLoginOwner, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var login_owner_pubkey = nextProps.login_owner_pubkey;
      if (login_owner_pubkey && this.props.login_owner_pubkey !== login_owner_pubkey) this.props.lookupPreviousOwnerAuthority();
      var previous_owner_authority = nextProps.previous_owner_authority;
      if (previous_owner_authority && this.props.previous_owner_authority !== previous_owner_authority) {
        var last_valid_time = previous_owner_authority.get('last_valid_time');
        // has this been shown already?
        if (localStorage[this.getKey(nextProps)] !== last_valid_time) {
          var last_valid_date;
          if (!/Z$/.test(last_valid_time)) last_valid_date = last_valid_time + 'Z';
          last_valid_date = new Date(last_valid_date);
          this.setState({
            last_valid_time: last_valid_time,
            last_valid_date: last_valid_date
          });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
        last_valid_time = _this$state.last_valid_time,
        last_valid_date = _this$state.last_valid_date;
      if (!last_valid_time) return /*#__PURE__*/_react["default"].createElement("span", null);
      var THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
      var deadline = last_valid_date.getTime() + THIRTY_DAYS;

      // https://blurt.world/steem/@originate/steem-s-new-alert-after-key-updates-is-excellent-but-here-s-a-quick-update-that-would-make-it-even-better
      // "If you recently reset your password at(timestamp in strftime, example:  Thu, 21 Jul 2016 02:39:19 PST) this alert was most likely prompted by this action, otherwise your immediate attention is needed"
      return /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_Reveal["default"], {
        show: true
      }, /*#__PURE__*/_react["default"].createElement(_CloseButton["default"], {
        onClick: this.hide
      }), /*#__PURE__*/_react["default"].createElement("h3", null, (0, _counterpart["default"])('g.account_updated')), /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("span", {
        className: "warning uppercase"
      }, (0, _counterpart["default"])('g.warning'), ":"), (0, _counterpart["default"])('checkloginowner_jsx.your_password_permissions_were_reduced'), /*#__PURE__*/_react["default"].createElement(_TimeAgoWrapper["default"], {
        date: last_valid_time
      }), ".", ' ', (0, _counterpart["default"])('checkloginowner_jsx.if_you_did_not_make_this_change') + ' ', /*#__PURE__*/_react["default"].createElement("a", {
        onClick: this.recover
      }, (0, _counterpart["default"])('g.recover_your_account')), "."), /*#__PURE__*/_react["default"].createElement("p", null, (0, _counterpart["default"])('checkloginowner_jsx.ownership_changed_on'), ' ', /*#__PURE__*/_react["default"].createElement(_reactIntl.FormattedDate, {
        value: last_valid_date
      })), /*#__PURE__*/_react["default"].createElement("p", null, (0, _counterpart["default"])('checkloginowner_jsx.deadline_for_recovery_is'), ' ', /*#__PURE__*/_react["default"].createElement("b", null, /*#__PURE__*/_react["default"].createElement(_TimeAgoWrapper["default"], {
        date: deadline
      })), "."), /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("input", {
        type: "checkbox",
        onChange: this.onUnderstood
      }), "\xA0\xA0", (0, _counterpart["default"])('checkloginowner_jsx.i_understand_dont_show_again')), /*#__PURE__*/_react["default"].createElement("div", {
        className: "button",
        onClick: this.hide
      }, (0, _counterpart["default"])('g.ok'))));
    }
  }]);
  return CheckLoginOwner;
}(_react["default"].Component);
var _default = exports["default"] = (0, _reactRedux.connect)(
// mapStateToProps
function (state, ownProps) {
  var current = state.user.get('current');
  var login_owner_pubkey = current && current.get('login_owner_pubkey');
  var previous_owner_authority = current && current.get('previous_owner_authority');
  return _objectSpread(_objectSpread({}, ownProps), {}, {
    login_owner_pubkey: login_owner_pubkey,
    previous_owner_authority: previous_owner_authority
  });
},
// mapDispatchToProps
function (dispatch) {
  return {
    lookupPreviousOwnerAuthority: function lookupPreviousOwnerAuthority() {
      dispatch({
        type: 'user/lookupPreviousOwnerAuthority',
        payload: {}
      });
    }
  };
})(CheckLoginOwner);