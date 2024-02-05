"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@storybook/react");
var _TagList = _interopRequireDefault(require("./TagList"));
var _decorators = require("decorators");
var mockPost = {
  json_metadata: {
    tags: ['water', 'snow', 'ice', 'steam']
  }
};
(0, _react2.storiesOf)('Elements', module).addDecorator(_decorators.Center).add('TagList', function () {
  return /*#__PURE__*/_react["default"].createElement(_TagList["default"], {
    post: mockPost
  });
});