"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireWildcard(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _reactRedux = require("react-redux");
var _reactSparklines = require("react-sparklines");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Coin = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(Coin, _Component);
  function Coin(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, Coin);
    _this = _callSuper(this, Coin, [props]);
    _this.onPointMouseMove = _this.onPointMouseMove.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onPointMouseOut = _this.onPointMouseOut.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }
  (0, _createClass2["default"])(Coin, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      var node = _reactDom["default"].findDOMNode(this.refs.coin);
      node.querySelectorAll('circle').forEach(function (circle) {
        circle.setAttribute('r', '8');
        circle.style.fillOpacity = 0;
        circle.style.cursor = 'pointer';
        circle.addEventListener('mouseover', _this2.onPointMouseMove);
      });
      node.querySelectorAll('polyline').forEach(function (circle) {
        circle.style.pointerEvents = 'none';
      });
      node.addEventListener('mouseout', this.onPointMouseOut);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this3 = this;
      var node = _reactDom["default"].findDOMNode(this.refs.coin);
      node.querySelectorAll('circle').forEach(function (circle) {
        circle.removeEventListener('mouseover', _this3.onPointMouseMove);
      });
      node.removeEventListener('mouseout', this.onPointMouseOut);
    }
  }, {
    key: "render",
    value: function render() {
      var color = this.props.color;
      var coin = this.props.coin;
      var name = coin.get('name');
      var symbol = coin.get('symbol');
      var timepoints = coin.get('timepoints');
      var priceUsd = timepoints.last().get('price_usd');
      var pricesUsd = timepoints.map(function (point) {
        return parseFloat(point.get('price_usd'));
      }).toJS();
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: "coin",
        className: "coin"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "chart"
      }, /*#__PURE__*/_react["default"].createElement(_reactSparklines.Sparklines, {
        data: pricesUsd
      }, /*#__PURE__*/_react["default"].createElement(_reactSparklines.SparklinesLine, {
        color: color,
        style: {
          strokeWidth: 3.0
        },
        onMouseMove: function onMouseMove(e) {
          console.log(e);
        }
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "caption"
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "coin-label"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "symbol"
      }, symbol), ' ', /*#__PURE__*/_react["default"].createElement("span", {
        className: "price"
      }, parseFloat(priceUsd).toFixed(2))));
    }
  }, {
    key: "onPointMouseMove",
    value: function onPointMouseMove(e) {
      var node = _reactDom["default"].findDOMNode(this.refs.coin);
      var caption = node.querySelector('.caption');
      var circle = e.currentTarget;
      var circles = node.querySelectorAll('circle');
      var index = Array.prototype.indexOf.call(circles, circle);
      var points = this.props.coin.get('timepoints');
      var point = points.get(index);
      var priceUsd = parseFloat(point.get('price_usd')).toFixed(2);
      var timepoint = point.get('timepoint');
      var time = new Date(timepoint).toLocaleString();
      caption.innerText = "$".concat(priceUsd, " ").concat(time);
    }
  }, {
    key: "onPointMouseOut",
    value: function onPointMouseOut(e) {
      var node = _reactDom["default"].findDOMNode(this.refs.coin);
      var caption = node.querySelector('.caption');
      caption.innerText = '';
    }
  }]);
  return Coin;
}(_react.Component);
var SteemMarket = /*#__PURE__*/function (_Component2) {
  (0, _inherits2["default"])(SteemMarket, _Component2);
  function SteemMarket() {
    (0, _classCallCheck2["default"])(this, SteemMarket);
    return _callSuper(this, SteemMarket, arguments);
  }
  (0, _createClass2["default"])(SteemMarket, [{
    key: "render",
    value: function render() {
      var steemMarketData = this.props.steemMarketData;
      if (steemMarketData.isEmpty()) {
        return null;
      }
      var topCoins = steemMarketData.get('top_coins');
      var blurt = steemMarketData.get('blurt');
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "c-sidebar__module"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "c-sidebar__header"
      }, /*#__PURE__*/_react["default"].createElement("h3", {
        className: "c-sidebar__h3"
      }, "Coin Marketplace")), /*#__PURE__*/_react["default"].createElement("div", {
        className: "c-sidebar__content"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "blurt-market"
      }, /*#__PURE__*/_react["default"].createElement(Coin, {
        coin: blurt,
        color: "#09d6a8"
      }), topCoins.map(function (coin) {
        return /*#__PURE__*/_react["default"].createElement(Coin, {
          key: coin.get('name'),
          coin: coin,
          color: "#788187"
        });
      }))));
    }
  }]);
  return SteemMarket;
}(_react.Component);
var _default = exports["default"] = (0, _reactRedux.connect)(
// mapStateToProps
function (state, ownProps) {
  var steemMarketData = state.app.get('steemMarket');
  return _objectSpread(_objectSpread({}, ownProps), {}, {
    steemMarketData: steemMarketData
  });
},
// mapDispatchToProps
function (dispatch) {
  return {};
})(SteemMarket);