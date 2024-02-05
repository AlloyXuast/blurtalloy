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
var _AutocompleteInput = _interopRequireDefault(require("app/components/elements/AutocompleteInput"));
var _Unicode = _interopRequireDefault(require("app/utils/Unicode"));
var _counterpart = _interopRequireDefault(require("counterpart"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var languageOptions = [{
  abbr: 'en',
  name: 'English'
}, {
  abbr: 'kr',
  name: 'Korean'
}, {
  abbr: 'zh',
  name: 'Chinese'
}, {
  abbr: 'ms',
  name: 'Malay'
}, {
  abbr: 'pl',
  name: 'Polish'
}, {
  abbr: 'pt',
  name: 'Portuguese'
}, {
  abbr: 'ru',
  name: 'Russian'
}, {
  abbr: 'it',
  name: 'Italian'
}, {
  abbr: 'de',
  name: 'German'
}, {
  abbr: 'es',
  name: 'Spanish'
}, {
  abbr: 'sv',
  name: 'Swedish'
}];
var CommunitySettings = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(CommunitySettings, _Component);
  function CommunitySettings(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, CommunitySettings);
    _this = _callSuper(this, CommunitySettings, [props]);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onInput", function (event) {
      var el = event.target;
      var field = el.name;
      var value = el.hasOwnProperty('checked') ? el.checked : el.value;
      _this.setState((0, _defineProperty2["default"])({}, field, value));
      if (field == 'title') {
        var formError = null;
        var rx = new RegExp('^[' + _Unicode["default"].L + ']');
        if (value && !rx.test(value)) formError = 'Must start with a letter.';
        _this.setState({
          formError: formError
        });
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onSubmit", function (e) {
      e.preventDefault();
      // Trim leading and trailing whitespace before submission.
      var payload = {};
      Object.keys(_this.state).forEach(function (k) {
        if (k == 'formError') return;
        if (typeof _this.state[k] === 'string') payload[k] = _this.state[k].trim();else payload[k] = _this.state[k];
      });
      _this.props.onSubmit(payload);
    });
    _this.state = {
      title: _this.props.title,
      about: _this.props.about,
      is_nsfw: _this.props.is_nsfw,
      lang: _this.props.lang,
      description: _this.props.description,
      flag_text: _this.props.flag_text
    };
    return _this;
  }
  (0, _createClass2["default"])(CommunitySettings, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$state = this.state,
        title = _this$state.title,
        about = _this$state.about,
        is_nsfw = _this$state.is_nsfw,
        lang = _this$state.lang,
        description = _this$state.description,
        flag_text = _this$state.flag_text,
        formError = _this$state.formError;
      var currentLanguage = languageOptions.filter(function (l) {
        return l.abbr === lang;
      })[0].name;
      return /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h4", null, (0, _counterpart["default"])('g.community_settings_header')), /*#__PURE__*/_react["default"].createElement("p", null, (0, _counterpart["default"])('g.community_settings_description'))), /*#__PURE__*/_react["default"].createElement("form", {
        onSubmit: this.onSubmit
      }, formError && /*#__PURE__*/_react["default"].createElement("span", {
        className: "error"
      }, formError), /*#__PURE__*/_react["default"].createElement("label", {
        className: "input-group"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "input-group-label"
      }, "Title "), /*#__PURE__*/_react["default"].createElement("input", {
        className: "input-group-field",
        type: "text",
        maxLength: 20,
        minLength: 3,
        name: "title",
        value: title,
        onChange: function onChange(e) {
          return _this2.onInput(e);
        },
        required: true
      })), /*#__PURE__*/_react["default"].createElement("label", {
        className: "input-group"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "input-group-label"
      }, "About "), /*#__PURE__*/_react["default"].createElement("input", {
        className: "input-group-field",
        type: "text",
        maxLength: 120,
        name: "about",
        value: about,
        onChange: function onChange(e) {
          return _this2.onInput(e);
        }
      })), /*#__PURE__*/_react["default"].createElement(_AutocompleteInput["default"], {
        label: 'Language',
        values: languageOptions,
        initialValue: currentLanguage,
        onSelect: function onSelect(v) {
          var selectedLanguage = languageOptions.filter(function (l) {
            return l.name === v;
          })[0];
          _this2.setState({
            lang: selectedLanguage.abbr
          });
        }
      }), /*#__PURE__*/_react["default"].createElement("label", {
        style: {
          margin: '1em 0 1rem'
        }
      }, "Description", /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("textarea", {
        style: {
          whiteSpace: 'normal'
        },
        type: "text",
        maxLength: 1000,
        rows: "10",
        onChange: function onChange(e) {
          return _this2.onInput(e);
        },
        name: "description",
        value: description
      })), /*#__PURE__*/_react["default"].createElement("label", {
        style: {
          margin: '0 0 0.5rem'
        }
      }, "Rules (one per line)", /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("textarea", {
        style: {
          whiteSpace: 'normal'
        },
        type: "text",
        maxLength: 1000,
        rows: "7",
        onChange: function onChange(e) {
          return _this2.onInput(e);
        },
        name: "flag_text",
        value: flag_text
      })), /*#__PURE__*/_react["default"].createElement("label", null, /*#__PURE__*/_react["default"].createElement("input", {
        type: "checkbox",
        name: "is_nsfw",
        checked: is_nsfw,
        onChange: function onChange(e) {
          return _this2.onInput(e);
        }
      }), ' ', "NSFW"), /*#__PURE__*/_react["default"].createElement("div", {
        className: "text-right"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        className: "button",
        type: "submit",
        value: "Save"
      }))));
    }
  }]);
  return CommunitySettings;
}(_react.Component);
CommunitySettings.propTypes = {
  onSubmit: _propTypes["default"].func.isRequired,
  title: _propTypes["default"].string.isRequired,
  about: _propTypes["default"].string.isRequired,
  is_nsfw: _propTypes["default"].bool.isRequired,
  lang: _propTypes["default"].string,
  description: _propTypes["default"].string.isRequired,
  flag_text: _propTypes["default"].string.isRequired
};
var _default = exports["default"] = (0, _reactRedux.connect)()(CommunitySettings);