"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _assert = _interopRequireDefault(require("assert"));
var _secureRandom = _interopRequireDefault(require("secure-random"));
var _Links = _interopRequireWildcard(require("app/utils/Links"));
var linksRe = _Links;
var _constants = require("../../shared/constants");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
describe('Links', function () {
  it('all', function () {
    match(linksRe.any(), "https://example.com/wiki/Poe's_law", "https://example.com/wiki/Poe's_law");
    match(linksRe.any(), "https://example.com'", 'https://example.com');
    match(linksRe.any(), '"https://example.com', 'https://example.com');
    match(linksRe.any(), 'https://example.com"', 'https://example.com');
    match(linksRe.any(), "https://example.com'", 'https://example.com');
    match(linksRe.any(), 'https://example.com<', 'https://example.com');
    match(linksRe.any(), 'https://example.com>', 'https://example.com');
    match(linksRe.any(), 'https://example.com\n', 'https://example.com');
    match(linksRe.any(), ' https://example.com ', 'https://example.com');
    match(linksRe.any(), 'https://example.com ', 'https://example.com');
    match(linksRe.any(), 'https://example.com.', 'https://example.com');
    match(linksRe.any(), 'https://example.com/page.', 'https://example.com/page');
    match(linksRe.any(), 'https://example.com,', 'https://example.com');
    match(linksRe.any(), 'https://example.com/page,', 'https://example.com/page');
  });
  it('multiple matches', function () {
    var all = linksRe.any('ig');
    var match = all.exec('\nhttps://example.com/1\nhttps://example.com/2');
    _assert["default"].equal(match[0], 'https://example.com/1');
    match = all.exec('https://example.com/1 https://example.com/2');
    _assert["default"].equal(match[0], 'https://example.com/2');
  });
  it('by domain', function () {
    var locals = ['https://localhost/', 'http://blurt.world', 'http://blurt.world/group'];
    match(linksRe.local(), locals);
    matchNot(linksRe.remote(), locals);
    var remotes = ['https://example.com/', 'http://abc.co'];
    match(linksRe.remote(), remotes);
    matchNot(linksRe.local(), remotes);
    // match(linksRe({external: false}), largeData + 'https://blurt.world2/next', 'https://blurt.world2/next')
  });
  it('by image', function () {
    match(linksRe.image(), 'https://example.com/a.jpeg');
    match(linksRe.image(), 'https://example.com/a/b.jpeg');
    match(linksRe.image(), '![](https://example.com/img2/nehoshtanit.jpg)', 'https://example.com/img2/nehoshtanit.jpg');
    match(linksRe.image(), '<img src="https://example.com/img2/nehoshtanit.jpg"', 'https://example.com/img2/nehoshtanit.jpg');
    match(linksRe.image(), 'http://example.com\nhttps://example.com/a.jpeg', 'https://example.com/a.jpeg');
    match(linksRe.image(), 'http://i.imgur.com/MWufFQi.jpg")', 'http://i.imgur.com/MWufFQi.jpg');
    matchNot(linksRe.image(), ['http://imgur.com/iznWRVq', 'https://openmerchantaccount.com/']);
  });
});
describe('makeParams', function () {
  it('creates an empty string when there are no params', function () {
    (0, _assert["default"])(linksRe.makeParams([]) === '', 'not empty on array');
    (0, _assert["default"])(linksRe.makeParams({}) === '', 'not empty on object');
    (0, _assert["default"])(linksRe.makeParams({}, false) === '', 'not empty on object with prefix false');
    (0, _assert["default"])(linksRe.makeParams([], false) === '', 'not empty on array with prefix false');
    (0, _assert["default"])(linksRe.makeParams([], '?') === '', 'not empty on array with prefix string');
    (0, _assert["default"])(linksRe.makeParams({}, '?') === '', 'not empty on object  with prefix string');
  });
  it('creates the correct string when passed an array', function () {
    (0, _assert["default"])(linksRe.makeParams(['bop=boop', 'troll=bridge']) === '?bop=boop&troll=bridge', 'incorrect string with');
    (0, _assert["default"])(linksRe.makeParams(['bop=boop', 'troll=bridge'], false) === 'bop=boop&troll=bridge', 'incorrect string with prefix false');
    (0, _assert["default"])(linksRe.makeParams(['bop=boop', 'troll=bridge'], '&') === '&bop=boop&troll=bridge', 'incorrect string with prefix &');
  });
  it('creates the correct string when passed an object', function () {
    (0, _assert["default"])(linksRe.makeParams({
      bop: 'boop',
      troll: 'bridge'
    }) === '?bop=boop&troll=bridge', 'incorrect string');
    (0, _assert["default"])(linksRe.makeParams({
      bop: 'boop',
      troll: 'bridge'
    }, false) === 'bop=boop&troll=bridge', 'incorrect string with prefix false');
    (0, _assert["default"])(linksRe.makeParams({
      bop: 'boop',
      troll: 'bridge'
    }, '&') === '&bop=boop&troll=bridge', 'incorrect string with prefix &');
  });
});
describe('determineViewMode', function () {
  it('returns empty string when no parameter in search', function () {
    (0, _assert["default"])(linksRe.determineViewMode('') === '', linksRe.determineViewMode('') + 'not empty on empty string');
    (0, _assert["default"])(linksRe.determineViewMode('?afs=asdf') === '', 'not empty on incorrect parameter');
    (0, _assert["default"])(linksRe.determineViewMode('?afs=asdf&apple=sauce') === '', 'not empty on incorrect parameter');
  });
  it('returns empty string when unrecognized value for parameter in search', function () {
    (0, _assert["default"])(linksRe.determineViewMode("?".concat(_constants.PARAM_VIEW_MODE, "=asd")) === '', 'not empty on incorrect parameter value');
    (0, _assert["default"])(linksRe.determineViewMode("?".concat(_constants.PARAM_VIEW_MODE, "=").concat(_constants.VIEW_MODE_WHISTLE, "1")) === '', 'not empty on incorrect parameter value');
    (0, _assert["default"])(linksRe.determineViewMode("?".concat(_constants.PARAM_VIEW_MODE, "=asdf&apple=sauce")) === '', 'not empty on incorrect parameter value');
    (0, _assert["default"])(linksRe.determineViewMode("?apple=sauce&".concat(_constants.PARAM_VIEW_MODE, "=asdf")) === '', 'not empty on incorrect parameter value');
  });
  it('returns correct value when recognized value for parameter in search', function () {
    (0, _assert["default"])(linksRe.determineViewMode("?".concat(_constants.PARAM_VIEW_MODE, "=").concat(_constants.VIEW_MODE_WHISTLE)) === _constants.VIEW_MODE_WHISTLE, 'wrong response on correct parameter');
    (0, _assert["default"])(linksRe.determineViewMode("?".concat(_constants.PARAM_VIEW_MODE, "=").concat(_constants.VIEW_MODE_WHISTLE, "&apple=sauce")) === _constants.VIEW_MODE_WHISTLE, 'wrong response on correct parameter');
    (0, _assert["default"])(linksRe.determineViewMode("?apple=sauce&".concat(_constants.PARAM_VIEW_MODE, "=").concat(_constants.VIEW_MODE_WHISTLE)) === _constants.VIEW_MODE_WHISTLE, 'wrong response on correct parameter');
  });
});

// 1st in the browser it is very expensive to re-create a regular expression many times, however, in nodejs is is very in-expensive (it is as if it is caching it).
describe('Performance', function () {
  var largeData = _secureRandom["default"].randomBuffer(1024 * 10).toString('hex');
  it('any, ' + largeData.length + ' bytes x 10,000', function () {
    for (var i = 0; i < 10000; i++) {
      var _match = (largeData + 'https://example.com').match(linksRe.any());
      (0, _assert["default"])(_match, 'no match');
      (0, _assert["default"])(_match[0] === 'https://example.com', 'no match');
    }
  });
  it('image (large), ' + largeData.length + ' bytes x 10,000', function () {
    for (var i = 0; i < 10000; i++) {
      matchNot(linksRe.image(), 'https://lh3.googleusercontent.com/OehcduRZPcVIX_2tlOKgYHADtBvorTfL4JtjfGAPWZyiiI9p_g2ZKEUKfuv3By-aiVfirXaYvEsViJEbxts6IeVYqidnpgkkkXAe0Q79_ARXX6CU5hBK2sZaHKa20U3jBzYbMxT-OVNX8-JYf-GYa2geUQa6pVpUDY35iaiiNBObF-TMIUOqm0P61gCdukTFwLgld2BBlxoVNNt_w6VglYHJP0W4izVNkEu7ugrU-qf2Iw9hb22SGIFNpbzL_ldomDMthIuYfKSYGsqe2ClvNKRz-_vVCQr7ggRXra16uQOdUUv5IVnkK67p9yR8ioajJ4tiGdzazYVow46pbeZ76i9_NoEYnOEX2_a7niofnC5BgAjoQEeoes1cMWVM7V8ZSexBA-cxmi0EVLds4RBkInvaUZjVL7h3oJ5I19GugPTzlyVyYtkf1ej6LNttkagqHgMck87UQGvCbwDX9ECTngffwQPYZlZKnthW0DlkFGgHN8T9uqEpl-3ki50gTa6gC0Q16mEeDRKZe7_g5Sw52OjMsfWxmBBWWMSHzlQKKAIKMKKaD6Td0O_zpiXXp7Fyl7z_iESvCpOAUAIKnyJyF_Y0UYktEmw=w2066-h1377-no');
    }
  });
  it('image, ' + largeData.length + ' bytes x 10,000', function () {
    for (var i = 0; i < 10000; i++) {
      var _match2 = (largeData + 'https://example.com/img.jpeg').match(linksRe.image());
      (0, _assert["default"])(_match2, 'no match');
      (0, _assert["default"])(_match2[0] === 'https://example.com/img.jpeg', 'no match');
    }
  });
  it('remote, ' + largeData.length + ' bytes x 10,000', function () {
    for (var i = 0; i < 10000; i++) {
      var _match3 = (largeData + 'https://example.com').match(linksRe.remote());
      (0, _assert["default"])(_match3, 'no match');
      (0, _assert["default"])(_match3[0] === 'https://example.com', 'no match');
    }
  });
  it('youTube', function () {
    match(linksRe.youTube(), 'https://youtu.be/xG7ajrbj4zs?t=7s');
    match(linksRe.youTube(), 'https://www.youtube.com/watch?v=xG7ajrbj4zs&t=14s');
    match(linksRe.youTube(), 'https://www.youtube.com/watch?v=xG7ajrbj4zs&feature=youtu.be&t=14s');
  });
  it('youTubeId', function () {
    match(_Links["default"].youTubeId, 'https://youtu.be/xG7ajrbj4zs?t=7s', 'xG7ajrbj4zs', 1);
    match(_Links["default"].youTubeId, 'https://www.youtube.com/watch?v=xG7ajrbj4zs&t=14s', 'xG7ajrbj4zs', 1);
    match(_Links["default"].youTubeId, 'https://www.youtube.com/watch?v=xG7ajrbj4zs&feature=youtu.be&t=14s', 'xG7ajrbj4zs', 1);
  });
});
var match = function match() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return compare.apply(void 0, [true].concat(args));
};
var matchNot = function matchNot() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  return compare.apply(void 0, [false].concat(args));
};
var compare = function compare(matching, re, input) {
  var output = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : input;
  var pos = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  if (Array.isArray(input)) {
    for (var i = 0; i < input.length; i++) {
      compare(matching, re, input[i], output[i]);
    }
    return;
  }
  // console.log('compare, input', input)
  // console.log('compare, output', output)
  var m = input.match(re);
  if (matching) {
    (0, _assert["default"])(m, "No match --> ".concat(input, " --> output ").concat(output, " --> using ").concat(re.toString()));
    // console.log('m', m)
    _assert["default"].equal(m[pos], output, "Unmatched ".concat(m[pos], " --> input ").concat(input, " --> output ").concat(output, " --> using ").concat(re.toString()));
  } else {
    (0, _assert["default"])(!m, "False match --> input ".concat(input, " --> output ").concat(output, " --> using ").concat(re.toString()));
  }
};