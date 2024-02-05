"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = sendEmail;
var _sendgrid = _interopRequireDefault(require("sendgrid"));
var _config = _interopRequireDefault(require("config"));
var sg = (0, _sendgrid["default"])(_config["default"].get('sendgrid.key'));
function sendEmail(template, to, params) {
  var from = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  if (process.env.NODE_ENV !== 'production') {
    console.log("mail: to <".concat(to, ">, from <").concat(from, ">, template ").concat(template, " (not sent due to not production env)"));
    return;
  }
  var tmpl_id = _config["default"].get('sendgrid.templates')[template];
  if (!tmpl_id) throw new Error("can't find template ".concat(template));
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      template_id: tmpl_id,
      personalizations: [{
        to: [{
          email: to
        }],
        substitutions: params
      }],
      from: {
        email: from || _config["default"].get('sendgrid.from')
      }
    }
  });
  sg.API(request).then(function (response) {
    console.log("sent '".concat(template, "' email to '").concat(to, "'"), response.statusCode);
  })["catch"](function (error) {
    console.error("failed to send '".concat(template, "' email to '").concat(to, "'"), error);
  });
}