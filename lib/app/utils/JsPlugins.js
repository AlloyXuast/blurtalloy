"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = init;
// 3rd party plugins

function init(config) {
  if (config.google_analytics_id) {
    (function (w, d, n, u, p, f, a, m) {
      a = d.createElement(n), m = d.getElementsByTagName(n)[0];
      a.async = 1;
      a.src = u;
      m.parentNode.insertBefore(a, m);
      w[p] = w[p] || [], w[f] = function () {
        w[p].push(arguments);
      };
    })(window, document, 'script', "https://www.googletagmanager.com/gtag/js?id=".concat(config.google_analytics_id), 'dataLayer', 'gtag');
    gtag('js', new Date());
    gtag('config', config.google_analytics_id, {
      cookie_domain: 'auto',
      sample_rate: 5
    });
  }
}