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
exports.validateIframeUrl = validateIframeUrl;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
/* global $STM_Config */

/**
 * Regular expressions for detecting and validating provider URLs
 * @type {{htmlReplacement: RegExp, main: RegExp, sanitize: RegExp}}
 */
var regex = {
  frame: /^https:\/\/www.vimm.tv\/([a-zA-Z]+)\/embed\?autoplay=0/i,
  embedView: /^https:\/\/www.vimm\.tv\/(embedview)\/([a-zA-Z0-9-_]+)\?autoplay=1&mute=1/i,
  url: /^https:\/\/www.vimm.tv\/(c|view)\/([a-zA-Z0-9-_]+)/i
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
 * Check if the iframe code in the post editor is to an allowed URL
 * <iframe src="https://www.vimm.tv/chisdealhd/embed?autoplay=0" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe>
 *
 * @param url
 * @returns {boolean|*}
 */
function validateIframeUrl(url) {
  var match = url.match(regex.frame);
  var matchEmbed = url.match(regex.embedView);
  if (match) {
    return "https://www.vimm.tv/".concat(match[1], "/embed?autoplay=0");
  }
  if (matchEmbed) {
    return "https://www.vimm.tv/embedview/".concat(matchEmbed[2], "?autoplay=1&mute=1");
  }
  return false;
}

/**
 * Rewrites the embedded URL to a normalized format
 * @param url
 * @returns {string|boolean}
 */
function normalizeEmbedUrl(url) {
  var match = url.match(regex.frame);
  if (match) {
    return "https://www.vimm.tv/".concat(match[1], "/embed?autoplay=0");
  }
  var matchEmbed = url.match(regex.embedView);
  if (matchEmbed) {
    return "https://www.vimm.tv/embedview/".concat(matchEmbed[2], "?autoplay=1&mute=1");
  }
  return false;
}

/**
 * Extract the code and language type from code block
 * @param data
 * @returns {null|{id: *, canonical: string, url: *}}
 */
function extractMetadata(data) {
  if (!data) return null;
  var m = data.match(regex.url);
  if (!m) return null;
  return {
    id: "".concat(m[1], "/").concat(m[2]),
    url: m[0]
  };
}
function embedNode(child, links /* images */) {
  try {
    var data = child.data;
    var vimm = extractMetadata(data);
    if (!vimm) return child;
    child.data = data.replace(vimm.url, "~~~ embed:".concat(vimm.id, " vimm ~~~"));
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
  var url = '';
  if (id.startsWith('c/')) {
    id = id.replace('c/', '');
    url = "https://www.vimm.tv/".concat(id, "/embed?autoplay=0");
  } else if (id.startsWith('view/')) {
    url = "https://www.vimm.tv/embed".concat(id, "?autoplay=1&mute=1");
  }
  var sandbox = sandboxConfig.useSandbox;
  if (sandbox) {
    if (Object.prototype.hasOwnProperty.call(sandboxConfig, 'sandboxAttributes')) {
      sandbox = sandboxConfig.sandboxAttributes.join(' ');
    }
  }
  var aspectRatioPercent = height / width * 100;
  var iframeProps = {
    src: url,
    width: width,
    height: height,
    frameBorder: '0',
    allowFullScreen: 'allowFullScreen'
  };
  if (sandbox) {
    iframeProps.sandbox = sandbox;
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    key: "vimm-".concat(id, "-").concat(idx),
    className: "videoWrapper",
    style: {
      position: 'relative',
      width: '100%',
      height: 0,
      paddingBottom: "".concat(aspectRatioPercent, "%")
    }
  }, /*#__PURE__*/_react["default"].createElement("iframe", (0, _extends2["default"])({
    title: "Vimm embedded player"
    // eslint-disable-next-line react/jsx-props-no-spreading
  }, iframeProps)));
}