(async () => {
    chrome.storage.sync.get(['settings']).then(async(result) => {
        const mainSettings = result.settings['main-toggle']['toggle'];
        const on = result.settings['simple']['toggle'];
        const age = result.settings['simple']['age'];
        if (mainSettings && on) {
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
                    level: age, // TODO: get this from the user
                })
                const newText = response.result;
                
                // substitute the new text for the old text
                articleBodies[i].innerText = newText;  
            }
        }
    });
})();