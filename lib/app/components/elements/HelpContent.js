"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _MarkdownViewer = _interopRequireDefault(require("app/components/cards/MarkdownViewer"));

var _Icon = _interopRequireDefault(require("app/components/elements/Icon"));

var _server = require("react-dom/server");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

if (!process.env.BROWSER) {
  var getFolderContents = function getFolderContents(folder, recursive) {
    return fs.readdirSync(folder).reduce(function (list, file) {
      var name = path.resolve(folder, file);
      var isDir = fs.statSync(name).isDirectory();
      return list.concat(isDir && recursive ? getFolderContents(name, recursive) : [name]);
    }, []);
  };

  var requireContext = function requireContext(folder, recursive, pattern) {
    var normalizedFolder = path.resolve(path.dirname(module.filename), folder); // eslint-disable-next-line no-multi-assign

    var folderContents = cache[folder] = cache[folder] ? cache[folder] : getFolderContents(normalizedFolder, recursive).filter(function (item) {
      if (item === module.filename) return false;
      return pattern.test(item);
    });

    var keys = function keys() {
      return folderContents;
    };

    var returnContext = function returnContext(item) {
      return cache[item] = cache[item] ? cache[item] : fs.readFileSync(item, 'utf8');
    };

    returnContext.keys = keys;
    return returnContext;
  };

  var cache = {}; // please note we don't need to define require.context for client side rendering because it's defined by webpack

  var path = require('path');

  var fs = require('fs');

  require.context = requireContext;
}

var req = require.context('../../help', true, /\.md/);

var HelpData = {};

function split_into_sections(str) {
  var sections = str.split(/\[#\s?(.+?)\s?\]/);
  if (sections.length === 1) return sections[0];
  if (sections[0].length < 4) sections.splice(0, 1);
  sections = sections.reduce(function (result, n) {
    var last = result.length > 0 ? result[result.length - 1] : null;

    if (!last || last.length === 2) {
      last = [n];
      result.push(last);
    } else last.push(n);

    return result;
  }, []);
  return sections.reduce(function (result, n) {
    result[n[0]] = n[1];
    return result;
  }, {});
}

var HelpContent = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(HelpContent, _React$Component);

  var _super = _createSuper(HelpContent);

  // eslint-disable-next-line react/static-property-placement
  function HelpContent(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, HelpContent);
    _this = _super.call(this, props);
    _this.locale = 'en';
    return _this;
  }

  (0, _createClass2["default"])(HelpContent, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      var md_file_path_regexp = new RegExp("/".concat(this.locale, "/(.+).md$"));
      req.keys().filter(function (a) {
        return a.indexOf("/".concat(_this2.locale, "/")) !== -1;
      }).forEach(function (filename) {
        var res = filename.match(md_file_path_regexp);
        var key = res[1];
        var help_locale = HelpData[_this2.locale]; // eslint-disable-next-line no-multi-assign

        if (!help_locale) HelpData[_this2.locale] = help_locale = {};
        var content = req(filename);
        help_locale[key] = split_into_sections(content);
      });
    }
  }, {
    key: "setVars",
    value: function setVars(str) {
      var _this3 = this;

      return str.replace(/(\{.+?\})/gi, function (match, text) {
        var key = text.substr(1, text.length - 2);
        var value = _this3.props[key] !== undefined ? _this3.props[key] : text;
        return value;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var path = this.props.path;

      if (!HelpData[this.locale]) {
        console.error("missing locale '".concat(this.locale, "' help files"));
        return null;
      }

      var value = HelpData[this.locale][path];

      if (!value && this.locale !== 'en') {
        console.warn("missing path '".concat(path, "' for locale '").concat(this.locale, "' help files, rolling back to 'en'"));
        value = HelpData.en[path];
      }

      if (!value) {
        console.error("help file not found '".concat(path, "' for locale '").concat(this.locale, "'"));
        return null;
      }

      if (this.props.section) value = value[this.props.section];

      if (!value) {
        console.error("help section not found ".concat(this.props.path, "#").concat(this.props.section));
        return null;
      }

      value = this.setVars(value);
      value = value.replace(/<Icon name="([A-Za-z0-9_-]+)" \/>/gi, function (match, name) {
        return (0, _server.renderToString)( /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
          name: name
        }));
      });
      var title = null;

      if (this.props.title) {
        title = /*#__PURE__*/_react["default"].createElement("h1", null, this.props.title);
      }

      return /*#__PURE__*/_react["default"].createElement("div", null, title, /*#__PURE__*/_react["default"].createElement(_MarkdownViewer["default"], {
        className: "HelpContent",
        text: value,
        allowDangerousHTML: true,
        breaks: false
      }));
    }
  }]);
  return HelpContent;
}(_react["default"].Component);

exports["default"] = HelpContent;
(0, _defineProperty2["default"])(HelpContent, "propTypes", {
  path: _propTypes["default"].string.isRequired,
  section: _propTypes["default"].string,
  title: _propTypes["default"].string
});