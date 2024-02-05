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
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireDefault(require("react"));
var _reactIntl = require("react-intl");
var _Tooltip = _interopRequireDefault(require("app/components/elements/Tooltip"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* eslint react/prop-types: 0 */
var ContentEditedWrapper = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(ContentEditedWrapper, _React$Component);
  function ContentEditedWrapper() {
    (0, _classCallCheck2["default"])(this, ContentEditedWrapper);
    return _callSuper(this, ContentEditedWrapper, arguments);
  }
  (0, _createClass2["default"])(ContentEditedWrapper, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        createDate = _this$props.createDate,
        updateDate = _this$props.updateDate,
        className = _this$props.className;
      if (createDate === updateDate) return null;
      if (updateDate && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d$/.test(updateDate)) {
        updateDate = updateDate + 'Z'; // Firefox really wants this Z (Zulu)
      }
      var dt = new Date(updateDate);
      var date_time = "".concat(this.props.intl.formatDate(dt), " ").concat(this.props.intl.formatTime(dt));
      return /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
        t: date_time,
        className: className
      }, "(edited)");
    }
  }]);
  return ContentEditedWrapper;
}(_react["default"].Component);
var _default = exports["default"] = (0, _reactIntl.injectIntl)(ContentEditedWrapper);