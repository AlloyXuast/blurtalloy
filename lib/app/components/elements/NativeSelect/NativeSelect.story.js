"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@storybook/react");
var _index = _interopRequireDefault(require("./index"));
var _decorators = require("decorators");
var opts = function opts(topic) {
  return [{
    value: 'trending',
    label: 'TRENDY',
    link: "/trending/".concat(topic)
  }, {
    value: 'created',
    label: 'FRESH',
    link: "/created/".concat(topic)
  }, {
    value: 'hot',
    label: 'HOTTT!!!',
    link: "/hot/".concat(topic)
  }, {
    value: 'promoted',
    label: '$$$ SOLD OUT $$$',
    link: "/promoted/".concat(topic)
  }];
};
(0, _react2.storiesOf)('Elements', module).addDecorator(_decorators.Center).add('NativeSelect', function () {
  return /*#__PURE__*/_react["default"].createElement(_index["default"], {
    className: "Rat",
    onChange: function onChange(e) {
      console.log('arg:', e.value);
    },
    options: opts('cool')
  });
});