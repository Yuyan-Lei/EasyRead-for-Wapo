## Introduction
EasyRead is a Chrome extension that brings a whole new level of customization and accessibility to The Washington Post website. 
 
EasyRead offering deep customization options for various settings, including various forms of bilingual immersive translation, personalized font settings, switching to easy-to-read versions of articles, and generating summaries of various lengths. This plugin caters to the personalized reading needs of individuals and is especially suitable for young or educationally disadvantaged people, ADHD users, and non-English speakers.

After using EasyRead, the webpage retains its original layout (even with in-text URLs!), seamlessly integrated for an enhanced native reading experience.
Of course, for each feature, we offer a wide range of personalized settings, such as display lengths, styles, level of simplification, and more.

Most importantly, while currently, it's a Chrome extension, it's fundamentally a script injection. This means the script can be injected into any browser through tools like Tampermonkey, or can be directly integrated into our website like what Subs Tetro script does.

**Watch a demo video [here](https://youtu.be/xai3CTXPgyo)!**

## Installation
Follow the steps below to install and use this Extension:

- Download this repository

- Add a file named `apiKey.js`, which includes the follow information:
    ```javascript
    // open ai key is required
    export const OPEN_AI_KEY = "YOUR_API_KEY";
    // google api is optional
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

- Open any page that you want to read on the Washington Post website.

- Click on the EasyRead Extension icon in the toolbar.

- A popup window will appear, allowing you to select your desired options.

## Introductions to Features
![Image1](./images/pics/EadyRead%20Extension-1.png)
![Image2](./images/pics/EadyRead%20Extension-2.png)
![Image3](./images/pics/EadyRead%20Extension-3.png)
![Image4](./images/pics/EadyRead%20Extension-4.png)
![Image5](./images/pics/EadyRead%20Extension-5.png)
![Image6](./images/pics/EadyRead%20Extension-6.png)
![Image7](./images/pics/EadyRead%20Extension-7.png)
![Image8](./images/pics/EadyRead%20Extension-8.png)
![Image9](./images/pics/EadyRead%20Extension-9.png)
