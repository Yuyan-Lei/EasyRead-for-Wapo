import { OPEN_AI_KEY } from "../apiKey.js";
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "getSummary") {
        getSummaryRequest(message.length, message.articleText).then((result) => {
            sendResponse({ result: result });
        });
        return true;
    }
});

async function sendRequest(requestData) {
    const apiKey = OPEN_AI_KEY;
    const data = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestData),
    }).then((response) => response.json());
    return data.choices[0].message.content;
}
  
async function getSummaryRequest(length, articleText) {
    const requestData = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a news article summary generator" },
        {
          role: "user",
          content: `In ${length} words, accurately summarize this article: ${articleText}`,
        },
      ],
      temperature: 1,
    };
  
    return sendRequest(requestData);
}