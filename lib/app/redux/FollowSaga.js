"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchFollowCount = fetchFollowCount;
exports.loadFollows = loadFollows;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _immutable = require("immutable");
var _effects = require("redux-saga/effects");
var _blurtjs = require("@blurtfoundation/blurtjs");
var globalActions = _interopRequireWildcard(require("app/redux/GlobalReducer"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var _marked = /*#__PURE__*/_regenerator["default"].mark(fetchFollowCount);
/**
    This loadFollows both 'blog' and 'ignore'
*/

// fetch for follow/following count
function fetchFollowCount(account) {
  var counts;
  return _regenerator["default"].wrap(function fetchFollowCount$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.next = 2;
        return (0, _effects.call)([_blurtjs.api, _blurtjs.api.getFollowCountAsync], account);
      case 2:
        counts = _context.sent;
        _context.next = 5;
        return (0, _effects.put)(globalActions.update({
          key: ['follow_count', account],
          updater: function updater(m) {
            return m.mergeDeep({
              follower_count: counts.follower_count,
              following_count: counts.following_count
            });
          }
        }));
      case 5:
      case "end":
        return _context.stop();
    }
  }, _marked);
}

// Test limit with 2 (not 1, infinate looping)
function loadFollows(method, account, type) {
  var force = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var hasResult;
    return _regenerator["default"].wrap(function _callee$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.select)(function (state) {
            return state.global.getIn(['follow', method, account, type + '_loading']);
          });
        case 2:
          if (!_context2.sent) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return");
        case 4:
          if (force) {
            _context2.next = 10;
            break;
          }
          _context2.next = 7;
          return (0, _effects.select)(function (state) {
            return state.global.hasIn(['follow', method, account, type + '_result']);
          });
        case 7:
          hasResult = _context2.sent;
          if (!hasResult) {
            _context2.next = 10;
            break;
          }
          return _context2.abrupt("return");
        case 10:
          _context2.next = 12;
          return (0, _effects.put)(globalActions.update({
            key: ['follow', method, account],
            notSet: (0, _immutable.Map)(),
            updater: function updater(m) {
              return m.set(type + '_loading', true);
            }
          }));
        case 12:
          _context2.next = 14;
          return loadFollowsLoop(method, account, type);
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee);
  })();
}
function loadFollowsLoop(method, account, type) {
  var start = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1000;
  return /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var res, cnt, lastAccountName;
    return _regenerator["default"].wrap(function _callee2$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.t0 = _immutable.fromJS;
          _context3.next = 3;
          return _blurtjs.api[method](account, start, type, limit);
        case 3:
          _context3.t1 = _context3.sent;
          res = (0, _context3.t0)(_context3.t1);
          // console.log('res.toJS()', res.toJS())
          cnt = 0;
          lastAccountName = null;
          _context3.next = 9;
          return (0, _effects.put)(globalActions.update({
            key: ['follow_inprogress', method, account],
            notSet: (0, _immutable.Map)(),
            updater: function updater(m) {
              m = m.asMutable();
              res.forEach(function (value) {
                cnt += 1;
                var whatList = value.get('what');
                var accountNameKey = method === 'getFollowingAsync' ? 'following' : 'follower';
                var accountName = lastAccountName = value.get(accountNameKey);
                whatList.forEach(function (what) {
                  // currently this is always true: what === type
                  m.update(what, (0, _immutable.OrderedSet)(), function (s) {
                    return s.add(accountName);
                  });
                });
              });
              return m.asImmutable();
            }
          }));
        case 9:
          if (!(cnt === limit)) {
            _context3.next = 14;
            break;
          }
          _context3.next = 12;
          return (0, _effects.call)(loadFollowsLoop, method, account, type, lastAccountName);
        case 12:
          _context3.next = 16;
          break;
        case 14:
          _context3.next = 16;
          return (0, _effects.put)(globalActions.update({
            key: [],
            updater: function updater(m) {
              m = m.asMutable();
              var result = m.getIn(['follow_inprogress', method, account, type], (0, _immutable.OrderedSet)());
              m.deleteIn(['follow_inprogress', method, account, type]);
              m.updateIn(['follow', method, account], (0, _immutable.Map)(), function (mm) {
                return mm.merge((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, type + '_count', result.size), type + '_result', result.reverse()), type + '_loading', false));
              });
              return m.asImmutable();
            }
          }));
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee2);
  })();
}