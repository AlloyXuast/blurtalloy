"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.BeneficiarySelector = void 0;
exports.validateBeneficiaries = validateBeneficiaries;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _reactAutocomplete = _interopRequireDefault(require("react-autocomplete"));
var _shouldComponentUpdate = _interopRequireDefault(require("app/utils/shouldComponentUpdate"));
var _ChainValidation = require("app/utils/ChainValidation");
var _ReactForm = _interopRequireDefault(require("app/utils/ReactForm"));
var _immutable = require("immutable");
var _counterpart = _interopRequireDefault(require("counterpart"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var BeneficiarySelector = exports.BeneficiarySelector = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(BeneficiarySelector, _React$Component);
  function BeneficiarySelector() {
    var _this;
    (0, _classCallCheck2["default"])(this, BeneficiarySelector);
    _this = _callSuper(this, BeneficiarySelector);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleAddBeneficiary", function (e) {
      e.preventDefault();
      var beneficiaries = _this.props.value;
      var category = _this.props.category;
      var categoryValue = category && /^blurt-[0-9]*$/.test(category) ? 1 : 0;
      if (beneficiaries.length < 8 - categoryValue) {
        _this.props.onChange(beneficiaries.concat([{
          username: '',
          percent: ''
        }]));
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleRemoveBeneficiary", function (idx) {
      return function (e) {
        e.preventDefault();
        var beneficiaries = _this.props.value;
        _this.props.onChange(beneficiaries.filter(function (s, bidx) {
          return idx != bidx;
        }));
      };
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleBeneficiaryUserChange", function (idx) {
      return function (e) {
        e.preventDefault();
        var beneficiaries = _this.props.value;
        var newBeneficiaries = beneficiaries.map(function (beneficiary, bidx) {
          if (idx != bidx) return beneficiary;
          return _objectSpread(_objectSpread({}, beneficiary), {}, {
            username: e.target.value
          });
        });
        _this.props.onChange(newBeneficiaries);
      };
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleBeneficiaryUserSelect", function (idx) {
      return function (val) {
        var beneficiaries = _this.props.value;
        var newBeneficiaries = beneficiaries.map(function (beneficiary, bidx) {
          if (idx != bidx) return beneficiary;
          return _objectSpread(_objectSpread({}, beneficiary), {}, {
            username: val
          });
        });
        _this.props.onChange(newBeneficiaries);
      };
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleBeneficiaryPercentChange", function (idx) {
      return function (e) {
        e.preventDefault();
        var beneficiaries = _this.props.value;
        var newBeneficiaries = beneficiaries.map(function (beneficiary, bidx) {
          if (idx != bidx) return beneficiary;
          return _objectSpread(_objectSpread({}, beneficiary), {}, {
            percent: e.target.value
          });
        });
        _this.props.onChange(newBeneficiaries);
      };
    });
    _this.shouldComponentUpdate = (0, _shouldComponentUpdate["default"])((0, _assertThisInitialized2["default"])(_this), 'BeneficiarySelector');
    return _this;
  }
  (0, _createClass2["default"])(BeneficiarySelector, [{
    key: "matchAutocompleteUser",
    value: function matchAutocompleteUser(item, value) {
      return item.toLowerCase().indexOf(value.toLowerCase()) > -1;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        username = _this$props.username,
        following = _this$props.following,
        tabIndex = _this$props.tabIndex,
        category = _this$props.category;
      var beneficiaries = this.props.value;
      var categoryValue = category && /^blurt-[0-9]*$/.test(category) ? 1 : 0;
      var remainingPercent = 100 - categoryValue * 3 - beneficiaries.map(function (b) {
        return b.percent ? parseInt(b.percent) : 0;
      }).reduce(function (sum, elt) {
        return sum + elt;
      }, 0);
      return /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column small-2"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "input-group"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        id: "remainingPercent",
        type: "text",
        pattern: "[0-9]*",
        value: remainingPercent,
        disabled: true,
        className: "BeneficiarySelector__percentbox"
      }), /*#__PURE__*/_react["default"].createElement("span", {
        className: "BeneficiarySelector__percentrow"
      }, "%"))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "column small-5"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "input-group"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "input-group-label"
      }, "@"), /*#__PURE__*/_react["default"].createElement("input", {
        className: "input-group-field bold",
        type: "text",
        disabled: true,
        value: username
      })))), category && /^blurt-[0-9]*$/.test(category) && /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column small-2"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "input-group"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        id: "remainingPercent",
        type: "text",
        pattern: "[0-9]*",
        value: 3,
        disabled: true,
        className: "BeneficiarySelector__percentbox"
      }), /*#__PURE__*/_react["default"].createElement("span", {
        className: "BeneficiarySelector__percentrow"
      }, "%"))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "column small-5"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "input-group"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "input-group-label"
      }, "@"), /*#__PURE__*/_react["default"].createElement("input", {
        className: "input-group-field bold",
        type: "text",
        disabled: true,
        value: category
      })))), beneficiaries.map(function (beneficiary, idx) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "row",
          key: idx
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "column small-2"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "input-group"
        }, /*#__PURE__*/_react["default"].createElement("input", {
          id: "percent",
          type: "text",
          pattern: "[0-9]*",
          value: beneficiary.percent,
          onChange: _this2.handleBeneficiaryPercentChange(idx),
          className: "BeneficiarySelector__percentbox"
        }), /*#__PURE__*/_react["default"].createElement("span", {
          className: "BeneficiarySelector__percentrow"
        }, "%"))), /*#__PURE__*/_react["default"].createElement("div", {
          className: "column small-5"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "input-group"
        }, /*#__PURE__*/_react["default"].createElement("span", {
          className: "input-group-label"
        }, "@"), /*#__PURE__*/_react["default"].createElement(_reactAutocomplete["default"], {
          wrapperStyle: {
            display: 'inline-block',
            width: '100%'
          },
          inputProps: {
            id: 'user',
            type: 'text',
            className: 'input-group-field',
            autoComplete: 'off',
            autoCorrect: 'off',
            autoCapitalize: 'off',
            spellCheck: 'false'
          },
          renderMenu: function renderMenu(items) {
            return /*#__PURE__*/_react["default"].createElement("div", {
              className: "react-autocomplete-input",
              children: items
            });
          },
          getItemValue: function getItemValue(item) {
            return item;
          },
          items: _this2.props.following,
          shouldItemRender: _this2.matchAutocompleteUser,
          renderItem: function renderItem(item, isHighlighted) {
            return /*#__PURE__*/_react["default"].createElement("div", {
              className: isHighlighted ? 'active' : ''
            }, item);
          },
          value: beneficiary.username,
          onChange: _this2.handleBeneficiaryUserChange(idx),
          onSelect: _this2.handleBeneficiaryUserSelect(idx)
        }))), /*#__PURE__*/_react["default"].createElement("div", {
          className: "BeneficiarySelector__percentrow column small-5"
        }, /*#__PURE__*/_react["default"].createElement("a", {
          id: "remove",
          href: "#",
          onClick: _this2.handleRemoveBeneficiary(idx)
        }, (0, _counterpart["default"])('g.remove'))));
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        id: "add",
        href: "#",
        onClick: this.handleAddBeneficiary,
        hidden: beneficiaries.length >= 8 - categoryValue
      }, (0, _counterpart["default"])('beneficiary_selector_jsx.add')))));
    }
  }]);
  return BeneficiarySelector;
}(_react["default"].Component);
(0, _defineProperty2["default"])(BeneficiarySelector, "propTypes", {
  // HTML props
  id: _propTypes["default"].string,
  // DOM id for active component (focusing, etc...)
  onChange: _propTypes["default"].func.isRequired,
  onBlur: _propTypes["default"].func.isRequired,
  value: _propTypes["default"].array,
  tabIndex: _propTypes["default"].number,
  // redux connect
  following: _propTypes["default"].array.isRequired
});
(0, _defineProperty2["default"])(BeneficiarySelector, "defaultProps", {
  id: 'BeneficiarySelectorId'
});
function validateBeneficiaries(username, beneficiaries, category) {
  var required = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var categoryValue = category && /^blurt-[0-9]*$/.test(category) ? 1 : 0;
  var remainingPercent = 100 - categoryValue * 3;
  var maxBeneficiaries = 8 - categoryValue;
  if (beneficiaries.length > maxBeneficiaries) {
    return (0, _counterpart["default"])('beneficiary_selector_jsx.exceeds_max_beneficiaries');
  }
  var totalPercent = 0;
  var beneficiaryNames = (0, _immutable.Set)();
  for (var i = 0; i < beneficiaries.length; i++) {
    var beneficiary = beneficiaries[i];
    var accountError = (0, _ChainValidation.validate_account_name)(beneficiary.username, '');
    if ((required || beneficiary.username) && accountError) {
      return accountError;
    }
    if (beneficiary.username === username) {
      return (0, _counterpart["default"])('beneficiary_selector_jsx.beneficiary_cannot_be_self');
    }
    if (beneficiaryNames.has(beneficiary.username)) {
      return (0, _counterpart["default"])('beneficiary_selector_jsx.beneficiary_cannot_be_duplicate');
    } else {
      beneficiaryNames = beneficiaryNames.add(beneficiary.username);
    }
    if ((required || beneficiary.percent) && !/^[1-9]\d{0,2}$/.test(beneficiary.percent)) {
      return (0, _counterpart["default"])('beneficiary_selector_jsx.beneficiary_percent_invalid');
    }
    totalPercent += parseInt(beneficiary.percent);
  }
  if (totalPercent > remainingPercent) {
    return (0, _counterpart["default"])('beneficiary_selector_jsx.beneficiary_percent_total_invalid');
  }
}
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, ownProps) {
  var following = (0, _immutable.List)();
  var username = state.user.getIn(['current', 'username']);
  var follow = state.global.get('follow');
  if (follow) {
    var followingData = follow.getIn(['getFollowingAsync', username, 'blog_result']);
    if (followingData) following = followingData.sort();
  }
  return _objectSpread(_objectSpread({}, ownProps), {}, {
    username: username,
    following: following.toJS()
  });
})(BeneficiarySelector);