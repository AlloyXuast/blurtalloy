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
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _LoadingIndicator = _interopRequireDefault(require("app/components/elements/LoadingIndicator"));
var _shouldComponentUpdate = _interopRequireDefault(require("app/utils/shouldComponentUpdate"));
var transactionActions = _interopRequireWildcard(require("app/redux/TransactionReducer"));
var userActions = _interopRequireWildcard(require("app/redux/UserReducer"));
var _immutable = require("immutable");
var _counterpart = _interopRequireDefault(require("counterpart"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var string = _propTypes["default"].string,
  bool = _propTypes["default"].bool,
  any = _propTypes["default"].any;
var Follow = exports["default"] = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Follow, _React$Component);
  function Follow(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, Follow);
    _this = _callSuper(this, Follow);
    _this.state = {};
    _this.initEvents(props);
    _this.followLoggedOut = _this.followLoggedOut.bind((0, _assertThisInitialized2["default"])(_this));
    _this.shouldComponentUpdate = (0, _shouldComponentUpdate["default"])((0, _assertThisInitialized2["default"])(_this), 'Follow');
    return _this;
  }
  (0, _createClass2["default"])(Follow, [{
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProps) {
      this.initEvents(nextProps);
    }
  }, {
    key: "initEvents",
    value: function initEvents(props) {
      var _this2 = this;
      var updateFollow = props.updateFollow,
        follower = props.follower,
        following = props.following,
        operation_flat_fee = props.operation_flat_fee,
        bandwidth_kbytes_fee = props.bandwidth_kbytes_fee;
      var upd = function upd(type) {
        if (_this2.state.busy) return;
        _this2.setState({
          busy: true
        });
        var done = function done() {
          _this2.setState({
            busy: false
          });
        };
        updateFollow(follower, following, type, operation_flat_fee, bandwidth_kbytes_fee, done);
      };
      this.follow = function () {
        upd('blog');
      };
      this.unfollow = function () {
        upd();
      };
      this.ignore = function () {
        upd('ignore');
      };
      this.unignore = function () {
        upd();
      };
    }
  }, {
    key: "followLoggedOut",
    value: function followLoggedOut(e) {
      // close author preview if present
      var author_preview = document.querySelector('.dropdown-pane.is-open');
      if (author_preview) author_preview.remove();
      // resume authenticate modal
      this.props.showLogin(e);
    }
  }, {
    key: "render",
    value: function render() {
      var loading = this.props.loading;
      if (loading) return /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_LoadingIndicator["default"], null), " ", (0, _counterpart["default"])('g.loading'), "\u2026");
      if (loading !== false) {
        // must know what the user is already following before any update can happen
        return /*#__PURE__*/_react["default"].createElement("span", null);
      }
      var _this$props = this.props,
        follower = _this$props.follower,
        following = _this$props.following; // html
      // Show follow preview for new users
      if (!follower || !following) return /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("label", {
        className: "button slim hollow secondary",
        onClick: this.followLoggedOut
      }, (0, _counterpart["default"])('g.follow')));
      // Can't follow or ignore self
      if (follower === following) return /*#__PURE__*/_react["default"].createElement("span", null);
      var followingWhat = this.props.followingWhat; // redux
      var _this$props2 = this.props,
        showFollow = _this$props2.showFollow,
        showMute = _this$props2.showMute,
        fat = _this$props2.fat,
        children = _this$props2.children; // html
      var busy = this.state.busy;
      var cnBusy = busy ? 'disabled' : '';
      var cnActive = 'button' + (fat ? '' : ' slim');
      var cnInactive = cnActive + ' hollow secondary ' + cnBusy;
      return /*#__PURE__*/_react["default"].createElement("span", null, showFollow && followingWhat !== 'blog' && /*#__PURE__*/_react["default"].createElement("label", {
        className: cnInactive,
        onClick: this.follow
      }, (0, _counterpart["default"])('g.follow')), showFollow && followingWhat === 'blog' && /*#__PURE__*/_react["default"].createElement("label", {
        className: cnInactive,
        onClick: this.unfollow
      }, (0, _counterpart["default"])('g.unfollow')), showMute && followingWhat !== 'ignore' && /*#__PURE__*/_react["default"].createElement("label", {
        className: cnInactive,
        onClick: this.ignore
      }, (0, _counterpart["default"])('g.mute')), showMute && followingWhat === 'ignore' && /*#__PURE__*/_react["default"].createElement("label", {
        className: cnInactive,
        onClick: this.unignore
      }, (0, _counterpart["default"])('g.unmute')), children && /*#__PURE__*/_react["default"].createElement("span", null, "\xA0\xA0", children));
    }
  }]);
  return Follow;
}(_react["default"].Component);
(0, _defineProperty2["default"])(Follow, "propTypes", {
  following: string,
  follower: string,
  // OPTIONAL default to current user
  showFollow: bool,
  showMute: bool,
  fat: bool,
  children: any,
  showLogin: _propTypes["default"].func.isRequired
});
(0, _defineProperty2["default"])(Follow, "defaultProps", {
  showFollow: true,
  showMute: true,
  fat: false
});
var emptyMap = (0, _immutable.Map)();
var emptySet = (0, _immutable.Set)();
module.exports = (0, _reactRedux.connect)(function (state, ownProps) {
  var follower = ownProps.follower;
  if (!follower) {
    var current_user = state.user.get('current');
    follower = current_user ? current_user.get('username') : null;
  }
  var following = ownProps.following;
  var f = state.global.getIn(['follow', 'getFollowingAsync', follower], emptyMap);

  // the line below was commented out by val - I think it's broken so sometimes the loading indicator is shown forever
  // const loading = f.get('blog_loading', false) || f.get('ignore_loading', false)
  var loading = false;
  var followingWhat = f.get('blog_result', emptySet).contains(following) ? 'blog' : f.get('ignore_result', emptySet).contains(following) ? 'ignore' : null;
  return {
    follower: follower,
    following: following,
    followingWhat: followingWhat,
    loading: loading,
    operation_flat_fee: state.global.getIn(['props', 'operation_flat_fee']),
    bandwidth_kbytes_fee: state.global.getIn(['props', 'bandwidth_kbytes_fee'])
  };
}, function (dispatch) {
  return {
    updateFollow: function updateFollow(follower, following, action, operationFlatFee, bandwidthKbytesFee, done) {
      var what = action ? [action] : [];
      var json = ['follow', {
        follower: follower,
        following: following,
        what: what
      }];
      var operation = {
        id: 'follow',
        required_posting_auths: [follower],
        json: JSON.stringify(json)
      };
      var size = JSON.stringify(operation).replace(/[\[\]\,\"]/g, '').length;
      var bw_fee = Math.max(0.001, (size / 1024 * bandwidthKbytesFee).toFixed(3));
      var fee = (operationFlatFee + bw_fee).toFixed(3);
      dispatch(transactionActions.broadcastOperation({
        type: 'custom_json',
        operation: {
          id: 'follow',
          required_posting_auths: [follower],
          json: JSON.stringify(json)
        },
        confirm: (0, _counterpart["default"])('g.operation_cost', {
          fee: fee
        }),
        successCallback: done,
        // TODO: Why?
        errorCallback: done
      }));
    },
    showLogin: function showLogin(e) {
      if (e) e.preventDefault();
      dispatch(userActions.showLogin());
    }
  };
})(Follow);