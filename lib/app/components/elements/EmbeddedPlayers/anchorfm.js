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
 * @type {{htmlReplacement: RegExp, contentId: RegExp, contentIdEmbed: RegExp}}
 */
var regex = {
  contentId: /^https:\/\/anchor\.fm\/?([a-zA-Z-0-9]+)\/episodes\/?([a-zA-Z-0-9\/]+)/i,
  contentIdEmbed: /^https:\/\/anchor\.fm\/?([a-zA-Z-0-9]+)\/embed\/episodes\/?([a-zA-Z-0-9\/]+)/i
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
 * <iframe src="https://player.twitch.tv/?channel=tfue" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe>
 * <iframe src="https://anchor.fm/the-nerve/embed/episodes/Ep-48-Poet--academic-Emily-Cullen-e1hrfei" height="102px" width="400px" frameborder="0" scrolling="no"></iframe>
 * @param url
 * @returns {boolean|*}
 */
function validateIframeUrl(url) {
  var match = url.match(regex.contentIdEmbed);
  if (match) {
    return "https://anchor.fm/".concat(match[1], "/embed/episodes/").concat(match[2]);
  }
  return false;
}

/**
 * Rewrites the embedded URL to a normalized format
 * @param url
 * @returns {string|boolean}
 */
function normalizeEmbedUrl(url) {
  var match = url.match(regex.contentIdEmbed);
  if (match && match.length >= 3) {
    return "https://anchor.fm/".concat(match[1], "/embed/episodes/").concat(match[2]);
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
  var m = data.match(regex.contentId);
  if (!m || m.length < 3) return null;
  return {
    id: "".concat(m[1], "/embed/episodes/").concat(m[2]),
    url: m[0],
    canonical: "https://anchor.fm/".concat(m[1], "/embed/episodes/").concat(m[2])
  };
}
function embedNode(child, links /* images */) {
  try {
    var data = child.data;
    var anchorfm = extractMetadata(data);
    if (!anchorfm) return child;
    child.data = data.replace(anchorfm.url, "~~~ embed:".concat(anchorfm.id, " anchorfm ~~~"));
    if (links) links.add(anchorfm.canonical);
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
  var url = "https://anchor.fm/".concat(id);
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
    height: '102px',
    frameBorder: '0',
    scrolling: 'no',
    allowFullScreen: 'allowFullScreen'
  };
  if (sandbox) {
    iframeProps.sandbox = sandbox;
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    key: "anchorfm-".concat(id, "-").concat(idx),
    style: {
      position: 'relative',
      width: '100%',
      height: '102px',
      paddingBottom: '2%'
    }
  }, /*#__PURE__*/_react["default"].createElement("iframe", (0, _extends2["default"])({
    title: "AnchorFm embedded player"
    // eslint-disable-next-line react/jsx-props-no-spreading
  }, iframeProps)));
}