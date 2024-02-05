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
var _react = _interopRequireDefault(require("react"));
var regex = {
  sanitize: /^(https?:)?\/\/fast.wistia.com\/embed\/iframe\/([a-z0-9]*)/i,
  main: /(?:https?:\/\/([a-z0-9\-.\/]*).wistia.com\/medias\/)([a-z0-9]+)/,
  contentId: /(?:([a-z0-9\-.\/]*).wistia.com\/medias\/)([a-z0-9]+)/
};
var _default = exports["default"] = regex;
var sandboxConfig = exports.sandboxConfig = {
  useSandbox: true,
  sandboxAttributes: ['allow-scripts', 'allow-same-origin', 'allow-popups']
};
function validateIframeUrl(url) {
  var match = url.match(regex.sanitize);
  if (!match || match.length !== 3) {
    return false;
  }
  return match[0];
}
function normalizeEmbedUrl(url) {
  var match = url.match(regex.contentId);
  if (match && match.length >= 2) {
    return "https://fast.wistia.com/embed/iframe/".concat(match[2]);
  }
  return false;
}
function extractMetadata(data) {
  if (!data) return null;
  var m = data.match(regex.main);
  if (!m || m.length < 2) return null;
  return {
    id: m[2],
    url: m[0],
    canonical: "https://fast.wistia.com/embed/iframe/".concat(m[2])
  };
}
function embedNode(child, links /* images */) {
  try {
    var data = child.data;
    var wistia = extractMetadata(data);
    if (!wistia) return child;
    var wistiaRegex = new RegExp("".concat(wistia.url, "?"));
    child.data = data.replace(wistiaRegex, "~~~ embed:".concat(wistia.id, " wistia ~~~"));
    if (links) links.add(wistia.canonical);
  } catch (error) {
    console.log(error);
  }
  return child;
}
function genIframeMd(idx, id, w, h) {
  var url = "https://fast.wistia.com/embed/iframe/".concat(id);
  return /*#__PURE__*/_react["default"].createElement("div", {
    key: "wistia-".concat(id, "-").concat(idx),
    className: "videoWrapper"
  }, /*#__PURE__*/_react["default"].createElement("iframe", {
    title: "Wistia embedded player",
    src: url,
    width: w,
    height: h,
    frameBorder: "0",
    webkitallowfullscreen: true,
    mozallowfullscreen: true,
    allowFullScreen: true,
    sandbox: sandboxConfig.useSandbox ? sandboxConfig.sandboxAttributes ? sandboxConfig.sandboxAttributes.join(' ') : true : ''
  }));
}