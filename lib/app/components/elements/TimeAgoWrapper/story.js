"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@storybook/react");
var _addonKnobs = require("@storybook/addon-knobs");
var _decorators = require("decorators");
var _reactIntl = require("react-intl");
var _ = _interopRequireDefault(require("./"));
(0, _react2.storiesOf)('Elements', module).addDecorator(_addonKnobs.withKnobs).addDecorator(_decorators.Center).add('TimeAgoWrapper', function () {
  return /*#__PURE__*/_react["default"].createElement(_reactIntl.IntlProvider, {
    locale: "en"
  }, /*#__PURE__*/_react["default"].createElement(_["default"], {
    date: (0, _addonKnobs.date)('date', new Date('1 Jul 2016'))
  }));
});