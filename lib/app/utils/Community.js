"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Role = void 0;
exports.ifBlurt = ifBlurt;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _Role;
var Role = exports.Role = /*#__PURE__*/(0, _createClass2["default"])(function Role() {
  (0, _classCallCheck2["default"])(this, Role);
});
_Role = Role;
(0, _defineProperty2["default"])(Role, "LEVELS", ['muted', 'guest', 'member', 'mod', 'admin', 'owner']);
(0, _defineProperty2["default"])(Role, "level", function (role) {
  if (!role) throw 'empty role provided';
  var level = _Role.LEVELS.indexOf(role);
  if (level == -1) throw 'invalid role: ' + role;
  return level;
});
(0, _defineProperty2["default"])(Role, "atLeast", function (role, target) {
  return _Role.level(role) >= _Role.level(target);
});
(0, _defineProperty2["default"])(Role, "canPost", function (name, role) {
  if (!name) return true;
  // journal/council restriction: only members can post
  var minRole = _Role.parseType(name) == 1 ? 'guest' : 'member';
  return _Role.atLeast(role, minRole);
});
(0, _defineProperty2["default"])(Role, "canComment", function (name, role) {
  if (!name) return true;
  // council restriction: only members can comment
  var minRole = _Role.parseType(name) == 3 ? 'member' : 'guest';
  return _Role.atLeast(role, minRole);
});
(0, _defineProperty2["default"])(Role, "parseType", function (name) {
  return parseInt(name[6]);
});
function ifBlurt(category) {
  return category && category.match(/^(blurt-)([0-9]{6,})/i) !== null ? category : null;
}