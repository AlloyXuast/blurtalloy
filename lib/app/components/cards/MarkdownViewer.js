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
var _remarkable = require("remarkable");
var _SanitizeConfig = _interopRequireWildcard(require("app/utils/SanitizeConfig"));
var _sanitizeHtml = _interopRequireDefault(require("sanitize-html"));
var _HtmlReady = _interopRequireDefault(require("shared/HtmlReady"));
var _counterpart = _interopRequireDefault(require("counterpart"));
var _EmbeddedPlayers = require("app/components/elements/EmbeddedPlayers");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var remarkable = new _remarkable.Remarkable({
  html: true,
  // remarkable renders first then sanitize runs...
  breaks: true,
  typographer: false,
  // https://github.com/jonschlinkert/remarkable/issues/142#issuecomment-221546793
  quotes: '“”‘’'
});
var remarkableToSpec = new _remarkable.Remarkable({
  html: true,
  breaks: false,
  // real markdown uses \n\n for paragraph breaks
  typographer: false,
  quotes: '“”‘’'
});
var MarkdownViewer = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(MarkdownViewer, _Component);
  function MarkdownViewer() {
    var _this;
    (0, _classCallCheck2["default"])(this, MarkdownViewer);
    _this = _callSuper(this, MarkdownViewer);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onAllowNoImage", function () {
      _this.setState({
        allowNoImage: false
      });
    });
    _this.state = {
      allowNoImage: true
    };
    return _this;
  }
  (0, _createClass2["default"])(MarkdownViewer, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(np, ns) {
      return np.text !== this.props.text || np.large !== this.props.large || ns.allowNoImage !== this.state.allowNoImage;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        noImage = _this$props.noImage,
        hideImages = _this$props.hideImages,
        hideLinks = _this$props.hideLinks;
      var allowNoImage = this.state.allowNoImage;
      var text = this.props.text;
      if (!text) text = ''; // text can be empty, still view the link meta data
      var _this$props2 = this.props,
        large = _this$props2.large,
        highQualityPost = _this$props2.highQualityPost;
      var html = false;
      // See also ReplyEditor isHtmlTest
      var m = text.match(/^<html>([\S\s]*)<\/html>$/);
      if (m && m.length === 2) {
        html = true;
        text = m[1];
      } else {
        // See also ReplyEditor isHtmlTest
        html = /^<p>[\S\s]*<\/p>/.test(text);
      }

      // Strip out HTML comments. "JS-DOS" bug.
      text = text.replace(/<!--([\s\S]+?)(-->|$)/g, '(html comment removed: $1)');
      var renderer = remarkableToSpec;
      if (this.props.breaks === true) {
        renderer = remarkable;
      }
      var renderedText = html ? text : renderer.render(text);

      // If content isn't wrapped with an html element at this point, add it.
      if (!renderedText.indexOf('<html>') !== 0) {
        renderedText = '<html>' + renderedText + '</html>';
      }

      // Embed videos, link mentions and hashtags, etc...
      if (renderedText) renderedText = (0, _HtmlReady["default"])(renderedText, {
        hideImages: hideImages,
        hideLinks: hideLinks
      }).html;

      // Complete removal of javascript and other dangerous tags..
      // The must remain as close as possible to dangerouslySetInnerHTML
      var cleanText = renderedText;
      if (this.props.allowDangerousHTML === true) {
        console.log('WARN\tMarkdownViewer rendering unsanitized content');
      } else {
        cleanText = (0, _sanitizeHtml["default"])(renderedText, (0, _SanitizeConfig["default"])({
          large: large,
          highQualityPost: highQualityPost,
          noImage: noImage && allowNoImage
        }));
      }
      if (/<\s*script/gi.test(cleanText)) {
        // Not meant to be complete checking, just a secondary trap and red flag (code can change)
        console.error('Refusing to render script tag in post text', cleanText);
        return /*#__PURE__*/_react["default"].createElement("div", null);
      }
      var noImageActive = cleanText.indexOf(_SanitizeConfig.noImageText) !== -1;

      // In addition to inserting the youtube component, this allows
      // react to compare separately preventing excessive re-rendering.
      var idx = 0;
      var sections = [];
      function checksum(s) {
        var chk = 0x12345678;
        var len = s.length;
        for (var i = 0; i < len; i += 1) {
          chk += s.charCodeAt(i) * (i + 1);
        }
        return (chk & 0xffffffff).toString(16);
      }

      // HtmlReady inserts ~~~ embed:${id} type ~~~
      var _iterator = _createForOfIteratorHelper(cleanText.split('~~~ embed:')),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var section = _step.value;
          var embedMd = (0, _EmbeddedPlayers.generateMd)(section, idx, large);
          if (embedMd) {
            var newSection = embedMd.section,
              markdown = embedMd.markdown;
            section = newSection;
            sections.push(markdown);
            if (section === '') continue;
          }
          sections.push( /*#__PURE__*/_react["default"].createElement("div", {
            key: checksum(section),
            dangerouslySetInnerHTML: {
              __html: section
            }
          }));
          idx += 1;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var cn = 'Markdown' + (this.props.className ? " ".concat(this.props.className) : '') + (html ? ' html' : '') + (large ? '' : ' MarkdownViewer--small');
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: 'MarkdownViewer ' + cn
      }, sections, noImageActive && allowNoImage && /*#__PURE__*/_react["default"].createElement("div", {
        key: 'hidden-content',
        onClick: this.onAllowNoImage,
        className: "MarkdownViewer__negative_group"
      }, (0, _counterpart["default"])('markdownviewer_jsx.images_were_hidden_due_to_low_ratings'), /*#__PURE__*/_react["default"].createElement("button", {
        style: {
          marginBottom: 0
        },
        className: "button hollow tiny float-right"
      }, (0, _counterpart["default"])('g.show'))));
    }
  }]);
  return MarkdownViewer;
}(_react.Component);
(0, _defineProperty2["default"])(MarkdownViewer, "propTypes", {
  // HTML properties
  text: _propTypes["default"].string,
  className: _propTypes["default"].string,
  large: _propTypes["default"].bool,
  jsonMetadata: _propTypes["default"].object,
  highQualityPost: _propTypes["default"].bool,
  noImage: _propTypes["default"].bool,
  allowDangerousHTML: _propTypes["default"].bool,
  hideImages: _propTypes["default"].bool,
  // whether to replace images with just a span containing the src url
  hideLinks: _propTypes["default"].bool,
  // whether to replace images with just a span containing the src url
  breaks: _propTypes["default"].bool // true to use bastardized markdown that cares about newlines
  // used for the ImageUserBlockList
});
(0, _defineProperty2["default"])(MarkdownViewer, "defaultProps", {
  allowDangerousHTML: false,
  breaks: true,
  className: '',
  hideImages: false,
  hideLinks: false,
  large: false
});
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, ownProps) {
  return _objectSpread({}, ownProps);
})(MarkdownViewer);