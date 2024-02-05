"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _default = exports["default"] = function _default(_ref) {
  var children = _ref.children,
    className = _ref.className,
    t = _ref.t;
  return /*#__PURE__*/_react["default"].createElement("span", {
    title: t,
    className: className
  }, children);
};