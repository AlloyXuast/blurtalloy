"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Qr = exports["default"] = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Qr, _React$Component);
  function Qr(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, Qr);
    _this = _callSuper(this, Qr);
    _this.handleError = function (error) {
      console.error(error);
    };
    var onClose = props.onClose,
      handleScan = props.handleScan;
    _this.handleScan = function (data) {
      handleScan(data);
      if (onClose) onClose();
    };
    return _this;
  }
  (0, _createClass2["default"])(Qr, [{
    key: "render",
    value: function render() {
      var handleError = this.handleError,
        handleScan = this.handleScan;
      // Watch out, QrReader can mess up the nodejs server, tries to ref `navigator`
      // The server does not need a QrReader anyways
      if (!process.env.BROWSER) return /*#__PURE__*/_react["default"].createElement("span", null);
      return /*#__PURE__*/_react["default"].createElement("span", null);
      // a) Leaves the camera on when closing dialog - react-qr-reader v0.2.4
      // b) Only saw this work in Chrome - 0.2.4
      // try {
      //     const QrReader = require("react-qr-reader").default
      //     return <QrReader width={320} height={240} handleError={handleError}
      //         {...this.props} handleScan={handleScan} />
      // } catch(error) {
      //     console.log(error)
      //     return <span></span>
      // }
    }
  }]);
  return Qr;
}(_react["default"].Component);
(0, _defineProperty2["default"])(Qr, "propTypes", {
  handleScan: _propTypes["default"].func.isRequired,
  onClose: _propTypes["default"].func
});