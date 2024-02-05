"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ServerHTML;
var config = _interopRequireWildcard(require("config"));
var _react = _interopRequireDefault(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ServerHTML(_ref) {
  var body = _ref.body,
    assets = _ref.assets,
    locale = _ref.locale,
    title = _ref.title,
    meta = _ref.meta,
    shouldSeeAds = _ref.shouldSeeAds,
    adClient = _ref.adClient,
    gptEnabled = _ref.gptEnabled,
    gptBannedTags = _ref.gptBannedTags,
    gptBidding = _ref.gptBidding,
    shouldSeeCookieConsent = _ref.shouldSeeCookieConsent,
    cookieConsentApiKey = _ref.cookieConsentApiKey;
  var page_title = title;
  return /*#__PURE__*/_react["default"].createElement("html", {
    lang: "en"
  }, /*#__PURE__*/_react["default"].createElement("head", null, /*#__PURE__*/_react["default"].createElement("script", {
    async: true,
    src: "https://www.googletagmanager.com/gtag/js?id=G-63ZBEY1EVG"
  }), /*#__PURE__*/_react["default"].createElement("script", {
    content: "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-63ZBEY1EVG');"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    charSet: "utf-8"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0"
  }), meta && meta.map(function (m) {
    if (m.title) {
      page_title = m.title;
      return null;
    }
    if (m.canonical) {
      return /*#__PURE__*/_react["default"].createElement("link", {
        key: "canonical",
        rel: "canonical",
        href: m.canonical
      });
    }
    if (m.name && m.content) {
      return /*#__PURE__*/_react["default"].createElement("meta", {
        key: m.name,
        name: m.name,
        content: m.content
      });
    }
    if (m.property && m.content) {
      return /*#__PURE__*/_react["default"].createElement("meta", {
        key: m.property,
        property: m.property,
        content: m.content
      });
    }
    return null;
  }), /*#__PURE__*/_react["default"].createElement("link", {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/images/favicons/apple-touch-icon.png?v=4"
  }), /*#__PURE__*/_react["default"].createElement("link", {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/images/favicons/favicon-32x32.png?v=4"
  }), /*#__PURE__*/_react["default"].createElement("link", {
    rel: "icon",
    type: "image/png",
    sizes: "192x192",
    href: "/images/favicons/android-chrome-192x192.png?v=4"
  }), /*#__PURE__*/_react["default"].createElement("link", {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/images/favicons/favicon-16x16.png?v=4"
  }), /*#__PURE__*/_react["default"].createElement("link", {
    rel: "manifest",
    href: "/images/favicons/site.webmanifest?v=4"
  }), /*#__PURE__*/_react["default"].createElement("link", {
    rel: "mask-icon",
    href: "/images/favicons/safari-pinned-tab.svg?v=4",
    color: "#da532c"
  }), /*#__PURE__*/_react["default"].createElement("link", {
    rel: "shortcut icon",
    href: "/images/favicons/favicon.ico?v=4"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    name: "apple-mobile-web-app-title",
    content: "Blurt Blog"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    name: "application-name",
    content: "Blurt Blog"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    name: "msapplication-TileColor",
    content: "#da532c"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    name: "msapplication-TileImage",
    content: "/images/favicons/mstile-144x144.png?v=4"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    name: "msapplication-config",
    content: "/images/favicons/browserconfig.xml?v=4"
  }), /*#__PURE__*/_react["default"].createElement("meta", {
    name: "theme-color",
    content: "#da532c"
  }), /*#__PURE__*/_react["default"].createElement("link", {
    href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600",
    rel: "stylesheet",
    type: "text/css"
  }), /*#__PURE__*/_react["default"].createElement("link", {
    href: "https://fonts.googleapis.com/css?family=Source+Serif+Pro:400,600",
    rel: "stylesheet",
    type: "text/css"
  }), assets.style.map(function (href, idx) {
    return /*#__PURE__*/_react["default"].createElement("link", {
      href: href,
      key: idx,
      rel: "stylesheet",
      type: "text/css"
    });
  }), shouldSeeCookieConsent ? /*#__PURE__*/_react["default"].createElement("script", {
    id: "Cookiebot",
    src: "https://consent.cookiebot.com/uc.js",
    "data-cbid": cookieConsentApiKey,
    type: "text/javascript",
    async: true
  }) : null, /*#__PURE__*/_react["default"].createElement("script", {
    dangerouslySetInnerHTML: {
      __html: "\n                        window.twttr = (function(d, s, id) {\n                            var js, fjs = d.getElementsByTagName(s)[0],\n                            t = window.twttr || {};\n                            if (d.getElementById(id)) return t;\n                            js = d.createElement(s);\n                            js.id = id;\n                            js.src = \"https://platform.twitter.com/widgets.js\";\n                            fjs.parentNode.insertBefore(js, fjs);\n\n                            t._e = [];\n                            t.ready = function(f) {\n                            t._e.push(f);\n                        };\n\n                            return t;\n                        }(document, \"script\", \"twitter-wjs\"));\n                        "
    }
  }), /*#__PURE__*/_react["default"].createElement("title", null, page_title)), /*#__PURE__*/_react["default"].createElement("body", null, /*#__PURE__*/_react["default"].createElement("div", {
    id: "content",
    dangerouslySetInnerHTML: {
      __html: body
    }
  }), assets.script.map(function (href, idx) {
    return /*#__PURE__*/_react["default"].createElement("script", {
      key: idx,
      src: href
    });
  })));
}