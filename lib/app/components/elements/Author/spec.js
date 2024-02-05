"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _index = _interopRequireDefault(require("./index"));
var _RootReducer = _interopRequireDefault(require("app/redux/RootReducer"));
var _enzyme = require("enzyme");
var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-15"));
(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact["default"]()
});
var store = (0, _redux.createStore)(_RootReducer["default"]);
describe('<Author />', function () {
  var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_reactRedux.Provider, {
    store: store
  }, /*#__PURE__*/_react["default"].createElement(_index["default"], null)));
  var container = wrapper.instance();
  it('renders without crashing', function () {
    expect(wrapper).toBeTruthy();
    expect(container).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});