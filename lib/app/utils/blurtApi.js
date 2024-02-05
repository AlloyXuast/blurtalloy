"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callBridge = callBridge;
exports.callNotificationsApi = callNotificationsApi;
exports.getStateAsync = getStateAsync;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _blurtjs = require("@blurtfoundation/blurtjs");
var _Community = require("app/utils/Community");
var _axios = _interopRequireDefault(require("axios"));
var _stateCleaner = _interopRequireDefault(require("app/redux/stateCleaner"));
var _busyjs = require("@busyorg/busyjs");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; } /* global $STM_Config */
function verifyLocalStorageData(propertyDate, propertyValue) {
  var maxSecondsSinceUpdate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
  if (!process.env.BROWSER) {
    return {
      result: false
    };
  }
  try {
    var consultationDate = localStorage.getItem(propertyDate);
    var value = localStorage.getItem(propertyValue);
    if (consultationDate !== null && value !== null && consultationDate !== undefined && value !== undefined) {
      var dateObtained = new Date(Date.parse(consultationDate));
      var currentTimestamp = new Date().getTime();
      // Check if the time difference in seconds is greater than the specified limit
      if (!Number.isNaN(dateObtained.getTime()) && (currentTimestamp - dateObtained.getTime()) / 1000 < maxSecondsSinceUpdate) {
        return (0, _defineProperty2["default"])((0, _defineProperty2["default"])({
          result: true
        }, propertyDate, dateObtained), propertyValue, value);
      }
    }
    return {
      result: false
    };
  } catch (error) {
    console.error("blurtApi:", error.message);
    return {
      result: false
    };
  }
}
function saveDataToLocalStorage(dataObject) {
  if (!process.env.BROWSER) {
    return;
  }
  try {
    if ((0, _typeof2["default"])(dataObject) === 'object' && dataObject !== null) {
      Object.entries(dataObject).forEach(function (_ref2) {
        var _ref3 = (0, _slicedToArray2["default"])(_ref2, 2),
          key = _ref3[0],
          value = _ref3[1];
        localStorage.setItem(key, JSON.stringify(value));
      });
    }
  } catch (error) {
    console.error(error.message);
  }
}

// TODO: add server-side synchronization of external requests,
// and bybass this if we are server-side rendering.
function externalRequests() {
  return _externalRequests.apply(this, arguments);
}
function _externalRequests() {
  _externalRequests = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var state, _verifyLocalStorageDa, result, price, datePrice, coal_data, blacklist, dateBlacklist, map, _iterator, _step, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          state = {};
          _verifyLocalStorageDa = verifyLocalStorageData('datePrice', 'price'), result = _verifyLocalStorageDa.result, price = _verifyLocalStorageDa.price, datePrice = _verifyLocalStorageDa.datePrice;
          if (!result) {
            _context.next = 6;
            break;
          }
          state.price = Number(price).toFixed(8);
          _context.next = 8;
          break;
        case 6:
          _context.next = 8;
          return _axios["default"].get($STM_Config.price_info_url, {
            timeout: 3000
          }).then(function (response) {
            if (response.status === 200) {
              state.price = Number(response.data.price_usd).toFixed(8);
              var currentDate = new Date();
              saveDataToLocalStorage({
                datePrice: currentDate.toUTCString(),
                price: response.data.price_usd
              });
            }
          })["catch"](function (error) {
            console.error("blurtApi:", error);
          });
        case 8:
          coal_data = verifyLocalStorageData('dateBlacklist', 'blacklist');
          blacklist = coal_data.blacklist, dateBlacklist = coal_data.dateBlacklist;
          result = coal_data.result;
          if (!result) {
            _context.next = 18;
            break;
          }
          map = new Map();
          _iterator = _createForOfIteratorHelper(blacklist);
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              data = _step.value;
              map.set(data.name, data);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          state.blacklist = map;
          _context.next = 20;
          break;
        case 18:
          _context.next = 20;
          return _axios["default"].get($STM_Config.coal_url, {
            timeout: 3000
          }).then(function (response) {
            var map = new Map();
            if (response.status === 200) {
              // eslint-disable-next-line no-restricted-syntax
              var _iterator2 = _createForOfIteratorHelper(response.data),
                _step2;
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var _data = _step2.value;
                  map.set(_data.name, _data);
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
              state.blacklist = map;
              var currentDate = new Date();
              saveDataToLocalStorage({
                dateBlacklist: currentDate.toUTCString(),
                blacklist: response.data
              });
            }
          })["catch"](function (error) {
            var map = new Map();
            console.error(error);
            state.blacklist = map;
          });
        case 20:
          return _context.abrupt("return", state);
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _externalRequests.apply(this, arguments);
}
function callBridge(_x, _x2) {
  return _callBridge.apply(this, arguments);
}
function _callBridge() {
  _callBridge = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(method, params) {
    var pre,
      _args2 = arguments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          pre = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 'bridge.';
          // [JES] Hivemind throws an exception if you call for my/[trending/payouts/new/etc] with a null observer
          // so just delete the 'my' tag if there is no observer specified
          if (method === 'get_ranked_posts' && params && (params.observer === null || params.observer === undefined) && params.tag === 'my') {
            delete params.tag;
            delete params.observer;
          }
          if (method === 'normalize_post' && params && params.observer !== undefined) delete params.observer;
          console.log('call bridge', method, params && JSON.stringify(params).substring(0, 200));
          return _context2.abrupt("return", new Promise(function (resolve, reject) {
            _blurtjs.api.call(pre + method, params, function (err, data) {
              if (err) {
                console.error('~~ api.calBridge error ~~~>', method, params, err);
                reject(err);
              } else resolve(data);
            });
          }));
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _callBridge.apply(this, arguments);
}
function getStateAsync(_x3, _x4) {
  return _getStateAsync.apply(this, arguments);
}
function _getStateAsync() {
  _getStateAsync = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(url, observer) {
    var ssr,
      _parsePath,
      page,
      tag,
      sort,
      key,
      tags,
      domains,
      noLoadPosts,
      state,
      posts,
      _posts,
      account,
      profile,
      chainProperties,
      dynamicGlobalProperties,
      response,
      promotedMembersListURL,
      rewardFund,
      blurtConfig,
      cleansed,
      _args3 = arguments;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          ssr = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : false;
          if (observer === undefined) observer = null;
          _parsePath = parsePath(url), page = _parsePath.page, tag = _parsePath.tag, sort = _parsePath.sort, key = _parsePath.key, tags = _parsePath.tags;
          domains = ['peypaisecurity.com', 'kinrnightx.monster', 'jarolovexr.click']; // No load posts
          noLoadPosts = ['curation-rewards', 'author-rewards', 'notifications', 'password', 'followed', 'followers', 'settings', 'info', 'communities'];
          console.log('GSA', url, observer, ssr);
          state = {
            accounts: {},
            community: {},
            content: {},
            discussion_idx: {},
            profiles: {},
            props: {},
            blacklist: {},
            phishy_domains: domains,
            reward_fund: {},
            blurt_config: {},
            tags: [],
            tag_idx: {
              trending: []
            }
          };
          if (!tags) {
            _context3.next = 12;
            break;
          }
          _context3.next = 10;
          return callBridge("get_trending_tags", [null, 40], "condenser_api.");
        case 10:
          state.tags = _context3.sent;
          state.tag_idx.trending = state.tags.map(function (tag) {
            return tag.name;
          });
        case 12:
          if (!(page == 'posts' || page == 'account' && !noLoadPosts.includes(sort))) {
            _context3.next = 20;
            break;
          }
          _context3.next = 15;
          return loadPosts(sort, tag, observer);
        case 15:
          posts = _context3.sent;
          state['content'] = posts['content'];
          state['discussion_idx'] = posts['discussion_idx'];
          _context3.next = 25;
          break;
        case 20:
          if (!(page == 'thread')) {
            _context3.next = 25;
            break;
          }
          _context3.next = 23;
          return loadThread(key[0], key[1]);
        case 23:
          _posts = _context3.sent;
          state['content'] = _posts['content'];
        case 25:
          if (!(tag && (0, _Community.ifBlurt)(tag))) {
            _context3.next = 35;
            break;
          }
          _context3.prev = 26;
          _context3.next = 29;
          return callBridge('get_community', {
            name: tag,
            observer: observer
          });
        case 29:
          state['community'][tag] = _context3.sent;
          _context3.next = 35;
          break;
        case 32:
          _context3.prev = 32;
          _context3.t0 = _context3["catch"](26);
          console.log('Bridge Error: ', _context3.t0);
        case 35:
          // for SSR, load profile on any profile page or discussion thread author
          account = tag && tag[0] == '@' ? tag.slice(1) : page == 'thread' ? key[0].slice(1) : null;
          if (!(ssr && account)) {
            _context3.next = 41;
            break;
          }
          _context3.next = 39;
          return callBridge('get_profile', {
            account: account
          });
        case 39:
          profile = _context3.sent;
          if (profile && profile['name']) {
            state['profiles'][account] = profile;
          }
        case 41:
          if (!ssr) {
            _context3.next = 45;
            break;
          }
          _context3.next = 44;
          return callBridge('get_trending_topics', {
            limit: 12
          });
        case 44:
          state['topics'] = _context3.sent;
        case 45:
          _context3.next = 47;
          return getChainProperties();
        case 47:
          chainProperties = _context3.sent;
          if (chainProperties) {
            state.props.operation_flat_fee = parseFloat(chainProperties.operation_flat_fee);
            state.props.bandwidth_kbytes_fee = parseFloat(chainProperties.bandwidth_kbytes_fee);
          }
          _context3.next = 51;
          return getDynamicGlobalProperties();
        case 51:
          dynamicGlobalProperties = _context3.sent;
          if (dynamicGlobalProperties) {
            state.props = _objectSpread(_objectSpread({}, dynamicGlobalProperties), state.props);
          }
          _context3.next = 55;
          return externalRequests();
        case 55:
          response = _context3.sent;
          state.props.price_per_blurt = response.price;
          state.blacklist = response.blacklist;
          promotedMembersListURL = 'https://api.nekosunevr.co.uk/v4/apps/ranks/blurt';
          _context3.next = 61;
          return _axios["default"].get(promotedMembersListURL, {
            timeout: 3000
          }).then(function (response) {
            var map = new Map();
            if (response.status === 200) {
              // eslint-disable-next-line no-restricted-syntax
              var _iterator3 = _createForOfIteratorHelper(response.data),
                _step3;
              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  var data = _step3.value;
                  map.set(data.name, data);
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }
              state.promoted_members = map;
            }
          })["catch"](function (error) {
            console.warn(error);
          });
        case 61:
          _context3.next = 63;
          return getRewardFund();
        case 63:
          rewardFund = _context3.sent;
          if (rewardFund) {
            state.reward_fund = rewardFund;
          }
          _context3.next = 67;
          return getConfig();
        case 67:
          blurtConfig = _context3.sent;
          if (blurtConfig) {
            state.blurt_config = blurtConfig;
          }
          cleansed = (0, _stateCleaner["default"])(state);
          return _context3.abrupt("return", cleansed);
        case 71:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[26, 32]]);
  }));
  return _getStateAsync.apply(this, arguments);
}
function getChainProperties() {
  return _getChainProperties.apply(this, arguments);
}
function _getChainProperties() {
  _getChainProperties = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", new Promise(function (resolve) {
            _blurtjs.api.getChainProperties(function (err, result) {
              if (result) {
                resolve(result);
              } else {
                resolve({});
              }
            });
          }));
        case 1:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _getChainProperties.apply(this, arguments);
}
function getDynamicGlobalProperties(_x5) {
  return _getDynamicGlobalProperties.apply(this, arguments);
}
function _getDynamicGlobalProperties() {
  _getDynamicGlobalProperties = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(params) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", new Promise(function (resolve) {
            _blurtjs.api.getDynamicGlobalProperties(function (err, result) {
              if (result) {
                resolve(result);
              } else {
                resolve({});
              }
            });
          }));
        case 1:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _getDynamicGlobalProperties.apply(this, arguments);
}
function getRewardFund() {
  return new Promise(function (resolve) {
    _blurtjs.api.getRewardFund('post', function (err, result) {
      if (result) {
        resolve(result);
      } else {
        resolve({});
      }
    });
  });
}
function getConfig() {
  return new Promise(function (resolve) {
    _blurtjs.api.getConfig(function (err, result) {
      if (result) {
        resolve(result);
      } else {
        resolve({});
      }
    });
  });
}
function loadPosts(_x6, _x7, _x8) {
  return _loadPosts.apply(this, arguments);
}
function _loadPosts() {
  _loadPosts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(sort, tag, observer) {
    var account, posts, params, _params, content, keys, idx, post, key, discussion_idx;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          account = tag && tag[0] == '@' ? tag.slice(1) : null;
          if (!account) {
            _context6.next = 8;
            break;
          }
          params = {
            sort: sort,
            account: account,
            observer: observer
          };
          _context6.next = 5;
          return callBridge('get_account_posts', params);
        case 5:
          posts = _context6.sent;
          _context6.next = 12;
          break;
        case 8:
          _params = {
            sort: sort,
            tag: tag,
            observer: observer
          };
          _context6.next = 11;
          return callBridge('get_ranked_posts', _params);
        case 11:
          posts = _context6.sent;
        case 12:
          content = {};
          keys = [];
          for (idx in posts) {
            post = posts[idx];
            key = post['author'] + '/' + post['permlink'];
            content[key] = post;
            keys.indexOf(key) == -1 && keys.push(key);
          }
          discussion_idx = {};
          discussion_idx[tag] = {};
          discussion_idx[tag][sort] = keys;
          return _context6.abrupt("return", {
            content: content,
            discussion_idx: discussion_idx
          });
        case 19:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _loadPosts.apply(this, arguments);
}
function loadThread(_x9, _x10) {
  return _loadThread.apply(this, arguments);
}
function _loadThread() {
  _loadThread = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(account, permlink) {
    var author, content;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          author = account.slice(1);
          _context7.next = 3;
          return callBridge('get_discussion', {
            author: author,
            permlink: permlink
          });
        case 3:
          content = _context7.sent;
          return _context7.abrupt("return", {
            content: content
          });
        case 5:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _loadThread.apply(this, arguments);
}
function callNotificationsApi(_x11) {
  return _callNotificationsApi.apply(this, arguments);
}
function _callNotificationsApi() {
  _callNotificationsApi = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(account) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          console.log('call notifications api', account);
          return _context8.abrupt("return", new Promise(function (resolve, reject) {
            var client = new _busyjs.Client('wss://notifications.blurt.world');
            client.call('get_notifications', [account], function (err, result) {
              if (err !== null) reject(err);
              resolve(result);
            });
          }));
        case 2:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _callNotificationsApi.apply(this, arguments);
}
function parsePath(url) {
  // strip off query string
  url = url.split('?')[0];

  // strip off leading and trailing slashes
  if (url.length > 0 && url[0] == '/') url = url.substring(1, url.length);
  if (url.length > 0 && url[url.length - 1] == '/') url = url.substring(0, url.length - 1);
  // curation and author rewards pages are alias of `transfers`
  if (url.indexOf('/curation-rewards') !== -1) url = url.replace('/curation-rewards', '/transfers');
  if (url.indexOf('/author-rewards') !== -1) url = url.replace('/author-rewards', '/transfers');
  // blank URL defaults to `trending`
  if (url === '') url = 'hot';
  var part = url.split('/');
  var parts = part.length;
  var sorts = ['trending', 'promoted', 'hot', 'created', 'payout', 'payout_comments', 'muted'];
  var acct_tabs = ['blog', 'feed', 'posts', 'comments', 'recent-replies', 'curation-rewards', 'author-rewards', 'notifications', 'password', 'followed', 'followers', 'settings', 'info', 'communities'];
  var tags_transformation = {
    'recent-replies': 'replies'
  };
  var page = null;
  var tag = null;
  var sort = null;
  var key = null;
  var tags = null;
  if (parts == 1 && sorts.includes(part[0])) {
    tags = true;
    page = 'posts';
    sort = part[0];
    tag = '';
  } else if (parts == 2 && sorts.includes(part[0])) {
    tags = true;
    page = 'posts';
    sort = part[0];
    tag = part[1];
  } else if (parts == 3 && part[1][0] == '@') {
    page = 'thread';
    tag = part[0];
    key = [part[1], part[2]];
  } else if (parts == 1 && part[0][0] == '@') {
    page = 'account';
    sort = 'blog';
    tag = part[0];
  } else if (parts == 2 && part[0][0] == '@') {
    if (part[1] === 'feed') {
      tags = true;
    }
    if (acct_tabs.includes(part[1])) {
      page = 'account';
      sort = Object.keys(tags_transformation).includes(part[1]) ? tags_transformation[part[1]] : part[1];
    } else {
      // settings, followers, notifications, etc (no-op)
    }
    tag = part[0];
  } else {
    // no-op URL
  }
  return {
    page: page,
    tag: tag,
    sort: sort,
    key: key,
    tags: tags
  };
}