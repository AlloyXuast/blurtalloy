"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _statsdClient = _interopRequireDefault(require("statsd-client"));
/**
 * In production, log stats to statsd.
 * In dev, console.log 'em.
 */
var StatsLoggerClient = exports["default"] = /*#__PURE__*/function () {
  function StatsLoggerClient(STATSD_IP) {
    (0, _classCallCheck2["default"])(this, StatsLoggerClient);
    if (STATSD_IP) {
      this.SDC = new _statsdClient["default"]({
        host: STATSD_IP,
        prefix: 'condenser'
      });
    } else {
      console.log('StatsLoggerClient: no server available, logging to console.');
      // Implement debug loggers here, as any new calls are added in methods below.
      this.SDC = {
        timing: function timing() {
          console.log('StatsLoggerClient call: ', arguments);
        }
      };
    }
  }

  /**
   * Given an array of timer tuples that look like [namespace, value]
   * log them all to statsd.
   */
  (0, _createClass2["default"])(StatsLoggerClient, [{
    key: "logTimers",
    value: function logTimers(tuples) {
      var _this = this;
      var timestamp = +new Date();
      tuples.map(function (tuple) {
        _this.SDC.timing(tuple[0], tuple[1]);
      });
    }
  }]);
  return StatsLoggerClient;
}();