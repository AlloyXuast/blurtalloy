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
var _immutable = require("immutable");
var _Community = require("app/utils/Community");
var _SettingsEditButton = _interopRequireDefault(require("app/components/elements/SettingsEditButton"));
var _SubscribeButton = _interopRequireDefault(require("app/components/elements/SubscribeButton"));
var _Icon = _interopRequireDefault(require("app/components/elements/Icon"));
var globalActions = _interopRequireWildcard(require("app/redux/GlobalReducer"));
var userActions = _interopRequireWildcard(require("app/redux/UserReducer"));
var _StateFunctions = require("app/utils/StateFunctions");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var nl2br = function nl2br(text) {
  return text.split('\n').map(function (item, key) {
    return /*#__PURE__*/_react["default"].createElement("span", {
      key: key
    }, item, /*#__PURE__*/_react["default"].createElement("br", null));
  });
};
var nl2li = function nl2li(text) {
  return text.split('\n').map(function (item, key) {
    return /*#__PURE__*/_react["default"].createElement("li", {
      key: key
    }, item);
  });
};
var CommunityPane = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(CommunityPane, _Component);
  function CommunityPane() {
    (0, _classCallCheck2["default"])(this, CommunityPane);
    return _callSuper(this, CommunityPane, arguments);
  }
  (0, _createClass2["default"])(CommunityPane, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        community = _this$props.community,
        showRecentSubscribers = _this$props.showRecentSubscribers,
        showModerationLog = _this$props.showModerationLog,
        loggedIn = _this$props.loggedIn,
        showLogin = _this$props.showLogin,
        pricePerBlurt = _this$props.pricePerBlurt;
      var handleSubscriberClick = function handleSubscriberClick() {
        showRecentSubscribers(community);
      };
      var handleModerationLogCLick = function handleModerationLogCLick(e) {
        e.preventDefault();
        showModerationLog(community);
      };
      function teamMembers(members) {
        return members.map(function (row, idx) {
          var account = "@".concat(row.get(0));
          var title = row.get(2);
          var role = row.get(1);
          if (role === 'owner') {
            return null;
          }
          return /*#__PURE__*/_react["default"].createElement("div", {
            key: "".concat(account, "__").concat(role),
            style: {
              fontSize: '80%'
            }
          }, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
            to: "/".concat(account)
          }, account), role && /*#__PURE__*/_react["default"].createElement("span", {
            className: "user_role"
          }, " ", role, " "), title && /*#__PURE__*/_react["default"].createElement("span", {
            className: "affiliation"
          }, title));
        });
      }
      var category = community.get('name');
      var viewer_role = community.getIn(['context', 'role'], 'guest');
      var canPost = _Community.Role.canPost(category, viewer_role);
      var checkIfLogin = function checkIfLogin() {
        if (!loggedIn) {
          return showLogin();
        }
        return _reactRouter.browserHistory.replace("/submit.html?category=".concat(category));
      };
      var pending_rewards_dollar = community.get('sum_pending') * pricePerBlurt;
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "c-sidebar__module"
      }, _Community.Role.atLeast(viewer_role, 'admin') && /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          "float": 'right',
          fontSize: '0.8em'
        }
      }, /*#__PURE__*/_react["default"].createElement(_SettingsEditButton["default"], {
        community: community.get('name')
      }, "Edit")), /*#__PURE__*/_react["default"].createElement("div", {
        className: "c-sidebar__header"
      }, /*#__PURE__*/_react["default"].createElement("h3", {
        className: "c-sidebar__h3"
      }, community.get('title')), community.get('is_nsfw') && /*#__PURE__*/_react["default"].createElement("span", {
        className: "affiliation"
      }, "nsfw")), /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          margin: '-6px 0 12px'
        }
      }, community.get('about')), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row",
        style: {
          textAlign: 'center',
          lineHeight: '1em'
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        onClick: handleSubscriberClick,
        className: "column small-4 pointer"
      }, (0, _StateFunctions.numberWithCommas)(community.get('subscribers')), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("small", null, community.get('subscribers') == 1 ? 'subscriber' : 'subscribers')), /*#__PURE__*/_react["default"].createElement("div", {
        className: "column small-4"
      }, '$', pending_rewards_dollar.toFixed(2), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("small", null, "pending", /*#__PURE__*/_react["default"].createElement("br", null), "rewards")), /*#__PURE__*/_react["default"].createElement("div", {
        className: "column small-4"
      }, (0, _StateFunctions.numberWithCommas)(community.get('num_authors')), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("small", null, "active", /*#__PURE__*/_react["default"].createElement("br", null), "posters"))), /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          margin: '12px 0 0'
        }
      }, community && /*#__PURE__*/_react["default"].createElement(_SubscribeButton["default"], {
        community: community.get('name'),
        display: "block"
      }), canPost && /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
        className: "community--subscribe button primary",
        style: {
          minWidth: '6em',
          display: 'block',
          margin: '-6px 0 8px'
        },
        onClick: checkIfLogin
      }, "New Post"), !canPost && /*#__PURE__*/_react["default"].createElement("div", {
        className: "text-center",
        style: {
          marginBottom: '8px'
        }
      }, /*#__PURE__*/_react["default"].createElement("small", {
        className: "text-muted"
      }, /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
        name: "eye"
      }), "\xA0 Only approved members can post"))), /*#__PURE__*/_react["default"].createElement("div", null, _Community.Role.atLeast(viewer_role, 'mod') && /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          "float": 'right',
          fontSize: '0.8em'
        }
      }, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
        to: "/roles/".concat(category)
      }, "Edit Roles")), /*#__PURE__*/_react["default"].createElement("strong", null, "Leadership"), teamMembers(community.get('team', (0, _immutable.List)())), /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          "float": 'right',
          fontSize: '0.8em'
        }
      }, /*#__PURE__*/_react["default"].createElement("a", {
        onClick: handleModerationLogCLick
      }, "Activity Log")))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "c-sidebar__module"
      }, community.get('description') && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("strong", null, "Description"), /*#__PURE__*/_react["default"].createElement("br", null), nl2br(community.get('description', 'empty')), /*#__PURE__*/_react["default"].createElement("br", null)), community.get('flag_text') && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("strong", null, "Rules"), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("ol", null, nl2li(community.get('flag_text'))), /*#__PURE__*/_react["default"].createElement("br", null)), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("strong", null, "Beneficiary"), /*#__PURE__*/_react["default"].createElement("br", null), "When publishing within the community, the community account will be automatically placed as the beneficiary of 3% of the publication."), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("strong", null, "Language"), /*#__PURE__*/_react["default"].createElement("br", null), community.get('lang'))));
    }
  }]);
  return CommunityPane;
}(_react.Component);
(0, _defineProperty2["default"])(CommunityPane, "propTypes", {
  community: _propTypes["default"].object.isRequired,
  showRecentSubscribers: _propTypes["default"].func.isRequired,
  showModerationLog: _propTypes["default"].func.isRequired
});
var _default = exports["default"] = (0, _reactRedux.connect)(
// mapStateToProps
function (state, ownProps) {
  return {
    community: ownProps.community,
    loggedIn: !!state.user.getIn(['current', 'username']),
    pricePerBlurt: state.global.getIn(['props', 'price_per_blurt'])
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
})(CommunityPane);