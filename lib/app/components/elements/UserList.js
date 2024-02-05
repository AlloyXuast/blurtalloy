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
var _UserListRow = _interopRequireDefault(require("app/components/cards/UserListRow"));
var _counterpart = _interopRequireDefault(require("counterpart"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* eslint react/prop-types: 0 */
var PER_PAGE = 50;
var UserList = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(UserList, _React$Component);
  function UserList() {
    var _this;
    (0, _classCallCheck2["default"])(this, UserList);
    _this = _callSuper(this, UserList);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_setHistoryPagePrevious", function () {
      var newIndex = _this.state.historyIndex - PER_PAGE;
      _this.setState({
        historyIndex: Math.max(0, newIndex)
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_setHistoryPageNext", function () {
      var newIndex = _this.state.historyIndex + PER_PAGE;
      _this.setState({
        historyIndex: Math.max(0, newIndex)
      });
    });
    _this.state = {
      historyIndex: 0
    };
    return _this;
  }
  (0, _createClass2["default"])(UserList, [{
    key: "render",
    value: function render() {
      var historyIndex = this.state.historyIndex;
      var users = this.props.users;
      var title = this.props.title;
      var idx = 0;
      var user_list = users.map(function (user) {
        return /*#__PURE__*/_react["default"].createElement(_UserListRow["default"], {
          user: user,
          key: idx++
        });
      });
      user_list = user_list.toArray();
      var currentIndex = -1;
      var usersLength = users.size;
      var limitedIndex = Math.min(historyIndex, usersLength - PER_PAGE);
      user_list = user_list.reverse().filter(function () {
        currentIndex++;
        return currentIndex >= limitedIndex && currentIndex < limitedIndex + PER_PAGE;
      });
      var navButtons = /*#__PURE__*/_react["default"].createElement("nav", null, /*#__PURE__*/_react["default"].createElement("ul", {
        className: "pager"
      }, /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: 'button tiny hollow float-left ' + (historyIndex === 0 ? ' disabled' : ''),
        onClick: this._setHistoryPagePrevious,
        "aria-label": (0, _counterpart["default"])('g.previous')
      }, /*#__PURE__*/_react["default"].createElement("span", {
        "aria-hidden": "true"
      }, "\u2190 ", (0, _counterpart["default"])('g.previous')))), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: 'button tiny hollow float-right ' + (historyIndex >= usersLength - PER_PAGE ? ' disabled' : ''),
        onClick: historyIndex >= usersLength - PER_PAGE ? null : this._setHistoryPageNext,
        "aria-label": (0, _counterpart["default"])('g.next')
      }, /*#__PURE__*/_react["default"].createElement("span", {
        "aria-hidden": "true"
      }, (0, _counterpart["default"])('g.next'), " \u2192")))));
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "UserList"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column small-12"
      }, /*#__PURE__*/_react["default"].createElement("h3", null, title), navButtons, /*#__PURE__*/_react["default"].createElement("table", null, /*#__PURE__*/_react["default"].createElement("tbody", null, user_list)), navButtons)));
    }
  }]);
  return UserList;
}(_react["default"].Component);
var _default = exports["default"] = UserList;