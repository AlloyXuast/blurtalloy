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
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var transactionActions = _interopRequireWildcard(require("app/redux/TransactionReducer"));
var _shouldComponentUpdate = _interopRequireDefault(require("app/utils/shouldComponentUpdate"));
var _immutable = require("immutable");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var func = _propTypes["default"].func,
  string = _propTypes["default"].string;

/** Sole consumer for a transaction error of a given type. */
var TransactionError = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(TransactionError, _React$Component);
  function TransactionError() {
    var _this;
    (0, _classCallCheck2["default"])(this, TransactionError);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, TransactionError, [].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "shouldComponentUpdate", (0, _shouldComponentUpdate["default"])((0, _assertThisInitialized2["default"])(_this), 'TransactionError'));
    return _this;
  }
  (0, _createClass2["default"])(TransactionError, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this$props = this.props,
        opType = _this$props.opType,
        addListener = _this$props.addListener;
      addListener(opType);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$props2 = this.props,
        opType = _this$props2.opType,
        removeListener = _this$props2.removeListener;
      removeListener(opType);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
        errorKey = _this$props3.errorKey,
        exception = _this$props3.exception,
        error = _this$props3.error;
      var cn = 'error callout alert';
      if (!errorKey && !exception) {
        if (!error) return /*#__PURE__*/_react["default"].createElement("span", null);
        return /*#__PURE__*/_react["default"].createElement("span", {
          className: "TransactionError"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: cn
        }, error));
      }
      var text = errorKey ? errorKey : exception;
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: "TransactionError"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: cn
      }, text));
    }
  }]);
  return TransactionError;
}(_react["default"].Component);
(0, _defineProperty2["default"])(TransactionError, "propTypes", {
  // HTML properties
  opType: string.isRequired,
  error: string,
  // additional error (optional)

  // Redux connect properties
  addListener: func.isRequired,
  removeListener: func.isRequired,
  errorKey: string,
  exception: string
});
var _default = exports["default"] = (0, _reactRedux.connect)(
// mapStateToProps
function (state, ownProps) {
  var opType = ownProps.opType;
  var error = state.transaction.getIn(['TransactionError', opType]) || (0, _immutable.Map)();
  var _error$toJS = error.toJS(),
    key = _error$toJS.key,
    exception = _error$toJS.exception;
  return _objectSpread(_objectSpread({}, ownProps), {}, {
    errorKey: key,
    exception: exception
  });
},
// mapDispatchToProps
function (dispatch) {
  return {
    addListener: function addListener(opType) {
      dispatch(transactionActions.set({
        key: ['TransactionError', opType + '_listener'],
        value: true
      }));
    },
    removeListener: function removeListener(opType) {
      dispatch(transactionActions.remove({
        key: ['TransactionError', opType]
      }));
      dispatch(transactionActions.remove({
        key: ['TransactionError', opType + '_listener']
      }));
    }
  };
})(TransactionError);