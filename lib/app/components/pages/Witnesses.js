"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireDefault(require("react"));
var _reactRouter = require("react-router");
var _counterpart = _interopRequireDefault(require("counterpart"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Witnesses = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Witnesses, _React$Component);
  function Witnesses() {
    (0, _classCallCheck2["default"])(this, Witnesses);
    return _callSuper(this, Witnesses, arguments);
  }
  (0, _createClass2["default"])(Witnesses, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column"
      }, (0, _counterpart["default"])('g.external_link_message'), ': ', /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
        to: "".concat($STM_Config.wallet_url, "/~witnesses")
      }, (0, _counterpart["default"])('navigation.vote_for_witnesses'))));
    }
  }]);
  return Witnesses;
}(_react["default"].Component);
module.exports = {
  path: '/~witnesses(/:witness)',
  component: Witnesses
};