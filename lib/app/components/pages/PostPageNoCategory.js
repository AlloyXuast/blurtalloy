"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireDefault(require("react"));
var _reactRouter = require("react-router");
var _reactRedux = require("react-redux");
var _FetchDataSaga = require("app/redux/FetchDataSaga");
var _LoadingIndicator = _interopRequireDefault(require("app/components/elements/LoadingIndicator"));
var _SvgImage = _interopRequireDefault(require("app/components/elements/SvgImage"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var PostWrapper = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(PostWrapper, _React$Component);
  function PostWrapper(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, PostWrapper);
    _this = _callSuper(this, PostWrapper, [props]);
    var redirectUrl = props.redirectUrl,
      loading = props.loading,
      author = props.author,
      permlink = props.permlink;
    if (redirectUrl) {
      if (_reactRouter.browserHistory) _reactRouter.browserHistory.replace(redirectUrl);
    } else if (loading) {
      props.getPostHeader({
        author: author,
        permlink: permlink
      });
    }
    return _this;
  }
  (0, _createClass2["default"])(PostWrapper, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var redirectUrl = this.props.redirectUrl;
      if (redirectUrl && redirectUrl !== prevProps.redirectUrl) {
        if (_reactRouter.browserHistory) _reactRouter.browserHistory.replace(redirectUrl);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", null, this.props.loading ? /*#__PURE__*/_react["default"].createElement("center", null, /*#__PURE__*/_react["default"].createElement(_LoadingIndicator["default"], {
        type: "circle"
      })) : /*#__PURE__*/_react["default"].createElement("div", {
        className: "NotFound float-center"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        href: "/"
      }, /*#__PURE__*/_react["default"].createElement(_SvgImage["default"], {
        name: "404",
        width: "640px",
        height: "480px"
      }))));
    }
  }]);
  return PostWrapper;
}(_react["default"].Component);
var StoreWrapped = (0, _reactRedux.connect)(function (state, props) {
  // read route
  var routeParams = props.routeParams;
  var author = routeParams.username;
  var permlink = routeParams.slug;
  var postref = author + '/' + permlink;

  // check for category (undefined: loading; null: not found)
  var category = state.global.getIn(['content', postref, 'category']);
  if (typeof category === 'undefined') {
    if (state.global.hasIn(['headers', postref])) {
      category = state.global.getIn(['headers', postref, 'category'], null);
    }
  }
  return {
    author: author,
    permlink: permlink,
    redirectUrl: category ? "/".concat(category, "/@").concat(postref) : null,
    loading: typeof category === 'undefined'
  };
}, function (dispatch) {
  return {
    getPostHeader: function getPostHeader(payload) {
      return dispatch(_FetchDataSaga.actions.getPostHeader(payload));
    }
  };
})(PostWrapper);
module.exports = {
  path: '/@:username/:slug',
  component: StoreWrapped
};