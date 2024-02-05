"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _ParsersAndFormatters = require("app/utils/ParsersAndFormatters");
var FormattedAsset = function FormattedAsset(_ref) {
  var amount = _ref.amount,
    asset = _ref.asset,
    classname = _ref.classname;
  if (amount && typeof amount === 'string') {
    amount = (0, _ParsersAndFormatters.parsePayoutAmount)(amount);
  }
  var amnt = (0, _ParsersAndFormatters.formatDecimal)(amount);
  return asset === '$' ? /*#__PURE__*/_react["default"].createElement("span", {
    className: "FormattedAsset ".concat(classname)
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "prefix"
  }, "$"), /*#__PURE__*/_react["default"].createElement("span", {
    className: "integer"
  }, amnt[0]), /*#__PURE__*/_react["default"].createElement("span", {
    className: "decimal"
  }, amnt[1])) : /*#__PURE__*/_react["default"].createElement("span", {
    className: "FormattedAsset"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "integer"
  }, amnt[0]), /*#__PURE__*/_react["default"].createElement("span", {
    className: "decimal"
  }, amnt[1]), ' ', /*#__PURE__*/_react["default"].createElement("span", {
    className: "asset"
  }, asset));
};
var _default = exports["default"] = FormattedAsset;