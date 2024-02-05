"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Grid = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@storybook/react");
var _addonKnobs = require("@storybook/addon-knobs");
var _Icon = _interopRequireWildcard(require("./Icon"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var styles = {
  textAlign: 'center',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridAutoRows: 'minmax(80px, auto)'
};
var Grid = exports.Grid = function Grid(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: styles
  }, children);
};
var options = ['1x', '1_5x', '2x', '3x', '4x', '5x', '10x'];
(0, _react2.storiesOf)('Elements', module).addDecorator(_addonKnobs.withKnobs).add('Icon', function () {
  return /*#__PURE__*/_react["default"].createElement(Grid, null, _Icon.icons.map(function (icon) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: 'icon_' + icon
    }, /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
      name: icon,
      size: (0, _addonKnobs.select)('size', options, '2x')
    }), /*#__PURE__*/_react["default"].createElement("p", null, " ", icon, " "));
  }));
});