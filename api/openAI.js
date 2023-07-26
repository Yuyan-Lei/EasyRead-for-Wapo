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

export async function getSummaryRequest(text, length) {
  console.log("run getSummaryRequest() now");
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
  
  const apiKey = "API_KEY_GOES_HERE"; // ADD YOUR API KEY HERE
  console.log(apiKey);
  const data = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestData),
  })
  .then (response => response.json());
  console.log(data);
  return data.choices[0].message.content;
}