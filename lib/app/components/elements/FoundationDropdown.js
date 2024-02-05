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
var _propTypes = _interopRequireDefault(require("prop-types"));
var _DomUtils = require("app/utils/DomUtils");
var _dropdown = require("react-foundation-components/lib/global/dropdown");
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var FoundationDropdown = exports["default"] = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(FoundationDropdown, _React$Component);
  function FoundationDropdown(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, FoundationDropdown);
    _this = _callSuper(this, FoundationDropdown, [props]);
    _this.state = {
      show: props.show
    };
    _this.closeOnOutsideClick = _this.closeOnOutsideClick.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }
  (0, _createClass2["default"])(FoundationDropdown, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var show = this.state.show;
      if (show !== prevState.show) {
        if (show) document.body.addEventListener('mousedown', this.closeOnOutsideClick);else document.body.removeEventListener('mousedown', this.closeOnOutsideClick);
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      if (newProps.show !== this.props.show && newProps.show !== this.state.show) {
        this.setState({
          show: newProps.show
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.body.removeEventListener('mousedown', this.closeOnOutsideClick);
    }
  }, {
    key: "closeOnOutsideClick",
    value: function closeOnOutsideClick(e) {
      var inside_dropdown = (0, _DomUtils.findParent)(e.target, 'FoundationDropdown');
      // console.log('-- closeOnOutsideClick -->', e.target, inside_dropdown);
      if (!inside_dropdown) {
        this.setState({
          show: false
        });
        if (this.props.onHide) this.props.onHide();
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.state.show) return null;
      var className = this.props.className;
      return /*#__PURE__*/_react["default"].createElement(_dropdown.Dropdown, {
        className: "FoundationDropdown ".concat(className)
      }, this.props.children);
    }
  }]);
  return FoundationDropdown;
}(_react["default"].Component);
(0, _defineProperty2["default"])(FoundationDropdown, "propTypes", {
  show: _propTypes["default"].bool.isRequired,
  className: _propTypes["default"].string,
  children: _propTypes["default"].any,
  onHide: _propTypes["default"].func
});