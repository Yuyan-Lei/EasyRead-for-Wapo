chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request === "getFontList") {
      console.log("font handler called");
      chrome.fontSettings.getFontList(fonts => sendResponse(fonts));
      return true;
    } else {
      console.log(request);
    }
    
  });