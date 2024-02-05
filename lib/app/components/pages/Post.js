"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Comment = _interopRequireWildcard(require("app/components/cards/Comment"));
var _PostFull = _interopRequireDefault(require("app/components/cards/PostFull"));
var _Accessors = require("app/utils/Accessors");
var _ExtractContent = _interopRequireDefault(require("app/utils/ExtractContent"));
var _reactRedux = require("react-redux");
var _immutable = require("immutable");
var _DropdownMenu = _interopRequireDefault(require("app/components/elements/DropdownMenu"));
var _counterpart = _interopRequireDefault(require("counterpart"));
var _ServerApiClient = require("app/utils/ServerApiClient");
var _constants = require("shared/constants");
var _GptAd = _interopRequireDefault(require("app/components/elements/GptAd"));
var _UserUtil = require("app/utils/UserUtil");
var _reactAdsense = _interopRequireDefault(require("react-adsense"));
var _Icon = _interopRequireDefault(require("app/components/elements/Icon"));
var _blurtjs = require("@blurtfoundation/blurtjs");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* eslint-disable operator-linebreak */ /* eslint-disable react/destructuring-assignment */ /* eslint-disable react/sort-comp */ /* eslint-disable react/require-default-props */ /* eslint-disable react/static-property-placement */ /* eslint-disable react/forbid-prop-types */
var Post = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Post, _React$Component);
  function Post() {
    var _this;
    (0, _classCallCheck2["default"])(this, Post);
    _this = _callSuper(this, Post);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "toggleNegativeReplies", function (e) {
      _this.setState({
        showNegativeComments: !_this.state.showNegativeComments
      });
      e.preventDefault();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onHideComment", function () {
      _this.setState({
        commentHidden: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "showAnywayClick", function () {
      _this.setState({
        showAnyway: true
      });
    });
    _this.componentUnmounted = false;
    _this.state = {
      showNegativeComments: false,
      authorMutedUsers: [],
      authorMutedUsersLoaded: false
    };
    _this.showSignUp = function () {
      (0, _ServerApiClient.serverApiRecordEvent)('SignUp', 'Post Promo');
      window.location = _constants.SIGNUP_URL;
    };
    return _this;
  }
  (0, _createClass2["default"])(Post, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.enabled) {
        return;
      }
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      if (!this.componentUnmounted && !this.state.authorMutedUsersLoaded) {
        this.loadAuthorMutedUsers();
      }
    }

    // componentDidUpdate(prevProps, prevState) {
    //     console.log('Update lifecycle');
    //     if (
    //         prevState.authorMutedUsersLoaded !==
    //         this.state.authorMutedUsersLoaded
    //     ) {
    //         if(!this.componentUnmounted) {
    //             this.loadAuthorMutedUsers();
    //         }
    //     }
    // }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.componentUnmounted = true;
    }
  }, {
    key: "loadAuthorMutedUsers",
    value: function loadAuthorMutedUsers() {
      var _this2 = this;
      var post = this.props.post;
      if (!post) {
        var route_params = this.props.routeParams;
        post = route_params.username + '/' + route_params.slug;
      }
      var dis = this.props.content.get(post);
      var emptyPost = !dis || dis.get('created') === '1970-01-01T00:00:00' && dis.get('body') === '';
      if (!emptyPost) {
        var author = dis.get('author');
        var getFollowingAsync = /*#__PURE__*/function () {
          var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
            var followingAsyncResp, mutedUsers, _iterator, _step, follow;
            return _regenerator["default"].wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _blurtjs.api.getFollowingAsync(author, null, 'ignore', 1000);
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
                    _this2.setState({
                      authorMutedUsers: mutedUsers,
                      authorMutedUsersLoaded: true
                    });
                  } else {
                    console.warn('Error in loading muted users');
                    _this2.setState({
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
                  _this2.setState({
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
            return _ref.apply(this, arguments);
          };
        }();
        getFollowingAsync();

        // api.getFollowingAsync(author, null, 'ignore', 1000)
        //     .then((res) => {
        //         const mutedUsers = [];
        //         res.forEach((follow) => {
        //             mutedUsers.push(follow.following);
        //         });
        //         this.setState({
        //             authorMutedUsers: mutedUsers,
        //             authorMutedUsersLoaded: true,
        //         });
        //     })
        //     .catch((err) => {
        //         console.warn('Error in loading muted users');
        //         this.setState({
        //             authorMutedUsers: [],
        //             authorMutedUsersLoaded: true,
        //         });
        //     });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var showSignUp = this.showSignUp;
      var _this$props = this.props,
        content = _this$props.content,
        sortOrder = _this$props.sortOrder;
      var _this$state = this.state,
        showNegativeComments = _this$state.showNegativeComments,
        commentHidden = _this$state.commentHidden,
        showAnyway = _this$state.showAnyway,
        authorMutedUsers = _this$state.authorMutedUsers,
        authorMutedUsersLoaded = _this$state.authorMutedUsersLoaded;
      var post = this.props.post;
      if (!post) {
        var route_params = this.props.routeParams;
        post = route_params.username + '/' + route_params.slug;
      }
      var dis = content.get(post);
      // const dis = aux_content ? Map(aux_content) : Map();

      // check if the post doesn't exist
      // !dis may be enough but keep 'created' & 'body' test for potential compatibility
      var emptyPost = !dis || dis.get('created') === '1970-01-01T00:00:00' && dis.get('body') === '';
      if (emptyPost) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "NotFound float-center"
        }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
          name: "blurt",
          size: "4x"
        }), /*#__PURE__*/_react["default"].createElement("h4", {
          className: "NotFound__header"
        }, "Sorry! This page doesn't exist."), /*#__PURE__*/_react["default"].createElement("p", null, "Not to worry. You can head back to", ' ', /*#__PURE__*/_react["default"].createElement("a", {
          style: {
            fontWeight: 800
          },
          href: "/"
        }, "our homepage"), ", or check out some great posts."), /*#__PURE__*/_react["default"].createElement("ul", {
          className: "NotFound__menu"
        }, /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("a", {
          href: "/created"
        }, "new posts")), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("a", {
          href: "/hot"
        }, "hot posts")), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("a", {
          href: "/trending"
        }, "trending posts")), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("a", {
          href: "/promoted"
        }, "promoted posts")), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("a", {
          href: "/active"
        }, "active posts")))));
      }

      // TODO: This data model needs some help.
      var post_content = content.get(post);
      var p = (0, _ExtractContent["default"])(_Accessors.immutableAccessor, post_content);
      var tags = p.json_metadata.tags;

      // A post should be hidden if it is not special, is not told to "show
      // anyway", and is designated "gray".
      var special = dis.get('special');
      if (!special && !showAnyway) {
        var _dis$get$toJS = dis.get('stats').toJS(),
          gray = _dis$get$toJS.gray;
        if (gray) {
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: "Post"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "row"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "column"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "PostFull"
          }, /*#__PURE__*/_react["default"].createElement("p", {
            onClick: this.showAnywayClick
          }, (0, _counterpart["default"])('promote_post_jsx.this_post_was_hidden_due_to_low_ratings'), ".", ' ', /*#__PURE__*/_react["default"].createElement("button", {
            style: {
              marginBottom: 0
            },
            className: "button hollow tiny float-right",
            onClick: this.showAnywayClick
          }, (0, _counterpart["default"])('g.show')))))));
        }
      }
      var replies = [];
      if (authorMutedUsersLoaded && authorMutedUsers !== undefined) {
        replies = dis.get('replies').toJS();
        replies = replies.filter(function (reply) {
          return !authorMutedUsers.includes(reply.split('/')[0]);
        });
      }
      (0, _Comment.sortComments)(content, replies, sortOrder);

      // Don't render too many comments on server-side
      var commentLimit = 100;
      if (global.process !== undefined && replies.length > commentLimit) {
        replies = replies.slice(0, commentLimit);
      }
      var commentCount = 0;
      var positiveComments = replies.map(function (reply) {
        commentCount++;
        var showAd = commentCount % 5 == 0 && commentCount != replies.length && commentCount != commentLimit;
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: post + reply
        }, authorMutedUsersLoaded ? /*#__PURE__*/_react["default"].createElement(_Comment["default"], {
          root: true,
          content: reply,
          authorMutedUsers: authorMutedUsers,
          cont: content,
          sort_order: sortOrder,
          showNegativeComments: showNegativeComments,
          onHide: _this3.onHideComment
        }) : null, _this3.props.gptEnabled && showAd ? /*#__PURE__*/_react["default"].createElement("div", {
          className: "Post_footer__ad"
        }, /*#__PURE__*/_react["default"].createElement(_GptAd["default"], {
          tags: tags,
          type: "Freestar",
          id: "bsa-zone_1566494240874-7_123456"
        })) : null);
      });
      var negativeGroup = commentHidden && authorMutedUsersLoaded && /*#__PURE__*/_react["default"].createElement("div", {
        className: "hentry Comment root Comment__negative_group"
      }, /*#__PURE__*/_react["default"].createElement("p", null, showNegativeComments ? (0, _counterpart["default"])('post_jsx.now_showing_comments_with_low_ratings') : (0, _counterpart["default"])('post_jsx.comments_were_hidden_due_to_low_ratings'), ".", ' ', /*#__PURE__*/_react["default"].createElement("button", {
        className: "button hollow tiny float-right",
        onClick: function onClick(e) {
          return _this3.toggleNegativeReplies(e);
        }
      }, showNegativeComments ? (0, _counterpart["default"])('g.hide') : (0, _counterpart["default"])('g.show'))));
      var sort_orders = ['trending', 'votes', 'new'];
      var sort_labels = [(0, _counterpart["default"])('post_jsx.comment_sort_order.trending'), (0, _counterpart["default"])('post_jsx.comment_sort_order.votes'), (0, _counterpart["default"])('post_jsx.comment_sort_order.age')];
      var sort_menu = [];
      var sort_label;
      var selflink = "/".concat(dis.get('category'), "/@").concat(post);
      for (var o = 0; o < sort_orders.length; ++o) {
        if (sort_orders[o] == sortOrder) sort_label = sort_labels[o];
        sort_menu.push({
          value: sort_orders[o],
          label: sort_labels[o],
          link: selflink + '?sort=' + sort_orders[o] + '#comments'
        });
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "Post"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column"
      }, authorMutedUsersLoaded && authorMutedUsers && /*#__PURE__*/_react["default"].createElement(_PostFull["default"], {
        authorMutedUsers: authorMutedUsers,
        post: post,
        cont: content
      }))), authorMutedUsersLoaded && !(0, _UserUtil.isLoggedIn)() && /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "Post__promo"
      }, (0, _counterpart["default"])('g.next_7_strings_single_block.authors_get_paid_when_people_like_you_upvote_their_post'), ".", /*#__PURE__*/_react["default"].createElement("br", null), (0, _counterpart["default"])('g.next_7_strings_single_block.if_you_enjoyed_what_you_read_earn_amount'), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        className: "button e-btn",
        onClick: showSignUp
      }, (0, _counterpart["default"])('loginform_jsx.sign_up_get_steem'))))), authorMutedUsersLoaded && authorMutedUsers ? /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column"
      }, /*#__PURE__*/_react["default"].createElement("iframe", {
        "data-aa": "2059755",
        title: "A-ads bitcoin ads",
        src: "//acceptable.a-ads.com/2059755",
        style: {
          width: '100%',
          border: '0px',
          padding: '0',
          overflow: 'hidden',
          backgroundColor: 'transparent'
        }
      }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", {
        className: "text-center"
      }, /*#__PURE__*/_react["default"].createElement("small", null, /*#__PURE__*/_react["default"].createElement("a", {
        rel: "external nofollow",
        href: "https://a-ads.com/?partner=2059755"
      }, "Join A-Ads Network"))))) : null, authorMutedUsersLoaded && authorMutedUsers ? /*#__PURE__*/_react["default"].createElement("div", {
        id: "#comments",
        className: "Post_comments row hfeed"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column large-12"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "Post_comments__content"
      }, positiveComments.length ? /*#__PURE__*/_react["default"].createElement("div", {
        className: "Post__comments_sort_order float-right"
      }, (0, _counterpart["default"])('post_jsx.sort_order'), ": \xA0", /*#__PURE__*/_react["default"].createElement(_DropdownMenu["default"], {
        items: sort_menu,
        el: "li",
        selected: sort_label,
        position: "left"
      })) : null, positiveComments, negativeGroup))) : null, this.props.gptEnabled ? /*#__PURE__*/_react["default"].createElement("div", {
        className: "Post_footer__ad"
      }, /*#__PURE__*/_react["default"].createElement(_GptAd["default"], {
        tags: tags,
        type: "Freestar",
        id: "bsa-zone_1566494371533-0_123456"
      })) : null, this.props.enabled && positiveComments.length ? /*#__PURE__*/_react["default"].createElement(_reactAdsense["default"].Google, {
        client: "ca-pub-8228818602519714",
        slot: "1435928495",
        style: {
          display: 'block'
        },
        format: "auto",
        responsive: "true"
      }) : null);
    }
  }]);
  return Post;
}(_react["default"].Component);
(0, _defineProperty2["default"])(Post, "propTypes", {
  content: _propTypes["default"].object.isRequired,
  post: _propTypes["default"].string,
  routeParams: _propTypes["default"].object,
  sortOrder: _propTypes["default"].string
});
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, ownProps) {
  return {
    content: state.global.get('content'),
    sortOrder: ownProps.router.getCurrentLocation().query.sort || state.app.getIn(['user_preferences', 'defaultCommentsSortOrder'], 'new'),
    gptEnabled: state.app.getIn(['googleAds', 'gptEnabled']),
    enabled: state.app.getIn(['googleAds', 'enabled'])
  };
})(Post);