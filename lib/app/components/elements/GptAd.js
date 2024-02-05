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
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var GptAd = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(GptAd, _Component);
  function GptAd(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, GptAd);
    _this = _callSuper(this, GptAd, [props]);
    var ad_identifier = props.ad_identifier,
      enabled = props.enabled,
      type = props.type,
      tags = props.tags,
      bannedTags = props.bannedTags;
    _this.ad_identifier = '';
    _this.type = type;
    _this.enabled = false;
    _this.tags = tags;
    _this.bannedTags = bannedTags;
    if (ad_identifier != '') {
      // console.info(
      //     `ad_identifier of '${ad_identifier}' will render.`,
      //     ad_identifier
      // );
      _this.enabled = enabled;
      _this.ad_identifier = ad_identifier;
    } else {
      // console.info(
      //     `Slot named '${
      //         props.slotName
      //     }' will be disabled because we were unable to find the ad details.`
      // );
    }
    _this.unique_slot_id = "".concat(_this.ad_identifier, "_").concat(Date.now());
    return _this;
  }
  (0, _createClass2["default"])(GptAd, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.ad_identifier || !this.enabled) return;
      var ad_identifier = this.ad_identifier;
      var unique_slot_id = this.unique_slot_id;
      window.optimize.queue.push(function () {
        window.optimize.push(unique_slot_id);
        googletag.pubads().addEventListener('impressionViewable', function (e) {
          window.dispatchEvent(new Event('gptadshown', e));
        });
        googletag.pubads().addEventListener('slotRenderEnded', function (e) {
          window.dispatchEvent(new Event('gptadshown', e));
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.ad_identifier || !this.enabled) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          id: "disabled_ad",
          style: {
            display: 'none'
          }
        });
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "gpt-ad",
        style: {
          width: '100%'
        },
        id: this.unique_slot_id
      });
    }
  }]);
  return GptAd;
}(_react.Component);
GptAd.propTypes = {
  ad_identifier: _propTypes["default"].string.isRequired,
  enabled: _propTypes["default"].bool.isRequired,
  type: _propTypes["default"].oneOf(['Bidding', 'Category', 'Basic', 'Freestar']),
  tags: _propTypes["default"].arrayOf(_propTypes["default"].string),
  bannedTags: _propTypes["default"].arrayOf(_propTypes["default"].string).isRequired
};
GptAd.defaultProps = {
  type: 'Freestar',
  tags: []
};
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, props) {
  var enabled = !!state.app.getIn(['googleAds', 'gptEnabled']) && !!process.env.BROWSER && !!window.googletag;
  var postCategory = state.global.get('postCategory');
  var basicSlots = state.app.getIn(['googleAds', 'gptBasicSlots']);
  var biddingSlots = state.app.getIn(['googleAds', 'gptBiddingSlots']);
  var categorySlots = state.app.getIn(['googleAds', 'gptCategorySlots']);
  var bannedTags = state.app.getIn(['googleAds', 'gptBannedTags']);
  var bannedTagsJS = bannedTags ? bannedTags.toJS() : [];
  var slotName = props.slotName;
  if (!slotName) {
    slotName = props.id;
  }
  var type = props.type;
  var slot = slotName; // in case it's Freestar
  if (type != 'Freestar') {
    slot = state.app.getIn(['googleAds', "gpt".concat(type, "Slots"), slotName]);
  }
  return _objectSpread({
    enabled: enabled,
    ad: slot,
    // TODO: Clean this up. This is from old GPT/Coinzilla stuffs
    ad_identifier: slotName,
    bannedTagsJS: bannedTagsJS
  }, props);
}, function (dispatch) {
  return {};
})(GptAd);