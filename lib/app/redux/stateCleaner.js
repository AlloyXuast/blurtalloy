"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = stateCleaner;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _GDPRUserList = _interopRequireDefault(require("../utils/GDPRUserList"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var accountsToRemove = _GDPRUserList["default"];
var gdprFilterAccounts = function gdprFilterAccounts(stateAccounts) {
  return Object.keys(stateAccounts).filter(function (name) {
    return !accountsToRemove.includes(name);
  }).reduce(function (acc, cur) {
    return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, cur, stateAccounts[cur]));
  }, {});
};
var gdprFilterContent = function gdprFilterContent(stateContent) {
  var contentToRemove = Object.keys(stateContent).filter(function (key) {
    return accountsToRemove.includes(stateContent[key].author);
  });
  var contentToKeep = Object.keys(stateContent).filter(function (key) {
    return !accountsToRemove.includes(stateContent[key].author);
  });

  // First, remove content authored by GDPR users.
  var removedByAuthor = contentToKeep.reduce(function (acc, cur) {
    return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, cur, stateContent[cur]));
  }, {});

  // Finally, remove GDPR-authored replies referenced in other content.
  return Object.keys(removedByAuthor).reduce(function (acc, cur) {
    return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, cur, _objectSpread(_objectSpread({}, removedByAuthor[cur]), {}, {
      replies: removedByAuthor[cur].replies.filter(function (url) {
        return !contentToRemove.includes(url);
      })
    })));
  }, {});
};
function stateCleaner(state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    accounts: gdprFilterAccounts(state.accounts),
    content: gdprFilterContent(state.content)
  });
}