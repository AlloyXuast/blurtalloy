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
exports.preprocessHtml = preprocessHtml;
exports.sandboxConfig = void 0;
exports.validateIframeUrl = validateIframeUrl;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
/**
 * Regular expressions for detecting and validating provider URLs
 * @type {{htmlReplacement: RegExp, main: RegExp, sanitize: RegExp}}
 */
var regex = {
  // eslint-disable-next-line no-useless-escape
  sanitize: /^https:\/\/3speak\.(?:online|co|tv)\/(embed|watch)\?v=([A-Za-z0-9_\-\/.]+)(&.*)?$/,
  // eslint-disable-next-line no-useless-escape
  main: /(?:https?:\/\/(?:(?:3speak\.(?:online|co|tv)\/watch\?v=)|(?:3speak\.(?:online|co|tv)\/embed\?v=)))([A-Za-z0-9_\-\/.]+)(&.*)?/i,
  // eslint-disable-next-line no-useless-escape
  htmlReplacement: /<a href="(https?:\/\/3speak\.(?:online|co|tv)\/watch\?v=([A-Za-z0-9_\-\/.]+))".*<img.*?><\/a>/i,
  embedShorthand: /~~~ embed:(.*?)\/(.*?) threespeak ~~~/
};
var _default = exports["default"] = regex;
/**
 * Configuration for HTML iframe's `sandbox` attribute
 * @type {useSandbox: boolean, sandboxAttributes: string[]}
 */
var sandboxConfig = exports.sandboxConfig = {
  useSandbox: true,
  sandboxAttributes: ['allow-scripts', 'allow-same-origin', 'allow-popups']
};

/**
 * Generates the Markdown/HTML code to override the detected URL with an iFrame
 *
 * @param idx
 * @param threespeakId
 * @param width
 * @param height
 * @returns {*}
 */
function genIframeMd(idx, threespeakId, width, height) {
  var url = "https://3speak.tv/embed?v=".concat(threespeakId);
  var sandbox = sandboxConfig.useSandbox;
  if (sandbox) {
    if (Object.prototype.hasOwnProperty.call(sandboxConfig, 'sandboxAttributes')) {
      sandbox = sandboxConfig.sandboxAttributes.join(' ');
    }
  }
  var aspectRatioPercent = height / width * 100;
  var iframeProps = {
    key: idx,
    src: url,
    width: width,
    height: height,
    frameBorder: '0',
    allowFullScreen: 'allowFullScreen'
  };
  if (sandbox) {
    iframeProps.sandbox = sandbox;
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    key: "threespeak-".concat(threespeakId, "-").concat(idx),
    className: "videoWrapper",
    style: {
      position: 'relative',
      width: '100%',
      height: 0,
      paddingBottom: "".concat(aspectRatioPercent, "%")
    }
  }, /*#__PURE__*/_react["default"].createElement("iframe", (0, _extends2["default"])({
    title: "3Speak embedded player"
    // eslint-disable-next-line react/jsx-props-no-spreading
  }, iframeProps)));
}

/**
 * Check if the iframe code in the post editor is to an allowed URL
 * <iframe src="https://3speak.tv/embed?v=threespeak/iaarkpvf"></iframe>
 * @param url
 * @returns {boolean|*}
 */
function validateIframeUrl(url) {
  var match = url.match(regex.sanitize);
  if (match) {
    if (url.includes('watch')) {
      url = url.replace('watch', 'embed');
    }
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
  var match = url.match(regex.contentId);
  if (match && match.length >= 2) {
    return "https://3speak.tv/embed?v=".concat(match[1]);
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
  var match = data.match(regex.main);
  var url = match ? match[0] : null;
  if (!url) return null;
  var fullId = match[1];
  var id = fullId.split('/').pop();
  console.log('full id', fullId);
  console.log('id', id);
  return {
    id: id,
    fullId: fullId,
    url: url,
    canonical: url,
    thumbnail: "https://img.3speakcontent.co/".concat(id, "/post.png")
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
    var data = child.data;
    var threespeak = extractMetadata(data);
    if (threespeak) {
      child.data = data.replace(threespeak.url, "~~~ embed:".concat(threespeak.fullId, " threespeak ~~~"));
      if (links) {
        links.add(threespeak.canonical);
      }
      if (images) {
        images.add(threespeak.thumbnail);
      }
    } else {
      // Because we are processing 3speak embed player with the preprocessHtml() method below
      // extractMetadata won't be able to extract the thumbnail from the shorthand.
      // So we are handling thumbnail URL extraction differently.
      var match = data.match(regex.embedShorthand);
      if (match && images) {
        var imageUrl = "https://img.3speakcontent.co/".concat(match[2], "/post.png");
        images.add(imageUrl);
      }
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
      var threespeak = extractMetadata(child);
      if (threespeak) {
        child = child.replace(regex.htmlReplacement, "~~~ embed:".concat(threespeak.fullId, " threespeak ~~~"));
      }
    }
  } catch (error) {
    console.log(error);
  }
  return child;
}