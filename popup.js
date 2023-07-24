document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('translateButton').addEventListener('click', function () {
    let targetLanguage = document.getElementById('targetLanguage').value;
    console.log(`targetLanguage: ${targetLanguage}`);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log(tabs);
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: translateArticleBody,
        args: [targetLanguage]
      })
        .then(() => console.log("injected a function"));
    });
  });
});

function translateArticleBody(targetLanguage) {
  console.log('translateArticleBody() called');
  console.log('targetLanguage: ' + targetLanguage);

  const articleBodies = document.getElementsByClassName('article-body');
  const articleCount = articleBodies.length;

  for (let i = 0; i < articleCount; i++) {
    const paragraphs = articleBodies[i].getElementsByTagName('p');
    const paragraphCount = paragraphs.length;
    for (let j = 0; j < paragraphCount; j++) {
      // get the paragraph text 
      let paragraphText = paragraphs[j].innerText;

      // translate the paragraph
      translation = "This is the sample text. This is the sample text. This is the sample text. This is the sample text. This is the sample text. This is the sample text.";

      // create a styled div to hold the translation
      let translationParagraph = document.createElement('p');
      translationParagraph.style.fontStyle = 'italic';
      translationParagraph.style.fontSize = '16px';
      translationParagraph.style.color = 'gray';
      translationParagraph.style.paddingBottom = '20px';
      translationParagraph.innerHTML = translation;

      // insert the translation after the original paragraph
      paragraphs[j].parentNode.insertBefore(translationParagraph, paragraphs[j].nextSibling);
    }
  }
}