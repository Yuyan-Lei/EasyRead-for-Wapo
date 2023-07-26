export function simplifyArticleBody(generatedText) {
  console.log("simplifyArticleBody() called");

  const articleBodies = document.querySelectorAll(
    'p[data-testid="drop-cap-letter"]'
  );
  const articleCount = articleBodies.length;
  const generatedTextArray = generatedText.split("/\r?\n/");
  console.log(generatedText, generatedTextArray);
  console.log(generatedTextArray.length, articleBodies.length);

  for (let i = 0; i < articleCount; i++) {
    const originalText = articleBodies[i].innerText;

    // generate the new text
    newText = generatedTextArray[i];

    // substitute the new text for the old text
    articleBodies[i].innerText = newText;
  }
}
