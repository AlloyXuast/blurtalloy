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
var _counterpart = _interopRequireDefault(require("counterpart"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var UserRole = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(UserRole, _Component);
  function UserRole(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, UserRole);
    _this = _callSuper(this, UserRole, [props]);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onInput", function (event) {
      event && event.preventDefault();
      _this.setState({
        newUsername: event.target.value
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onSelect", function (event) {
      event && event.preventDefault();
      _this.setState({
        newRole: event.target.value
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onSubmit", function () {
      if (_this.props.addUser) {
        if (_this.state.newUsername === '') {
          _this.setState({
            message: 'Please enter a valid username.'
          });
          return;
        }
        if (_this.state.newUsername[0] === '@') {
          _this.setState({
            message: 'Please enter a username without "@".'
          });
          return;
        }
        _this.props.onSubmit(_this.state.newUsername.trim(), _this.state.newRole.trim());
      } else {
        if (_this.props.role === _this.state.newRole) {
          _this.setState({
            message: 'The user already has that role.'
          });
          return;
        }
        _this.props.onSubmit(_this.state.newRole.trim());
      }
    });
    _this.state = {
      newUsername: '',
      newRole: _this.props.role,
      message: ''
    };
    return _this;
  }
  (0, _createClass2["default"])(UserRole, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$state = this.state,
        newRole = _this$state.newRole,
        message = _this$state.message,
        newUsername = _this$state.newUsername;
      var _this$props = this.props,
        username = _this$props.username,
        community = _this$props.community,
        availableRoles = _this$props.availableRoles,
        addUser = _this$props.addUser;
      var roleSelector = availableRoles.map(function (role) {
        return /*#__PURE__*/_react["default"].createElement("option", {
          value: role
        }, role);
      });
      var editUserModalHeader = /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h4", null, (0, _counterpart["default"])('g.community_user_role_edit_header')), /*#__PURE__*/_react["default"].createElement("hr", null));
      var addUserModalHeader = /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h4", null, (0, _counterpart["default"])('g.community_user_role_add_header')), /*#__PURE__*/_react["default"].createElement("p", null, (0, _counterpart["default"])('g.community_user_role_add_description', {
        community: community
      })));
      return /*#__PURE__*/_react["default"].createElement("span", null, addUser ? addUserModalHeader : editUserModalHeader, /*#__PURE__*/_react["default"].createElement("div", {
        className: "input-group"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "input-group-label"
      }, "Username"), /*#__PURE__*/_react["default"].createElement("input", {
        className: "input-group-field",
        type: "text",
        maxLength: 32,
        name: "username",
        value: addUser ? newUsername : username,
        onChange: function onChange(e) {
          return _this2.onInput(e);
        },
        disabled: !addUser
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "input-group"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "input-group-label"
      }, "Role"), /*#__PURE__*/_react["default"].createElement("select", {
        value: newRole,
        onChange: this.onSelect,
        required: true
      }, roleSelector)), /*#__PURE__*/_react["default"].createElement("div", {
        className: "text-right"
      }, /*#__PURE__*/_react["default"].createElement("button", {
        className: "button",
        type: "submit",
        onClick: function onClick() {
          return _this2.onSubmit();
        }
      }, "Save")), /*#__PURE__*/_react["default"].createElement("div", null, message.length > 0 && message), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h5", null, "Role Permissions"), /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("strong", null, "Owner"), " - assign admins", /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("strong", null, "Admin"), " - edit settings, assign mods", /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("strong", null, "Moderator"), " - mute, pin, set user titles", /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("strong", null, "Member"), " - listed on leadership team", /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("strong", null, "Guest"), " - default; can post and comment", /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("strong", null, "Muted"), " - new posts automatically muted")));
    }
  }]);
  return UserRole;
}(_react.Component);
UserRole.propTypes = {
  onSubmit: _propTypes["default"].func.isRequired,
  username: _propTypes["default"].string.isRequired,
  community: _propTypes["default"].string.isRequired,
  role: _propTypes["default"].string.isRequired,
  availableRoles: _propTypes["default"].arrayOf(_propTypes["default"].string).isRequired,
  addUser: _propTypes["default"].bool.isRequired
};
var _default = exports["default"] = UserRole;