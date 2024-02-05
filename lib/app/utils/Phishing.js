"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.looksPhishyDomain = exports.looksPhishy = void 0;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// const domains = [
//     'peypaisecurity.com',
//     'kinrnightx.monster',
//     'jarolovexr.click',
// ];

/**
 * Does this URL look like a phishing attempt?
 *
 * @param {string} questionableUrl
 * @returns {boolean}
 */
// eslint-disable-next-line import/prefer-default-export
var looksPhishy = exports.looksPhishy = function looksPhishy(questionableUrl) {
  var domains2 = ['peypaisecurity.com', 'kinrnightx.monster', 'jarolovexr.click', 'najirchat.cfd'];
  var domains = $STM_Config.phishing_domains ? $STM_Config.phishing_domains : domains2;

  // eslint-disable-next-line no-restricted-syntax
  var _iterator = _createForOfIteratorHelper(domains),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var domain = _step.value;
      if (questionableUrl.toLocaleLowerCase().indexOf(domain) > -1) {
        return true;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return false;
};
var looksPhishyDomain = exports.looksPhishyDomain = function looksPhishyDomain(domains, questionableUrl) {
  var domains2 = $STM_Config.phishing_domains ? $STM_Config.phishing_domains : domains;
  // eslint-disable-next-line no-restricted-syntax
  var _iterator2 = _createForOfIteratorHelper(domains2),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var domain = _step2.value;
      if (questionableUrl.toLocaleLowerCase().indexOf(domain) > -1) {
        return true;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return false;
};