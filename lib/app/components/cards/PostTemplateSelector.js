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
var _counterpart = _interopRequireDefault(require("counterpart"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* eslint-disable react/static-property-placement */
var PostTemplateSelector = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(PostTemplateSelector, _React$Component);
  function PostTemplateSelector() {
    var _this;
    (0, _classCallCheck2["default"])(this, PostTemplateSelector);
    _this = _callSuper(this, PostTemplateSelector);
    _this.state = {
      currentTemplateName: ''
    };
    return _this;
  }
  (0, _createClass2["default"])(PostTemplateSelector, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        username = _this$props.username,
        onChange = _this$props.onChange,
        templates = _this$props.templates;
      var currentTemplateName = this.state.currentTemplateName;
      if (!username || typeof window === 'undefined') {
        return null;
      }
      var handleTemplateSelection = function handleTemplateSelection(event) {
        var create = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var selectedTemplateName = event.target.value;
        _this2.setState({
          currentTemplateName: selectedTemplateName
        });
        onChange(create ? "create_".concat(selectedTemplateName) : selectedTemplateName);
      };
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column"
      }, /*#__PURE__*/_react["default"].createElement("h4", null, (0, _counterpart["default"])('post_template_selector_jsx.templates')), /*#__PURE__*/_react["default"].createElement("p", null, (0, _counterpart["default"])('post_template_selector_jsx.templates_description')))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "small-12 medium-6 large-12 columns"
      }, templates && /*#__PURE__*/_react["default"].createElement("select", {
        onChange: handleTemplateSelection,
        value: currentTemplateName
      }, /*#__PURE__*/_react["default"].createElement("option", {
        value: ""
      }, (0, _counterpart["default"])('post_template_selector_jsx.choose_template')), templates.map(function (template) {
        return /*#__PURE__*/_react["default"].createElement("option", {
          value: template.name,
          key: template.name
        }, template.name);
      })), !templates && /*#__PURE__*/_react["default"].createElement("span", null, (0, _counterpart["default"])('post_template_selector_jsx.create_template_first')))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "small-12 medium-6 large-12 columns"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        id: "new_template_name",
        type: "text",
        className: "input-group-field bold",
        placeholder: (0, _counterpart["default"])('post_template_selector_jsx.new_template_name'),
        onChange: function onChange(event) {
          handleTemplateSelection(event, true);
        }
      }))));
    }
  }]);
  return PostTemplateSelector;
}(_react["default"].Component);
(0, _defineProperty2["default"])(PostTemplateSelector, "propTypes", {
  username: _propTypes["default"].string.isRequired,
  templates: _propTypes["default"].array.isRequired,
  onChange: _propTypes["default"].func.isRequired
});
var _default = exports["default"] = PostTemplateSelector;