"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = reducer;
var _immutable = _interopRequireDefault(require("immutable"));
var defaultState = _immutable["default"].fromJS({
  user: {}
});
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (action.type === 'user/SAVE_LOGIN_CONFIRM') {
    if (!action.payload) {
      state = state.set('account', null);
    }
  }
  return state;
}