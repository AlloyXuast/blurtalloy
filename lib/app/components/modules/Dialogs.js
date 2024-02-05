"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
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
var _CloseButton = _interopRequireDefault(require("app/components/elements/CloseButton"));
var _Reveal = _interopRequireDefault(require("app/components/elements/Reveal"));
var _immutable = require("immutable");
var globalActions = _interopRequireWildcard(require("app/redux/GlobalReducer"));
var _shouldComponentUpdate = _interopRequireDefault(require("app/utils/shouldComponentUpdate"));
var _QrReader = _interopRequireDefault(require("app/components/elements/QrReader"));
var _CheckLoginOwner = _interopRequireDefault(require("app/components/elements/CheckLoginOwner"));
var _PromotePost = _interopRequireDefault(require("app/components/modules/PromotePost"));
var _ExplorePost = _interopRequireDefault(require("app/components/modules/ExplorePost"));
var _CommunitySubscriberList = _interopRequireDefault(require("./CommunitySubscriberList"));
var _NotificationsList = _interopRequireDefault(require("../cards/NotificationsList"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Dialogs = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Dialogs, _React$Component);
  function Dialogs() {
    var _this;
    (0, _classCallCheck2["default"])(this, Dialogs);
    _this = _callSuper(this, Dialogs);
    _this.shouldComponentUpdate = (0, _shouldComponentUpdate["default"])((0, _assertThisInitialized2["default"])(_this), 'Dialogs');
    _this.hide = function (name) {
      _this.props.hide(name);
    };
    return _this;
  }
  (0, _createClass2["default"])(Dialogs, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;
      var active_dialogs = nextProps.active_dialogs,
        hide = nextProps.hide;
      active_dialogs.forEach(function (v, k) {
        if (!_this2['hide_' + k]) _this2['hide_' + k] = function () {
          return hide(k);
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var active_dialogs = this.props.active_dialogs;
      var idx = 0;
      var dialogs = active_dialogs.reduce(function (r, v, k) {
        var cmp = k === 'qr_reader' ? /*#__PURE__*/_react["default"].createElement("span", {
          key: idx++
        }, /*#__PURE__*/_react["default"].createElement(_Reveal["default"], {
          onHide: _this3['hide_' + k],
          show: true,
          revealStyle: {
            width: '355px'
          }
        }, /*#__PURE__*/_react["default"].createElement(_CloseButton["default"], {
          onClick: _this3['hide_' + k]
        }), /*#__PURE__*/_react["default"].createElement(_QrReader["default"], (0, _extends2["default"])({
          onClose: _this3['hide_' + k]
        }, v.get('params').toJS())))) : k === 'promotePost' ? /*#__PURE__*/_react["default"].createElement("span", {
          key: idx++
        }, /*#__PURE__*/_react["default"].createElement(_Reveal["default"], {
          onHide: _this3['hide_' + k],
          show: true
        }, /*#__PURE__*/_react["default"].createElement(_CloseButton["default"], {
          onClick: _this3['hide_' + k]
        }), /*#__PURE__*/_react["default"].createElement(_PromotePost["default"], (0, _extends2["default"])({
          onClose: _this3['hide_' + k]
        }, v.get('params').toJS())))) : k === 'explorePost' ? /*#__PURE__*/_react["default"].createElement("span", {
          key: idx++
        }, /*#__PURE__*/_react["default"].createElement(_Reveal["default"], {
          onHide: _this3['hide_' + k],
          show: true
        }, /*#__PURE__*/_react["default"].createElement(_CloseButton["default"], {
          onClick: _this3['hide_' + k]
        }), /*#__PURE__*/_react["default"].createElement(_ExplorePost["default"], (0, _extends2["default"])({
          onClick: _this3['hide_' + k]
        }, v.get('params').toJS())))) : k === 'communitySubscribers' ? /*#__PURE__*/_react["default"].createElement("span", {
          key: "dialog-".concat(k)
        }, /*#__PURE__*/_react["default"].createElement(_Reveal["default"], {
          onHide: _this3['hide_' + k],
          show: true
        }, /*#__PURE__*/_react["default"].createElement(_CloseButton["default"], {
          onClick: _this3['hide_' + k]
        }), /*#__PURE__*/_react["default"].createElement(_CommunitySubscriberList["default"], (0, _extends2["default"])({
          onClick: _this3['hide_' + k]
        }, v.get('params').toJS())))) : k === 'communityModerationLog' ? /*#__PURE__*/_react["default"].createElement("span", {
          key: "dialog-".concat(k)
        }, /*#__PURE__*/_react["default"].createElement(_Reveal["default"], {
          onHide: _this3['hide_' + k],
          show: true
        }, /*#__PURE__*/_react["default"].createElement(_CloseButton["default"], {
          onClick: _this3['hide_' + k]
        }), /*#__PURE__*/_react["default"].createElement(_NotificationsList["default"], {
          username: v.getIn(['params', 'community', 'name']),
          isLastPage: false
        }))) : null;
        return cmp ? r.push(cmp) : r;
      }, (0, _immutable.List)());
      return /*#__PURE__*/_react["default"].createElement("div", null, dialogs.toJS(), /*#__PURE__*/_react["default"].createElement(_CheckLoginOwner["default"], null));
    }
  }]);
  return Dialogs;
}(_react["default"].Component);
(0, _defineProperty2["default"])(Dialogs, "propTypes", {
  active_dialogs: _propTypes["default"].object,
  hide: _propTypes["default"].func.isRequired
});
var emptyMap = (0, _immutable.Map)();
var _default = exports["default"] = (0, _reactRedux.connect)(function (state) {
  return {
    active_dialogs: state.global.get('active_dialogs') || emptyMap
  };
}, function (dispatch) {
  return {
    hide: function hide(name) {
      dispatch(globalActions.hideDialog({
        name: name
      }));
    }
  };
})(Dialogs);