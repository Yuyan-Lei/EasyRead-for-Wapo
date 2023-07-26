(async () => {
    if (true) { 
        console.log('Simplification.js called');

        const articleBodies = document.querySelectorAll('p[data-testid="drop-cap-letter"]');
        const articleCount = articleBodies.length;
        
        for (let i = 0; i < articleCount; i++) {
            const originalText = articleBodies[i].innerText;
        
            articleBodies[i].innerText = "loading..."
            // generate the new text
            const response = await chrome.runtime.sendMessage({
                action: 'getSimplerVersion',
                originalText: originalText,
                level: 10, // TODO: get this from the user
            })
            const newText = response.result;
            
            // substitute the new text for the old text
            articleBodies[i].innerText = newText;  
        }
    }
})();