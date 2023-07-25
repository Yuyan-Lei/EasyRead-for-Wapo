import { translateArticleBody, removeTranslation } from '../handlers/translationHandler.js';
import { simplifyArticleBody } from '../handlers/simplificationHandler.js';
import { generateSummary, removeSummarySection } from '../handlers/summaryHandler.js';

function onClickTranslate () {
    if (this.checked) {
        console.log("Checked translate");
        let targetLanguage = document.getElementById('targetLanguage').value;
        console.log(`targetLanguage: ${targetLanguage}`);
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: translateArticleBody,
                args: [targetLanguage]
            })
        });
    } else {
        console.log('Unchecked the translate option!');
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: removeTranslation
            })
        });
    }
}
document.getElementById("translate-toggle").addEventListener("change", onClickTranslate);


function onClickSimpleEnglish() {
    if (this.checked) {
        console.log("clicked the simple version option");
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: simplifyArticleBody
            })
        });
    } else {
        console.log("unchecked the simple version option");
    }
}
document.getElementById("simple-version-toggle").addEventListener("change", onClickSimpleEnglish);


function onChangeCustomizeFont() {
    if (this.checked) {
        console.log('Checkbox is checked!');
        } else {
        console.log('Checkbox is unchecked!');
    }
}
document
  .getElementById("customize-font-toggle")
  .addEventListener("change", onChangeCustomizeFont);

function onChangeSummary() {
  if (this.checked) {
    console.log("Clicked summary");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: generateSummary,
      });
    });
  } else {
    console.log("Unchecked the summary option!");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: removeSummarySection,
      });
    });
  }
}
document
  .getElementById("summary-toggle")
  .addEventListener("change", onChangeSummary);
