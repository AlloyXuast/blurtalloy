"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
require("@babel/register");
require("core-js/stable");
require("regenerator-runtime/runtime");
require("whatwg-fetch");
var _store = _interopRequireDefault(require("store"));
var _constants = require("shared/constants");
require("./assets/stylesheets/app.scss");
var _JsPlugins = _interopRequireDefault(require("app/utils/JsPlugins"));
var _iso = _interopRequireDefault(require("iso"));
var _UniversalRender = require("shared/UniversalRender");
var _ConsoleExports = _interopRequireDefault(require("./utils/ConsoleExports"));
var _ServerApiClient = require("app/utils/ServerApiClient");
var blurtjs = _interopRequireWildcard(require("@blurtfoundation/blurtjs"));
var _Links = require("app/utils/Links");
var _FrontendLogger = _interopRequireDefault(require("app/utils/FrontendLogger"));
var _reactGa = _interopRequireDefault(require("react-ga"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
window.addEventListener('error', _FrontendLogger["default"]);
var CMD_LOG_T = 'log-t';
var CMD_LOG_TOGGLE = 'log-toggle';
var CMD_LOG_O = 'log-on';
try {
  if (process.env.NODE_ENV === 'development') {
    // Adds some object refs to the global window object
    _ConsoleExports["default"].init(window);
  }
} catch (e) {
  console.error(e);
}
_reactGa["default"].initialize('UA-179023138-1', {
  titleCase: false,
  gaOptions: {
    siteSpeedSampleRate: 100
  }
});
_reactGa["default"].pageview(window.location.pathname + window.location.search);
function runApp(initial_state) {
  var _this = this;
  // console.log('Initial state', initial_state);

  var konami = {
    code: 'xyzzy',
    enabled: false
  };
  var buff = konami.code.split('');
  var cmd = function cmd(command) {
    console.log('got command:' + command);
    switch (command) {
      case CMD_LOG_O:
        konami.enabled = false;
      case CMD_LOG_TOGGLE:
      case CMD_LOG_T:
        konami.enabled = !konami.enabled;
        if (konami.enabled) {
          blurtjs.api.setOptions({
            logger: console
          });
        } else {
          blurtjs.api.setOptions({
            logger: false
          });
        }
        return 'api logging ' + konami.enabled;
      default:
        return 'That command is not supported.';
    }
    // return 'done';
  };
  var enableKonami = function enableKonami() {
    if (!window.s) {
      console.log('The cupie doll is yours.');
      window.s = function (command) {
        return cmd.call(_this, command);
      };
    }
  };
  window.document.body.onkeypress = function (e) {
    buff.shift();
    buff.push(e.key);
    if (buff.join('') === konami.code) {
      enableKonami();
      cmd(CMD_LOG_T);
    }
  };
  if (window.location.hash.indexOf('#' + konami.code) === 0) {
    enableKonami();
    cmd(CMD_LOG_O);
  }
  var config = initial_state.offchain.config;
  var alternativeApiEndpoints = config.alternative_api_endpoints;
  var currentApiEndpoint = localStorage.getItem('user_preferred_api_endpoint') === null ? config.blurtd_connection_client : localStorage.getItem('user_preferred_api_endpoint');
  blurtjs.api.setOptions({
    url: currentApiEndpoint,
    retry: true,
    useAppbaseApi: !!config.blurtd_use_appbase,
    alternative_api_endpoints: alternativeApiEndpoints,
    failover_threshold: config.failover_threshold
  });
  blurtjs.config.set('address_prefix', config.address_prefix);
  blurtjs.config.set('chain_id', config.chain_id);
  window.$STM_Config = config;
  (0, _JsPlugins["default"])(config);
  if (initial_state.offchain.serverBusy) {
    window.$STM_ServerBusy = true;
  }
  if (initial_state.offchain.csrf) {
    window.$STM_csrf = initial_state.offchain.csrf;
    delete initial_state.offchain.csrf;
  }
  initial_state.app.viewMode = (0, _Links.determineViewMode)(window.location.search);
  var locale = _store["default"].get('language');
  if (locale) initial_state.user.locale = locale;
  initial_state.user.maybeLoggedIn = !!_store["default"].get('autopost2');
  if (initial_state.user.maybeLoggedIn) {
    var username = Buffer.from(_store["default"].get('autopost2'), 'hex').toString().split('\t')[0];
    initial_state.user.current = {
      username: username
    };
  }
  var location = "".concat(window.location.pathname).concat(window.location.search).concat(window.location.hash);
  try {
    (0, _UniversalRender.clientRender)(initial_state);
  } catch (error) {
    console.error(error);
    (0, _ServerApiClient.serverApiRecordEvent)('client_error', error);
  }
}
if (!window.Intl) {
  require.ensure(['intl/dist/Intl'], function (require) {
    window.IntlPolyfill = window.Intl = require('intl/dist/Intl');
    require('intl/locale-data/jsonp/en-US.js');
    require('intl/locale-data/jsonp/es.js');
    require('intl/locale-data/jsonp/ru.js');
    require('intl/locale-data/jsonp/fr.js');
    require('intl/locale-data/jsonp/it.js');
    require('intl/locale-data/jsonp/ko.js');
    require('intl/locale-data/jsonp/ja.js');
    _iso["default"].bootstrap(runApp);
  }, 'IntlBundle');
} else {
  _iso["default"].bootstrap(runApp);
}