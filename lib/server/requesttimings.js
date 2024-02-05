"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _RequestTimer = _interopRequireDefault(require("./utils/RequestTimer"));
function requestTime(statsLoggerClient) {
  return /*#__PURE__*/_regenerator["default"].mark(function _callee(next) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          this.state.requestTimer = new _RequestTimer["default"](statsLoggerClient, 'request', "method=".concat(this.request.method, " path=").concat(this.request.path));
          return _context.delegateYield(next, "t0", 2);
        case 2:
          this.state.requestTimer.finish();
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  });
}
module.exports = requestTime;