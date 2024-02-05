"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _reactRouter = require("react-router");
var _LoadingIndicator = _interopRequireDefault(require("app/components/elements/LoadingIndicator"));
var _FetchDataSaga = require("app/redux/FetchDataSaga");
var _Callout = _interopRequireDefault(require("app/components/elements/Callout"));
var _counterpart = _interopRequireDefault(require("counterpart"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var SubscriptionsList = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(SubscriptionsList, _React$Component);
  function SubscriptionsList() {
    (0, _classCallCheck2["default"])(this, SubscriptionsList);
    return _callSuper(this, SubscriptionsList);
  }
  (0, _createClass2["default"])(SubscriptionsList, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this$props = this.props,
        username = _this$props.username,
        getAccountSubscriptions = _this$props.getAccountSubscriptions;
      if (username) {
        getAccountSubscriptions(username);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props2 = this.props,
        username = _this$props2.username,
        getAccountSubscriptions = _this$props2.getAccountSubscriptions;
      if (prevProps.username !== username) {
        getAccountSubscriptions(username);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
        subscriptions = _this$props3.subscriptions,
        loading = _this$props3.loading;
      var renderItem = function renderItem(tuple) {
        var _tuple = (0, _slicedToArray2["default"])(tuple, 4),
          hive = _tuple[0],
          name = _tuple[1],
          role = _tuple[2],
          title = _tuple[3];
        return /*#__PURE__*/_react["default"].createElement("li", {
          key: hive
        }, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
          to: '/trending/' + hive
        }, name || hive), /*#__PURE__*/_react["default"].createElement("span", {
          className: "user_role"
        }, role), title && /*#__PURE__*/_react["default"].createElement("span", {
          className: "affiliation"
        }, title));
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: ""
      }, /*#__PURE__*/_react["default"].createElement("h4", null, (0, _counterpart["default"])('g.subscriptions')), subscriptions && subscriptions.length > 0 && /*#__PURE__*/_react["default"].createElement("ul", null, subscriptions.map(function (item) {
        return renderItem(item);
      })), subscriptions.length === 0 && !loading && /*#__PURE__*/_react["default"].createElement(_Callout["default"], null, "Welcome! You don't have any subscriptions yet."), loading && /*#__PURE__*/_react["default"].createElement("center", null, /*#__PURE__*/_react["default"].createElement(_LoadingIndicator["default"], {
        style: {
          marginBottom: '2rem'
        },
        type: "circle"
      })));
    }
  }]);
  return SubscriptionsList;
}(_react["default"].Component);
(0, _defineProperty2["default"])(SubscriptionsList, "propTypes", {
  username: _propTypes["default"].string.isRequired,
  subscriptions: _propTypes["default"].arrayOf(_propTypes["default"].arrayOf(_propTypes["default"].string)),
  loading: _propTypes["default"].bool
});
(0, _defineProperty2["default"])(SubscriptionsList, "defaultProps", {
  subscriptions: [],
  loading: true
});
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, props) {
  var isOwnAccount = state.user.getIn(['current', 'username'], '') === props.username;
  var loading = state.global.getIn(['subscriptions', 'loading']);
  var subscriptions = state.global.getIn(['subscriptions', props.username]);
  return _objectSpread(_objectSpread({}, props), {}, {
    subscriptions: subscriptions ? subscriptions.toJS() : [],
    isOwnAccount: isOwnAccount,
    loading: loading
  });
}, function (dispatch) {
  return {
    getAccountSubscriptions: function getAccountSubscriptions(username) {
      return dispatch(_FetchDataSaga.actions.getSubscriptions(username));
    }
  };
})(SubscriptionsList);