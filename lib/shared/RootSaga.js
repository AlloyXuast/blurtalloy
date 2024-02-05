"use strict";

var _regeneratorRuntime2 = require("@babel/runtime/regenerator");
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = rootSaga;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _effects = require("redux-saga/effects");
var _FetchDataSaga = require("app/redux/FetchDataSaga");
var _SagaShared = require("app/redux/SagaShared");
var _UserSaga = require("app/redux/UserSaga");
var _AuthSaga = require("app/redux/AuthSaga");
var _TransactionSaga = require("app/redux/TransactionSaga");
var _CommunitySaga = require("app/redux/CommunitySaga");
var _UserProfilesSaga = require("app/redux/UserProfilesSaga");
var _PollingSaga = require("app/redux/PollingSaga");
var _marked = /*#__PURE__*/_regeneratorRuntime2.mark(rootSaga);
function rootSaga() {
  return _regenerator["default"].wrap(function rootSaga$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.next = 2;
        return (0, _effects.all)([].concat((0, _toConsumableArray2["default"])(_UserSaga.userWatches), (0, _toConsumableArray2["default"])(_FetchDataSaga.fetchDataWatches), (0, _toConsumableArray2["default"])(_SagaShared.sharedWatches), (0, _toConsumableArray2["default"])(_AuthSaga.authWatches), (0, _toConsumableArray2["default"])(_TransactionSaga.transactionWatches), (0, _toConsumableArray2["default"])(_CommunitySaga.communityWatches), (0, _toConsumableArray2["default"])(_UserProfilesSaga.userProfilesWatches), [(0, _PollingSaga.watchPollingTasks)()]));
      case 2:
      case "end":
        return _context.stop();
    }
  }, _marked);
}