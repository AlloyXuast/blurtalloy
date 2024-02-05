"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate_account_name = validate_account_name;
var _counterpart = _interopRequireDefault(require("counterpart"));
var _BadActorList = _interopRequireDefault(require("app/utils/BadActorList"));
function validate_account_name(value) {
  var i, label, len, length, ref;
  if (!value) {
    return (0, _counterpart["default"])('chainvalidation_js.account_name_should_not_be_empty');
  }
  length = value.length;
  if (length < 3) {
    return (0, _counterpart["default"])('chainvalidation_js.account_name_should_be_longer');
  }
  if (length > 16) {
    return (0, _counterpart["default"])('chainvalidation_js.account_name_should_be_shorter');
  }
  if (_BadActorList["default"].includes(value)) {
    return (0, _counterpart["default"])('chainvalidation_js.badactor');
  }
  ref = value.split('.');
  for (i = 0, len = ref.length; i < len; i++) {
    label = ref[i];
    if (!/^[a-z]/.test(label)) {
      return (0, _counterpart["default"])('chainvalidation_js.each_account_segment_should_start_with_a_letter');
    }
    if (!/^[a-z0-9-]*$/.test(label)) {
      return (0, _counterpart["default"])('chainvalidation_js.each_account_segment_should_have_only_letters_digits_or_dashes');
    }
    if (/--/.test(label)) {
      return (0, _counterpart["default"])('chainvalidation_js.each_account_segment_should_have_only_one_dash_in_a_row');
    }
    if (!/[a-z0-9]$/.test(label)) {
      return (0, _counterpart["default"])('chainvalidation_js.each_account_segment_should_end_with_a_letter_or_digit');
    }
    if (!(label.length >= 3)) {
      return (0, _counterpart["default"])('chainvalidation_js.each_account_segment_should_be_longer');
    }
  }
  return null;
}