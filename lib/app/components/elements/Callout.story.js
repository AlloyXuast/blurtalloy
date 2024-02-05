"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@storybook/react");
var _addonKnobs = require("@storybook/addon-knobs");
var _Callout = _interopRequireDefault(require("./Callout"));
var _decorators = require("decorators");
var selectOptions = ['error', 'default'];
(0, _react2.storiesOf)('Elements', module).addDecorator(_addonKnobs.withKnobs).addDecorator(_decorators.Center).add('Callout', function () {
  return /*#__PURE__*/_react["default"].createElement(_Callout["default"], {
    type: (0, _addonKnobs.select)('Callout style', selectOptions, 'default')
  }, /*#__PURE__*/_react["default"].createElement("span", null, " Callout, you can add an error style with the knob"));
});