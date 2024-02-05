"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Modal = _interopRequireDefault(require("react-overlays/lib/Modal"));
var _Transition = _interopRequireDefault(require("react-overlays/lib/Transition"));
var Reveal = function Reveal(_ref) {
  var children = _ref.children,
    onHide = _ref.onHide,
    show = _ref.show;
  var modalStyle = {
    bottom: 0,
    left: 0,
    overflowY: 'scroll',
    position: 'fixed',
    right: 0,
    top: 0,
    display: 'block',
    zIndex: 105
  };
  return /*#__PURE__*/_react["default"].createElement(_Modal["default"], {
    backdrop: true,
    transition: _Transition["default"],
    onHide: onHide,
    show: show,
    backdropClassName: "reveal-overlay",
    backdropStyle: {
      display: 'block'
    },
    style: modalStyle
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "reveal fade in",
    role: "document",
    tabIndex: "-1",
    style: {
      display: 'block'
    }
  }, children));
};
Reveal.propTypes = {
  show: _propTypes["default"].bool.isRequired,
  onHide: _propTypes["default"].func.isRequired
};
var _default = exports["default"] = Reveal;