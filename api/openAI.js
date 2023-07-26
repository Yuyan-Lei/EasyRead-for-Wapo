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
  const apiKey = "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";
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
  console.log("getSimplifyRequest()");
  // extract the article body
  const articleBodies = document.querySelectorAll(
    'p[data-testid="drop-cap-letter"]'
  );
  // let articleSplits = [];
  // let text = "";
  // for (let i = 0; i < articleBodies.length; i++) {
  //   text += articleBodies[i].textContent + "\n";
  //   if (text.length > 12000) {
  //     articleSplits.push(text);
  //     text = "";
  //   }
  // }
  // articleSplits.push(text);
  // console.log(articleSplits);
  console.log(articleBodies[0].innerHTML);
  let prompt = [
    {
      role: "user",
      content: `I will present a news article split into multiple messages with each message representing a paragraph. Please convert each paragraph into something a 5th grader would understand, having the outputted translation correspond to each numbered part. The output should have the same number of parts as the original messages. Include the part number in your output. Part 1: ${articleBodies[0].innerText}`,
    },
  ];
  for (let i = 1; i < articleBodies.length; i++)
    prompt.push({
      role: "user",
      content: `Part ${i + 1}: ${articleBodies[i].innerHTML}`,
    });
  console.log(prompt);
  const requestData = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a language model. Simplify the following news article for a younger audience.",
      },
    ],
    temperature: 0,
  };
  requestData.messages = requestData.messages.concat(prompt);
  console.log(requestData);
  const apiKey = "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";
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

export async function getTranslateRequest(language) {
  // extract the article body
  const articleBodies = document.querySelectorAll(
    'p[data-testid="drop-cap-letter"]'
  );
  let articleSplits = [];
  let text = "";
  for (let i = 0; i < articleBodies.length; i++) {
    text += articleBodies[i].textContent;
    if (text.length > 12000) {
      articleSplits.push(text);
      text = "";
    }
  }

  let prompt;
  if (articleSplits.length > 1) {
    prompt = [
      {
        role: "user",
        content: `I will now present a news article split into multiple messages. Please translate the article into ${language}. Part 1: ${articleSplits[0]}`,
      },
    ];
    for (let i = 1; i < articleSplits.length; i++)
      prompt.push({
        role: "user",
        content: `Part ${i + 1}: ${articleSplits[i]}`,
      });
  } else {
    prompt = [
      {
        role: "user",
        content: `Please translate the article into ${language}: ${articleSplits[0]}`,
      },
    ];
  }
  const requestData = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a professional translator and linguist.",
      },
      prompt,
    ],
    temperature: 1,
  };

  const apiKey = "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";
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
