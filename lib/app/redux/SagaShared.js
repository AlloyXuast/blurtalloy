"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
var _regeneratorRuntime2 = require("@babel/runtime/regenerator");
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAccount = getAccount;
exports.getContent = getContent;
exports.getState = getState;
exports.sharedWatches = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _immutable = require("immutable");
var _effects = require("redux-saga/effects");
var _counterpart = _interopRequireDefault(require("counterpart"));
var _blurtjs = require("@blurtfoundation/blurtjs");
var globalActions = _interopRequireWildcard(require("./GlobalReducer"));
var appActions = _interopRequireWildcard(require("./AppReducer"));
var transactionActions = _interopRequireWildcard(require("./TransactionReducer"));
var _ServerApiClient = require("app/utils/ServerApiClient");
var _blurtApi = require("app/utils/blurtApi");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var _marked = /*#__PURE__*/_regeneratorRuntime2.mark(showTransactionErrorNotification);
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var wait = function wait(ms) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      return resolve();
    }, ms);
  });
};
var sharedWatches = exports.sharedWatches = [(0, _effects.takeEvery)(globalActions.GET_STATE, getState), (0, _effects.takeLatest)([appActions.SET_USER_PREFERENCES, appActions.TOGGLE_NIGHTMODE, appActions.TOGGLE_BLOGMODE], saveUserPreferences), (0, _effects.takeEvery)('transaction/ERROR', showTransactionErrorNotification)];
function getAccount(username) {
  var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var account, isLite, _yield$call, _yield$call2;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.select)(function (state) {
            return state.global.get('accounts').get(username);
          });
        case 2:
          account = _context.sent;
          // hive never serves `owner` prop (among others)
          isLite = !!account && !account.get('owner');
          if (!(!account || force || isLite)) {
            _context.next = 15;
            break;
          }
          console.log('getAccount: loading', username, 'force?', force, 'lite?', isLite);
          _context.next = 8;
          return (0, _effects.call)([_blurtjs.api, _blurtjs.api.getAccountsAsync], [username]);
        case 8:
          _yield$call = _context.sent;
          _yield$call2 = (0, _slicedToArray2["default"])(_yield$call, 1);
          account = _yield$call2[0];
          if (!account) {
            _context.next = 15;
            break;
          }
          account = (0, _immutable.fromJS)(account);
          _context.next = 15;
          return (0, _effects.put)(globalActions.receiveAccount({
            account: account
          }));
        case 15:
          return _context.abrupt("return", account);
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })();
}

/** Manual refreshes.  The router is in FetchDataSaga. */
function getState(_ref) {
  var url = _ref.payload.url;
  return /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var state;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _effects.call)(_blurtApi.getStateAsync, url, null, true);
        case 3:
          state = _context2.sent;
          _context2.next = 6;
          return (0, _effects.put)(globalActions.receiveState(state));
        case 6:
          _context2.next = 13;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error('~~ Saga getState error ~~>', url, _context2.t0);
          _context2.next = 13;
          return (0, _effects.put)(appActions.blurtApiError(_context2.t0.message));
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  })();
}
function showTransactionErrorNotification() {
  var errors, _iterator, _step, _step$value, key, message;
  return _regenerator["default"].wrap(function showTransactionErrorNotification$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        _context3.next = 2;
        return (0, _effects.select)(function (state) {
          return state.transaction.get('errors');
        });
      case 2:
        errors = _context3.sent;
        _iterator = _createForOfIteratorHelper(errors);
        _context3.prev = 4;
        _iterator.s();
      case 6:
        if ((_step = _iterator.n()).done) {
          _context3.next = 17;
          break;
        }
        _step$value = (0, _slicedToArray2["default"])(_step.value, 2), key = _step$value[0], message = _step$value[1];
        if (!(key === 'bandwidthError' || key === 'transactionFeeError')) {
          _context3.next = 11;
          break;
        }
        _context3.next = 15;
        break;
      case 11:
        _context3.next = 13;
        return (0, _effects.put)(appActions.addNotification({
          key: key,
          message: message
        }));
      case 13:
        _context3.next = 15;
        return (0, _effects.put)(transactionActions.deleteError({
          key: key
        }));
      case 15:
        _context3.next = 6;
        break;
      case 17:
        _context3.next = 22;
        break;
      case 19:
        _context3.prev = 19;
        _context3.t0 = _context3["catch"](4);
        _iterator.e(_context3.t0);
      case 22:
        _context3.prev = 22;
        _iterator.f();
        return _context3.finish(22);
      case 25:
      case "end":
        return _context3.stop();
    }
  }, _marked, null, [[4, 19, 22, 25]]);
}
function getContent(_ref2) {
  var author = _ref2.author,
    permlink = _ref2.permlink,
    resolve = _ref2.resolve,
    reject = _ref2.reject;
  return /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var content;
    return _regenerator["default"].wrap(function _callee3$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (content) {
            _context4.next = 11;
            break;
          }
          console.log('getContent', author, permlink);
          _context4.next = 4;
          return (0, _effects.call)([_blurtjs.api, _blurtjs.api.getContentAsync], author, permlink);
        case 4:
          content = _context4.sent;
          if (!(content.author == '')) {
            _context4.next = 9;
            break;
          }
          // retry if content not found. #1870
          content = null;
          _context4.next = 9;
          return (0, _effects.call)(wait, 3000);
        case 9:
          _context4.next = 0;
          break;
        case 11:
          _context4.next = 13;
          return (0, _effects.call)(_blurtApi.callBridge, 'normalize_post', {
            post: content
          });
        case 13:
          content = _context4.sent;
          _context4.next = 16;
          return (0, _effects.put)(globalActions.receiveContent({
            content: content
          }));
        case 16:
          if (resolve && content) {
            resolve(content);
          } else if (reject && !content) {
            reject();
          }
        case 17:
        case "end":
          return _context4.stop();
      }
    }, _callee3);
  })();
}

/**
 * Save this user's preferences, either directly from the submitted payload or from whatever's saved in the store currently.
 *
 * @param {Object?} params.payload
 */
function saveUserPreferences(_ref3) {
  var payload = _ref3.payload;
  return /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var prefs;
    return _regenerator["default"].wrap(function _callee4$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          if (!payload) {
            _context5.next = 3;
            break;
          }
          _context5.next = 3;
          return (0, _ServerApiClient.setUserPreferences)(payload);
        case 3:
          _context5.next = 5;
          return (0, _effects.select)(function (state) {
            return state.app.get('user_preferences');
          });
        case 5:
          prefs = _context5.sent;
          _context5.next = 8;
          return (0, _ServerApiClient.setUserPreferences)(prefs.toJS());
        case 8:
        case "end":
          return _context5.stop();
      }
    }, _callee4);
  })();
}