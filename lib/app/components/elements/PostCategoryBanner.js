"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _FetchDataSaga = require("app/redux/FetchDataSaga");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var PostCategoryBanner = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(PostCategoryBanner, _React$Component);
  function PostCategoryBanner(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, PostCategoryBanner);
    _this = _callSuper(this, PostCategoryBanner, [props]);
    var username = props.username,
      subscriptions = props.subscriptions,
      getAccountSubscriptions = props.getAccountSubscriptions;
    if (username && subscriptions.length === 0) {
      getAccountSubscriptions(username);
    }
    return _this;
  }
  (0, _createClass2["default"])(PostCategoryBanner, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        subscriptions = _this$props.subscriptions,
        onChange = _this$props.onChange,
        category = _this$props.category;
      var onCommunitySelected = function onCommunitySelected(e) {
        var destination = e.target.value;
        var name = subscriptions.find(function (subs) {
          return subs[0] === destination;
        });
        name = name && name.length >= 2 ? name[1] : null;
        onChange(destination, name);
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "PostCategoryBanner"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "postTo"
      }, /*#__PURE__*/_react["default"].createElement("small", null, "Posting to:", ' ', /*#__PURE__*/_react["default"].createElement("select", {
        className: "PostCategoryBanner--community-selector",
        value: category || '',
        onChange: onCommunitySelected
      }, /*#__PURE__*/_react["default"].createElement("option", {
        value: "blog"
      }, "My blog"), /*#__PURE__*/_react["default"].createElement("optgroup", {
        label: "Subscribed Communities"
      }, subscriptions && subscriptions.map(function (entry) {
        var _entry = (0, _slicedToArray2["default"])(entry, 2),
          hive = _entry[0],
          name = _entry[1];
        return /*#__PURE__*/_react["default"].createElement("option", {
          value: hive,
          key: hive
        }, name);
      }))))));
    }
  }]);
  return PostCategoryBanner;
}(_react["default"].Component);
PostCategoryBanner.propTypes = {
  username: _propTypes["default"].string.isRequired,
  category: _propTypes["default"].string,
  subscriptions: _propTypes["default"].arrayOf(_propTypes["default"].arrayOf(_propTypes["default"].string))
};
PostCategoryBanner.defaultProps = {
  category: 'blog',
  subscriptions: []
};
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, ownProps) {
  var user = state.user,
    global = state.global;
  var username = user.getIn(['current', 'username'], null);
  var subscriptions = global.getIn(['subscriptions', username]);
  return _objectSpread(_objectSpread({}, ownProps), {}, {
    username: username,
    subscriptions: subscriptions ? subscriptions.toJS() : []
  });
}, function (dispatch) {
  return {
    getAccountSubscriptions: function getAccountSubscriptions(username) {
      return dispatch(_FetchDataSaga.actions.getSubscriptions(username));
    }
  };
})(PostCategoryBanner);