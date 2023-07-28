## Introduction
EasyRead for WaPo is a Chrome extension that provides additional website customization of accessibility settings for the WaPo official website, while incorporating the capabilities of OpenAI to provide content-related features.

## Installation
Follow the steps below to install and use this Extension:

- Download this repository

- Add a file named `apiKey.js`, which includes the follow information:
    ```javascript
    export const OPEN_AI_KEY = "YOUR_API_KEY";
    export const GOOGLE_API_KEY = "YOUR_API_KEY"
    ```

- Open the Chrome browser.

- Navigate to the extensions management page by entering chrome://extensions/ in the address bar and pressing Enter.

- Enable "Developer Mode" by toggling the switch located at the top right corner of the extensions page.

- Click on the "Load unpacked" button and select the folder named "EasyRead" that you have created for this extension.

- The extension is now loaded and ready to use.

For more information, see the documentation [here](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked)

## How to Use
After installing EasyRead Extension, you can find its icon in the Chrome browser's toolbar.

- Open any webpage that you want to translate.

- Click on the EasyRead Extension icon in the toolbar.

- A popup window will appear, allowing you to select your desired options.