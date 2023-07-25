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
