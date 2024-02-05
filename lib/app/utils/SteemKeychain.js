"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasCompatibleKeychain = hasCompatibleKeychain;
exports.isLoggedInWithKeychain = isLoggedInWithKeychain;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _UserUtil = require("app/utils/UserUtil");
/**
 *
 * @returns {boolean}
 */
function hasCompatibleKeychain() {
  return window.blurt_keychain && window.blurt_keychain.requestSignBuffer && window.blurt_keychain.requestBroadcast && window.blurt_keychain.requestSignedCall;
}

/**
 *
 * @returns {boolean}
 */
function isLoggedInWithKeychain() {
  if (!(0, _UserUtil.isLoggedIn)()) {
    return false;
  }
  var data = localStorage.getItem('autopost2');
  var _extractLoginData = (0, _UserUtil.extractLoginData)(data),
    _extractLoginData2 = (0, _slicedToArray2["default"])(_extractLoginData, 5),
    username = _extractLoginData2[0],
    password = _extractLoginData2[1],
    memoWif = _extractLoginData2[2],
    login_owner_pubkey = _extractLoginData2[3],
    login_with_keychain = _extractLoginData2[4];
  return !!login_with_keychain;
}