"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouter = require("react-router");
var _counterpart = _interopRequireDefault(require("counterpart"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _NativeSelect = _interopRequireDefault(require("app/components/elements/NativeSelect"));
var TagList = function TagList(_ref) {
  var order = _ref.order,
    current = _ref.current,
    compact = _ref.compact,
    className = _ref.className,
    username = _ref.username,
    categories = _ref.categories;
  var handleChange = function handleChange(selectedOption) {
    _reactRouter.browserHistory.push(selectedOption.value);
  };
  var currentlySelected = function currentlySelected(currentTag, username) {
    var currentOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var opts = {
      feed: "/@".concat(username, "/feed"),
      tagOnly: "/trending/".concat(currentTag),
      orderOnly: "/".concat(currentOrder),
      tagWithOrder: "/".concat(currentOrder, "/").concat(currentTag),
      "default": '/trending'
    };
    if (currentTag === 'feed') return opts.feed;
    if (currentTag && currentOrder) return opts.tagWithOrder;
    if (!currentTag && currentOrder) return opts.orderOnly;
    if (currentTag && !currentOrder) return opts.tagOnly;
    return opts["default"];
  };
  if (compact) {
    var extras = function extras(username) {
      var ex = {
        allTags: function allTags(order) {
          return {
            value: "/".concat(order),
            label: "".concat((0, _counterpart["default"])('g.all_tags_mobile'))
          };
        },
        myFeed: function myFeed(name) {
          return {
            value: "/@".concat(name, "/feed"),
            label: "".concat((0, _counterpart["default"])('g.my_feed'))
          };
        }
      };
      return username ? [ex.allTags(order), ex.myFeed(username)] : [ex.allTags(order)];
    };
    var opts = extras(username).concat(categories.map(function (cat) {
      var link = order ? "/".concat(order, "/").concat(cat) : "/".concat(cat);
      return {
        value: link,
        label: cat
      };
    }).toJS());
    return /*#__PURE__*/_react["default"].createElement(_NativeSelect["default"], {
      currentlySelected: currentlySelected(current, username, order),
      options: opts,
      onChange: handleChange
    });
  } else {
    var categoriesLinks = categories.map(function (cat) {
      var link = order ? "/".concat(order, "/").concat(cat) : "/hot/".concat(cat);
      return /*#__PURE__*/_react["default"].createElement("li", {
        className: "c-sidebar__list-item",
        key: cat
      }, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
        to: link,
        className: "c-sidebar__link",
        activeClassName: "active"
      }, cat));
    });
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "c-sidebar__module"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "c-sidebar__content"
    }, /*#__PURE__*/_react["default"].createElement("ul", {
      className: "c-sidebar__list"
    }, /*#__PURE__*/_react["default"].createElement("li", {
      className: "c-sidebar__list-item"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "c-sidebar__header"
    }, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
      to: '/' + order,
      className: "c-sidebar__link",
      activeClassName: "active"
    }, (0, _counterpart["default"])('g.all_tags')))), categoriesLinks, /*#__PURE__*/_react["default"].createElement("li", {
      className: "c-sidebar__link"
    }, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
      className: "c-sidebar__link c-sidebar__link--emphasis",
      to: "/tags"
    }, (0, _counterpart["default"])('g.show_more_topics'), "\u2026")))));
  }
};
TagList.propTypes = {
  categories: _propTypes["default"].object.isRequired,
  order: _propTypes["default"].string.isRequired,
  current: _propTypes["default"].string,
  compact: _propTypes["default"].bool.isRequired
};
TagList.defaultProps = {
  current: ''
};
var _default = exports["default"] = TagList;