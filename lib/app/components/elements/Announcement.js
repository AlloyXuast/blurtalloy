"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Announcement = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var Announcement = exports.Announcement = function Announcement(_ref) {
  var onClose = _ref.onClose;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "annoucement-banner"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "announcement-banner__text"
  }), /*#__PURE__*/_react["default"].createElement("button", {
    className: "close-button",
    type: "button",
    onClick: onClose
  }, "\xD7"));
};
Announcement.propTypes = {
  onClose: _propTypes["default"].func.isRequired
};
var _default = exports["default"] = Announcement;