"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@storybook/react");
var _Reputation = _interopRequireDefault(require("./Reputation"));
var _decorators = require("decorators");
(0, _react2.storiesOf)('Elements', module).addDecorator(_decorators.Center).add('Reputation', function () {
  return /*#__PURE__*/_react["default"].createElement(_Reputation["default"], {
    value: 1200
  });
});