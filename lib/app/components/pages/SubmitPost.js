"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireDefault(require("react"));
var _reactRouter = require("react-router");
var _ReplyEditor = _interopRequireDefault(require("app/components/elements/ReplyEditor"));
var _constants = require("shared/constants");
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var formId = _constants.SUBMIT_FORM_ID;
// const richTextEditor = process.env.BROWSER ? require('react-rte-image').default : null;
// const SubmitReplyEditor = ReplyEditor(formId, richTextEditor);
var SubmitReplyEditor = (0, _ReplyEditor["default"])(formId);
var SubmitPost = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(SubmitPost, _React$Component);
  // static propTypes = {
  //     routeParams: PropTypes.object.isRequired,
  // }
  function SubmitPost() {
    var _this;
    (0, _classCallCheck2["default"])(this, SubmitPost);
    _this = _callSuper(this, SubmitPost);
    _this.success = function /* operation */
    () {
      // const { category } = operation
      localStorage.removeItem('replyEditorData-' + formId);
      _reactRouter.browserHistory.push('/created'); // '/category/' + category)
    };
    return _this;
  }
  (0, _createClass2["default"])(SubmitPost, [{
    key: "render",
    value: function render() {
      var success = this.success;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "SubmitPost"
      }, /*#__PURE__*/_react["default"].createElement(SubmitReplyEditor, {
        type: "submit_story",
        successCallback: success
      }));
    }
  }]);
  return SubmitPost;
}(_react["default"].Component);
module.exports = {
  path: 'submit.html',
  component: SubmitPost // connect(state => ({ global: state.global }))(SubmitPost)
};