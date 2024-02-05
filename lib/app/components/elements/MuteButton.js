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
var globalActions = _interopRequireWildcard(require("app/redux/GlobalReducer"));
var transactionActions = _interopRequireWildcard(require("app/redux/TransactionReducer"));
var _Reveal = _interopRequireDefault(require("app/components/elements/Reveal"));
var _CloseButton = _interopRequireDefault(require("app/components/elements/CloseButton"));
var _MutePost = _interopRequireDefault(require("app/components/modules/MutePost"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var MuteButton = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(MuteButton, _React$Component);
  function MuteButton(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, MuteButton);
    _this = _callSuper(this, MuteButton, [props]);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "showDialog", function () {
      _this.setState({
        showDialog: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "hideDialog", function () {
      _this.setState({
        showDialog: false
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onSubmit", function (isMuted, notes) {
      var _this$props = _this.props,
        account = _this$props.account,
        community = _this$props.community,
        username = _this$props.username,
        permlink = _this$props.permlink;
      if (!notes || !community || !username) return false; // Fail Fast

      var postref = account + '/' + permlink;
      var key = ['content', postref, 'stats', 'gray'];
      _this.props.stateSet(key, !isMuted);
      _this.props.toggleMutedPost(username, !isMuted, community, account, notes, permlink);
    });
    _this.state = {
      showDialog: false
    };
    return _this;
  }
  (0, _createClass2["default"])(MuteButton, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var isMuted = this.props.isMuted;
      return /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("a", {
        role: "link",
        tabIndex: 0,
        onClick: function onClick() {
          return _this2.showDialog();
        }
      }, isMuted ? 'Unmute' : 'Mute'), this.state.showDialog && /*#__PURE__*/_react["default"].createElement(_Reveal["default"], {
        onHide: function onHide() {
          return null;
        },
        show: true
      }, /*#__PURE__*/_react["default"].createElement(_CloseButton["default"], {
        onClick: function onClick() {
          return _this2.hideDialog();
        }
      }), /*#__PURE__*/_react["default"].createElement(_MutePost["default"], {
        isMuted: isMuted,
        onSubmit: function onSubmit(notes) {
          _this2.hideDialog();
          _this2.onSubmit(isMuted, notes);
        }
      })));
    }
  }]);
  return MuteButton;
}(_react["default"].Component);
MuteButton.propTypes = {
  account: _propTypes["default"].string.isRequired,
  permlink: _propTypes["default"].string.isRequired,
  username: _propTypes["default"].string.isRequired,
  community: _propTypes["default"].string.isRequired //TODO: Define shape
};
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, ownProps) {
  var post = ownProps.post;
  var account = post.get('author');
  var permlink = post.get('permlink');
  var community = post.get('category');
  var isMuted = post.getIn(['stats', 'gray'], false);
  return {
    account: account,
    permlink: permlink,
    community: community,
    isMuted: isMuted,
    username: state.user.getIn(['current', 'username'])
  };
}, function (dispatch) {
  return {
    stateSet: function stateSet(key, value) {
      dispatch(globalActions.set({
        key: key,
        value: value
      }));
    },
    toggleMutedPost: function toggleMutedPost(username, mutePost, community, account, notes, permlink, successCallback, errorCallback) {
      var action = mutePost ? 'mutePost' : 'unmutePost';
      var payload = [action, {
        community: community,
        account: account,
        permlink: permlink,
        notes: notes
      }];
      return dispatch(transactionActions.broadcastOperation({
        type: 'custom_json',
        operation: {
          id: 'community',
          required_posting_auths: [username],
          json: JSON.stringify(payload)
        },
        successCallback: successCallback,
        errorCallback: errorCallback
      }));
    }
  };
})(MuteButton);