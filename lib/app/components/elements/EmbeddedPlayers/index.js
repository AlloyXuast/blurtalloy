"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.embedNode = embedNode;
exports.generateMd = generateMd;
exports.normalizeEmbedUrl = normalizeEmbedUrl;
exports.preprocessHtml = preprocessHtml;
exports.validateIframeUrl = validateIframeUrl;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _dtube = require("app/components/elements/EmbeddedPlayers/dtube");
var _twitch = require("app/components/elements/EmbeddedPlayers/twitch");
var _vimm = require("app/components/elements/EmbeddedPlayers/vimm");
var _twitchClips = require("app/components/elements/EmbeddedPlayers/twitch-clips");
var _lbry = require("app/components/elements/EmbeddedPlayers/lbry");
var _wistia = require("app/components/elements/EmbeddedPlayers/wistia");
var _youtube = require("app/components/elements/EmbeddedPlayers/youtube");
var _vimeo = require("app/components/elements/EmbeddedPlayers/vimeo");
var _threespeak = require("app/components/elements/EmbeddedPlayers/threespeak");
var _twitter = require("app/components/elements/EmbeddedPlayers/twitter");
var _anchorfm = require("app/components/elements/EmbeddedPlayers/anchorfm");
var _odysee = require("app/components/elements/EmbeddedPlayers/odysee");
var _soundcloud = require("app/components/elements/EmbeddedPlayers/soundcloud");
var _gist = require("app/components/elements/EmbeddedPlayers/gist");
var _archiveorg = require("app/components/elements/EmbeddedPlayers/archiveorg");
var _mixcloud = require("app/components/elements/EmbeddedPlayers/mixcloud");
var _spotify = require("app/components/elements/EmbeddedPlayers/spotify");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } // import {
//   normalizeEmbedUrl as normalizeCodeBlockEmbedUrl,
//   genIframeMd as genCodeBlockIframeMd,
//   embedNode as embedCodeBlockNode
// } from 'app/components/elements/EmbeddedPlayers/codeblock'
var supportedProviders = [_objectSpread({
  id: 'dtube',
  validateIframeUrlFn: _dtube.validateIframeUrl,
  normalizeEmbedUrlFn: _dtube.normalizeEmbedUrl,
  embedNodeFn: _dtube.embedNode,
  genIframeMdFn: _dtube.genIframeMd
}, _dtube.sandboxConfig), _objectSpread({
  id: 'twitch',
  validateIframeUrlFn: _twitch.validateIframeUrl,
  normalizeEmbedUrlFn: _twitch.normalizeEmbedUrl,
  embedNodeFn: _twitch.embedNode,
  genIframeMdFn: _twitch.genIframeMd
}, _twitch.sandboxConfig), _objectSpread({
  id: 'vimm',
  validateIframeUrlFn: _vimm.validateIframeUrl,
  normalizeEmbedUrlFn: _vimm.normalizeEmbedUrl,
  embedNodeFn: _vimm.embedNode,
  genIframeMdFn: _vimm.genIframeMd
}, _vimm.sandboxConfig), // {
//   id: 'codeblock',
//   // validateIframeUrlFn: validateTwitchIframeUrl,
//   normalizeEmbedUrlFn: normalizeCodeBlockEmbedUrl,
//   embedNodeFn: embedCodeBlockNode,
//   genIframeMdFn: genCodeBlockIframeMd,
//   ...sandboxConfigTwitch
// },
_objectSpread({
  id: 'twclips',
  validateIframeUrlFn: _twitchClips.validateIframeUrl,
  normalizeEmbedUrlFn: _twitchClips.normalizeEmbedUrl,
  embedNodeFn: _twitchClips.embedNode,
  genIframeMdFn: _twitchClips.genIframeMd
}, _twitchClips.sandboxConfig), _objectSpread({
  id: 'anchorfm',
  validateIframeUrlFn: _anchorfm.validateIframeUrl,
  normalizeEmbedUrlFn: _anchorfm.normalizeEmbedUrl,
  embedNodeFn: _anchorfm.embedNode,
  genIframeMdFn: _anchorfm.genIframeMd
}, _anchorfm.sandboxConfig), _objectSpread({
  id: 'youtube',
  validateIframeUrlFn: _youtube.validateIframeUrl,
  normalizeEmbedUrlFn: _youtube.normalizeEmbedUrl,
  embedNodeFn: _youtube.embedNode,
  genIframeMdFn: _youtube.genIframeMd
}, _youtube.sandboxConfig), _objectSpread({
  id: 'vimeo',
  validateIframeUrlFn: _vimeo.validateIframeUrl,
  normalizeEmbedUrlFn: _vimeo.normalizeEmbedUrl,
  embedNodeFn: _vimeo.embedNode,
  genIframeMdFn: _vimeo.genIframeMd
}, _vimeo.sandboxConfig), _objectSpread({
  id: 'threespeak',
  validateIframeUrlFn: _threespeak.validateIframeUrl,
  normalizeEmbedUrlFn: _threespeak.normalizeEmbedUrl,
  embedNodeFn: _threespeak.embedNode,
  genIframeMdFn: _threespeak.genIframeMd
}, _threespeak.sandboxConfig), _objectSpread({
  id: 'lbry',
  validateIframeUrlFn: _lbry.validateIframeUrl,
  normalizeEmbedUrlFn: null,
  embedNodeFn: null,
  genIframeMdFn: null
}, _lbry.sandboxConfig), {
  id: 'twitter',
  validateIframeUrlFn: _twitter.validateIframeUrl,
  normalizeEmbedUrlFn: _twitter.normalizeEmbedUrl,
  embedNodeFn: _twitter.embedNode,
  genIframeMdFn: _twitter.genIframeMd
}, _objectSpread({
  id: 'wistia',
  validateIframeUrlFn: _wistia.validateIframeUrl,
  normalizeEmbedUrlFn: _wistia.normalizeEmbedUrl,
  embedNodeFn: _wistia.embedNode,
  genIframeMdFn: _wistia.genIframeMd
}, _wistia.sandboxConfig), _objectSpread({
  id: 'odysee',
  validateIframeUrlFn: _odysee.validateIframeUrl,
  normalizeEmbedUrlFn: null,
  embedNodeFn: null,
  genIframeMdFn: null
}, _odysee.sandboxConfig), _objectSpread({
  id: 'spotify',
  validateIframeUrlFn: _spotify.validateIframeUrl,
  normalizeEmbedUrlFn: null,
  embedNodeFn: _spotify.embedNode,
  genIframeMdFn: _spotify.genIframeMd
}, _spotify.sandboxConfig), _objectSpread({
  id: 'gist',
  validateIframeUrlFn: _gist.extractMetadata,
  normalizeEmbedUrlFn: _gist.extractMetadataFromEmbedCode,
  embedNodeFn: _gist.embedNode,
  genIframeMdFn: _gist.genIframeMd
}, _gist.sandboxConfig), _objectSpread({
  id: 'soundcloud',
  validateIframeUrlFn: _soundcloud.validateIframeUrl,
  normalizeEmbedUrlFn: _soundcloud.normalizeEmbedUrl,
  embedNodeFn: _soundcloud.embedNode,
  genIframeMdFn: _soundcloud.genIframeMd
}, _soundcloud.sandboxConfig), _objectSpread({
  id: 'mixcloud',
  validateIframeUrlFn: _mixcloud.validateIframeUrl,
  normalizeEmbedUrlFn: _mixcloud.normalizeEmbedUrl,
  embedNodeFn: _mixcloud.embedNode,
  genIframeMdFn: _mixcloud.genIframeMd
}, _mixcloud.sandboxConfig), _objectSpread({
  id: 'archiveorg',
  validateIframeUrlFn: _archiveorg.validateIframeUrl,
  normalizeEmbedUrlFn: _archiveorg.normalizeEmbedUrl,
  embedNodeFn: _archiveorg.embedNode,
  genIframeMdFn: _archiveorg.genIframeMd
}, _archiveorg.sandboxConfig)];
var _default = exports["default"] = supportedProviders;
function validateIframeUrl(url) {
  for (var pi = 0; pi < supportedProviders.length; pi += 1) {
    var provider = supportedProviders[pi];
    var validUrl = provider.validateIframeUrlFn(url);
    if (validUrl === true) {
      console.log("Found a valid ".concat(provider.id, " iframe URL"));
      return {
        providerId: provider.id,
        sandboxAttributes: provider.sandboxAttributes || [],
        useSandbox: provider.useSandbox,
        validUrl: validUrl
      };
    }
  }
  return false;
}
function normalizeEmbedUrl(url) {
  for (var pi = 0; pi < supportedProviders.length; pi += 1) {
    var provider = supportedProviders[pi];
    if (typeof provider.normalizeEmbedUrlFn === 'function') {
      var validEmbedUrl = provider.normalizeEmbedUrlFn(url);
      if (validEmbedUrl !== false) {
        console.log("Found a valid ".concat(provider.id, " embedded URL"));
        return validEmbedUrl;
      }
    }
  }
  return false;
}
function embedNode(child, links, images) {
  for (var pi = 0; pi < supportedProviders.length; pi += 1) {
    var provider = supportedProviders[pi];
    if (typeof provider.embedNodeFn === 'function') {
      child = provider.embedNodeFn(child, links, images);
    }
  }
  return child;
}
function getProviderById(id) {
  for (var pi = 0; pi < supportedProviders.length; pi += 1) {
    var provider = supportedProviders[pi];
    if (provider.id === id) {
      return provider;
    }
  }
  return null;
}
function getProviderIds() {
  return supportedProviders.map(function (o) {
    return o.id;
  });
}
function generateMd(section, idx, large) {
  var markdown = null;
  var supportedProvidersIds = getProviderIds();
  var regexString = "^([A-Za-z0-9\\?\\=\\_\\-\\/\\.]+) (".concat(supportedProvidersIds.join('|'), ")\\s?(.*?) ~~~");
  var regex = new RegExp(regexString);
  var match = section.match(regex);
  if (match && match.length >= 3) {
    var id = match[1];
    var type = match[2];
    var metadataString = match[3];
    var metadata;
    if (metadataString.indexOf('metadata:') === -1) {
      metadata = match[3] ? parseInt(match[3]) : 0;
    } else {
      metadata = metadataString.substring(9);
    }
    var w = large ? 640 : 480;
    var h = large ? 360 : 270;
    var provider = getProviderById(type);
    if (provider) {
      markdown = provider.genIframeMdFn(idx, id, w, h, metadata);
    } else {
      console.error('MarkdownViewer unknown embed type', type);
    }
    if (match[3]) {
      section = section.substring("".concat(id, " ").concat(type, " ").concat(metadataString, " ~~~").length);
    } else {
      section = section.substring("".concat(id, " ").concat(type, " ~~~").length);
    }
    return {
      section: section,
      markdown: markdown
    };
  }
  return null;
}
function preprocessHtml(html) {
  html = (0, _threespeak.preprocessHtml)(html);
  html = (0, _twitter.preprocessHtml)(html);
  html = (0, _gist.preprocessHtml)(html);
  return html;
}