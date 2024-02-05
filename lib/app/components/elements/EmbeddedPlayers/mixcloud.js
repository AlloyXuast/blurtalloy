"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.embedNode = embedNode;
exports.genIframeMd = genIframeMd;
exports.getIframeDimensions = getIframeDimensions;
exports.normalizeEmbedUrl = normalizeEmbedUrl;
exports.sandboxConfig = void 0;
exports.validateIframeUrl = validateIframeUrl;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
/**
 * Regular expressions for detecting and validating provider URLs
 * @type {{htmlReplacement: RegExp, main: RegExp, sanitize: RegExp}}
 */
var regex = {
  main: /https:\/\/www\.mixcloud\.com(\/[^/]+\/[^/]+)/i,
  sanitize: /^https:\/\/www\.mixcloud\.com\/widget\/iframe\/.*?feed=(.*)/i
};
var _default = exports["default"] = regex;
function getIframeDimensions() {
  return {
    width: '100%',
    height: '120'
  };
}

/**
 * Configuration for HTML iframe's `sandbox` attribute
 * @type {useSandbox: boolean, sandboxAttributes: string[]}
 */
var sandboxConfig = exports.sandboxConfig = {
  useSandbox: true,
  sandboxAttributes: ['allow-scripts', 'allow-same-origin', 'allow-popups']
};

/**
 * Check if the iframe code in the post editor is to an allowed URL
 * <iframe width="100%" height="120" src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2FMagneticMagazine%2Fambient-meditations-vol-21-anane%2F" frameborder="0" ></iframe>
 * @param url
 * @returns {boolean|*}
 */
function validateIframeUrl(url) {
  var match = url.match(regex.sanitize);
  if (!match || match.length !== 2) {
    return false;
  }
  return "https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=".concat(match[1]);
}

//////

/**
 * Rewrites the embedded URL to a normalized format
 * @param url
 * @returns {string|boolean}
 */
function normalizeEmbedUrl(url) {
  var match = url.match(regex.contentId);
  if (match && match.length >= 2) {
    return "https://www.mixcloud.com/widget/iframe/?feed=".concat(match[1]);
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
  if (!m || m.length < 2) return null;
  var startTime = m.input.match(/t=(\d+)s?/);
  return {
    id: "".concat(m[1], "/"),
    url: m[0],
    startTime: startTime ? startTime[1] : 0,
    canonical: "https://open.mixcloud.com/playlist/".concat(m[1])
  };
}

/**
 * Replaces the URL with a custom Markdown for embedded players
 * @param child
 * @param links
 * @returns {*}
 */
function embedNode(child, links /*images*/) {
  try {
    var data = child.data;
    var mixcloud = extractMetadata(data);
    if (!mixcloud) return child;
    child.data = data.replace(mixcloud.url, "~~~ embed:".concat(mixcloud.id, " mixcloud ~~~"));
    if (links) links.add(mixcloud.canonical);
    // if(images) images.add(mixcloud.thumbnail) // not available
  } catch (error) {
    console.log(error);
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
function genIframeMd(idx, id) {
  var width = '100%';
  var height = 120;
  var url = "https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=".concat(id);
  var sandbox = sandboxConfig.useSandbox;
  if (sandbox) {
    if (Object.prototype.hasOwnProperty.call(sandboxConfig, 'sandboxAttributes')) {
      sandbox = sandboxConfig.sandboxAttributes.join(' ');
    }
  }
  var iframeProps = {
    src: url,
    width: width,
    height: height,
    frameBorder: '0',
    webkitallowfullscreen: 'webkitallowfullscreen',
    mozallowfullscreen: 'mozallowfullscreen',
    allowFullScreen: 'allowFullScreen'
  };
  if (sandbox) {
    iframeProps.sandbox = sandbox;
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    key: "mixcloud-".concat(id, "-").concat(idx),
    className: "iframeWrapper"
  }, /*#__PURE__*/_react["default"].createElement("iframe", (0, _extends2["default"])({
    title: "mixcloud embedded player"
    // eslint-disable-next-line react/jsx-props-no-spreading
  }, iframeProps)));
}