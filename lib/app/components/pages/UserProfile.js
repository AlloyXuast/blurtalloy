"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _reactRouter = require("react-router");
var _reactRedux = require("react-redux");
var _classnames = _interopRequireDefault(require("classnames"));
var userActions = _interopRequireWildcard(require("app/redux/UserReducer"));
var _FetchDataSaga = require("app/redux/FetchDataSaga");
var _UserWallet = _interopRequireDefault(require("app/components/modules/UserWallet"));
var _Settings = _interopRequireDefault(require("app/components/modules/Settings"));
var _UserList = _interopRequireDefault(require("app/components/elements/UserList"));
var _LoadingIndicator = _interopRequireDefault(require("app/components/elements/LoadingIndicator"));
var _PostsList = _interopRequireDefault(require("app/components/cards/PostsList"));
var _StateFunctions = require("app/utils/StateFunctions");
var _counterpart = _interopRequireDefault(require("counterpart"));
var _UserProfileHeader = _interopRequireDefault(require("app/components/cards/UserProfileHeader"));
var _Callout = _interopRequireDefault(require("app/components/elements/Callout"));
var _userIllegalContent = _interopRequireDefault(require("app/utils/userIllegalContent"));
var _ArticleLayoutSelector = _interopRequireDefault(require("app/components/modules/ArticleLayoutSelector"));
var _UserProfilesSaga = require("app/redux/UserProfilesSaga");
var _blurtjs = require("@blurtfoundation/blurtjs");
var _NotificationsList = _interopRequireDefault(require("../cards/NotificationsList"));
var _UserAvatar = _interopRequireDefault(require("./UserAvatar"));
var _SubscriptionsList = _interopRequireDefault(require("../cards/SubscriptionsList"));
var _WitnessVoters = _interopRequireDefault(require("../elements/WitnessVoters"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* eslint-disable import/no-import-module-exports */ /* eslint react/prop-types: 0 */
var UserProfile = exports["default"] = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(UserProfile, _React$Component);
  function UserProfile() {
    var _this;
    (0, _classCallCheck2["default"])(this, UserProfile);
    _this = _callSuper(this, UserProfile);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "toggleShowResteem", function (e) {
      e.preventDefault();
      _this.setState(function (prevState) {
        return {
          showResteem: !prevState.showResteem
        };
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "loadAuthorMutedUsers", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var accountname, getFollowingAsync;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            accountname = _this.props.accountname;
            if (!(accountname && accountname.length > 0)) {
              _context2.next = 5;
              break;
            }
            getFollowingAsync = /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
                var followingAsyncResp, mutedUsers, _iterator, _step, follow;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      _context.prev = 0;
                      _context.next = 3;
                      return _blurtjs.api.getFollowingAsync(accountname, null, 'ignore', 1000);
                    case 3:
                      followingAsyncResp = _context.sent;
                      mutedUsers = [];
                      if (followingAsyncResp) {
                        // eslint-disable-next-line no-restricted-syntax
                        _iterator = _createForOfIteratorHelper(followingAsyncResp);
                        try {
                          for (_iterator.s(); !(_step = _iterator.n()).done;) {
                            follow = _step.value;
                            mutedUsers.push(follow.following);
                          }
                        } catch (err) {
                          _iterator.e(err);
                        } finally {
                          _iterator.f();
                        }
                        _this.setState({
                          authorMutedUsers: mutedUsers,
                          authorMutedUsersLoaded: true
                        });
                      } else {
                        console.warn('Error in loading muted users');
                        _this.setState({
                          authorMutedUsers: [],
                          authorMutedUsersLoaded: true
                        });
                      }
                      _context.next = 12;
                      break;
                    case 8:
                      _context.prev = 8;
                      _context.t0 = _context["catch"](0);
                      console.warn('Error in loading muted users');
                      _this.setState({
                        authorMutedUsers: [],
                        authorMutedUsersLoaded: true
                      });
                    case 12:
                    case "end":
                      return _context.stop();
                  }
                }, _callee, null, [[0, 8]]);
              }));
              return function getFollowingAsync() {
                return _ref2.apply(this, arguments);
              };
            }();
            _context2.next = 5;
            return getFollowingAsync();
          case 5:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    })));
    _this.state = {
      showResteem: true,
      authorMutedUsers: undefined,
      authorMutedUsersLoaded: false,
      witnessVoters: undefined
    };
    // this.onPrint = () => {
    //     if (typeof window !== 'undefined') {
    //         window.print();
    //     }
    // };
    _this.loadMore = _this.loadMore.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }
  (0, _createClass2["default"])(UserProfile, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.loadAuthorMutedUsers();
      var _this$props = this.props,
        profile = _this$props.profile,
        accountname = _this$props.accountname,
        fetchProfile = _this$props.fetchProfile,
        current_user = _this$props.current_user;
      var username = current_user ? current_user.get('username') : null;
      if (!profile) fetchProfile(accountname, username);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(np, ns) {
      return np.current_user !== this.props.current_user || np.profile !== this.props.profile || np.global_status !== this.props.global_status || np.loading !== this.props.loading || np.location.pathname !== this.props.location.pathname || np.blogmode !== this.props.blogmode || ns.showResteem !== this.state.showResteem || np.notifications !== this.props.notifications || ns.authorMutedUsersLoaded !== this.state.authorMutedUsersLoaded;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props2 = this.props,
        profile = _this$props2.profile,
        accountname = _this$props2.accountname,
        fetchProfile = _this$props2.fetchProfile,
        current_user = _this$props2.current_user;
      var username = current_user ? current_user.get('username') : null;
      if (prevProps.accountname != accountname || prevProps.username != username) {
        if (!profile) fetchProfile(accountname, username);
      }
    }
  }, {
    key: "loadMore",
    value: function loadMore(last_post, category, showResteem) {
      var _this$props3 = this.props,
        accountname = _this$props3.accountname,
        reblogPref = _this$props3.reblogPref,
        current_user = _this$props3.current_user,
        global_status = _this$props3.global_status;
      var username = current_user ? current_user.get('username') : null;
      if (!last_post) return;
      if ((0, _StateFunctions.isFetchingOrRecentlyUpdated)(global_status, category, '@' + accountname)) {
        return;
      }
      var postFilter = null;
      if (reblogPref === 'disabled') {
        postFilter = function postFilter(value) {
          return value.author === accountname;
        };
      } else {
        postFilter = showResteem ? null : function (value) {
          return value.author === accountname;
        };
      }
      var _last_post$split = last_post.split('/'),
        _last_post$split2 = (0, _slicedToArray2["default"])(_last_post$split, 2),
        author = _last_post$split2[0],
        permlink = _last_post$split2[1];
      this.props.requestData({
        author: author,
        permlink: permlink,
        order: category,
        category: '@' + accountname,
        observer: username
      });
    }
  }, {
    key: "render",
    value: function render() {
      var showResteem = this.state.showResteem,
        _this$props4 = this.props,
        current_user = _this$props4.current_user,
        global_status = _this$props4.global_status,
        follow = _this$props4.follow,
        accountname = _this$props4.accountname,
        notifications = _this$props4.notifications,
        profile = _this$props4.profile,
        posts = _this$props4.posts,
        subscriptions = _this$props4.subscriptions,
        section = _this$props4.section,
        loading = _this$props4.loading,
        routeParams = _this$props4.routeParams,
        blogmode = _this$props4.blogmode;
      var reblogPref = this.props.reblogPref;
      var username = current_user ? current_user.get('username') : null;
      // Loading status
      var status = global_status ? global_status.getIn([section, 'by_author']) : null;
      var fetching = status && status.fetching || loading;
      if (!profile && (fetching || section === 'notifications' && !notifications)) {
        return /*#__PURE__*/_react["default"].createElement("center", null, /*#__PURE__*/_react["default"].createElement(_LoadingIndicator["default"], {
          type: "circle"
        }));
      }
      if (!profile) {
        return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("center", null, (0, _counterpart["default"])('user_profile.unknown_account')));
      }
      var followers = follow && follow.getIn(['getFollowersAsync', accountname]);
      var following = follow && follow.getIn(['getFollowingAsync', accountname]);
      var isMyAccount = username === profile.get('name');
      var tab_content = null;

      // let walletClass = '';
      if (section === 'transfers') {
        // walletClass = 'active';
        tab_content = /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_UserWallet["default"], {
          account: profile,
          current_user: current_user
        }));
      } else if (section === 'followers') {
        if (followers && followers.has('blog_result')) {
          tab_content = /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_UserList["default"], {
            title: (0, _counterpart["default"])('user_profile.followers'),
            users: followers.get('blog_result')
          }));
        }
      } else if (section === 'followed') {
        if (following && following.has('blog_result')) {
          tab_content = /*#__PURE__*/_react["default"].createElement(_UserList["default"], {
            title: "Followed",
            users: following.get('blog_result')
          });
        }
      } else if (section === 'communities') {
        tab_content = /*#__PURE__*/_react["default"].createElement(_SubscriptionsList["default"], {
          username: accountname,
          subscriptions: subscriptions
        });
      } else if (section === 'settings') {
        tab_content = /*#__PURE__*/_react["default"].createElement(_Settings["default"], {
          routeParams: routeParams
        });
      } else if (section === 'comments') {
        if (posts) {
          if (!fetching && posts && !posts.size) {
            tab_content = /*#__PURE__*/_react["default"].createElement(_Callout["default"], null, (0, _counterpart["default"])('user_profile.user_hasnt_made_any_posts_yet', {
              name: accountname
            }));
          } else {
            tab_content = /*#__PURE__*/_react["default"].createElement(_PostsList["default"], {
              posts: posts,
              loading: fetching,
              category: "comments",
              loadMore: this.loadMore,
              showPinned: false,
              showSpam: true
            });
          }
        } else {
          tab_content = /*#__PURE__*/_react["default"].createElement("center", null, /*#__PURE__*/_react["default"].createElement(_LoadingIndicator["default"], {
            type: "circle"
          }));
        }
      } else if (!section || section === 'blog' || section === 'posts') {
        if (posts) {
          var emptyText = isMyAccount ? /*#__PURE__*/_react["default"].createElement("div", null, (0, _counterpart["default"])('user_profile.looks_like_you_havent_posted_anything_yet'), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
            to: "/submit.html"
          }, (0, _counterpart["default"])('user_profile.create_a_post')), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
            to: "/hot"
          }, (0, _counterpart["default"])('user_profile.explore_trending_articles')), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
            to: "/welcome"
          }, (0, _counterpart["default"])('user_profile.read_the_quick_start_guide')), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
            to: "/faq.html"
          }, (0, _counterpart["default"])('user_profile.browse_the_faq')), /*#__PURE__*/_react["default"].createElement("br", null)) : (0, _counterpart["default"])('user_profile.user_hasnt_started_bloggin_yet', {
            name: accountname
          });
          if (!fetching && posts && !posts.size) {
            tab_content = /*#__PURE__*/_react["default"].createElement(_Callout["default"], null, emptyText);
          } else {
            tab_content = /*#__PURE__*/_react["default"].createElement("div", null, reblogPref !== 'disabled' && (!section || section === 'blog') && /*#__PURE__*/_react["default"].createElement("a", {
              href: "#",
              onClick: this.toggleShowResteem
            }, showResteem ? (0, _counterpart["default"])('user_profile.hide_resteems') : (0, _counterpart["default"])('user_profile.show_all')), /*#__PURE__*/_react["default"].createElement(_PostsList["default"], {
              account: profile.get('name'),
              posts: posts,
              loading: fetching,
              category: section ? section : 'blog',
              loadMore: this.loadMore,
              showPinned: false,
              showResteem: reblogPref === 'disabled' ? false : showResteem,
              showSpam: true
            }));
          }
        } else {
          tab_content = /*#__PURE__*/_react["default"].createElement("center", null, /*#__PURE__*/_react["default"].createElement(_LoadingIndicator["default"], {
            type: "circle"
          }));
        }
      } else if (section === 'replies') {
        var _this$state = this.state,
          authorMutedUsers = _this$state.authorMutedUsers,
          authorMutedUsersLoaded = _this$state.authorMutedUsersLoaded;
        if (posts && authorMutedUsersLoaded) {
          // let filterPosts = []
          // if (authorMutedUsers !== undefined) {
          //   filterPosts = posts.get('recent_replies').filter(
          //     (reply) => !authorMutedUsers.includes(reply.split('/')[0])
          //   );
          // }

          if (authorMutedUsersLoaded && !fetching && posts && !posts.size) {
            tab_content = /*#__PURE__*/_react["default"].createElement(_Callout["default"], null, (0, _counterpart["default"])('user_profile.user_hasnt_had_any_replies_yet', {
              name: accountname
            }) + '.');
          } else {
            tab_content = /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_PostsList["default"], {
              posts: posts,
              loading: fetching,
              category: "replies",
              loadMore: this.loadMore,
              showPinned: false,
              showSpam: false
            }));
          }
        } else {
          tab_content = /*#__PURE__*/_react["default"].createElement("center", null, /*#__PURE__*/_react["default"].createElement(_LoadingIndicator["default"], {
            type: "circle"
          }));
        }
      } else if (section === 'notifications') {
        var _authorMutedUsers = this.state.authorMutedUsers;
        if (username === accountname) {
          tab_content = /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_NotificationsList["default"], {
            authorMutedUsers: _authorMutedUsers,
            username: accountname,
            notifications: notifications && notifications.toJS()
          }));
        }
      } else if (section === 'info') {
        tab_content = /*#__PURE__*/_react["default"].createElement(_WitnessVoters["default"], {
          author: accountname
        });
      } else {
        //    console.log( "no matches" );
      }

      // detect illegal users
      if (_userIllegalContent["default"].includes(accountname)) {
        tab_content = /*#__PURE__*/_react["default"].createElement("div", null, "Unavailable For Legal Reasons.");
      }
      var page_title = '';
      // Page title

      if (isMyAccount) {
        if (section === 'blog') {
          page_title = (0, _counterpart["default"])('g.my_blog');
        } else if (section === 'posts') {
          page_title = (0, _counterpart["default"])('g.my_posts');
        } else if (section === 'comments') {
          page_title = (0, _counterpart["default"])('g.my_comments');
        } else if (section === 'recent-replies') {
          page_title = (0, _counterpart["default"])('g.my_replies');
        } else if (section === 'settings') {
          page_title = (0, _counterpart["default"])('g.settings');
        }
      } else {
        if (section === 'blog') {
          page_title = (0, _counterpart["default"])('g.blog');
        } else if (section === 'posts') {
          page_title = (0, _counterpart["default"])('g.posts');
        } else if (section === 'comments') {
          page_title = (0, _counterpart["default"])('g.comments');
        } else if (section === 'recent-replies') {
          page_title = (0, _counterpart["default"])('g.replies');
        } else if (section === 'settings') {
          page_title = (0, _counterpart["default"])('g.settings');
        } else if (section === 'info') {
          // page_title = tt('g.settings')
          page_title = 'Account Info';
        }
      }
      var layoutClass = blogmode ? 'layout-block' : 'layout-list';
      var blog_header = /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "articles__header"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "articles__header-col"
      }, /*#__PURE__*/_react["default"].createElement("h1", {
        className: "articles__h1"
      }, page_title)), /*#__PURE__*/_react["default"].createElement("div", {
        className: "articles__header-col articles__header-col--right"
      }, /*#__PURE__*/_react["default"].createElement(_ArticleLayoutSelector["default"], null))), /*#__PURE__*/_react["default"].createElement("hr", {
        className: "articles__hr"
      }));
      if (!(section === 'transfers' || section === 'permissions' || section === 'password')) {
        tab_content = /*#__PURE__*/_react["default"].createElement("div", {
          className: "row"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: (0, _classnames["default"])('UserProfile__tab_content', 'column', layoutClass, section)
        }, /*#__PURE__*/_react["default"].createElement("article", {
          className: "articles"
        }, section === 'blog' || section === 'comments' ? blog_header : null, tab_content)));
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "UserProfile"
      }, /*#__PURE__*/_react["default"].createElement(_UserProfileHeader["default"], {
        accountname: accountname,
        profile: profile
      }), section && section === 'blog' && profile.getIn(['metadata', 'profile', 'avatar_url']) ? /*#__PURE__*/_react["default"].createElement("div", {
        className: "avatar",
        style: {
          textAlign: 'center',
          maxWidth: '480px',
          width: '320px',
          marginLeft: 'auto',
          marginRight: 'auto',
          boxShadow: '5px 5px 5px 5px #f24933'
        }
      }, /*#__PURE__*/_react["default"].createElement(_UserAvatar["default"], {
        avatarUrl: profile.getIn(['metadata', 'profile', 'avatar_url'])
      })) : /*#__PURE__*/_react["default"].createElement("div", null), /*#__PURE__*/_react["default"].createElement("div", null, tab_content));
    }
  }]);
  return UserProfile;
}(_react["default"].Component);
module.exports = {
  path: '@:accountname(/:section)',
  component: (0, _reactRedux.connect)(function (state, ownProps) {
    var current_user = state.user.get('current');
    var accountname = ownProps.routeParams.accountname.toLowerCase();
    var walletUrl = state.app.get('walletUrl');
    var userPreferences = state.app.get('user_preferences').toJS();
    var reblogPref = userPreferences.reblogs || 'enabled';
    var section = ownProps.routeParams.section;
    if (!section || section === 'blog') section = 'blog';else if (section === 'recent-replies') section = 'replies';
    var order = ['blog', 'posts', 'comments', 'replies', 'payout'].includes(section) ? section : null;
    return {
      posts: state.global.getIn(['discussion_idx', '@' + accountname, order]),
      discussions: state.global.get('discussion_idx'),
      current_user: current_user,
      section: section,
      order: order,
      profile: state.userProfiles.getIn(['profiles', accountname]),
      loading: state.app.get('loading'),
      global_status: state.global.get('status'),
      accountname: accountname,
      notifications: state.global.getIn(['notifications', accountname, 'notifications'], null),
      follow: state.global.get('follow'),
      blogmode: state.app.getIn(['user_preferences', 'blogmode']) === undefined ? false : state.app.getIn(['user_preferences', 'blogmode']),
      reblogPref: reblogPref,
      walletUrl: walletUrl,
      subscriptions: state.global.getIn(['subscriptions', accountname]) ? state.global.getIn(['subscriptions', accountname]).toJS() : []
    };
  }, function (dispatch) {
    return {
      login: function login() {
        dispatch(userActions.showLogin());
      },
      fetchProfile: function fetchProfile(account, observer) {
        return dispatch(_UserProfilesSaga.actions.fetchProfile({
          account: account,
          observer: observer
        }));
      },
      requestData: function requestData(args) {
        return dispatch(_FetchDataSaga.actions.requestData(args));
      }
    };
  })(UserProfile)
};