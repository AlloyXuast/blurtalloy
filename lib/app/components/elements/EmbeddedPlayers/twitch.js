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
  sanitize: /^(https?:)?\/\/player\.twitch\.tv\/\?(channel|video)=([A-Za-z0-9]+)/i,
  main: /https?:\/\/(?:www.)?twitch\.tv\/(?:(videos)\/)?([a-zA-Z0-9]+$)/i
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
function getParentDomain() {
  var parentDomain = $STM_Config.site_domain;
  if (typeof window !== 'undefined') {
    parentDomain = window.location.hostname;
  }
  return parentDomain;
}

/**
 * Check if the iframe code in the post editor is to an allowed URL
 * <iframe src="https://player.twitch.tv/?channel=tfue" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe>
 *
 * @param url
 * @returns {boolean|*}
 */
function validateIframeUrl(url) {
  var match = url.match(regex.sanitize);
  if (match) {
    return "https://player.twitch.tv/?".concat(match[2], "=").concat(match[3], "&parent=").concat(getParentDomain());
  }
  return false;
}

/**
 * Rewrites the embedded URL to a normalized format
 * @param url
 * @returns {string|boolean}
 */
function normalizeEmbedUrl(url) {
  var match = url.match(regex.sanitize);
  if (match && match.length >= 3) {
    if (match[1] === undefined) {
      return "https://player.twitch.tv/?autoplay=false&channel=".concat(match[2], "&parent=").concat(getParentDomain());
    }
    return "https://player.twitch.tv/?autoplay=false&video=".concat(match[2], "&parent=").concat(getParentDomain());
  }
  return false;
}

/**
 * Extract the content ID and other metadata from the URL
 * @param data
 * @returns {null|{id: *, canonical: string, url: *}}
 */
function extractMetadata(data) {
  if (!data) return null;
  var m = data.match(regex.main);
  if (!m || m.length < 3) return null;
  return {
    id: m[1] === 'videos' ? "?video=".concat(m[2]) : "?channel=".concat(m[2]),
    url: m[0],
    canonical: m[1] === 'videos' ? "https://player.twitch.tv/?video=".concat(m[2], "&parent=").concat(getParentDomain()) : "https://player.twitch.tv/?channel=".concat(m[2], "&parent=").concat(getParentDomain())
  };
}
function embedNode(child, links /* images */) {
  try {
    var data = child.data;
    var twitch = extractMetadata(data);
    if (!twitch) return child;
    child.data = data.replace(twitch.url, "~~~ embed:".concat(twitch.id, " twitch ~~~"));
    if (links) links.add(twitch.canonical);
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
  var url = "https://player.twitch.tv/".concat(id, "&parent=").concat(getParentDomain());
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
    key: "twitch-".concat(id, "-").concat(idx),
    className: "videoWrapper",
    style: {
      position: 'relative',
      width: '100%',
      height: 0,
      paddingBottom: "".concat(aspectRatioPercent, "%")
    }
  }, /*#__PURE__*/_react["default"].createElement("iframe", (0, _extends2["default"])({
    title: "Twitch embedded player"
    // eslint-disable-next-line react/jsx-props-no-spreading
  }, iframeProps)));
}