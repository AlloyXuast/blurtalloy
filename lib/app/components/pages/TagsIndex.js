"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
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
var _blurtjs = require("@blurtfoundation/blurtjs");
var _immutable = require("immutable");
var _reactRouter = require("react-router");
var _StateFunctions = require("app/utils/StateFunctions");
var _counterpart = _interopRequireDefault(require("counterpart"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var TagsIndex = exports["default"] = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(TagsIndex, _React$Component);
  function TagsIndex(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, TagsIndex);
    _this = _callSuper(this, TagsIndex, [props]);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onChangeSort", function (e, order) {
      e.preventDefault();
      _this.setState({
        order: order
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "compareTags", function (a, b, type) {
      switch (type) {
        case 'name':
          return a.get('name').localeCompare(b.get('name'));
        case 'posts':
          return parseInt(a.get('top_posts')) <= parseInt(b.get('top_posts')) ? 1 : -1;
        case 'comments':
          return parseInt(a.get('comments')) <= parseInt(b.get('comments')) ? 1 : -1;
        case 'payouts':
          return parseInt(a.get('total_payouts')) <= parseInt(b.get('total_payouts')) ? 1 : -1;
      }
    });
    _this.state = {
      order: props.order || 'name',
      tags: []
    };
    _this.onChangeSort = _this.onChangeSort.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }
  (0, _createClass2["default"])(TagsIndex, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var res = this.state !== nextState;
      return res;
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var res;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _blurtjs.api.callAsync('condenser_api.get_trending_tags', [null, 100]);
            case 3:
              res = _context.sent;
              this.setState({
                tags: (0, _immutable.fromJS)(res)
              });
              _context.next = 10;
              break;
            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              console.error('Error fetching trending tags', _context.t0.message);
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 7]]);
      }));
      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }
      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$state = this.state,
        order = _this$state.order,
        tags = _this$state.tags;
      if (!tags || tags.length === 0) {
        return null;
      }
      var rows = tags.filter(
      // there is a blank tag present, as well as some starting with #. filter them out.
      function (tag) {
        return /^[a-z]/.test(tag.get('name'));
      }).sort(function (a, b) {
        return _this2.compareTags(a, b, order);
      }).map(function (tag) {
        var name = tag.get('name');
        var link = "/trending/".concat(name);
        return /*#__PURE__*/_react["default"].createElement("tr", {
          key: name
        }, /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
          to: link,
          activeClassName: "active"
        }, name)), /*#__PURE__*/_react["default"].createElement("td", null, (0, _StateFunctions.numberWithCommas)(tag.get('top_posts').toString())), /*#__PURE__*/_react["default"].createElement("td", null, (0, _StateFunctions.numberWithCommas)(tag.get('comments').toString())), /*#__PURE__*/_react["default"].createElement("td", null, (0, _StateFunctions.numberWithCommas)(tag.get('total_payouts'))));
      }).toArray();
      var cols = [['name', (0, _counterpart["default"])('g.tag')], ['posts', (0, _counterpart["default"])('g.posts')], ['comments', (0, _counterpart["default"])('g.comments')], ['payouts', (0, _counterpart["default"])('g.payouts')]].map(function (col) {
        return /*#__PURE__*/_react["default"].createElement("th", {
          key: col[0]
        }, order === col[0] ? /*#__PURE__*/_react["default"].createElement("strong", null, col[1]) : /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
          to: "#",
          onClick: function onClick(e) {
            return _this2.onChangeSort(e, col[0]);
          }
        }, col[1]));
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "TagsIndex row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "column"
      }, /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("h4", null, (0, _counterpart["default"])('g.trending_topics')), /*#__PURE__*/_react["default"].createElement("table", null, /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement("tr", null, cols)), /*#__PURE__*/_react["default"].createElement("tbody", null, rows))));
    }
  }]);
  return TagsIndex;
}(_react["default"].Component);
module.exports = {
  path: 'tags(/:order)',
  component: TagsIndex
};