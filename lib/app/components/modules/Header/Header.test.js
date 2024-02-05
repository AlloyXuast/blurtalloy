"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-15"));
var _index = require("./index");
/* global describe, it, before, beforeEach, after, afterEach */

(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact["default"]()
});
beforeEach(function () {
  global.$STM_Config = {};
});
describe('Header', function () {
  it('contains class .header', function () {
    global.$STM_Config = {
      read_only_mode: false
    };
    var header = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_index._Header_, {
      pathname: "whatever"
    }));
    console.log(header.closest('header.header'));
    expect(header.closest('header.header').length).toBe(1);
  });
});