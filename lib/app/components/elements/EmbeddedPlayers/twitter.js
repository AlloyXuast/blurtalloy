"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.embedNode = embedNode;
exports.extractMetadata = extractMetadata;
exports.extractMetadataFromEmbedCode = extractMetadataFromEmbedCode;
exports.genIframeMd = genIframeMd;
exports.normalizeEmbedUrl = normalizeEmbedUrl;
exports.preprocessHtml = preprocessHtml;
exports.validateIframeUrl = validateIframeUrl;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
/**
 * Regular expressions for detecting and validating provider URLs
 * @type {{htmlReplacement: RegExp, main: RegExp, sanitize: RegExp}}
 */
var regex = {
  main: /(?:https?:\/\/(?:(?:twitter\.com\/(.*?)\/status\/(.*))))/i,
  sanitize: /(?:https?:\/\/(?:(?:twitter\.com\/(.*?)\/status\/(.*))))/i,
  htmlReplacement: /<blockquote[^>]*?><p[^>]*?>(.*?)<\/p>.*?mdash; (.*)<a href="(https:\/\/twitter.com\/.*?(.*?\/status\/(.*?))\?.*?)">(.*?)<\/a><\/blockquote>/i
};
var _default = exports["default"] = regex;
/**
 * Extract the content ID and other metadata from the URL
 * @param data
 * @returns {null|{id: *, canonical: string, url: *}}
 */
function extractMetadataFromEmbedCode(data) {
  if (!data) return null;
  var match = data.match(regex.htmlReplacement);
  if (match) {
    var description = match[1];
    var author = match[2];
    var url = match[3];
    var fullId = match[4];
    var id = match[5];
    var date = match[5];
    return {
      id: id,
      fullId: fullId,
      url: url,
      canonical: url,
      thumbnail: null,
      date: date,
      author: author,
      description: description
    };
  }
  return null;
}

/**
 * Extract the content ID and other metadata from the URL
 * @param data
 * @returns {null|{id: *, canonical: string, url: *}}
 */
function extractMetadata(data) {
  if (!data) return null;
  var match = data.match(regex.main);
  if (match) {
    var url = match[0];
    var author = match[1];
    var id = match[2];
    return {
      id: id,
      fullId: id,
      url: url,
      canonical: null,
      thumbnail: null,
      date: '',
      author: author,
      description: ''
    };
  }
  return null;
}

/**
 * Check if the iframe code in the post editor is to an allowed URL
 * @param url
 * @returns {boolean|*}
 */
function validateIframeUrl(url) {
  var match = url.match(regex.sanitize);
  if (match) {
    return url;
  }
  return false;
}

/**
 * Rewrites the embedded URL to a normalized format
 * @param url
 * @returns {string|boolean}
 */
function normalizeEmbedUrl(url) {
  var match = url.match(regex.main);
  if (match && match.length >= 2) {
    var tweetId = match[2].split('?').shift();
    return "https://twitter.com/".concat(match[1], "/status/").concat(tweetId);
  }
  return false;
}
function generateTwitterCode(metadata) {
  var twitterCode = '<blockquote className="twitter-tweet"><p lang="en" dir="ltr"></p>&mdash; <a href=""></a></blockquote>';
  if (metadata) {
    var _atob$split = atob(metadata).split('|'),
      _atob$split2 = (0, _slicedToArray2["default"])(_atob$split, 4),
      author = _atob$split2[0],
      date = _atob$split2[1],
      url = _atob$split2[2],
      description = _atob$split2[3];

    // Sanitizing input
    author = author.replace(/(<([^>]+)>)/gi, '');
    date = date.replace(/(<([^>]+)>)/gi, '');
    url = url.replace(/(<([^>]+)>)/gi, '');
    description = description.replace(/(<([^>]+)>)/gi, '');
    if (description === '') {
      description = url;
    }
    twitterCode = '<blockquote class="twitter-tweet">' + "<p lang=\"en\" dir=\"ltr\">".concat(description, "</p>") + "&mdash; ".concat(author, " <a href=\"").concat(url, "\">").concat(date, "</a>") + '</blockquote>';
    var twttr = _lodash["default"].get(window, 'twttr');
    if (twttr && twttr.widgets) {
      twttr.widgets.load();
    }
  }
  return {
    __html: twitterCode
  };
}

/**
 * Generates the Markdown/HTML code to override the detected URL with an iFrame
 * @param idx
 * @param threespeakId
 * @param w
 * @param h
 * @returns {*}
 */
function genIframeMd(idx, twitterId, w, h, metadata) {
  if (typeof window !== 'undefined') {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: "twitter-".concat(twitterId, "-").concat(idx),
      className: "tweetWrapper",
      dangerouslySetInnerHTML: generateTwitterCode(metadata)
    });
  }
  return null;
}

/**
 * Replaces the URL with a custom Markdown for embedded players
 * @param child
 * @param links
 * @returns {*}
 */
function embedNode(child) {
  try {
    var data = child.data;
    var twitter = extractMetadata(data);
    if (twitter) {
      var metadata = btoa("".concat(twitter.author, "|").concat(twitter.date, "|").concat(twitter.url, "|").concat(twitter.description));
      child.data = data.replace(regex.main, "~~~ embed:".concat(twitter.id, " twitter metadata:").concat(metadata, " ~~~"));
    }
  } catch (error) {
    console.log(error);
  }
  return child;
}

/**
 * Pre-process HTML codes from the Markdown before it gets transformed
 * @param child
 * @returns {string}
 */
function preprocessHtml(child) {
  try {
    if (typeof child === 'string') {
      // If typeof child is a string, this means we are trying to process the HTML
      // to replace the image/anchor tag created by 3Speak dApp
      var twitter = extractMetadataFromEmbedCode(child);
      if (twitter) {
        var metadata = btoa("".concat(twitter.author, "|").concat(twitter.date, "|").concat(twitter.url, "|").concat(twitter.description));
        child = child.replace(regex.htmlReplacement, "~~~ embed:".concat(twitter.id, " twitter metadata:").concat(metadata, " ~~~"));
      }
    }
  } catch (error) {
    console.log(error);
  }
  return child;
}