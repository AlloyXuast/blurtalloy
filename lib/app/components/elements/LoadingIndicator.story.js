"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@storybook/react");
var _LoadingIndicator = _interopRequireDefault(require("./LoadingIndicator"));
var _LoadingIndicator2 = _interopRequireDefault(require("./LoadingIndicator.scss"));
(0, _react2.storiesOf)('Elements', module).add('LoadingIndicator', function () {
  return /*#__PURE__*/_react["default"].createElement(_LoadingIndicator["default"], null);
});