"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.embedNode = embedNode;
exports.genIframeMd = genIframeMd;
exports.normalizeEmbedUrl = normalizeEmbedUrl;
exports.sandboxConfig = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactSyntaxHighlighter = _interopRequireDefault(require("react-syntax-highlighter"));
var _hljs = require("react-syntax-highlighter/dist/esm/styles/hljs");
/* global $STM_Config */

/**
 * Regular expressions for detecting and validating provider URLs
 * @type {{htmlReplacement: RegExp, main: RegExp, sanitize: RegExp}}
 */
var regex = {
  // sanitize:
  //       /^(https?:)?\/\/player\.twitch\.tv\/\?(channel|video)=([A-Za-z0-9]+)/i,
  // main: /https?:\/\/(?:www.)?twitch\.tv\/(?:(videos)\/)?([a-zA-Z0-9]+$)/i,
  code: /(```)(.+)((?:\n.+)+)\n(```)$/gim
};
var _default = exports["default"] = regex;
/**
 * Configuration for HTML iframe's `sandbox` attribute
 * @type {useSandbox: boolean, sandboxAttributes: string[]}
 */
var sandboxConfig = exports.sandboxConfig = {
  useSandbox: false,
  sandboxAttributes: []
};

/**
 * Rewrites the embedded URL to a normalized format
 * @param url
 * @returns {string|boolean}
 */
function normalizeEmbedUrl(url) {
  var match = url.match(regex.code);
  console.log('Match', match);

  // if (match && match.length >= 3) {
  //   if (match[1] === undefined) {
  //     return `https://player.twitch.tv/?autoplay=false&channel=${
  //               match[2]
  //           }&parent=${getParentDomain()}`
  //   }

  //   return `https://player.twitch.tv/?autoplay=false&video=${
  //           match[2]
  //       }&parent=${getParentDomain()}`
  // }

  return false;
}

/**
 * Extract the code and language type from code block
 * @param data
 * @returns {null|{id: *, canonical: string, url: *}}
 */
function extractMetadata(data) {
  console.log('Data', data);
  if (!data) return null;
  var m = data.match(regex.code);
  console.log('M', m);
  if (!m || m.length < 4) return null;
  return {
    id: m[2] + m[3],
    code: m[0]
  };
}
function embedNode(child, links /* images */) {
  console.log('child', child);
  try {
    var data = child.data;
    console.log('data', data);
    var codeBlock = extractMetadata(data);
    if (!codeBlock) return child;
    child.data = data.replace(codeBlock.code, "~~~ embed:".concat(codeBlock.id, " codeblock ~~~"));
  } catch (error) {
    console.error(error);
  }
  return child;
}

/**
 * Generates the Markdown/HTML code to override the detected URL with an iFrame
 * @param idx
 * @param id
 * @param width
 * @param height
 * @returns {*}
 */
function genIframeMd(idx, id, width, height) {
  var codeBlockData = id.split('+');
  console.log('code blc', codeBlockData);
  var language = codeBlockData[0];
  var code = codeBlockData[1];
  return /*#__PURE__*/_react["default"].createElement("div", {
    id: "code-block-".concat(code.trim().subString(0, 10))
  }, /*#__PURE__*/_react["default"].createElement(_reactSyntaxHighlighter["default"], {
    language: language,
    style: _hljs.docco
  }, code));
}