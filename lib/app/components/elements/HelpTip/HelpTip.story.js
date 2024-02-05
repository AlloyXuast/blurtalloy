"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@storybook/react");
var _index = _interopRequireDefault(require("./index"));
var _IconButton = _interopRequireDefault(require("../IconButton"));
var _decorators = require("decorators");
(0, _react2.storiesOf)('Elements', module).addDecorator(_decorators.Center).add('HelpTip', function () {
  return /*#__PURE__*/_react["default"].createElement(_index["default"], {
    content: "Hello World"
  }, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], null));
});