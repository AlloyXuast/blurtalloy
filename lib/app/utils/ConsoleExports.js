"use strict";

var _ecc = require("@blurtfoundation/blurtjs/lib/auth/ecc");
// import secureRandom from 'secure-random'
// import links from 'app/utils/Links'
// import assert from 'assert'

module.exports = {
  PrivateKey: _ecc.PrivateKey,
  PublicKey: _ecc.PublicKey,
  Aes: _ecc.Aes,
  key_utils: _ecc.key_utils,
  // Run once to start, then again to stop and print a report
  // https://facebook.github.io/react/docs/perf.html
  perf: function perf() {
    var Perf = require('react-addons-perf');
    if (perfStarted) {
      Perf.stop();
      var lm = Perf.getLastMeasurements();
      Perf.printInclusive(lm);
      Perf.printExclusive(lm);
      Perf.printWasted(lm);
      perfStarted = false;
    } else {
      Perf.start();
      perfStarted = true;
    }
    return Perf;
  },
  resolve: function resolve(object) {
    var atty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';
    if (!object.then) {
      console.log(object);
      return object;
    }
    return new Promise(function (resolve, reject) {
      object.then(function (result) {
        console.log(result);
        resolve(result);
        window[atty] = result;
      })["catch"](function (error) {
        console.error(error);
        reject(error);
        window[atty] = error;
      });
    });
  },
  init: function init(context) {
    if (!context) return;
    for (var obj in module.exports) {
      if (obj === 'init') continue;
      context[obj] = module.exports[obj];
    }
  }

  // retest: () => {
  //     const largeData = secureRandom.randomBuffer(1024 * 10).toString('hex')
  //     const all = links.any()
  //     for (let i = 0; i < 10000; i++) {
  //         const match = (largeData + 'https://example.com').match(all)
  //         assert(match, 'no match')
  //         assert(match[0] === 'https://example.com', 'no match')
  //     }
  // },
};
var perfStarted = false;