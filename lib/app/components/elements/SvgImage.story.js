"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@storybook/react");
var _addonKnobs = require("@storybook/addon-knobs");
var _SvgImage = _interopRequireDefault(require("./SvgImage"));
var _Icon = require("./Icon.story");
var svgs = ['404', 'facebook', 'reddit', 'steemit'];
var options = {
  range: true,
  min: 10,
  max: 200,
  step: 1
};
(0, _react2.storiesOf)('Elements', module).addDecorator(_addonKnobs.withKnobs).add('SvgImage', function () {
  return /*#__PURE__*/_react["default"].createElement(_Icon.Grid, null, svgs.map(function (svg) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: svg
    }, /*#__PURE__*/_react["default"].createElement(_SvgImage["default"], {
      name: svg,
      width: String((0, _addonKnobs.number)('width', 100, options)) + 'px',
      height: String((0, _addonKnobs.number)('height', 100, options)) + 'px'
    }), /*#__PURE__*/_react["default"].createElement("p", null, " ", svg, " "));
  }));
});