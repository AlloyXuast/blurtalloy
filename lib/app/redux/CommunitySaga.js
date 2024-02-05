"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.communityWatches = void 0;
exports.getCommunityRoles = getCommunityRoles;
exports.getCommunitySubscribers = getCommunitySubscribers;
exports.updateUserRole = updateUserRole;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _effects = require("redux-saga/effects");
var reducer = _interopRequireWildcard(require("app/redux/CommunityReducer"));
var _FetchDataSaga = require("app/redux/FetchDataSaga");
var _blurtApi = require("app/utils/blurtApi");
var transactionActions = _interopRequireWildcard(require("./TransactionReducer"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var _marked = /*#__PURE__*/_regenerator["default"].mark(getCommunityRoles),
  _marked2 = /*#__PURE__*/_regenerator["default"].mark(getCommunitySubscribers),
  _marked3 = /*#__PURE__*/_regenerator["default"].mark(updateUserRole);
var communityWatches = exports.communityWatches = [(0, _effects.takeEvery)('community/GET_COMMUNITY_ROLES', getCommunityRoles), (0, _effects.takeEvery)('community/GET_COMMUNITY_SUBSCRIBERS', getCommunitySubscribers), (0, _effects.takeEvery)('community/UPDATE_USER_ROLE', updateUserRole)];
function getCommunityRoles(action) {
  var community, roles;
  return _regenerator["default"].wrap(function getCommunityRoles$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        community = action.payload;
        _context.next = 3;
        return (0, _effects.put)(reducer.getCommunityRolesPending({
          community: community,
          pending: true
        }));
      case 3:
        _context.prev = 3;
        _context.next = 6;
        return (0, _effects.call)(_blurtApi.callBridge, 'list_community_roles', {
          community: community
        });
      case 6:
        roles = _context.sent;
        _context.next = 9;
        return (0, _effects.call)(_FetchDataSaga.getCommunity, action);
      case 9:
        _context.next = 11;
        return (0, _effects.put)(reducer.setCommunityRoles({
          community: community,
          roles: roles
        }));
      case 11:
        _context.next = 18;
        break;
      case 13:
        _context.prev = 13;
        _context.t0 = _context["catch"](3);
        console.log("error", _context.t0);
        _context.next = 18;
        return (0, _effects.put)(reducer.getCommunityRolesError({
          community: community,
          error: _context.t0
        }));
      case 18:
        _context.next = 20;
        return (0, _effects.put)(reducer.getCommunityRolesPending({
          community: community,
          pending: false
        }));
      case 20:
      case "end":
        return _context.stop();
    }
  }, _marked, null, [[3, 13]]);
}
function getCommunitySubscribers(action) {
  var community, subscribers;
  return _regenerator["default"].wrap(function getCommunitySubscribers$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        community = action.payload;
        _context2.next = 3;
        return (0, _effects.put)(reducer.getCommunitySubscribersPending({
          community: community,
          pending: true
        }));
      case 3:
        _context2.prev = 3;
        _context2.next = 6;
        return (0, _effects.call)(_blurtApi.callBridge, 'list_subscribers', {
          community: community
        });
      case 6:
        subscribers = _context2.sent;
        _context2.next = 9;
        return (0, _effects.call)(_FetchDataSaga.getCommunity, action);
      case 9:
        _context2.next = 11;
        return (0, _effects.put)(reducer.setCommunitySubscribers({
          community: community,
          subscribers: subscribers
        }));
      case 11:
        _context2.next = 17;
        break;
      case 13:
        _context2.prev = 13;
        _context2.t0 = _context2["catch"](3);
        _context2.next = 17;
        return (0, _effects.put)(reducer.getCommunitySubscribersError({
          community: community,
          error: _context2.t0
        }));
      case 17:
        _context2.next = 19;
        return (0, _effects.put)(reducer.getCommunitySubscribersPending({
          community: community,
          pending: false
        }));
      case 19:
      case "end":
        return _context2.stop();
    }
  }, _marked2, null, [[3, 13]]);
}
function updateUserRole(action) {
  var community, username;
  return _regenerator["default"].wrap(function updateUserRole$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        community = action.payload.community;
        _context3.next = 3;
        return (0, _effects.put)(reducer.setUserRolePending({
          community: community,
          pending: true
        }));
      case 3:
        _context3.prev = 3;
        _context3.next = 6;
        return (0, _effects.select)(function (state) {
          return state.user.getIn(['current', 'username']);
        });
      case 6:
        username = _context3.sent;
        _context3.next = 9;
        return (0, _effects.put)(transactionActions.broadcastOperation({
          type: 'custom_json',
          operation: {
            id: 'community',
            required_posting_auths: [username],
            json: JSON.stringify(['setRole', action.payload])
          }
          //successCallback,
          //errorCallback,
        }));
      case 9:
        _context3.next = 11;
        return (0, _effects.put)(reducer.applyUserRole(action.payload));
      case 11:
        _context3.next = 16;
        break;
      case 13:
        _context3.prev = 13;
        _context3.t0 = _context3["catch"](3);
        console.log('update user error', _context3.t0);
      case 16:
        _context3.next = 18;
        return (0, _effects.put)(reducer.setUserRolePending({
          community: community,
          pending: false
        }));
      case 18:
      case "end":
        return _context3.stop();
    }
  }, _marked3, null, [[3, 13]]);
}