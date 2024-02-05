"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _immutable = require("immutable");
var _TimeAgoWrapper = _interopRequireDefault(require("app/components/elements/TimeAgoWrapper"));
var _LoadingIndicator = _interopRequireDefault(require("app/components/elements/LoadingIndicator"));
var _FetchDataSaga = require("app/redux/FetchDataSaga");
var globalActions = _interopRequireWildcard(require("app/redux/GlobalReducer"));
var _Callout = _interopRequireDefault(require("app/components/elements/Callout"));
var _Icon = _interopRequireDefault(require("app/components/elements/Icon"));
var _Userpic = _interopRequireDefault(require("app/components/elements/Userpic"));
var _counterpart = _interopRequireDefault(require("counterpart"));
var _classnames = _interopRequireDefault(require("classnames"));
var _ClaimBox = _interopRequireDefault(require("../elements/ClaimBox"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* eslint-disable jsx-a11y/anchor-is-valid */
var notificationsIcon = function notificationsIcon(type) {
  var types = {
    reply: 'chatbox',
    reply_post: 'chatbox',
    reply_comment: 'chatbox',
    follow: 'voters',
    set_label: 'pencil2',
    set_role: 'pencil2',
    error: 'cog',
    reblog: 'reblog',
    mention: 'chatboxes',
    transfer: 'transfer',
    witness_vote: 'witness',
    vote: 'heart'
  };
  var icon = 'chain';
  if (type in types) {
    icon = types[type];
  } else {
    console.error('no icon for type: ', type);
  }
  return /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
    size: "1x",
    name: icon
  });
};
var notificationFilter = 'all';
var notificationFilterToTypes = {
  replies: ['reply_comment', 'reply'],
  follows: ['follow'],
  upvotes: ['vote'],
  reblogs: ['reblog'],
  mentions: ['mention']
};
var highlightText = function highlightText(text, highlight) {
  if (!highlight) return text;
  var parts = text.split(new RegExp("(".concat(highlight, ")"), 'gi'));
  return /*#__PURE__*/_react["default"].createElement("span", null, ' ', parts.map(function (part, i) {
    return /*#__PURE__*/_react["default"].createElement("span", {
      // eslint-disable-next-line react/no-array-index-key
      key: i,
      style: part.toLowerCase() === highlight.toLowerCase() ? {
        fontWeight: 'bold'
      } : {}
    }, part);
  }), ' ');
};
var NotificationsList = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(NotificationsList, _React$Component);
  // eslint-disable-next-line no-useless-constructor
  function NotificationsList() {
    var _this;
    (0, _classCallCheck2["default"])(this, NotificationsList);
    _this = _callSuper(this, NotificationsList);
    // eslint-disable-next-line no-undef
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onClickMarkAsRead", function (e) {
      e.preventDefault();
      var _this$props = _this.props,
        username = _this$props.username,
        markAsRead = _this$props.markAsRead;
      markAsRead(username, new Date().toISOString().slice(0, 19));
    });
    // eslint-disable-next-line no-undef
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "applyFilter", function () {
      var notificationElements = document.getElementsByClassName('notification__item');
      var visibleCount = 0;
      for (var ni = 0; ni < notificationElements.length; ni += 1) {
        var notificationElement = notificationElements[ni];
        if (notificationFilter === 'all') {
          notificationElement.classList.remove('hide');
          visibleCount += 1;
          if (visibleCount % 2 === 0) {
            notificationElement.classList.add('even');
          } else {
            notificationElement.classList.remove('even');
          }
        } else if (Object.prototype.hasOwnProperty.call(notificationFilterToTypes, notificationFilter)) {
          var notificationTypes = notificationFilterToTypes[notificationFilter];
          var matchType = false;
          for (var ti = 0; ti < notificationTypes.length; ti += 1) {
            var notificationType = notificationTypes[ti];
            if (notificationElement.classList.contains("notification__".concat(notificationType))) {
              matchType = true;
            }
          }
          if (matchType === false) {
            notificationElement.classList.add('hide');
          } else {
            notificationElement.classList.remove('hide');
            visibleCount += 1;
          }
          if (visibleCount % 2 === 0) {
            notificationElement.classList.add('even');
          } else {
            notificationElement.classList.remove('even');
          }
        }
      }
    });
    // eslint-disable-next-line no-undef
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onClickFilter", function (e) {
      e.preventDefault();
      var target = e.target;
      var filterElements = document.getElementsByClassName('notification__filter');

      // reset
      for (var fi = 0; fi < filterElements.length; fi += 1) {
        var filterElement = filterElements[fi];
        filterElement.classList.remove('selected');
      }
      target.classList.add('selected');
      notificationFilter = target.dataset.type;
      _this.applyFilter();
      target.blur();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onClickLoadMore", function (e) {
      e.preventDefault();
      var _this$props2 = _this.props,
        username = _this$props2.username,
        notifications = _this$props2.notifications,
        getAccountNotifications = _this$props2.getAccountNotifications;
      var lastId = notifications.slice(-1)[0].id;
      getAccountNotifications(username, lastId);
    });
    return _this;
  }
  (0, _createClass2["default"])(NotificationsList, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this$props3 = this.props,
        username = _this$props3.username,
        getAccountNotifications = _this$props3.getAccountNotifications;
      if (username) {
        getAccountNotifications(username);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props4 = this.props,
        username = _this$props4.username,
        getAccountNotifications = _this$props4.getAccountNotifications;
      if (prevProps.username !== username) {
        getAccountNotifications(username);
      }
      this.applyFilter();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
        notifications = _this$props5.notifications,
        unreadNotifications = _this$props5.unreadNotifications,
        isOwnAccount = _this$props5.isOwnAccount,
        accountName = _this$props5.accountName,
        isLastPage = _this$props5.isLastPage,
        notificationActionPending = _this$props5.notificationActionPending,
        lastRead = _this$props5.lastRead;

      // eslint-disable-next-line consistent-return
      var renderItem = function renderItem(item) {
        var unRead = Date.parse("".concat(lastRead, "Z")) <= Date.parse("".concat(item.date, "Z"));
        var usernamePattern = /\B@[a-z0-9.-]+/gi;
        var mentions = item.msg.match(usernamePattern);
        var participants = mentions ? mentions.map(function (m) {
          return /*#__PURE__*/_react["default"].createElement("a", {
            key: m,
            href: '/' + m
          }, /*#__PURE__*/_react["default"].createElement(_Userpic["default"], {
            account: m.substring(1)
          }));
        }) : null;
        if (item.date === '1970-01-01T00:00:00') {
          return null;
        }
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: item.id,
          className: "notification__item flex-body notification__".concat(item.type)
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "notification__score"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "notification__score_bar",
          style: {
            width: "".concat(item.score, "%")
          }
        })), /*#__PURE__*/_react["default"].createElement("div", {
          className: "flex-row"
        }, mentions && participants && participants[0]), /*#__PURE__*/_react["default"].createElement("div", {
          className: "flex-column"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "notification__message"
        }, /*#__PURE__*/_react["default"].createElement("a", {
          href: "/".concat(item.url)
        }, highlightText(item.msg, mentions ? mentions[0] : null))), /*#__PURE__*/_react["default"].createElement("div", {
          className: "flex-row"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "notification__icon"
        }, notificationsIcon(item.type)), /*#__PURE__*/_react["default"].createElement("div", {
          className: "notification__date"
        }, /*#__PURE__*/_react["default"].createElement(_TimeAgoWrapper["default"], {
          date: item.date + 'Z'
        })))), unRead && /*#__PURE__*/_react["default"].createElement("span", {
          className: "notification__unread"
        }, "\u2022"));
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        id: "notifications",
        className: "NotificationsContainer"
      }, isOwnAccount && /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "columns"
      }, /*#__PURE__*/_react["default"].createElement(_ClaimBox["default"], {
        accountName: accountName
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "columns"
      }, notifications && notifications.length > 0 && unreadNotifications !== 0 && !notificationActionPending && /*#__PURE__*/_react["default"].createElement("center", null, /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("a", {
        href: "#",
        onClick: this.onClickMarkAsRead
      }, /*#__PURE__*/_react["default"].createElement("strong", null, (0, _counterpart["default"])('notificationsList_jsx.mark_all_as_read'))), /*#__PURE__*/_react["default"].createElement("br", null)), /*#__PURE__*/_react["default"].createElement("center", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "notification__filter_select"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        className: (0, _classnames["default"])('notification__filter', {
          selected: notificationFilter === 'all'
        }),
        role: "link",
        "data-type": "all",
        tabIndex: 0,
        onClick: this.onClickFilter
      }, (0, _counterpart["default"])('notificationsList_jsx.all')), /*#__PURE__*/_react["default"].createElement("a", {
        className: (0, _classnames["default"])('notification__filter', {
          selected: notificationFilter === 'replies'
        }),
        role: "link",
        "data-type": "replies",
        tabIndex: 0,
        onClick: this.onClickFilter
      }, (0, _counterpart["default"])('notificationsList_jsx.replies')), /*#__PURE__*/_react["default"].createElement("a", {
        className: (0, _classnames["default"])('notification__filter', {
          selected: notificationFilter === 'mentions'
        }),
        role: "link",
        "data-type": "mentions",
        tabIndex: 0,
        onClick: this.onClickFilter
      }, (0, _counterpart["default"])('notificationsList_jsx.mentions')), /*#__PURE__*/_react["default"].createElement("a", {
        className: (0, _classnames["default"])('notification__filter', {
          selected: notificationFilter === 'follows'
        }),
        role: "link",
        "data-type": "follows",
        tabIndex: 0,
        onClick: this.onClickFilter
      }, (0, _counterpart["default"])('notificationsList_jsx.follows')), /*#__PURE__*/_react["default"].createElement("a", {
        className: (0, _classnames["default"])('notification__filter', {
          selected: notificationFilter === 'upvotes'
        }),
        role: "link",
        "data-type": "upvotes",
        tabIndex: 0,
        onClick: this.onClickFilter
      }, (0, _counterpart["default"])('notificationsList_jsx.upvotes')), /*#__PURE__*/_react["default"].createElement("a", {
        className: (0, _classnames["default"])('notification__filter', {
          selected: notificationFilter === 'reblogs'
        }),
        role: "link",
        "data-type": "reblogs",
        tabIndex: 0,
        onClick: this.onClickFilter
      }, (0, _counterpart["default"])('notificationsList_jsx.reblogs')))), notifications && notifications.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          lineHeight: '1rem'
        }
      }, notifications.map(function (item) {
        return renderItem(item);
      })), !notifications && !notificationActionPending && process.env.BROWSER && /*#__PURE__*/_react["default"].createElement(_Callout["default"], null, "Welcome! You do not have any notifications yet."), (notificationActionPending || !process.env.BROWSER) && /*#__PURE__*/_react["default"].createElement("center", null, /*#__PURE__*/_react["default"].createElement(_LoadingIndicator["default"], {
        type: "circle"
      })), !notificationActionPending && notifications && !isLastPage && /*#__PURE__*/_react["default"].createElement("center", null, /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("a", {
        href: "#",
        onClick: this.onClickLoadMore
      }, /*#__PURE__*/_react["default"].createElement("strong", null, (0, _counterpart["default"])('notificationsList_jsx.load_more')))))));
    }
  }]);
  return NotificationsList;
}(_react["default"].Component);
(0, _defineProperty2["default"])(NotificationsList, "propTypes", {
  notifications: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    id: _propTypes["default"].number,
    type: _propTypes["default"].string,
    score: _propTypes["default"].number,
    date: _propTypes["default"].date,
    msg: _propTypes["default"].string,
    url: _propTypes["default"].url
  })),
  isLastPage: _propTypes["default"].bool,
  username: _propTypes["default"].string.isRequired,
  markAsRead: _propTypes["default"].func.isRequired,
  unreadNotifications: _propTypes["default"].number,
  notificationActionPending: _propTypes["default"].bool,
  lastRead: _propTypes["default"].string.isRequired
});
(0, _defineProperty2["default"])(NotificationsList, "defaultProps", {
  notifications: [],
  unreadNotifications: 0,
  notificationActionPending: false,
  isLastPage: false
});
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, props) {
  var accountName = props.username;
  var isOwnAccount = state.user.getIn(['current', 'username'], '') == accountName;
  var notifications = state.global.getIn(['notifications', accountName, 'notifications'], (0, _immutable.List)()).toJS();
  var unreadNotifications = state.global.getIn(['notifications', accountName, 'unreadNotifications', 'unread'], 0);
  var lastRead = state.global.getIn(['notifications', accountName, 'unreadNotifications', 'lastread'], '');
  var isNotificationsLastPage = state.global.getIn(['notifications', accountName, 'isLastPage'], null);
  return _objectSpread(_objectSpread({}, props), {}, {
    isOwnAccount: isOwnAccount,
    accountName: accountName,
    unreadNotifications: unreadNotifications,
    notificationActionPending: state.global.getIn(['notifications', 'loading']),
    lastRead: lastRead,
    notifications: notifications,
    isLastPage: isNotificationsLastPage
  });
}, function (dispatch) {
  return {
    getAccountNotifications: function getAccountNotifications(username, last_id) {
      var query = {
        account: username,
        limit: 50
      };
      if (last_id) {
        query.last_id = last_id;
      }
      return dispatch(_FetchDataSaga.actions.getAccountNotifications(query));
    },
    markAsRead: function markAsRead(username, timeNow) {
      var successCallback = function successCallback(user, time) {
        setTimeout(function () {
          dispatch(globalActions.receiveUnreadNotifications({
            name: user,
            unreadNotifications: {
              lastread: time,
              unread: 0
            }
          }));
          dispatch(globalActions.notificationsLoading(false));
        }, 6000);
      };
      return dispatch(_FetchDataSaga.actions.markNotificationsAsRead({
        username: username,
        timeNow: timeNow,
        successCallback: successCallback
      }));
    }
  };
})(NotificationsList);