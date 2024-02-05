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
var _reactDom = _interopRequireDefault(require("react-dom"));
var transactionActions = _interopRequireWildcard(require("app/redux/TransactionReducer"));
var globalActions = _interopRequireWildcard(require("app/redux/GlobalReducer"));
var _LoadingIndicator = _interopRequireDefault(require("app/components/elements/LoadingIndicator"));
var _client_config = require("app/client_config");
var _counterpart = _interopRequireDefault(require("counterpart"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var PromotePost = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(PromotePost, _Component);
  function PromotePost(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, PromotePost);
    _this = _callSuper(this, PromotePost, [props]);
    _this.state = {
      amount: '1.0',
      asset: '',
      loading: false,
      amountError: '',
      trxError: ''
    };
    _this.onSubmit = _this.onSubmit.bind((0, _assertThisInitialized2["default"])(_this));
    _this.errorCallback = _this.errorCallback.bind((0, _assertThisInitialized2["default"])(_this));
    _this.amountChange = _this.amountChange.bind((0, _assertThisInitialized2["default"])(_this));
    // this.assetChange = this.assetChange.bind(this);
    return _this;
  }
  (0, _createClass2["default"])(PromotePost, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      setTimeout(function () {
        _reactDom["default"].findDOMNode(_this2.refs.amount).focus();
      }, 300);
    }
  }, {
    key: "errorCallback",
    value: function errorCallback(estr) {
      this.setState({
        trxError: estr,
        loading: false
      });
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(e) {
      e.preventDefault();
      var _this$props = this.props,
        author = _this$props.author,
        permlink = _this$props.permlink,
        onClose = _this$props.onClose;
      var amount = this.state.amount;
      this.setState({
        loading: true
      });
      console.log('-- PromotePost.onSubmit -->');
      this.props.dispatchSubmit({
        amount: amount,
        asset: _client_config.DEBT_TICKER,
        author: author,
        permlink: permlink,
        onClose: onClose,
        currentUser: this.props.currentUser,
        errorCallback: this.errorCallback
      });
    }
  }, {
    key: "amountChange",
    value: function amountChange(e) {
      var amount = e.target.value;
      // console.log('-- PromotePost.amountChange -->', amount);
      this.setState({
        amount: amount
      });
    }

    // assetChange(e) {
    //     const asset = e.target.value;
    //     console.log('-- PromotePost.assetChange -->', e.target.value);
    //     this.setState({asset});
    // }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$state = this.state,
        amount = _this$state.amount,
        loading = _this$state.loading,
        amountError = _this$state.amountError,
        trxError = _this$state.trxError;
      var currentAccount = this.props.currentAccount;
      var balanceValue = currentAccount.get('balance');
      var balance = balanceValue ? balanceValue.split(' ')[0] : 0.0;
      var submitDisabled = !amount;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "PromotePost row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column small-12"
      }, /*#__PURE__*/_react["default"].createElement("form", {
        onSubmit: this.onSubmit,
        onChange: function onChange() {
          return _this3.setState({
            trxError: ''
          });
        }
      }, /*#__PURE__*/_react["default"].createElement("h4", null, (0, _counterpart["default"])('promote_post_jsx.promote_post')), /*#__PURE__*/_react["default"].createElement("p", null, (0, _counterpart["default"])('promote_post_jsx.spend_your_DEBT_TOKEN_to_advertise_this_post', {
        DEBT_TOKEN: _client_config.DEBT_TOKEN
      }), "."), /*#__PURE__*/_react["default"].createElement("hr", null), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column small-7 medium-5 large-4"
      }, /*#__PURE__*/_react["default"].createElement("label", null, (0, _counterpart["default"])('g.amount')), /*#__PURE__*/_react["default"].createElement("div", {
        className: "input-group"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        className: "input-group-field",
        type: "text",
        placeholder: (0, _counterpart["default"])('g.amount'),
        value: amount,
        ref: "amount",
        autoComplete: "off",
        disabled: loading,
        onChange: this.amountChange
      }), /*#__PURE__*/_react["default"].createElement("span", {
        className: "input-group-label"
      }, _client_config.DEBT_TOKEN_SHORT + ' ', " (", _client_config.CURRENCY_SIGN, ")"), /*#__PURE__*/_react["default"].createElement("div", {
        className: "error"
      }, amountError)))), /*#__PURE__*/_react["default"].createElement("div", null, (0, _counterpart["default"])('g.balance', {
        balanceValue: "".concat(balance, " ").concat(_client_config.DEBT_TOKEN_SHORT, " (").concat(_client_config.CURRENCY_SIGN, ")")
      })), /*#__PURE__*/_react["default"].createElement("br", null), loading && /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_LoadingIndicator["default"], {
        type: "circle"
      }), /*#__PURE__*/_react["default"].createElement("br", null)), !loading && /*#__PURE__*/_react["default"].createElement("span", null, trxError && /*#__PURE__*/_react["default"].createElement("div", {
        className: "error"
      }, trxError), /*#__PURE__*/_react["default"].createElement("button", {
        type: "submit",
        className: "button",
        disabled: submitDisabled
      }, (0, _counterpart["default"])('g.promote'))))));
    }
  }]);
  return PromotePost;
}(_react.Component); // const AssetBalance = ({onClick, balanceValue}) =>
//     <a onClick={onClick} style={{borderBottom: '#A09F9F 1px dotted', cursor: 'pointer'}}>Balance: {balanceValue}</a>
(0, _defineProperty2["default"])(PromotePost, "propTypes", {
  author: _propTypes["default"].string.isRequired,
  permlink: _propTypes["default"].string.isRequired
});
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, ownProps) {
  var currentUser = state.user.getIn(['current']);
  var currentAccount = state.global.getIn(['accounts', currentUser.get('username')]);
  return _objectSpread(_objectSpread({}, ownProps), {}, {
    currentAccount: currentAccount,
    currentUser: currentUser
  });
},
// mapDispatchToProps
function (dispatch) {
  return {
    dispatchSubmit: function dispatchSubmit(_ref) {
      var amount = _ref.amount,
        asset = _ref.asset,
        author = _ref.author,
        permlink = _ref.permlink,
        currentUser = _ref.currentUser,
        onClose = _ref.onClose,
        errorCallback = _ref.errorCallback;
      var username = currentUser.get('username');
      alert('Promoted posts are currently disabled');
      //window.location.replace($STM_config.wallet_url + `/transfer?to=null&memo=@${author}/${permlink}&amount=`+parseFloat(amount, 10).toFixed(3) + ' ' + asset)

      var operation = {
        from: username,
        to: 'null',
        amount: parseFloat(amount, 10).toFixed(3) + ' ' + asset,
        memo: "@".concat(author, "/").concat(permlink),
        __config: {
          successMessage: (0, _counterpart["default"])('promote_post_jsx.you_successfully_promoted_this_post') + '.'
        }
      };
    }
  };
})(PromotePost);