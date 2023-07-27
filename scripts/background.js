import "../handlers/summaryHandler.js";
import "../handlers/simplificationHandler.js";
import "../handlers/translationHandler.js";
import "../handlers/customizationHandler.js";

const DEFAULT_SETTINGS = {
  "main-toggle": {
    "toggle": false,
  },
  "translate": {
    "toggle": false,
    "language": "Simplified Chinese",
    "color": "grey",
    "style": "none",
    "service": "openai"
  },
  "customize": {
    "toggle": false,
    "font-family": "Default",
    "font-size": 1.25,
    "bionic-reading": false
  },
  "simple": {
    "toggle": false,
    "age": 6
  },
  "summary": {
    "toggle": false,
    "short_length": 100,
    "long_length": 300
  }
}



chrome.runtime.onInstalled.addListener(function () {
  console.log('TranslatePage Extension installed.');
  const defaultSettings = DEFAULT_SETTINGS;
  chrome.storage.sync.set({ settings: defaultSettings }); // initialize settings
});


chrome.runtime.onStartup.addListener(() => {
  console.log('Extension started.');
  chrome.storage.sync.get(['settings'], (result) => {
    if (!result.settings) {
      const defaultSettings = DEFAULT_SETTINGS;
      chrome.storage.sync.set({ settings: defaultSettings }); // initialize settings
    }
  });
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  const newValue = changes['settings'].newValue;
  const oldValue = changes['settings'].oldValue;

  // if translate or customize is turned off and either select is changed, don't reload page
  if (
    (!newValue['customize']['toggle'] && newValue['customize']['font-family'] !== oldValue['customize']['font-family']) ||
    (!newValue['translate']['toggle'] && newValue['translate']['language'] !== oldValue['translate']['language']) ||
    (!newValue['main-toggle'])
    ) {
      return;
    }
  chrome.tabs.reload();
});


