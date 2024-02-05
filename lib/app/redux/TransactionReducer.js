"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confirmOperation = exports.broadcastOperation = exports.BROADCAST_OPERATION = void 0;
exports["default"] = reducer;
exports.set = exports.remove = exports.hideConfirm = exports.error = exports.dismissError = exports.deleteError = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _immutable = require("immutable");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// Action constants
var CONFIRM_OPERATION = 'transaction/CONFIRM_OPERATION';
var HIDE_CONFIRM = 'transaction/HIDE_CONFIRM';
var BROADCAST_OPERATION = exports.BROADCAST_OPERATION = 'transaction/BROADCAST_OPERATION';
var ERROR = 'transaction/ERROR'; // Has a watcher in SagaShared
var DELETE_ERROR = 'transaction/DELETE_ERROR';
var DISMISS_ERROR = 'transaction/DISMISS_ERROR';
var SET = 'transaction/SET';
var REMOVE = 'transaction/REMOVE';
// Saga-related
var defaultState = (0, _immutable.fromJS)({
  operations: [],
  status: {
    key: '',
    error: false,
    busy: false
  },
  errors: {
    bandwidthError: false,
    transactionFeeError: false
  }
});
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var payload = action.payload;
  switch (action.type) {
    case CONFIRM_OPERATION:
      {
        var operation = (0, _immutable.fromJS)(payload.operation);
        var confirm = payload.confirm;
        var warning = payload.warning;
        return state.merge({
          show_confirm_modal: true,
          confirmBroadcastOperation: operation,
          confirmErrorCallback: payload.errorCallback,
          confirm: confirm,
          warning: warning
        });
      }
    case HIDE_CONFIRM:
      return state.merge({
        show_confirm_modal: false,
        confirmBroadcastOperation: undefined,
        confirm: undefined
      });
    case BROADCAST_OPERATION:
      // See TransactionSaga.js
      return state;
    case ERROR:
      {
        var operations = payload.operations,
          _error = payload.error,
          errorCallback = payload.errorCallback;
        var errorStr = _error.toString();
        var errorKey = 'Transaction broadcast error.';
        var _iterator = _createForOfIteratorHelper(operations),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = (0, _slicedToArray2["default"])(_step.value, 1),
              type = _step$value[0];
            switch (type) {
              case 'vote':
                if (/uniqueness constraint/.test(errorStr)) {
                  errorKey = 'You already voted for this post';
                  console.error('You already voted for this post.');
                }
                if (/Voting weight is too small/.test(errorStr)) {
                  errorKey = 'Voting weight is too small';
                  errorStr = 'Voting weight is too small, please accumulate more voting power or blurt power.';
                }
                break;
              case 'comment':
                if (/You may only post once per minute/.test(errorStr)) {
                  errorKey = 'You may only post once per minute.';
                } else if (errorStr === 'Testing, fake error') {
                  errorKey = 'Testing, fake error';
                }
                break;
              default:
                break;
            }
            if (state.hasIn(['TransactionError', type + '_listener'])) {
              state = state.setIn(['TransactionError', type], (0, _immutable.fromJS)({
                key: errorKey,
                exception: errorStr
              }));
            } else {
              if (_error.message) {
                // TODO: This reformatting could be better, in most cases, errorKey and errorString end up being similar if not identical.
                // Depends on FC_ASSERT formatting
                // https://github.com/steemit/blurt.world/issues/222
                var err_lines = _error.message.split('\n');
                if (err_lines.length > 2) {
                  errorKey = err_lines[1];
                  var txt = errorKey.split(': ');
                  if (txt.length && txt[txt.length - 1].trim() !== '') {
                    errorKey = errorStr = txt[txt.length - 1];
                  } else {
                    errorStr = "Transaction failed: ".concat(err_lines[1]);
                  }
                }
              }
              // TODO: This would perhaps be better expressed as a Case, Switch statement.
              // TODO: The precise reason for why this clipping needs to happen is unclear.
              if (errorStr.length > 200) {
                errorStr = errorStr.substring(0, 200);
              }
              // Catch for unknown key better error handling
              if (/unknown key: /.test(errorKey)) {
                errorKey = "Blurt account doesn't exist.";
                errorStr = "Transaction failed: Blurt account doesn't exist.";
              }
              // Catch for invalid active authority
              if (/Missing Active Authority /.test(errorKey)) {
                errorKey = 'Not your valid active key.';
                errorStr = 'Transaction failed: Not your valid active key.';
              }
              // TODO: refactor this so that the keys are consistent and sane, i.e. do not include user name in error key.
              state = state.update('errors', function (errors) {
                return errors ? errors.set(errorKey, errorStr) : (0, _immutable.Map)((0, _defineProperty2["default"])({}, errorKey, errorStr));
              });
              // Sane error key for the bandwidth error.
              if (errorKey.includes('bandwidth') || errorStr.includes('bandwidth') || errorStr.includes('RC') // Error key for HF-20 insufficient RC error, #3001.
              ) {
                state = state.setIn(['errors', 'bandwidthError'], true);
              }
              if (errorStr.includes('transaction fee')) {
                state = state.setIn(['errors', 'transactionFeeError'], true);
              }
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        if (errorCallback) {
          errorCallback(errorKey);
        } else {
          throw new Error('PANIC: no callback registered to handle error ' + errorKey);
        }
        return state;
      }
    case DELETE_ERROR:
      return state.deleteIn(['errors', payload.key]);
    case DISMISS_ERROR:
      return state.setIn(['errors', payload.key], false);
    case SET:
      return state.setIn(Array.isArray(payload.key) ? payload.key : [payload.key], (0, _immutable.fromJS)(payload.value));
    case REMOVE:
      return state.removeIn(Array.isArray(payload.key) ? payload.key : [payload.key]);
    default:
      return state;
  }
}

// Action creators
var confirmOperation = exports.confirmOperation = function confirmOperation(payload) {
  return {
    type: CONFIRM_OPERATION,
    payload: payload
  };
};
var hideConfirm = exports.hideConfirm = function hideConfirm(payload) {
  return {
    type: HIDE_CONFIRM,
    payload: payload
  };
};
var broadcastOperation = exports.broadcastOperation = function broadcastOperation(payload) {
  return {
    type: BROADCAST_OPERATION,
    payload: payload
  };
};
var error = exports.error = function error(payload) {
  return {
    type: ERROR,
    payload: payload
  };
};
var deleteError = exports.deleteError = function deleteError(payload) {
  return {
    type: DELETE_ERROR,
    payload: payload
  };
};
var dismissError = exports.dismissError = function dismissError(payload) {
  return {
    type: DISMISS_ERROR,
    payload: payload
  };
};
var set = exports.set = function set(payload) {
  return {
    type: SET,
    payload: payload
  };
};
var remove = exports.remove = function remove(payload) {
  return {
    type: REMOVE,
    payload: payload
  };
};