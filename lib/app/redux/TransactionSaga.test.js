"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _effects = require("redux-saga/effects");
var _blurtjs = _interopRequireWildcard(require("@blurtfoundation/blurtjs"));
var _utils = require("redux-saga/utils");
var transactionActions = _interopRequireWildcard(require("app/redux/TransactionReducer"));
var _TransactionSaga = require("./TransactionSaga");
var _client_config = require("app/client_config");
var _enzyme = require("enzyme");
var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-15"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/* global describe, it, before, beforeEach, after, afterEach */

(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact["default"]()
});
var operation = {
  type: 'comment',
  author: 'Alice',
  body: "The Body is a pretty long chunck of text that represents the user's voice, it seems they have much to say, and this is one place where they can do that.",
  category: 'hi',
  json_metadata: {
    tags: ['hi'],
    app: 'blurt/0.1',
    format: 'markdown'
  },
  parent_author: 'candide',
  parent_permlink: 'cool',
  title: 'test',
  __config: {},
  errorCallback: function errorCallback() {
    return '';
  },
  successCallback: function successCallback() {
    return '';
  },
  memo: '#testing'
};
var username = 'Beatrice';
describe('TransactionSaga', function () {
  describe('watch user actions and trigger appropriate saga', function () {
    var gen = _TransactionSaga.transactionWatches;
    it('should call the broadcastOperation saga with every transactionActions.BROADCAST_OPERATION action', function () {
      expect(gen).toEqual([(0, _effects.takeEvery)(transactionActions.BROADCAST_OPERATION, _TransactionSaga.broadcastOperation)]);
    });
  });
  describe('createPatch', function () {
    it('should return undefined if empty arguments are passed', function () {
      var actual = (0, _TransactionSaga.createPatch)('', '');
      expect(actual).toEqual(undefined);
    });
    it('should return the patch that reconciles two different strings', function () {
      var testString = 'there is something interesting going on here that I do not fully understand it is seemingly complex but it is actually quite simple';
      var actual = (0, _TransactionSaga.createPatch)(testString, testString + 'ILU');
      expect(actual).toEqual('@@ -120,12 +120,15 @@\n quite simple\n+ILU\n');
    });
  });
  describe('createPermlink', function () {
    var gen = (0, _TransactionSaga.createPermlink)(operation.title, operation.author);
    it('should call the api to get a permlink if the title is valid', function () {
      var actual = gen.next().value;
      var mockCall = (0, _effects.call)([_blurtjs.api, _blurtjs.api.getContentAsync], operation.author, operation.title);
      expect(actual).toEqual(mockCall);
    });
    it('should return a string containing the transformed data from the api', function () {
      var permlink = gen.next({
        body: 'test'
      }).value;
      expect(permlink.indexOf('test') > -1).toEqual(true); // TODO: cannot deep equal due to date stamp at runtime.
    });
    it('should generate own permlink, independent of api if title is empty', function () {
      var gen2 = (0, _TransactionSaga.createPermlink)('', operation.author);
      var actual = gen2.next().value;
      expect(actual.match(/^[a-z0-9]{6}$/) !== null).toEqual(true);
    });
  });
  describe('preBroadcast_comment', function () {
    var gen = (0, _TransactionSaga.preBroadcast_comment)({
      operation: operation,
      username: username
    });
    it('should call createPermlink', function () {
      var permlink = gen.next(operation.title, operation.author).value;
      var actual = permlink.next().value;
      var expected = (0, _effects.call)([_blurtjs.api, _blurtjs.api.getContentAsync], operation.author, operation.title);
      expect(expected).toEqual(actual);
    });
    it('should return the comment options array.', function () {
      var actual = gen.next('mock-permlink-123').value;
      var expected = [['comment', {
        author: operation.author,
        category: operation.category,
        errorCallback: operation.errorCallback,
        successCallback: operation.successCallback,
        parent_author: operation.parent_author,
        parent_permlink: operation.parent_permlink,
        type: operation.type,
        __config: operation.__config,
        memo: operation.memo,
        permlink: 'mock-permlink-123',
        json_metadata: JSON.stringify(operation.json_metadata),
        title: (operation.title || '').trim(),
        body: operation.body
      }]];
      expect(actual).toEqual(expected);
    });
    it('should return a patch as body value if patch is smaller than body.', function () {
      var originalBod = operation.body + 'minor difference';
      operation.__config.originalBody = originalBod;
      gen = (0, _TransactionSaga.preBroadcast_comment)({
        operation: operation,
        username: username
      });
      gen.next(operation.title, operation.author, operation.parent_author, operation.parent_permlink);
      var actual = gen.next('mock-permlink-123').value;
      var expected = (0, _TransactionSaga.createPatch)(originalBod, operation.body);
      expect(actual[0][1].body).toEqual(expected);
    });
    it('should return body as body value if patch is larger than body.', function () {
      var originalBod = 'major difference';
      operation.__config.originalBody = originalBod;
      gen = (0, _TransactionSaga.preBroadcast_comment)({
        operation: operation,
        username: username
      });
      gen.next(operation.title, operation.author, operation.parent_author, operation.parent_permlink);
      var actual = gen.next('mock-permlink-123').value;
      var expected = operation.body;
      expect(actual[0][1].body).toEqual(expected, 'utf-8');
    });
  });
});