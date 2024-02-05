"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
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
var _counterpart = _interopRequireDefault(require("counterpart"));
var _FetchDataSaga = require("app/redux/FetchDataSaga");
var _constants = _interopRequireDefault(require("app/redux/constants"));
var _SidebarLinks = _interopRequireDefault(require("app/components/elements/SidebarLinks"));
var _SidebarNewUsers = _interopRequireDefault(require("app/components/elements/SidebarNewUsers"));
var _SidebarStats = _interopRequireDefault(require("app/components/elements/SidebarStats"));
var _Notices = _interopRequireDefault(require("app/components/elements/Notices"));
var _CommunityPane = _interopRequireDefault(require("app/components/elements/CommunityPane"));
var _CommunityPaneMobile = _interopRequireDefault(require("app/components/elements/CommunityPaneMobile"));
var _TagList = _interopRequireDefault(require("./TagList"));
var _GptUtils = require("app/utils/GptUtils");
var _GptAd = _interopRequireDefault(require("app/components/elements/GptAd"));
var _Topics = _interopRequireDefault(require("./Topics"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* eslint react/prop-types: 0 */
var propTypes = {
  category: _propTypes["default"].string,
  order: _propTypes["default"].string,
  username: _propTypes["default"].string,
  blogmode: _propTypes["default"].bool,
  topics: _propTypes["default"].object,
  topic: _propTypes["default"].string
};
var defaultProps = {
  category: '',
  order: '',
  username: '',
  blogmode: false,
  showSpam: false,
  topics: {},
  topic: ''
};
var PostsIndexLayout = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(PostsIndexLayout, _React$Component);
  function PostsIndexLayout(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, PostsIndexLayout);
    _this = _callSuper(this, PostsIndexLayout, [props]);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onShowSpam", function () {
      _this.setState({
        showSpam: !_this.state.showSpam
      });
    });
    _this.state = {
      showSpam: false
    };
    var subscriptions = props.subscriptions,
      getSubscriptions = props.getSubscriptions,
      username = props.username;
    if (!subscriptions && username) getSubscriptions(username);
    return _this;
  }
  (0, _createClass2["default"])(PostsIndexLayout, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this$props = this.props,
        subscriptions = _this$props.subscriptions,
        getSubscriptions = _this$props.getSubscriptions,
        username = _this$props.username;
      if (!subscriptions && username) getSubscriptions(username);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props2 = this.props,
        subscriptions = _this$props2.subscriptions,
        getSubscriptions = _this$props2.getSubscriptions,
        username = _this$props2.username;
      if (!subscriptions && username && username !== prevProps.username) getSubscriptions(username);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
        topics = _this$props3.topics,
        subscriptions = _this$props3.subscriptions,
        community = _this$props3.community,
        username = _this$props3.username,
        blogmode = _this$props3.blogmode,
        isBrowser = _this$props3.isBrowser,
        children = _this$props3.children,
        maybeLoggedIn = _this$props3.maybeLoggedIn,
        bandwidthKbytesFee = _this$props3.bandwidthKbytesFee,
        operationFlatFee = _this$props3.operationFlatFee,
        pricePerBlurt = _this$props3.pricePerBlurt,
        notices = _this$props3.notices,
        gptEnabled = _this$props3.gptEnabled,
        topic = _this$props3.topic,
        order = _this$props3.order,
        category = _this$props3.category,
        tags = _this$props3.tags,
        gptBannedTags = _this$props3.gptBannedTags;
      var showSpam = this.state.showSpam;
      var allowAdsOnContent = true;
      allowAdsOnContent = gptEnabled && !_GptUtils.GptUtils.HasBannedTags([topic], gptBannedTags);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: 'PostsIndex row ' + (community ? 'layout-list' : blogmode ? 'layout-block' : 'layout-list')
      }, /*#__PURE__*/_react["default"].createElement("article", {
        className: "articles"
      }, community && /*#__PURE__*/_react["default"].createElement("span", {
        className: "hide-for-mq-large articles__header-select"
      }, /*#__PURE__*/_react["default"].createElement(_CommunityPaneMobile["default"], {
        community: community,
        username: username
      })), children), /*#__PURE__*/_react["default"].createElement("aside", {
        className: "c-sidebar c-sidebar--right"
      }, community && /*#__PURE__*/_react["default"].createElement(_CommunityPane["default"], {
        community: community,
        username: username
      }), !community ? isBrowser && !maybeLoggedIn && !username ? /*#__PURE__*/_react["default"].createElement(_SidebarNewUsers["default"], null) : isBrowser && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_SidebarLinks["default"], {
        username: username
      }), /*#__PURE__*/_react["default"].createElement(_SidebarStats["default"], {
        bandwidthKbytesFee: bandwidthKbytesFee.toFixed(3),
        operationFlatFee: operationFlatFee.toFixed(3),
        pricePerBlurt: pricePerBlurt
      })) : null, !community && /*#__PURE__*/_react["default"].createElement(_Notices["default"], {
        notices: notices
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "sidebar-ad"
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
      }, "Join A-Ads Network")))), gptEnabled && allowAdsOnContent ? /*#__PURE__*/_react["default"].createElement("div", {
        className: "sidebar-ad"
      }, /*#__PURE__*/_react["default"].createElement(_GptAd["default"], {
        type: "Freestar",
        id: "bsa-zone_1566495004689-0_123456"
      })) : null), /*#__PURE__*/_react["default"].createElement("aside", {
        className: "c-sidebar c-sidebar--left"
      }, subscriptions && username && (subscriptions || topics).size > 0 && /*#__PURE__*/_react["default"].createElement(_Topics["default"], {
        username: username,
        topics: topics,
        subscriptions: subscriptions,
        compact: false
      }), !community && /*#__PURE__*/_react["default"].createElement(_Topics["default"], {
        topics: topics,
        compact: false
      }), isBrowser && (maybeLoggedIn || username) && /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(!community && "hide-for-mq-large")
      }, /*#__PURE__*/_react["default"].createElement(_SidebarLinks["default"], {
        username: username
      }), /*#__PURE__*/_react["default"].createElement(_SidebarStats["default"], {
        bandwidthKbytesFee: bandwidthKbytesFee.toFixed(3),
        operationFlatFee: operationFlatFee.toFixed(3),
        pricePerBlurt: pricePerBlurt
      })), community && /*#__PURE__*/_react["default"].createElement(_Notices["default"], {
        notices: notices
      }), tags && /*#__PURE__*/_react["default"].createElement(_TagList["default"], {
        order: order,
        current: category,
        compact: false,
        username: this.props.username,
        categories: tags
      }), /*#__PURE__*/_react["default"].createElement("small", null, /*#__PURE__*/_react["default"].createElement("a", {
        className: "c-sidebar__more-link",
        onClick: this.onShowSpam
      }, showSpam ? (0, _counterpart["default"])('g.next_3_strings_together.show_less') : (0, _counterpart["default"])('g.next_3_strings_together.show_more')), ' ' + (0, _counterpart["default"])('g.next_3_strings_together.value_posts')), /*#__PURE__*/_react["default"].createElement("div", {
        className: "sidebar-ad"
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
      }, "Join A-Ads Network")))), gptEnabled && allowAdsOnContent ? /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "sidebar-ad"
      }, /*#__PURE__*/_react["default"].createElement(_GptAd["default"], {
        type: "Freestar",
        slotName: "bsa-zone_1566494461953-7_123456"
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "sidebar-ad",
        style: {
          marginTop: 20
        }
      }, /*#__PURE__*/_react["default"].createElement(_GptAd["default"], {
        type: "Freestar",
        slotName: "bsa-zone_1566494856923-9_123456"
      }))) : null));
    }
  }]);
  return PostsIndexLayout;
}(_react["default"].Component);
PostsIndexLayout.propTypes = propTypes;
PostsIndexLayout.defaultProps = defaultProps;
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, props) {
  var category = props.category,
    _props$order = props.order,
    order = _props$order === void 0 ? _constants["default"].DEFAULT_SORT_ORDER : _props$order;
  var username = state.user.getIn(['current', 'username']) || state.offchain.get('account');
  var community = state.global.getIn(['community', props.category], null);
  if (typeof community === 'string') {
    community = null;
  }
  if (category === 'feed') {
    var account_name = order.slice(1);
    feed_posts = state.global.getIn(['accounts', account_name, 'feed']);
  }
  return {
    order: order,
    tags: state.global.getIn(['tag_idx', 'trending']).take(40),
    category: category,
    blogmode: props.blogmode,
    community: community,
    subscriptions: state.global.getIn(['subscriptions', username], null),
    topics: state.global.getIn(['topics'], (0, _immutable.List)()),
    isBrowser: process.env.BROWSER,
    username: username,
    maybeLoggedIn: state.user.get('maybeLoggedIn'),
    bandwidthKbytesFee: state.global.getIn(['props', 'bandwidth_kbytes_fee']),
    operationFlatFee: state.global.getIn(['props', 'operation_flat_fee']),
    pricePerBlurt: state.global.getIn(['props', 'price_per_blurt']),
    topic: props.topic,
    featured: state.offchain.get('special_posts').get('featured_posts'),
    promoted: state.offchain.get('special_posts').get('promoted_posts'),
    notices: state.offchain.get('special_posts').get('notices').toJS(),
    gptBannedTags: state.app.getIn(['googleAds', 'gptBannedTags']),
    gptEnabled: state.app.getIn(['googleAds', 'gptEnabled'])
  };
}, function (dispatch) {
  return {
    getSubscriptions: function getSubscriptions(account) {
      return dispatch(_FetchDataSaga.actions.getSubscriptions(account));
    }
  };
})(PostsIndexLayout);