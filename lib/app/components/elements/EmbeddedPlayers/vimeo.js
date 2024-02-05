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
  sanitize: /^(https?:)?\/\/player.vimeo.com\/video\/([0-9]*)/i,
  main: /https?:\/\/(?:vimeo.com\/|player.vimeo.com\/video\/)([0-9]+)\/?(#t=((\d+)s?))?\/?/,
  contentId: /(?:vimeo.com\/|player.vimeo.com\/video\/)([0-9]+)/
};
var _default = exports["default"] = regex;
var sandboxConfig = exports.sandboxConfig = {
  useSandbox: false,
  sandboxAttributes: []
};

// <iframe src="https://player.vimeo.com/video/179213493" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
function validateIframeUrl(url) {
  var match = url.match(regex.sanitize);
  if (!match || match.length !== 3) {
    return false;
  }
  return 'https://player.vimeo.com/video/' + match[2];
}
function normalizeEmbedUrl(url) {
  var match = url.match(regex.contentId);
  if (match && match.length >= 2) {
    return "https://player.vimeo.com/video/".concat(match[1]);
  }
  return false;
}
function extractMetadata(data) {
  if (!data) return null;
  var m = data.match(regex.main);
  if (!m || m.length < 2) return null;
  var startTime = m.input.match(/t=(\d+)s?/);
  return {
    id: m[1],
    url: m[0],
    startTime: startTime ? startTime[1] : 0,
    canonical: "https://player.vimeo.com/video/".concat(m[1])
    // thumbnail: requires a callback - http://stackoverflow.com/questions/1361149/get-img-thumbnails-from-vimeo
  };
}
function embedNode(child, links /* images */) {
  try {
    var data = child.data;
    var vimeo = extractMetadata(data);
    if (!vimeo) return child;
    var vimeoRegex = new RegExp("".concat(vimeo.url, "(#t=").concat(vimeo.startTime, "s?)?"));
    if (vimeo.startTime > 0) {
      child.data = data.replace(vimeoRegex, "~~~ embed:".concat(vimeo.id, " vimeo ").concat(vimeo.startTime, " ~~~"));
    } else {
      child.data = data.replace(vimeoRegex, "~~~ embed:".concat(vimeo.id, " vimeo ~~~"));
    }
    if (links) links.add(vimeo.canonical);
    // if(images) images.add(vimeo.thumbnail) // not available
  } catch (error) {
    console.log(error);
  }
  return child;
}
function genIframeMd(idx, id, w, h, startTime) {
  var url = "https://player.vimeo.com/video/".concat(id, "#t=").concat(startTime, "s");
  return /*#__PURE__*/_react["default"].createElement("div", {
    key: "vimeo-".concat(id, "-").concat(idx),
    className: "videoWrapper"
  }, /*#__PURE__*/_react["default"].createElement("iframe", {
    title: "Vimeo embedded player",
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