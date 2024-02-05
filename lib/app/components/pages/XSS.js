"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireDefault(require("react"));
var _MarkdownViewer = _interopRequireDefault(require("app/components/cards/MarkdownViewer"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var XSS = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(XSS, _React$Component);
  function XSS() {
    (0, _classCallCheck2["default"])(this, XSS);
    return _callSuper(this, XSS, arguments);
  }
  (0, _createClass2["default"])(XSS, [{
    key: "render",
    value: function render() {
      if (!process.env.NODE_ENV === 'development') return /*#__PURE__*/_react["default"].createElement("div", null);
      var tests = xss.map(function (test, i) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: i
        }, /*#__PURE__*/_react["default"].createElement("h2", null, "Test ", i), /*#__PURE__*/_react["default"].createElement(_MarkdownViewer["default"], {
          formId: 'xsstest' + i,
          text: test
        }), /*#__PURE__*/_react["default"].createElement("hr", null));
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column column-12"
      }, tests));
      // return <div dangerouslySetInnerHTML={{__html: xss}} />
    }
  }]);
  return XSS;
}(_react["default"].Component);
module.exports = {
  path: '/xss/test',
  component: XSS
};

// https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet#Image_XSS_using_the_JavaScript_directive
// July 14 2016
var xss = ['<SCRIPT>alert(String.fromCharCode(88,83,83))</SCRIPT>', '<DIV STYLE="background-image:url(javascript:alert(\'XSS\'))">', '<div style="background-image:url(javascript:alert(\'XSS\'))">', '<FRAMESET><FRAME SRC="javascript:alert(\'XSS\') ;"></FRAMESET>', '<IFRAME SRC="javascript:alert(\'XSS\') ;"></IFRAME>', '<INPUT TYPE="IMAGE" SRC="javascript:alert(\'XSS\') ;">', '<IMG DYNSRC="javascript:alert(\'XSS\');">', '<LINK REL="stylesheet" HREF="javascript:alert(\'XSS\');">', '<STYLE>li {list-style-image: url("javascript:alert(\'XSS\') ");}</STYLE><UL><LI>XSS', '<META HTTP-EQUIV="refresh" CONTENT="0;url=data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4K">', "<OBJECT classid=clsid:ae24fdae-03c6-11d1-8b76-0080c744f389><param name=url value=javascript:alert('XSS')></OBJECT>", '<EMBED SRC="http://ha.ckers.org/xss.swf" AllowScriptAccess="always"></EMBED>', '<table background="javascript:alert(\'XSS\')"><tr><td style="background-image:url(javascript:alert(\'XSS\'))">*</td></tr></table>', '<a href="javascript:alert(\'XSS\')">XSS</a>', "';alert(String.fromCharCode(88,83,83))//';alert(String.fromCharCode(88,83,83))//\";\nalert(String.fromCharCode(88,83,83))//\";alert(String.fromCharCode(88,83,83))//--\n></SCRIPT>\">'><SCRIPT>alert(String.fromCharCode(88,83,83))</SCRIPT>", "'';!--\"<XSS>=&{()}", '<SCRIPT SRC=https://steemd.com/xss.js></SCRIPT>', "onnerr w/ clearly invalid img: <img src=\"awesome.jpg\" onerror=\"alert('xss')\" /><br />\ngood image: <img src=\"https://steem.io/images/press/press-theblkchn.png\" onerror=\"alert('xss')\" /><br />\ngood url, bad img: <img src=\"https://steem.io/testing-does-not-exist.png\" onerror=\"alert('xss')\" /> \n(results will vary if using image proxy -- it rewrites 'src')", '**test**!%3Cimg%20src=%22awsome.jpg%22%20onerror=%22alert(1)%22/%3E', '<html>test!%3Cimg%20src=%22awsome.jpg%22%20onerror=%22alert(1)%22/%3E</html>', '<IMG SRC=`javascript:alert("RSnake says, \'XSS\'")`>', '<html><a href="&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;&#97;&#108;&#101;&#114;&#116;&#40;&#39;&#88;&#83;&#83;&#39;&#41;">Hax</a></html>', '<a href="/not-a-domain.com/local-page" rel="fffffffff">Link to a local page with bad rel attr</a>', '<a href="//relative-protocol-domain.com/some-page" target="fffffffff">Link to domain (relative protocol) and bad target attr</a>'];