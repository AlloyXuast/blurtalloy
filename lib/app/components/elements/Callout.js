"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _default = exports["default"] = function _default(_ref) {
  var title = _ref.title,
    children = _ref.children,
    type = _ref.type;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "column"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: 'callout' + (type ? " ".concat(type) : '')
  }, /*#__PURE__*/_react["default"].createElement("h4", null, title), /*#__PURE__*/_react["default"].createElement("div", null, children))));
};