"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sandboxConfig = exports["default"] = void 0;
exports.validateIframeUrl = validateIframeUrl;
var regex = {
  sanitize: /^(https?:)?\/\/lbry.tv\/.*/i
};
var _default = exports["default"] = regex;
var sandboxConfig = exports.sandboxConfig = {
  useSandbox: true,
  sandboxAttributes: ['allow-scripts', 'allow-same-origin', 'allow-popups']
};

// <iframe id="lbry-iframe" width="560" height="315" src="https://lbry.tv/$/embed/the-one-and-only-ivan-helen-mirren/f872ad523a906cd12e3c947f45ce25e366a5620f" allowfullscreen></iframe>
function validateIframeUrl(url) {
  var match = url.match(regex.sanitize);
  if (!match || match.length !== 2) {
    return false;
  }
  return "".concat(match[0]);
}