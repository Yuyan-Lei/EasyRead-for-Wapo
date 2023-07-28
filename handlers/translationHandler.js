import { OPEN_AI_KEY, GOOGLE_API_KEY } from "../apiKey.js";

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log("Listener called --  translation");
    if (message.action === "getTranslation") {
      if (message.service === "openai") {
        getTranslationRequest(message.targetLanguage, message.text).then((result) => {
            sendResponse({ result: result });
        });
        return true;
    } else if (message.service === "googleTranslate") {
        getGoogleTranslate(message.targetLanguage, message.text).then((result) => {
          sendResponse({ result: result });
        });
        return true;
    }
  } 
});

async function getGoogleTranslate(targetLanguage, originalText) {
  console.log(targetLanguage);
  const data = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`, {
    method: "POST",
    body: JSON.stringify({
      q: originalText,
      target: targetLanguage,
    }),
  }).then((response) => response.json());
  console.log(data);
  const translatedText = data.data.translations[0].translatedText;
  return translatedText;
}

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
  
async function getTranslationRequest(targetLanguage, originalText) {
    console.log(originalText);
    console.log("run API now -- translation");
    const requestData = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: `You are a translation assistant. I will send a English text each time, and you need to respond me the translated text in ${targetLanguage}. Do not add any extra punctuations if there is no such punctuation in the original text. Do not respond any thing else than translated text.` },
        {
          role: "user",
          content: `${originalText}`,
        },
      ],
      temperature: 1,
    };
  
    return sendRequest(requestData);
}