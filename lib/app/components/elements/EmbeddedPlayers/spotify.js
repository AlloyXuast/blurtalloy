"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.embedNode = embedNode;
exports.genIframeMd = genIframeMd;
exports.getIframeDimensions = getIframeDimensions;
exports.sandboxConfig = void 0;
exports.validateIframeUrl = validateIframeUrl;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
/**
 * Regular expressions for detecting and validating provider URLs
 * @type {{htmlReplacement: RegExp, main: RegExp, sanitize: RegExp}}
 */
var regex = {
  main: /(?:https?:\/\/(?:(?:open.spotify.com\/(playlist|show|episode|album|track|artist)\/(.*))))/i,
  sanitize: /^https:\/\/open\.spotify\.com\/(embed|embed-podcast)\/(playlist|show|episode|album|track|artist)\/(.*)/i
};
var _default = exports["default"] = regex;
function getIframeDimensions() {
  return {
    width: '100%',
    height: '240'
  };
}

/**
 * Configuration for HTML iframe's `sandbox` attribute
 * @type {useSandbox: boolean, sandboxAttributes: string[]}
 */
var sandboxConfig = exports.sandboxConfig = {
  useSandbox: true,
  sandboxAttributes: ['allow-scripts', 'allow-same-origin', 'allow-popups', 'allow-forms']
};

/**
 * Check if the iframe code in the post editor is to an allowed URL
 * @param url
 * @returns {boolean|*}
 */
function validateIframeUrl(url) {
  var match = url.match(regex.sanitize);
  if (!match || match.length !== 4) {
    return false;
  }
  return "https://open.spotify.com/".concat(match[1], "/").concat(match[2], "/").concat(match[3]);
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
  var embed;
  if (m[1] === 'show' || m[1] === 'episode') {
    embed = 'embed-podcast';
  } else {
    embed = 'embed';
  }
  return {
    id: "".concat(embed, "/").concat(m[1], "/").concat(m[2]),
    url: m[0],
    startTime: startTime ? startTime[1] : 0,
    canonical: "https://open.spotify.com/".concat(m[1], "/").concat(m[2])
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
    var spotify = extractMetadata(data);
    if (!spotify) return child;
    child.data = data.replace(spotify.url, "~~~ embed:".concat(spotify.id, " spotify ~~~"));
    if (links) links.add(spotify.canonical);
    // if(images) images.add(spotify.thumbnail) // not available
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
function genIframeMd(idx, id, width, height) {
  var url = "https://open.spotify.com/".concat(id);
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
    key: "spotify-".concat(id, "-").concat(idx),
    className: "iframeWrapper"
  }, /*#__PURE__*/_react["default"].createElement("iframe", (0, _extends2["default"])({
    title: "spotify embedded player"
    // eslint-disable-next-line react/jsx-props-no-spreading
  }, iframeProps)));
}