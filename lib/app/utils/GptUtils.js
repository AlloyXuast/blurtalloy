"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GptUtils = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _DomUtils = require("./DomUtils");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var GptUtils = exports.GptUtils = /*#__PURE__*/function () {
  function GptUtils() {
    (0, _classCallCheck2["default"])(this, GptUtils);
  }
  (0, _createClass2["default"])(GptUtils, null, [{
    key: "ShowGptMobileSize",
    value:
    /**
     * Should we show the mobile version of an ad?
     *
     * @returns {boolean}
     */
    function ShowGptMobileSize() {
      return (0, _DomUtils.getViewportDimensions)().w <= 768;
    }

    /**
     * Naively append-mobile to a given string representing an ad slot name.
     *
     * @param {string} slotName
     * @returns {string}
     */
  }, {
    key: "MobilizeSlotName",
    value: function MobilizeSlotName(slotName) {
      var mobileSlotAddendum = '';
      if (this.ShowGptMobileSize()) mobileSlotAddendum = '-mobile';
      return "".concat(slotName).concat(mobileSlotAddendum);
    }

    /**
     * Takes an array of tags and determines whether one or more tags are banned from showing ads.
     *
     * @param {array[strings]} tags
     * @param {array[strings]} bannedTags
     * @returns {boolean}
     */
  }, {
    key: "HasBannedTags",
    value: function HasBannedTags() {
      var tags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var bannedTags = arguments.length > 1 ? arguments[1] : undefined;
      var _iterator = _createForOfIteratorHelper(tags),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var tag = _step.value;
          if (bannedTags.indexOf(tag) != -1) {
            return true;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return false;
    }
  }]);
  return GptUtils;
}();