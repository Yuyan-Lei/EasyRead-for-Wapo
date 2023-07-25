// import { getSummaryRequest } from "../api/openAI.js";
async function getApiKey() {
  const response = await fetch("../env/apiKey.json");
  const apiKey = await response.json();
  return apiKey.openAIApiKey;
}

async function sendRequest(requestData) {
  const apiKey = await getApiKey();
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestData),
  });
  const data = await response.json();
  console.log(data);
  return data.choices[0].message.content;
}

export async function getSummaryRequest(text, length) {
  console.log("hello");
  console.log(text, length);
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
  return await sendRequest(requestData);
}

export async function generateSummary() {
  console.log("summaryHandler() called");

  chrome.runtime.sendMessage(
    { action: "generateSummary" },
    async (response) => {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
        return;
      }

      if (response) {
        console.log(response);
        let text = await getSummaryRequest(
          "The Russian president had been warned by the Russian security services at least two or three days ahead of time that Prigozhin was preparing a possible rebellion, according to intelligence assessments shared with The Washington Post. Steps were taken to boost security at several strategic facilities, including the Kremlin, where staffing in the presidential guard was increased and more weapons were handed out, but otherwise no actions were taken, these officials said.",
          100
        );
        console.log(text);
        // extract the article body
        const articleBodies = document.querySelectorAll(
          'p[data-testid="drop-cap-letter"]'
        );
        console.log(articleBodies);
        // get summary from API

        // console.log(text);

        // Generate a summary
        const summaryDiv = document.createElement("div");
        summaryDiv.id = "short-summary-section";
        summaryDiv.innerText = text || "summary summary summary";

        // insert a summary section before the article body
        const articleDiv = document.querySelector(".grid-body");
        articleDiv.parentNode.insertBefore(summaryDiv, articleDiv);
      } else {
        console.log("No response from background");
      }
    }
  );
}

export function removeSummarySection() {
  const shortSummarySection = document.getElementById("short-summary-section");
  const mediumSummarySection = document.getElementById(
    "medium-summary-section"
  );
  if (shortSummarySection) {
    shortSummarySection.remove();
  }
  if (mediumSummarySection) {
    mediumSummarySection.remove();
  }
}

// await generateSummary();
