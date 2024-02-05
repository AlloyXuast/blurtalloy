"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addProfile = void 0;
exports["default"] = reducer;
var _immutable = require("immutable");
// Action constants
var ADD_USER_PROFILE = 'user_profile/ADD';
var defaultState = (0, _immutable.fromJS)({
  profiles: {}
});
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var payload = action.payload;
  switch (action.type) {
    case ADD_USER_PROFILE:
      {
        if (payload) {
          return state.setIn(['profiles', payload.username], (0, _immutable.fromJS)(payload.account));
        }
        return state;
      }
    default:
      return state;
  }
}

// Action creators
var addProfile = exports.addProfile = function addProfile(payload) {
  return {
    type: ADD_USER_PROFILE,
    payload: payload
  };
};