"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@storybook/react");
var _addonKnobs = require("@storybook/addon-knobs");
var _TransactionError = _interopRequireDefault(require("./TransactionError"));
var _decorators = require("decorators");
var _RootReducer = _interopRequireDefault(require("app/redux/RootReducer"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var store = (0, _redux.createStore)(_RootReducer["default"]);
(0, _react2.storiesOf)('Elements', module).addDecorator(_addonKnobs.withKnobs).addDecorator(_decorators.Center).addDecorator(function (getStory) {
  return /*#__PURE__*/_react["default"].createElement(_reactRedux.Provider, {
    store: store
  }, getStory());
}).add('TransactionError', function () {
  return /*#__PURE__*/_react["default"].createElement(_TransactionError["default"], {
    opType: "This is a test",
    error: "There was an error ey"
  });
});