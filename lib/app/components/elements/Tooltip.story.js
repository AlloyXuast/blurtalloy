"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@storybook/react");
var _addonKnobs = require("@storybook/addon-knobs");
var _decorators = require("decorators");
var _Tooltip = _interopRequireDefault(require("./Tooltip"));
var widthOptions = {
  range: true,
  min: 300,
  max: 1200,
  step: 1
};
(0, _react2.storiesOf)('Elements', module).addDecorator(_addonKnobs.withKnobs).addDecorator(_decorators.Center).add('Tooltip', function () {
  return /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
    t: (0, _addonKnobs.text)('tooltip text', 'a helpful lil tip')
  }, /*#__PURE__*/_react["default"].createElement("span", null, "Hover Over Me To See The Tooltip."));
});