export function translateArticleBody(targetLanguage) {
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
      // translationParagraph.style.fontStyle = 'italic';
      // translationParagraph.style.fontSize = '16px';
      translationParagraph.style.color = 'gray';
      translationParagraph.innerHTML = translation;
      translationParagraph.id = 'translation-section';

      // insert the translation after the original paragraph
      paragraphs[j].appendChild(translationParagraph);    
    }
  }
}

export function removeTranslation() {
  const translationParagraphs = document.querySelectorAll('#translation-section');
  translationParagraphs.forEach((paragraph) => {
    paragraph.remove();
  });
}