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
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _reactAutocomplete = _interopRequireDefault(require("react-autocomplete"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function matchInputToItem(item, input) {
  return item.name.toLowerCase().indexOf(input.toLowerCase()) !== -1 || item.abbr.toLowerCase().indexOf(input.toLowerCase()) !== -1;
}

/**
 * An example of how to implement a relevancy-based sorting method. States are
 * sorted based on the location of the match - For example, a search for "or"
 * will return "Oregon" before "North Carolina" even though "North Carolina"
 * would normally sort above Oregon. Strings where the match is in the same
 * location (or there is no match) will be sorted alphabetically - For example,
 * a search for "or" would return "North Carolina" above "North Dakota".
 */
function sortInput(a, b, value) {
  var aLower = a.name.toLowerCase();
  var bLower = b.name.toLowerCase();
  var valueLower = value.toLowerCase();
  var queryPosA = aLower.indexOf(valueLower);
  var queryPosB = bLower.indexOf(valueLower);
  if (queryPosA !== queryPosB) {
    return queryPosA - queryPosB;
  }
  return aLower < bLower ? -1 : 1;
}
var AutocompleteInput = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(AutocompleteInput, _React$Component);
  function AutocompleteInput(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, AutocompleteInput);
    _this = _callSuper(this, AutocompleteInput, [props]);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      value: _this.props.initialValue
    });
    return _this;
  }
  (0, _createClass2["default"])(AutocompleteInput, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
        htmlFor: "input-autocomplete"
      }, this.props.label), /*#__PURE__*/_react["default"].createElement(_reactAutocomplete["default"], {
        value: this.state.value,
        inputProps: {
          id: 'input-autocomplete'
        },
        wrapperStyle: {
          position: 'relative',
          display: 'inline-block'
        },
        items: this.props.values,
        getItemValue: function getItemValue(item) {
          return item.name;
        },
        shouldItemRender: matchInputToItem,
        sortItems: sortInput,
        onChange: function onChange(event, value) {
          return _this2.setState({
            value: value
          });
        },
        onSelect: function onSelect(value) {
          _this2.setState({
            value: value
          });
          _this2.props.onSelect(value);
        },
        renderMenu: function renderMenu(children) {
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: "react-autocomplete-input"
          }, children);
        },
        renderItem: function renderItem(item, isHighlighted) {
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: "item ".concat(isHighlighted ? 'item-highlighted' : ''),
            key: item.abbr
          }, item.name);
        }
      }));
    }
  }]);
  return AutocompleteInput;
}(_react["default"].Component);
(0, _defineProperty2["default"])(AutocompleteInput, "propTypes", {
  initialValue: _propTypes["default"].string.isRequired,
  label: _propTypes["default"].string.isRequired,
  values: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    name: _propTypes["default"].string,
    abbr: _propTypes["default"].string
  })).isRequired,
  onSelect: _propTypes["default"].func.isRequired
});
var _default = exports["default"] = AutocompleteInput;