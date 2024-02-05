"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var communityActions = _interopRequireWildcard(require("app/redux/CommunityReducer"));
var _immutable = require("immutable");
var _LoadingIndicator = _interopRequireDefault(require("app/components/elements/LoadingIndicator"));
var _Reveal = _interopRequireDefault(require("app/components/elements/Reveal"));
var _CloseButton = _interopRequireDefault(require("app/components/elements/CloseButton"));
var _UserRole = _interopRequireDefault(require("app/components/modules/UserRole"));
var _reactRouter = require("react-router");
var _PostsIndexLayout = _interopRequireDefault(require("app/components/pages/PostsIndexLayout"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var CommunityRoles = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(CommunityRoles, _React$Component);
  function CommunityRoles(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, CommunityRoles);
    _this = _callSuper(this, CommunityRoles, [props]);
    _this.state = {
      account: '',
      role: 'member',
      title: '',
      updateRoleModal: false,
      addUserToCommunityModal: false,
      updatedRole: ''
    };
    _this.onAccountChange = _this.onAccountChange.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onRoleChange = _this.onRoleChange.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onSubmit = _this.onSubmit.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onEditUserRoleSelect = _this.onEditUserRoleSelect.bind((0, _assertThisInitialized2["default"])(_this));
    _this.toggleUpdateRoleModal = _this.toggleUpdateRoleModal.bind((0, _assertThisInitialized2["default"])(_this));
    _this.toggleAddUserToCommunityModal = _this.toggleAddUserToCommunityModal.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }
  (0, _createClass2["default"])(CommunityRoles, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log('check');
      this.props.getCommunityRoles(this.props.community);
    }
  }, {
    key: "toggleUpdateRoleModal",
    value: function toggleUpdateRoleModal(showModal) {
      this.setState({
        updateRoleModal: showModal
      });
    }
  }, {
    key: "toggleAddUserToCommunityModal",
    value: function toggleAddUserToCommunityModal(showModal) {
      this.setState({
        addUserToCommunityModal: showModal
      });
    }
  }, {
    key: "onEditUserRoleSelect",
    value: function onEditUserRoleSelect(name, role, title) {
      this.setState({
        account: name,
        role: role,
        title: title
      });
    }
  }, {
    key: "onAccountChange",
    value: function onAccountChange(event) {
      this.setState({
        account: event.target.value
      });
    }
  }, {
    key: "onRoleChange",
    value: function onRoleChange(event) {
      this.setState({
        role: event.target.value
      });
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(event) {
      event.preventDefault();
      var params = {
        community: this.props.community,
        account: this.state.account,
        role: this.state.role
      };
      this.props.updateUser(params);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        community = _this$props.community,
        loading = _this$props.loading,
        updating = _this$props.updating,
        roles = _this$props.roles,
        communityMetadata = _this$props.communityMetadata;
      var canEdit = {
        owner: ['admin', 'mod', 'member', 'guest', 'muted'],
        admin: ['mod', 'member', 'guest', 'muted'],
        mod: ['member', 'guest', 'muted'],
        member: ['guest', 'muted'],
        guest: ['muted']
      };
      var availableRoles = [];
      if (communityMetadata && communityMetadata.context && Object.keys(communityMetadata.context).length > 0) {
        availableRoles = canEdit[communityMetadata.context.role];
      }
      var tableRows = roles.toJS().map(function (tuple, index) {
        var name = tuple[0];
        var title = tuple[2];
        var role = tuple[1];
        if (availableRoles && availableRoles.includes(tuple[1])) {
          role = /*#__PURE__*/_react["default"].createElement("a", {
            role: "link",
            tabIndex: 0,
            className: "community-user--role",
            "aria-labelledby": "Community User Role",
            onClick: function onClick(e) {
              e.preventDefault();
              _this2.onEditUserRoleSelect(name, tuple[1], title);
              _this2.toggleUpdateRoleModal(true);
            }
          }, tuple[1]);
        }
        return /*#__PURE__*/_react["default"].createElement("tr", {
          key: name
        }, /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
          to: "/@".concat(name)
        }, "@", name)), /*#__PURE__*/_react["default"].createElement("td", null, role), /*#__PURE__*/_react["default"].createElement("td", null, title));
      });
      var table = /*#__PURE__*/_react["default"].createElement("table", null, /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("th", null, "Account"), /*#__PURE__*/_react["default"].createElement("th", null, "Role"), /*#__PURE__*/_react["default"].createElement("th", null, "Title"))), /*#__PURE__*/_react["default"].createElement("tbody", null, tableRows));
      var editUserModal = /*#__PURE__*/_react["default"].createElement(_Reveal["default"], {
        onHide: function onHide() {
          return null;
        },
        show: true
      }, /*#__PURE__*/_react["default"].createElement(_CloseButton["default"], {
        onClick: function onClick() {
          return _this2.toggleUpdateRoleModal(false);
        }
      }), /*#__PURE__*/_react["default"].createElement(_UserRole["default"], {
        title: this.state.title,
        username: this.state.account,
        community: this.props.community,
        role: this.state.role,
        onSubmit: function onSubmit(newRole) {
          var params = {
            community: _this2.props.community,
            account: _this2.state.account,
            role: newRole
          };
          _this2.props.updateUser(params);
          _this2.toggleUpdateRoleModal(false);
        },
        availableRoles: availableRoles,
        addUser: false
      }));
      var addUserModal = /*#__PURE__*/_react["default"].createElement(_Reveal["default"], {
        onHide: function onHide() {
          return null;
        },
        show: true
      }, /*#__PURE__*/_react["default"].createElement(_CloseButton["default"], {
        onClick: function onClick() {
          return _this2.toggleAddUserToCommunityModal(false);
        }
      }), /*#__PURE__*/_react["default"].createElement(_UserRole["default"], {
        title: this.state.title,
        username: this.state.account,
        community: this.props.community,
        role: this.state.role,
        onSubmit: function onSubmit(newUsername, newUserRole) {
          var params = {
            community: _this2.props.community,
            account: newUsername,
            role: newUserRole
          };
          _this2.props.updateUser(params);
          _this2.toggleAddUserToCommunityModal(false);
        },
        availableRoles: availableRoles,
        addUser: true
      }));
      var commName = communityMetadata && communityMetadata.title || null;
      var body;
      if (loading) {
        body = /*#__PURE__*/_react["default"].createElement("center", null, /*#__PURE__*/_react["default"].createElement(_LoadingIndicator["default"], {
          type: "circle"
        }));
      } else {
        body = /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h1", {
          className: "articles__h1"
        }, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
          to: "/trending/".concat(community)
        }, commName || community)), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", {
          className: "c-sidebar__module"
        }, /*#__PURE__*/_react["default"].createElement("h4", null, "User Roles"), updating && /*#__PURE__*/_react["default"].createElement("div", null, "Updating User..."), this.state.updateRoleModal && editUserModal, this.state.addUserToCommunityModal && addUserModal, /*#__PURE__*/_react["default"].createElement("div", null, table, /*#__PURE__*/_react["default"].createElement("button", {
          onClick: function onClick() {
            _this2.toggleAddUserToCommunityModal(true);
          },
          className: "button slim hollow secondary"
        }, "Add User"))));
      }
      return /*#__PURE__*/_react["default"].createElement(_PostsIndexLayout["default"], {
        blogmode: false,
        category: this.props.routeParams.category,
        order: this.props.routeParams.order,
        topic: this.props.params.category
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "CommunityRoles"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column large-9 medium-12 small-12"
      }, body))));
    }
  }]);
  return CommunityRoles;
}(_react["default"].Component);
var CommunityRolesWrapped = (0, _reactRedux.connect)(function (state, ownProps) {
  var community = ownProps.params.community;
  var tree = state.community.get(community, (0, _immutable.Map)());
  var roles = tree.get('roles', (0, _immutable.List)());
  var loading = roles.size == 0;
  var updating = tree.get('updatePending', false);
  var communityMetadata = state.global.getIn(['community', community]);
  return {
    community: community,
    roles: roles,
    loading: loading,
    updating: updating,
    communityMetadata: communityMetadata && communityMetadata.toJS()
  };
}, function (dispatch) {
  return {
    getCommunityRoles: function getCommunityRoles(community) {
      dispatch(communityActions.getCommunityRoles(community));
    },
    updateUser: function updateUser(params) {
      dispatch(communityActions.updateUserRole(params));
    }
  };
})(CommunityRoles);
module.exports = {
  path: 'roles(/:community)',
  component: CommunityRolesWrapped
};