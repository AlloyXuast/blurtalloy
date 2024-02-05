"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
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
var _reactRouter = require("react-router");
var _counterpart = _interopRequireDefault(require("counterpart"));
var _immutable = require("immutable");
var _FetchDataSaga = require("app/redux/FetchDataSaga");
var _constants = _interopRequireDefault(require("app/redux/constants"));
var _shouldComponentUpdate = _interopRequireDefault(require("app/utils/shouldComponentUpdate"));
var _PostsList = _interopRequireDefault(require("app/components/cards/PostsList"));
var _StateFunctions = require("app/utils/StateFunctions");
var _Callout = _interopRequireDefault(require("app/components/elements/Callout"));
var _PostsIndexLayout = _interopRequireDefault(require("app/components/pages/PostsIndexLayout"));
var _ArticleLayoutSelector = _interopRequireDefault(require("app/components/modules/ArticleLayoutSelector"));
var _GptUtils = require("app/utils/GptUtils");
var _Topics = _interopRequireDefault(require("./Topics"));
var _SortOrder = _interopRequireDefault(require("app/components/elements/SortOrder"));
var _client_config = require("app/client_config");
var _Community = require("app/utils/Community");
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* eslint react/prop-types: 0 */
var noFriendsText = /*#__PURE__*/_react["default"].createElement("div", null, (0, _counterpart["default"])('posts_index.empty_feed_1'), ".", /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("br", null), (0, _counterpart["default"])('posts_index.empty_feed_2'), ".", /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
  to: "/hot"
}, (0, _counterpart["default"])('posts_index.empty_feed_3')), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
  to: "/welcome"
}, (0, _counterpart["default"])('posts_index.empty_feed_4')), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
  to: "/faq.html"
}, (0, _counterpart["default"])('posts_index.empty_feed_5')), /*#__PURE__*/_react["default"].createElement("br", null));
var noCommunitiesText = /*#__PURE__*/_react["default"].createElement("div", null, "You haven't joined any active communities yet!", /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("span", {
  style: {
    fontSize: '1.1rem'
  }
}, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
  to: "/communities"
}, "Explore Communities")));
var PostsIndex = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(PostsIndex, _React$Component);
  function PostsIndex() {
    var _this;
    (0, _classCallCheck2["default"])(this, PostsIndex);
    _this = _callSuper(this, PostsIndex);
    _this.state = {};
    _this.loadMore = _this.loadMore.bind((0, _assertThisInitialized2["default"])(_this));
    _this.shouldComponentUpdate = (0, _shouldComponentUpdate["default"])((0, _assertThisInitialized2["default"])(_this), 'PostsIndex');
    return _this;
  }
  (0, _createClass2["default"])(PostsIndex, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (window.innerHeight && window.innerHeight > 3000 && prevProps.posts !== this.props.posts) {
        this.refs.list.fetchIfNeeded();
      }
    }
  }, {
    key: "loadMore",
    value: function loadMore(last_post) {
      if (!last_post) return;
      if (last_post == this.props.pending) return; // if last post is 'pending', its an invalid start token
      var _this$props = this.props,
        username = _this$props.username,
        status = _this$props.status,
        order = _this$props.order,
        category = _this$props.category;
      if ((0, _StateFunctions.isFetchingOrRecentlyUpdated)(status, order, category)) return;
      var _last_post$split = last_post.split('/'),
        _last_post$split2 = (0, _slicedToArray2["default"])(_last_post$split, 2),
        author = _last_post$split2[0],
        permlink = _last_post$split2[1];
      this.props.requestData({
        author: author,
        permlink: permlink,
        order: order,
        category: category,
        observer: username
      });
    }
  }, {
    key: "render",
    value: function render() {
      var status = this.props.status ? this.props.status.getIn([category || '', order]) : null;
      var fetching = status && status.fetching || this.props.loading;
      var showSpam = this.state.showSpam;
      var _this$props2 = this.props,
        featured = _this$props2.featured,
        promoted = _this$props2.promoted,
        gptBannedTags = _this$props2.gptBannedTags,
        topic = _this$props2.topic,
        account_name = _this$props2.account_name,
        username = _this$props2.username,
        category = _this$props2.category,
        order = _this$props2.order,
        community = _this$props2.community,
        topics = _this$props2.topics,
        subscriptions = _this$props2.subscriptions,
        posts = _this$props2.posts;
      var allowAdsOnContent = true;
      allowAdsOnContent = this.props.gptEnabled && !_GptUtils.GptUtils.HasBannedTags([topic], gptBannedTags);
      var emptyText = '';
      if (order === 'feed') {
        var isMyAccount = username === account_name;
        if (isMyAccount) {
          emptyText = noFriendsText;
        } else {
          emptyText = /*#__PURE__*/_react["default"].createElement("div", null, (0, _counterpart["default"])('user_profile.user_hasnt_followed_anything_yet', {
            name: account_name
          }));
        }
      } else if (category === 'my') {
        if (!process.env.BROWSER) {
          fetching = true;
        } else {
          emptyText = noCommunitiesText;
        }
      } else if (posts.size === 0) {
        var cat = community ? 'community' //community.get('title')
        : category ? ' #' + category : '';
        if (order == 'payout') emptyText = "No pending ".concat(cat, " posts found. This view only shows posts within 12 - 36 hours of payout.");else if (order == 'created') emptyText = "No posts in ".concat(cat, " yet!");else emptyText = "No ".concat(order, " ").concat(cat, " posts found.");
      } else {
        emptyText = 'Nothing here to see...';
      }

      // page title
      var page_title = (0, _counterpart["default"])('g.all_tags');
      if (order === 'feed') {
        if (account_name === username) {
          page_title = 'My friends' || (0, _counterpart["default"])('posts_index.my_feed');
        } else if (this.props.location.pathname === "/@".concat(_client_config.RECOMMENDED_FOLLOW_ACCOUNT, "/feed")) {
          page_title = (0, _counterpart["default"])('g.recommended');
        } else {
          page_title = (0, _counterpart["default"])('posts_index.accountnames_feed', {
            account_name: account_name
          });
        }
      } else if (category === 'my') {
        page_title = 'My communities';
      } else if (community) {
        page_title = community.get('title');
      } else if (category) {
        page_title = '#' + category;
      }
      var postsIndexDisplay = /*#__PURE__*/_react["default"].createElement(_PostsList["default"], {
        ref: "list",
        posts: posts || (0, _immutable.List)(),
        loading: fetching,
        anyPosts: true,
        category: category,
        loadMore: this.loadMore,
        showFeatured: true,
        showPromoted: true,
        showSpam: showSpam,
        allowAdsOnContent: allowAdsOnContent,
        order: order,
        hideCategory: !!community
      });
      if (!fetching && !posts.size) {
        postsIndexDisplay = /*#__PURE__*/_react["default"].createElement(_Callout["default"], null, emptyText);
        if (featured && !featured.size && promoted && !promoted.size) {
          postsIndexDisplay = /*#__PURE__*/_react["default"].createElement(_Callout["default"], null, emptyText);
        }
      }
      if (!username && posts.size && category === 'my') {
        postsIndexDisplay = /*#__PURE__*/_react["default"].createElement(_Callout["default"], null, emptyText);
      }
      return /*#__PURE__*/_react["default"].createElement(_PostsIndexLayout["default"], {
        category: category,
        blogmode: this.props.blogmode
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "articles__header row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "small-6 medium-6 large-6 column"
      }, /*#__PURE__*/_react["default"].createElement("h1", {
        className: "articles__h1 show-for-mq-large articles__h1--no-wrap"
      }, page_title), /*#__PURE__*/_react["default"].createElement("div", {
        className: "show-for-mq-large"
      }, community && /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          fontSize: '80%',
          color: 'gray'
        }
      }, (0, _counterpart["default"])("g.community")), !community && category && order !== 'feed' && category !== 'my' && /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          fontSize: '80%',
          color: 'gray'
        }
      }, (0, _counterpart["default"])("g.unmoderated_tag"))), /*#__PURE__*/_react["default"].createElement("span", {
        className: "hide-for-mq-large articles__header-select"
      }, /*#__PURE__*/_react["default"].createElement(_Topics["default"], {
        username: username,
        current: category,
        topics: topics,
        subscriptions: subscriptions,
        compact: true
      }))), order != 'feed' && !(category === 'my' && !posts.size) && /*#__PURE__*/_react["default"].createElement("div", {
        className: "small-4 medium-5 large-4 column articles__header-select"
      }, /*#__PURE__*/_react["default"].createElement(_SortOrder["default"], {
        sortOrder: order,
        topic: category,
        horizontal: false
      })), !community && /*#__PURE__*/_react["default"].createElement("div", {
        className: "medium-1 show-for-mq-medium column"
      }, /*#__PURE__*/_react["default"].createElement(_ArticleLayoutSelector["default"], null))), /*#__PURE__*/_react["default"].createElement("hr", {
        className: "articles__hr"
      }), postsIndexDisplay);
    }
  }]);
  return PostsIndex;
}(_react["default"].Component);
(0, _defineProperty2["default"])(PostsIndex, "propTypes", {
  discussions: _propTypes["default"].object,
  status: _propTypes["default"].object,
  routeParams: _propTypes["default"].object,
  requestData: _propTypes["default"].func,
  loading: _propTypes["default"].bool,
  username: _propTypes["default"].string,
  blogmode: _propTypes["default"].bool,
  topics: _propTypes["default"].object
});
(0, _defineProperty2["default"])(PostsIndex, "defaultProps", {
  showSpam: false
});
module.exports = {
  path: ':order(/:category)',
  component: (0, _reactRedux.connect)(function (state, ownProps) {
    // route can be e.g. trending/food (order/category);
    //   or, @username/feed (category/order). Branch on presence of `@`.
    var route = ownProps.routeParams;
    var account_name = route.order && route.order[0] == '@' ? route.order.slice(1).toLowerCase() : null;
    var category = account_name ? route.order : route.category ? route.category.toLowerCase() : null;
    var order = account_name ? route.category : route.order || _constants["default"].DEFAULT_SORT_ORDER;
    var blurt = (0, _Community.ifBlurt)(category);
    var community = state.global.getIn(['community', blurt], null);
    if (typeof community === 'string') {
      community = null;
    }
    var key = ['discussion_idx', category || '', order];
    var posts = state.global.getIn(key, (0, _immutable.List)());
    var pkey = ['discussion_idx', category || '', '_' + order];
    var pending = state.global.getIn(pkey, null);
    if (pending && !posts.includes(pending)) {
      posts = posts.unshift(pending);
    }
    var username = state.user.getIn(['current', 'username']) || state.offchain.get('account');
    var userPreferences = state.app.get('user_preferences').toJS();
    var reblogPref = userPreferences.reblogs || 'enabled';
    return {
      subscriptions: state.global.getIn(['subscriptions', username]) || null,
      account_name: account_name,
      username: username,
      community: community,
      order: order,
      posts: posts,
      category: category,
      discussions: state.global.get('discussion_idx'),
      status: state.global.get('status'),
      loading: state.app.get('loading'),
      blogmode: state.app.getIn(['user_preferences', 'blogmode']) === undefined ? false : state.app.getIn(['user_preferences', 'blogmode']),
      topic: ownProps.params.category,
      featured: state.offchain.get('special_posts').get('featured_posts'),
      promoted: state.offchain.get('special_posts').get('promoted_posts'),
      notices: state.offchain.get('special_posts').get('notices').toJS(),
      maybeLoggedIn: state.user.get('maybeLoggedIn'),
      isBrowser: process.env.BROWSER,
      gptEnabled: state.app.getIn(['googleAds', 'gptEnabled']),
      gptBannedTags: state.app.getIn(['googleAds', 'gptBannedTags']),
      bandwidthKbytesFee: state.global.getIn(['props', 'bandwidth_kbytes_fee']),
      operationFlatFee: state.global.getIn(['props', 'operation_flat_fee']),
      pricePerBlurt: state.global.getIn(['props', 'price_per_blurt']),
      reblogPref: reblogPref,
      topics: state.global.getIn(['topics'], (0, _immutable.List)())
    };
  }, function (dispatch) {
    return {
      requestData: function requestData(args) {
        return dispatch(_FetchDataSaga.actions.requestData(args));
      }
    };
  })(PostsIndex)
};