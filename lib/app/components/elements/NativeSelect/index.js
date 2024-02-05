"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var NativeSelect = function NativeSelect(_ref) {
  var options = _ref.options,
    className = _ref.className,
    currentlySelected = _ref.currentlySelected,
    onChange = _ref.onChange;
  var handleChange = function handleChange(event) {
    onChange(event.target);
  };
  var opts = options.map(function (val, key) {
    return /*#__PURE__*/_react["default"].createElement("option", {
      key: "".concat(key, "-NativeSelect-").concat(val.name, "-").concat(val.label),
      value: val.value,
      disabled: val.disabled ? val.disabled : false,
      style: val.title ? {
        backgroundColor: '#f4f4f4',
        fontWeight: 'bolder'
      } : {}
    }, val.label);
  });
  return /*#__PURE__*/_react["default"].createElement("select", {
    onChange: handleChange,
    className: "nativeSelect ".concat(className),
    value: currentlySelected
  }, opts);
};
NativeSelect.propTypes = {
  options: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    name: _propTypes["default"].string,
    label: _propTypes["default"].string,
    link: _propTypes["default"].string
  })).isRequired,
  onChange: _propTypes["default"].func.isRequired,
  className: _propTypes["default"].string,
  currentlySelected: _propTypes["default"].string.isRequired
};
NativeSelect.defaultProps = {
  className: ''
};
var _default = exports["default"] = NativeSelect;