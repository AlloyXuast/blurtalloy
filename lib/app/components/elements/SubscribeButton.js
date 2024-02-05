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
var transactionActions = _interopRequireWildcard(require("app/redux/TransactionReducer"));
var globalActions = _interopRequireWildcard(require("app/redux/GlobalReducer"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var SubscribeButton = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(SubscribeButton, _React$Component);
  function SubscribeButton(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, SubscribeButton);
    _this = _callSuper(this, SubscribeButton, [props]);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onClick", function (e) {
      e.preventDefault();
      var _this$props = _this.props,
        subscribed = _this$props.subscribed,
        username = _this$props.username;
      var community = _this.props.community.get('name');
      if (username) {
        _this.setState({
          loading: true
        });
      }
      _this.props.toggleSubscribe(!subscribed, community, _this.props.username, function () {
        var key = ['community', community, 'context', 'subscribed'];
        _this.props.stateSet(key, !subscribed);
        _this.setState({
          loading: false
        });
      }, function () {
        _this.setState({
          loading: false
        });
      });
    });
    _this.state = {
      loading: false
    };
    return _this;
  }
  (0, _createClass2["default"])(SubscribeButton, [{
    key: "render",
    value: function render() {
      var subscribed = this.props.subscribed;
      var loading = this.state.loading;
      var loader = /*#__PURE__*/_react["default"].createElement(_LoadingIndicator["default"], {
        type: "dots"
      });
      var hollowed = subscribed ? ' hollow' : '';
      return /*#__PURE__*/_react["default"].createElement("a", {
        href: "#",
        onClick: this.onClick,
        className: 'community--subscribe button primary' + hollowed,
        style: {
          minWidth: '7em',
          display: this.props.display || 'inline-block'
        }
      }, /*#__PURE__*/_react["default"].createElement("span", null, loading ? loader : subscribed ? 'Joined' : 'Subscribe'));
    }
  }]);
  return SubscribeButton;
}(_react["default"].Component);
SubscribeButton.propTypes = {
  username: _propTypes["default"].string,
  subscribed: _propTypes["default"].bool.isRequired,
  community: _propTypes["default"].object.isRequired //TODO: Define this shape
};
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, ownProps) {
  return _objectSpread(_objectSpread({}, ownProps), {}, {
    username: state.user.getIn(['current', 'username']),
    subscribed: state.global.getIn(['community', ownProps.community, 'context', 'subscribed'], false),
    community: state.global.getIn(['community', ownProps.community], {})
  });
}, function (dispatch) {
  return {
    stateSet: function stateSet(key, value) {
      dispatch(globalActions.set({
        key: key,
        value: value
      }));
    },
    toggleSubscribe: function toggleSubscribe(subscribeToCommunity, community, account, successCallback, errorCallback) {
      var action = 'unsubscribe';
      if (subscribeToCommunity) action = 'subscribe';
      var payload = [action, {
        community: community
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
    }
  };
})(SubscribeButton);