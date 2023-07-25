export function simplifyArticleBody() {
    console.log('simplifyArticleBody() called');
  
    const articleBodies = document.getElementsByClassName('article-body');
    const articleCount = articleBodies.length;
  
    for (let i = 0; i < articleCount; i++) {
      const paragraphs = articleBodies[i].getElementsByTagName('p');
      const paragraphCount = paragraphs.length;
      for (let j = 0; j < paragraphCount; j++) {
        // get the original text 
        let paragraphText = paragraphs[j].innerText;
  
        // generate the new text
        newText = "This is the sample text. This is the sample text. This is the sample text. This is the sample text. This is the sample text. This is the sample text.";
  
        // substitute the new text for the old text
        paragraphs[j].innerText = newText;  
      }
    }
  }