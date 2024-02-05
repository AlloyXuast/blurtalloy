"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var SidebarStats = function SidebarStats(_ref) {
  var operationFlatFee = _ref.operationFlatFee,
    bandwidthKbytesFee = _ref.bandwidthKbytesFee,
    pricePerBlurt = _ref.pricePerBlurt;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "c-sidebar__module"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "c-sidebar__header"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "c-sidebar__h3",
    style: {
      textAlign: 'center'
    }
  }, "Transaction Fees")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "c-sidebar__content",
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      gap: '1.2em'
    }
  }, /*#__PURE__*/_react["default"].createElement("ul", {
    className: "c-sidebar__list-small"
  }, /*#__PURE__*/_react["default"].createElement("li", {
    className: "c-sidebar__list-item"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      gap: '.2em'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      textAlign: 'center',
      fontWeight: 'bold'
    }
  }, "Operation Flat Fee"), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, operationFlatFee, " BLURT"))), /*#__PURE__*/_react["default"].createElement("li", {
    className: "c-sidebar__list-item"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      gap: '.2em'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      textAlign: 'center',
      fontWeight: 'bold'
    }
  }, "Bandwidth Fee"), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, bandwidthKbytesFee, " BLURT per kilobyte"))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "c-sidebar__header",
    style: {
      paddingTop: '1.5em'
    }
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "c-sidebar__h3",
    style: {
      textAlign: 'center'
    }
  }, "BLURT Price (USD)")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "c-sidebar__content"
  }, /*#__PURE__*/_react["default"].createElement("ul", {
    className: "c-sidebar__list-small"
  }, /*#__PURE__*/_react["default"].createElement("li", {
    className: "c-sidebar__list-item"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, "1 BLURT = $", pricePerBlurt)))));
};
var _default = exports["default"] = SidebarStats;