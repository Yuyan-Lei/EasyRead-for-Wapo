import "../handlers/summaryHandler.js";
import "../handlers/simplificationHandler.js";
import "../handlers/translationHandler.js";

chrome.runtime.onInstalled.addListener(function() {
  console.log('TranslatePage Extension installed.');
});