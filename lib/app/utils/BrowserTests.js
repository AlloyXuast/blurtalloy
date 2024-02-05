"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.browserTests = void 0;
exports["default"] = runTests;
var _assert = _interopRequireDefault(require("assert"));
var _ServerApiClient = require("app/utils/ServerApiClient");
var _ecc = require("@blurtfoundation/blurtjs/lib/auth/ecc");
var _blurtjs = require("@blurtfoundation/blurtjs");
var browserTests = exports.browserTests = {};
function runTests() {
  var rpt = '';
  var pass = true;
  function it(name, fn) {
    console.log('Testing', name);
    rpt += 'Testing ' + name + '\n';
    try {
      fn();
    } catch (error) {
      console.error(error);
      pass = false;
      rpt += error.stack + '\n\n';
      (0, _ServerApiClient.serverApiRecordEvent)('client_error', error);
    }
  }
  var private_key, public_key;
  var wif = '5JdeC9P7Pbd1uGdFVEsJ41EkEnADbbHGq6p1BwFxm6txNBsQnsw';
  var pubkey = _blurtjs.config.get('address_prefix') + '8m5UgaFAAYQRuaNejYdS8FVLVp9Ss3K1qAVk5de6F8s3HnVbvA';
  it('create private key', function () {
    private_key = _ecc.PrivateKey.fromSeed('1');
    _assert["default"].equal(private_key.toWif(), wif);
  });
  it('supports WIF format', function () {
    (0, _assert["default"])(_ecc.PrivateKey.fromWif(wif));
  });
  it('finds public from private key', function () {
    public_key = private_key.toPublicKey();
    // substring match ignore prefix
    _assert["default"].equal(public_key.toString(), pubkey, 'Public key did not match');
  });
  it('parses public key', function () {
    (0, _assert["default"])(_ecc.PublicKey.fromString(public_key.toString()));
  });
  if (!pass) return rpt;
}