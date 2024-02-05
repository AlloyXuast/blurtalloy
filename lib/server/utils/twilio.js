"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = verify;
var _twilio = _interopRequireDefault(require("twilio"));
var _config = _interopRequireDefault(require("config"));
var accountSid = _config["default"].get('twilio.account_sid');
var authToken = _config["default"].get('twilio.auth_token');
var client;
function checkEligibility(phone) {
  // US, Canada +1
  // France +33
  // Spain +34
  // Italy +39
  // UK +44
  // Sweden +46
  // Germany +49
  // Mexico +52
  // Australia +61
  // Phillipines +63
  // Singapore +65
  // Turkey +90
  // Hong Kong +852
  // Israel +972

  for (var _i = 0, _arr = ['1', '33', '34', '39', '44', '46', '49', '52', '61', '63', '65', '90', '852', '972']; _i < _arr.length; _i++) {
    var prefix = _arr[_i];
    if (phone.startsWith(prefix)) return true;
  }
  return false;
}
function verify(phone) {
  if (!client) client = new _twilio["default"].LookupsClient(accountSid, authToken);
  return new Promise(function (resolve) {
    if (!checkEligibility(phone)) {
      resolve('na');
      return;
    }
    client.phoneNumbers(phone).get({
      type: 'carrier',
      addOns: 'whitepages_pro_phone_rep'
    }, function (error, result) {
      if (error) {
        if (error.code === 20404) {
          console.log('Twilio phone not found ', phone);
          resolve('block');
        } else {
          console.error('Twilio error', JSON.stringify(error, null, 2));
          resolve('error');
        }
      } else {
        if (result.addOns && result.addOns.results && result.addOns.results.whitepages_pro_phone_rep && result.addOns.results.whitepages_pro_phone_rep.result && result.addOns.results.whitepages_pro_phone_rep.result.results && result.addOns.results.whitepages_pro_phone_rep.result.results[0] && result.addOns.results.whitepages_pro_phone_rep.result.results[0].reputation && result.addOns.results.whitepages_pro_phone_rep.result.results[0].reputation.level) {
          var reputation_level = result.addOns.results.whitepages_pro_phone_rep.result.results[0].reputation.level;
          console.log('Twilio reputation level ', phone, reputation_level);
          resolve(reputation_level < 3 ? 'pass' : 'block');
        } else {
          console.error('Twilio result does not contain reputation level:', JSON.stringify(result, null, 2));
          resolve('error');
        }
      }
    });
  });
}