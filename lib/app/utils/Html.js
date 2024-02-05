"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.htmlDecode = void 0;
// eslint-disable-next-line import/prefer-default-export
var htmlDecode = exports.htmlDecode = function htmlDecode(txt) {
  return txt.replace(/&[a-z]+;/g, function (ch) {
    var _char = htmlCharMap[ch.substring(1, ch.length - 1)];
    return _char || ch;
  });
};
var htmlCharMap = {
  amp: '&',
  quot: '"',
  lsquo: '‘',
  rsquo: '’',
  sbquo: '‚',
  ldquo: '“',
  rdquo: '”',
  bdquo: '„',
  hearts: '♥',
  trade: '™',
  hellip: '…',
  pound: '£',
  copy: ''
};