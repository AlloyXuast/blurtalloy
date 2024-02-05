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
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _DropdownMenu = _interopRequireDefault(require("app/components/elements/DropdownMenu"));
var _reactRouter = require("react-router");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function userLink(name) {
  return /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
    className: "username",
    key: name,
    to: '/@' + name
  }, name);
}
var UserNames = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(UserNames, _Component);
  function UserNames() {
    (0, _classCallCheck2["default"])(this, UserNames);
    return _callSuper(this, UserNames, arguments);
  }
  (0, _createClass2["default"])(UserNames, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        names = _this$props.names,
        size = _this$props.size;
      if (!names) {
        return null;
      }

      // `size` is max number of names to list before "and <x>"
      if (size >= names.length) {
        // enforce bounds
        size = names.length - 1;
      }

      // if size == 0, there is no "and" in the output
      var and_names = size == 0 ? [] : names.splice(size);
      var out = [];

      // build first portion of output: "name1, name2, name3"
      for (var i = 0; i < names.length; i++) {
        if (i > 0) out.push( /*#__PURE__*/_react["default"].createElement("span", {
          key: '_comma' + i
        }, ", "));
        out.push(userLink(names[i]));
      }

      // build suffix: " and name4" or " and 3 others" (dropdown if and_names > 1)
      if (and_names.length > 0) {
        out.push( /*#__PURE__*/_react["default"].createElement("span", {
          key: "_and"
        }, " and "));
        if (and_names.length == 1) {
          // and <name>
          out.push(userLink(and_names[0]));
        } else {
          // and <x> others...
          out.push( /*#__PURE__*/_react["default"].createElement(_DropdownMenu["default"], {
            key: "_others",
            selected: and_names.length + ' others',
            items: and_names.map(function (name) {
              return {
                value: name,
                link: '/@' + name
              };
            }),
            el: "div"
          }));
        }
      }
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: "UserNames"
      }, out);
    }
  }]);
  return UserNames;
}(_react.Component);
(0, _defineProperty2["default"])(UserNames, "propTypes", {
  names: _propTypes["default"].array,
  size: _propTypes["default"].number
});
(0, _defineProperty2["default"])(UserNames, "defaultProps", {
  size: 2
});
var _default = exports["default"] = (0, _reactRedux.connect)(function (state, ownProps) {
  return ownProps;
})(UserNames);