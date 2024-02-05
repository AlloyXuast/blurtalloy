"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _effects = require("redux-saga/effects");
var _blurtjs = require("@blurtfoundation/blurtjs");
var _blurtApi = require("app/utils/blurtApi");
var appActions = _interopRequireWildcard(require("./AppReducer"));
var globalActions = _interopRequireWildcard(require("./GlobalReducer"));
var _constants = _interopRequireDefault(require("./constants"));
var _FetchDataSaga = require("./FetchDataSaga");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
describe('FetchDataSaga', function () {
  describe('should fetch multiple and filter', function () {
    var payload = {
      order: 'blog',
      author: 'alice',
      permlink: 'hair',
      category: '@bob',
      postFilter: function postFilter(value) {
        return value.author === 'bob';
      }
    };
    var action = {
      category: '',
      payload: payload
    };
    _constants["default"].FETCH_DATA_BATCH_SIZE = 2;
    var gen = (0, _FetchDataSaga.fetchData)(action);
    it('should signal data fetch', function () {
      var actual = gen.next().value;
      expect(actual).toEqual((0, _effects.put)(globalActions.fetchingData({
        order: 'blog',
        category: '@bob'
      })));
    });
    it('should call discussions by blog', function () {
      var actual = gen.next().value;
      expect(actual).toEqual((0, _effects.put)(appActions.fetchDataBegin()));
      actual = gen.next().value;
      expect(actual).toEqual((0, _effects.call)(_blurtApi.callBridge, 'get_account_posts', {
        sort: 'blog',
        account: payload.category.slice(1),
        limit: _constants["default"].FETCH_DATA_BATCH_SIZE,
        start_author: payload.author,
        start_permlink: payload.permlink
      }));
    });
    it('should continue fetching data filtering 1 out', function () {
      var actual = gen.next([{
        author: 'alice'
      }, {
        author: 'bob',
        permlink: 'post1'
      }]).value;
      expect(actual).toEqual((0, _effects.put)(globalActions.receiveData({
        data: [{
          author: 'alice'
        }, {
          author: 'bob',
          permlink: 'post1'
        }],
        order: 'blog',
        category: '@bob',
        author: 'alice',
        fetching: true,
        endOfData: false
      })));
    });
    it('should finish fetching data filtering 1 out', function () {
      var actual = gen.next().value;
      expect(actual).toEqual((0, _effects.call)(_blurtApi.callBridge, 'get_account_posts', {
        sort: 'blog',
        account: payload.category.slice(1),
        limit: _constants["default"].FETCH_DATA_BATCH_SIZE,
        start_author: 'bob',
        start_permlink: 'post1'
      }));
      actual = gen.next([{
        author: 'bob',
        permlink: 'post2'
      }]).value;
      expect(actual).toEqual((0, _effects.put)(globalActions.receiveData({
        data: [{
          author: 'bob',
          permlink: 'post2'
        }],
        order: 'blog',
        category: '@bob',
        author: 'alice',
        fetching: false,
        endOfData: true
      })));
      actual = gen.next().value;
      expect(actual).toEqual((0, _effects.put)(appActions.fetchDataEnd()));
    });
  });
  describe('should not fetch more batches than max batch size', function () {
    var payload = {
      order: 'blog',
      author: 'alice',
      permlink: 'hair',
      category: '@bob',
      postFilter: function postFilter(value) {
        return value.author === 'bob';
      }
    };
    var action = {
      category: '',
      payload: payload
    };
    _constants["default"].FETCH_DATA_BATCH_SIZE = 2;
    _constants["default"].MAX_BATCHES = 2;
    var gen = (0, _FetchDataSaga.fetchData)(action);
    var actual = gen.next().value;
    expect(actual).toEqual((0, _effects.put)(globalActions.fetchingData({
      order: 'blog',
      category: '@bob'
    })));
    actual = gen.next().value;
    expect(actual).toEqual((0, _effects.put)(appActions.fetchDataBegin()));
    actual = gen.next().value;
    expect(actual).toEqual((0, _effects.call)(_blurtApi.callBridge, 'get_account_posts', {
      sort: 'blog',
      account: payload.category.slice(1),
      limit: _constants["default"].FETCH_DATA_BATCH_SIZE,
      start_author: payload.author,
      start_permlink: payload.permlink
    }));

    // these all will not satisfy the filter
    actual = gen.next([{
      author: 'alice'
    }, {
      author: 'alice'
    }]).value;
    expect(actual).toEqual((0, _effects.put)(globalActions.receiveData({
      data: [{
        author: 'alice'
      }, {
        author: 'alice'
      }],
      order: 'blog',
      category: '@bob',
      author: 'alice',
      fetching: true,
      endOfData: false
    })));
    actual = gen.next().value;
    expect(actual).toEqual((0, _effects.call)(_blurtApi.callBridge, 'get_account_posts', {
      sort: 'blog',
      account: payload.category.slice(1),
      limit: _constants["default"].FETCH_DATA_BATCH_SIZE,
      start_author: 'alice'
    }));
    actual = gen.next([{
      author: 'alice'
    }, {
      author: 'alice'
    }]).value;
    expect(actual).toEqual((0, _effects.put)(globalActions.receiveData({
      data: [{
        author: 'alice'
      }, {
        author: 'alice'
      }],
      order: 'blog',
      category: '@bob',
      author: 'alice',
      fetching: false,
      endOfData: false
    })));
    actual = gen.next().value;
    expect(actual).toEqual((0, _effects.put)(appActions.fetchDataEnd()));
  });
});