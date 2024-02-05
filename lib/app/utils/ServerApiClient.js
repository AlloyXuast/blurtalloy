"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveCords = saveCords;
exports.serverApiLogin = serverApiLogin;
exports.serverApiLogout = serverApiLogout;
exports.serverApiRecordEvent = serverApiRecordEvent;
exports.setUserPreferences = setUserPreferences;
var _blurtjs = require("@blurtfoundation/blurtjs");
var request_base = {
  method: 'post',
  credentials: 'same-origin',
  referrerPolicy: 'unsafe-url',
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  }
};
function serverApiLogin(account, signatures) {
  if (!process.env.BROWSER || window.$STM_ServerBusy) return;
  var request = Object.assign({}, request_base, {
    body: JSON.stringify({
      account: account,
      signatures: signatures,
      csrf: window.$STM_csrf
    })
  });
  return fetch('/api/v1/login_account', request);
}
function serverApiLogout() {
  if (!process.env.BROWSER || window.$STM_ServerBusy) return;
  var request = Object.assign({}, request_base, {
    body: JSON.stringify({
      csrf: window.$STM_csrf
    })
  });
  return fetch('/api/v1/logout_account', request);
}
var last_call;
function serverApiRecordEvent(type, val) {
  var rate_limit_ms = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5000;
  if (!process.env.BROWSER || window.$STM_ServerBusy) return;
  if (last_call && new Date() - last_call < rate_limit_ms) return;
  last_call = new Date();
  var value = val && val.stack ? "".concat(val.toString(), " | ").concat(val.stack) : val;
}
function saveCords(x, y) {
  var request = Object.assign({}, request_base, {
    body: JSON.stringify({
      csrf: window.$STM_csrf,
      x: x,
      y: y
    })
  });
  return fetch('/api/v1/save_cords', request);
}
function setUserPreferences(payload) {
  if (!process.env.BROWSER || window.$STM_ServerBusy) {
    return Promise.resolve();
  }
  var request = Object.assign({}, request_base, {
    body: JSON.stringify({
      csrf: window.$STM_csrf,
      payload: payload
    })
  });
  return fetch('/api/v1/setUserPreferences', request);
}