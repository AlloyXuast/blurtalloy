"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _blurtjs = require("@blurtfoundation/blurtjs");
var _AuthorSimple = _interopRequireDefault(require("./AuthorSimple"));
var _LoadingIndicator = _interopRequireDefault(require("./LoadingIndicator"));
var _Voter = _interopRequireDefault(require("./Voter"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var WitnessVoters = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(WitnessVoters, _React$Component);
  function WitnessVoters(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, WitnessVoters);
    _this = _callSuper(this, WitnessVoters, [props]);
    // this._isMounted = false;
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "checkWitness", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var author, loadWitnessVoters;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            author = _this.props.author;
            loadWitnessVoters = /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(witProps) {
                var author, batchSize, params;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      author = _this.props.author;
                      batchSize = 1000;
                      params = {
                        start: [author, ""],
                        limit: batchSize,
                        order: "by_witness_account"
                      };
                      _blurtjs.api.call('database_api.list_witness_votes', params, function (err, res) {
                        if (res) {
                          var newVoters = res.votes;
                          newVoters = newVoters.filter(function (voter) {
                            return voter.witness === author;
                          });
                          _this.setState({
                            voters: newVoters || [],
                            votersLoaded: true,
                            witnessProps: witProps,
                            isAWitness: true
                          });
                        } else {
                          _this.setState({
                            voters: [],
                            votersLoaded: true,
                            witnessProps: {},
                            isAWitness: false
                          });
                        }
                      });
                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }, _callee);
              }));
              return function loadWitnessVoters(_x) {
                return _ref2.apply(this, arguments);
              };
            }();
            _blurtjs.api.getWitnessByAccount(author, function (err, result) {
              if (result) {
                console.log(result);
                loadWitnessVoters(result);
              } else {
                _this.setState({
                  witnessProps: [],
                  isAWitness: false
                });
              }
            });
          case 3:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    })));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "loadWitnesses", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var author, params;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            author = _this.props.author;
            params = {
              start: [author, ""],
              limit: 30,
              order: "by_account_witness"
            };
            _blurtjs.api.call('database_api.list_witness_votes', params, function (err, res) {
              if (res) {
                var selectedWitnesses = res.votes;
                selectedWitnesses = selectedWitnesses.filter(function (voter) {
                  return voter.account === author;
                });
                _this.setState({
                  witnesses: selectedWitnesses || [],
                  witnessesLoaded: true
                });
              } else {
                _this.setState({
                  witnesses: [],
                  witnessesLoaded: true
                });
              }
            });
          case 3:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    })));
    _this.state = {
      voters: undefined,
      votersLoaded: false,
      witnesses: undefined,
      witnessesLoaded: undefined,
      isAWitness: false,
      witnessProps: undefined
    };
    return _this;
  }
  (0, _createClass2["default"])(WitnessVoters, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.loadWitnesses();
      this.checkWitness();
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(np, ns) {
      var _this$props = this.props,
        author = _this$props.author,
        username = _this$props.username,
        account = _this$props.account;
      var _this$state = this.state,
        votersLoaded = _this$state.votersLoaded,
        witnessesLoaded = _this$state.witnessesLoaded,
        isAWitness = _this$state.isAWitness,
        witnessProps = _this$state.witnessProps;
      return np.author !== author || np.username !== username || np.account !== account || votersLoaded !== ns.votersLoaded || witnessesLoaded !== ns.witnessesLoaded || witnessProps !== ns.witnessProps || isAWitness !== ns.isAWitness;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
        voters = _this$state2.voters,
        votersLoaded = _this$state2.votersLoaded,
        witnesses = _this$state2.witnesses,
        witnessesLoaded = _this$state2.witnessesLoaded,
        isAWitness = _this$state2.isAWitness,
        witnessProps = _this$state2.witnessProps;
      var author = this.props.author;
      return /*#__PURE__*/_react["default"].createElement("div", null, !witnessesLoaded ? /*#__PURE__*/_react["default"].createElement("center", null, /*#__PURE__*/_react["default"].createElement(_LoadingIndicator["default"], {
        type: "circle"
      })) : /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "columns small-12 large-12"
      }, /*#__PURE__*/_react["default"].createElement("h3", null, "Witnesses voted by ", author, " (", witnesses.length, ")"), /*#__PURE__*/_react["default"].createElement("hr", null), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, witnesses.map(function (voter, index) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "column small-6 large-4",
          key: "Witness-".concat(index)
        }, /*#__PURE__*/_react["default"].createElement(_AuthorSimple["default"], {
          author: voter.witness
        }));
      })))), /*#__PURE__*/_react["default"].createElement("br", null), isAWitness && votersLoaded && /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "columns"
      }, /*#__PURE__*/_react["default"].createElement("h3", null, "@", author, " Witness Info"), /*#__PURE__*/_react["default"].createElement("table", {
        className: "hover stack"
      }, /*#__PURE__*/_react["default"].createElement("tbody", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement("b", null, "Witness Since")), /*#__PURE__*/_react["default"].createElement("td", null, new Date(witnessProps.created).toLocaleString())), /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement("b", null, "Approved Power")), /*#__PURE__*/_react["default"].createElement("td", null, (witnessProps.votes / (100000 * 100000)).toFixed() / 100 + 'M')), /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement("b", null, "Account Creation Fee")), /*#__PURE__*/_react["default"].createElement("td", null, witnessProps.props.account_creation_fee)), /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement("b", null, "Operation Flat Fee")), /*#__PURE__*/_react["default"].createElement("td", null, witnessProps.props.operation_flat_fee)), /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement("b", null, "Proposal Fee")), /*#__PURE__*/_react["default"].createElement("td", null, witnessProps.props.proposal_fee)), /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement("b", null, "BW KB Fee")), /*#__PURE__*/_react["default"].createElement("td", null, witnessProps.props.bandwidth_kbytes_fee)), /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement("b", null, "Version")), /*#__PURE__*/_react["default"].createElement("td", null, witnessProps.running_version)), /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement("b", null, "HF Vote Version")), /*#__PURE__*/_react["default"].createElement("td", null, witnessProps.hardfork_version_vote)), /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement("b", null, "Signing Key(Public)")), /*#__PURE__*/_react["default"].createElement("td", null, witnessProps.signing_key)), /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement("b", null, "Missed Blocks")), /*#__PURE__*/_react["default"].createElement("td", null, witnessProps.total_missed)), witnessProps.url && /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement("b", null, "Witness Intro Post/Profile")), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement("a", {
        href: witnessProps.url
      }, "Link"))))))), /*#__PURE__*/_react["default"].createElement("br", null), isAWitness && votersLoaded ? /*#__PURE__*/_react["default"].createElement("span", null, !votersLoaded ? /*#__PURE__*/_react["default"].createElement("center", null, /*#__PURE__*/_react["default"].createElement(_LoadingIndicator["default"], {
        type: "circle"
      })) : /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "columns large-12 small-12"
      }, /*#__PURE__*/_react["default"].createElement("h3", null, "Voters for Witness ", author, " (", voters.length, ")"), /*#__PURE__*/_react["default"].createElement("hr", null), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, voters.map(function (voter) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "column small-6 large-4"
        }, /*#__PURE__*/_react["default"].createElement(_Voter["default"], {
          info: voter,
          author: voter.account
        }));
      }))))) : null);
    }
  }]);
  return WitnessVoters;
}(_react["default"].Component);
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, ownProps) {
  var author = ownProps.author;
  var username = state.user.getIn(['current', 'username']);
  var account = state.global.getIn(['accounts', author]);
  return {
    author: author,
    username: username,
    account: account
  };
})(WitnessVoters);