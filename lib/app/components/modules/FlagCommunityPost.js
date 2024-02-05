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
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _counterpart = _interopRequireDefault(require("counterpart"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var nl2li = function nl2li(text) {
  return text.split('\n').map(function (item, key) {
    return /*#__PURE__*/_react["default"].createElement("li", {
      key: key
    }, item);
  });
};
var FlagCommunityPost = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(FlagCommunityPost, _Component);
  function FlagCommunityPost(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, FlagCommunityPost);
    _this = _callSuper(this, FlagCommunityPost, [props]);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "componentWillUpdate", function (nextProps, nextState) {
      if (nextState.notes != _this.state.notes) {
        _this.setState({
          disableSubmit: nextState.notes == ''
        });
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onInput", function (e) {
      _this.setState({
        notes: "".concat(e.target.value || '').trim()
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onSubmit", function () {
      if (_this.state.notes) _this.props.onSubmit(_this.state.notes);
    });
    _this.state = {
      notes: '',
      disableSubmit: true
    };
    return _this;
  }
  (0, _createClass2["default"])(FlagCommunityPost, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var disableSubmit = this.state.disableSubmit;
      var _this$props = this.props,
        flagText = _this$props.flagText,
        isComment = _this$props.isComment;
      return /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h4", null, (0, _counterpart["default"])('g.flag_this_post', {
        type: isComment ? 'comment' : 'post'
      })), /*#__PURE__*/_react["default"].createElement("p", null, (0, _counterpart["default"])('g.flag_this_post_description', {
        type: isComment ? 'comment' : 'post'
      })), flagText && flagText.length > 0 && /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("strong", null, "Community Rules"), /*#__PURE__*/_react["default"].createElement("ol", null, nl2li(flagText)))), /*#__PURE__*/_react["default"].createElement("hr", null), /*#__PURE__*/_react["default"].createElement("div", {
        className: "input-group"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "input-group-label"
      }, "Notes"), /*#__PURE__*/_react["default"].createElement("input", {
        className: "input-group-field",
        type: "text",
        maxLength: 120,
        onKeyUp: function onKeyUp(e) {
          if (e.key === 'Enter') {
            _this2.onSubmit();
          }
          _this2.onInput(e);
        }
      }), /*#__PURE__*/_react["default"].createElement("button", {
        className: "button slim hollow secondary",
        type: "submit",
        disabled: disableSubmit,
        onClick: function onClick() {
          return _this2.onSubmit();
        }
      }, (0, _counterpart["default"])('g.flag'))));
    }
  }]);
  return FlagCommunityPost;
}(_react.Component);
FlagCommunityPost.propTypes = {
  onSubmit: _propTypes["default"].func.isRequired,
  flagText: _propTypes["default"].string.isRequired,
  isComment: _propTypes["default"].bool
};
FlagCommunityPost.defaultProps = {
  isComment: false
};
var _default = exports["default"] = (0, _reactRedux.connect)()(FlagCommunityPost);