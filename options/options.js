
window.onload = () => {
    chrome.storage.sync.set({ 'chris': 'test2' }, function () {
        console.log('test test test');
    });
}
