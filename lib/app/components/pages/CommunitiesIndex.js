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
var _reactRedux = require("react-redux");
var _counterpart = _interopRequireDefault(require("counterpart"));
var _immutable = require("immutable");
var _FetchDataSaga = require("app/redux/FetchDataSaga");
var _SubscribeButton = _interopRequireDefault(require("app/components/elements/SubscribeButton"));
var _reactRouter = require("react-router");
var _PostsIndexLayout = _interopRequireDefault(require("app/components/pages/PostsIndexLayout"));
var _LoadingIndicator = _interopRequireDefault(require("app/components/elements/LoadingIndicator"));
var _UserNames = _interopRequireDefault(require("app/components/elements/UserNames"));
var _ElasticSearchInput = _interopRequireDefault(require("app/components/elements/ElasticSearchInput"));
var _NativeSelect = _interopRequireDefault(require("app/components/elements/NativeSelect"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var CommunitiesIndex = exports["default"] = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(CommunitiesIndex, _React$Component);
  function CommunitiesIndex(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, CommunitiesIndex);
    _this = _callSuper(this, CommunitiesIndex, [props]);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "componentDidUpdate", function (prevProps) {
      var _this$props = _this.props,
        performSearch = _this$props.performSearch,
        username = _this$props.username,
        searchQuery = _this$props.searchQuery,
        searchOrder = _this$props.searchOrder;
      if (prevProps.username !== username) {
        performSearch(username, searchQuery, searchOrder);
      }
    });
    _this.state = {
      searchQuery: undefined,
      searchOrder: 'rank'
    };
    var _performSearch = props.performSearch,
      _username = props.username,
      _searchQuery = props.searchQuery,
      _searchOrder = props.searchOrder;
    _performSearch(_username, _searchQuery, _searchOrder);
    return _this;
  }
  (0, _createClass2["default"])(CommunitiesIndex, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props2 = this.props,
        communities = _this$props2.communities,
        communities_idx = _this$props2.communities_idx,
        username = _this$props2.username,
        walletUrl = _this$props2.walletUrl,
        performSearch = _this$props2.performSearch;
      var ordered = communities_idx !== null ? communities_idx.map(function (name) {
        return communities.get(name);
      }) : [];
      var sortOptions = [{
        value: 'rank',
        label: 'Rank'
      }, {
        value: 'subs',
        label: 'Subscribers'
      }, {
        value: 'new',
        label: 'New'
      }];
      var role = function role(comm) {
        return comm.context && comm.context.role !== 'guest' && /*#__PURE__*/_react["default"].createElement("span", {
          className: "user_role"
        }, comm.context.role);
      };
      var communityAdmins = function communityAdmins(admins) {
        if (!admins || admins.length === 0) return null;
        return /*#__PURE__*/_react["default"].createElement("div", null, admins.length === 1 ? "".concat((0, _counterpart["default"])('g.administrator'), ": ") : "".concat((0, _counterpart["default"])('g.administrators'), ": "), /*#__PURE__*/_react["default"].createElement(_UserNames["default"], {
          names: admins
        }));
      };
      var row = function row(comm) {
        var admins = communityAdmins(comm.admins);
        return /*#__PURE__*/_react["default"].createElement("tr", {
          key: comm.name
        }, /*#__PURE__*/_react["default"].createElement("th", null, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
          className: "title",
          to: "/trending/".concat(comm.name)
        }, comm.title), role(comm), /*#__PURE__*/_react["default"].createElement("br", null), comm.about, /*#__PURE__*/_react["default"].createElement("small", null, "".concat(comm.subscribers, " ").concat(comm.subscribers === 1 ? 'subscriber' : 'subscribers', " "), "\u2022", " ".concat(comm.num_authors, " posters"), "\u2022", " ".concat(comm.num_pending, " posts"), admins)), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement(_SubscribeButton["default"], {
          community: comm.name
        })));
      };
      var _this$state = this.state,
        searchQuery = _this$state.searchQuery,
        searchOrder = _this$state.searchOrder;
      return /*#__PURE__*/_react["default"].createElement(_PostsIndexLayout["default"], {
        blogmode: false,
        category: this.props.routeParams.category,
        order: this.props.routeParams.order,
        topic: this.props.params.category
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "CommunitiesIndex c-sidebar__module"
      }, username && /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          "float": 'right'
        }
      }, /*#__PURE__*/_react["default"].createElement("a", {
        href: "".concat(walletUrl, "/@").concat(username, "/communities")
      }, "Create a Community")), /*#__PURE__*/_react["default"].createElement("h4", null, (0, _counterpart["default"])('g.community_list_header')), /*#__PURE__*/_react["default"].createElement("div", {
        className: "articles__header row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "small-8 medium-7 large-8 column"
      }, /*#__PURE__*/_react["default"].createElement(_ElasticSearchInput["default"], {
        expanded: true,
        handleSubmit: function handleSubmit(q) {
          _this2.setState({
            searchQuery: q
          });
          performSearch(username, q, searchOrder);
        }
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "small-4 medium-3 large-4 column"
      }, /*#__PURE__*/_react["default"].createElement(_NativeSelect["default"], {
        options: sortOptions,
        currentlySelected: searchOrder,
        onChange: function onChange(opt) {
          _this2.setState({
            searchOrder: opt.value
          });
          performSearch(username, searchQuery, opt.value);
        }
      }))), /*#__PURE__*/_react["default"].createElement("hr", null), ordered.size > 0 && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("table", null, /*#__PURE__*/_react["default"].createElement("tbody", null, ordered.map(function (comm) {
        return row(comm.toJS());
      })))), ordered.size === 0 && /*#__PURE__*/_react["default"].createElement("div", null, (0, _counterpart["default"])('g.community_search_no_result')), communities === null && /*#__PURE__*/_react["default"].createElement("center", null, /*#__PURE__*/_react["default"].createElement(_LoadingIndicator["default"], {
        style: {
          marginBottom: '2rem'
        },
        type: "circle"
      }))));
    }
  }]);
  return CommunitiesIndex;
}(_react["default"].Component);
module.exports = {
  path: 'communities(/:username)',
  component: (0, _reactRedux.connect)(function (state) {
    // Get current sort and query from the url.
    return {
      walletUrl: state.app.get('walletUrl'),
      username: state.user.getIn(['current', 'username']),
      communities: state.global.get('community', (0, _immutable.Map)()),
      communities_idx: state.global.get('community_idx', (0, _immutable.List)())
    };
  }, function (dispatch) {
    return {
      performSearch: function performSearch(observer, query) {
        var sort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'rank';
        dispatch(_FetchDataSaga.actions.listCommunities({
          observer: observer,
          query: query,
          sort: sort
        }));
      }
    };
  })(CommunitiesIndex)
};