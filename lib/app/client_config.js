"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WIKI_URL = exports.WHITEPAPER_URL = exports.VEST_TICKER = exports.VESTING_TOKEN = exports.TWITTER_SHARE_IMAGE = exports.TWITTER_HANDLE = exports.TERMS_OF_SERVICE_URL = exports.SUPPORT_EMAIL = exports.SITE_DESCRIPTION = exports.SHARE_IMAGE = exports.RECOMMENDED_FOLLOW_ACCOUNT = exports.PRIVACY_POLICY_URL = exports.LIQUID_TOKEN_UPPERCASE = exports.LIQUID_TOKEN = exports.LIQUID_TICKER = exports.LANDING_PAGE_URL = exports.INVEST_TOKEN_UPPERCASE = exports.INVEST_TOKEN_SHORT = exports.DEFAULT_LANGUAGE = exports.DEFAULT_CURRENCY = exports.DEBT_TOKEN_SHORT = exports.DEBT_TOKENS = exports.DEBT_TOKEN = exports.DEBT_TICKER = exports.CURRENCY_SIGN = exports.APP_URL = exports.APP_NAME_UPPERCASE = exports.APP_NAME_LATIN = exports.APP_NAME = exports.APP_ICON = exports.APP_DOMAIN = exports.ALLOWED_CURRENCIES = void 0;
// sometimes it's impossible to use html tags to style coin name, hence usage of _UPPERCASE modifier
var APP_NAME = exports.APP_NAME = 'Blurt';
// sometimes APP_NAME is written in non-latin characters, but they are needed for technical purposes
// ie. "Голос" > "Golos"
var APP_NAME_LATIN = exports.APP_NAME_LATIN = 'Blurt';
var APP_NAME_UPPERCASE = exports.APP_NAME_UPPERCASE = 'BLURT';
var APP_ICON = exports.APP_ICON = 'blurt';
// FIXME figure out best way to do this on both client and server from env
// vars. client should read $STM_Config, server should read config package.
var APP_URL = exports.APP_URL = 'https://blurt.blog/';
var APP_DOMAIN = exports.APP_DOMAIN = 'blurt.blog';
var LIQUID_TOKEN = exports.LIQUID_TOKEN = 'Blurt';
// sometimes it's impossible to use html tags to style coin name, hence usage of _UPPERCASE modifier
var LIQUID_TOKEN_UPPERCASE = exports.LIQUID_TOKEN_UPPERCASE = 'BLURT';
var VESTING_TOKEN = exports.VESTING_TOKEN = 'BLURT POWER';
var INVEST_TOKEN_UPPERCASE = exports.INVEST_TOKEN_UPPERCASE = 'BLURT POWER';
var INVEST_TOKEN_SHORT = exports.INVEST_TOKEN_SHORT = 'BP';
var DEBT_TOKEN = exports.DEBT_TOKEN = 'BLURT DOLLAR';
var DEBT_TOKENS = exports.DEBT_TOKENS = 'BLURT DOLLARS';
var CURRENCY_SIGN = exports.CURRENCY_SIGN = '$';
var WIKI_URL = exports.WIKI_URL = ''; // https://wiki.blurt.world/
var LANDING_PAGE_URL = exports.LANDING_PAGE_URL = 'https://blurt.blog/';
var TERMS_OF_SERVICE_URL = exports.TERMS_OF_SERVICE_URL = 'https://' + APP_DOMAIN + '/tos.html';
var PRIVACY_POLICY_URL = exports.PRIVACY_POLICY_URL = 'https://' + APP_DOMAIN + '/privacy.html';
var WHITEPAPER_URL = exports.WHITEPAPER_URL = 'https://blurt.blog/WhitePaper.pdf';

// these are dealing with asset types, not displaying to client, rather sending data over websocket
var LIQUID_TICKER = exports.LIQUID_TICKER = 'BLURT';
var VEST_TICKER = exports.VEST_TICKER = 'VESTS';
var DEBT_TICKER = exports.DEBT_TICKER = 'BLURT';
var DEBT_TOKEN_SHORT = exports.DEBT_TOKEN_SHORT = 'SBD';

// application settings
var DEFAULT_LANGUAGE = exports.DEFAULT_LANGUAGE = 'en'; // used on application internationalization bootstrap
var DEFAULT_CURRENCY = exports.DEFAULT_CURRENCY = 'USD';
var ALLOWED_CURRENCIES = exports.ALLOWED_CURRENCIES = ['USD'];

// meta info
var TWITTER_HANDLE = exports.TWITTER_HANDLE = '@blurt';
var SHARE_IMAGE = exports.SHARE_IMAGE = 'https://' + APP_DOMAIN + '/images/steemit-share.png';
var TWITTER_SHARE_IMAGE = exports.TWITTER_SHARE_IMAGE = 'https://' + APP_DOMAIN + '/images/steemit-twshare.png';
var SITE_DESCRIPTION = exports.SITE_DESCRIPTION = 'Blurt is a social media platform where everyone gets paid for ' + 'creating and curating content. It leverages a robust digital points system, called Blurt, that ' + 'supports real value for digital rewards through market price discovery and liquidity';

// various
var SUPPORT_EMAIL = exports.SUPPORT_EMAIL = 'info@blurt.foundation';
var RECOMMENDED_FOLLOW_ACCOUNT = exports.RECOMMENDED_FOLLOW_ACCOUNT = 'blurt.blog';