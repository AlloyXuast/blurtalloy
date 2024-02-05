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
var regex = {
  sanitize: /^https:\/\/w\.soundcloud\.com\/player\/.*?url=(.+?)&.*/i,
  plainUrl: /https:\/\/soundcloud\.com\/([a-zA-z-_0-9]+)\/([a-zA-Z0-9-_]+)/i
};
var _default = exports["default"] = regex;
var sandboxConfig = exports.sandboxConfig = {
  useSandbox: true,
  sandboxAttributes: ['allow-scripts', 'allow-same-origin', 'allow-popups']
};

// <iframe width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/257659076&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>
function validateIframeUrl(url) {
  var match = url.match(regex.sanitize);
  if (!match || match.length !== 2) {
    return false;
  }
  return "https://w.soundcloud.com/player/?url=".concat(match[1], "&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&visual=true");
}

/**
 * Rewrites the embedded URL to a normalized format
 * @param url
 * @returns {string|boolean}
 */
function normalizeEmbedUrl(url) {
  var match = url.match(regex.plainUrl);
  if (match && match.length >= 3) {
    return "https://soundcloud.com/".concat(match[1], "/").concat(match[2]);
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
  var m = data.match(regex.plainUrl);
  if (!m || m.length < 2) return null;
  return {
    id: "".concat(m[1], "/").concat(m[2]),
    url: m[0],
    canonical: m[0]
  };
}
function embedNode(child, links /* images */) {
  try {
    var data = child.data;
    var soundcloud = extractMetadata(data);
    if (!soundcloud) return child;
    child.data = data.replace(soundcloud.url, "~~~ embed:".concat(soundcloud.id, " soundcloud ~~~"));
    if (links) links.add(soundcloud.canonical);
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
  var url = "https://soundcloud.com/".concat(id);
  var iframeUrl = 'https://w.soundcloud.com/player/?url=' + url + '&amp;color=ff5500' + '&amp;auto_play=false' + '&amp;hide_related=true' + '&amp;show_reposts=false' + '&amp;show_user=true' + '&amp;show_comments=false';
  var iframeProps = {
    src: iframeUrl,
    width: width,
    height: '166px',
    frameBorder: '0',
    scrolling: 'no',
    allowFullScreen: false
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    key: "soundcloud-".concat(id, "-").concat(idx),
    style: {
      position: 'relative',
      width: '100%',
      height: '166px',
      paddingBottom: '2%'
    }
  }, /*#__PURE__*/_react["default"].createElement("iframe", (0, _extends2["default"])({
    title: "Soundcloud Embedded Player"
  }, iframeProps)));
}