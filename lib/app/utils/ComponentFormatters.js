"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authorNameAndRep = void 0;
var _react = _interopRequireDefault(require("react"));
var authorNameAndRep = exports.authorNameAndRep = function authorNameAndRep(author, authorRepLog10) {
  return /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("strong", null, author), authorRepLog10 != null && /*#__PURE__*/_react["default"].createElement("span", {
    style: {
      fontWeight: 'normal'
    }
  }, " (", authorRepLog10, ")"));
};