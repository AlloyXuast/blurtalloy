"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var expo = exports["default"] = {
  ifObjectToJSON: function ifObjectToJSON(item) {
    if ((0, _typeof2["default"])(item) === 'object') {
      try {
        return JSON.stringify(item);
      } catch (e) {
        return item;
      }
    }
    return item;
  },
  ifStringParseJSON: function ifStringParseJSON(item) {
    if (typeof item === 'string') {
      try {
        return JSON.parse(item);
      } catch (e) {
        return item;
      }
    }
    return item;
  }
};
exports.test = {
  run: function run() {
    var ob = {
      a: 2
    };
    var st = '{"a":2}';
    console.log('test eq1', expo.ifObjectToJSON(ob) == st);
    console.log('test eq2', expo.ifStringParseJSON(st).a == ob.a);
  }
};