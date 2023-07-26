// export function generateSummary(generatedText) {
//   console.log(generatedText);
//   // get summary from API
//   const shortSummaryText = generatedText;
//   const longSummaryText = `This is a long summary.
//         This is a long summary.
//         This is a long summary.
//         This is a long summary.
//         This is a long summary.
//         This is a long summary.`;
//   const shortSectionNode = document.getElementById("short-summary-section");
//   shortSectionNode.innerText = shortSummaryText;
//   const longSectionNode = document.getElementById("long-summary-section");
//   longSectionNode.innerText = longSummaryText;
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
