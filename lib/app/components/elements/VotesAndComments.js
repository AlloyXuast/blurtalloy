"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
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
var _reactRouter = require("react-router");
var _reactRedux = require("react-redux");
var _Icon = _interopRequireDefault(require("app/components/elements/Icon"));
var _shouldComponentUpdate = _interopRequireDefault(require("app/utils/shouldComponentUpdate"));
var _counterpart = _interopRequireDefault(require("counterpart"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var VotesAndComments = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(VotesAndComments, _React$Component);
  function VotesAndComments(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, VotesAndComments);
    _this = _callSuper(this, VotesAndComments, [props]);
    _this.shouldComponentUpdate = (0, _shouldComponentUpdate["default"])((0, _assertThisInitialized2["default"])(_this), 'VotesAndComments');
    return _this;
  }
  (0, _createClass2["default"])(VotesAndComments, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        comments = _this$props.comments,
        commentsLink = _this$props.commentsLink,
        totalVotes = _this$props.totalVotes;
      var comments_tooltip = (0, _counterpart["default"])('votesandcomments_jsx.no_responses_yet_click_to_respond');
      if (comments > 0) comments_tooltip = (0, _counterpart["default"])('votesandcomments_jsx.response_count_tooltip', {
        count: comments
      });
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: "VotesAndComments"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: 'VotesAndComments__comments' + (comments === 0 ? ' no-comments' : '')
      }, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
        to: commentsLink,
        title: comments_tooltip
      }, /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
        name: comments > 1 ? 'chatboxes' : 'chatbox'
      }), "\xA0", comments)));
    }
  }]);
  return VotesAndComments;
}(_react["default"].Component);
(0, _defineProperty2["default"])(VotesAndComments, "propTypes", {
  // HTML properties
  post: _propTypes["default"].string.isRequired,
  commentsLink: _propTypes["default"].string.isRequired,
  // Redux connect properties
  comments: _propTypes["default"].number,
  totalVotes: _propTypes["default"].number
});
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, props) {
  var post = state.global.getIn(['content', props.post]);
  if (!post) return props;
  return _objectSpread(_objectSpread({}, props), {}, {
    totalVotes: post.getIn(['stats', 'total_votes']),
    comments: post.get('children')
  });
})(VotesAndComments);