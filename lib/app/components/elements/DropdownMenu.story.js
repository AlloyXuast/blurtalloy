"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@storybook/react");
var _addonKnobs = require("@storybook/addon-knobs");
var _DropdownMenu = _interopRequireDefault(require("./DropdownMenu"));
var _decorators = require("decorators");
var selectOptions = ['transfer', 'transfer to savings', 'power up'];
var mockMenu = [{
  value: 'transfer',
  link: '#',
  onClick: function onClick() {}
}, {
  value: 'transfer to savings',
  link: '#',
  onClick: function onClick() {}
}, {
  value: 'power up',
  link: '#',
  onClick: function onClick() {}
}];
(0, _react2.storiesOf)('Elements', module).addDecorator(_addonKnobs.withKnobs).addDecorator(_decorators.Center).add('DropdownMenu', function () {
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", null, "Dropdown Menu"), /*#__PURE__*/_react["default"].createElement(_DropdownMenu["default"], {
    title: "Other actions",
    key: "_others",
    items: mockMenu,
    el: "div",
    selected: (0, _addonKnobs.select)('Currently Selected', selectOptions, 'power up')
  }));
});