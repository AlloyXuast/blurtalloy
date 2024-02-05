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
var _reactRouter = require("react-router");
var _Icon = _interopRequireDefault(require("app/components/elements/Icon"));
var _VerticalMenu = _interopRequireDefault(require("./VerticalMenu"));
var _DomUtils = require("app/utils/DomUtils");
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var DropdownMenu = exports["default"] = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(DropdownMenu, _React$Component);
  function DropdownMenu(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, DropdownMenu);
    _this = _callSuper(this, DropdownMenu, [props]);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "toggle", function (e) {
      var shown = _this.state.shown;
      if (shown) _this.hide(e);else _this.show(e);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "show", function (e) {
      e.preventDefault();
      _this.setState({
        shown: true
      });
      document.addEventListener('click', _this.hide);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "hide", function (e) {
      // Do not hide the dropdown if there was a click within it.
      var inside_dropdown = !!(0, _DomUtils.findParent)(e.target, 'VerticalMenu');
      if (inside_dropdown) return;
      e.preventDefault();
      _this.setState({
        shown: false
      });
      document.removeEventListener('click', _this.hide);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "navigate", function (e) {
      var a = e.target.nodeName.toLowerCase() === 'a' ? e.target : e.target.parentNode;
      _this.setState({
        show: false
      });
      if (a.host !== window.location.host) return;
      e.preventDefault();
      _reactRouter.browserHistory.push(a.pathname + a.search);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getSelectedLabel", function (items, selected) {
      var selectedEntry = items.find(function (i) {
        return i.value === selected;
      });
      var selectedLabel = selectedEntry && selectedEntry.label ? selectedEntry.label : selected;
      return selectedLabel;
    });
    _this.state = {
      shown: false,
      selected: props.selected
    };
    return _this;
  }
  (0, _createClass2["default"])(DropdownMenu, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.hide);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        el = _this$props.el,
        items = _this$props.items,
        selected = _this$props.selected,
        children = _this$props.children,
        className = _this$props.className,
        title = _this$props.title,
        href = _this$props.href,
        position = _this$props.position;
      var hasDropdown = items.length > 0;
      var entry = children || /*#__PURE__*/_react["default"].createElement("span", null, this.getSelectedLabel(items, selected), hasDropdown && /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
        name: "dropdown-arrow"
      }));
      if (hasDropdown) entry = /*#__PURE__*/_react["default"].createElement("a", {
        key: "entry",
        href: href || '#',
        onClick: this.toggle
      }, entry);
      var menu = /*#__PURE__*/_react["default"].createElement(_VerticalMenu["default"], {
        key: "menu",
        title: title,
        items: items,
        hideValue: selected,
        className: "VerticalMenu"
      });
      var cls = 'DropdownMenu' + (this.state.shown ? ' show' : '') + (className ? " ".concat(className) : '') + (position ? " ".concat(position) : '');
      return /*#__PURE__*/_react["default"].createElement(el, {
        className: cls
      }, [entry, menu]);
    }
  }]);
  return DropdownMenu;
}(_react["default"].Component);
(0, _defineProperty2["default"])(DropdownMenu, "propTypes", {
  items: _propTypes["default"].oneOfType([_propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired]),
  selected: _propTypes["default"].string,
  children: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].array]),
  className: _propTypes["default"].string,
  title: _propTypes["default"].string,
  href: _propTypes["default"].string,
  el: _propTypes["default"].string.isRequired
});