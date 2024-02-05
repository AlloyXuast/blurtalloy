"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-15"));
var _index = require("./index");
(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact["default"]()
});
describe('Memo', function () {
  it('should return an empty span if no text is provided', function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_index.Memo, {
      fromNegativeRepUser: false
    }));
    expect(wrapper.html()).toEqual('<span></span>');
  });
  it('should render a plain ol memo', function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_index.Memo, {
      fromNegativeRepUser: false,
      text: "hi dude"
    }));
    expect(wrapper.html()).toEqual('<span class="Memo">hi dude</span>');
  });
});