"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
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
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var globalActions = _interopRequireWildcard(require("app/redux/GlobalReducer"));
var transactionActions = _interopRequireWildcard(require("app/redux/TransactionReducer"));
var _Reveal = _interopRequireDefault(require("app/components/elements/Reveal"));
var _CloseButton = _interopRequireDefault(require("app/components/elements/CloseButton"));
var _CommunitySettings = _interopRequireDefault(require("app/components/modules/CommunitySettings"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var SettingsEditButton = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(SettingsEditButton, _React$Component);
  function SettingsEditButton(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, SettingsEditButton);
    _this = _callSuper(this, SettingsEditButton, [props]);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onToggleDialog", function (e) {
      if (e) e.preventDefault();
      // eslint-disable-next-line react/no-access-state-in-setstate
      _this.setState({
        showDialog: !_this.state.showDialog
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onSave", function (newSettings) {
      var community = _this.props.community.get('name');
      _this.setState({
        loading: true
      });
      _this.props.saveSettings(_this.props.username, community, newSettings, function () {
        _this.setState({
          loading: false,
          settings: newSettings
        });
      }, function () {
        _this.setState({
          loading: false
        });
      });

      //-- Simulate a "receiveState" action to feed new title into post state
      var newstate = {
        community: {},
        simulation: true
      };
      newstate.community[community] = newSettings;
      _this.props.pushState(newstate);
    });
    _this.state = {
      showDialog: false,
      loading: false,
      settings: _this.props.settings
    };
    return _this;
  }
  (0, _createClass2["default"])(SettingsEditButton, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$state = this.state,
        showDialog = _this$state.showDialog,
        loading = _this$state.loading,
        settings = _this$state.settings;
      if (loading) {
        return /*#__PURE__*/_react["default"].createElement("span", null, "Saving...");
      }
      return /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("a", {
        href: "#",
        onClick: this.onToggleDialog
      }, this.props.children), showDialog && /*#__PURE__*/_react["default"].createElement(_Reveal["default"], {
        onHide: function onHide() {
          return null;
        },
        show: true
      }, /*#__PURE__*/_react["default"].createElement(_CloseButton["default"], {
        onClick: function onClick() {
          return _this2.onToggleDialog();
        }
      }), /*#__PURE__*/_react["default"].createElement(_CommunitySettings["default"], (0, _extends2["default"])({}, settings, {
        onSubmit: function onSubmit(newSettings) {
          _this2.onToggleDialog();
          _this2.onSave(newSettings);
        }
      }))));
    }
  }]);
  return SettingsEditButton;
}(_react["default"].Component);
SettingsEditButton.propTypes = {
  username: _propTypes["default"].string,
  community: _propTypes["default"].object.isRequired,
  //TODO: Define this shape
  settings: _propTypes["default"].object.isRequired //TODO: Define this shape
};
SettingsEditButton.defaultProps = {
  username: undefined
};
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, ownProps) {
  var community = state.global.getIn(['community', ownProps.community], {});
  var settings = {
    title: community.get('title'),
    about: community.get('about'),
    is_nsfw: community.get('is_nsfw'),
    lang: community.get('lang'),
    description: community.get('description'),
    flag_text: community.get('flag_text', '')
  };
  return _objectSpread(_objectSpread({}, ownProps), {}, {
    username: state.user.getIn(['current', 'username']),
    community: community,
    settings: settings
  });
}, function (dispatch) {
  return {
    saveSettings: function saveSettings(account, community, settings, successCallback, errorCallback) {
      var action = 'updateProps';
      var payload = [action, {
        community: community,
        props: settings
      }];
      return dispatch(transactionActions.broadcastOperation({
        type: 'custom_json',
        operation: {
          id: 'community',
          required_posting_auths: [account],
          json: JSON.stringify(payload)
        },
        successCallback: successCallback,
        errorCallback: errorCallback
      }));
    },
    pushState: function pushState(state) {
      dispatch(globalActions.receiveState(state));
    }
  };
})(SettingsEditButton);