"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _reactRouter = require("react-router");
var _immutable = require("immutable");
var _FetchDataSaga = require("app/redux/FetchDataSaga");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var PostCategoryHeader = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(PostCategoryHeader, _React$Component);
  function PostCategoryHeader() {
    (0, _classCallCheck2["default"])(this, PostCategoryHeader);
    return _callSuper(this, PostCategoryHeader, arguments);
  }
  (0, _createClass2["default"])(PostCategoryHeader, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this$props = this.props,
        communityName = _this$props.communityName,
        getCommunity = _this$props.getCommunity,
        community = _this$props.community;
      if (communityName && !community && /^blurt-[0-9]*$/.test(communityName)) getCommunity(communityName);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props2 = this.props,
        communityName = _this$props2.communityName,
        getCommunity = _this$props2.getCommunity,
        community = _this$props2.community;
      if (prevProps.communityName != communityName) {
        if (communityName && !community && /^blurt-[0-9]*$/.test(communityName)) getCommunity(communityName);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
        username = _this$props3.username,
        communityName = _this$props3.communityName,
        community = _this$props3.community;
      var url = community ? '/trending/' + community.get('name') : null;
      var label = community ? /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
        to: url
      }, community.get('title')) : "@".concat(username, "'s blog");
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "PostCategoryHeader column small-12 "
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "postTo"
      }, /*#__PURE__*/_react["default"].createElement("small", null, "Posting to ", communityName ? 'Community: ' : '', /*#__PURE__*/_react["default"].createElement("span", {
        className: "smallLabel"
      }, label))));
    }
  }]);
  return PostCategoryHeader;
}(_react["default"].Component);
PostCategoryHeader.propTypes = {
  username: _propTypes["default"].string.isRequired,
  communityName: _propTypes["default"].string,
  communityTitle: _propTypes["default"].string
};
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, ownProps) {
  var username = state.user.getIn(['current', 'username'], null);
  var community = ownProps.communityTitle && ownProps.communityName ? (0, _immutable.Map)({
    name: ownProps.communityName,
    title: ownProps.communityTitle
  }) : state.global.getIn(['community', ownProps.communityName], null);
  return _objectSpread(_objectSpread({}, ownProps), {}, {
    community: community,
    username: username
  });
}, function (dispatch) {
  return {
    getCommunity: function getCommunity(communityName) {
      return dispatch(_FetchDataSaga.actions.getCommunity(communityName));
    }
  };
})(PostCategoryHeader);