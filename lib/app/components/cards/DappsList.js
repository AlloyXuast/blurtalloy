"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _Icon = _interopRequireDefault(require("../elements/Icon"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* global $STM_Config */
var DappsList = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(DappsList, _Component);
  function DappsList() {
    (0, _classCallCheck2["default"])(this, DappsList);
    return _callSuper(this, DappsList, arguments);
  }
  (0, _createClass2["default"])(DappsList, [{
    key: "render",
    value: function render() {
      var dapps = this.props.dapps; // redux
      var categories = dapps.toJS();
      var dataToRender = Object.entries(categories).map(function (_ref, index) {
        var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
          categoryLabel = _ref2[0],
          categoryValue = _ref2[1];
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "categories",
          key: index
        }, /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("h3", {
          className: "panel"
        }, categoryLabel), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", {
          className: "row"
        }, categoryValue.map(function (item, index2) {
          return /*#__PURE__*/_react["default"].createElement("div", {
            key: index2 + item.title,
            className: "small-12 large-4 column"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "single-category"
          }, /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
            name: "blurt",
            size: "5x"
          }), /*#__PURE__*/_react["default"].createElement("h4", null, item.title), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("h5", null, /*#__PURE__*/_react["default"].createElement("a", {
            href: "https://".concat($STM_Config.site_domain, "/") + item.user
          }, "By ", item.user)), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("a", {
            href: item.url,
            className: "button round"
          }, "Visit")));
        })));
      });
      return /*#__PURE__*/_react["default"].createElement("div", null, dataToRender);
    }
  }]);
  return DappsList;
}(_react.Component);
var _default = exports["default"] = (0, _reactRedux.connect)(function (state) {
  var dapps = state.offchain.get('dapps');
  return {
    dapps: dapps
  };
})(DappsList);