chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("fake received")
    console.log(message);
    console.log(sender);
        // setTimeout(() => sendResponse({ text: 'HELLO WORLD' }), 0)
      sendResponse({ text: 'HELLO WORLD' })
  });