chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request === "getFontList") {
      chrome.fontSettings.getFontList(fonts => sendResponse(fonts));
      return true;
    } else {
      console.log(request);
    }
    
  });