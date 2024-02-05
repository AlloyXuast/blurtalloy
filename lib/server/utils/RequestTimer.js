"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assert = _interopRequireDefault(require("assert"));
var _StatsLoggerClient = _interopRequireDefault(require("./StatsLoggerClient"));
/**
 * @param {array} hrtime process.hrtime() tuple
 * @returns {number} nanoseconds
 */
var hrtimeToNanoseconds = function hrtimeToNanoseconds(hrtime) {
  return +hrtime[0] * 1e9 + +hrtime[1];
};

/**
 * @param {array} hrtime process.hrtime() tuple
 * @returns {number} milliseconds
 */
var hrtimeToMilliseconds = function hrtimeToMilliseconds(hrtime) {
  return +hrtime[0] * 1000 + +hrtime[1] / 1000000;
};

/**
 * Logs total request time starting at instantiation and ending when finish() is called.
 * Additional timers can be managed with startTimer('name') and stopTimer('name')
 *
 * Results are stored in `timers` property and submitted to statsd at finish().
 */
var RequestTimer = exports["default"] = /*#__PURE__*/function () {
  /**
   *
   * @param {StatsLoggerClient} statsLoggerClient
   * @param {string} prefix namespace to tack on the front of each timer name
   * @param {string} tags not yet supported by statsd / StatsLoggerClient
   */
  function RequestTimer(statsLoggerClient, prefix, tags) {
    (0, _classCallCheck2["default"])(this, RequestTimer);
    (0, _assert["default"])(statsLoggerClient instanceof _StatsLoggerClient["default"], 'provide an instance of StatsLoggerClient');
    this.start = process.hrtime();
    this.timers = [];
    this.inProgressTimers = {};
    this.prefix = prefix;
    this.requestTags = tags;
    this.statsLoggerClient = statsLoggerClient;
  }

  /**
   * @param {string} name
   * @param {number} duration milliseconds
   */
  (0, _createClass2["default"])(RequestTimer, [{
    key: "logSegment",
    value: function logSegment(name, duration) {
      this.timers.push(["".concat(this.prefix, ".").concat(name), duration]);
    }

    /**
     * Starts keeping track of something to time.
     *
     * @param {string} name
     */
  }, {
    key: "startTimer",
    value: function startTimer(name) {
      (0, _assert["default"])(typeof name === 'string', 'a name for the timer must be provided');
      this.inProgressTimers[name] = process.hrtime();
    }

    /**
     * Stops an in-progress timer and stores it in the list of timers to log when the request is finished.
     *
     * @param {*} name
     */
  }, {
    key: "stopTimer",
    value: function stopTimer(name) {
      (0, _assert["default"])(typeof this.inProgressTimers[name] !== 'undefined', 'provide an existing timer name');
      this.logSegment(name, hrtimeToMilliseconds(process.hrtime(this.inProgressTimers[name])));
      delete this.inProgressTimers[name];
    }
  }, {
    key: "finish",
    value: function finish() {
      this.logSegment('total_ms', hrtimeToMilliseconds(process.hrtime(this.start)));
      this.statsLoggerClient.logTimers(this.timers, this.requestTags);
    }
  }]);
  return RequestTimer;
}();