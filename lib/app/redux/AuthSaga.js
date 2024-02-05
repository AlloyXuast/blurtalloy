"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accountAuthLookup = accountAuthLookup;
exports.authWatches = void 0;
exports.findSigningKey = findSigningKey;
exports.postingOps = void 0;
exports.threshold = threshold;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _effects = require("redux-saga/effects");
var _immutable = require("immutable");
var _blurtjs = require("@blurtfoundation/blurtjs");
var _ecc = require("@blurtfoundation/blurtjs/lib/auth/ecc");
var _SagaShared = require("app/redux/SagaShared");
var userActions = _interopRequireWildcard(require("app/redux/UserReducer"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// operations that require only posting authority
var postingOps = exports.postingOps = (0, _immutable.Set)('vote, comment, delete_comment, custom_json, claim_reward_balance'.trim().split(/,\s*/));
var authWatches = exports.authWatches = [(0, _effects.takeEvery)('user/ACCOUNT_AUTH_LOOKUP', accountAuthLookup)];
function accountAuthLookup(_ref) {
  var _ref$payload = _ref.payload,
    account = _ref$payload.account,
    private_keys = _ref$payload.private_keys,
    login_owner_pubkey = _ref$payload.login_owner_pubkey;
  return /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var stateUser, keys, toPub, posting, active, owner, memo, auth, accountName, pub_keys_used;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          account = (0, _immutable.fromJS)(account);
          private_keys = (0, _immutable.fromJS)(private_keys);
          // console.log('accountAuthLookup', account.name)
          _context.next = 4;
          return (0, _effects.select)(function (state) {
            return state.user;
          });
        case 4:
          stateUser = _context.sent;
          if (private_keys) keys = private_keys;else keys = stateUser.getIn(['current', 'private_keys']);
          if (!(!keys || !keys.has('posting_private'))) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return");
        case 8:
          toPub = function toPub(k) {
            return k ? k.toPublicKey().toString() : '-';
          };
          posting = keys.get('posting_private');
          active = keys.get('active_private');
          owner = keys.get('active_private');
          memo = keys.get('memo_private');
          if (!posting) {
            _context.next = 19;
            break;
          }
          _context.next = 16;
          return authorityLookup({
            pubkeys: (0, _immutable.Set)([toPub(posting)]),
            authority: account.get('posting'),
            authType: 'posting'
          });
        case 16:
          _context.t0 = _context.sent;
          _context.next = 20;
          break;
        case 19:
          _context.t0 = 'none';
        case 20:
          _context.t1 = _context.t0;
          if (!active) {
            _context.next = 27;
            break;
          }
          _context.next = 24;
          return authorityLookup({
            pubkeys: (0, _immutable.Set)([toPub(active)]),
            authority: account.get('active'),
            authType: 'active'
          });
        case 24:
          _context.t2 = _context.sent;
          _context.next = 28;
          break;
        case 27:
          _context.t2 = 'none';
        case 28:
          _context.t3 = _context.t2;
          if (!owner) {
            _context.next = 35;
            break;
          }
          _context.next = 32;
          return authorityLookup({
            pubkeys: (0, _immutable.Set)([toPub(active)]),
            authority: account.get('owner'),
            authType: 'owner'
          });
        case 32:
          _context.t4 = _context.sent;
          _context.next = 36;
          break;
        case 35:
          _context.t4 = 'none';
        case 36:
          _context.t5 = _context.t4;
          _context.t6 = account.get('memo_key') === toPub(memo) ? 'full' : 'none';
          auth = {
            posting: _context.t1,
            active: _context.t3,
            owner: _context.t5,
            memo: _context.t6
          };
          accountName = account.get('name');
          pub_keys_used = {
            posting: toPub(posting),
            active: toPub(active),
            owner: login_owner_pubkey
          };
          _context.next = 43;
          return (0, _effects.put)(userActions.setAuthority({
            accountName: accountName,
            auth: auth,
            pub_keys_used: pub_keys_used
          }));
        case 43:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })();
}

/**
    @arg {object} data
    @arg {object} data.authority Immutable Map blockchain authority
    @arg {object} data.pubkeys Immutable Set public key strings
    @return {string} full, partial, none
*/
function authorityLookup(_ref2) {
  var pubkeys = _ref2.pubkeys,
    authority = _ref2.authority,
    authType = _ref2.authType;
  return /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.call)(authStr, {
            pubkeys: pubkeys,
            authority: authority,
            authType: authType
          });
        case 2:
          return _context2.abrupt("return", _context2.sent);
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })();
}
function authStr(_ref3) {
  var pubkeys = _ref3.pubkeys,
    authority = _ref3.authority,
    authType = _ref3.authType,
    _ref3$recurse = _ref3.recurse,
    recurse = _ref3$recurse === void 0 ? 1 : _ref3$recurse;
  return /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var t, r;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _effects.call)(threshold, {
            pubkeys: pubkeys,
            authority: authority,
            authType: authType,
            recurse: recurse
          });
        case 2:
          t = _context3.sent;
          r = authority.get('weight_threshold');
          return _context3.abrupt("return", t >= r ? 'full' : t > 0 ? 'partial' : 'none');
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })();
}
function threshold(_ref4) {
  var pubkeys = _ref4.pubkeys,
    authority = _ref4.authority,
    authType = _ref4.authType,
    _ref4$recurse = _ref4.recurse,
    recurse = _ref4$recurse === void 0 ? 1 : _ref4$recurse;
  return /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var t, account_auths, aaNames, aaAccounts, aaThreshes, i, aaAccount, auth, aaThresh;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (pubkeys.size) {
            _context4.next = 2;
            break;
          }
          return _context4.abrupt("return", 0);
        case 2:
          t = pubkeyThreshold({
            pubkeys: pubkeys,
            authority: authority
          });
          account_auths = authority.get('account_auths');
          aaNames = account_auths.map(function (v) {
            return v.get(0);
          }, (0, _immutable.List)());
          if (!aaNames.size) {
            _context4.next = 22;
            break;
          }
          _context4.next = 8;
          return _blurtjs.api.getAccountsAsync(aaNames);
        case 8:
          aaAccounts = _context4.sent;
          aaThreshes = account_auths.map(function (v) {
            return v.get(1);
          }, (0, _immutable.List)());
          i = 0;
        case 11:
          if (!(i < aaAccounts.size)) {
            _context4.next = 22;
            break;
          }
          aaAccount = aaAccounts.get(i);
          t += pubkeyThreshold({
            authority: aaAccount.get(authType),
            pubkeys: pubkeys
          });
          if (!(recurse <= 2)) {
            _context4.next = 19;
            break;
          }
          _context4.next = 17;
          return (0, _effects.call)(authStr, {
            authority: aaAccount,
            pubkeys: pubkeys,
            recurse: ++recurse
          });
        case 17:
          auth = _context4.sent;
          if (auth === 'full') {
            aaThresh = aaThreshes.get(i);
            t += aaThresh;
          }
        case 19:
          i++;
          _context4.next = 11;
          break;
        case 22:
          return _context4.abrupt("return", t);
        case 23:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })();
}
function pubkeyThreshold(_ref5) {
  var pubkeys = _ref5.pubkeys,
    authority = _ref5.authority;
  var available = 0;
  var key_auths = authority.get('key_auths');
  key_auths.forEach(function (k) {
    if (pubkeys.has(k.get(0))) {
      available += k.get(1);
    }
  });
  return available;
}
function findSigningKey(_ref6) {
  var opType = _ref6.opType,
    username = _ref6.username,
    password = _ref6.password;
  return /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var authTypes, currentUser, currentUsername, private_keys, account, _iterator, _step, authType, private_key, pubkey, pubkeys, authority, auth;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          if (postingOps.has(opType)) authTypes = 'posting, active';else authTypes = 'active, owner';
          authTypes = authTypes.split(', ');
          _context5.next = 4;
          return (0, _effects.select)(function (state) {
            return state.user.get('current');
          });
        case 4:
          currentUser = _context5.sent;
          currentUsername = currentUser && currentUser.get('username');
          username = username || currentUsername;
          if (username) {
            _context5.next = 9;
            break;
          }
          return _context5.abrupt("return", null);
        case 9:
          if (username.indexOf('/') > -1) {
            // "alice/active" will login only with Alices active key
            username = username.split('/')[0];
          }
          private_keys = currentUsername === username ? currentUser.get('private_keys') : (0, _immutable.Map)();
          _context5.next = 13;
          return (0, _effects.call)(_SagaShared.getAccount, username);
        case 13:
          account = _context5.sent;
          if (account) {
            _context5.next = 16;
            break;
          }
          throw new Error('Account not found');
        case 16:
          _iterator = _createForOfIteratorHelper(authTypes);
          _context5.prev = 17;
          _iterator.s();
        case 19:
          if ((_step = _iterator.n()).done) {
            _context5.next = 34;
            break;
          }
          authType = _step.value;
          private_key = void 0;
          if (password) {
            try {
              private_key = _ecc.PrivateKey.fromWif(password);
            } catch (e) {
              private_key = _ecc.PrivateKey.fromSeed(username + authType + password);
            }
          } else {
            if (private_keys) {
              private_key = private_keys.get(authType + '_private');
            }
          }
          if (!private_key) {
            _context5.next = 32;
            break;
          }
          pubkey = private_key.toPublicKey().toString();
          pubkeys = (0, _immutable.Set)([pubkey]);
          authority = account.get(authType);
          _context5.next = 29;
          return (0, _effects.call)(authorityLookup, {
            pubkeys: pubkeys,
            authority: authority,
            authType: authType
          });
        case 29:
          auth = _context5.sent;
          if (!(auth === 'full')) {
            _context5.next = 32;
            break;
          }
          return _context5.abrupt("return", private_key);
        case 32:
          _context5.next = 19;
          break;
        case 34:
          _context5.next = 39;
          break;
        case 36:
          _context5.prev = 36;
          _context5.t0 = _context5["catch"](17);
          _iterator.e(_context5.t0);
        case 39:
          _context5.prev = 39;
          _iterator.f();
          return _context5.finish(39);
        case 42:
          return _context5.abrupt("return", null);
        case 43:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[17, 36, 39, 42]]);
  })();
}

// function isPostingOnlyKey(pubkey, account) {
//     // TODO Support account auths
//     // yield put(g.actions.authLookup({account, pubkeys: pubkey})
//     // authorityLookup({pubkeys, authority: Map(account.posting), authType: 'posting'})
//     for (const p of account.posting.key_auths) {
//         if (pubkey === p[0]) {
//             if (account.active.account_auths.length || account.owner.account_auths.length) {
//                 console.log('UserSaga, skipping save password, account_auths are not yet supported.')
//                 return false
//             }
//             for (const a of account.active.key_auths)
//                 if (pubkey === a[0]) return false
//             for (const a of account.owner.key_auths)
//                 if (pubkey === a[0]) return false
//             return true
//         }
//     }
//     return false
// }