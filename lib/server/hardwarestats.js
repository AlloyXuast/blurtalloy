"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _cpuStat = _interopRequireDefault(require("cpu-stat"));
var _memStat = _interopRequireDefault(require("mem-stat"));
var _diskStat = _interopRequireDefault(require("disk-stat"));
var _default = exports["default"] = hardwareStats;
var stats = {};
function handleError(err) {
  // perpetually throws the same error down the chain for promises
  throw err;
}
function startPromise() {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}
function getCpuUsage() {
  return new Promise(function (resolve, reject) {
    _cpuStat["default"].usagePercent(function (err, percent, seconds) {
      if (err) return err;
      stats.cpuPercent = percent;
      resolve();
    });
  });
}
function getMemoryUsage() {
  return new Promise(function (resolve, reject) {
    stats.memoryStatsInGiB = _memStat["default"].allStats('GiB');
    resolve();
  });
}
function getDiskUsage() {
  return new Promise(function (resolve, reject) {
    stats.diskStats = _diskStat["default"].raw();
    resolve();
  });
}
function hardwareStats() {
  return startPromise().then(getCpuUsage, handleError).then(getMemoryUsage, handleError).then(getDiskUsage, handleError).then(function () {
    console.log(JSON.stringify(stats));
  }, handleError).then(null, function (err) {
    console.log('error getting hardware stats: ' + err);
  });
}