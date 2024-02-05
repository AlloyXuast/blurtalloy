"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
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
var _reactRangeslider = _interopRequireDefault(require("react-rangeslider"));
var _counterpart = _interopRequireDefault(require("counterpart"));
var _CloseButton = _interopRequireDefault(require("app/components/elements/CloseButton"));
var transactionActions = _interopRequireWildcard(require("app/redux/TransactionReducer"));
var _Icon = _interopRequireDefault(require("app/components/elements/Icon"));
var _immutable = require("immutable");
var _FormattedAsset = _interopRequireDefault(require("app/components/elements/FormattedAsset"));
var _shouldComponentUpdate = _interopRequireDefault(require("app/utils/shouldComponentUpdate"));
var _ParsersAndFormatters = require("app/utils/ParsersAndFormatters");
var _DropdownMenu = _interopRequireDefault(require("app/components/elements/DropdownMenu"));
var _TimeAgoWrapper = _interopRequireDefault(require("app/components/elements/TimeAgoWrapper"));
var _Dropdown = _interopRequireDefault(require("app/components/elements/Dropdown"));
var _blurtjs = require("@blurtfoundation/blurtjs");
var _VotersListReveal = _interopRequireDefault(require("./VotersListReveal"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* eslint-disable no-useless-escape */ /* eslint-disable arrow-parens */ /* eslint-disable no-mixed-operators */
var MAX_VOTES_DISPLAY = 150;
var VOTE_WEIGHT_DROPDOWN_THRESHOLD = 50; // if BP is more than 50, enable the slider
var MAX_WEIGHT = 10000;
var Voting = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Voting, _React$Component);
  function Voting(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, Voting);
    _this = _callSuper(this, Voting, [props]);
    // eslint-disable-next-line react/sort-comp
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "calculateVotingPower", function (current_account) {
      var BLURT_VOTING_MANA_REGENERATION_SECONDS = _this.props.BLURT_VOTING_MANA_REGENERATION_SECONDS;
      var voting_manabar = null;
      if (!voting_manabar) {
        voting_manabar = current_account ? current_account.voting_manabar : 0;
      }
      var current_mana = parseInt(voting_manabar ? voting_manabar.current_mana : 0);
      var last_update_time = voting_manabar ? voting_manabar.last_update_time : 0;
      var vesting_shares = 0.0;
      if (!vesting_shares) {
        vesting_shares = current_account ? Number(current_account.vesting_shares.split(' ')[0]) : 0.0;
      }
      var delegated_vesting_shares = 0.0;
      if (!delegated_vesting_shares) {
        delegated_vesting_shares = current_account ? Number(current_account.delegated_vesting_shares.split(' ')[0]) : 0.0;
      }
      var vesting_withdraw_rate = 0.0;
      if (!vesting_withdraw_rate) {
        vesting_withdraw_rate = current_account ? current_account.vesting_withdraw_rate ? current_account.vesting_withdraw_rate.split(' ')[0] : 0.0 : 0.0;
      }
      var received_vesting_shares = 0.0;
      if (!received_vesting_shares) {
        received_vesting_shares = current_account ? Number(current_account.received_vesting_shares.split(' ')[0]) : 0.0;
      }
      var net_vesting_shares = vesting_shares - delegated_vesting_shares + received_vesting_shares;
      var maxMana = (net_vesting_shares - Number(vesting_withdraw_rate)) * 1000000;
      var now = Math.round(Date.now() / 1000);
      var elapsed = now - last_update_time;
      var regenerated_mana = elapsed * maxMana / BLURT_VOTING_MANA_REGENERATION_SECONDS;
      var currentMana = current_mana;
      currentMana += regenerated_mana;
      if (currentMana >= maxMana) {
        currentMana = maxMana;
      }
      var updatedPower = currentMana * 100 / maxMana;
      if (localStorage) {
        localStorage.setItem('updated-account', JSON.stringify(current_account));
        localStorage.setItem('current-voting-power', updatedPower);
      }
      var updateVotingPower = currentMana * 100 / maxMana;
      _this.setState({
        updatedVotingPower: updateVotingPower,
        voting_manabar_updated: voting_manabar,
        delegated_vesting_shares_updated: delegated_vesting_shares,
        vesting_shares_updated: vesting_shares,
        received_vesting_shares_updated: received_vesting_shares,
        vesting_withdraw_rate_updated: vesting_withdraw_rate,
        mana_updated: current_mana,
        last_update_time_updated: last_update_time
      });
    });
    _this.state = {
      showWeight: false,
      myVote: null,
      sliderWeight: {
        up: MAX_WEIGHT,
        down: MAX_WEIGHT
      },
      voting_bar: null,
      mana_updated: null,
      showVotersListModal: false,
      updatedVotingPower: 100
    };
    _this.voteUp = function (e) {
      e && e.preventDefault();
      _this.voteUpOrDown(true);
    };
    _this.voteDown = function (e) {
      e && e.preventDefault();
      _this.voteUpOrDown(false);
    };
    _this.voteUpOrDown = function (up) {
      if (_this.props.voting) return;
      _this.setState({
        votingUp: up
      });
      if (_this.state.showWeight) _this.setState({
        showWeight: false
      });
      var myVote = _this.state.myVote;
      var _this$props = _this.props,
        author = _this$props.author,
        permlink = _this$props.permlink,
        username = _this$props.username,
        is_comment = _this$props.is_comment;
      var weight;
      if (myVote > 0 || myVote < 0) {
        // if there is a current vote, we're clearing it
        weight = 0;
      } else if (_this.props.enable_slider) {
        // if slider is enabled, read its value
        weight = up ? _this.state.sliderWeight.up : -_this.state.sliderWeight.down;
      } else {
        // otherwise, use max power
        weight = up ? MAX_WEIGHT : -MAX_WEIGHT;
      }
      var isFlag = up ? null : true;
      _this.props.vote(weight, {
        author: author,
        permlink: permlink,
        username: username,
        myVote: myVote,
        isFlag: isFlag
      });
    };
    _this.handleWeightChange = function (up) {
      return function (weight) {
        var sliderWeight = _this.state.sliderWeight;
        var w;
        if (up) {
          w = {
            up: weight,
            down: sliderWeight.down
          };
        } else {
          w = {
            up: sliderWeight.up,
            down: weight
          };
        }
        var _this$props2 = _this.props,
          username = _this$props2.username,
          is_comment = _this$props2.is_comment;
        localStorage.setItem('voteWeight' + (up ? '' : 'Down') + '-' + username + (is_comment ? '-comment' : ''), weight);
        _this.setState({
          sliderWeight: w
        });
      };
    };
    _this.handleVotersListModalHide = function () {
      _this.setState({
        showVotersListModal: false
      });
    };
    _this.handleVotersListModalShow = function () {
      _this.setState({
        showVotersListModal: true
      });
    };
    _this.storeSliderWeight = function (up) {
      return function () {
        var _this$props3 = _this.props,
          username = _this$props3.username,
          is_comment = _this$props3.is_comment;
        var sliderWeight = _this.state.sliderWeight;
        var weight = up ? sliderWeight.up : sliderWeight.down;
        localStorage.setItem('voteWeight' + (up ? '' : 'Down') + '-' + username + (is_comment ? '-comment' : ''), weight);
      };
    };
    _this.readSliderWeight = function () {
      var _this$props4 = _this.props,
        username = _this$props4.username,
        enable_slider = _this$props4.enable_slider,
        is_comment = _this$props4.is_comment;
      if (enable_slider) {
        var sliderWeightUp = Number(localStorage.getItem('voteWeight' + '-' + username + (is_comment ? '-comment' : '')));
        var sliderWeightDown = Number(localStorage.getItem('voteWeight' + 'Down' + '-' + username + (is_comment ? '-comment' : '')));
        _this.setState({
          sliderWeight: {
            up: sliderWeightUp || MAX_WEIGHT,
            down: sliderWeightDown || MAX_WEIGHT
          }
        });
      }
    };
    _this.toggleWeightUp = function (e) {
      e.preventDefault();
      _this.toggleWeightUpOrDown(true);
    };
    _this.toggleWeightDown = function (e) {
      e && e.preventDefault();
      _this.toggleWeightUpOrDown(false);
    };
    _this.toggleWeightUpOrDown = function (up) {
      _this.setState({
        showWeight: !_this.state.showWeight,
        showWeightDir: up ? 'up' : 'down'
      });
    };
    _this.shouldComponentUpdate = (0, _shouldComponentUpdate["default"])((0, _assertThisInitialized2["default"])(_this), 'Voting');
    return _this;
  }
  (0, _createClass2["default"])(Voting, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this$props5 = this.props,
        username = _this$props5.username,
        active_votes = _this$props5.active_votes;
      this.checkMyVote(username, active_votes);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      var username = this.props.username;
      if (username) {
        var currentAccountfromLocal = JSON.parse(localStorage.getItem('updated-account'));
        if (currentAccountfromLocal) {
          this.calculateVotingPower(currentAccountfromLocal);
          this.powerUpdateInterval = setInterval(function () {
            _this2.calculateVotingPower(currentAccountfromLocal);
          }, 30000);
        } else {
          this.getVotingManabar(username);
        }
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var username = nextProps.username,
        active_votes = nextProps.active_votes;
      if (active_votes != this.props.active_votes) {
        this.checkMyVote(username, active_votes);
        if (username) {
          var currentAccountfromLocal = JSON.parse(localStorage.getItem('updated-account'));
          if (currentAccountfromLocal) {
            this.calculateVotingPower(currentAccountfromLocal);
          } else {
            this.getVotingManabar(username);
          }
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevstate) {
      var currentTime = Date.parse(new Date()) / 1000;
      var timePassedSinceLastUpdate = prevstate.last_update_time_updated ? currentTime - prevstate.last_update_time_updated : 0;
      var username = prevProps.username,
        active_votes = prevProps.active_votes;
      if (this.props.active_votes != active_votes) {
        this.checkMyVote(username, active_votes);
        if (username) {
          var currentAccountfromLocal = JSON.parse(localStorage.getItem('updated-account'));
          if (currentAccountfromLocal) {
            this.calculateVotingPower(currentAccountfromLocal);
          } else {
            this.getVotingManabar(username);
          }
        }
      }
      // else if(timePassedSinceLastUpdate > 40) {
      //   console.log('greater than 10 sec', prevstate.last_update_time_updated);
      //   const currentAccountfromLocal = JSON.parse(
      //     localStorage.getItem('updated-account')
      //   )
      //   if (currentAccountfromLocal) {
      //     this.calculateVotingPower(currentAccountfromLocal)
      //   } else {
      //     this.getVotingManabar(username)
      //   }
      // }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.powerUpdateInterval) clearInterval(this.powerUpdateInterval);
    }
  }, {
    key: "checkMyVote",
    value: function checkMyVote(username, active_votes) {
      if (username && active_votes) {
        var vote = active_votes.find(function (el) {
          return el.get('voter') === username;
        });
        // weight warning, the API may send a string or a number (when zero)
        if (vote) {
          var my_vote = null;
          var has_rshares = vote.get('rshares') !== undefined;
          var has_percent = vote.get('percent') !== undefined;
          if (has_rshares && !has_percent) {
            my_vote = parseInt(vote.get('rshares'), 10);
          } else if (!has_rshares && has_percent) {
            my_vote = vote.get('percent');
          } else if (has_rshares && has_percent) {
            my_vote = parseInt(vote.get('percent') || 0, 10);
          }
          this.setState({
            myVote: my_vote
          });
        }
      }
    }
  }, {
    key: "getVotingManabar",
    value: function getVotingManabar(username) {
      var _this3 = this;
      if (username) {
        _blurtjs.api.getAccounts([username], function (err, response) {
          var accountUpdated = response[0];
          if (accountUpdated) {
            _this3.calculateVotingPower(accountUpdated);
          }
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;
      var _this$props6 = this.props,
        active_votes = _this$props6.active_votes,
        showList = _this$props6.showList,
        voting = _this$props6.voting,
        enable_slider = _this$props6.enable_slider,
        is_comment = _this$props6.is_comment,
        post_obj = _this$props6.post_obj,
        current_account = _this$props6.current_account,
        operationFlatFee = _this$props6.operationFlatFee,
        bandwidthKbytesFee = _this$props6.bandwidthKbytesFee,
        username = _this$props6.username,
        author = _this$props6.author,
        permlink = _this$props6.permlink,
        blacklist = _this$props6.blacklist,
        rewardBalance = _this$props6.rewardBalance,
        recentClaims = _this$props6.recentClaims,
        contentConstant = _this$props6.contentConstant,
        currentSupply = _this$props6.currentSupply,
        vestedBlurt = _this$props6.vestedBlurt,
        vote_power_reserve_rate = _this$props6.vote_power_reserve_rate,
        BLURT_100_PERCENT = _this$props6.BLURT_100_PERCENT,
        BLURT_UPVOTE_LOCKOUT_SECONDS = _this$props6.BLURT_UPVOTE_LOCKOUT_SECONDS,
        BLURT_VOTING_MANA_REGENERATION_SECONDS = _this$props6.BLURT_VOTING_MANA_REGENERATION_SECONDS,
        coalStatus = _this$props6.coalStatus;
      var _this$state = this.state,
        voting_manabar_updated = _this$state.voting_manabar_updated,
        vesting_shares_updated = _this$state.vesting_shares_updated,
        delegated_vesting_shares_updated = _this$state.delegated_vesting_shares_updated,
        vesting_withdraw_rate_updated = _this$state.vesting_withdraw_rate_updated,
        received_vesting_shares_updated = _this$state.received_vesting_shares_updated,
        mana_updated = _this$state.mana_updated,
        last_update_time_updated = _this$state.last_update_time_updated,
        updatedVotingPower = _this$state.updatedVotingPower;
      var voting_manabar = null;
      if (!voting_manabar_updated && !voting_manabar) {
        voting_manabar = current_account ? current_account.get('voting_manabar') : 0;
      } else if (voting_manabar_updated) {
        voting_manabar = (0, _immutable.fromJS)(voting_manabar_updated);
      }
      var current_mana = parseInt(voting_manabar ? voting_manabar.get('current_mana') : 0);
      current_mana = parseInt(mana_updated || current_mana);
      var last_update_time = voting_manabar ? voting_manabar.get('last_update_time') : 0;
      last_update_time = last_update_time_updated || last_update_time;
      var vesting_shares = 0.0;
      if (!vesting_shares_updated && !vesting_shares) {
        vesting_shares = current_account ? current_account.get('vesting_shares') : 0.0;
      } else if (vesting_shares_updated) {
        vesting_shares = vesting_shares_updated;
      }
      var delegated_vesting_shares = 0.0;
      if (!delegated_vesting_shares_updated && !delegated_vesting_shares) {
        delegated_vesting_shares = current_account ? current_account.get('delegated_vesting_shares') : 0.0;
      } else if (delegated_vesting_shares_updated) {
        delegated_vesting_shares = delegated_vesting_shares_updated;
      }
      var vesting_withdraw_rate = 0.0;
      if (!vesting_withdraw_rate_updated && !vesting_withdraw_rate) {
        vesting_withdraw_rate = current_account ? current_account.get('vesting_withdraw_rate') ? current_account.get('vesting_withdraw_rate').split(' ')[0] : 0.0 : 0.0;
      } else if (vesting_withdraw_rate_updated) {
        vesting_withdraw_rate = vesting_withdraw_rate_updated;
      }
      var received_vesting_shares = 0.0;
      if (!received_vesting_shares_updated && !received_vesting_shares) {
        received_vesting_shares = current_account ? current_account.get('received_vesting_shares') : 0.0;
      } else if (received_vesting_shares_updated) {
        received_vesting_shares = received_vesting_shares_updated;
      }
      var net_vesting_shares = vesting_shares - delegated_vesting_shares + received_vesting_shares;
      var maxMana = (net_vesting_shares - Number(vesting_withdraw_rate)) * 1000000;
      var now = Math.round(Date.now() / 1000);
      var elapsed = now - last_update_time;
      var regenerated_mana = elapsed * maxMana / BLURT_VOTING_MANA_REGENERATION_SECONDS;
      var currentMana = current_mana;
      currentMana += regenerated_mana;
      if (currentMana >= maxMana) {
        currentMana = maxMana;
      }
      var currentVp = currentMana * 100 / maxMana;
      var operation = {
        voter: username,
        author: author,
        permlink: permlink,
        weight: 10000
      };
      var size = JSON.stringify(operation).replace(/[\[\]\,\"]/g, '').length;
      var bw_fee = Math.max(0.001, (size / 1024 * bandwidthKbytesFee).toFixed(3));
      var fee = (operationFlatFee + bw_fee).toFixed(3);
      var postRshares = parseInt(post_obj.get('net_rshares'));
      var S = parseInt(contentConstant);
      var cashoutTime = post_obj.get('payout_at') ? post_obj.get('payout_at') : post_obj.get('last_payout');
      var cashoutDelta = parseInt((Date.parse(cashoutTime) - new Date()) / 1000);
      var ratio = vestedBlurt / currentSupply;
      var getVoteValue = function getVoteValue(voteWeight) {
        if (cashoutDelta <= 0) {
          return 0;
        }
        var usedMana = current_mana * (voteWeight * 100) * 60 * 60 * 24 / BLURT_100_PERCENT;
        var maxVoteDenom = vote_power_reserve_rate * BLURT_VOTING_MANA_REGENERATION_SECONDS;
        usedMana = (usedMana + maxVoteDenom - 1) / maxVoteDenom;
        var rshares = parseInt(usedMana);
        if (cashoutDelta < BLURT_UPVOTE_LOCKOUT_SECONDS) {
          rshares = parseInt(rshares * cashoutDelta / BLURT_UPVOTE_LOCKOUT_SECONDS);
        }
        var totalRshares = rshares + postRshares;
        var claims = parseInt(totalRshares * (totalRshares + 2 * S) / (totalRshares + 4 * S));
        var rewards = rewardBalance / recentClaims;
        var postValue = claims * rewards * ratio;
        return postValue * (rshares / totalRshares);
      };
      var _this$state2 = this.state,
        votingUp = _this$state2.votingUp,
        showWeight = _this$state2.showWeight,
        showWeightDir = _this$state2.showWeightDir,
        myVote = _this$state2.myVote;
      var votingUpActive = voting && votingUp;
      var voteValue = getVoteValue(this.state.sliderWeight.up / 100);
      var slider = function slider(up) {
        var b = up ? _this4.state.sliderWeight.up : _this4.state.sliderWeight.down;
        var s = up ? '' : '-';
        return /*#__PURE__*/_react["default"].createElement("span", {
          style: {
            display: 'inline-block'
          }
        }, /*#__PURE__*/_react["default"].createElement("div", {
          id: "btn_group"
        }, /*#__PURE__*/_react["default"].createElement("button", {
          id: "weight-10",
          onClick: _this4.handleButtonWeightChange(up, 1000)
        }, ' ', "10%", ' '), /*#__PURE__*/_react["default"].createElement("button", {
          id: "weight-25",
          onClick: _this4.handleButtonWeightChange(up, 2500)
        }, ' ', "25%", ' '), /*#__PURE__*/_react["default"].createElement("button", {
          id: "weight-50",
          onClick: _this4.handleButtonWeightChange(up, 5000)
        }, ' ', "50%", ' '), /*#__PURE__*/_react["default"].createElement("button", {
          id: "weight-75",
          onClick: _this4.handleButtonWeightChange(up, 7500)
        }, ' ', "75%", ' '), /*#__PURE__*/_react["default"].createElement("button", {
          id: "weight-100",
          onClick: _this4.handleButtonWeightChange(up, 10000)
        }, ' ', "100%", ' ')), votingUpActive ? /*#__PURE__*/_react["default"].createElement("a", {
          href: "#",
          onClick: function onClick() {
            return null;
          },
          className: "confirm_weight",
          title: (0, _counterpart["default"])('g.upvote')
        }, /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
          size: "2x",
          name: "heart"
        })) : /*#__PURE__*/_react["default"].createElement("a", {
          href: "#",
          onClick: _this4.voteUp,
          className: "confirm_weight",
          title: (0, _counterpart["default"])('g.upvote')
        }, /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
          size: "2x",
          name: "heart-outline"
        }), /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
          size: "2x",
          name: "heart"
        })), /*#__PURE__*/_react["default"].createElement("div", {
          className: "weight-display"
        }, s + b / 100, "%"), /*#__PURE__*/_react["default"].createElement(_reactRangeslider["default"], {
          min: 100,
          max: MAX_WEIGHT,
          step: 100,
          value: b,
          onChange: _this4.handleWeightChange(up),
          onChangeComplete: _this4.storeSliderWeight(up),
          tooltip: false
        }));
      };
      this.handleButtonWeightChange = function (up, weight) {
        return function (e) {
          var w;
          if (up) {
            w = {
              up: weight,
              down: _this4.state.sliderWeight.down
            };
          } else {
            w = {
              up: _this4.state.sliderWeight.up,
              down: weight
            };
          }
          _this4.setState({
            sliderWeight: w
          });
          var _this4$props = _this4.props,
            username = _this4$props.username,
            is_comment = _this4$props.is_comment;
          localStorage.setItem('voteWeight' + (up ? '' : 'Down') + '-' + username + (is_comment ? '-comment' : ''), weight);
        };
      };
      var total_votes = post_obj.getIn(['stats', 'total_votes']);
      var cashout_time = post_obj.get('payout_at') ? post_obj.get('payout_at') : post_obj.get('last_payout');
      var max_payout = (0, _ParsersAndFormatters.parsePayoutAmount)(post_obj.get('max_accepted_payout'));
      var pending_payout = (0, _ParsersAndFormatters.parsePayoutAmount)(post_obj.get('pending_payout_value'));
      // const pending_payout_sp = pending_payout / price_per_steem;

      var promoted = (0, _ParsersAndFormatters.parsePayoutAmount)(post_obj.get('promoted'));
      var total_author_payout = post_obj.get('total_payout_value') ? (0, _ParsersAndFormatters.parsePayoutAmount)(post_obj.get('total_payout_value')) : (0, _ParsersAndFormatters.parsePayoutAmount)(post_obj.get('author_payout_value'));
      var total_curator_payout = (0, _ParsersAndFormatters.parsePayoutAmount)(post_obj.get('curator_payout_value'));
      var payout = pending_payout + total_author_payout + total_curator_payout;
      if (payout < 0.0) payout = 0.0;
      if (payout > max_payout) payout = max_payout;
      var payout_limit_hit = payout >= max_payout;
      // Show pending payout amount for declined payment posts
      if (max_payout === 0) payout = pending_payout;
      var up = /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
        name: myVote ? 'heart' : 'heart-outline'
        // name={votingUpActive ? 'heart' : 'heart-outline'}
        // className="upvote"
      });
      var classUp = 'Voting__button Voting__button-up' + (myVote > 0 ? ' Voting__button--upvoted' : '') + (votingUpActive ? ' votingUp' : '');

      // There is an "active cashout" if: (a) there is a pending payout, OR (b) there is a valid cashout_time AND it's NOT a comment with 0 votes.
      var cashout_active = pending_payout > 0 || cashout_time.indexOf('1969') !== 0 && !(is_comment && total_votes == 0);
      var payoutItems = [];
      var minimumAmountForPayout = 0.02;
      var warnZeroPayout = '';
      if (pending_payout > 0 && pending_payout < minimumAmountForPayout) {
        warnZeroPayout = (0, _counterpart["default"])('voting_jsx.must_reached_minimum_payout');
      }
      if (cashout_active) {
        var payoutDate = /*#__PURE__*/_react["default"].createElement("span", null, (0, _counterpart["default"])('voting_jsx.payout'), ' ', /*#__PURE__*/_react["default"].createElement(_TimeAgoWrapper["default"], {
          date: cashout_time
        }));
        payoutItems.push({
          value: (0, _counterpart["default"])('voting_jsx.pending_payout', {
            value: (0, _ParsersAndFormatters.formatDecimal)(pending_payout).join('')
          })
        });
        if (max_payout > 0) {
          payoutItems.push({
            value: (0, _counterpart["default"])('voting_jsx.breakdown') + ': '
          });
          payoutItems.push({
            value: (0, _counterpart["default"])('voting_jsx.pending_payouts_author', {
              value: (0, _ParsersAndFormatters.formatDecimal)(pending_payout / 2).join('')
            })
          });
          payoutItems.push({
            value: (0, _counterpart["default"])('voting_jsx.pending_payouts_curators', {
              value: (0, _ParsersAndFormatters.formatDecimal)(pending_payout / 2).join('')
            })
          });
        }
        // add beneficiary info.
        var beneficiaries = post_obj.get('beneficiaries');
        if (beneficiaries.size > 0) {
          payoutItems.push({
            value: 'Beneficiaries:'
          });
          beneficiaries.forEach(function (key) {
            payoutItems.push({
              value: '- ' + key.get('account') + ': ' + (parseFloat(key.get('weight')) / 100).toFixed(2) + '%',
              link: '/@' + key.get('account')
            });
          });
        }
        payoutItems.push({
          value: payoutDate
        });
        if (warnZeroPayout !== '') {
          payoutItems.push({
            value: warnZeroPayout
          });
        }
      }
      if (max_payout == 0) {
        payoutItems.push({
          value: (0, _counterpart["default"])('voting_jsx.payout_declined')
        });
      } else if (max_payout < 1000000) {
        payoutItems.push({
          value: (0, _counterpart["default"])('voting_jsx.max_accepted_payout', {
            value: (0, _ParsersAndFormatters.formatDecimal)(max_payout).join('')
          })
        });
      }
      if (promoted > 0) {
        payoutItems.push({
          value: (0, _counterpart["default"])('voting_jsx.promotion_cost', {
            value: (0, _ParsersAndFormatters.formatDecimal)(promoted).join('')
          })
        });
      }
      // - payout instead of total_author_payout: total_author_payout can be zero with 100% beneficiary
      // - !cashout_active is needed to avoid the info is also shown for pending posts.
      if (!cashout_active && payout > 0) {
        payoutItems.push({
          value: (0, _counterpart["default"])('voting_jsx.past_payouts', {
            value: (0, _ParsersAndFormatters.formatDecimal)(total_author_payout + total_curator_payout).join('')
          })
        });
        payoutItems.push({
          value: (0, _counterpart["default"])('voting_jsx.past_payouts_author', {
            value: (0, _ParsersAndFormatters.formatDecimal)(total_author_payout).join('')
          })
        });
        payoutItems.push({
          value: (0, _counterpart["default"])('voting_jsx.past_payouts_curators', {
            value: (0, _ParsersAndFormatters.formatDecimal)(total_curator_payout).join('')
          })
        });
      }
      var payoutEl = /*#__PURE__*/_react["default"].createElement(_DropdownMenu["default"], {
        el: "div",
        items: payoutItems
      }, /*#__PURE__*/_react["default"].createElement("span", {
        style: payout_limit_hit ? {
          opacity: '0.5'
        } : {}
      }, /*#__PURE__*/_react["default"].createElement(_FormattedAsset["default"], {
        amount: payout,
        asset: "BLURT",
        classname: max_payout === 0 ? 'strikethrough' : ''
      }), payoutItems.length > 0 && /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
        name: "dropdown-arrow"
      })));
      var voters_list = null;
      if (showList && total_votes > 0 && active_votes) {
        var avotes = active_votes.toJS();
        var total_rshares = 0;
        // sum of rshares
        // eslint-disable-next-line no-plusplus
        for (var v = 0; v < avotes.length; ++v) {
          var rshares = avotes[v].rshares;
          if (rshares) {
            total_rshares += Number(rshares);
          }
        }
        avotes.sort(function (a, b) {
          var aRshares = parseInt(a.rshares);
          var bRshares = parseInt(b.rshares);
          if (isNaN(aRshares)) return 1;
          if (isNaN(bRshares)) return -1;
          return Math.abs(aRshares) > Math.abs(bRshares) ? -1 : 1;
        });
        var voters = [];
        for (var _v = 0; _v < avotes.length && voters.length < MAX_VOTES_DISPLAY;
        // eslint-disable-next-line no-plusplus
        ++_v) {
          var _avotes$_v = avotes[_v],
            percent = _avotes$_v.percent,
            voter = _avotes$_v.voter,
            _rshares = _avotes$_v.rshares;
          var sign = Math.sign(percent);
          if (sign === 0) continue;
          voters.push({
            value: "".concat(sign > 0 ? '+ ' : '- ', " ").concat(voter, ": ") + "".concat(_rshares ? "".concat((payout * _rshares / total_rshares).toFixed(3), " BLURT") : '') + "".concat(percent ? " (".concat(percent / 100, " %)") : ''),
            link: "/@".concat(voter)
          });
        }
        if (total_votes > voters.length) {
          voters.push({
            value: /*#__PURE__*/_react["default"].createElement("span", null, "\u2026", ' ', (0, _counterpart["default"])('voting_jsx.and_more', {
              count: total_votes - voters.length
            }))
          });
        }
        var votersFiltered = (0, _toConsumableArray2["default"])(new Set(voters));
        var showVotersListModal = this.state.showVotersListModal;
        voters_list = /*#__PURE__*/_react["default"].createElement("span", {
          className: "DropdownMenu"
        }, /*#__PURE__*/_react["default"].createElement("a", {
          href: "#",
          onClick: this.handleVotersListModalShow
        }, votersFiltered.length, " votes", /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
          name: "dropdown-arrow"
        })), showVotersListModal === true && /*#__PURE__*/_react["default"].createElement(_VotersListReveal["default"], {
          style: {
            width: '350px !important'
          },
          show: true,
          onHide: this.handleVotersListModalHide
        }, /*#__PURE__*/_react["default"].createElement(_CloseButton["default"], {
          onClick: this.handleVotersListModalHide
        }), /*#__PURE__*/_react["default"].createElement("h3", {
          style: {
            textAlign: 'center'
          }
        }, "Voters (", votersFiltered.length, ")"), /*#__PURE__*/_react["default"].createElement("hr", null), /*#__PURE__*/_react["default"].createElement("div", {
          className: "voters-list"
        }, /*#__PURE__*/_react["default"].createElement("ul", null, votersFiltered.map(function (voter, i) {
          return /*#__PURE__*/_react["default"].createElement("li", {
            style: {
              listStyleType: 'none'
            },
            key: i
          }, voter.link ? /*#__PURE__*/_react["default"].createElement("a", {
            href: voter.link
          }, voter.value) : /*#__PURE__*/_react["default"].createElement("span", null, voter.value));
        })), /*#__PURE__*/_react["default"].createElement("div", {
          className: "text-center"
        }, /*#__PURE__*/_react["default"].createElement("button", {
          className: "secondary button no-border",
          onClick: this.handleVotersListModalHide
        }, "Close")))));
      }
      var voteUpClick = this.voteUp;
      var dropdown = null;
      var voteChevron = votingUpActive ? up :
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      _react["default"].createElement("a", {
        href: "#",
        onClick: voteUpClick,
        title: myVote > 0 ? (0, _counterpart["default"])('g.remove_vote') : (0, _counterpart["default"])('g.upvote'),
        id: "upvote_button"
      }, up, myVote ? /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
        name: "heart-broken"
      }) : null);
      if (myVote <= 0 && enable_slider) {
        voteUpClick = this.toggleWeightUp;
        voteChevron = null;
        // Vote weight adjust
        dropdown = /*#__PURE__*/_react["default"].createElement(_Dropdown["default"], {
          show: showWeight && showWeightDir == 'up',
          onHide: function onHide() {
            return _this4.setState({
              showWeight: false
            });
          },
          onShow: function onShow() {
            _this4.setState({
              showWeight: true,
              showWeightDir: 'up'
            });
            _this4.readSliderWeight();
          },
          title: up
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "Voting__adjust_weight"
        }, slider(true), /*#__PURE__*/_react["default"].createElement(_CloseButton["default"], {
          className: "Voting__adjust_weight_close",
          onClick: function onClick() {
            return _this4.setState({
              showWeight: false
            });
          }
        }), currentVp ? /*#__PURE__*/_react["default"].createElement("div", {
          className: "voting-power-display",
          style: {
            textAlign: 'center',
            color: 'gray',
            marginTop: '10px'
          }
        }, /*#__PURE__*/_react["default"].createElement("span", {
          style: {
            display: 'inline-block'
          }
        }, voteValue.toFixed(3), ' ', "BLURT \xA0")) : '', currentVp ? /*#__PURE__*/_react["default"].createElement("div", {
          className: "voting-power-display",
          style: {
            textAlign: 'center',
            color: 'gray',
            marginTop: '15px'
          }
        }, /*#__PURE__*/_react["default"].createElement("span", {
          style: {
            "float": 'left'
          }
        }, /*#__PURE__*/_react["default"].createElement("b", {
          title: "your Voting power to vote"
        }, "VP"), "\xA0:\xA0", updatedVotingPower.toFixed(2), "%"), /*#__PURE__*/_react["default"].createElement("span", {
          style: {
            "float": 'right'
          }
        }, /*#__PURE__*/_react["default"].createElement("b", {
          title: "Transaction Fee for casting your vote"
        }, "Fee"), "\xA0:\xA0", fee, "\xA0BLURT")) : ''));
      }
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: "Voting"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "Voting__inner"
      }, (coalStatus === 'disabled' || blacklist.get(author) === undefined) && /*#__PURE__*/_react["default"].createElement("span", {
        className: classUp
      }, voteChevron, dropdown), payoutEl), voters_list);
    }
  }]);
  return Voting;
}(_react["default"].Component);
(0, _defineProperty2["default"])(Voting, "propTypes", {
  // HTML properties
  post: _propTypes["default"].string.isRequired,
  showList: _propTypes["default"].bool,
  // Redux connect properties
  vote: _propTypes["default"].func.isRequired,
  author: _propTypes["default"].string,
  // post was deleted
  permlink: _propTypes["default"].string,
  username: _propTypes["default"].string,
  is_comment: _propTypes["default"].bool,
  active_votes: _propTypes["default"].object,
  loggedin: _propTypes["default"].bool,
  post_obj: _propTypes["default"].object,
  current_account: _propTypes["default"].object,
  enable_slider: _propTypes["default"].bool,
  voting: _propTypes["default"].bool
  // price_per_blurt: PropTypes.number,
  // sbd_print_rate: PropTypes.number,
});
(0, _defineProperty2["default"])(Voting, "defaultProps", {
  showList: true
});
var _default = exports["default"] = (0, _reactRedux.connect)(
// mapStateToProps
function (state, ownProps) {
  var post = state.global.getIn(['content', ownProps.post]);
  if (!post) return ownProps;
  var author = post.get('author');
  var permlink = post.get('permlink');
  var active_votes = post.get('active_votes');
  var is_comment = post.get('parent_author') !== '';
  var current_account = state.user.get('current');
  var username = current_account ? current_account.get('username') : null;
  var vesting_shares = current_account ? current_account.get('vesting_shares') : 0.0;
  var delegated_vesting_shares = current_account ? current_account.get('delegated_vesting_shares') : 0.0;
  var received_vesting_shares = current_account ? current_account.get('received_vesting_shares') : 0.0;
  var net_vesting_shares = vesting_shares - delegated_vesting_shares + received_vesting_shares;
  var voting = state.global.get("transaction_vote_active_".concat(author, "_").concat(permlink));
  // const price_per_blurt = pricePerSteem(state);
  // const sbd_print_rate = state.global.getIn(['props', 'sbd_print_rate']);
  var recentClaims = parseInt(state.global.getIn(['reward_fund', 'recent_claims']));
  var rewardBalance = parseFloat(state.global.getIn(['reward_fund', 'reward_balance']));
  var contentConstant = state.global.getIn(['reward_fund', 'content_constant']);
  var operationFlatFee = state.global.getIn(['props', 'operation_flat_fee']);
  var bandwidthKbytesFee = state.global.getIn(['props', 'bandwidth_kbytes_fee']);
  var currentSupply = parseFloat(state.global.getIn(['props', 'current_supply']));
  var vestedBlurt = parseFloat(state.global.getIn(['props', 'total_vesting_fund_blurt']));
  var vote_power_reserve_rate = parseInt(state.global.getIn(['props', 'vote_power_reserve_rate']));
  var BLURT_100_PERCENT = state.global.getIn(['blurt_config', 'BLURT_100_PERCENT']);
  var BLURT_UPVOTE_LOCKOUT_SECONDS = state.global.getIn(['blurt_config', 'BLURT_UPVOTE_LOCKOUT_SECONDS']);
  var BLURT_VOTING_MANA_REGENERATION_SECONDS = state.global.getIn(['blurt_config', 'BLURT_VOTING_MANA_REGENERATION_SECONDS']);
  var blacklist = state.global.get('blacklist');
  var enable_slider = net_vesting_shares > VOTE_WEIGHT_DROPDOWN_THRESHOLD;
  var userPreferences = state.app.get('user_preferences').toJS();
  var coalStatus = userPreferences.coalStatus || 'enabled';
  return {
    post: ownProps.post,
    showList: ownProps.showList,
    author: author,
    permlink: permlink,
    username: username,
    active_votes: active_votes,
    enable_slider: enable_slider,
    is_comment: is_comment,
    post_obj: post,
    current_account: current_account,
    loggedin: username != null,
    voting: voting,
    operationFlatFee: operationFlatFee,
    bandwidthKbytesFee: bandwidthKbytesFee,
    blacklist: blacklist,
    recentClaims: recentClaims,
    rewardBalance: rewardBalance,
    contentConstant: contentConstant,
    currentSupply: currentSupply,
    vestedBlurt: vestedBlurt,
    vote_power_reserve_rate: vote_power_reserve_rate,
    BLURT_100_PERCENT: BLURT_100_PERCENT,
    BLURT_UPVOTE_LOCKOUT_SECONDS: BLURT_UPVOTE_LOCKOUT_SECONDS,
    BLURT_VOTING_MANA_REGENERATION_SECONDS: BLURT_VOTING_MANA_REGENERATION_SECONDS,
    coalStatus: coalStatus
    // price_per_blurt,
    // sbd_print_rate,
  };
},
// mapDispatchToProps
function (dispatch) {
  return {
    vote: function vote(weight, _ref) {
      var author = _ref.author,
        permlink = _ref.permlink,
        username = _ref.username,
        myVote = _ref.myVote,
        isFlag = _ref.isFlag;
      var confirm = function confirm() {
        if (myVote == null) return null;
        if (weight === 0) {
          return isFlag ? (0, _counterpart["default"])('voting_jsx.removing_your_vote') : (0, _counterpart["default"])('voting_jsx.removing_your_vote_will_reset_curation_rewards_for_this_post');
        } else if (weight > 0) {
          return isFlag ? (0, _counterpart["default"])('voting_jsx.changing_to_an_upvote') : (0, _counterpart["default"])('voting_jsx.changing_to_an_upvote_will_reset_curation_rewards_for_this_post');
        }
        // if (weight < 0)
        //     return isFlag
        //         ? tt('voting_jsx.changing_to_a_downvote')
        //         : tt(
        //               'voting_jsx.changing_to_a_downvote_will_reset_curation_rewards_for_this_post'
        //           );
        return null;
      };
      dispatch(transactionActions.broadcastOperation({
        type: 'vote',
        operation: {
          voter: username,
          author: author,
          permlink: permlink,
          weight: weight,
          __config: {
            title: weight < 0 ? 'Confirm Downvote' : null
          }
        },
        confirm: confirm,
        errorCallback: function errorCallback(errorKey) {
          console.log('Transaction Error:' + errorKey);
        }
      }));
    }
  };
})(Voting);