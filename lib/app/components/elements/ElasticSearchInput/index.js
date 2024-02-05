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
var _counterpart = _interopRequireDefault(require("counterpart"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var ElasticSearchInput = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(ElasticSearchInput, _React$Component);
  function ElasticSearchInput(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, ElasticSearchInput);
    _this = _callSuper(this, ElasticSearchInput, [props]);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onSearchSubmit", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var handleSubmit = _this.props.handleSubmit;
      var _this$state = _this.state,
        searchQuery = _this$state.value,
        sortOrder = _this$state.sortOrder;
      handleSubmit && handleSubmit(searchQuery);
      // if (process.env.BROWSER) {
      //     const history = window.localStorage.getItem('blurt_search');
      //     if (searchQuery.trim() === '') return;
      //     if (!history) {
      //         window.localStorage.setItem('blurt_search', this.state.value);
      //     } else {
      //         let historyArr = history.split(',');
      //         if (historyArr.includes(this.state.value)) {
      //             historyArr.splice(historyArr.indexOf(this.state.value), 1);
      //             historyArr.unshift(this.state.value);
      //             window.localStorage.setItem(
      //                 'blurt_search',
      //                 historyArr.join(',')
      //             );
      //         } else {
      //             window.localStorage.setItem(
      //                 'blurt_search',
      //                 `${this.state.value},${history}`
      //             );
      //         }
      //     }
      // }
    });
    _this.state = {
      value: _this.props.initValue ? _this.props.initValue : ''
    };
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onSearchSubmit = _this.onSearchSubmit.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setSearchText = _this.setSearchText.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }
  (0, _createClass2["default"])(ElasticSearchInput, [{
    key: "handleChange",
    value: function handleChange(event) {
      this.setSearchText(event.target.value);
    }
  }, {
    key: "setSearchText",
    value: function setSearchText(value) {
      this.setState({
        value: value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var formClass = this.props.expanded ? 'search-input--expanded' : 'search-input';
      return /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("form", {
        className: formClass,
        onSubmit: function onSubmit(e) {
          _this2.onSearchSubmit(e);
        }
      }, /*#__PURE__*/_react["default"].createElement("svg", {
        className: "search-input__icon",
        width: "42",
        height: "42",
        viewBox: "0 0 32 32",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        onClick: function onClick(e) {
          _this2.onSearchSubmit(e);
        }
      }, /*#__PURE__*/_react["default"].createElement("g", null, /*#__PURE__*/_react["default"].createElement("path", {
        className: "search-input__path",
        d: "M14.3681591,18.5706017 L11.3928571,21.6 L14.3681591,18.5706017 C13.273867,17.6916019 12.5714286,16.3293241 12.5714286,14.8 C12.5714286,12.1490332 14.6820862,10 17.2857143,10 C19.8893424,10 22,12.1490332 22,14.8 C22,17.4509668 19.8893424,19.6 17.2857143,19.6 C16.1841009,19.6 15.1707389,19.215281 14.3681591,18.5706017 Z",
        id: "icon-svg"
      }))), /*#__PURE__*/_react["default"].createElement("input", {
        name: "q",
        className: "search-input__inner",
        type: "search",
        placeholder: (0, _counterpart["default"])('g.search'),
        onChange: this.handleChange,
        value: this.state.value,
        autoComplete: "off"
      })));
    }
  }]);
  return ElasticSearchInput;
}(_react["default"].Component);
(0, _defineProperty2["default"])(ElasticSearchInput, "propTypes", {
  handleSubmit: _propTypes["default"].func,
  expanded: _propTypes["default"].bool,
  initValue: _propTypes["default"].string
});
(0, _defineProperty2["default"])(ElasticSearchInput, "defaultProps", {
  handleSubmit: null,
  expanded: true,
  initValue: ''
});
var _default = exports["default"] = ElasticSearchInput;