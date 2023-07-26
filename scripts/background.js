import '../handlers/fakeHandler.js';

chrome.runtime.onInstalled.addListener(function() {
    console.log('TranslatePage Extension installed.');
  });
  
  // chrome.storage.onChanged.addListener(function(changes, namespace) {
  //   console.log(changes);
  //   console.log(namespace);
  // });

  // chrome.runtime.onStartup.addListener(function() {
  //   console.log("started");
  // });

  