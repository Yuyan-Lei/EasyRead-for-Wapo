export async function sendRequest(requestData) {
  const apiKey = "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"; // ADD YOUR API KEY HERE
  const data = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestData),
  }).then((response) => response.json());
  console.log(data.choices[0].message.content);
  return data.choices[0].message.content;
}

export async function getSummaryRequest(length) {
  // extract the article body
  const articleBodies = document.querySelectorAll(
    'p[data-testid="drop-cap-letter"]'
  );

  let text = "";
  for (let i = 0; i < articleBodies.length; i++) {
    if (text.length < 12000) text += articleBodies[i].textContent;
  }
  console.log(text.length);
  console.log("run getSummaryRequest() now");
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

export async function getSimplifyRequest() {
  // extract the article body
  const articleBodies = document.querySelectorAll(
    'p[data-testid="drop-cap-letter"]'
  );

  let text = "";
  for (let i = 0; i < articleBodies.length; i++) {
    if (text.length < 12000) text += articleBodies[i].textContent;
  }

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
}
