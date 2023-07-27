import "../handlers/summaryHandler.js";
import "../handlers/simplificationHandler.js";
import "../handlers/translationHandler.js";

chrome.runtime.onInstalled.addListener(function () {
  console.log('TranslatePage Extension installed.');
  const defaultSettings = {
    "main-toggle": {
      "toggle": false,
    },
    "translate": {
      "toggle": false,
      "language": "cn",
      "color": "grey",
      "style": "none"
    },
    "customize": {
      "toggle": false,
      "font": "Arial"
    },
    "simple": {
      "toggle": false,
      "age": 1
    },
    "summary": {
      "toggle": false,
      "short_length": 100,
      "long_length": 200
    }
  }
  chrome.storage.sync.set({ settings: defaultSettings }); // initialize settings
});


chrome.runtime.onStartup.addListener(() => {
  console.log('Extension started.');
  chrome.storage.sync.get(['settings'], (result) => {
    if (!result.settings) {
      const defaultSettings = {
        "main-toggle": {
          "toggle": false,
        },
        "translate": {
          "toggle": false,
          "language": "cn",
          "color": "grey",
          "style": "none"
        },
        "customize": {
          "toggle": false,
          "font": "Arial"
        },
        "simple": {
          "toggle": false,
          "age": 1
        },
        "summary": {
          "toggle": false,
          "short_length": 100,
          "long_length": 200
        }
      }
      chrome.storage.sync.set({ settings: defaultSettings }); // initialize settings
    }
  });

});
