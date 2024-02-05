"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-15"));
var _LoadingIndicator = _interopRequireDefault(require("app/components/elements/LoadingIndicator"));
var _Icon = _interopRequireDefault(require("app/components/elements/Icon"));
var _Flag = _interopRequireDefault(require("app/components/modules/Flag"));
/* global describe, it, before, beforeEach, after, afterEach */

(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact["default"]()
});
describe('Flag', function () {
  var component = /*#__PURE__*/_react["default"].createElement(_LoadingIndicator["default"], null);
  var fallback = /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
    name: "user"
  });
  var child = /*#__PURE__*/_react["default"].createElement("div", null, " HELLO WORLD ");
  it('should render the children  when the flag prop is true', function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_Flag["default"], {
      flagged: true,
      FlagComponent: component,
      Fallback: fallback,
      children: child
    }));
    expect(wrapper.text()).toEqual(' HELLO WORLD ');
  });
  it('should render the FlagComponent  when the flag prop is true and there are no children', function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_Flag["default"], {
      flagged: true,
      FlagComponent: component,
      Fallback: fallback
    }));
    expect(wrapper.text()).toEqual('<LoadingIndicator />');
  });
  it('should render null when the flag condition fails and no fallback is provided', function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_Flag["default"], {
      flagged: false,
      FlagComponent: component
    }));
    expect(wrapper.html()).toBe(null);
  });
  it('should render the fallback component if the flag condition is false', function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_Flag["default"], {
      flagged: false,
      FlagComponent: component,
      Fallback: fallback
    }));
    expect(wrapper.html()).not.toBe(null);
    expect(wrapper.text()).toEqual('<Icon />');
  });
  it('should render children but not FlagComponent if both are provided', function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_Flag["default"], {
      flagged: true,
      FlagComponent: component,
      Fallback: fallback,
      children: child
    }));
    // There isn't a good way to check for proptypes errors
    // see https://stackoverflow.com/questions/26124914/how-to-test-react-proptypes-through-jest
    expect(wrapper.text()).toEqual(' HELLO WORLD ');
  });
});