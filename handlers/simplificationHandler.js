import { OPEN_AI_KEY } from "../apiKey.js";
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log("Listener called --  simple");
    if (message.action === "getSimplerVersion") {
        getSimpleRequest(message.level, message.originalText).then((result) => {
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
  
async function getSimpleRequest(level, originalText) {
    console.log(originalText);
    console.log("run API now -- simple");
    const requestData = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are trying to make each news article in a simpler version" },
        {
          role: "user",
          content: `Make this paragraph simple and readable enough for ${level}-year old child.
          Do not respond anything else than the revised paragraph.
          Try to avoid long sentences and complex words.
          Original paragraph:
          ${originalText}`,
        },
      ],
      temperature: 1,
    };
  
    return sendRequest(requestData);
}