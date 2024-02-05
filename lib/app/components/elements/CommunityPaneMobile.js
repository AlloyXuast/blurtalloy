"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
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
var _react = _interopRequireWildcard(require("react"));
var _reactRouter = require("react-router");
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Community = require("app/utils/Community");
var _SettingsEditButton = _interopRequireDefault(require("app/components/elements/SettingsEditButton"));
var _SubscribeButton = _interopRequireDefault(require("app/components/elements/SubscribeButton"));
var globalActions = _interopRequireWildcard(require("app/redux/GlobalReducer"));
var userActions = _interopRequireWildcard(require("app/redux/UserReducer"));
var _StateFunctions = require("app/utils/StateFunctions");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* eslint-disable no-undef */ /* eslint-disable react/forbid-prop-types */ /* eslint-disable jsx-a11y/no-static-element-interactions */
var CommunityPaneMobile = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(CommunityPaneMobile, _Component);
  function CommunityPaneMobile() {
    (0, _classCallCheck2["default"])(this, CommunityPaneMobile);
    return _callSuper(this, CommunityPaneMobile, arguments);
  }
  (0, _createClass2["default"])(CommunityPaneMobile, [{
    key: "render",
    value: function render() {
      var _this = this;
      var _this$props = this.props,
        community = _this$props.community,
        showRecentSubscribers = _this$props.showRecentSubscribers,
        showModerationLog = _this$props.showModerationLog,
        showLogin = _this$props.showLogin;
      var handleSubscriberClick = function handleSubscriberClick() {
        showRecentSubscribers(community);
      };
      var handleModerationLogCLick = function handleModerationLogCLick(e) {
        e.preventDefault();
        showModerationLog(community);
      };
      var category = community.get('name');
      var viewer_role = community.getIn(['context', 'role'], 'guest');
      var canPost = _Community.Role.canPost(category, viewer_role);
      var settings = _Community.Role.atLeast(viewer_role, 'admin') && /*#__PURE__*/_react["default"].createElement(_SettingsEditButton["default"], {
        community: community.get('name')
      }, "Settings");
      var roles = _Community.Role.atLeast(viewer_role, 'mod') && /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
        to: "/roles/".concat(category)
      }, "Roles");
      var subs = community.get('subscribers');
      var checkIfLogin = function checkIfLogin() {
        if (!_this.props.loggedIn) {
          return showLogin();
        }
        return _reactRouter.browserHistory.replace("/submit.html?category=".concat(category));
      };
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "c-sidebar__module CommunityPaneMobile"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "row",
        style: {
          textAlign: 'center',
          lineHeight: '1em'
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column large-10 medium-8 small-12",
        style: {
          textAlign: 'left'
        }
      }, roles && /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          "float": 'right'
        }
      }, "Mod", ': ', roles, settings && /*#__PURE__*/_react["default"].createElement("span", null, ' / ', settings)), /*#__PURE__*/_react["default"].createElement("h3", {
        className: "c-sidebar__h3"
      }, community.get('title')), /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          margin: '-14px 0 8px',
          opacity: '0.65'
        }
      }, /*#__PURE__*/_react["default"].createElement("span", {
        onClick: handleSubscriberClick,
        className: "pointer"
      }, (0, _StateFunctions.numberWithCommas)(subs), subs == 1 ? ' subscriber' : ' subscribers'), /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          "float": 'right',
          fontSize: '0.8em'
        }
      }, /*#__PURE__*/_react["default"].createElement("a", {
        onClick: handleModerationLogCLick
      }, "Activity Log")), "\xA0\xA0\u2022\xA0\xA0", (0, _StateFunctions.numberWithCommas)(community.get('num_authors')), ' ', "active"), community.get('is_nsfw') && /*#__PURE__*/_react["default"].createElement("span", {
        className: "affiliation"
      }, "nsfw"), /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          margin: '0 0 12px'
        }
      }, community.get('about'))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "column large-2 medium-4 small-12"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        style: {
          display: 'inline-block',
          margin: '0 4px'
        }
      }, /*#__PURE__*/_react["default"].createElement(_SubscribeButton["default"], {
        community: community.get('name')
      })), canPost && /*#__PURE__*/_react["default"].createElement("span", {
        style: {
          display: 'inline-block',
          margin: '0 4px'
        }
      }, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
        className: "community--subscribe button primary",
        style: {
          minWidth: '7em'
        },
        onClick: checkIfLogin
      }, "Post"))))));
    }
  }]);
  return CommunityPaneMobile;
}(_react.Component);
(0, _defineProperty2["default"])(CommunityPaneMobile, "propTypes", {
  community: _propTypes["default"].object.isRequired,
  showRecentSubscribers: _propTypes["default"].func.isRequired,
  showModerationLog: _propTypes["default"].func.isRequired
});
var _default = exports["default"] = (0, _reactRedux.connect)(
// mapStateToProps
function (state, ownProps) {
  return {
    community: ownProps.community,
    loggedIn: !!state.user.getIn(['current', 'username'])
  };
},
// mapDispatchToProps
function (dispatch) {
  return {
    showLogin: function showLogin(e) {
      if (e) e.preventDefault();
      dispatch(userActions.showLogin({
        type: 'basic'
      }));
    },
    showRecentSubscribers: function showRecentSubscribers(community) {
      dispatch(globalActions.showDialog({
        name: 'communitySubscribers',
        params: {
          community: community
        }
      }));
    },
    showModerationLog: function showModerationLog(community) {
      dispatch(globalActions.showDialog({
        name: 'communityModerationLog',
        params: {
          community: community
        }
      }));
    }
  };
})(CommunityPaneMobile);