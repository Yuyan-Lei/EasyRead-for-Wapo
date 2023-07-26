// async function sendRequest(requestData) {
//   const apiKey = process.env.OPENAI_API_KEY;
//   console.log("run sendRequest() now");
//   console.log(apiKey);
//   const response = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${apiKey}`,
//     },
//     body: JSON.stringify(requestData),
//   });
//   const data = await response.json();
//   console.log(data);
//   return data.choices[0].message.content;
// }

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
  console.log(articleBodies, length);
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

  const apiKey = "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"; // ADD YOUR API KEY HERE
  const data = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestData),
  }).then((response) => response.json());
  console.log(data);
  return data.choices[0].message.content;
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
