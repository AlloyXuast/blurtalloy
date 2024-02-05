"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRouter = require("react-router");
var _Userpic = _interopRequireDefault(require("app/components/elements/Userpic"));
var _Follow = _interopRequireDefault(require("app/components/elements/Follow"));
// import Reputation from 'app/components/elements/Reputation';

var AuthorDropdown = function AuthorDropdown(props) {
  var author_link = /*#__PURE__*/_react["default"].createElement("span", {
    className: "author",
    itemProp: "author",
    itemScope: true,
    itemType: "http://schema.org/Person"
  }, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
    to: '/@' + props.author
  }, /*#__PURE__*/_react["default"].createElement("strong", null, props.author)), ' ');
  if (!(props.follow || props.mute) || props.username === props.author) {
    return author_link;
  } else {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "Author__container"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "Author__dropdown"
    }, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
      to: '/@' + props.author
    }, /*#__PURE__*/_react["default"].createElement(_Userpic["default"], {
      account: props.author
    })), /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
      to: '/@' + props.author,
      className: "Author__name"
    }, props.name), /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
      to: '/@' + props.author,
      className: "Author__username"
    }, "@", props.author), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_Follow["default"], {
      className: "float-right",
      follower: props.username,
      following: props.author,
      what: "blog",
      showFollow: props.follow,
      showMute: props.mute
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: "Author__bio"
    }, props.about)));
  }
};
var _default = exports["default"] = AuthorDropdown;
AuthorDropdown.propTypes = {};
AuthorDropdown.defaultProps = {};