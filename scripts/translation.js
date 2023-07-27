(async () => {
    // set summary sections 
    if (true) {
        const targetLanguage = 'Simplified Chinese'; // TODO: get this from the storage
        const style = 'none' // TODO: get this from the storage
        const color = 'grey' // TODO: get this from the storage

        const articleBodies = document.getElementsByClassName('article-body');
        const articleCount = articleBodies.length;

        for (let i = 0; i < articleCount; i++) {
            const paragraphs = articleBodies[i].getElementsByTagName('p');
            const paragraphCount = paragraphs.length;
            for (let j = 0; j < paragraphCount; j++) {
                let translation = '';

                let isATag = false;
                // situation 1: normal text with <a> tags inside
                if (paragraphs[j].hasAttribute('data-testid')) {
                    let paragraphText = paragraphs[j].innerHTML;
                    const regexToRemoveBoldTag = /<b>\ <\/b>/g;
                    paragraphText = paragraphText.replace(regexToRemoveBoldTag, "");
                
                    const regex = /(<a[^>]*>.*?<\/a>)|[^<>]+/g;
                    let match;
                    console.log(match);
                    while ((match = regex.exec(paragraphText)) !== null) {
                        if (match[1]) {
                            const regexATag = /(<a[^>]*>)(.*?)(<\/a>)/g;
                            let openingTag, textBeforeTrans, closingTag;
                            match[1].replace(regexATag, (match, before, text, after) => {
                                // get translation from API
                                openingTag = before;
                                textBeforeTrans = text;
                                closingTag = after;
                            });
                            const textResponse = await chrome.runtime.sendMessage({
                                action: 'getTranslation',
                                text: textBeforeTrans,
                                targetLanguage: targetLanguage,
                            })
                            const translatedText = textResponse.result;
                            const result = ` ${openingTag}${translatedText}${closingTag} `;
                            translation += result;
                        } else if (match[0]) {
                            // get translation from API
                            const textResponse = await chrome.runtime.sendMessage({
                                action: 'getTranslation',
                                text: match[0],
                                targetLanguage: targetLanguage,
                            })
                            const translatedText = textResponse.result;
                            translation += translatedText;
                        }
                    }
                } else {
                    // situation 2: only <a> tag
                    isATag = true;
                    let paragraphText = paragraphs[j].querySelector('a');
                    const link = paragraphText.href;
                    const text = paragraphText.innerText;
                    // get translation from API
                    const textResponse = await chrome.runtime.sendMessage({
                        action: 'getTranslation',
                        text: text,
                        targetLanguage: targetLanguage,
                    })
                    const translatedText = textResponse.result;
                    translation += `<a href="${link}">${translatedText}</a>`;
                }

                // create a styled div to hold the translation
                let translationParagraph;
                translationParagraph = document.createElement('p');
                translationParagraph.innerHTML = translation;
                translationParagraph.id = 'translation-section';

                // Display style options:
                if (!isATag) {
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
                if (!isATag) {
                    paragraphs[j].appendChild(translationParagraph);    
                } else {
                    paragraphs[j].children[0].appendChild(translationParagraph); 
                }
            }
        }
    } else {
        // 2. remove the translation sections
        const translationParagraphs = document.querySelectorAll('#translation-section');
        translationParagraphs.forEach((paragraph) => {
          paragraph.remove();
        });
    }
})();