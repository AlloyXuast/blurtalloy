"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noImageText = exports["default"] = exports.allowedTags = void 0;
var _HtmlReady = require("shared/HtmlReady");
var _EmbeddedPlayers = require("app/components/elements/EmbeddedPlayers");
// the only allowable title attributes for div and a tags

var noImageText = exports.noImageText = '(Image not shown due to low ratings)';
var allowedTags = exports.allowedTags = "\n    div, iframe, del,\n    a, p, b, i, q, br, ul, li, ol, img, h1, h2, h3, h4, h5, h6, hr,\n    blockquote, pre, code, em, strong, center, table, thead, tbody, tr, th, td,\n    strike, sup, sub\n".trim().split(/,\s*/);

// Medium insert plugin uses: div, figure, figcaption, iframe
var _default = exports["default"] = function _default(_ref) {
  var _ref$large = _ref.large,
    large = _ref$large === void 0 ? true : _ref$large,
    _ref$highQualityPost = _ref.highQualityPost,
    highQualityPost = _ref$highQualityPost === void 0 ? true : _ref$highQualityPost,
    _ref$noImage = _ref.noImage,
    noImage = _ref$noImage === void 0 ? false : _ref$noImage,
    _ref$sanitizeErrors = _ref.sanitizeErrors,
    sanitizeErrors = _ref$sanitizeErrors === void 0 ? [] : _ref$sanitizeErrors;
  return {
    allowedTags: allowedTags,
    // figure, figcaption,

    // SEE https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
    allowedAttributes: {
      // "src" MUST pass a whitelist (below)
      iframe: ['src', 'width', 'height', 'frameborder', 'allowfullscreen', 'webkitallowfullscreen', 'mozallowfullscreen'],
      // class attribute is strictly whitelisted (below)
      // and title is only set in the case of a phishing warning
      div: ['class', 'title'],
      // style is subject to attack, filtering more below
      td: ['style'],
      img: ['src', 'alt'],
      // title is only set in the case of an external link warning
      a: ['href', 'rel', 'title']
    },
    allowedSchemes: ['http', 'https', 'blurt', 'esteem'],
    transformTags: {
      iframe: function iframe(tagName, attribs) {
        var srcAtty = attribs.src;
        var _validateEmbbeddedPla = (0, _EmbeddedPlayers.validateIframeUrl)(srcAtty),
          validUrl = _validateEmbbeddedPla.validUrl,
          useSandbox = _validateEmbbeddedPla.useSandbox,
          sandboxAttributes = _validateEmbbeddedPla.sandboxAttributes;
        if (validUrl === true) {
          var iframe = {
            tagName: 'iframe',
            attribs: {
              frameborder: '0',
              allowfullscreen: 'allowfullscreen',
              webkitallowfullscreen: 'webkitallowfullscreen',
              // deprecated but required for vimeo : https://vimeo.com/forums/help/topic:278181
              mozallowfullscreen: 'mozallowfullscreen',
              // deprecated but required for vimeo
              src: validUrl,
              width: large ? '640' : '480',
              height: large ? '360' : '270'
            }
          };
          if (useSandbox) {
            if (sandboxAttributes.length > 0) {
              iframe.attribs.sandbox = sandboxAttributes.join(' ');
            } else {
              iframe.attribs.sandbox = true;
            }
          }
          return iframe;
        }
        console.log('Blocked, did not match iframe "src" white list urls:', tagName, attribs);
        sanitizeErrors.push('Invalid iframe URL: ' + srcAtty);
        return {
          tagName: 'div',
          text: "(Unsupported ".concat(srcAtty, ")")
        };
      },
      img: function img(tagName, attribs) {
        if (noImage) return {
          tagName: 'div',
          text: noImageText
        };
        // See https://github.com/punkave/sanitize-html/issues/117
        var src = attribs.src,
          alt = attribs.alt;
        if (!/^(https?:)?\/\//i.test(src)) {
          console.log('Blocked, image tag src does not appear to be a url', tagName, attribs);
          sanitizeErrors.push('An image in this post did not save properly.');
          return {
            tagName: 'img',
            attribs: {
              src: 'brokenimg.jpg'
            }
          };
        }

        // replace http:// with // to force https when needed
        src = src.replace(/^http:\/\//i, '//');
        var atts = {
          src: src
        };
        if (alt && alt !== '') atts.alt = alt;
        return {
          tagName: tagName,
          attribs: atts
        };
      },
      div: function div(tagName, attribs) {
        var attys = {};
        var classWhitelist = ['pull-right', 'pull-left', 'text-justify', 'text-rtl', 'text-center', 'text-right', 'videoWrapper', 'phishy'];
        var validClass = classWhitelist.find(function (e) {
          return attribs["class"] == e;
        });
        if (validClass) attys["class"] = validClass;
        if (validClass === 'phishy' && attribs.title === (0, _HtmlReady.getPhishingWarningMessage)()) {
          attys.title = attribs.title;
        }
        return {
          tagName: tagName,
          attribs: attys
        };
      },
      td: function td(tagName, attribs) {
        var attys = {};
        if (attribs.style === 'text-align:right') {
          attys.style = 'text-align:right';
        }
        return {
          tagName: tagName,
          attribs: attys
        };
      },
      a: function a(tagName, attribs) {
        var href = attribs.href;
        if (!href) href = '#';
        href = href.trim();
        var attys = {
          href: href
        };
        // If it's not a (relative or absolute) blurt URL...
        if (!href.match(/^(\/(?!\/)|https:\/\/blurt.blog)/)) {
          // attys.target = '_blank' // pending iframe impl https://mathiasbynens.github.io/rel-noopener/
          attys.rel = highQualityPost ? 'noopener' : 'nofollow noopener';
          attys.title = (0, _HtmlReady.getExternalLinkWarningMessage)();
        }
        return {
          tagName: tagName,
          attribs: attys
        };
      }
    }
  };
};