"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = extractContent;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _RemarkableStripper = _interopRequireDefault(require("app/utils/RemarkableStripper"));
var _sanitizeHtml = _interopRequireDefault(require("sanitize-html"));
var _Html = require("app/utils/Html");
var _HtmlReady = _interopRequireDefault(require("shared/HtmlReady"));
var _remarkable = require("remarkable");
// import links from 'app/utils/Links';

var remarkable = new _remarkable.Remarkable({
  html: true
});
var getValidImage = function getValidImage(array) {
  return array && Array.isArray(array) && array.length >= 1 && typeof array[0] === 'string' ? array[0] : null;
};
function extractContent(get, content) {
  var _get = get(content, 'author', 'permlink', 'parent_author', 'parent_permlink', 'json_metadata', 'category', 'title', 'created', 'net_rshares', 'community_title', 'children'),
    author = _get.author,
    permlink = _get.permlink,
    parent_author = _get.parent_author,
    parent_permlink = _get.parent_permlink,
    json_metadata = _get.json_metadata,
    category = _get.category,
    title = _get.title,
    created = _get.created,
    net_rshares = _get.net_rshares,
    community_title = _get.community_title,
    children = _get.children;
  var author_link = '/@' + get(content, 'author');
  var link = "/@".concat(author, "/").concat(permlink);
  if (category) link = "/".concat(category).concat(link);
  var body = get(content, 'body');
  var jsonMetadata = {};
  var image_link;
  var desc;
  try {
    jsonMetadata = JSON.parse(json_metadata);
    if (typeof jsonMetadata === 'string') {
      // At least one case where jsonMetadata was double-encoded: #895
      jsonMetadata = JSON.parse(jsonMetadata);
    }
    // First, attempt to find an image url in the json metadata
    if (jsonMetadata && jsonMetadata.image) {
      image_link = getValidImage(jsonMetadata.image);
    }
    if (jsonMetadata && jsonMetadata.description) {
      desc = jsonMetadata.description;
    }
  } catch (error) {
    // console.error('Invalid json metadata string', json_metadata, 'in post', author, permlink);
  }

  // If nothing found in json metadata, parse body and check images/links
  if (!image_link) {
    var rtags;
    {
      var isHtml = /^<html>([\S\s]*)<\/html>$/.test(body);
      var htmlText = isHtml ? body : remarkable.render(body.replace(/<!--([\s\S]+?)(-->|$)/g, '(html comment removed: $1)'));
      rtags = (0, _HtmlReady["default"])(htmlText, {
        mutate: false
      });
    }
    var _Array$from = Array.from(rtags.images);
    var _Array$from2 = (0, _slicedToArray2["default"])(_Array$from, 1);
    image_link = _Array$from2[0];
  }

  // Was causing broken thumnails.  IPFS was not finding images uploaded to another server until a restart.
  // if(config.ipfs_prefix && image_link) // allow localhost nodes to see ipfs images
  //     image_link = image_link.replace(links.ipfsPrefix, config.ipfs_prefix)

  var desc_complete = false;
  if (!desc) {
    // Short description.
    // Remove bold and header, etc.
    // Stripping removes links with titles (so we got the links above)..
    // Remove block quotes if detected at beginning of comment preview if comment has a parent
    var body2 = _RemarkableStripper["default"].render(get(content, 'depth') > 1 ? body.replace(/(^(\n|\r|\s)*)>([\s\S]*?).*\s*/g, '') : body);
    desc = (0, _sanitizeHtml["default"])(body2, {
      allowedTags: []
    }); // remove all html, leaving text
    desc = (0, _Html.htmlDecode)(desc);

    // Strip any raw URLs from preview text
    desc = desc.replace(/https?:\/\/[^\s]+/g, '');

    // Grab only the first line (not working as expected. does rendering/sanitizing strip newlines?)
    // eslint-disable-next-line prefer-destructuring
    desc = desc.trim().split('\n')[0];
    if (desc.length > 200) {
      desc = desc.substring(0, 200).trim();
      var dotSpace = desc.lastIndexOf('. ');
      if (dotSpace > 80 && !get(content, 'depth') > 1) {
        desc = desc.substring(0, dotSpace + 1);
      } else {
        // Truncate, remove the last (likely partial) word (along with random punctuation), and add ellipses
        desc = desc.substring(0, 200).trim().replace(/[,!\?]?\s+[^\s]+$/, '…');
      }
    }
    desc_complete = body2 === desc; // is the entire body in desc?
  }
  var pending_payout = get(content, 'pending_payout_value');
  return {
    author: author,
    author_link: author_link,
    permlink: permlink,
    parent_author: parent_author,
    parent_permlink: parent_permlink,
    json_metadata: jsonMetadata,
    category: category,
    title: title,
    created: created,
    net_rshares: net_rshares,
    children: children,
    link: link,
    image_link: image_link,
    desc: desc,
    desc_complete: desc_complete,
    body: body,
    pending_payout: pending_payout,
    community_title: community_title
  };
}