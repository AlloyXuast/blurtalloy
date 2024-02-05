"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
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
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var transactionActions = _interopRequireWildcard(require("app/redux/TransactionReducer"));
var _DomUtils = require("app/utils/DomUtils");
var _counterpart = _interopRequireDefault(require("counterpart"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var ConfirmTransactionForm = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(ConfirmTransactionForm, _Component);
  function ConfirmTransactionForm() {
    var _this;
    (0, _classCallCheck2["default"])(this, ConfirmTransactionForm);
    _this = _callSuper(this, ConfirmTransactionForm);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "closeOnOutsideClick", function (e) {
      var inside_dialog = (0, _DomUtils.findParent)(e.target, 'ConfirmTransactionForm');
      if (!inside_dialog) _this.onCancel();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onCancel", function () {
      var _this$props = _this.props,
        confirmErrorCallback = _this$props.confirmErrorCallback,
        onCancel = _this$props.onCancel;
      if (confirmErrorCallback) confirmErrorCallback();
      if (onCancel) onCancel();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "okClick", function () {
      var _this$props2 = _this.props,
        okClick = _this$props2.okClick,
        confirmBroadcastOperation = _this$props2.confirmBroadcastOperation;
      okClick(confirmBroadcastOperation);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onCheckbox", function (e) {
      var checkboxChecked = e.target.checked;
      _this.setState({
        checkboxChecked: checkboxChecked
      });
    });
    _this.state = {
      checkboxChecked: false
    };
    return _this;
  }
  (0, _createClass2["default"])(ConfirmTransactionForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.body.addEventListener('click', this.closeOnOutsideClick);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.body.removeEventListener('click', this.closeOnOutsideClick);
    }
  }, {
    key: "render",
    value: function render() {
      var onCancel = this.onCancel,
        okClick = this.okClick,
        onCheckbox = this.onCheckbox;
      var _this$props3 = this.props,
        confirm = _this$props3.confirm,
        confirmBroadcastOperation = _this$props3.confirmBroadcastOperation,
        warning = _this$props3.warning,
        checkbox = _this$props3.checkbox;
      var checkboxChecked = this.state.checkboxChecked;
      var conf = typeof confirm === 'function' ? confirm() : confirm;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "ConfirmTransactionForm"
      }, /*#__PURE__*/_react["default"].createElement("h4", null, typeName(confirmBroadcastOperation)), /*#__PURE__*/_react["default"].createElement("hr", null), /*#__PURE__*/_react["default"].createElement("div", null, conf), warning ? /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          paddingTop: 10,
          fontWeight: 'bold'
        },
        className: "error"
      }, warning) : null, checkbox ? /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
        htmlFor: "checkbox"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        id: "checkbox",
        type: "checkbox",
        checked: checkboxChecked,
        onChange: this.onCheckbox
      }), checkbox)) : null, /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("button", {
        className: "button",
        onClick: okClick,
        disabled: !(checkbox === undefined || checkboxChecked)
      }, (0, _counterpart["default"])('g.ok')), /*#__PURE__*/_react["default"].createElement("button", {
        type: "button hollow",
        className: "button hollow",
        onClick: onCancel
      }, (0, _counterpart["default"])('g.cancel')));
    }
  }]);
  return ConfirmTransactionForm;
}(_react.Component);
(0, _defineProperty2["default"])(ConfirmTransactionForm, "propTypes", {
  //Steemit
  onCancel: _propTypes["default"].func,
  warning: _propTypes["default"].string,
  checkbox: _propTypes["default"].string,
  // redux-form
  confirm: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  confirmBroadcastOperation: _propTypes["default"].object,
  confirmErrorCallback: _propTypes["default"].func,
  okClick: _propTypes["default"].func
});
var typeName = function typeName(confirmBroadcastOperation) {
  var title = confirmBroadcastOperation.getIn(['operation', '__config', 'title']);
  if (title) return title;
  var type = confirmBroadcastOperation.get('type');
  return (0, _counterpart["default"])('confirmtransactionform_jsx.confirm', {
    transactionType: type.split('_').map(function (n) {
      return n.charAt(0).toUpperCase() + n.substring(1);
    }).join(' ') // @todo we should translate each potential transaction type!
  });
};
var _default = exports["default"] = (0, _reactRedux.connect)(
// mapStateToProps
function (state) {
  var confirmBroadcastOperation = state.transaction.get('confirmBroadcastOperation');
  var confirmErrorCallback = state.transaction.get('confirmErrorCallback');
  var confirm = state.transaction.get('confirm');
  var warning = state.transaction.get('warning');
  var checkbox = state.transaction.get('checkbox');
  return {
    confirmBroadcastOperation: confirmBroadcastOperation,
    confirmErrorCallback: confirmErrorCallback,
    confirm: confirm,
    warning: warning,
    checkbox: checkbox
  };
},
// mapDispatchToProps
function (dispatch) {
  return {
    okClick: function okClick(confirmBroadcastOperation) {
      dispatch(transactionActions.hideConfirm());
      dispatch(transactionActions.broadcastOperation(_objectSpread({}, confirmBroadcastOperation.toJS())));
    }
  };
})(ConfirmTransactionForm);