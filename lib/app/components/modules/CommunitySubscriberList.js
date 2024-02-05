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
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _immutable = require("immutable");
var _reactRedux = require("react-redux");
var communityActions = _interopRequireWildcard(require("app/redux/CommunityReducer"));
var _Community = require("app/utils/Community");
var _UserTitle = _interopRequireDefault(require("app/components/elements/UserTitle"));
var _LoadingIndicator = _interopRequireDefault(require("app/components/elements/LoadingIndicator"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var CommunitySubscriberList = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(CommunitySubscriberList, _React$Component);
  function CommunitySubscriberList(props) {
    (0, _classCallCheck2["default"])(this, CommunitySubscriberList);
    return _callSuper(this, CommunitySubscriberList, [props]);
  }
  (0, _createClass2["default"])(CommunitySubscriberList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.subscribers.length === 0) {
        this.props.fetchSubscribers(this.props.community.name);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        loading = _this$props.loading,
        subscribers = _this$props.subscribers,
        community = _this$props.community,
        viewerRole = _this$props.viewerRole,
        username = _this$props.username,
        fetchSubscribers = _this$props.fetchSubscribers;
      var isMod = _Community.Role.atLeast(viewerRole, 'mod');
      var subs = subscribers.map(function (s, idx) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: idx
        }, /*#__PURE__*/_react["default"].createElement("a", {
          href: "/@".concat(s[0])
        }, "@", s[0], " "), /*#__PURE__*/_react["default"].createElement(_UserTitle["default"], {
          username: username,
          community: community.name,
          author: s[0],
          permlink: '/',
          role: s[1],
          title: s[2],
          hideEdit: !isMod,
          onEditSubmit: function onEditSubmit() {
            return fetchSubscribers(community.name);
          }
        }));
      });
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("strong", null, "Latest ", community.title, " Subscribers"), /*#__PURE__*/_react["default"].createElement("hr", null), loading && /*#__PURE__*/_react["default"].createElement("center", null, /*#__PURE__*/_react["default"].createElement(_LoadingIndicator["default"], {
        type: "circle"
      })), /*#__PURE__*/_react["default"].createElement("div", null, subs));
    }
  }]);
  return CommunitySubscriberList;
}(_react["default"].Component);
(0, _defineProperty2["default"])(CommunitySubscriberList, "propTypes", {
  community: _propTypes["default"].object.isRequired,
  username: _propTypes["default"].string,
  viewerRole: _propTypes["default"].string.isRequired,
  fetchSubscribers: _propTypes["default"].func.isRequired
});
(0, _defineProperty2["default"])(CommunitySubscriberList, "defaultProps", {
  username: undefined
});
var ConnectedCommunitySubscriberList = (0, _reactRedux.connect)(
// mapStateToProps
function (state, ownProps) {
  var subscribers = [];
  var loading = true;
  var viewerRole = 'guest';
  // TODO: re-fetch community upon user loging - currently when a user logs in, at a community page, the context is not updated.
  // viewerRole = state.global.getIn(['community', ownProps.community.name, 'context', 'role'], 'guest');
  var username = state.user.getIn(['current', 'username'], null);
  var communityMember = state.global.getIn(['community', ownProps.community.name, 'team'], (0, _immutable.List)([])).toJS().filter(function (member) {
    return member[0] === username;
  });
  if (username && communityMember.length > 0) {
    viewerRole = communityMember[0][1];
  }
  if (state.global.community.getIn([ownProps.community.name]) && state.global.community.getIn([ownProps.community.name, 'subscribers']) && state.global.community.getIn([ownProps.community.name, 'subscribers']).length > 0) {
    subscribers = state.global.community.getIn([ownProps.community.name, 'subscribers']);
    loading = state.global.community.getIn([ownProps.community.name, 'listSubscribersPending']);
  }
  return {
    subscribers: subscribers,
    loading: loading,
    viewerRole: viewerRole,
    username: username
  };
},
// mapDispatchToProps
function (dispatch) {
  return {
    fetchSubscribers: function fetchSubscribers(communityName) {
      return dispatch(communityActions.getCommunitySubscribers(communityName));
    }
  };
})(CommunitySubscriberList);
var _default = exports["default"] = ConnectedCommunitySubscriberList;