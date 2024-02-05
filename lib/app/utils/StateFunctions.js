"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allowDelete = allowDelete;
exports.contentStats = contentStats;
exports.filterTags = filterTags;
exports.hasNsfwTag = hasNsfwTag;
exports.isFetchingOrRecentlyUpdated = isFetchingOrRecentlyUpdated;
exports.numberWithCommas = void 0;
var _assert = _interopRequireDefault(require("assert"));
var _constants = _interopRequireDefault(require("app/redux/constants"));
var _ParsersAndFormatters = require("app/utils/ParsersAndFormatters");
var _bytebuffer = require("bytebuffer");
var _client_config = require("app/client_config");
var _immutable = require("immutable");
var numberWithCommas = exports.numberWithCommas = function numberWithCommas(x) {
  try {
    return typeof x === "number" ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } catch (error) {
    console.log(x, "value - numberWithCommas", error);
    return x;
  }
};
function isFetchingOrRecentlyUpdated(global_status, order, category) {
  var status = global_status ? global_status.getIn([category || '', order]) : null;
  if (!status) return false;
  if (status.fetching) return true;
  if (status.last_fetch) {
    var res = new Date() - status.last_fetch < _constants["default"].FETCH_DATA_EXPIRE_SEC * 1000;
    return res;
  }
  return false;
}
function allowDelete(comment) {
  if (!(comment instanceof Map)) comment = (0, _immutable.fromJS)(comment);
  var rshares = String(comment.get('net_rshares'));
  var hasPayout = !(rshares[0] == '0' || rshares[0] == '-');
  var hasChildren = comment.get('children') !== 0;
  return !(hasPayout || hasChildren);
}
function hasNsfwTag(content) {
  // Combine tags+category to check nsfw status
  var json = content.get('json_metadata');
  var tags = [];
  try {
    tags = json && JSON.parse(json).tags || [];
    if (typeof tags === 'string') {
      tags = [tags];
    }
    if (!Array.isArray(tags)) {
      tags = [];
    }
  } catch (e) {
    tags = [];
  }
  tags.push(content.get('category'));
  tags = filterTags(tags);
  var isNsfw = tags.filter(function (tag) {
    return tag && tag.match(/^nsfw$/i);
  }).length > 0;
  return isNsfw;
}
function contentStats(content) {
  if (!content) return {};
  if (!(content instanceof Map)) content = (0, _immutable.fromJS)(content);
  var net_rshares_adj = _bytebuffer.Long.ZERO;
  var total_votes = 0;

  // TODO: breaks if content has no active_votes attribute.
  content.get('active_votes').forEach(function (v) {
    var sign = Math.sign(v.get('percent'));
    if (sign === 0) return;
    total_votes += 1;

    // For graying: ignore tiny downvotes (9 digits or less)
    var rshares = String(v.get('rshares'));
    if (!(rshares.substring(0, 1) === '-' && rshares.length < 11)) {
      net_rshares_adj = net_rshares_adj.add(rshares);
    }
  });

  // post must have non-trivial negative rshares to be grayed out. (more than 10 digits)
  var grayThreshold = -9999999999;
  var meetsGrayThreshold = net_rshares_adj.compare(grayThreshold) < 0;
  var hasPendingPayout = (0, _ParsersAndFormatters.parsePayoutAmount)(content.get('pending_payout_value')) >= 0.02;
  var authorRepLog10 = (0, _ParsersAndFormatters.repLog10)(content.get('author_reputation'));
  var gray = !hasPendingPayout && (authorRepLog10 < 1 || meetsGrayThreshold);
  var hide = !hasPendingPayout && authorRepLog10 < 0; // rephide

  return {
    hide: hide,
    gray: gray,
    total_votes: total_votes
  };
}
function filterTags(tags) {
  return tags.filter(function (tag) {
    return typeof tag === 'string';
  }).filter(function (value, index, self) {
    return value && self.indexOf(value) === index;
  });
}

// export function pricePerSteem(state) {
//     const feed_price = state.user.get(
//         'latest_feed_price',
//         state.global.get('feed_price')
//     );
//     if (feed_price && feed_price.has('base') && feed_price.has('quote')) {
//         return formatter.pricePerSteem(feed_price.toJS());
//     }
//     return undefined;
// }