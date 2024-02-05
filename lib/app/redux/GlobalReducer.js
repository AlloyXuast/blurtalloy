"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET_STATE = void 0;
exports["default"] = reducer;
exports.voted = exports.update = exports.syncSpecialPosts = exports.showDialog = exports.setCollapsed = exports.set = exports.remove = exports.receiveUnreadNotifications = exports.receiveSubscriptions = exports.receiveState = exports.receivePostHeader = exports.receiveNotifications = exports.receiveData = exports.receiveContent = exports.receiveCommunity = exports.receiveCommunities = exports.receiveAccounts = exports.receiveAccount = exports.notificationsLoading = exports.loadingSubscriptions = exports.linkReply = exports.hideDialog = exports.getState = exports.fetchingData = exports.fetchJsonResult = exports.fetchJson = exports.emptyContentMap = exports.deleteContent = exports.defaultState = void 0;
var _immutable = require("immutable");
var _ResolveRoute = _interopRequireDefault(require("app/ResolveRoute"));
var _EmptyState = require("app/redux/EmptyState");
var _StateFunctions = require("app/utils/StateFunctions");
var _constants = _interopRequireDefault(require("./constants"));
var emptyContentMap = exports.emptyContentMap = (0, _immutable.Map)(_EmptyState.emptyContent);
var defaultState = exports.defaultState = (0, _immutable.Map)({
  status: {}
});

// Action constants
var SET_COLLAPSED = 'global/SET_COLLAPSED';
var RECEIVE_STATE = 'global/RECEIVE_STATE';
var RECEIVE_ACCOUNT = 'global/RECEIVE_ACCOUNT';
var RECEIVE_ACCOUNTS = 'global/RECEIVE_ACCOUNTS';
var RECEIVE_POST_HEADER = 'global/RECEIVE_POST_HEADER';
var RECEIVE_COMMUNITY = 'global/RECEIVE_COMMUNITY';
var RECEIVE_COMMUNITIES = 'global/RECEIVE_COMMUNITIES';
var LOADING_SUBSCRIPTIONS = 'global/LOADING_SUBSCRIPTIONS';
var RECEIVE_SUBSCRIPTIONS = 'global/RECEIVE_SUBSCRIPTIONS';
var NOTIFICATIONS_LOADING = 'global/NOTIFICATIONS_LOADING';
var SYNC_SPECIAL_POSTS = 'global/SYNC_SPECIAL_POSTS';
var RECEIVE_CONTENT = 'global/RECEIVE_CONTENT';
var LINK_REPLY = 'global/LINK_REPLY';
var DELETE_CONTENT = 'global/DELETE_CONTENT';
var VOTED = 'global/VOTED';
var FETCHING_DATA = 'global/FETCHING_DATA';
var RECEIVE_DATA = 'global/RECEIVE_DATA';
var SET = 'global/SET';
var REMOVE = 'global/REMOVE';
var UPDATE = 'global/UPDATE';
var FETCH_JSON = 'global/FETCH_JSON';
var FETCH_JSON_RESULT = 'global/FETCH_JSON_RESULT';
var SHOW_DIALOG = 'global/SHOW_DIALOG';
var HIDE_DIALOG = 'global/HIDE_DIALOG';
// Saga-related:
var GET_STATE = exports.GET_STATE = 'global/GET_STATE';
var RECEIVE_NOTIFICATIONS = 'global/RECEIVE_NOTIFICATIONS';
var RECEIVE_UNREAD_NOTIFICATIONS = 'global/RECEIVE_UNREAD_NOTIFICATIONS';

/**
 * Transfrom nested JS object to appropriate immutable collection.
 *
 * @param {Object} account
 */

var transformAccount = function transformAccount(account) {
  return (0, _immutable.fromJS)(account, function (key, value) {
    if (key === 'witness_votes') return value.toSet();
    var isIndexed = _immutable.Iterable.isIndexed(value);
    return isIndexed ? value.toList() : value.toOrderedMap();
  });
};

/**
 * Merging accounts: A get_state will provide a very full account but a get_accounts will provide a smaller version this makes sure we don't overwrite
 *
 * @param {Immutable.Map} state
 * @param {Immutable.Map} account
 *
 */

var mergeAccounts = function mergeAccounts(state, account) {
  return state.updateIn(['accounts', account.get('name')], (0, _immutable.Map)(), function (a) {
    return a.mergeDeep(account);
  });
};
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var payload = action.payload;

  // Set post category
  var pathname = state.get('pathname');
  if (pathname) {
    var route = (0, _ResolveRoute["default"])(pathname);
    if (route.page === 'PostsIndex') {
      var postCategory = route.params[1];
      state = state.set('postCategory', postCategory);
    }
  }
  switch (action.type) {
    case SET_COLLAPSED:
      {
        return state.withMutations(function (map) {
          map.updateIn(['content', payload.post], function (value) {
            return value.merge((0, _immutable.Map)({
              collapsed: payload.collapsed
            }));
          });
        });
      }
    case RECEIVE_STATE:
      {
        console.log('Merging state');
        return state.mergeDeep((0, _immutable.fromJS)(payload));
      }
    case RECEIVE_NOTIFICATIONS:
      {
        console.log('Receive notifications', payload);
        // Need to figure out why two sets are not merged
        return state.updateIn(['notifications', payload.name], (0, _immutable.Map)(), function (n) {
          return n.withMutations(function (nmut) {
            return nmut.update('notifications', (0, _immutable.List)(), function (a) {
              return a.concat((0, _immutable.fromJS)(payload.notifications));
            }).set('isLastPage', payload.isLastPage);
          });
        });
      }
    case RECEIVE_UNREAD_NOTIFICATIONS:
      {
        console.log('Receive unread notifications', payload);
        return state.setIn(['notifications', payload.name, 'unreadNotifications'], (0, _immutable.Map)(payload.unreadNotifications));
      }
    case RECEIVE_ACCOUNT:
      {
        var account = transformAccount(payload.account);
        return mergeAccounts(state, account);
      }
    case RECEIVE_ACCOUNTS:
      {
        return payload.accounts.reduce(function (acc, curr) {
          var transformed = transformAccount(curr);
          return mergeAccounts(acc, transformed);
        }, state);
      }
    case RECEIVE_POST_HEADER:
      {
        return state.update('headers', (0, _immutable.Map)(), function (a) {
          return a.mergeDeep((0, _immutable.fromJS)(payload));
        });
      }
    case RECEIVE_COMMUNITIES:
      {
        var map = (0, _immutable.Map)(payload.map(function (c) {
          return [c.name, (0, _immutable.fromJS)(c)];
        }));
        var idx = (0, _immutable.List)(payload.map(function (c) {
          return c.name;
        }));
        return state.setIn(['community'], map).setIn(['community_idx'], idx);
      }
    case RECEIVE_COMMUNITY:
      {
        return state.update('community', (0, _immutable.Map)(), function (a) {
          return a.mergeDeep(payload);
        });
      }
    case LOADING_SUBSCRIPTIONS:
      {
        return state.setIn(['subscriptions', 'loading'], payload);
      }
    case RECEIVE_SUBSCRIPTIONS:
      {
        return state.setIn(['subscriptions', payload.username], (0, _immutable.fromJS)(payload.subscriptions));
      }
    case NOTIFICATIONS_LOADING:
      {
        return state.setIn(['notifications', 'loading'], payload);
      }

    // Interleave special posts into the map of posts.
    case SYNC_SPECIAL_POSTS:
      {
        return payload.featuredPosts.concat(payload.promotedPosts).reduce(function (acc, specialPost) {
          var author = specialPost.get('author');
          var permlink = specialPost.get('permlink');
          return acc.updateIn(['content', "".concat(author, "/").concat(permlink)], (0, _immutable.Map)(), function (p) {
            return p.mergeDeep(specialPost);
          });
        }, state);
      }
    case RECEIVE_CONTENT:
      {
        var content = (0, _immutable.fromJS)(payload.content);
        var key = content.get('author') + '/' + content.get('permlink');
        console.log('received content...');
        // merge content object into map
        var new_state = state.updateIn(['content', key], (0, _immutable.Map)(), function (c) {
          c = emptyContentMap.mergeDeep(c);
          c = c["delete"]('active_votes');
          c = c.mergeDeep(content);
          return c;
        });
        // set creation-pending key (optimistic UI update)
        if (content.get('depth') == 0) {
          var category = content.get('category');
          var dkey = ['discussion_idx', category, '_created'];
          new_state = new_state.setIn(dkey, key);
        }
        return new_state;
      }
    case LINK_REPLY:
      {
        var author = payload.author,
          permlink = payload.permlink,
          _payload$parent_autho = payload.parent_author,
          parent_author = _payload$parent_autho === void 0 ? '' : _payload$parent_autho,
          _payload$parent_perml = payload.parent_permlink,
          parent_permlink = _payload$parent_perml === void 0 ? '' : _payload$parent_perml;
        if (parent_author === '' || parent_permlink === '') return state;
        var _key = author + '/' + permlink;
        var parent_key = parent_author + '/' + parent_permlink;
        // Add key if not exist
        var updatedState = state.updateIn(['content', parent_key, 'replies'], (0, _immutable.List)(), function (l) {
          return l.findIndex(function (i) {
            return i === _key;
          }) === -1 ? l.push(_key) : l;
        });
        var children = updatedState.getIn(['content', parent_key, 'replies'], (0, _immutable.List)()).size;
        updatedState = updatedState.updateIn(['content', parent_key, 'children'], 0, function () {
          return children;
        });
        return updatedState;
      }
    case DELETE_CONTENT:
      {
        var _author = payload.author,
          _permlink = payload.permlink;
        var _key2 = _author + '/' + _permlink;
        var _content = state.getIn(['content', _key2]);
        var _parent_author = _content.get('parent_author') || '';
        var _parent_permlink = _content.get('parent_permlink') || '';
        var _updatedState = state.deleteIn(['content', _key2]);
        if (_parent_author !== '' && _parent_permlink !== '') {
          var _parent_key = _parent_author + '/' + _parent_permlink;
          _updatedState = _updatedState.updateIn(['content', _parent_key, 'replies'], (0, _immutable.List)(), function (r) {
            return r.filter(function (i) {
              return i !== _key2;
            });
          });
        }
        return _updatedState;
      }
    case VOTED:
      {
        // merge content object into map
        var username = payload.username,
          _author2 = payload.author,
          _permlink2 = payload.permlink,
          weight = payload.weight;
        var vote = (0, _immutable.Map)({
          voter: username,
          percent: weight
        });
        var _key3 = ['content', _author2 + '/' + _permlink2, 'active_votes'];
        var _new_state = state.updateIn(_key3, (0, _immutable.List)(), function (active_votes) {
          var idx = active_votes.findIndex(function (v) {
            return v.get('voter') === username;
          });
          active_votes = idx === -1 ? active_votes.push(vote) : active_votes.set(idx, vote);
          return active_votes;
        });
        return _new_state;
      }
    case FETCHING_DATA:
      {
        var order = payload.order,
          _category = payload.category;
        var _new_state2 = state.updateIn(['status', _category || '', order], function () {
          return {
            fetching: true
          };
        });
        return _new_state2;
      }
    case RECEIVE_DATA:
      {
        var data = payload.data,
          _order = payload.order,
          _category2 = payload.category,
          fetching = payload.fetching,
          endOfData = payload.endOfData;
        var _new_state3;

        // append content keys to `discussion_idx` list
        var _key4 = ['discussion_idx', _category2 || '', _order];
        _new_state3 = state.updateIn(_key4, (0, _immutable.List)(), function (list) {
          return list.withMutations(function (posts) {
            data.forEach(function (value) {
              var key = "".concat(value.author, "/").concat(value.permlink);
              if (!posts.includes(key)) posts.push(key);
            });
          });
        });

        // append content to `content` map
        _new_state3 = _new_state3.updateIn(['content'], function (content) {
          return content.withMutations(function (map) {
            data.forEach(function (value) {
              var key = "".concat(value.author, "/").concat(value.permlink);
              map.set(key, (0, _immutable.fromJS)(value));
            });
          });
        });
        _new_state3 = _new_state3.updateIn(['status', _category2 || '', _order], function () {
          if (endOfData) {
            return {
              fetching: fetching,
              last_fetch: new Date()
            };
          }
          return {
            fetching: fetching
          };
        });
        return _new_state3;
      }
    case SET:
      {
        var _key5 = payload.key,
          value = payload.value;
        var key_array = Array.isArray(_key5) ? _key5 : [_key5];
        return state.setIn(key_array, (0, _immutable.fromJS)(value));
      }
    case REMOVE:
      {
        var _key6 = Array.isArray(payload.key) ? payload.key : [payload.key];
        return state.removeIn(_key6);
      }
    case UPDATE:
      {
        var _key7 = payload.key,
          _payload$notSet = payload.notSet,
          notSet = _payload$notSet === void 0 ? (0, _immutable.Map)() : _payload$notSet,
          updater = payload.updater;
        return state.updateIn(_key7, notSet, updater);
      }
    case FETCH_JSON:
      {
        return state;
      }
    case FETCH_JSON_RESULT:
      {
        var id = payload.id,
          result = payload.result,
          error = payload.error;
        return state.set(id, (0, _immutable.fromJS)({
          result: result,
          error: error
        }));
      }
    case SHOW_DIALOG:
      {
        var name = payload.name,
          _payload$params = payload.params,
          params = _payload$params === void 0 ? {} : _payload$params;
        return state.update('active_dialogs', (0, _immutable.Map)(), function (d) {
          return d.set(name, (0, _immutable.fromJS)({
            params: params
          }));
        });
      }
    case HIDE_DIALOG:
      {
        return state.update('active_dialogs', function (d) {
          return d["delete"](payload.name);
        });
      }
    default:
      return state;
  }
}

// Action creators

var setCollapsed = exports.setCollapsed = function setCollapsed(payload) {
  return {
    type: SET_COLLAPSED,
    payload: payload
  };
};
var receiveState = exports.receiveState = function receiveState(payload) {
  return {
    type: RECEIVE_STATE,
    payload: payload
  };
};
var receiveAccount = exports.receiveAccount = function receiveAccount(payload) {
  return {
    type: RECEIVE_ACCOUNT,
    payload: payload
  };
};
var receiveAccounts = exports.receiveAccounts = function receiveAccounts(payload) {
  return {
    type: RECEIVE_ACCOUNTS,
    payload: payload
  };
};
var receivePostHeader = exports.receivePostHeader = function receivePostHeader(payload) {
  return {
    type: RECEIVE_POST_HEADER,
    payload: payload
  };
};
var receiveCommunities = exports.receiveCommunities = function receiveCommunities(payload) {
  return {
    type: RECEIVE_COMMUNITIES,
    payload: payload
  };
};
var receiveCommunity = exports.receiveCommunity = function receiveCommunity(payload) {
  return {
    type: RECEIVE_COMMUNITY,
    payload: payload
  };
};
var receiveSubscriptions = exports.receiveSubscriptions = function receiveSubscriptions(payload) {
  return {
    type: RECEIVE_SUBSCRIPTIONS,
    payload: payload
  };
};
var loadingSubscriptions = exports.loadingSubscriptions = function loadingSubscriptions(payload) {
  return {
    type: LOADING_SUBSCRIPTIONS,
    payload: payload
  };
};
var notificationsLoading = exports.notificationsLoading = function notificationsLoading(payload) {
  return {
    type: NOTIFICATIONS_LOADING,
    payload: payload
  };
};
var syncSpecialPosts = exports.syncSpecialPosts = function syncSpecialPosts(payload) {
  return {
    type: SYNC_SPECIAL_POSTS,
    payload: payload
  };
};
var receiveContent = exports.receiveContent = function receiveContent(payload) {
  return {
    type: RECEIVE_CONTENT,
    payload: payload
  };
};
var linkReply = exports.linkReply = function linkReply(payload) {
  return {
    type: LINK_REPLY,
    payload: payload
  };
};
var deleteContent = exports.deleteContent = function deleteContent(payload) {
  return {
    type: DELETE_CONTENT,
    payload: payload
  };
};
var voted = exports.voted = function voted(payload) {
  return {
    type: VOTED,
    payload: payload
  };
};
var fetchingData = exports.fetchingData = function fetchingData(payload) {
  return {
    type: FETCHING_DATA,
    payload: payload
  };
};
var receiveData = exports.receiveData = function receiveData(payload) {
  return {
    type: RECEIVE_DATA,
    payload: payload
  };
};

// TODO: Find a better name for this
var set = exports.set = function set(payload) {
  return {
    type: SET,
    payload: payload
  };
};
var remove = exports.remove = function remove(payload) {
  return {
    type: REMOVE,
    payload: payload
  };
};
var update = exports.update = function update(payload) {
  return {
    type: UPDATE,
    payload: payload
  };
};
var fetchJson = exports.fetchJson = function fetchJson(payload) {
  return {
    type: FETCH_JSON,
    payload: payload
  };
};
var fetchJsonResult = exports.fetchJsonResult = function fetchJsonResult(payload) {
  return {
    type: FETCH_JSON_RESULT,
    payload: payload
  };
};
var showDialog = exports.showDialog = function showDialog(payload) {
  return {
    type: SHOW_DIALOG,
    payload: payload
  };
};
var hideDialog = exports.hideDialog = function hideDialog(payload) {
  return {
    type: HIDE_DIALOG,
    payload: payload
  };
};
var getState = exports.getState = function getState(payload) {
  return {
    type: GET_STATE,
    payload: payload
  };
};
var receiveNotifications = exports.receiveNotifications = function receiveNotifications(payload) {
  return {
    type: RECEIVE_NOTIFICATIONS,
    payload: payload
  };
};
var receiveUnreadNotifications = exports.receiveUnreadNotifications = function receiveUnreadNotifications(payload) {
  return {
    type: RECEIVE_UNREAD_NOTIFICATIONS,
    payload: payload
  };
};