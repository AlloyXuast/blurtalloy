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
var _reactRouter = require("react-router");
var _Icon = _interopRequireDefault(require("app/components/elements/Icon"));
var _DomUtils = require("app/utils/DomUtils");
var _propTypes = _interopRequireDefault(require("prop-types"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Dropdown = exports["default"] = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Dropdown, _React$Component);
  function Dropdown(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, Dropdown);
    _this = _callSuper(this, Dropdown, [props]);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "toggle", function (e) {
      var shown = _this.state.shown;
      if (shown) {
        _this.hide(e);
      } else _this.show(e);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "show", function (e) {
      e.preventDefault();
      _this.setState({
        shown: true
      });
      _this.props.onShow();
      document.addEventListener('click', _this.hide);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "hide", function (e) {
      // Do not hide the dropdown if there was a click within it.
      var inside_dropdown = !!(0, _DomUtils.findParent)(e.target, 'dropdown__content');
      if (inside_dropdown) return;
      e.preventDefault();
      _this.setState({
        shown: false
      });
      _this.props.onHide();
      document.removeEventListener('click', _this.hide);
    });
    _this.state = {
      shown: false
    };
    return _this;
  }
  (0, _createClass2["default"])(Dropdown, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.show !== this.state.shown) {
        this.setState({
          shown: nextProps.show
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.hide);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        children = _this$props.children,
        className = _this$props.className,
        title = _this$props.title,
        href = _this$props.href,
        position = _this$props.position;
      var entry = /*#__PURE__*/_react["default"].createElement("a", {
        key: "entry",
        href: href || '#',
        onClick: this.toggle
      }, title);
      var content = /*#__PURE__*/_react["default"].createElement("div", {
        key: "dropdown-content",
        className: 'dropdown__content'
      }, children);
      var cls = 'dropdown' + (this.state.shown ? ' show' : '') + (className ? " ".concat(className) : '') + (position ? " ".concat(position) : '');
      return /*#__PURE__*/_react["default"].createElement('div', {
        className: cls,
        key: 'dropdown'
      }, [entry, content]);
    }
  }]);
  return Dropdown;
}(_react["default"].Component);
(0, _defineProperty2["default"])(Dropdown, "propTypes", {
  children: _propTypes["default"].object,
  className: _propTypes["default"].string,
  title: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]).isRequired,
  href: _propTypes["default"].string,
  onHide: _propTypes["default"].func,
  onShow: _propTypes["default"].func,
  show: _propTypes["default"].bool
});
(0, _defineProperty2["default"])(Dropdown, "defaultProps", {
  onHide: function onHide() {
    return null;
  },
  onShow: function onShow() {
    return null;
  },
  show: false,
  className: 'dropdown-comp',
  href: null
});