"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.embedNode = embedNode;
exports.extractMetadata = extractMetadata;
exports.genIframeMd = genIframeMd;
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
  sanitize: /^(https?:)?\/\/www\.youtube\.com\/(embed|shorts)\/.*/i,
  // main: new RegExp(urlSet({ domain: '(?:(?:.*.)?youtube.com|youtu.be)' }), flags),
  // eslint-disable-next-line no-useless-escape
  main: /(?:https?:\/\/)(?:www\.)?(?:(?:youtube\.com\/watch\?v=)|(?:youtu.be\/)|(?:youtube\.com\/(embed|shorts)\/))([A-Za-z0-9_\-]+)[^ ]*/i,
  // eslint-disable-next-line no-useless-escape
  contentId: /(?:(?:youtube\.com\/watch\?v=)|(?:youtu.be\/)|(?:youtube\.com\/(embed|shorts)\/))([A-Za-z0-9_\-]+)/i
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
 * <iframe width="560" height="315" src="https://www.youtube.com/embed/KOnk7Nbqkhs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
 * @param url
 * @returns {boolean|*}
 */
function validateIframeUrl(url) {
  var match = url.match(regex.sanitize);
  if (match) {
    // strip query string (yt: autoplay=1,controls=0,showinfo=0, etc)
    return url.replace(/\?.+$/, '');
  }
  return false;
}

/**
 * Rewrites the embedded URL to a normalized format
 * @param url
 * @returns {string|boolean}
 */
function normalizeEmbedUrl(url) {
  var match = url.match(regex.contentId);
  if (match && match.length >= 2) {
    return "https://youtube.com/embed/".concat(match[1]);
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
  var m1 = data.match(regex.main);
  var url = m1 ? m1[0] : null;
  if (!url) return null;
  var m2 = url.match(regex.contentId);
  var id = m2 && m2.length >= 2 ? m2[2] : null;
  if (!id) return null;
  var startTime = url.match(/t=(\d+)s?/);
  return {
    id: id,
    url: url,
    canonical: url,
    startTime: startTime ? startTime[1] : 0,
    thumbnail: 'https://img.youtube.com/vi/' + id + '/0.jpg'
  };
}

/**
 * Replaces the URL with a custom Markdown for embedded players
 * @param child
 * @param links
 * @returns {*}
 */
function embedNode(child, links, images) {
  try {
    var yt = extractMetadata(child.data);
    if (!yt) return child;
    if (yt.startTime) {
      child.data = child.data.replace(yt.url, "~~~ embed:".concat(yt.id, " youtube ").concat(yt.startTime, " ~~~"));
    } else {
      child.data = child.data.replace(yt.url, "~~~ embed:".concat(yt.id, " youtube ~~~"));
    }
    if (links) links.add(yt.url);
    if (images) images.add(yt.thumbnail);
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
  var startTime = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var url = "https://www.youtube.com/embed/".concat(id, "?enablejsapi=0&rel=0&origin=https://").concat(getParentDomain(), "&start=").concat(startTime);
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
    key: "youtube-".concat(id, "-").concat(idx),
    className: "videoWrapper",
    style: {
      position: 'relative',
      width: '100%',
      height: 0,
      paddingBottom: "".concat(aspectRatioPercent, "%")
    }
  }, /*#__PURE__*/_react["default"].createElement("iframe", (0, _extends2["default"])({
    title: "Youtube embedded player"
    // eslint-disable-next-line react/jsx-props-no-spreading
  }, iframeProps)));
}