"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _react = _interopRequireDefault(require("react"));
var _reactRouter = require("react-router");
var _reactRedux = require("react-redux");
var _counterpart = _interopRequireDefault(require("counterpart"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _NativeSelect = _interopRequireDefault(require("app/components/elements/NativeSelect"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Topics = function Topics(_ref) {
  var compact = _ref.compact,
    className = _ref.className,
    username = _ref.username,
    topics = _ref.topics,
    subscriptions = _ref.subscriptions,
    current = _ref.current,
    communities = _ref.communities;
  if (compact) {
    var opt = function opt(tag) {
      var label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (tag && tag[0] === '@') return {
        value: "/@".concat(username, "/feed"),
        label: (0, _counterpart["default"])('header_jsx.my_friends') || (0, _counterpart["default"])('g.my_feed'),
        title: true
      };
      if (tag === 'my') return {
        value: "/trending/my",
        label: (0, _counterpart["default"])('g.my_communities'),
        title: true
      };
      if (tag == 'explore') return {
        value: "/communities",
        label: (0, _counterpart["default"])('g.explore_communities'),
        title: true
      };
      if (tag == 'tags') return {
        value: "/tags",
        label: (0, _counterpart["default"])('g.trending_tags'),
        title: true
      };
      if (tag == 'subscriptions') return {
        value: "subscriptions",
        label: (0, _counterpart["default"])('g.my_subscriptions'),
        disabled: true,
        title: true
      };
      if (tag) return {
        value: "/trending/".concat(tag),
        label: label || '#' + tag
      };
      return {
        value: "/",
        label: (0, _counterpart["default"])('g.all_posts'),
        title: true
      };
    };
    var options = [];
    // Add 'All Posts' link.
    options.push(opt(null));
    options.push(opt('tags'));
    if (username && subscriptions) {
      // Add 'My Friends' Link
      options.push(opt('@' + username));
      // Add 'My Communities' Link
      options.push(opt('my'));
      var subscriptionOptions = subscriptions.toJS().map(function (cat) {
        return opt(cat[0], cat[1]);
      });
      options.push.apply(options, (0, _toConsumableArray2["default"])(subscriptionOptions));
    }
    if (topics) {
      var topicsOptions = topics.toJS().map(function (cat) {
        return opt(cat[0], cat[1]);
      });
      options.push({
        value: "/communities",
        label: (0, _counterpart["default"])('g.explore_communities'),
        title: true
      });
      options.push.apply(options, (0, _toConsumableArray2["default"])(topicsOptions));
    }
    var currOpt = opt(current);
    if (!options.find(function (opt) {
      return opt.value == currOpt.value;
    })) {
      options.push(opt(current, communities.getIn([current, 'title'])));
    }
    return /*#__PURE__*/_react["default"].createElement(_NativeSelect["default"], {
      options: options,
      currentlySelected: currOpt.value,
      onChange: function onChange(opt) {
        _reactRouter.browserHistory.push(opt.value);
      }
    });
  }
  var link = function link(url, label) {
    var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'c-sidebar__header';
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: className
    }, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
      to: url,
      className: "c-sidebar__link",
      activeClassName: "active"
    }, label));
  };
  var moreLabel = /*#__PURE__*/_react["default"].createElement("span", null, (0, _counterpart["default"])('g.show_more_communities'), "\u2026");
  var title = subscriptions && username ? 'My subscriptions' : 'Trending Communities';
  var commsHead = /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      color: '#aaa',
      paddingTop: '0em',
      fontSize: '1.15rem'
    }
  }, title);
  var list = /*#__PURE__*/_react["default"].createElement("ul", {
    className: "c-sidebar__list"
  }, username && /*#__PURE__*/_react["default"].createElement("li", null, link('/trending/my', 'My communities')), (subscriptions || topics).size > 0 && /*#__PURE__*/_react["default"].createElement("li", null, commsHead), username && subscriptions && subscriptions.toJS().map(function (cat, index) {
    return /*#__PURE__*/_react["default"].createElement("li", {
      key: "".concat(index, "-").concat(cat[0]),
      style: {
        fontSize: '0.9rem'
      }
    }, link("/trending/".concat(cat[0]), cat[1], ''));
  }), (!username || !subscriptions) && topics.toJS().map(function (cat, index) {
    return /*#__PURE__*/_react["default"].createElement("li", {
      key: "".concat(cat[0], "-").concat(index),
      style: {
        fontSize: '0.9rem'
      }
    }, link("/trending/".concat(cat[0]), cat[1], ''));
  }), /*#__PURE__*/_react["default"].createElement("li", null, link('/communities', moreLabel, 'c-sidebar__link--emphasis')));
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "c-sidebar__module"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "c-sidebar__content"
  }, list));
};
Topics.propTypes = {
  compact: _propTypes["default"].bool.isRequired,
  topics: _propTypes["default"].object.isRequired,
  subscriptions: _propTypes["default"].object,
  current: _propTypes["default"].string,
  username: _propTypes["default"].string
};
Topics.defaultProps = {
  current: ''
};
var _default = exports["default"] = (0, _reactRedux.connect)(
// mapStateToProps
function (state, ownProps) {
  return _objectSpread(_objectSpread({}, ownProps), {}, {
    communities: state.global.get('community')
  });
})(Topics);