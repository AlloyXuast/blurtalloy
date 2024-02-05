"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _remarkable = require("remarkable");
var remarkable = new _remarkable.Remarkable();
var _default = exports["default"] = remarkable;
/** Removes all markdown leaving just plain text */
var remarkableStripper = function remarkableStripper(md) {
  md.renderer.render = function (tokens, options, env) {
    var str = '';
    for (var i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'inline') {
        str += md.renderer.render(tokens[i].children, options, env);
      } else {
        // console.log('content', tokens[i])
        var content = tokens[i].content;
        str += (content || '') + ' ';
      }
    }
    return str;
  };
};
remarkable.use(remarkableStripper); // removes all markdown