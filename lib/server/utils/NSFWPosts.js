"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = nsfwPosts;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var config = _interopRequireWildcard(require("config"));
var https = _interopRequireWildcard(require("https"));
var blurtjs = _interopRequireWildcard(require("@blurtfoundation/blurtjs"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; } /* eslint-disable no-restricted-syntax */
/**
 * Load nsfw posts array
 *
 * @returns {promise} resolves to object of {nsfw:[]}
 */
function loadNSFWPosts() {
  return new Promise(function (resolve, reject) {
    var emptyNSFWPosts = {
      nsfw: []
    };
    if (!config.nsfw_url) {
      resolve(emptyNSFWPosts);
      return;
    }
    var request = https.get(config.nsfw_url, function (resp) {
      var data = '';
      resp.on('data', function (chunk) {
        data += chunk;
      });
      resp.on('end', function () {
        var json = JSON.parse(data);
        console.info('Received nsfw posts payload', json);
        if (json === Object(json)) {
          resolve(json);
        }
      });
    });
    request.on('error', function (e) {
      console.error('Could not load nsfw posts', e);
      resolve(emptyNSFWPosts);
    });
  });
}

/**
 * [async] Get nsfw posts
 *
 * @returns {object} object of {nsfw:[]}
 */
function nsfwPosts() {
  return _nsfwPosts.apply(this, arguments);
}
function _nsfwPosts() {
  _nsfwPosts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var postData, loadedPostData, _iterator, _step, url, _url$split$1$split, _url$split$1$split2, username, postId, post;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.info('Loading nsfw posts');
          _context.next = 3;
          return loadNSFWPosts();
        case 3:
          postData = _context.sent;
          console.info('Loading nsfw posts', postData);
          loadedPostData = {
            nsfw: []
          };
          _iterator = _createForOfIteratorHelper(postData.nsfw);
          _context.prev = 7;
          _iterator.s();
        case 9:
          if ((_step = _iterator.n()).done) {
            _context.next = 18;
            break;
          }
          url = _step.value;
          _url$split$1$split = url.split('@')[1].split('/'), _url$split$1$split2 = (0, _slicedToArray2["default"])(_url$split$1$split, 2), username = _url$split$1$split2[0], postId = _url$split$1$split2[1]; // eslint-disable-next-line no-await-in-loop
          _context.next = 14;
          return blurtjs.api.getContentAsync(username, postId);
        case 14:
          post = _context.sent;
          loadedPostData.nsfw.push(post);
        case 16:
          _context.next = 9;
          break;
        case 18:
          _context.next = 23;
          break;
        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](7);
          _iterator.e(_context.t0);
        case 23:
          _context.prev = 23;
          _iterator.f();
          return _context.finish(23);
        case 26:
          console.info("Loaded nsfw posts: nsfw: ".concat(loadedPostData.nsfw.length));
          return _context.abrupt("return", loadedPostData);
        case 28:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[7, 20, 23, 26]]);
  }));
  return _nsfwPosts.apply(this, arguments);
}