"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
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
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } // https://gist.github.com/aVolpe/b364a8fcd10f1ba833d97e9ab278f42c
// USAGE
// <EmbeddedGist gist="aVolpe/fffbe6a9e9858c7e3546fb1d55782152"/>
// <EmbeddedGist gist="aVolpe/fffbe6a9e9858c7e3546fb1d55782152" file="SetUtils.java"/>
var EmbeddedGist = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(EmbeddedGist, _React$Component);
  function EmbeddedGist(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, EmbeddedGist);
    _this = _callSuper(this, EmbeddedGist, [props]);
    // The Gist JSON data includes a stylesheet to add to the page
    // to make it look correct. `addStylesheet` ensures we only add
    // the stylesheet one time.
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "addStylesheet", function (href) {
      if (!_this.stylesheetAdded) {
        _this.stylesheetAdded = true;
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      }
    });
    _this.gist = props.gist;
    _this.file = props.file;
    _this.stylesheetAdded = false;
    _this.state = {
      loading: true,
      src: ''
    };
    return _this;
  }
  (0, _createClass2["default"])(EmbeddedGist, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
        gist = _this$props.gist,
        file = _this$props.file;

      // Create a JSONP callback that will set our state
      // with the data that comes back from the Gist site
      var gistCallback = EmbeddedGist.nextGistCallback();
      window[gistCallback] = function (gistData) {
        this.setState({
          loading: false,
          src: gistData.div
        });
        this.addStylesheet(gistData.stylesheet);
      }.bind(this);
      var url = 'https://gist.github.com/' + gist + '.json?callback=' + gistCallback;
      if (file) {
        url += '&file=' + file;
      }

      // Add the JSONP script tag to the document.
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      document.head.appendChild(script);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
        src = _this$state.src,
        loading = _this$state.loading;
      if (loading) {
        return /*#__PURE__*/_react["default"].createElement("div", null, "loading...");
      }

      // eslint-disable-next-line react/no-danger
      return /*#__PURE__*/_react["default"].createElement("div", {
        dangerouslySetInnerHTML: {
          __html: src
        }
      });
    }
  }]);
  return EmbeddedGist;
}(_react["default"].Component); // Each time we request a Gist, we’ll need to generate a new
// global function name to serve as the JSONP callback.
var gistCallbackId = 0;
EmbeddedGist.nextGistCallback = function () {
  var callbackName = 'embed_gist_callback_' + gistCallbackId;
  gistCallbackId += 1;
  return callbackName;
};
var _default = exports["default"] = EmbeddedGist;