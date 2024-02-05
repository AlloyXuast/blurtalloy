"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
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
var _reactRedux = require("react-redux");
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, ownProps) {
  return ownProps;
}, function (dispatch) {
  return {
    uploadImage: function uploadImage(file, dataUrl, filename, progress) {
      dispatch({
        type: 'user/UPLOAD_IMAGE',
        payload: {
          file: file,
          dataUrl: dataUrl,
          filename: filename,
          progress: progress
        }
      });
    }
  };
})( /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Image, _React$Component);
  function Image() {
    var _this;
    (0, _classCallCheck2["default"])(this, Image);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Image, [].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      progress: {}
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "load", function () {
      var dataUrl, filename;
      var file = _this.state.file;
      if (file) {
        // image dropped -- show a quick preview
        console.log('** image being loaded.. ----->', file);
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          dataUrl = reader.result;
          _this.setImageSrc(dataUrl, file.name);
        });
        reader.readAsDataURL(file);
        filename = file.name;
      } else {
        // draft, recover data using the preview data url
        var data = _this.props.node.data;
        var src = data.get('src');
        if (/^data:/.test(src)) {
          dataUrl = src;
          filename = data.get('alt');
        }
      }
      if (!file && !dataUrl) return;
      _this.setState({
        progress: {},
        uploading: true
      }, function () {
        var uploadImage = _this.props.uploadImage;
        uploadImage(file, dataUrl, filename, function (progress) {
          _this.setState({
            progress: progress,
            uploading: false
          });
          if (progress.url) {
            _this.setImageSrc(progress.url, filename);
          }
        });
      });
    });
    return _this;
  }
  (0, _createClass2["default"])(Image, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var file = this.props.node.data.get('file');
      // Save `file` for "Retry"
      // Try to load incase data url was loaded from a draft
      this.setState({
        file: file
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log('** image mounted..', this.state, this.props);
      this.load();
    }
  }, {
    key: "setImageSrc",
    value: function setImageSrc(src, filename) {
      var _this$props = this.props,
        editor = _this$props.editor,
        node = _this$props.node;
      var state = editor.getState();
      var next = state.transform().setNodeByKey(node.key, {
        data: {
          src: src,
          alt: filename
        }
      }).apply();
      editor.onChange(next);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        node = _this$props2.node,
        state = _this$props2.state,
        attributes = _this$props2.attributes;
      var isFocused = state.selection.hasEdgeIn(node);
      var className = isFocused ? 'active' : null;
      var prefix = $STM_Config.img_proxy_prefix ? $STM_Config.img_proxy_prefix + '0x0/' : '';
      var alt = node.data.get('alt');
      var src = node.data.get('src');
      console.log('** rendering image... src:', src ? src.substring(0, 30) + '...' : '(null)', state);
      if (!src) return /*#__PURE__*/_react["default"].createElement("small", {
        className: "info"
      }, "Loading Image\u2026");
      if (/^https?:\/\//.test(src)) return /*#__PURE__*/_react["default"].createElement("img", (0, _extends2["default"])({}, attributes, {
        src: prefix + src,
        alt: alt,
        className: className
      }));
      var img = /*#__PURE__*/_react["default"].createElement("img", {
        src: src,
        alt: alt,
        className: className
      });
      var uploading = this.state.uploading;
      if (uploading) return /*#__PURE__*/_react["default"].createElement("div", attributes, img, /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("small", {
        className: "info"
      }, "Uploading Image\u2026"));
      var error = this.state.progress.error;
      return /*#__PURE__*/_react["default"].createElement("div", attributes, img, /*#__PURE__*/_react["default"].createElement("div", {
        className: "error"
      }, /*#__PURE__*/_react["default"].createElement("small", null, "Image was not Saved (", /*#__PURE__*/_react["default"].createElement("a", {
        onClick: this.load
      }, "retry"), ")", /*#__PURE__*/_react["default"].createElement("br", null), error)));
    }
  }]);
  return Image;
}(_react["default"].Component));