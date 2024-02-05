"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _CanonicalLinker = require("./CanonicalLinker");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
describe('makeCanonicalLink', function () {
  var post_data = {
    author: 'test',
    permlink: 'test-post',
    category: 'testing',
    link: '/testing/@test/test-post'
  };
  var test_cases = [['handles posts without app', _objectSpread(_objectSpread({}, post_data), {}, {
    json_metadata: {}
  }), 'https://blurt.world/testing/@test/test-post'], ['handles empty strings as app', _objectSpread(_objectSpread({}, post_data), {}, {
    json_metadata: {
      app: ''
    }
  }), 'https://blurt.world/testing/@test/test-post'], ["handles apps that don't exist", _objectSpread(_objectSpread({}, post_data), {}, {
    json_metadata: {
      app: 'fakeapp/1.2.3'
    }
  }), 'https://blurt.world/testing/@test/test-post'], ["handles app that don't exist without version", _objectSpread(_objectSpread({}, post_data), {}, {
    json_metadata: {
      app: 'fakeapp'
    }
  }), 'https://blurt.world/testing/@test/test-post'], ['handles apps that do exist', _objectSpread(_objectSpread({}, post_data), {}, {
    json_metadata: {
      app: 'busy/1.1.1'
    }
  }), 'https://busy.org/@test/test-post'], ['handles posts from steemit', _objectSpread(_objectSpread({}, post_data), {}, {
    json_metadata: {
      app: 'blurt/0.1'
    }
  }), 'https://blurt.world/testing/@test/test-post'], ['handles badly formatted app strings', _objectSpread(_objectSpread({}, post_data), {}, {
    json_metadata: {
      app: 'fakeapp/0.0.1/a////'
    }
  }), 'https://blurt.world/testing/@test/test-post'], ['handles objects as apps', _objectSpread(_objectSpread({}, post_data), {}, {
    json_metadata: {
      app: {
        this_is: 'an objct'
      }
    }
  }), 'https://blurt.world/testing/@test/test-post']];
  test_cases.forEach(function (v) {
    it(v[0], function () {
      expect((0, _CanonicalLinker.makeCanonicalLink)(v[1])).toBe(v[2]);
    });
  });
});