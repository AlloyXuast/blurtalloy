"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _counterpart = _interopRequireDefault(require("counterpart"));
var _default = exports["default"] = function _default(_ref) {
  var value = _ref.value;
  if (isNaN(value)) {
    console.log('Unexpected rep value:', value);
    return null;
  }
  return /*#__PURE__*/_react["default"].createElement("span", {
    className: "Reputation",
    title: (0, _counterpart["default"])('g.reputation')
  }, "(", value, ")");
};