const headline = document.createElement('h1');
// headline.innerText = ;



(async () => {
    // Sends a message to the service worker and receives a tip in response
    const data = await chrome.runtime.sendMessage({ text: 'text' });
    alert(data.text);
    headline.innerText = data.text;
    document.body.appendChild(headline);
})();
