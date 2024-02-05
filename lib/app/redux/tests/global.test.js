"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _immutable = _interopRequireDefault(require("immutable"));
var _GlobalReducer = _interopRequireWildcard(require("../GlobalReducer"));
var globalActions = _GlobalReducer;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/* global describe, it, before, beforeEach, after, afterEach */

describe('global reducer', function () {
  it('should return empty state', function () {
    var reduced = (0, _GlobalReducer["default"])(undefined, {});
    expect(reduced.toJS()).toEqual({
      status: {}
    });
  });
  it('should apply new global state', function () {
    var state = _immutable["default"].fromJS(require('./global.json'));
    var reduced = (0, _GlobalReducer["default"])(undefined, globalActions.receiveState(state));
    // const action = {type: 'global/RECEIVE_STATE', payload: state};
    expect(reduced.toJS()).toEqual(state.toJS());
  });
});