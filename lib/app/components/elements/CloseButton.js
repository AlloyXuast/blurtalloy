"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.CloseButton = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _excluded = ["className"];
var CloseButton = exports.CloseButton = function CloseButton(_ref) {
  var className = _ref.className,
    restProps = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement("button", (0, _extends2["default"])({}, restProps, {
    className: "close-button",
    type: "button"
  }), "\xD7");
};
CloseButton.propTypes = {
  className: _propTypes["default"].string
};
var _default = exports["default"] = CloseButton;