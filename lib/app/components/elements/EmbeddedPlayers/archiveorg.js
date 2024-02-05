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
  sanitize: /^https:\/\/archive\.org\/embed\/(.*)/i,
  main: /^https:\/\/archive\.org\/details\/(.*)/i
};
var _default = exports["default"] = regex;
function getIframeDimensions() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  // Since we can't tell the difference between video and audio embed players from the URL, lets use the width/height
  // provided by archive.org's iframe HTML code.
  var large = args[0],
    width = args[2],
    height = args[3];
  if (width && height) {
    return {
      width: width,
      height: height
    };
  }
  return {
    width: large ? 640 : 480,
    height: large ? 360 : 270
  };
}

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
 * <iframe src="https://archive.org/embed/namaz-nasil-kilinir" width="640" height="480" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe>
 * <iframe src="https://archive.org/embed/geometry_dash_1.9" width="500" height="140" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe>
 * @param url
 * @returns {boolean|*}
 */
function validateIframeUrl(url) {
  var match = url.match(regex.sanitize);
  if (!match || match.length !== 2) {
    return false;
  }
  return 'https://archive.org/embed/' + match[1];
}

/**
 * Rewrites the embedded URL to a normalized format
 * @param url
 * @returns {string|boolean}
 */
function normalizeEmbedUrl(url) {
  var match = url.match(regex.sanitize);
  if (match && match.length >= 2) {
    return "https://archive.org/embed/".concat(match[1]);
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
    id: m[1],
    url: m[0],
    startTime: startTime ? startTime[1] : 0,
    canonical: "https://archive.org/embed/".concat(m[1])
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
    var archiveorg = extractMetadata(data);
    if (!archiveorg) return child;
    child.data = data.replace(archiveorg.url, "~~~ embed:".concat(archiveorg.id, " archiveorg ~~~"));
    if (links) {
      links.add(archiveorg.canonical);
    }
    if (links) links.add(archiveorg.canonical);
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
 * @param startTime
 * @returns {*}
 */
function genIframeMd(idx, id, width, height) {
  var url = "https://archive.org/embed/".concat(id);
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
    webkitallowfullscreen: 'webkitallowfullscreen',
    mozallowfullscreen: 'mozallowfullscreen',
    allowFullScreen: 'allowFullScreen'
  };
  if (sandbox) {
    iframeProps.sandbox = sandbox;
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    key: "archiveorg-".concat(id, "-").concat(idx),
    className: "videoWrapper",
    style: {
      position: 'relative',
      width: '100%',
      height: 0,
      paddingBottom: "".concat(aspectRatioPercent, "%")
    }
  }, /*#__PURE__*/_react["default"].createElement("iframe", (0, _extends2["default"])({
    title: "Archive.org embedded player"
    // eslint-disable-next-line react/jsx-props-no-spreading
  }, iframeProps)));
}