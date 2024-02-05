"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
var _regeneratorRuntime2 = require("@babel/runtime/regenerator");
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = void 0;
exports.fetchData = fetchData;
exports.fetchDataWatches = void 0;
exports.fetchState = fetchState;
exports.getAccountNotifications = getAccountNotifications;
exports.getAccountUnreadNotifications = getAccountUnreadNotifications;
exports.getCommunity = getCommunity;
exports.getContentCaller = getContentCaller;
exports.getPostHeader = getPostHeader;
exports.getSubscriptions = getSubscriptions;
exports.listCommunities = listCommunities;
exports.markNotificationsAsReadSaga = markNotificationsAsReadSaga;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _effects = require("redux-saga/effects");
var _blurtjs = require("@blurtfoundation/blurtjs");
var _FollowSaga = require("app/redux/FollowSaga");
var _SagaShared = require("app/redux/SagaShared");
var globalActions = _interopRequireWildcard(require("./GlobalReducer"));
var appActions = _interopRequireWildcard(require("./AppReducer"));
var transactionActions = _interopRequireWildcard(require("./TransactionReducer"));
var _constants = _interopRequireDefault(require("./constants"));
var _immutable = require("immutable");
var _blurtApi = require("app/utils/blurtApi");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var _marked = /*#__PURE__*/_regeneratorRuntime2.mark(getPostHeader),
  _marked2 = /*#__PURE__*/_regeneratorRuntime2.mark(listCommunities),
  _marked3 = /*#__PURE__*/_regeneratorRuntime2.mark(getCommunity),
  _marked4 = /*#__PURE__*/_regeneratorRuntime2.mark(getSubscriptions),
  _marked5 = /*#__PURE__*/_regeneratorRuntime2.mark(getContentCaller),
  _marked6 = /*#__PURE__*/_regeneratorRuntime2.mark(fetchState),
  _marked7 = /*#__PURE__*/_regeneratorRuntime2.mark(syncSpecialPosts),
  _marked8 = /*#__PURE__*/_regeneratorRuntime2.mark(getAccounts),
  _marked9 = /*#__PURE__*/_regeneratorRuntime2.mark(getAccountNotifications),
  _marked10 = /*#__PURE__*/_regeneratorRuntime2.mark(getAccountUnreadNotifications),
  _marked11 = /*#__PURE__*/_regeneratorRuntime2.mark(markNotificationsAsReadSaga),
  _marked12 = /*#__PURE__*/_regeneratorRuntime2.mark(fetchData);
var REQUEST_DATA = 'fetchDataSaga/REQUEST_DATA';
var GET_CONTENT = 'fetchDataSaga/GET_CONTENT';
var FETCH_STATE = 'fetchDataSaga/FETCH_STATE';
var GET_POST_HEADER = 'fetchDataSaga/GET_POST_HEADER';
var GET_COMMUNITY = 'fetchDataSaga/GET_COMMUNITY';
var LIST_COMMUNITIES = 'fetchDataSaga/LIST_COMMUNITIES';
var GET_SUBSCRIPTIONS = 'fetchDataSaga/GET_SUBSCRIPTIONS';
var GET_ACCOUNT_NOTIFICATIONS = 'fetchDataSaga/GET_ACCOUNT_NOTIFICATIONS';
var GET_ACCOUNT_UNREAD_NOTIFICATIONS = 'fetchDataSaga/GET_ACCOUNT_UNREAD_NOTIFICATIONS';
var MARK_NOTIFICATIONS_AS_READ = 'fetchDataSaga/MARK_NOTIFICATIONS_AS_READ';
var fetchDataWatches = exports.fetchDataWatches = [(0, _effects.takeLatest)(REQUEST_DATA, fetchData), (0, _effects.takeEvery)(GET_CONTENT, getContentCaller), (0, _effects.takeLatest)('@@router/LOCATION_CHANGE', fetchState), (0, _effects.takeLatest)(FETCH_STATE, fetchState), (0, _effects.takeEvery)('global/FETCH_JSON', fetchJson), (0, _effects.takeEvery)(GET_POST_HEADER, getPostHeader), (0, _effects.takeEvery)(GET_COMMUNITY, getCommunity), (0, _effects.takeLatest)(GET_SUBSCRIPTIONS, getSubscriptions), (0, _effects.takeEvery)(LIST_COMMUNITIES, listCommunities), (0, _effects.takeEvery)(GET_ACCOUNT_NOTIFICATIONS, getAccountNotifications), (0, _effects.takeEvery)(GET_ACCOUNT_UNREAD_NOTIFICATIONS, getAccountUnreadNotifications), (0, _effects.takeEvery)(MARK_NOTIFICATIONS_AS_READ, markNotificationsAsReadSaga)];
function getPostHeader(action) {
  var header, _action$payload, author, permlink, key;
  return _regenerator["default"].wrap(function getPostHeader$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.next = 2;
        return (0, _effects.call)(_blurtApi.callBridge, 'get_post_header', action.payload);
      case 2:
        header = _context.sent;
        _action$payload = action.payload, author = _action$payload.author, permlink = _action$payload.permlink;
        key = author + '/' + permlink;
        _context.next = 7;
        return (0, _effects.put)(globalActions.receivePostHeader((0, _defineProperty2["default"])({}, key, header)));
      case 7:
      case "end":
        return _context.stop();
    }
  }, _marked);
}

/**
 * Request all communities
 * @param {}
 */
function listCommunities(action) {
  var _action$payload2, observer, query, sort, communities;
  return _regenerator["default"].wrap(function listCommunities$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        _action$payload2 = action.payload, observer = _action$payload2.observer, query = _action$payload2.query, sort = _action$payload2.sort;
        _context2.prev = 1;
        _context2.next = 4;
        return (0, _effects.call)(_blurtApi.callBridge, 'list_communities', {
          observer: observer,
          query: query,
          sort: sort
        });
      case 4:
        communities = _context2.sent;
        _context2.next = 7;
        return (0, _effects.put)(globalActions.receiveCommunities(communities.length > 0 ? communities : []));
      case 7:
        _context2.next = 12;
        break;
      case 9:
        _context2.prev = 9;
        _context2.t0 = _context2["catch"](1);
        console.log('Error requesting communities:', _context2.t0);
      case 12:
      case "end":
        return _context2.stop();
    }
  }, _marked2, null, [[1, 9]]);
}

/**
 * Request data for given community
 * @param {string} name of community
 */
function getCommunity(action) {
  var currentUser, currentUsername, community;
  return _regenerator["default"].wrap(function getCommunity$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        if (action.payload) {
          _context3.next = 2;
          break;
        }
        throw 'no community specified';
      case 2:
        _context3.next = 4;
        return (0, _effects.select)(function (state) {
          return state.user.get('current');
        });
      case 4:
        currentUser = _context3.sent;
        currentUsername = currentUser && currentUser.get('username'); // TODO: If no current user is logged in, skip the observer param.
        _context3.next = 8;
        return (0, _effects.call)(_blurtApi.callBridge, 'get_community', {
          name: action.payload,
          observer: currentUsername
        });
      case 8:
        community = _context3.sent;
        if (!community.name) {
          _context3.next = 12;
          break;
        }
        _context3.next = 12;
        return (0, _effects.put)(globalActions.receiveCommunity((0, _defineProperty2["default"])({}, community.name, _objectSpread({}, community))));
      case 12:
      case "end":
        return _context3.stop();
    }
  }, _marked3);
}

/**
 * Request all user subscriptions
 * @param {string} name of account
 */
function getSubscriptions(action) {
  var subscriptions;
  return _regenerator["default"].wrap(function getSubscriptions$(_context4) {
    while (1) switch (_context4.prev = _context4.next) {
      case 0:
        if (action.payload) {
          _context4.next = 2;
          break;
        }
        throw 'no account specified';
      case 2:
        _context4.next = 4;
        return (0, _effects.put)(globalActions.loadingSubscriptions(true));
      case 4:
        _context4.prev = 4;
        _context4.next = 7;
        return (0, _effects.call)(_blurtApi.callBridge, 'list_all_subscriptions', {
          account: action.payload
        });
      case 7:
        subscriptions = _context4.sent;
        _context4.next = 10;
        return (0, _effects.put)(globalActions.receiveSubscriptions({
          subscriptions: subscriptions,
          username: action.payload
        }));
      case 10:
        _context4.next = 15;
        break;
      case 12:
        _context4.prev = 12;
        _context4.t0 = _context4["catch"](4);
        console.log('Error Fetching Account Subscriptions: ', _context4.t0);
      case 15:
        _context4.next = 17;
        return (0, _effects.put)(globalActions.loadingSubscriptions(false));
      case 17:
      case "end":
        return _context4.stop();
    }
  }, _marked4, null, [[4, 12]]);
}
function getContentCaller(action) {
  return _regenerator["default"].wrap(function getContentCaller$(_context5) {
    while (1) switch (_context5.prev = _context5.next) {
      case 0:
        _context5.next = 2;
        return (0, _SagaShared.getContent)(action.payload);
      case 2:
      case "end":
        return _context5.stop();
    }
  }, _marked5);
}
var is_initial_state = true;
function fetchState(location_change_action) {
  var pathname, m, username, server_location, ignore_fetch, url, _username, _yield$select, _yield$select2, state;
  return _regenerator["default"].wrap(function fetchState$(_context6) {
    while (1) switch (_context6.prev = _context6.next) {
      case 0:
        pathname = location_change_action.payload.pathname;
        m = pathname.match(/^\/@([a-z0-9\.-]+)/);
        if (!(m && m.length === 2)) {
          _context6.next = 10;
          break;
        }
        username = m[1];
        _context6.next = 6;
        return (0, _effects.fork)(_FollowSaga.fetchFollowCount, username);
      case 6:
        _context6.next = 8;
        return (0, _effects.fork)(_FollowSaga.loadFollows, 'getFollowersAsync', username, 'blog');
      case 8:
        _context6.next = 10;
        return (0, _effects.fork)(_FollowSaga.loadFollows, 'getFollowingAsync', username, 'blog');
      case 10:
        _context6.next = 12;
        return (0, _effects.select)(function (state) {
          return state.offchain.get('server_location');
        });
      case 12:
        server_location = _context6.sent;
        ignore_fetch = pathname === server_location && is_initial_state;
        if (!ignore_fetch) {
          _context6.next = 16;
          break;
        }
        return _context6.abrupt("return");
      case 16:
        is_initial_state = false;
        if (process.env.BROWSER && window && window.optimize) {
          console.log('REFRESH ADS');
          window.optimize.refreshAll({
            refresh: false
          });
        }
        url = pathname;
        _context6.next = 21;
        return (0, _effects.put)(appActions.fetchDataBegin());
      case 21:
        _context6.prev = 21;
        _username = null;
        if (!process.env.BROWSER) {
          _context6.next = 29;
          break;
        }
        _context6.next = 26;
        return (0, _effects.select)(function (state) {
          return [state.user.getIn(['current', 'username'])];
        });
      case 26:
        _yield$select = _context6.sent;
        _yield$select2 = (0, _slicedToArray2["default"])(_yield$select, 1);
        _username = _yield$select2[0];
      case 29:
        _context6.next = 31;
        return (0, _effects.call)(_blurtApi.getStateAsync, url, _username, null);
      case 31:
        state = _context6.sent;
        _context6.next = 34;
        return (0, _effects.put)(globalActions.receiveState(state));
      case 34:
        _context6.next = 36;
        return (0, _effects.call)(syncSpecialPosts);
      case 36:
        _context6.next = 43;
        break;
      case 38:
        _context6.prev = 38;
        _context6.t0 = _context6["catch"](21);
        console.error('~~ Saga fetchState error ~~>', url, _context6.t0);
        _context6.next = 43;
        return (0, _effects.put)(appActions.blurtApiError(_context6.t0.message));
      case 43:
        _context6.next = 45;
        return (0, _effects.put)(appActions.fetchDataEnd());
      case 45:
      case "end":
        return _context6.stop();
    }
  }, _marked6, null, [[21, 38]]);
}
function syncSpecialPosts() {
  var specialPosts, seenFeaturedPosts, seenPromotedPosts;
  return _regenerator["default"].wrap(function syncSpecialPosts$(_context7) {
    while (1) switch (_context7.prev = _context7.next) {
      case 0:
        if (process.env.BROWSER) {
          _context7.next = 2;
          break;
        }
        return _context7.abrupt("return", null);
      case 2:
        _context7.next = 4;
        return (0, _effects.select)(function (state) {
          return state.offchain.get('special_posts');
        });
      case 4:
        specialPosts = _context7.sent;
        // Mark seen featured posts.
        seenFeaturedPosts = specialPosts.get('featured_posts').map(function (post) {
          var id = "".concat(post.get('author'), "/").concat(post.get('permlink'));
          return post.set('seen', localStorage.getItem("featured-post-seen:".concat(id)) === 'true');
        }); // Mark seen promoted posts.
        seenPromotedPosts = specialPosts.get('promoted_posts').map(function (post) {
          var id = "".concat(post.get('author'), "/").concat(post.get('permlink'));
          return post.set('seen', localStorage.getItem("promoted-post-seen:".concat(id)) === 'true');
        }); // Look up seen post URLs.
        _context7.next = 9;
        return (0, _effects.put)(globalActions.syncSpecialPosts({
          featuredPosts: seenFeaturedPosts,
          promotedPosts: seenPromotedPosts
        }));
      case 9:
        // Mark all featured posts as seen.
        specialPosts.get('featured_posts').forEach(function (post) {
          var id = "".concat(post.get('author'), "/").concat(post.get('permlink'));
          localStorage.setItem("featured-post-seen:".concat(id), 'true');
        });

        // Mark all promoted posts as seen.
        specialPosts.get('promoted_posts').forEach(function (post) {
          var id = "".concat(post.get('author'), "/").concat(post.get('permlink'));
          localStorage.setItem("promoted-post-seen:".concat(id), 'true');
        });
      case 11:
      case "end":
        return _context7.stop();
    }
  }, _marked7);
}

/**
 * Request account data for a set of usernames.
 *
 * @todo batch the put()s
 *
 * @param {Iterable} usernames
 */
function getAccounts(usernames) {
  var accounts;
  return _regenerator["default"].wrap(function getAccounts$(_context8) {
    while (1) switch (_context8.prev = _context8.next) {
      case 0:
        _context8.next = 2;
        return (0, _effects.call)([_blurtjs.api, _blurtjs.api.getAccountsAsync], usernames);
      case 2:
        accounts = _context8.sent;
        _context8.next = 5;
        return (0, _effects.put)(globalActions.receiveAccounts({
          accounts: accounts
        }));
      case 5:
      case "end":
        return _context8.stop();
    }
  }, _marked8);
}

/**
 * Request notifications for given account
 * @param {object} payload containing:
 *   - account (string)
 *   - last_id (string), optional, for pagination
 *   - limit (int), optional, defualt is 100
 */
function getAccountNotifications(action) {
  var _notifications, isLastPage;
  return _regenerator["default"].wrap(function getAccountNotifications$(_context9) {
    while (1) switch (_context9.prev = _context9.next) {
      case 0:
        if (action.payload) {
          _context9.next = 2;
          break;
        }
        throw 'no account specified';
      case 2:
        _context9.next = 4;
        return (0, _effects.put)(globalActions.notificationsLoading(true));
      case 4:
        _context9.prev = 4;
        _context9.next = 7;
        return (0, _effects.call)(_blurtApi.callBridge, 'account_notifications', action.payload);
      case 7:
        _notifications = _context9.sent;
        if (!(_notifications && _notifications.error)) {
          _context9.next = 14;
          break;
        }
        console.error('~~ Saga getAccountNotifications error ~~>', _notifications.error);
        _context9.next = 12;
        return (0, _effects.put)(appActions.blurtApiError(_notifications.error.message));
      case 12:
        _context9.next = 17;
        break;
      case 14:
        isLastPage = _notifications.length < action.payload.limit;
        _context9.next = 17;
        return (0, _effects.put)(globalActions.receiveNotifications({
          name: action.payload.account,
          notifications: _notifications,
          isLastPage: isLastPage
        }));
      case 17:
        _context9.next = 24;
        break;
      case 19:
        _context9.prev = 19;
        _context9.t0 = _context9["catch"](4);
        console.error('~~ Saga getAccountNotifications error ~~>', _context9.t0);
        _context9.next = 24;
        return (0, _effects.put)(appActions.blurtApiError(_context9.t0.message));
      case 24:
        _context9.next = 26;
        return (0, _effects.put)(globalActions.notificationsLoading(false));
      case 26:
      case "end":
        return _context9.stop();
    }
  }, _marked9, null, [[4, 19]]);
}

/**
 * Request unread notifications for given account
 * @param {object} payload containing:
 *   - account (string)
 */

function getAccountUnreadNotifications(action) {
  var unreadNotifications;
  return _regenerator["default"].wrap(function getAccountUnreadNotifications$(_context10) {
    while (1) switch (_context10.prev = _context10.next) {
      case 0:
        if (action.payload) {
          _context10.next = 2;
          break;
        }
        throw 'no account specified';
      case 2:
        _context10.next = 4;
        return (0, _effects.put)(globalActions.notificationsLoading(true));
      case 4:
        _context10.prev = 4;
        _context10.next = 7;
        return (0, _effects.call)(_blurtApi.callBridge, 'unread_notifications', action.payload);
      case 7:
        unreadNotifications = _context10.sent;
        if (!(unreadNotifications && unreadNotifications.error)) {
          _context10.next = 14;
          break;
        }
        console.error('~~ Saga getAccountUnreadNotifications error ~~>', unreadNotifications.error);
        _context10.next = 12;
        return (0, _effects.put)(appActions.blurtApiError(notifications.error.message));
      case 12:
        _context10.next = 16;
        break;
      case 14:
        _context10.next = 16;
        return (0, _effects.put)(globalActions.receiveUnreadNotifications({
          name: action.payload.account,
          unreadNotifications: unreadNotifications
        }));
      case 16:
        _context10.next = 23;
        break;
      case 18:
        _context10.prev = 18;
        _context10.t0 = _context10["catch"](4);
        console.error('~~ Saga getAccountUnreadNotifications error ~~>', _context10.t0);
        _context10.next = 23;
        return (0, _effects.put)(appActions.blurtApiError(_context10.t0.message));
      case 23:
        _context10.next = 25;
        return (0, _effects.put)(globalActions.notificationsLoading(false));
      case 25:
      case "end":
        return _context10.stop();
    }
  }, _marked10, null, [[4, 18]]);
}
function markNotificationsAsReadSaga(action) {
  var _action$payload3, timeNow, username, _successCallback, ops;
  return _regenerator["default"].wrap(function markNotificationsAsReadSaga$(_context11) {
    while (1) switch (_context11.prev = _context11.next) {
      case 0:
        console.log('markNotificationsAsReadSaga');
        _action$payload3 = action.payload, timeNow = _action$payload3.timeNow, username = _action$payload3.username, _successCallback = _action$payload3.successCallback;
        ops = ['setLastRead', {
          date: timeNow
        }];
        _context11.next = 5;
        return (0, _effects.put)(globalActions.notificationsLoading(true));
      case 5:
        _context11.prev = 5;
        _context11.next = 8;
        return (0, _effects.put)(transactionActions.broadcastOperation({
          type: 'custom_json',
          operation: {
            id: 'notify',
            required_posting_auths: [username],
            json: JSON.stringify(ops)
          },
          successCallback: function successCallback() {
            _successCallback(username, timeNow);
          },
          errorCallback: function errorCallback() {
            console.log('There was an error marking notifications as read!');
            globalActions.notificationsLoading(false);
          }
        }));
      case 8:
        _context11.next = 17;
        break;
      case 10:
        _context11.prev = 10;
        _context11.t0 = _context11["catch"](5);
        console.log('====================================');
        console.log(_context11.t0);
        console.log('====================================');
        _context11.next = 17;
        return (0, _effects.put)(globalActions.notificationsLoading(false));
      case 17:
      case "end":
        return _context11.stop();
    }
  }, _marked11, null, [[5, 10]]);
}
function fetchData(action) {
  var _action$payload4, order, author, permlink, postFilter, observer, category, call_name, args, fetched, endOfData, fetchLimitReached, fetchDone, batch, data, lastValue;
  return _regenerator["default"].wrap(function fetchData$(_context12) {
    while (1) switch (_context12.prev = _context12.next) {
      case 0:
        _action$payload4 = action.payload, order = _action$payload4.order, author = _action$payload4.author, permlink = _action$payload4.permlink, postFilter = _action$payload4.postFilter, observer = _action$payload4.observer;
        category = action.payload.category;
        if (!category) category = '';
        _context12.next = 5;
        return (0, _effects.put)(globalActions.fetchingData({
          order: order,
          category: category
        }));
      case 5:
        if (category[0] == '@') {
          call_name = 'get_account_posts';
          args = {
            sort: order,
            account: category.slice(1),
            limit: _constants["default"].FETCH_DATA_BATCH_SIZE,
            start_author: author,
            start_permlink: permlink,
            observer: observer
          };
        } else {
          call_name = 'get_ranked_posts';
          args = {
            sort: order,
            tag: category,
            limit: _constants["default"].FETCH_DATA_BATCH_SIZE,
            start_author: author,
            start_permlink: permlink,
            observer: observer
          };
        }
        _context12.next = 8;
        return (0, _effects.put)(appActions.fetchDataBegin());
      case 8:
        _context12.prev = 8;
        fetched = 0;
        endOfData = false;
        fetchLimitReached = false;
        fetchDone = false;
        batch = 0;
      case 14:
        if (fetchDone) {
          _context12.next = 28;
          break;
        }
        _context12.next = 17;
        return (0, _effects.call)(_blurtApi.callBridge, call_name, args);
      case 17:
        data = _context12.sent;
        endOfData = data.length < _constants["default"].FETCH_DATA_BATCH_SIZE;
        batch++;
        fetchLimitReached = batch >= _constants["default"].MAX_BATCHES;
        if (data.length > 0) {
          lastValue = data[data.length - 1];
          args.start_author = lastValue.author;
          args.start_permlink = lastValue.permlink;
        }

        // Still return all data but only count ones matching the filter.
        // Rely on UI to actually hide the posts.
        fetched += postFilter ? data.filter(postFilter).length : data.length;
        fetchDone = endOfData || fetchLimitReached || fetched >= _constants["default"].FETCH_DATA_BATCH_SIZE;
        _context12.next = 26;
        return (0, _effects.put)(globalActions.receiveData({
          data: data,
          order: order,
          category: category,
          author: author,
          fetching: !fetchDone,
          endOfData: endOfData
        }));
      case 26:
        _context12.next = 14;
        break;
      case 28:
        _context12.next = 35;
        break;
      case 30:
        _context12.prev = 30;
        _context12.t0 = _context12["catch"](8);
        console.error('~~ Saga fetchData error ~~>', call_name, args, _context12.t0);
        _context12.next = 35;
        return (0, _effects.put)(appActions.blurtApiError(_context12.t0.message));
      case 35:
        _context12.next = 37;
        return (0, _effects.put)(appActions.fetchDataEnd());
      case 37:
      case "end":
        return _context12.stop();
    }
  }, _marked12, null, [[8, 30]]);
}

/**
    @arg {string} id unique key for result global['fetchJson_' + id]
    @arg {string} url
    @arg {object} body (for JSON.stringify)
*/
function fetchJson(_ref) {
  var _ref$payload = _ref.payload,
    id = _ref$payload.id,
    url = _ref$payload.url,
    body = _ref$payload.body,
    successCallback = _ref$payload.successCallback,
    _ref$payload$skipLoad = _ref$payload.skipLoading,
    skipLoading = _ref$payload$skipLoad === void 0 ? false : _ref$payload$skipLoad;
  return /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var payload, result;
    return _regenerator["default"].wrap(function _callee$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          payload = {
            method: body ? 'POST' : 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : undefined
          };
          _context13.next = 4;
          return skipLoading ? fetch(url, payload) : (0, _effects.call)(fetch, url, payload);
        case 4:
          result = _context13.sent;
          _context13.next = 7;
          return result.json();
        case 7:
          result = _context13.sent;
          if (successCallback) result = successCallback(result);
          _context13.next = 11;
          return (0, _effects.put)(globalActions.fetchJsonResult({
            id: id,
            result: result
          }));
        case 11:
          _context13.next = 18;
          break;
        case 13:
          _context13.prev = 13;
          _context13.t0 = _context13["catch"](0);
          console.error('fetchJson', _context13.t0);
          _context13.next = 18;
          return (0, _effects.put)(globalActions.fetchJsonResult({
            id: id,
            error: _context13.t0
          }));
        case 18:
        case "end":
          return _context13.stop();
      }
    }, _callee, null, [[0, 13]]);
  })();
}

// Action creators
var actions = exports.actions = {
  getPostHeader: function getPostHeader(payload) {
    return {
      type: GET_POST_HEADER,
      payload: payload
    };
  },
  listCommunities: function listCommunities(payload) {
    return {
      type: LIST_COMMUNITIES,
      payload: payload
    };
  },
  getCommunity: function getCommunity(payload) {
    return {
      type: GET_COMMUNITY,
      payload: payload
    };
  },
  getSubscriptions: function getSubscriptions(payload) {
    return {
      type: GET_SUBSCRIPTIONS,
      payload: payload
    };
  },
  requestData: function requestData(payload) {
    return {
      type: REQUEST_DATA,
      payload: payload
    };
  },
  getContent: function getContent(payload) {
    return {
      type: GET_CONTENT,
      payload: payload
    };
  },
  fetchState: function fetchState(payload) {
    return {
      type: FETCH_STATE,
      payload: payload
    };
  },
  getAccountNotifications: function getAccountNotifications(payload) {
    return {
      type: GET_ACCOUNT_NOTIFICATIONS,
      payload: payload
    };
  },
  getAccountUnreadNotifications: function getAccountUnreadNotifications(payload) {
    return {
      type: GET_ACCOUNT_UNREAD_NOTIFICATIONS,
      payload: payload
    };
  },
  markNotificationsAsRead: function markNotificationsAsRead(payload) {
    return {
      type: MARK_NOTIFICATIONS_AS_READ,
      payload: payload
    };
  }
};