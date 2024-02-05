"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function getRemoteIp(req) {
  var remote_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var ip_match = remote_address ? remote_address.match(/(\d+\.\d+\.\d+\.\d+)/) : null;
  return ip_match ? ip_match[1] : remote_address;
}
var ip_last_hit = new Map();
function rateLimitReq(ctx, req) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var now = Date.now();

  // purge hits older than minutes_max
  ip_last_hit.forEach(function (v, k) {
    var seconds = (now - v) / 1000;
    if (seconds > 1) {
      ip_last_hit["delete"](ip);
    }
  });
  var result = false;
  // if ip is still in the map, abort
  if (ip_last_hit.has(ip)) {
    // console.log(`api rate limited for ${ip}: ${req}`);
    // throw new Error(`Rate limit reached: one call per ${minutes_max} minutes allowed.`);
    console.error('Rate limit reached: one call per 1 second allowed.');
    ctx.status = 429;
    ctx.body = 'Too Many Requests';
    result = true;
  }

  // record api hit
  ip_last_hit.set(ip, now);
  return result;
}
function checkCSRF(ctx, csrf) {
  try {
    ctx.assertCSRF(csrf);
  } catch (e) {
    ctx.status = 403;
    ctx.body = 'invalid csrf token';
    console.log('-- invalid csrf token -->', ctx.request.method, ctx.request.url, ctx.session.uid);
    return false;
  }
  return true;
}
function getSupportedLocales() {
  var locales = [];
  var files = _fs["default"].readdirSync(_path["default"].join(__dirname, '../../..', 'src/app/locales'));
  var _iterator = _createForOfIteratorHelper(files),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var filename = _step.value;
      var match_res = filename.match(/(\w+)\.json?$/);
      if (match_res) locales.push(match_res[1]);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return locales;
}
module.exports = {
  getRemoteIp: getRemoteIp,
  rateLimitReq: rateLimitReq,
  checkCSRF: checkCSRF,
  getSupportedLocales: getSupportedLocales
};