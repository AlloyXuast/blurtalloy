"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _ReactForm = _interopRequireDefault(require("app/utils/ReactForm"));
var _constants = require("shared/constants");
var _counterpart = _interopRequireDefault(require("counterpart"));
var _immutable = require("immutable");
var _BeneficiarySelector = _interopRequireWildcard(require("app/components/cards/BeneficiarySelector"));
var _PostTemplateSelector = _interopRequireDefault(require("app/components/cards/PostTemplateSelector"));
var _UserTemplates = require("app/utils/UserTemplates");
var userActions = _interopRequireWildcard(require("app/redux/UserReducer"));
var _reactRedux = require("react-redux");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var PostAdvancedSettings = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(PostAdvancedSettings, _Component);
  function PostAdvancedSettings(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, PostAdvancedSettings);
    _this = _callSuper(this, PostAdvancedSettings);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handlePayoutChange", function (event) {
      _this.setState({
        payoutType: event.target.value
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleTemplateSelected", function (postTemplateName) {
      var username = _this.props.username;
      var userTemplates = (0, _UserTemplates.loadUserTemplates)(username);
      _this.setState({
        postTemplateName: postTemplateName
      });
      if (postTemplateName !== null) {
        for (var ti = 0; ti < userTemplates.length; ti += 1) {
          var template = userTemplates[ti];
          var beneficiaries = _this.state.beneficiaries;
          var newBeneficiaries = _objectSpread({}, beneficiaries);
          if (template.name === postTemplateName) {
            if (Object.prototype.hasOwnProperty.call(template, 'payoutType')) {
              _this.setState({
                payoutType: template.payoutType
              });
            }
            if (Object.prototype.hasOwnProperty.call(template, 'beneficiaries')) {
              newBeneficiaries.props.value = template.beneficiaries;
              _this.setState({
                beneficiaries: newBeneficiaries
              });
            }
            break;
          }
        }
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleDeleteTemplate", function (event, postTemplateName) {
      event.preventDefault();
      event.stopPropagation();
      var username = _this.props.username;
      var userTemplates = (0, _UserTemplates.loadUserTemplates)(username);
      var ui = userTemplates.length;
      // eslint-disable-next-line no-plusplus
      while (ui--) {
        if (userTemplates[ui].name === postTemplateName) {
          userTemplates.splice(ui, 1);
        }
      }
      (0, _UserTemplates.saveUserTemplates)(username, (0, _toConsumableArray2["default"])(userTemplates));
      _this.setState({
        postTemplateName: null
      });
    });
    _this.state = {
      payoutType: props.initialPayoutType,
      postTemplateName: null
    };
    _this.initForm(props);
    return _this;
  }
  (0, _createClass2["default"])(PostAdvancedSettings, [{
    key: "initForm",
    value: function initForm(props) {
      var fields = props.fields;
      (0, _ReactForm["default"])({
        fields: fields,
        instance: this,
        name: 'advancedSettings',
        initialValues: props.initialValues,
        validation: function validation(values) {
          return {
            beneficiaries: (0, _BeneficiarySelector.validateBeneficiaries)(props.username, values.beneficiaries, props.category, false)
          };
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        formId = _this$props.formId,
        username = _this$props.username,
        defaultPayoutType = _this$props.defaultPayoutType,
        initialPayoutType = _this$props.initialPayoutType;
      var _this$state = this.state,
        beneficiaries = _this$state.beneficiaries,
        payoutType = _this$state.payoutType,
        postTemplateName = _this$state.postTemplateName;
      var _this$state$advancedS = this.state.advancedSettings,
        submitting = _this$state$advancedS.submitting,
        valid = _this$state$advancedS.valid,
        handleSubmit = _this$state$advancedS.handleSubmit;
      var disabled = submitting || !(valid || payoutType !== initialPayoutType || postTemplateName != null);
      var loadingTemplate = postTemplateName && postTemplateName.indexOf('create_') === -1;
      var userTemplates = (0, _UserTemplates.loadUserTemplates)(username);
      var form = /*#__PURE__*/_react["default"].createElement("form", {
        onSubmit: handleSubmit(function (_ref) {
          var data = _ref.data;
          var err = (0, _BeneficiarySelector.validateBeneficiaries)(_this2.props.username, data.beneficiaries, true);
          if (!err) {
            _this2.props.setPayoutType(formId, payoutType);
            _this2.props.setBeneficiaries(formId, data.beneficiaries);
            _this2.props.hideAdvancedSettings();
            _this2.props.setPostTemplateName(formId, postTemplateName);
          }
        })
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column"
      }, /*#__PURE__*/_react["default"].createElement("h4", null, (0, _counterpart["default"])('post_advanced_settings_jsx.payout_option_header')), /*#__PURE__*/_react["default"].createElement("p", null, (0, _counterpart["default"])('post_advanced_settings_jsx.payout_option_description')))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "small-12 medium-6 large-12 columns"
      }, /*#__PURE__*/_react["default"].createElement("select", {
        defaultValue: payoutType,
        onChange: this.handlePayoutChange
      }, /*#__PURE__*/_react["default"].createElement("option", {
        value: "0%"
      }, (0, _counterpart["default"])('reply_editor.decline_payout')), /*#__PURE__*/_react["default"].createElement("option", {
        value: "75%"
      }, (0, _counterpart["default"])('reply_editor.power_up_25_75')), /*#__PURE__*/_react["default"].createElement("option", {
        value: "100%"
      }, (0, _counterpart["default"])('reply_editor.power_up_100'))))), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column"
      }, (0, _counterpart["default"])('post_advanced_settings_jsx.current_default'), ":", ' ', defaultPayoutType === '0%' ? (0, _counterpart["default"])('reply_editor.decline_payout') : (0, _counterpart["default"])('reply_editor.power_up_25_75'))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        href: '/@' + username + '/settings'
      }, (0, _counterpart["default"])('post_advanced_settings_jsx.update_default_in_settings')))), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("h4", {
        className: "column"
      }, (0, _counterpart["default"])('beneficiary_selector_jsx.header'))), /*#__PURE__*/_react["default"].createElement(_BeneficiarySelector["default"], (0, _extends2["default"])({
        category: this.props.category
      }, beneficiaries.props, {
        tabIndex: 1
      })), /*#__PURE__*/_react["default"].createElement(_PostTemplateSelector["default"], {
        username: username,
        onChange: this.handleTemplateSelected,
        templates: userTemplates
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "error"
      }, (beneficiaries.touched || beneficiaries.value) && beneficiaries.error, "\xA0"), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column"
      }, /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("button", {
        type: "submit",
        className: "button",
        disabled: disabled,
        tabIndex: 2
      }, loadingTemplate && (0, _counterpart["default"])('post_advanced_settings_jsx.load_template'), !loadingTemplate && (0, _counterpart["default"])('g.save')), loadingTemplate && /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        className: "button",
        tabIndex: 0,
        onClick: function onClick(event) {
          _this2.handleDeleteTemplate(event, postTemplateName);
        }
      }, postTemplateName && postTemplateName.indexOf('create_') === -1 && (0, _counterpart["default"])('post_advanced_settings_jsx.delete_template'))))));
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("h3", {
        className: "column"
      }, (0, _counterpart["default"])('reply_editor.advanced_settings'))), /*#__PURE__*/_react["default"].createElement("hr", null), form);
    }
  }]);
  return PostAdvancedSettings;
}(_react.Component);
(0, _defineProperty2["default"])(PostAdvancedSettings, "propTypes", {
  formId: _propTypes["default"].string.isRequired
});
var _default = exports["default"] = (0, _reactRedux.connect)(
// mapStateToProps
function (state, ownProps) {
  var formId = ownProps.formId;
  var username = state.user.getIn(['current', 'username']);
  var isStory = formId === _constants.SUBMIT_FORM_ID;
  var defaultPayoutType = state.app.getIn(['user_preferences', isStory ? 'defaultBlogPayout' : 'defaultCommentPayout'], '100%');
  var category = state.user.getIn(['current', 'post', formId, 'category']);
  var initialPayoutType = state.user.getIn(['current', 'post', formId, 'payoutType']);
  var beneficiaries = state.user.getIn(['current', 'post', formId, 'beneficiaries']);
  beneficiaries = beneficiaries ? beneficiaries.toJS() : [];
  return _objectSpread(_objectSpread({}, ownProps), {}, {
    category: category,
    fields: ['beneficiaries'],
    defaultPayoutType: defaultPayoutType,
    initialPayoutType: initialPayoutType,
    username: username,
    initialValues: {
      beneficiaries: beneficiaries
    }
  });
},
// mapDispatchToProps
function (dispatch) {
  return {
    hideAdvancedSettings: function hideAdvancedSettings() {
      return dispatch(userActions.hidePostAdvancedSettings());
    },
    setPayoutType: function setPayoutType(formId, payoutType) {
      return dispatch(userActions.set({
        key: ['current', 'post', formId, 'payoutType'],
        value: payoutType
      }));
    },
    setPostTemplateName: function setPostTemplateName(formId, postTemplateName) {
      var create = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return dispatch(userActions.set({
        key: ['current', 'post', formId, 'postTemplateName'],
        value: create ? "create_".concat(postTemplateName) : postTemplateName
      }));
    },
    setBeneficiaries: function setBeneficiaries(formId, beneficiaries) {
      return dispatch(userActions.set({
        key: ['current', 'post', formId, 'beneficiaries'],
        value: (0, _immutable.fromJS)(beneficiaries)
      }));
    }
  };
})(PostAdvancedSettings);