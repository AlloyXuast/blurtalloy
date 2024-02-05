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
 * @type {{htmlReplacement: RegExp, main: RegExp, clip: RegExp}}
 */
var regex = {
  main: /https?:\/\/(?:www.)?twitch\.tv\/([a-zA-Z0-9-_]+)\/clip\/([a-zA-Z0-9-_]+)/i,
  clip: /https:\/\/clips\.twitch\.tv\/embed\?clip=([a-zA-Z0-9-_]+)/i
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
 * <iframe src="https://clips.twitch.tv/embed?clip=NastyVictoriousCheeseCoolCat-8LNzeiCE2_C9JlqO&parent=www.example.com" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe>
 *
 * @param url
 * @returns {boolean|*}
 */
function validateIframeUrl(url) {
  var match = url.match(regex.clip);
  if (match) {
    return "https://clips.twitch.tv/embed?clip=".concat(match[1], "&parent=").concat(getParentDomain());
  }
  return false;
}

/**
 * Rewrites the embedded URL to a normalized format
 * @param url
 * @returns {string|boolean}
 */
function normalizeEmbedUrl(url) {
  var match = url.match(regex.clip);
  if (match) {
    return "https://clips.twitch.tv/embed?clip=".concat(match[1]);
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
    id: m[2],
    url: m[0],
    canonical: m[0]
    // canonical: `https://clips.twitch.tv/embed?clip=${m[2]}`
  };
}
function embedNode(child, links /* images */) {
  try {
    var data = child.data;
    var twitchClip = extractMetadata(data);
    if (!twitchClip) return child;
    child.data = data.replace(twitchClip.url, "~~~ embed:".concat(twitchClip.id, " twclips ~~~"));
    if (links) links.add(twitchClip.canonical);
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
  var url = "https://clips.twitch.tv/embed?clip=".concat(id, "&parent=").concat(getParentDomain());
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
    key: "twitch-clip-".concat(id, "-").concat(idx),
    className: "videoWrapper",
    style: {
      position: 'relative',
      width: '100%',
      height: 0,
      paddingBottom: "".concat(aspectRatioPercent, "%")
    }
  }, /*#__PURE__*/_react["default"].createElement("iframe", (0, _extends2["default"])({
    title: "Twitch Clip embedded player"
    // eslint-disable-next-line react/jsx-props-no-spreading
  }, iframeProps)));
}