"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _Post = _interopRequireDefault(require("app/components/pages/Post"));
module.exports = {
  path: '/(:category/)@:username/:slug',
  component: _Post["default"]
};