"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = usePostJson;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _koaRouter = _interopRequireDefault(require("koa-router"));
var _react = _interopRequireDefault(require("react"));
var _ResolveRoute = require("app/ResolveRoute");
var _blurtjs = require("@blurtfoundation/blurtjs");
var _GDPRUserList = _interopRequireDefault(require("app/utils/GDPRUserList"));
function usePostJson(app) {
  var router = (0, _koaRouter["default"])();
  app.use(router.routes());
  router.get(_ResolveRoute.routeRegex.PostJson, /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var author, permalink, status, post;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // validate and build post details in JSON
          author = this.url.match(/(\@[\w\d\.-]+)/)[0].replace('@', '');
          permalink = this.url.match(/(\@[\w\d\.-]+)\/?([\w\d-]+)/)[2];
          status = '';
          _context.next = 5;
          return _blurtjs.api.getContentAsync(author, permalink);
        case 5:
          post = _context.sent;
          if (_GDPRUserList["default"].includes(post.author)) {
            post = 'Content unavailable';
            status = '451';
          } else if (post.author) {
            status = '200';
            // try parse for post metadata
            try {
              post.json_metadata = JSON.parse(post.json_metadata);
            } catch (e) {
              post.json_metadata = '';
            }
          } else {
            post = 'No post found';
            status = '404';
          }
          // return response and status code
          this.body = {
            post: post,
            status: status
          };
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
}