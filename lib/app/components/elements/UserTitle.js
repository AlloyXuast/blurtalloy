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
var _Community = require("app/utils/Community");
var transactionActions = _interopRequireWildcard(require("app/redux/TransactionReducer"));
var globalActions = _interopRequireWildcard(require("app/redux/GlobalReducer"));
var _Icon = _interopRequireDefault(require("app/components/elements/Icon"));
var _Reveal = _interopRequireDefault(require("app/components/elements/Reveal"));
var _CloseButton = _interopRequireDefault(require("app/components/elements/CloseButton"));
var _UserTitleEditor = _interopRequireDefault(require("app/components/modules/UserTitleEditor"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var UserTitle = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(UserTitle, _React$Component);
  function UserTitle(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, UserTitle);
    _this = _callSuper(this, UserTitle, [props]);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onToggleDialog", function () {
      _this.setState({
        showDialog: !_this.state.showDialog
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onSave", function (newTitle) {
      var community = _this.props.community.get('name');
      //-- Simulate a "receiveState" action to feed new title into post state
      var newstate = {
        content: {},
        simulation: true
      };
      var content_key = _this.props.author + '/' + _this.props.permlink;
      newstate['content'][content_key] = {
        author_title: newTitle
      };
      _this.props.pushState(newstate);
      _this.props.saveTitle(_this.props.username, _this.props.author, community, newTitle);
      _this.props.onEditSubmit();
      _this.setState({
        newTitle: newTitle
      });
    });
    _this.state = {
      showDialog: false,
      newTitle: ''
    };
    return _this;
  }
  (0, _createClass2["default"])(UserTitle, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        role = _this$props.role,
        viewer_role = _this$props.viewer_role,
        hideEdit = _this$props.hideEdit;
      var newTitle = this.state.newTitle;
      var title = newTitle.length > 0 ? newTitle : this.props.title || '';
      var isMod = _Community.Role.atLeast(viewer_role, 'mod');
      var showRole = role && role != 'guest';
      var showEdit = isMod && !hideEdit;
      var showTitle = title != '';
      if (!showRole && !showEdit && !showTitle) return null;
      var editor;
      if (showEdit) {
        var _this$props2 = this.props,
          author = _this$props2.author,
          community = _this$props2.community,
          username = _this$props2.username;
        var showDialog = this.state.showDialog;
        editor = /*#__PURE__*/_react["default"].createElement("span", {
          className: "affiliation-edit"
        }, /*#__PURE__*/_react["default"].createElement("a", {
          onClick: this.onToggleDialog,
          title: "Edit Title"
        }, /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
          name: "pencil2",
          size: "0_8x"
        })), showDialog && /*#__PURE__*/_react["default"].createElement(_Reveal["default"], {
          onHide: function onHide() {
            return null;
          },
          show: true
        }, /*#__PURE__*/_react["default"].createElement(_CloseButton["default"], {
          onClick: function onClick() {
            return _this2.onToggleDialog();
          }
        }), /*#__PURE__*/_react["default"].createElement(_UserTitleEditor["default"], {
          title: title,
          username: author,
          community: community.get('title'),
          onSubmit: function onSubmit(newTitle) {
            _this2.onToggleDialog();
            _this2.onSave(newTitle);
          }
        })));
      }
      return /*#__PURE__*/_react["default"].createElement("span", null, showRole && /*#__PURE__*/_react["default"].createElement("span", {
        className: "user_role"
      }, role), showTitle && /*#__PURE__*/_react["default"].createElement("span", {
        className: "affiliation"
      }, title, editor), !showTitle && showEdit && editor);
    }
  }]);
  return UserTitle;
}(_react["default"].Component);
UserTitle.propTypes = {
  username: _propTypes["default"].string,
  // edit only
  community: _propTypes["default"].object.isRequired,
  // edit only
  author: _propTypes["default"].string.isRequired,
  // edit only
  permlink: _propTypes["default"].string.isRequired,
  // edit only
  title: _propTypes["default"].string,
  onEditSubmit: _propTypes["default"].func
};
UserTitle.defaultProps = {
  onEditSubmit: function onEditSubmit() {}
};
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, ownProps) {
  var community = state.global.getIn(['community', ownProps.community], (0, _immutable.Map)());
  var viewer_role = community.getIn(['context', 'role'], 'guest');
  var author = ownProps.author,
    permlink = ownProps.permlink,
    title = ownProps.title;
  return {
    author: author,
    permlink: permlink,
    title: title,
    username: state.user.getIn(['current', 'username']),
    community: community,
    viewer_role: viewer_role
  };
}, function (dispatch) {
  return {
    pushState: function pushState(state) {
      return dispatch(globalActions.receiveState(state));
    },
    saveTitle: function saveTitle(username, account, community, title, successCallback, errorCallback) {
      var action = 'setUserTitle';
      var payload = [action, {
        community: community,
        account: account,
        title: title
      }];
      return dispatch(transactionActions.broadcastOperation({
        type: 'custom_json',
        operation: {
          id: 'community',
          required_posting_auths: [username],
          json: JSON.stringify(payload)
        },
        successCallback: successCallback,
        errorCallback: errorCallback
      }));
    }
  };
})(UserTitle);