"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
// import tt from 'counterpart';
// import { SIGNUP_URL } from 'shared/constants';

var SidebarNewUsers = function SidebarNewUsers() {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "c-sidebar__module"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "c-sidebar__header"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "c-sidebar__h3"
  }, "Explore Blurt?")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "c-sidebar__content"
  }, /*#__PURE__*/_react["default"].createElement("ul", {
    className: "c-sidebar__list"
  }, /*#__PURE__*/_react["default"].createElement("li", {
    className: "c-sidebar__list-item"
  }, /*#__PURE__*/_react["default"].createElement("a", {
    className: "c-sidebar__link",
    href: "/welcome"
  }, "Quick start guide")), /*#__PURE__*/_react["default"].createElement("li", {
    className: "c-sidebar__list-item"
  }, /*#__PURE__*/_react["default"].createElement("a", {
    className: "c-sidebar__link",
    href: "https://blocks.blurtwallet.com"
  }, "Block Explorer")), /*#__PURE__*/_react["default"].createElement("li", {
    className: "c-sidebar__list-item"
  }, /*#__PURE__*/_react["default"].createElement("a", {
    className: "c-sidebar__link",
    href: "".concat($STM_Config.wallet_url, "/~witnesses")
  }, "Vote for Witnesses")), /*#__PURE__*/_react["default"].createElement("li", {
    className: "c-sidebar__list-item"
  }, /*#__PURE__*/_react["default"].createElement("a", {
    className: "c-sidebar__link",
    href: "".concat($STM_Config.wallet_url, "/proposals")
  }, "Blurt Proposals")))));
};
var _default = exports["default"] = SidebarNewUsers;