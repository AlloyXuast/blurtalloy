"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dapps = Dapps;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var config = _interopRequireWildcard(require("config"));
var https = _interopRequireWildcard(require("https"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * Load dapps
 *
 * @returns {promise} resolves to object
 */
function loadDapps() {
  return new Promise(function (resolve, reject) {
    var emptyDapps = {};
    if (!config.dapps_url) {
      resolve(emptyDapps);
      return;
    }
    var request = https.get(config.dapps_url, function (resp) {
      var data = '';
      resp.on('data', function (chunk) {
        data += chunk;
      });
      resp.on('end', function () {
        var json = JSON.parse(data);
        if (json === Object(json)) {
          resolve(json);
        }
      });
    });
    request.on('error', function (e) {
      console.error('Could not load dapps', e);
      resolve(emptyDapps);
    });
  });
}
/**
 * [async] Get dapps from Gitlab
 *
 * @returns {object} object of dapps
 */
function Dapps() {
  return _Dapps.apply(this, arguments);
}
function _Dapps() {
  _Dapps = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var dapps;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return loadDapps();
        case 2:
          dapps = _context.sent;
          console.info('Loading dapps', dapps);
          return _context.abrupt("return", dapps);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _Dapps.apply(this, arguments);
}