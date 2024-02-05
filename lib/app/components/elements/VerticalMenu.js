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
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var VerticalMenu = exports["default"] = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(VerticalMenu, _React$Component);
  function VerticalMenu() {
    var _this;
    (0, _classCallCheck2["default"])(this, VerticalMenu);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, VerticalMenu, [].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "closeMenu", function (e) {
      // If this was not a left click, or if CTRL or CMD were held, do not close the menu.
      if (e.button !== 0 || e.ctrlKey || e.metaKey) return;

      // Simulate clicking of document body which will close any open menus
      document.body.click();
    });
    return _this;
  }
  (0, _createClass2["default"])(VerticalMenu, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        items = _this$props.items,
        title = _this$props.title,
        className = _this$props.className,
        hideValue = _this$props.hideValue;
      return /*#__PURE__*/_react["default"].createElement("ul", {
        className: 'VerticalMenu menu vertical' + (className ? ' ' + className : '')
      }, title && /*#__PURE__*/_react["default"].createElement("li", {
        className: "title"
      }, title), items.map(function (i) {
        if (i.value === hideValue) return null;
        return /*#__PURE__*/_react["default"].createElement("li", {
          key: i.value,
          onClick: _this2.closeMenu
        }, i.link ? i.link.match(/^http(s?)/) ? /*#__PURE__*/_react["default"].createElement("a", {
          href: i.link,
          target: "_blank",
          rel: "noopener noreferrer"
        }, i.icon && /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
          name: i.icon
        }), i.label ? i.label : i.value, i.addon) : /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
          to: i.link,
          onClick: i.onClick
        }, i.icon && /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
          name: i.icon
        }), i.label ? i.label : i.value, i.addon) : /*#__PURE__*/_react["default"].createElement("span", null, i.icon && /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
          name: i.icon
        }), i.label ? i.label : i.value));
      }));
    }
  }]);
  return VerticalMenu;
}(_react["default"].Component);
(0, _defineProperty2["default"])(VerticalMenu, "propTypes", {
  items: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
  title: _propTypes["default"].string,
  className: _propTypes["default"].string,
  hideValue: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element])
});