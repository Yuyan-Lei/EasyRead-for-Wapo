import "../handlers/summaryHandler.js";

chrome.runtime.onInstalled.addListener(function() {
  console.log('TranslatePage Extension installed.');
});