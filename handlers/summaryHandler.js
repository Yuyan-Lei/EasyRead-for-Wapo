import { OPEN_AI_KEY } from "../apiKey.js";
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log("Listener called");
    console.log(message.articleBodies)
    if (message.action === "getSummary") {
        getSummaryRequest(message.length, message.articleBodies).then((result) => {
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
  
async function getSummaryRequest(length, articleBodies) {
    console.log(articleBodies);
    let text = "";
    for (let i = 0; i < articleBodies.length; i++) {
      if (text.length < 12000) text += articleBodies[i].innerText;
    }
    console.log("run API now");
    const requestData = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a news article summary generator" },
        {
          role: "user",
          content: `In ${length} words, accurately summarize this article: ${text}`,
        },
      ],
      temperature: 1,
    };
  
    return sendRequest(requestData);
}