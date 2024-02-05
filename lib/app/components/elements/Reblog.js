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
var _shouldComponentUpdate = _interopRequireDefault(require("app/utils/shouldComponentUpdate"));
var transactionActions = _interopRequireWildcard(require("app/redux/TransactionReducer"));
var _Icon = _interopRequireDefault(require("app/components/elements/Icon"));
var _counterpart = _interopRequireDefault(require("counterpart"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* eslint-disable import/no-import-module-exports */ // import LoadingIndicator from 'app/components/elements/LoadingIndicator';
var string = _propTypes["default"].string,
  func = _propTypes["default"].func;
var Reblog = exports["default"] = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Reblog, _React$Component);
  function Reblog(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, Reblog);
    _this = _callSuper(this, Reblog, [props]);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "reblog", function (e) {
      e.preventDefault();
      if (_this.state.active) return;
      _this.setState({
        loading: true
      });
      var _this$props = _this.props,
        reblog = _this$props.reblog,
        account = _this$props.account,
        author = _this$props.author,
        parent_author = _this$props.parent_author,
        permlink = _this$props.permlink,
        bandwidth_kbytes_fee = _this$props.bandwidth_kbytes_fee,
        operation_flat_fee = _this$props.operation_flat_fee;
      reblog(account, author, permlink, operation_flat_fee, bandwidth_kbytes_fee, function () {
        _this.setState({
          active: true,
          loading: false
        });
        _this.setReblogged(account);
      }, function () {
        _this.setState({
          active: false,
          loading: false
        });
      });
    });
    _this.shouldComponentUpdate = (0, _shouldComponentUpdate["default"])((0, _assertThisInitialized2["default"])(_this), 'Reblog');
    _this.state = {
      active: false,
      loading: false
    };
    return _this;
  }
  (0, _createClass2["default"])(Reblog, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var account = this.props.account;
      if (account) {
        this.setState({
          active: this.isReblogged(account)
        });
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.account) {
        this.setState({
          active: this.isReblogged(nextProps.account)
        });
      }
    }
  }, {
    key: "isReblogged",
    value: function isReblogged(account) {
      var _this$props2 = this.props,
        author = _this$props2.author,
        permlink = _this$props2.permlink;
      return getRebloggedList(account).includes(author + '/' + permlink);
    }
  }, {
    key: "setReblogged",
    value: function setReblogged(account) {
      var _this$props3 = this.props,
        author = _this$props3.author,
        permlink = _this$props3.permlink;
      clearRebloggedCache();
      var posts = getRebloggedList(account);
      posts.push(author + '/' + permlink);
      if (posts.length > 200) posts.shift(1);
      localStorage.setItem('reblogged_' + account, JSON.stringify(posts));
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.author == this.props.account || this.props.parent_author) {
        return null;
      }
      var state = this.state.active ? 'active' : 'inactive';
      var loading = this.state.loading ? ' loading' : '';
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: 'Reblog__button Reblog__button-' + state + loading
      }, /*#__PURE__*/_react["default"].createElement("a", {
        href: "#",
        onClick: this.reblog,
        title: (0, _counterpart["default"])('g.reblog')
      }, /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
        name: "reblog"
      })));
    }
  }]);
  return Reblog;
}(_react["default"].Component);
(0, _defineProperty2["default"])(Reblog, "propTypes", {
  account: string,
  author: string,
  parent_author: string,
  permlink: string,
  reblog: func
});
module.exports = (0, _reactRedux.connect)(function (state, ownProps) {
  var account = state.user.getIn(['current', 'username']) || state.offchain.get('account');
  return _objectSpread(_objectSpread({}, ownProps), {}, {
    account: account,
    operation_flat_fee: state.global.getIn(['props', 'operation_flat_fee']),
    bandwidth_kbytes_fee: state.global.getIn(['props', 'bandwidth_kbytes_fee'])
  });
}, function (dispatch) {
  return {
    reblog: function reblog(account, author, permlink, operationFlatFee, bandwidthKbytesFee, successCallback, errorCallback) {
      var json = ['reblog', {
        account: account,
        author: author,
        permlink: permlink
      }];
      var operation = {
        id: 'follow',
        required_posting_auths: [account],
        json: JSON.stringify(json),
        __config: {
          title: (0, _counterpart["default"])('g.resteem_this_post')
        }
      };
      var size = JSON.stringify(operation).replace(/[\[\]\,\"]/g, '').length;
      var bw_fee = Math.max(0.001, (size / 1024 * bandwidthKbytesFee).toFixed(3));
      var fee = (operationFlatFee + bw_fee).toFixed(3);
      dispatch(transactionActions.broadcastOperation({
        type: 'custom_json',
        confirm: (0, _counterpart["default"])('g.operation_cost', {
          fee: fee
        }),
        operation: operation,
        successCallback: successCallback,
        errorCallback: errorCallback
      }));
    }
  };
})(Reblog);
var lastAccount;
var cachedPosts;
function getRebloggedList(account) {
  if (!process.env.BROWSER) return [];
  if (lastAccount === account) return cachedPosts;
  lastAccount = account;
  var posts = localStorage.getItem('reblogged_' + account);
  try {
    cachedPosts = JSON.parse(posts) || [];
  } catch (e) {
    cachedPosts = [];
  }
  return cachedPosts;
}
function clearRebloggedCache() {
  lastAccount = null;
}