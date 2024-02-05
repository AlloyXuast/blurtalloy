"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.packLoginData = exports.isLoggedIn = exports.extractLoginData = exports["default"] = void 0;
/**
 *
 * @returns {boolean}
 */
var isLoggedIn = exports.isLoggedIn = function isLoggedIn() {
  return typeof localStorage !== 'undefined' && !!localStorage.getItem('autopost2');
};

/**
 *
 * @returns {string}
 */
var packLoginData = exports.packLoginData = function packLoginData(username, password, memoWif, login_owner_pubkey, login_with_keychain) {
  return Buffer.from("".concat(username, "\t").concat(password, "\t").concat(memoWif || '', "\t").concat(login_owner_pubkey || '', "\t").concat(login_with_keychain || '')).toString('hex');
};

/**
 *
 * @returns {array} [username, password, memoWif, login_owner_pubkey, login_with_keychain]
 */
var extractLoginData = exports.extractLoginData = function extractLoginData(data) {
  return Buffer.from(data, 'hex').toString().split('\t');
};
var _default = exports["default"] = {
  isLoggedIn: isLoggedIn,
  extractLoginData: extractLoginData
};