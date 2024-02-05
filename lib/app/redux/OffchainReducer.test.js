"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _immutable = require("immutable");
var _OffchainReducer = _interopRequireDefault(require("./OffchainReducer"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var mockAction = {
  type: 'user/SAVE_LOGIN_CONFIRM'
};
var mockActionWithPayload = _objectSpread(_objectSpread({}, mockAction), {}, {
  payload: 'Foo Barman'
});
describe('offchain reducer', function () {
  it('should provide a nice initial state, with any payload', function () {
    var initial = (0, _OffchainReducer["default"])();
    var expected = (0, _immutable.Map)({
      user: (0, _immutable.Map)({})
    });
    expect(initial).toEqual(expected);
    var withPayload = (0, _OffchainReducer["default"])(initial, mockActionWithPayload);
    expect(withPayload).toEqual(expected);
  });
  it('should return an account of null when action has no payload', function () {
    var initial = (0, _OffchainReducer["default"])();
    var account = (0, _OffchainReducer["default"])(initial, mockAction);
    expect(account).toEqual((0, _immutable.Map)({
      user: (0, _immutable.Map)({}),
      account: null
    }));
  });
});