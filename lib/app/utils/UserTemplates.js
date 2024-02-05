"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveUserTemplates = exports.loadUserTemplates = void 0;
var loadUserTemplates = exports.loadUserTemplates = function loadUserTemplates(username) {
  var templateEntryName = 'blurtPostTemplates-' + username;
  var userTemplates = localStorage.getItem(templateEntryName);
  if (userTemplates) {
    userTemplates = JSON.parse(userTemplates);
  } else {
    userTemplates = [];
  }
  return userTemplates;
};
var saveUserTemplates = exports.saveUserTemplates = function saveUserTemplates(username, templates) {
  var templateEntryName = 'blurtPostTemplates-' + username;
  localStorage.setItem(templateEntryName, JSON.stringify(templates));
};