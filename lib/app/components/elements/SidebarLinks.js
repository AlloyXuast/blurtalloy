"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _counterpart = _interopRequireDefault(require("counterpart"));
var _reactRouter = require("react-router");
/* global $STM_Config */

var SidebarLinks = function SidebarLinks(_ref) {
  var username = _ref.username;
  var userLinks = [{
    text: (0, _counterpart["default"])('g.my_feed'),
    link: "/@".concat(username, "/feed"),
    type: 'link'
  }, {
    text: (0, _counterpart["default"])('g.my_blog'),
    link: "/@".concat(username),
    type: 'link'
  }, {
    text: (0, _counterpart["default"])('g.my_notifications'),
    link: "/@".concat(username, "/notifications"),
    type: 'link'
  }, {
    text: (0, _counterpart["default"])('g.my_wallet'),
    link: "".concat($STM_Config.wallet_url, "/@") + username + '',
    type: 'href'
  }, {
    text: (0, _counterpart["default"])('g.my_explorer'),
    link: 'https://blocks.blurtwallet.com/#/@' + username,
    type: 'href'
  }];
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "c-sidebar__module"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "c-sidebar__header"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "c-sidebar__h3"
  }, (0, _counterpart["default"])('g.links'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "c-sidebar__content"
  }, /*#__PURE__*/_react["default"].createElement("ul", {
    className: "c-sidebar__list"
  }, username && userLinks.map(function (element, index) {
    return /*#__PURE__*/_react["default"].createElement("li", {
      className: "c-sidebar__list-item",
      key: "".concat(element.text, "-").concat(index)
    }, element.type === 'link' ? /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
      className: "c-sidebar__link",
      to: element.link
    }, element.text) : /*#__PURE__*/_react["default"].createElement("a", {
      className: "c-sidebar__link",
      href: element.link
    }, element.text));
  }))));
};
var _default = exports["default"] = SidebarLinks;