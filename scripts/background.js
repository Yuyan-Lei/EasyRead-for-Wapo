chrome.runtime.onInstalled.addListener(function () {
  console.log("EasyRead Extension installed.");
});

async function generateSummary() {
  const text =
    "The Russian president had been warned by the Russian security services";
  const length = 100;
  try {
    const summary = await getSummaryRequest(text, length);
    return { summary };
  } catch (error) {
    console.error(error);
    return { error: "Error generating summary" };
  }
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "generateSummary") {
    generateSummary()
      .then((response) => sendResponse(response))
      .catch((error) => sendResponse({ error }));
    return true;
  }
});
