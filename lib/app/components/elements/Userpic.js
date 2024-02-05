"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.avatarSize = exports.SIZE_SMALL = exports.SIZE_MED = exports.SIZE_LARGE = void 0;
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
var _shouldComponentUpdate = _interopRequireDefault(require("app/utils/shouldComponentUpdate"));
var _ProxifyUrl = require("app/utils/ProxifyUrl");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var SIZE_SMALL = exports.SIZE_SMALL = '64x64';
var SIZE_MED = exports.SIZE_MED = '128x128';
var SIZE_LARGE = exports.SIZE_LARGE = '512x512';
var sizeList = [SIZE_SMALL, SIZE_MED, SIZE_LARGE];
var avatarSize = exports.avatarSize = {
  small: SIZE_SMALL,
  medium: SIZE_MED,
  large: SIZE_LARGE
};
var Userpic = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(Userpic, _Component);
  function Userpic() {
    var _this;
    (0, _classCallCheck2["default"])(this, Userpic);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Userpic, [].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "shouldComponentUpdate", (0, _shouldComponentUpdate["default"])((0, _assertThisInitialized2["default"])(_this), 'Userpic'));
    return _this;
  }
  (0, _createClass2["default"])(Userpic, [{
    key: "render",
    value: function render() {
      if (this.props.hide) return null;
      var _this$props = this.props,
        account = _this$props.account,
        size = _this$props.size;
      var url = (0, _ProxifyUrl.imageProxy)() + "profileimage/".concat(account).concat(size ? size : '/avatar');
      var style = {
        backgroundImage: "url(".concat(url, ")")
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "Userpic",
        style: style
      });
    }
  }]);
  return Userpic;
}(_react.Component);
Userpic.propTypes = {
  account: _propTypes["default"].string.isRequired
};
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, ownProps) {
  var account = ownProps.account,
    size = ownProps.size,
    hideIfDefault = ownProps.hideIfDefault;
  var hide = false;
  if (hideIfDefault) {
    var url = state.userProfiles.getIn(['profiles', account, 'metadata', 'profile', 'profile_image'], null);
    hide = !url || !/^(https?:)\/\//.test(url);
  }
  return {
    account: account,
    size: size && sizeList.indexOf(size) > -1 ? '/' + size : '',
    hide: hide
  };
})(Userpic);