"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compare = compare;
exports["default"] = _default;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _reactAddonsPureRenderMixin = _interopRequireDefault(require("react-addons-pure-render-mixin"));
var _immutable = require("immutable");
/**
    Wrapper for PureRenderMixin.
    This allows debugging that will show which properties changed.
*/
function _default(instance, name) {
  var mixin = _reactAddonsPureRenderMixin["default"].shouldComponentUpdate.bind(instance);
  if (process.env.BROWSER && window.steemDebug_shouldComponentUpdate === undefined) {
    window.steemDebug_shouldComponentUpdate = false; // console command line completion
  }
  return function (nextProps, nextState) {
    var upd = mixin(nextProps, nextState);
    // Usage: steemDebug_shouldComponentUpdate = true
    // Or: steemDebug_shouldComponentUpdate = /Comment/
    if (upd && process.env.BROWSER && window.steemDebug_shouldComponentUpdate) {
      var filter = window.steemDebug_shouldComponentUpdate;
      if (filter.test) {
        if (!filter.test(name)) return upd;
      }
      compare(name, instance.props, nextProps);
      compare(name, instance.state, nextState);
    }
    return upd;
  };
}
function compare(name, a, b) {
  var aKeys = new Set(a && Object.keys(a));
  var bKeys = new Set(b && Object.keys(b));
  var ab = new Set([].concat((0, _toConsumableArray2["default"])(aKeys), (0, _toConsumableArray2["default"])(aKeys)));
  ab.forEach(function (key) {
    var hasA = aKeys.has(key);
    var hasB = bKeys.has(key);
    if (!hasA && !hasB) return;
    if (hasA && hasB && a[key] === b[key]) return;
    var desc = !hasA ? 'added' : !hasB ? 'removed' : 'changed';
    console.log(name, key, desc);
    var aKey = a[key];
    var bKey = b[key];
    if (typeof aKey !== 'function' && typeof bKey !== 'function') {
      // functions are too verbose
      console.log(key, 'was', a && toJS(aKey));
      console.log(key, 'is', b && toJS(bKey));
    }
  });
}
var toJS = function toJS(o) {
  return _immutable.Iterable.isIterable(o) ? o.toJS() : o;
};