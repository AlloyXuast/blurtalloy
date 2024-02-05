"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports._Header_ = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRouter = require("react-router");
var _reactRedux = require("react-redux");
var _Accessors = require("app/utils/Accessors");
var _ExtractContent = _interopRequireDefault(require("app/utils/ExtractContent"));
var _reactHeadroom = _interopRequireDefault(require("react-headroom"));
var _ResolveRoute = _interopRequireDefault(require("app/ResolveRoute"));
var _counterpart = _interopRequireDefault(require("counterpart"));
var _client_config = require("app/client_config");
var _SortOrder = _interopRequireDefault(require("app/components/elements/SortOrder"));
var _SearchInput = _interopRequireDefault(require("app/components/elements/SearchInput"));
var _IconButton = _interopRequireDefault(require("app/components/elements/IconButton"));
var _DropdownMenu = _interopRequireDefault(require("app/components/elements/DropdownMenu"));
var userActions = _interopRequireWildcard(require("app/redux/UserReducer"));
var appActions = _interopRequireWildcard(require("app/redux/AppReducer"));
var _Userpic = _interopRequireDefault(require("app/components/elements/Userpic"));
var _constants = require("shared/constants");
var _BlurtLogo = _interopRequireDefault(require("app/components/elements/BlurtLogo"));
var _NormalizeProfile = _interopRequireDefault(require("app/utils/NormalizeProfile"));
var _FetchDataSaga = require("app/redux/FetchDataSaga");
var _PollingSaga = require("app/redux/PollingSaga");
var _blurtjs = require("@blurtfoundation/blurtjs");
var _immutable = require("immutable");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Header = exports._Header_ = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Header, _React$Component);
  function Header(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, Header);
    _this = _callSuper(this, Header, [props]);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "setCurrentPower", function () {
      var username = _this.props.username;
      if (username) {
        _blurtjs.api.getAccounts([username], function (err, response) {
          var accountUpdated = response[0];
          localStorage.setItem('updated-account', JSON.stringify(accountUpdated));
          if (accountUpdated) {
            var updatedVotingPower = _this.calculateVotingPower(accountUpdated).toFixed();
            localStorage.setItem('current-voting-power', updatedVotingPower);
            _this.setState({
              currentVotingPower: updatedVotingPower
            });
          }
        });
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "calculateVotingPower", function (current_account) {
      var BLURT_VOTING_MANA_REGENERATION_SECONDS = _this.props.BLURT_VOTING_MANA_REGENERATION_SECONDS;
      var voting_manabar = null;
      if (!voting_manabar) {
        voting_manabar = current_account ? current_account.voting_manabar : 0;
      }
      var current_mana = parseInt(voting_manabar ? voting_manabar.current_mana : 0);
      var last_update_time = voting_manabar ? voting_manabar.last_update_time : 0;
      var vesting_shares = 0.0;
      if (!vesting_shares) {
        vesting_shares = current_account ? Number(current_account.vesting_shares.split(' ')[0]) : 0.0;
      }
      var delegated_vesting_shares = 0.0;
      if (!delegated_vesting_shares) {
        delegated_vesting_shares = current_account ? Number(current_account.delegated_vesting_shares.split(' ')[0]) : 0.0;
      }
      var vesting_withdraw_rate = 0.0;
      if (!vesting_withdraw_rate) {
        vesting_withdraw_rate = current_account ? current_account.vesting_withdraw_rate ? current_account.vesting_withdraw_rate.split(' ')[0] : 0.0 : 0.0;
      }
      var received_vesting_shares = 0.0;
      if (!received_vesting_shares) {
        received_vesting_shares = current_account ? Number(current_account.received_vesting_shares.split(' ')[0]) : 0.0;
      }
      var net_vesting_shares = vesting_shares - delegated_vesting_shares + received_vesting_shares;
      var maxMana = (net_vesting_shares - Number(vesting_withdraw_rate)) * 1000000;
      var now = Math.round(Date.now() / 1000);
      var elapsed = now - last_update_time;
      var regenerated_mana = elapsed * maxMana / BLURT_VOTING_MANA_REGENERATION_SECONDS;
      var currentMana = current_mana;
      currentMana += regenerated_mana;
      if (currentMana >= maxMana) {
        currentMana = maxMana;
      }
      return currentMana * 100 / maxMana;
    });
    _this.state = {
      gptAdRendered: false,
      showAd: false,
      showAnnouncement: _this.props.showAnnouncement,
      currentVotingPower: 100
    };
    return _this;
  }
  (0, _createClass2["default"])(Header, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;
      var _this$props = this.props,
        loggedIn = _this$props.loggedIn,
        current_account_name = _this$props.current_account_name,
        startNotificationsPolling = _this$props.startNotificationsPolling;
      if (loggedIn) {
        startNotificationsPolling(current_account_name);
        console.log('====================================');
        console.log('startNotificationsPolling');
        console.log('====================================');
        // Update power every 30 sec
        if (!this.powerUpdateInterval) this.setCurrentPower();
        this.powerUpdateInterval = setInterval(function () {
          _this2.setCurrentPower();
        }, 30000);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;
      if (!this.props.gptEnabled || !process.env.BROWSER || !window.googletag || !window.googletag.pubads) {
        return null;
      }
      window.addEventListener('gptadshown', function (e) {
        return _this3.gptAdRendered(e);
      });
    }

    // Consider refactor.
    // I think 'last sort order' is something available through react-router-redux history.
    // Therefore no need to store it in the window global like this.
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.pathname !== this.props.pathname) {
        var route = (0, _ResolveRoute["default"])(nextProps.pathname);
        if (route && route.page === 'PostsIndex' && route.params && route.params.length > 0) {
          var sort_order = route.params[0] !== 'home' ? route.params[0] : null;
          if (sort_order) {
            window.last_sort_order = this.last_sort_order = route.params[0];
          } else if (sort_order === null && this.props.current_account_name) {
            window.last_sort_order = this.last_sort_order = route.params[0];
          }
        }
      }
      if (nextProps.loggedIn !== this.props.loggedIn && nextProps.loggedIn && nextProps.current_account_name) {
        this.props.getAccountNotifications(nextProps.current_account_name);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!this.props.gptEnabled || !process.env.BROWSER || !window.googletag || !window.googletag.pubads) {
        return null;
      }
      clearInterval(this.powerUpdateInterval);
    }
  }, {
    key: "headroomOnUnpin",
    value: function headroomOnUnpin() {
      this.setState({
        showAd: false
      });
    }
  }, {
    key: "headroomOnUnfix",
    value: function headroomOnUnfix() {
      this.setState({
        showAd: true
      });
    }
  }, {
    key: "gptAdRendered",
    value: function gptAdRendered() {
      this.setState({
        showAd: true,
        gptAdRendered: true
      });
    }
  }, {
    key: "hideAnnouncement",
    value: function hideAnnouncement() {
      this.setState({
        showAnnouncement: false
      });
      this.props.hideAnnouncement();
    }
  }, {
    key: "disablePowerClick",
    value: function disablePowerClick(e) {
      if (e) e.preventDefault();
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;
      var _this$props2 = this.props,
        category = _this$props2.category,
        order = _this$props2.order,
        pathname = _this$props2.pathname,
        current_account_name = _this$props2.current_account_name,
        username = _this$props2.username,
        showLogin = _this$props2.showLogin,
        logout = _this$props2.logout,
        loggedIn = _this$props2.loggedIn,
        vertical = _this$props2.vertical,
        nightmodeEnabled = _this$props2.nightmodeEnabled,
        toggleNightmode = _this$props2.toggleNightmode,
        userPath = _this$props2.userPath,
        showSidePanel = _this$props2.showSidePanel,
        navigate = _this$props2.navigate,
        display_name = _this$props2.display_name,
        walletUrl = _this$props2.walletUrl,
        content = _this$props2.content,
        unreadNotificationCount = _this$props2.unreadNotificationCount,
        notificationActionPending = _this$props2.notificationActionPending;
      var _this$state = this.state,
        showAd = _this$state.showAd,
        showAnnouncement = _this$state.showAnnouncement,
        currentVotingPower = _this$state.currentVotingPower;
      var lastSeenTimestamp = 0;
      /* Set the document.title on each header render. */
      var route = (0, _ResolveRoute["default"])(pathname);
      var tags = [];
      var home_account = false;
      var page_title = route.page;
      var sort_order = '';
      var topic = '';
      var page_name = null;
      if (route.page === 'PostsIndex') {
        sort_order = route.params[0];
        if (sort_order === 'home') {
          page_title = (0, _counterpart["default"])('header_jsx.my_friends');
        } else {
          topic = route.params.length > 1 ? route.params[1] || '' : '';
          tags = [topic];
          var prefix = route.params[0];
          if (prefix == 'created') prefix = 'New';
          if (prefix == 'payout') prefix = 'Pending';
          if (prefix == 'payout_comments') prefix = 'Pending';
          if (prefix == 'muted') prefix = 'Muted';
          page_title = prefix;
          if (topic !== '') {
            var name = this.props.community.getIn([topic, 'title'], '#' + topic);
            if (name == '#my') name = 'My Communities';
            page_title = "".concat(name, " / ").concat(page_title);
          } else {
            page_title += ' posts';
          }
        }
      } else if (route.page === 'Post') {
        var user = "".concat(route.params[1]).replace('@', '');
        var slug = "".concat(route.params[2]);
        if (content) {
          var post_content = content.get("".concat(user, "/").concat(slug));
          if (post_content) {
            var p = (0, _ExtractContent["default"])(_Accessors.immutableAccessor, post_content);
            tags = p.json_metadata.tags || [];
          }
        }
        sort_order = '';
        topic = route.params[0];
      } else if (route.page == 'SubmitPost') {
        page_title = (0, _counterpart["default"])('header_jsx.create_a_post');
      } else if (route.page == 'Privacy') {
        page_title = (0, _counterpart["default"])('navigation.privacy_policy');
      } else if (route.page == 'Tos') {
        page_title = (0, _counterpart["default"])('navigation.terms_of_service');
      } else if (route.page == 'CommunityRoles') {
        page_title = 'Community Roles';
      } else if (route.page == 'RecoverAccountStep1') {
        page_title = (0, _counterpart["default"])('header_jsx.stolen_account_recovery');
      } else if (route.page === 'UserProfile') {
        var user_name = route.params[0].slice(1);
        var user_title = display_name ? "".concat(display_name, " (@").concat(user_name, ")") : user_name;
        page_title = user_title;
        if (route.params[1] === 'followers') {
          page_title = (0, _counterpart["default"])('header_jsx.people_following', {
            username: user_title
          });
        }
        if (route.params[1] === 'followed') {
          page_title = (0, _counterpart["default"])('header_jsx.people_followed_by', {
            username: user_title
          });
        }
        if (route.params[1] === 'recent-replies') {
          page_title = (0, _counterpart["default"])('header_jsx.replies_to', {
            username: user_title
          });
        }
        if (route.params[1] === 'info') {
          page_title = "Account Info";
          // page_title = tt('header_jsx.replies_to', {
          //   username: user_title
          // })
        }
        // @user/"posts" is deprecated in favor of "comments" as of oct-2016 (#443)
        if (route.params[1] === 'posts' || route.params[1] === 'comments') {
          page_title = (0, _counterpart["default"])('header_jsx.comments_by', {
            username: user_title
          });
        }
        if (route.params[1] === 'notifications') {
          page_title = (0, _counterpart["default"])('header_jsx.notifications', {
            username: user_title
          });
        }
      } else {
        page_name = ''; // page_title = route.page.replace( /([a-z])([A-Z])/g, '$1 $2' ).toLowerCase();
      }

      // Format first letter of all titles and lowercase user name
      if (route.page !== 'UserProfile') {
        page_title = page_title.charAt(0).toUpperCase() + page_title.slice(1);
      }
      if (process.env.BROWSER && route.page !== 'Post' && route.page !== 'PostNoCategory') {
        document.title = page_title + ' — ' + _client_config.APP_NAME;
      }
      var logo_link = this.last_sort_order !== 'home' && current_account_name ? "/@".concat(current_account_name, "/feed") : '/';

      // TopRightHeader Stuff
      var defaultNavigate = function defaultNavigate(e) {
        if (e.metaKey || e.ctrlKey) {
          // prevent breaking anchor tags
        } else {
          e.preventDefault();
        }
        var a = e.target.nodeName.toLowerCase() === 'a' ? e.target : e.target.parentNode;
        browserHistory.push(a.pathname + a.search + a.hash);
      };

      // Since navigate isn't set, defaultNavigate will always be used.
      var nav = navigate || defaultNavigate;
      var submit_story = $STM_Config.read_only_mode ? null : loggedIn ? /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
        to: "/submit.html"
      }, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], null)) : null;
      var feed_link = "/@".concat(username, "/feed");
      var replies_link = "/@".concat(username, "/recent-replies");
      var account_link = "/@".concat(username);
      var comments_link = "/@".concat(username, "/comments");
      var wallet_link = "".concat(walletUrl, "/@").concat(username);
      var settings_link = "/@".concat(username, "/settings");
      var pathCheck = userPath === '/submit.html' ? true : null;
      var notifications_link = "/@".concat(username, "/notifications");
      var notif_label = (0, _counterpart["default"])('g.notifications') + (unreadNotificationCount > 0 ? " (".concat(unreadNotificationCount, ")") : '');
      var top_menu = [{
        link: '/',
        label: (0, _counterpart["default"])('main_menu.posts'),
        target: false
      }, {
        link: '/communities',
        label: (0, _counterpart["default"])('main_menu.communities'),
        target: false
      }, {
        link: "".concat(walletUrl, "/~witnesses"),
        label: (0, _counterpart["default"])('main_menu.witnesses'),
        target: true
      }, {
        link: '/dapps',
        label: (0, _counterpart["default"])('main_menu.dapps'),
        target: false
      }];
      var user_menu = [{
        link: '#',
        icon: 'heart',
        onClick: this.disablePowerClick,
        value: "Voting Power : ".concat(currentVotingPower, "%")
      }, {
        link: feed_link,
        icon: 'home',
        value: (0, _counterpart["default"])('g.feed')
      }, {
        link: account_link,
        icon: 'profile',
        value: (0, _counterpart["default"])('g.blog')
      }, {
        link: notifications_link,
        icon: 'notification',
        value: notif_label
      }, {
        link: comments_link,
        icon: 'replies',
        value: (0, _counterpart["default"])('g.comments')
      }, {
        link: replies_link,
        icon: 'reply',
        value: (0, _counterpart["default"])('g.replies')
      }, {
        link: wallet_link,
        icon: 'wallet',
        value: (0, _counterpart["default"])('g.wallet')
      }, {
        link: '#',
        icon: 'eye',
        onClick: toggleNightmode,
        value: (0, _counterpart["default"])('g.toggle_nightmode')
      }, {
        link: settings_link,
        icon: 'cog',
        value: (0, _counterpart["default"])('g.settings')
      }, loggedIn ? {
        link: '#',
        icon: 'enter',
        onClick: logout,
        value: (0, _counterpart["default"])('g.logout')
      } : {
        link: '#',
        onClick: showLogin,
        value: (0, _counterpart["default"])('g.login')
      }];
      showAd = true;
      return /*#__PURE__*/_react["default"].createElement(_reactHeadroom["default"], {
        onUnpin: function onUnpin(e) {
          return _this4.headroomOnUnpin(e);
        },
        onUnfix: function onUnfix(e) {
          return _this4.headroomOnUnfix(e);
        }
      }, /*#__PURE__*/_react["default"].createElement("header", {
        className: "Header"
      }, /*#__PURE__*/_react["default"].createElement("nav", {
        className: "row Header__nav"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "small-5 large-4 columns Header__logotype"
      }, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
        to: logo_link
      }, /*#__PURE__*/_react["default"].createElement(_BlurtLogo["default"], null))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "large-4 columns show-for-large large-centered Header__sort"
      }, /*#__PURE__*/_react["default"].createElement("ul", {
        className: "nav__block-list"
      }, top_menu.map(function (li, index) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          className: "nav__block-list-item",
          key: "header-li-".concat(index)
        }, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
          to: li.link,
          target: li.target ? "_blank" : undefined,
          rel: li.target ? "noopener noreferrer" : undefined
        }, li.label));
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "small-7 large-4 columns Header__buttons"
      }, !loggedIn && /*#__PURE__*/_react["default"].createElement("span", {
        className: "Header__user-signup show-for-medium"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        className: "Header__login-link",
        href: "/login.html",
        onClick: showLogin
      }, (0, _counterpart["default"])('g.login')), /*#__PURE__*/_react["default"].createElement("a", {
        className: "Header__signup-link",
        href: _constants.SIGNUP_URL
      }, (0, _counterpart["default"])('g.sign_up'))), /*#__PURE__*/_react["default"].createElement("span", {
        className: "Header__search--desktop"
      }, /*#__PURE__*/_react["default"].createElement(_SearchInput["default"], null)), /*#__PURE__*/_react["default"].createElement("span", {
        className: "Header__search"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        href: "/static/search.html"
      }, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
        icon: "magnifyingGlass"
      }))), submit_story, loggedIn && /*#__PURE__*/_react["default"].createElement(_DropdownMenu["default"], {
        className: "Header__usermenu",
        items: user_menu,
        title: username,
        el: "span",
        selected: (0, _counterpart["default"])('g.rewards'),
        position: "left"
      }, /*#__PURE__*/_react["default"].createElement("li", {
        className: "Header__userpic "
      }, /*#__PURE__*/_react["default"].createElement("span", {
        title: username
      }, /*#__PURE__*/_react["default"].createElement(_Userpic["default"], {
        account: username
      }))), !notificationActionPending && unreadNotificationCount > 0 && /*#__PURE__*/_react["default"].createElement("div", {
        className: "Header__notification"
      }, /*#__PURE__*/_react["default"].createElement("span", null, unreadNotificationCount))), /*#__PURE__*/_react["default"].createElement("span", {
        onClick: showSidePanel,
        className: "toggle-menu Header__hamburger"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "hamburger"
      }))))));
    }
  }]);
  return Header;
}(_react["default"].Component);
(0, _defineProperty2["default"])(Header, "propTypes", {
  current_account_name: _propTypes["default"].string,
  display_name: _propTypes["default"].string,
  pathname: _propTypes["default"].string,
  category: _propTypes["default"].string,
  order: _propTypes["default"].string,
  getAccountNotifications: _propTypes["default"].func,
  startNotificationsPolling: _propTypes["default"].func,
  loggedIn: _propTypes["default"].bool,
  unreadNotificationCount: _propTypes["default"].number
});
var mapStateToProps = function mapStateToProps(state, ownProps) {
  // SSR code split.
  if (!process.env.BROWSER) {
    return {
      username: null,
      loggedIn: false,
      community: state.global.get('community', (0, _immutable.Map)({}))
    };
  }
  var display_name;
  var route = (0, _ResolveRoute["default"])(ownProps.pathname);
  if (route.page === 'UserProfile') {
    display_name = state.userProfiles.getIn(['profiles', route.params[0].slice(1), 'metadata', 'profile', 'name'], null);
  }
  var userPath = state.routing.locationBeforeTransitions.pathname;
  var username = state.user.getIn(['current', 'username']);
  var loggedIn = !!username;
  var BLURT_VOTING_MANA_REGENERATION_SECONDS = state.global.getIn(['blurt_config', 'BLURT_VOTING_MANA_REGENERATION_SECONDS']);
  var current_account_name = username || state.offchain.get('account');
  var gptEnabled = state.app.getIn(['googleAds', 'gptEnabled']);
  var walletUrl = state.app.get('walletUrl');
  var content = state.global.get('content');
  var unreadNotificationCount = 0;
  if (loggedIn && state.global.getIn(['notifications', current_account_name, 'unreadNotifications'])) {
    unreadNotificationCount = state.global.getIn(['notifications', current_account_name, 'unreadNotifications', 'unread']);
  }
  return _objectSpread({
    username: username,
    loggedIn: loggedIn,
    community: state.global.get('community', (0, _immutable.Map)({})),
    userPath: userPath,
    nightmodeEnabled: state.user.getIn(['user_preferences', 'nightmode']),
    display_name: display_name,
    current_account_name: current_account_name,
    showAnnouncement: state.user.get('showAnnouncement'),
    gptEnabled: gptEnabled,
    walletUrl: walletUrl,
    content: content,
    unreadNotificationCount: unreadNotificationCount,
    notificationActionPending: state.global.getIn(['notifications', 'loading']),
    BLURT_VOTING_MANA_REGENERATION_SECONDS: BLURT_VOTING_MANA_REGENERATION_SECONDS
  }, ownProps);
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    showLogin: function showLogin(e) {
      if (e) e.preventDefault();
      dispatch(userActions.showLogin({
        type: 'basic'
      }));
    },
    logout: function logout(e) {
      if (e) e.preventDefault();
      dispatch(userActions.logout({
        type: 'default'
      }));
    },
    toggleNightmode: function toggleNightmode(e) {
      if (e) e.preventDefault();
      dispatch(appActions.toggleNightmode());
    },
    showSidePanel: function showSidePanel() {
      dispatch(userActions.showSidePanel());
    },
    hideSidePanel: function hideSidePanel() {
      dispatch(userActions.hideSidePanel());
    },
    hideAnnouncement: function hideAnnouncement() {
      return dispatch(userActions.hideAnnouncement());
    },
    getAccountNotifications: function getAccountNotifications(username) {
      var query = {
        account: username
      };
      return dispatch(_FetchDataSaga.actions.getAccountUnreadNotifications(query));
    },
    startNotificationsPolling: function startNotificationsPolling(username) {
      var query = {
        account: username
      };
      var params = {
        pollAction: _FetchDataSaga.actions.getAccountUnreadNotifications,
        pollPayload: query,
        delay: 600000 // The delay between successive polls
      };
      return dispatch((0, _PollingSaga.startPolling)(params));
    }
  };
};
var connectedHeader = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Header);
var _default = exports["default"] = connectedHeader;