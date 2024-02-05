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
var _reactRedux = require("react-redux");
var transactionActions = _interopRequireWildcard(require("app/redux/TransactionReducer"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var nothingToClaim = 'No rewards pending redemption.';
var getRewardsString = function getRewardsString(account) {
  var reward_blurt = parseFloat(account.get('reward_blurt_balance').split(' ')[0]) > 0 ? account.get('reward_blurt_balance') : null;
  // const reward_hbd = parseFloat(account.get('reward_hbd_balance').split(' ')[0]) > 0 ? account.get('reward_hbd_balance') : null;
  var reward_hp = parseFloat(account.get('reward_vesting_blurt').split(' ')[0]) > 0 ? account.get('reward_vesting_blurt').replace('BLURT', 'BP') : null;
  var rewards = [];
  if (reward_blurt) rewards.push(reward_blurt);
  // if (reward_hbd) rewards.push(reward_hbd);
  if (reward_hp) rewards.push(reward_hp);
  var rewards_str;
  switch (rewards.length) {
    case 3:
      rewards_str = "".concat(rewards[0], ", ").concat(rewards[1], " and ").concat(rewards[2]);
      break;
    case 2:
      rewards_str = "".concat(rewards[0], " and ").concat(rewards[1]);
      break;
    case 1:
      rewards_str = "".concat(rewards[0]);
      break;
    default:
      rewards_str = nothingToClaim;
  }
  return rewards_str;
};
var ClaimBox = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(ClaimBox, _React$Component);
  function ClaimBox(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, ClaimBox);
    _this = _callSuper(this, ClaimBox, [props]);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "claimRewardsSuccess", function () {
      _this.setState({
        claimInProgress: false,
        claimed: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleClaimRewards", function (account) {
      _this.setState({
        claimInProgress: true
      }); // disable the claim button
      _this.props.claimRewards(account, _this.claimRewardsSuccess);
    });
    _this.state = {
      claimed: false,
      empty: props.account ? getRewardsString(props.account) !== nothingToClaim ? false : true : true,
      claimInProgress: false,
      rewards_str: props.account ? getRewardsString(props.account) : 'Loading...'
    };
    return _this;
  }
  (0, _createClass2["default"])(ClaimBox, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.account !== prevProps.account) {
        var rewards_str = this.props.account ? getRewardsString(this.props.account) : 'Loading...';
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          rewards_str: rewards_str,
          empty: rewards_str == nothingToClaim
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var account = this.props.account;
      var rewards_str = this.state.rewards_str;
      if (!account) return null;
      if (this.state.empty) return null;
      if (this.state.claimed) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "UserWallet__claimbox"
        }, /*#__PURE__*/_react["default"].createElement("strong", null, "Claim successful."));
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "UserWallet__claimbox"
      }, /*#__PURE__*/_react["default"].createElement("strong", null, "Unclaimed rewards:", rewards_str), /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        disabled: this.state.claimInProgress,
        className: "button",
        onClick: function onClick(e) {
          e.preventDefault();
          _this2.handleClaimRewards(account);
        }
      }, "Redeem"));
    }
  }]);
  return ClaimBox;
}(_react["default"].Component);
var mapStateToProps = function mapStateToProps(state, ownProps) {
  var accountName = ownProps.accountName;
  var currentUser = state.user.get('current');
  var account = state.global.getIn(['accounts', accountName]);
  var isOwnAccount = state.user.getIn(['current', 'username'], '') == accountName;
  return {
    account: account,
    currentUser: currentUser,
    isOwnAccount: isOwnAccount
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    claimRewards: function claimRewards(account, successCB) {
      var username = account.get('name');
      var successCallback = function successCallback() {
        // TODO: do something here...
        successCB();
      };
      var operation = {
        account: username,
        reward_blurt: account.get('reward_blurt_balance'),
        // reward_hbd: account.get('reward_hbd_balance'),
        reward_vests: account.get('reward_vesting_balance')
      };
      dispatch(transactionActions.broadcastOperation({
        type: 'claim_reward_balance',
        operation: operation,
        successCallback: successCallback,
        errorCallback: function errorCallback(errorKey) {
          console.log('Transaction Error:' + errorKey);
        }
      }));
    }
  };
};
var _default = exports["default"] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ClaimBox);