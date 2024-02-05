"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _react = _interopRequireDefault(require("react"));
var _reactRouter = require("react-router");
var _StateFunctions = require("app/utils/StateFunctions");
var _DropdownMenu = _interopRequireDefault(require("app/components/elements/DropdownMenu"));
var _default = exports["default"] = function _default(_ref) {
  var post = _ref.post,
    horizontal = _ref.horizontal,
    single = _ref.single;
  var sort_order = 'hot';
  var sort_list = ['trending', 'hot', 'created', 'muted', 'payout'];
  if (process.env.BROWSER && sort_list.indexOf(window.last_sort_order) !== -1) {
    sort_order = window.last_sort_order;
  }
  if (single) {
    var name = post.community_title ? post.community_title : post.category;
    return /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
      to: "/".concat(sort_order, "/").concat(post.category)
    }, !post.community_title && "# ", name);
  }
  var json = post.json_metadata;
  var tags = [];
  try {
    if ((0, _typeof2["default"])(json) === 'object') {
      tags = json.tags || [];
    } else {
      tags = json && JSON.parse(json).tags || [];
    }
    if (typeof tags === 'string') tags = tags.split(' ');
    if (!Array.isArray(tags)) {
      tags = [];
    }
  } catch (e) {
    tags = [];
  }

  // Category should always be first.
  tags.unshift(post.category);
  tags = (0, _StateFunctions.filterTags)(tags);
  if (horizontal) {
    // show it as a dropdown in Preview
    var _list = tags.map(function (tag, idx) {
      return /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
        to: "/".concat(sort_order, "/").concat(tag),
        key: idx
      }, ' ', tag, ' ');
    });
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "TagList__horizontal"
    }, _list);
  }
  if (tags.length == 1) {
    return /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
      to: "/".concat(sort_order, "/").concat(tags[0])
    }, tags[0]);
  }
  var list = tags.map(function (tag) {
    return {
      value: tag,
      link: "/".concat(sort_order, "/").concat(tag)
    };
  });
  return /*#__PURE__*/_react["default"].createElement(_DropdownMenu["default"], {
    selected: ' ' + tags[0],
    className: "TagList",
    items: list,
    el: "div"
  });
};