"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useUserJson;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _koaRouter = _interopRequireDefault(require("koa-router"));
var _react = _interopRequireDefault(require("react"));
var _ResolveRoute = require("app/ResolveRoute");
var _blurtjs = require("@blurtfoundation/blurtjs");
var _GDPRUserList = _interopRequireDefault(require("app/utils/GDPRUserList"));
function useUserJson(app) {
  var router = (0, _koaRouter["default"])();
  app.use(router.routes());
  router.get(_ResolveRoute.routeRegex.UserJson, /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var segments, user_name, user, status, _yield$api$getAccount, _yield$api$getAccount2, chainAccount;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // validate and build user details in JSON
          segments = this.url.split('/');
          user_name = segments[1].match(_ResolveRoute.routeRegex.UserNameJson)[0].replace('@', '');
          user = '';
          status = '';
          _context.next = 6;
          return _blurtjs.api.getAccountsAsync([user_name]);
        case 6:
          _yield$api$getAccount = _context.sent;
          _yield$api$getAccount2 = (0, _slicedToArray2["default"])(_yield$api$getAccount, 1);
          chainAccount = _yield$api$getAccount2[0];
          if (_GDPRUserList["default"].includes(user_name)) {
            user = 'Content unavailable';
            status = '451';
          } else if (chainAccount) {
            user = chainAccount;
            try {
              user.json_metadata = JSON.parse(user.json_metadata);
            } catch (e) {
              user.json_metadata = '';
            }
            status = '200';
          } else {
            user = 'No account found';
            status = '404';
          }
          // return response and status code
          this.body = {
            user: user,
            status: status
          };
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
}