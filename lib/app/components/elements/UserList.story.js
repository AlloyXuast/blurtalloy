"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@storybook/react");
var _addonKnobs = require("@storybook/addon-knobs");
var _immutable = require("immutable");
var _RootReducer = _interopRequireDefault(require("app/redux/RootReducer"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _decorators = require("decorators");
var _UserList = _interopRequireDefault(require("./UserList"));
var store = (0, _redux.createStore)(_RootReducer["default"]);
var options = {
  range: true,
  min: 0,
  max: 150,
  step: 1
};
(0, _react2.storiesOf)('Elements', module).addDecorator(_addonKnobs.withKnobs).addDecorator(_decorators.Center).addDecorator(function (getStory) {
  return /*#__PURE__*/_react["default"].createElement(_reactRedux.Provider, {
    store: store
  }, getStory());
}).add('UserList', function () {
  var mockUsers = (0, _immutable.List)(Array((0, _addonKnobs.number)('number of users', 10, options)).fill('test'));
  return /*#__PURE__*/_react["default"].createElement(_UserList["default"], {
    users: mockUsers,
    title: "User List"
  });
});