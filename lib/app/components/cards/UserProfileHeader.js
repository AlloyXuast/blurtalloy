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
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireDefault(require("react"));
var _reactRouter = require("react-router");
var _reactRedux = require("react-redux");
var _Icon = _interopRequireDefault(require("app/components/elements/Icon"));
var _Follow = _interopRequireDefault(require("app/components/elements/Follow"));
var _Tooltip = _interopRequireDefault(require("app/components/elements/Tooltip"));
var _DateJoinWrapper = _interopRequireDefault(require("app/components/elements/DateJoinWrapper"));
var _TimeAgoWrapper = _interopRequireDefault(require("app/components/elements/TimeAgoWrapper"));
var _counterpart = _interopRequireDefault(require("counterpart"));
var _Userpic = _interopRequireDefault(require("app/components/elements/Userpic"));
var _AffiliationMap = _interopRequireDefault(require("app/utils/AffiliationMap"));
var _ProxifyUrl = require("app/utils/ProxifyUrl");
var _SanitizedLink = _interopRequireDefault(require("app/components/elements/SanitizedLink"));
var _Blacklist = _interopRequireDefault(require("app/components/elements/Blacklist"));
var _DropdownMenu = _interopRequireDefault(require("app/components/elements/DropdownMenu"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* eslint react/prop-types: 0 */
var UserProfileHeader = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(UserProfileHeader, _React$Component);
  function UserProfileHeader() {
    (0, _classCallCheck2["default"])(this, UserProfileHeader);
    return _callSuper(this, UserProfileHeader, arguments);
  }
  (0, _createClass2["default"])(UserProfileHeader, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        current_user = _this$props.current_user,
        accountname = _this$props.accountname,
        profile = _this$props.profile,
        walletUrl = _this$props.walletUrl;
      var _ref = profile ? profile.getIn(['metadata', 'profile']).toJS() : {},
        name = _ref.name,
        location = _ref.location,
        about = _ref.about,
        website = _ref.website,
        cover_image = _ref.cover_image;
      var website_label = website ? website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : null;
      var isMyAccount = current_user === profile.get('name');
      var cover_image_style = {};
      if (cover_image) {
        if (cover_image.match(/\.(gif)$/) !== null) {
          cover_image_style = {
            backgroundImage: 'url(' + cover_image + ')'
          };
        } else {
          cover_image_style = {
            backgroundImage: 'url(' + (0, _ProxifyUrl.proxifyImageUrl)(cover_image, '2048x512') + ')'
          };
        }
      }
      var vestingShares = profile.getIn(['stats', 'bp'], 0);
      var accountBp = parseInt(vestingShares);
      var rewardsMenu = [{
        link: "".concat(walletUrl, "/@").concat(accountname, "/curation-rewards"),
        label: (0, _counterpart["default"])('g.curation_rewards'),
        value: (0, _counterpart["default"])('g.curation_rewards')
      }, {
        link: "".concat(walletUrl, "/@").concat(accountname, "/author-rewards"),
        label: (0, _counterpart["default"])('g.author_rewards'),
        value: (0, _counterpart["default"])('g.author_rewards')
      }];
      var _url = function _url(tab) {
        return "/@".concat(accountname).concat(tab == 'blog' ? '' : '/' + tab);
      };
      var _tablink = function _tablink(tab, label) {
        return /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
          to: _url(tab),
          activeClassName: "active"
        }, label);
      };
      var top_menu = /*#__PURE__*/_react["default"].createElement("div", {
        className: "row UserProfile__top-menu"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "columns small-9 medium-12 medium-expand"
      }, /*#__PURE__*/_react["default"].createElement("ul", {
        className: "menu",
        style: {
          flexWrap: 'wrap'
        }
      }, /*#__PURE__*/_react["default"].createElement("li", null, _tablink('blog', (0, _counterpart["default"])('g.blog'))), /*#__PURE__*/_react["default"].createElement("li", null, _tablink('posts', (0, _counterpart["default"])('g.posts'))), /*#__PURE__*/_react["default"].createElement("li", null, _tablink('comments', (0, _counterpart["default"])('g.comments'))), /*#__PURE__*/_react["default"].createElement("li", null, _tablink('recent-replies', (0, _counterpart["default"])('g.replies'))), /*#__PURE__*/_react["default"].createElement("li", null, _tablink('info', (0, _counterpart["default"])('g.account_info'))), /*#__PURE__*/_react["default"].createElement("li", null, _tablink('communities', (0, _counterpart["default"])('g.communities'))), current_user === accountname && /*#__PURE__*/_react["default"].createElement("li", null, _tablink('notifications', (0, _counterpart["default"])('g.notifications'))), /*#__PURE__*/_react["default"].createElement(_DropdownMenu["default"], {
        items: rewardsMenu,
        el: "li",
        selected: (0, _counterpart["default"])('g.rewards'),
        position: "right"
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "columns shrink"
      }, /*#__PURE__*/_react["default"].createElement("ul", {
        className: "menu",
        style: {
          flexWrap: 'wrap'
        }
      }, /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("a", {
        href: "".concat(walletUrl, "/@").concat(accountname),
        target: "_blank",
        rel: "noopener noreferrer"
      }, (0, _counterpart["default"])('g.wallet'))), isMyAccount && /*#__PURE__*/_react["default"].createElement("li", null, _tablink('settings', (0, _counterpart["default"])('g.settings'))))));
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "UserProfile__banner row expanded"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column",
        style: cover_image_style
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          position: 'relative'
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "UserProfile__buttons hide-for-small-only"
      }, /*#__PURE__*/_react["default"].createElement(_Follow["default"], {
        follower: current_user,
        following: accountname
      }))), /*#__PURE__*/_react["default"].createElement("h1", null, /*#__PURE__*/_react["default"].createElement(_Userpic["default"], {
        account: accountname,
        hideIfDefault: true
      }), name || accountname, ' ', /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
        t: (0, _counterpart["default"])('user_profile.this_is_users_reputations_score_it_is_based_on_history_of_votes', {
          name: accountname
        })
      }), /*#__PURE__*/_react["default"].createElement(_Blacklist["default"], {
        author: accountname
      }), _AffiliationMap["default"][accountname] ? /*#__PURE__*/_react["default"].createElement("span", {
        className: "affiliation"
      }, (0, _counterpart["default"])('g.affiliation_' + _AffiliationMap["default"][accountname])) : null), /*#__PURE__*/_react["default"].createElement("div", null, about && /*#__PURE__*/_react["default"].createElement("p", {
        className: "UserProfile__bio"
      }, about), /*#__PURE__*/_react["default"].createElement("div", {
        className: "UserProfile__stats"
      }, /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
        to: "/@".concat(accountname, "/followers")
      }, (0, _counterpart["default"])('user_profile.follower_count', {
        count: profile.getIn(['stats', 'followers'], 0)
      }))), /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
        to: "/@".concat(accountname)
      }, (0, _counterpart["default"])('user_profile.post_count', {
        count: profile.get('post_count', 0)
      }))), /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
        to: "/@".concat(accountname, "/followed")
      }, (0, _counterpart["default"])('user_profile.followed_count', {
        count: profile.getIn(['stats', 'following'], 0)
      }))), /*#__PURE__*/_react["default"].createElement("span", null, accountBp, " BP"), profile.get('balance') && typeof parseInt(profile.get('balance')) === 'number' && /*#__PURE__*/_react["default"].createElement("span", null, parseInt(profile.get('balance')), " BLURT")), /*#__PURE__*/_react["default"].createElement("p", {
        className: "UserProfile__info"
      }, location && /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
        name: "location"
      }), " ", location), website && /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
        name: "link"
      }), ' ', /*#__PURE__*/_react["default"].createElement(_SanitizedLink["default"], {
        url: website,
        text: website_label
      })), /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
        name: "calendar"
      }), ' ', /*#__PURE__*/_react["default"].createElement(_DateJoinWrapper["default"], {
        date: profile.get('created')
      }), /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
        name: "calendar"
      }), ' ', "Active ", /*#__PURE__*/_react["default"].createElement(_TimeAgoWrapper["default"], {
        date: profile.get('active')
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "UserProfile__buttons_mobile show-for-small-only"
      }, /*#__PURE__*/_react["default"].createElement(_Follow["default"], {
        follower: current_user,
        following: accountname,
        what: "blog"
      })))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "UserProfile__top-nav row expanded"
      }, top_menu));
    }
  }]);
  return UserProfileHeader;
}(_react["default"].Component);
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, props) {
  var walletUrl = state.app.get('walletUrl');
  var username = state.user.get('current');
  var current_user = username ? username.get('username') : null;
  return {
    accountname: props.accountname,
    profile: props.profile,
    current_user: current_user,
    walletUrl: walletUrl
  };
})(UserProfileHeader);