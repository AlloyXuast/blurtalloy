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
var _reactDom = _interopRequireWildcard(require("react-dom"));
var _shouldComponentUpdate = _interopRequireDefault(require("app/utils/shouldComponentUpdate"));
var _Icon = _interopRequireDefault(require("app/components/elements/Icon"));
var _reactRouter = require("react-router");
var _NormalizeProfile = _interopRequireDefault(require("app/utils/NormalizeProfile"));
var _AffiliationMap = _interopRequireDefault(require("app/utils/AffiliationMap"));
var _counterpart = _interopRequireDefault(require("counterpart"));
var _Overlay = _interopRequireDefault(require("react-overlays/lib/Overlay"));
var _reactRedux = require("react-redux");
var _AuthorDropdown = _interopRequireDefault(require("../AuthorDropdown"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* eslint-disable react/static-property-placement */ /* eslint-disable react/no-find-dom-node */ /* eslint react/prop-types: 0 */
var string = _propTypes["default"].string,
  bool = _propTypes["default"].bool,
  number = _propTypes["default"].number;
var closers = [];
var fnCloseAll = function fnCloseAll() {
  var close;
  while (close = closers.shift()) {
    close();
  }
};
var Voter = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Voter, _React$Component);
  function Voter() {
    var _this;
    (0, _classCallCheck2["default"])(this, Voter);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Voter, [].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "shouldComponentUpdate", (0, _shouldComponentUpdate["default"])((0, _assertThisInitialized2["default"])(_this), 'Author'));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "toggle", function (e) {
      if (!(e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        e.stopPropagation();
        var show = !_this.state.show;
        fnCloseAll();
        if (show) {
          _this.setState({
            show: show
          });
          closers.push(_this.close);
        }
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "close", function () {
      _this.setState({
        show: false
      });
    });
    _this.state = {
      show: false
    };
    _this.toggle = _this.toggle.bind((0, _assertThisInitialized2["default"])(_this));
    _this.close = _this.close.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }
  (0, _createClass2["default"])(Voter, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.authorProfileLink) {
        return;
      }
      var node = _reactDom["default"].findDOMNode(this.authorProfileLink);
      if (node.addEventListener) {
        node.addEventListener('click', this.toggle, false);
      } else {
        node.attachEvent('click', this.toggle, false);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!this.authorProfileLink) {
        return;
      }
      var node = _reactDom["default"].findDOMNode(this.authorProfileLink);
      if (node.removeEventListener) {
        node.removeEventListener('click', this.toggle);
      } else {
        node.detachEvent('click', this.toggle);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        author = _this$props.author,
        follow = _this$props.follow,
        mute = _this$props.mute,
        authorRepLog10 = _this$props.authorRepLog10,
        showAffiliation = _this$props.showAffiliation; // html
      var username = this.props.username; // redux
      var _ref = this.props.account ? (0, _NormalizeProfile["default"])(this.props.account.toJS()) : {},
        name = _ref.name,
        about = _ref.about;
      if (this.props.account) {
        console.log(this.props.account.toJS());
      }
      if (!(follow || mute) || username === author) {
        return /*#__PURE__*/_react["default"].createElement("span", {
          className: "author",
          itemProp: "author",
          itemScope: true,
          itemType: "http://schema.org/Person"
        }, /*#__PURE__*/_react["default"].createElement("strong", null, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
          to: '/@' + author
        }, author)), ' ', showAffiliation && _AffiliationMap["default"][author] ? /*#__PURE__*/_react["default"].createElement("span", {
          className: "affiliation"
        }, (0, _counterpart["default"])('g.affiliation_' + _AffiliationMap["default"][author])) : null);
      }
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: "Voter"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        itemProp: "author",
        itemScope: true,
        itemType: "http://schema.org/Person"
      }, /*#__PURE__*/_react["default"].createElement("strong", null, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
        className: "ptc",
        ref: function ref(link) {
          _this2.authorProfileLink = link;
        },
        to: '/@' + author
      }, author, showAffiliation && _AffiliationMap["default"][author] ? /*#__PURE__*/_react["default"].createElement("span", {
        className: "affiliation"
      }, (0, _counterpart["default"])('g.affiliation_' + _AffiliationMap["default"][author])) : null, /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
        name: "dropdown-arrow"
      })))), /*#__PURE__*/_react["default"].createElement(_Overlay["default"], {
        show: this.state.show,
        onHide: this.close,
        placement: "bottom",
        container: this,
        target: function target() {
          return (0, _reactDom.findDOMNode)(_this2.target);
        },
        rootClose: true
      }, /*#__PURE__*/_react["default"].createElement(_AuthorDropdown["default"], {
        author: author,
        follow: follow,
        mute: mute,
        authorRepLog10: authorRepLog10,
        name: name,
        about: about,
        username: username
      })));
    }
  }]);
  return Voter;
}(_react["default"].Component);
(0, _defineProperty2["default"])(Voter, "propTypes", {
  author: string.isRequired,
  follow: bool,
  mute: bool,
  authorRepLog10: number,
  showAffiliation: bool
});
(0, _defineProperty2["default"])(Voter, "defaultProps", {
  follow: true,
  mute: true,
  showAffiliation: false
});
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, ownProps) {
  var author = ownProps.author,
    follow = ownProps.follow,
    mute = ownProps.mute,
    authorRepLog10 = ownProps.authorRepLog10;
  var username = state.user.getIn(['current', 'username']);
  var account = state.global.getIn(['accounts', author]);
  return {
    author: author,
    follow: follow,
    mute: mute,
    authorRepLog10: authorRepLog10,
    username: username,
    account: account
  };
})(Voter);