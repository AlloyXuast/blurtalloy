"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _assert = _interopRequireDefault(require("assert"));
var _ProxifyUrl = _interopRequireDefault(require("./ProxifyUrl"));
/* global describe, global, before:false, it */

describe('ProxifyUrl', function () {
  beforeAll(function () {
    global.$STM_Config = {
      img_proxy_prefix: 'https://imgp.blurt.world//'
    };
  });
  it('naked URL', function () {
    testCase('https://example.com/img.png', '100x200', 'https://imgp.blurt.world//100x200/https://example.com/img.png');
    testCase('https://example.com/img.png', '0x0', 'https://imgp.blurt.world//640x0/https://example.com/img.png');
    testCase('https://example.com/img.png', true, 'https://imgp.blurt.world//640x0/https://example.com/img.png');
    testCase('https://example.com/img.png', false, 'https://example.com/img.png');
  });
  it('naked blurt hosted URL', function () {
    testCase('https://imgp.blurt.world//DQmaJe2Tt5kmVUaFhse1KTEr4N1g9piMgD3YjPEQhkZi3HR/30day-positivity-challenge.jpg', '256x512', 'https://imgp.blurt.world//256x512/https://imgp.blurt.world//DQmaJe2Tt5kmVUaFhse1KTEr4N1g9piMgD3YjPEQhkZi3HR/30day-positivity-challenge.jpg');
    testCase('https://imgp.blurt.world//DQmaJe2Tt5kmVUaFhse1KTEr4N1g9piMgD3YjPEQhkZi3HR/30day-positivity-challenge.jpg', false, 'https://imgp.blurt.world//DQmaJe2Tt5kmVUaFhse1KTEr4N1g9piMgD3YjPEQhkZi3HR/30day-positivity-challenge.jpg');
  });
  it('proxied blurt hosted URL', function () {
    testCase('https://imgp.blurt.world//0x0/https://imgp.blurt.world//DQmaJe2Tt5kmVUaFhse1KTEr4N1g9piMgD3YjPEQhkZi3HR/30day-positivity-challenge.jpg', '256x512', 'https://imgp.blurt.world//256x512/https://imgp.blurt.world//DQmaJe2Tt5kmVUaFhse1KTEr4N1g9piMgD3YjPEQhkZi3HR/30day-positivity-challenge.jpg');
    testCase('https://imgp.blurt.world//256x512/https://imgp.blurt.world//DQmaJe2Tt5kmVUaFhse1KTEr4N1g9piMgD3YjPEQhkZi3HR/30day-positivity-challenge.jpg', false, 'https://imgp.blurt.world//DQmaJe2Tt5kmVUaFhse1KTEr4N1g9piMgD3YjPEQhkZi3HR/30day-positivity-challenge.jpg');
  });
  it('proxied URL', function () {
    testCase('https://imgp.blurt.world//0x0/https://example.com/img.png', '100x200', 'https://imgp.blurt.world//100x200/https://example.com/img.png');
    testCase('https://imgp.blurt.world//256x512/https://peopledotcom.files.wordpress.com/2017/09/grumpy-harvey-cat.jpg?w=2000', '100x200', 'https://imgp.blurt.world//100x200/https://peopledotcom.files.wordpress.com/2017/09/grumpy-harvey-cat.jpg?w=2000');
    testCase('https://imgp.blurt.world//0x0/https://example.com/img.png', false, 'https://example.com/img.png');
  });
  it('double-proxied URL', function () {
    testCase('https://imgp.blurt.world//0x0/https://imgp.blurt.world//0x0/https://example.com/img.png', '100x200', 'https://imgp.blurt.world//100x200/https://example.com/img.png');
    testCase('https://imgp.blurt.world//0x0/https://imgp.blurt.world//256x512/https://imgp.blurt.world//DQmaJe2Tt5kmVUaFhse1KTEr4N1g9piMgD3YjPEQhkZi3HR/30day-positivity-challenge.jpg', false, 'https://imgp.blurt.world//DQmaJe2Tt5kmVUaFhse1KTEr4N1g9piMgD3YjPEQhkZi3HR/30day-positivity-challenge.jpg');
  });
  it('preserve dimensions - single-proxied URL', function () {
    // simple preservation
    testCase('https://imgp.blurt.world/100x200/https://example.com/img.png', true, 'https://imgp.blurt.world//100x200/https://example.com/img.png');
    testCase('https://imgp.blurt.world/1001x2001/https://example.com/img.png', true, 'https://imgp.blurt.world//1001x2001/https://example.com/img.png');
  });
  it('preserve dimensions - double-proxied URL', function () {
    // simple preservation at a 2 nesting level
    // foreign domain
    testCase('https://imgp.blurt.world//100x200/https://imgp.blurt.world//0x0/https://example.com/img.png', true, 'https://imgp.blurt.world//100x200/https://example.com/img.png');
    testCase('https://imgp.blurt.world/1001x2001/https://imgp.blurt.world//0x0/https://example.com/img.png', true, 'https://imgp.blurt.world//1001x2001/https://example.com/img.png');
    // blurt domain
    testCase('https://imgp.blurt.world/1001x2001/https://imgp.blurt.world//0x0/https://imgp.blurt.world//DQmaJe2Tt5kmVUaFhse1KTEr4N1g9piMgD3YjPEQhkZi3HR/30day-positivity-challenge.jpg', true, 'https://imgp.blurt.world//1001x2001/https://imgp.blurt.world//DQmaJe2Tt5kmVUaFhse1KTEr4N1g9piMgD3YjPEQhkZi3HR/30day-positivity-challenge.jpg');
  });
  it('preserve dimensions - strip proxies & dimensions when appropriate', function () {
    // simple preservation at a 2 nesting level
    // blurt domain
    testCase('https://imgp.blurt.world//0x0/https://imgp.blurt.world//DQmaJe2Tt5kmVUaFhse1KTEr4N1g9piMgD3YjPEQhkZi3HR/30day-positivity-challenge.jpg', true, 'https://imgp.blurt.world//DQmaJe2Tt5kmVUaFhse1KTEr4N1g9piMgD3YjPEQhkZi3HR/30day-positivity-challenge.jpg');
    // foreign domain
    testCase('https://imgp.blurt.world//0x0/https://example.com/img.png', true, 'https://imgp.blurt.world//640x0/https://example.com/img.png');
    // case where last is natural sizing, assumes natural sizing - straight to direct blurt file url
    testCase('https://imgp.blurt.world//0x0/https://imgp.blurt.world//100x100/https://imgp.blurt.world//DQmaJe2Tt5kmVUaFhse1KTEr4N1g9piMgD3YjPEQhkZi3HR/30day-positivity-challenge.jpg', true, 'https://imgp.blurt.world//DQmaJe2Tt5kmVUaFhse1KTEr4N1g9piMgD3YjPEQhkZi3HR/30day-positivity-challenge.jpg');
    // case where last is natural sizing, assumes natural sizing - straight to direct blurt /0x0/ domain host url
    testCase('https://imgp.blurt.world//0x0/https://imgp.blurt.world//100x100/https://example.com/img.png', true, 'https://imgp.blurt.world//640x0/https://example.com/img.png');
  });
});
var testCase = function testCase(inputUrl, outputDims, expectedUrl) {
  var outputUrl = (0, _ProxifyUrl["default"])(inputUrl, outputDims);
  _assert["default"].equal(outputUrl, expectedUrl, "(".concat(inputUrl, ", ").concat(outputDims, ") should return ").concat(expectedUrl, ". output was ").concat(outputUrl));
};