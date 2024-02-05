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
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _counterpart = _interopRequireDefault(require("counterpart"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var UserTitleEditor = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(UserTitleEditor, _Component);
  function UserTitleEditor(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, UserTitleEditor);
    _this = _callSuper(this, UserTitleEditor, [props]);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onInput", function (event) {
      var newState = {};
      var newValue = event.target.value || '';
      if (event.target.hasOwnProperty('checked')) newValue = event.target.checked;
      newState[event.target.name] = newValue;
      _this.setState(newState);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onSubmit", function () {
      _this.props.onSubmit(_this.state.title.trim());
    });
    _this.state = {
      title: _this.props.title ? _this.props.title : ''
    };
    return _this;
  }
  (0, _createClass2["default"])(UserTitleEditor, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var title = this.state.title;
      var _this$props = this.props,
        username = _this$props.username,
        community = _this$props.community;
      return /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h4", null, (0, _counterpart["default"])('g.community_user_title_edit_description', {
        community: community,
        username: username
      }))), /*#__PURE__*/_react["default"].createElement("hr", null), /*#__PURE__*/_react["default"].createElement("div", {
        className: "input-group"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "input-group-label"
      }, "Title"), /*#__PURE__*/_react["default"].createElement("input", {
        className: "input-group-field",
        type: "text",
        maxLength: 32,
        name: "title",
        value: title,
        onChange: function onChange(e) {
          return _this2.onInput(e);
        }
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "text-right"
      }, /*#__PURE__*/_react["default"].createElement("button", {
        className: "button",
        type: "submit",
        onClick: function onClick() {
          return _this2.onSubmit();
        }
      }, "Save")));
    }
  }]);
  return UserTitleEditor;
}(_react.Component);
UserTitleEditor.propTypes = {
  onSubmit: _propTypes["default"].func.isRequired,
  title: _propTypes["default"].string,
  username: _propTypes["default"].string.isRequired,
  community: _propTypes["default"].string.isRequired
};
UserTitleEditor.defaultProps = {
  title: ''
};
var _default = exports["default"] = (0, _reactRedux.connect)()(UserTitleEditor);