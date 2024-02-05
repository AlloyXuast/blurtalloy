"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
exports.getPhishingWarningMessage = exports.getExternalLinkWarningMessage = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _counterpart = _interopRequireDefault(require("counterpart"));
var _Links = _interopRequireWildcard(require("app/utils/Links"));
var _ChainValidation = require("app/utils/ChainValidation");
var _ProxifyUrl = require("app/utils/ProxifyUrl");
var Phishing = _interopRequireWildcard(require("app/utils/Phishing"));
var _EmbeddedPlayers = require("app/components/elements/EmbeddedPlayers");
var _youtube = require("app/components/elements/EmbeddedPlayers/youtube");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var xmldom = require('xmldom');
var getPhishingWarningMessage = exports.getPhishingWarningMessage = function getPhishingWarningMessage() {
  return (0, _counterpart["default"])('g.phishy_message');
};
var getExternalLinkWarningMessage = exports.getExternalLinkWarningMessage = function getExternalLinkWarningMessage() {
  return (0, _counterpart["default"])('g.external_link_message');
};
var noop = function noop() {};
var DOMParser = new xmldom.DOMParser({
  errorHandler: {
    warning: noop,
    error: noop
  }
});
var XMLSerializer = new xmldom.XMLSerializer();

/**
 * Functions performed by HTMLReady
 *
 * State reporting
 *  - hashtags: collect all #tags in content
 *  - usertags: collect all @mentions in content
 *  - htmltags: collect all html <tags> used (for validation)
 *  - images: collect all image URLs in content
 *  - links: collect all href URLs in content
 *
 * Mutations
 *  - link()
 *    - ensure all <a> href's begin with a protocol. prepend https:// otherwise.
 *  - iframe()
 *    - wrap all <iframe>s in <div class="videoWrapper"> for responsive sizing
 *  - img()
 *    - convert any <img> src IPFS prefixes to standard URL
 *    - change relative protocol to https://
 *  - linkifyNode()
 *    - scans text content to be turned into rich content
 *    - embedYouTubeNode()
 *      - identify plain youtube URLs and prep them for "rich embed"
 *    - linkify()
 *      - scan text for:
 *        - #tags, convert to <a> links
 *        - @mentions, convert to <a> links
 *        - naked URLs
 *          - if img URL, normalize URL and convert to <img> tag
 *          - otherwise, normalize URL and convert to <a> link
 *  - proxifyImages()
 *    - prepend proxy URL to any non-local <img> src's
 *
 * We could implement 2 levels of HTML mutation for maximum reuse:
 *  1. Normalization of HTML - non-proprietary, pre-rendering cleanup/normalization
 *    - (state reporting done at this level)
 *    - normalize URL protocols
 *    - convert naked URLs to images/links
 *    - convert embeddable URLs to <iframe>s
 *    - basic sanitization?
 *  2. Steemit.com Rendering - add in proprietary Steemit.com functions/links
 *    - convert <iframe>s to custom objects
 *    - linkify #tags and @mentions
 *    - proxify images
 *
 * TODO:
 *  - change ipfsPrefix(url) to normalizeUrl(url)
 *    - rewrite IPFS prefixes to valid URLs
 *    - schema normalization
 *    - gracefully handle protocols like ftp, mailto
 */

/** Split the HTML on top-level elements. This allows react to compare separately, preventing excessive re-rendering.
 * Used in MarkdownViewer.jsx
 */
// export function sectionHtml (html) {
//   const doc = DOMParser.parseFromString(html, 'text/html')
//   const sections = Array(...doc.childNodes).map(child => XMLSerializer.serializeToString(child))
//   return sections
// }

/** Embed videos, link mentions and hashtags, etc...
    If hideImages and mutate is set to true all images will be replaced
    by <pre> elements containing just the image url.
*/
function _default(html) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$mutate = _ref.mutate,
    mutate = _ref$mutate === void 0 ? true : _ref$mutate,
    _ref$hideImages = _ref.hideImages,
    hideImages = _ref$hideImages === void 0 ? false : _ref$hideImages,
    _ref$hideLinks = _ref.hideLinks,
    hideLinks = _ref$hideLinks === void 0 ? false : _ref$hideLinks;
  var state = {
    mutate: mutate
  };
  state.hashtags = new Set();
  state.usertags = new Set();
  state.htmltags = new Set();
  state.images = new Set();
  state.links = new Set();
  try {
    var doc = DOMParser.parseFromString((0, _EmbeddedPlayers.preprocessHtml)(html), 'text/html');
    traverse(doc, state);
    if (mutate) {
      if (hideLinks) {
        for (var _i = 0, _Array$from = Array.from(doc.getElementsByTagName('a')); _i < _Array$from.length; _i++) {
          var _link = _Array$from[_i];
          var pre = doc.createElement('pre');
          pre.appendChild(doc.createTextNode('Reported phishing link.'));
          _link.parentNode.replaceChild(pre, _link);
        }
      }
      if (hideImages) {
        for (var _i2 = 0, _Array$from2 = Array.from(doc.getElementsByTagName('img')); _i2 < _Array$from2.length; _i2++) {
          var image = _Array$from2[_i2];
          var _pre = doc.createElement('pre');
          _pre.setAttribute('class', 'image-url-only');
          _pre.appendChild(doc.createTextNode(image.getAttribute('src')));
          image.parentNode.replaceChild(_pre, image);
        }
      } else {
        proxifyImages(doc);
      }
    }
    // console.log('state', state)
    if (!mutate) return state;
    return _objectSpread({
      html: doc ? XMLSerializer.serializeToString(doc) : ''
    }, state);
  } catch (error) {
    // xmldom error is bad
    console.error('rendering error', JSON.stringify({
      error: error.message,
      html: html
    }));
    return {
      html: ''
    };
  }
}
function traverse(node, state) {
  var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  if (!node || !node.childNodes) return;
  Array.from(node.childNodes).forEach(function (child) {
    // console.log(depth, 'child.tag,data', child.tagName, child.data)
    var tag = child.tagName ? child.tagName.toLowerCase() : null;
    if (tag) state.htmltags.add(tag);
    if (tag === 'img') img(state, child);else if (tag === 'iframe') iframe(state, child);else if (tag === 'a') link(state, child);else if (child.nodeName === '#text') linkifyNode(child, state);
    traverse(child, state, depth + 1);
  });
}
function link(state, child) {
  var url = child.getAttribute('href');
  if (url) {
    state.links.add(url);
    if (state.mutate) {
      // If this link is not relative, http, https, blurt -- add https.
      if (!/^((#)|(\/(?!\/))|(((blurt|https?):)?\/\/))/.test(url)) {
        child.setAttribute('href', 'https://' + url);
      }

      // Unlink potential phishing attempts
      if (url.indexOf('#') !== 0 &&
      // Allow in-page links
      child.textContent.match(/(www\.)?blurt\.blog/i) && !url.match(/https?:\/\/(.*@)?(www\.)?blurt\.blog/i) || Phishing.looksPhishy(url)) {
        var phishyDiv = child.ownerDocument.createElement('div');
        phishyDiv.textContent = 'Phishing Link Detected and Hidden';
        phishyDiv.setAttribute('title', 'Phishing link has been replaced.');
        phishyDiv.setAttribute('class', 'phishy');
        child.parentNode.replaceChild(phishyDiv, child);
      }
    }
  }
}

// wrap iframes in div.videoWrapper to control size/aspect ratio
function iframe(state, child) {
  var url = child.getAttribute('src');

  // @TODO move this into the centralized EmbeddedPlayer code
  if (url) {
    var images = state.images,
      links = state.links;
    var yt = (0, _youtube.extractMetadata)(url);
    if (yt && images && links) {
      links.add(yt.url);
      images.add('https://img.youtube.com/vi/' + yt.id + '/0.jpg');
    }
  }
  var mutate = state.mutate;
  if (!mutate) return;
  var tag = child.parentNode.tagName ? child.parentNode.tagName.toLowerCase() : child.parentNode.tagName;
  if (tag == 'div' && child.parentNode.getAttribute('class') == 'videoWrapper') {
    return;
  }
  var html = XMLSerializer.serializeToString(child);
  child.parentNode.replaceChild(DOMParser.parseFromString("<div class=\"videoWrapper\">".concat(html, "</div>")), child);
}
function img(state, child) {
  var url = child.getAttribute('src');
  if (url) {
    state.images.add(url);
    if (state.mutate) {
      var url2 = ipfsPrefix(url);
      if (/^\/\//.test(url2)) {
        // Change relative protocol imgs to https
        url2 = 'https:' + url2;
      }
      if (url2 !== url) {
        child.setAttribute('src', url2);
      }
    }
  }
}

// For all img elements with non-local URLs, prepend the proxy URL (e.g. `https://img0.steemit.com/0x0/`)
function proxifyImages(doc) {
  if (!doc) return;
  Array.from(doc.getElementsByTagName('img')).forEach(function (node) {
    var url = node.getAttribute('src');
    if (!_Links["default"].local.test(url)) {
      var proxifiedImageUrl = (0, _ProxifyUrl.proxifyImageUrl)(url, true);
      node.setAttribute('src', proxifiedImageUrl);
    }
  });
}
function linkifyNode(child, state) {
  try {
    var tag = child.parentNode.tagName ? child.parentNode.tagName.toLowerCase() : child.parentNode.tagName;
    if (tag === 'code') return;
    if (tag === 'a') return;
    var mutate = state.mutate;
    if (!child.data) return;
    child = (0, _EmbeddedPlayers.embedNode)(child, state.links, state.images);
    var data = XMLSerializer.serializeToString(child);
    var content = linkify(data, state.mutate, state.hashtags, state.usertags, state.images, state.links);
    if (mutate && content !== data) {
      var newChild = DOMParser.parseFromString("<span>".concat(content, "</span>"));
      child.parentNode.replaceChild(newChild, child);
      return newChild;
    }
  } catch (error) {
    console.error('linkify_error', error);
  }
}
function linkify(content, mutate, hashtags, usertags, images, links) {
  // hashtag
  content = content.replace(/(^|\s)(#[-a-z\d]+)/gi, function (tag) {
    if (/#[\d]+$/.test(tag)) return tag; // Don't allow numbers to be tags
    var space = /^\s/.test(tag) ? tag[0] : '';
    var tag2 = tag.trim().substring(1);
    var tagLower = tag2.toLowerCase();
    if (hashtags) hashtags.add(tagLower);
    if (!mutate) return tag;
    return space + "<a href=\"/trending/".concat(tagLower, "\">").concat(tag, "</a>");
  });

  // usertag (mention)
  // Cribbed from https://github.com/twitter/twitter-text/blob/v1.14.7/js/twitter-text.js#L90
  content = content.replace(/(^|[^a-zA-Z0-9_!#$%&*@＠\/]|(^|[^a-zA-Z0-9_+~.-\/#]))[@＠]([a-z][-\.a-z\d]+[a-z\d])/gi, function (match, preceeding1, preceeding2, user) {
    var userLower = user.toLowerCase();
    var valid = (0, _ChainValidation.validate_account_name)(userLower) == null;
    if (valid && usertags) usertags.add(userLower);
    var preceedings = (preceeding1 || '') + (preceeding2 || ''); // include the preceeding matches if they exist

    if (!mutate) return "".concat(preceedings).concat(user);
    return valid ? "".concat(preceedings, "<a href=\"/@").concat(userLower, "\">@").concat(user, "</a>") : "".concat(preceedings, "@").concat(user);
  });
  content = content.replace((0, _Links.any)('gi'), function (ln) {
    if (_Links["default"].image.test(ln)) {
      if (images) images.add(ln);
      return "<img src=\"".concat(ipfsPrefix(ln), "\" />");
    }

    // do not linkify .exe or .zip urls
    if (/\.(zip|exe)$/i.test(ln)) return ln;

    // do not linkify phishy links
    if (Phishing.looksPhishy(ln)) {
      return "<div title='".concat(getPhishingWarningMessage(), "' class='phishy'>").concat(ln, "</div>");
    }
    if (links) links.add(ln);
    return "<a href=\"".concat(ipfsPrefix(ln), "\">").concat(ln, "</a>");
  });
  return content;
}
function ipfsPrefix(url) {
  if ($STM_Config.ipfs_prefix) {
    // Convert //ipfs/xxx  or /ipfs/xxx  into  https://steemit.com/ipfs/xxxxx
    if (/^\/?\/ipfs\//.test(url)) {
      var slash = url.charAt(1) === '/' ? 1 : 0;
      url = url.substring(slash + '/ipfs/'.length); // start with only 1 /
      return $STM_Config.ipfs_prefix + '/' + url;
    }
  }
  return url;
}