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
  sanitize: /^https:\/\/emb\.d\.tube\/#!\/([a-zA-Z0-9-.\/]+)$/,
  main: /https:\/\/(?:emb\.)?(?:d\.tube\/#!\/(?:v\/)?)([a-zA-Z0-9\_\-.\/]*)/,
  contentId: /(?:d\.tube\/#!\/(?:v\/)?([a-zA-Z0-9\-.\/]*))+/
};
var _default = exports["default"] = regex;
var sandboxConfig = exports.sandboxConfig = {
  useSandbox: true,
  sandboxAttributes: ['allow-scripts', 'allow-same-origin', 'allow-presentation']
};
function genIframeMd(idx, dtubeId, w, h) {
  var url = "https://emb.d.tube/#!/".concat(dtubeId);
  return /*#__PURE__*/_react["default"].createElement("div", {
    key: "dtube-".concat(dtubeId, "-").concat(idx),
    className: "videoWrapper"
  }, /*#__PURE__*/_react["default"].createElement("iframe", {
    title: "DTube embedded player",
    key: idx,
    src: url,
    width: w,
    height: h,
    frameBorder: "0",
    allowFullScreen: true,
    sandbox: sandboxConfig.useSandbox ? sandboxConfig.sandboxAttributes ? sandboxConfig.sandboxAttributes.join(' ') : true : ''
  }));
}

// <iframe title="DTube embedded player" src="https://emb.d.tube/#!/lemwong/QmQqxBCkoVusMRwP6D9oBMRQdASFzABdKQxE7xLysfmsR6" width="640" height="360" frameborder="0" allowfullscreen=""></iframe>
function validateIframeUrl(url) {
  var match = url.match(regex.sanitize);
  if (match) {
    return url;
  }
  return false;
}
function normalizeEmbedUrl(url) {
  var match = url.match(regex.contentId);
  if (match && match.length >= 2) {
    return "https://emb.d.tube/#!/".concat(match[1]);
  }
  return false;
}
function extractMetadata(data) {
  if (!data) return null;
  var m = data.match(regex.main);
  if (!m || m.length < 2) return null;
  return {
    id: m[1],
    url: m[0],
    canonical: "https://emb.d.tube/#!/".concat(m[1])
  };
}
function embedNode(child, links /* images */) {
  try {
    var data = child.data;
    var dtube = extractMetadata(data);
    if (!dtube) return child;
    child.data = data.replace(dtube.url, "~~~ embed:".concat(dtube.id, " dtube ~~~"));
    if (links) links.add(dtube.canonical);
  } catch (error) {
    console.log(error);
  }
  return child;
}