"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specialPosts = specialPosts;
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
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * Load special posts - including notices, featured, and promoted.
 *
 * @returns {promise} resolves to object of {featured_posts:[], promoted_posts:[], notices:[]}
 */
function loadSpecialPosts() {
  return new Promise(function (resolve, reject) {
    var emptySpecialPosts = {
      featured_posts: [],
      promoted_posts: [],
      notices: []
    };
    if (!config.special_posts_url) {
      resolve(emptySpecialPosts);
      return;
    }
    var request = https.get(config.special_posts_url, function (resp) {
      var data = '';
      resp.on('data', function (chunk) {
        data += chunk;
      });
      resp.on('end', function () {
        var json = JSON.parse(data);
        console.info('Received special posts payload', json);
        if (json === Object(json)) {
          resolve(json);
        }
      });
    });
    request.on('error', function (e) {
      console.error('Could not load special posts', e);
      resolve(emptySpecialPosts);
    });
  });
}
/**
 * [async] Get special posts - including notices, featured, and promoted.
 *
 * @returns {object} object of {featured_posts:[], promoted_posts:[], notices:[]}
 */
function specialPosts() {
  return _specialPosts.apply(this, arguments);
}
function _specialPosts() {
  _specialPosts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var postData, loadedPostData, _iterator, _step, url, _url$split$1$split, _url$split$1$split2, username, postId, post, _iterator2, _step2, _url, _url$split$1$split3, _url$split$1$split4, _username, _postId, _post, _iterator3, _step3, notice, _notice$permalink$spl, _notice$permalink$spl2, _username2, _postId2, _post2;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.info('Loading special posts');
          _context.next = 3;
          return loadSpecialPosts();
        case 3:
          postData = _context.sent;
          console.info('Loading special posts', postData);
          loadedPostData = {
            featured_posts: [],
            promoted_posts: [],
            notices: []
          };
          _iterator = _createForOfIteratorHelper(postData.featured_posts);
          _context.prev = 7;
          _iterator.s();
        case 9:
          if ((_step = _iterator.n()).done) {
            _context.next = 19;
            break;
          }
          url = _step.value;
          _url$split$1$split = url.split('@')[1].split('/'), _url$split$1$split2 = (0, _slicedToArray2["default"])(_url$split$1$split, 2), username = _url$split$1$split2[0], postId = _url$split$1$split2[1];
          _context.next = 14;
          return blurtjs.api.getContentAsync(username, postId);
        case 14:
          post = _context.sent;
          post.special = true;
          loadedPostData.featured_posts.push(post);
        case 17:
          _context.next = 9;
          break;
        case 19:
          _context.next = 24;
          break;
        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](7);
          _iterator.e(_context.t0);
        case 24:
          _context.prev = 24;
          _iterator.f();
          return _context.finish(24);
        case 27:
          _iterator2 = _createForOfIteratorHelper(postData.promoted_posts);
          _context.prev = 28;
          _iterator2.s();
        case 30:
          if ((_step2 = _iterator2.n()).done) {
            _context.next = 40;
            break;
          }
          _url = _step2.value;
          _url$split$1$split3 = _url.split('@')[1].split('/'), _url$split$1$split4 = (0, _slicedToArray2["default"])(_url$split$1$split3, 2), _username = _url$split$1$split4[0], _postId = _url$split$1$split4[1];
          _context.next = 35;
          return blurtjs.api.getContentAsync(_username, _postId);
        case 35:
          _post = _context.sent;
          _post.special = true;
          loadedPostData.promoted_posts.push(_post);
        case 38:
          _context.next = 30;
          break;
        case 40:
          _context.next = 45;
          break;
        case 42:
          _context.prev = 42;
          _context.t1 = _context["catch"](28);
          _iterator2.e(_context.t1);
        case 45:
          _context.prev = 45;
          _iterator2.f();
          return _context.finish(45);
        case 48:
          _iterator3 = _createForOfIteratorHelper(postData.notices);
          _context.prev = 49;
          _iterator3.s();
        case 51:
          if ((_step3 = _iterator3.n()).done) {
            _context.next = 64;
            break;
          }
          notice = _step3.value;
          if (!notice.permalink) {
            _context.next = 61;
            break;
          }
          _notice$permalink$spl = notice.permalink.split('@')[1].split('/'), _notice$permalink$spl2 = (0, _slicedToArray2["default"])(_notice$permalink$spl, 2), _username2 = _notice$permalink$spl2[0], _postId2 = _notice$permalink$spl2[1];
          _context.next = 57;
          return blurtjs.api.getContentAsync(_username2, _postId2);
        case 57:
          _post2 = _context.sent;
          loadedPostData.notices.push(Object.assign({}, notice, _post2));
          _context.next = 62;
          break;
        case 61:
          loadedPostData.notices.push(notice);
        case 62:
          _context.next = 51;
          break;
        case 64:
          _context.next = 69;
          break;
        case 66:
          _context.prev = 66;
          _context.t2 = _context["catch"](49);
          _iterator3.e(_context.t2);
        case 69:
          _context.prev = 69;
          _iterator3.f();
          return _context.finish(69);
        case 72:
          console.info("Loaded special posts: featured: ".concat(loadedPostData.featured_posts.length, ", promoted: ").concat(loadedPostData.promoted_posts.length, ", notices: ").concat(loadedPostData.notices.length));
          return _context.abrupt("return", loadedPostData);
        case 74:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[7, 21, 24, 27], [28, 42, 45, 48], [49, 66, 69, 72]]);
  }));
  return _specialPosts.apply(this, arguments);
}