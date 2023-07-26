import {getSummaryRequest} from '../api/openAI.js';

chrome.runtime.onInstalled.addListener(function() {
  console.log('TranslatePage Extension installed.');
});



chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
  if (message.action === "getSummary") {
    const result = await getSummaryRequest(100);
    sendResponse(result);
  }
});
  