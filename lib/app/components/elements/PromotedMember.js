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
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var PromotedMember = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(PromotedMember, _Component);
  function PromotedMember() {
    (0, _classCallCheck2["default"])(this, PromotedMember);
    return _callSuper(this, PromotedMember, arguments);
  }
  (0, _createClass2["default"])(PromotedMember, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        promoted_member = _this$props.promoted_member,
        author = _this$props.author; // redux

      var promoted = promoted_member.get(author);
      var staff = '';
      var developer = '';
      var witness = '';
      var contentcreator = '';
      var officialblurtdevs = '';
      var patreontag = '';
      var promotedtag = '';
      if (promoted !== undefined) {
        var description = "@".concat(promoted.category, ": ").concat(promoted.description);
        if (promoted.isStaff == true) {
          staff = {
            "css": "StaffMember",
            "desc": "".concat(description),
            "title": "STAFF"
          };
        }
        if (promoted.isWitness == true) {
          witness = {
            "css": "WitnessMember",
            "desc": "".concat(description),
            "title": "WITNESS"
          };
        }
        if (promoted.isDev == true) {
          developer = {
            "css": "DevMember",
            "desc": "".concat(description),
            "title": "ALLOY DEV"
          };
        }
        if (promoted.isContentCreator == true) {
          contentcreator = {
            "css": "CCMember",
            "desc": "".concat(description),
            "title": "CONTENT CREATOR"
          };
        }
        if (promoted.isOfficialBlurtDev == true) {
          officialblurtdevs = {
            "css": "DevMember",
            "desc": "".concat(description),
            "title": "BLURT DEV"
          };
        }
        if (promoted.isPromoted == true) {
          promotedtag = {
            "css": "PromotedMember",
            "desc": "".concat(description),
            "title": "Promoted"
          };
        }
        if (promoted.patreon.isActive == true) {
          if (promoted.patreon.tier == "DONATOR") {
            var cssname = "PatreonDonator";
          } else if (promoted.patreon.tier == "PREMIUM") {
            var cssname = "PatreonPremium";
          } else if (promoted.patreon.tier == "LEGEND") {
            var cssname = "PatreonLegend";
          } else if (promoted.patreon.tier == "MEGA") {
            var cssname = "PatreonMEGA";
          }
          patreontag = {
            "css": cssname,
            "desc": "".concat(description),
            "title": "Patreon: ".concat(promoted.patreon.tier)
          };
        }
        var putalltogether = [staff, witness, developer, contentcreator, officialblurtdevs, promotedtag, patreontag];
        var listItems = putalltogether.map(function (d) {
          return /*#__PURE__*/_react["default"].createElement("span", {
            className: d.css,
            title: d.desc
          }, d.title);
        });
        return /*#__PURE__*/_react["default"].createElement("div", null, listItems);
      }
      return null;
    }
  }]);
  return PromotedMember;
}(_react.Component);
var _default = exports["default"] = (0, _reactRedux.connect)(function (state) {
  var promoted_member = state.global.getIn(['promoted_members']) == undefined ? undefined : state.global.getIn(['promoted_members']);
  return {
    promoted_member: promoted_member
  };
})(PromotedMember);