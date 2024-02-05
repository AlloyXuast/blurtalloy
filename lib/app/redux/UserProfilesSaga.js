"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = void 0;
exports.fetchUserProfile = fetchUserProfile;
exports.userProfilesWatches = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _effects = require("redux-saga/effects");
var userProfileActions = _interopRequireWildcard(require("./UserProfilesReducer"));
var _blurtApi = require("app/utils/blurtApi");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var _marked = /*#__PURE__*/_regenerator["default"].mark(fetchUserProfile);
var FETCH_PROFILE = 'userProfilesSaga/FETCH_PROFILE';
var userProfilesWatches = exports.userProfilesWatches = [(0, _effects.takeLatest)(FETCH_PROFILE, fetchUserProfile)];
function fetchUserProfile(action) {
  var _action$payload, account, observer, ret;
  return _regenerator["default"].wrap(function fetchUserProfile$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _action$payload = action.payload, account = _action$payload.account, observer = _action$payload.observer;
        _context.next = 3;
        return (0, _effects.call)(_blurtApi.callBridge, 'get_profile', {
          account: account,
          observer: observer
        });
      case 3:
        ret = _context.sent;
        if (ret) {
          _context.next = 6;
          break;
        }
        throw new Error('Account not found');
      case 6:
        _context.next = 8;
        return (0, _effects.put)(userProfileActions.addProfile({
          username: account,
          account: ret
        }));
      case 8:
      case "end":
        return _context.stop();
    }
  }, _marked);
}

// Action creators
var actions = exports.actions = {
  fetchProfile: function fetchProfile(payload) {
    return {
      type: FETCH_PROFILE,
      payload: payload
    };
  }
};