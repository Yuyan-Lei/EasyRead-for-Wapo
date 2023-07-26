export function translateArticleBody(targetLanguage, color, style) {
  const style = 'none';
  const color = 'grey';

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
      translationParagraph.innerHTML = translation;
      translationParagraph.id = 'translation-section';

      // Display style options:
      switch (style) {
        case 'none':
          break;
        case 'italic':
          translationParagraph.style.fontStyle = 'italic';          
          break;
        case 'bold':
          translationParagraph.style.fontWeight = 'bold';          
          break;
        case 'underlined':
          translationParagraph.style.textDecorationLine = 'underline'; 
          translationParagraph.style.textDecorationColor = '#018abe';          
          break;
        case 'dashed-underlined':
          translationParagraph.style.textDecorationLine = 'underline';          
          translationParagraph.style.textDecorationColor = '#018abe'; 
          translationParagraph.style.textDecorationStyle = 'dashed';          
          break;
        case 'highlighted':
          translationParagraph.style.backgroundColor = 'yellow';         
          break;
        default:
          break;
      }

      // Display color options:
      switch (color) {
        case 'none':      
          break;
        case 'grey':
          translationParagraph.style.color = 'grey';        
          break;
        case 'blue':
          translationParagraph.style.color = '#018abe';        
          break;
        case 'orange':
          translationParagraph.style.color = 'orange';        
          break;
        case 'red':
          translationParagraph.style.color = 'red';        
          break;
        case 'green':
          translationParagraph.style.color = 'green';        
          break;
        default:
          break;
      }

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