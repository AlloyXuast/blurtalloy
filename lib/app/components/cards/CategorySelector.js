"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.validateCategory = validateCategory;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _ReduxForms = require("app/utils/ReduxForms");
var _counterpart = _interopRequireDefault(require("counterpart"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var CategorySelector = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(CategorySelector, _React$Component);
  function CategorySelector() {
    (0, _classCallCheck2["default"])(this, CategorySelector);
    return _callSuper(this, CategorySelector, arguments);
  }
  (0, _createClass2["default"])(CategorySelector, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        tabIndex = _this$props.tabIndex,
        disabled = _this$props.disabled,
        _onChange = _this$props.onChange;
      var impProps = _objectSpread({}, this.props);
      var inputSanitized = (0, _ReduxForms.cleanReduxInput)(impProps);
      var tags = inputSanitized.value.split(' ');
      var hidden = [];
      if (tags && tags[0].substring(0, 6) == 'blurt-') hidden.push(tags.shift());
      var value = tags.join(' ');
      var input = /*#__PURE__*/_react["default"].createElement("input", {
        type: "text",
        value: value,
        onChange: function onChange(e) {
          e.preventDefault();
          // Re-insert any hidden tags first.
          var updatedEvent = _objectSpread(_objectSpread({}, e), {}, {
            target: _objectSpread(_objectSpread({}, e.target), {}, {
              value: hidden.concat([e.target.value]).join(' ')
            })
          });
          _onChange(updatedEvent);
        },
        ref: "tagInputRef",
        tabIndex: tabIndex,
        disabled: disabled,
        autoCapitalize: "none",
        placeholder: this.props.placeholder
      });
      return /*#__PURE__*/_react["default"].createElement("span", null, input);
    }
  }]);
  return CategorySelector;
}(_react["default"].Component);
(0, _defineProperty2["default"])(CategorySelector, "propTypes", {
  // HTML props
  onChange: _propTypes["default"].func.isRequired,
  disabled: _propTypes["default"].bool,
  tabIndex: _propTypes["default"].number
});
function validateCategory(category) {
  var required = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (!category || category.split(':')[0].trim() === '') {
    return required ? (0, _counterpart["default"])('g.required') : null;
  }
  var cats = category.split(':')[0].trim().split(' ');
  return (
    // !category || category.trim() === '' ? 'Required' :
    cats.length > 10 ? (0, _counterpart["default"])('category_selector_jsx.use_limited_amount_of_categories', {
      amount: 10
    }) : cats.find(function (c) {
      return c.length > 24;
    }) ? (0, _counterpart["default"])('category_selector_jsx.maximum_tag_length_is_24_characters') : cats.find(function (c) {
      return c.split('-').length > 2;
    }) ? (0, _counterpart["default"])('category_selector_jsx.use_one_dash') : cats.find(function (c) {
      return c.indexOf(',') >= 0;
    }) ? (0, _counterpart["default"])('category_selector_jsx.use_spaces_to_separate_tags') : cats.find(function (c) {
      return /[A-Z]/.test(c);
    }) ? (0, _counterpart["default"])('category_selector_jsx.use_only_lowercase_letters') : cats.find(function (c) {
      return !/^[a-z0-9-#]+$/.test(c);
    }) ? (0, _counterpart["default"])('category_selector_jsx.use_only_allowed_characters') : cats.find(function (c) {
      return !/^[a-z-#]/.test(c);
    }) ? (0, _counterpart["default"])('category_selector_jsx.must_start_with_a_letter') : cats.find(function (c) {
      return !/[a-z0-9]$/.test(c);
    }) ? (0, _counterpart["default"])('category_selector_jsx.must_end_with_a_letter_or_number') : cats.filter(function (c) {
      return c.substring(0, 6) === 'blurt-';
    }).length > 1 ? (0, _counterpart["default"])('category_selector_jsx.must_not_include_nexus_community_owner', {
      blurt: cats.filter(function (c) {
        return c.substring(0, 6) === 'blurt-';
      })[0]
    }) : null
  );
}
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, ownProps) {
  // apply translations
  // they are used here because default prop can't acces intl property
  var placeholder = (0, _counterpart["default"])('category_selector_jsx.tag_your_story');
  return _objectSpread({
    placeholder: placeholder
  }, ownProps);
})(CategorySelector);