export function simplifyArticleBody() {
    console.log('simplifyArticleBody() called');
  
    const articleBodies = document.querySelectorAll('p[data-testid="drop-cap-letter"]');
    const articleCount = articleBodies.length;
  
    for (let i = 0; i < articleCount; i++) {
      const originalText = articleBodies[i].innerText;
  
      // generate the new text
      newText = "This is the sample text. This is the sample text. This is the sample text. This is the sample text. This is the sample text. This is the sample text.";

      // substitute the new text for the old text
      articleBodies[i].innerText = newText;  
    }
  }