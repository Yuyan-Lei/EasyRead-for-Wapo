import {
  translateArticleBody,
  removeTranslation,
} from "../handlers/translationHandler.js";
import { simplifyArticleBody } from "../handlers/simplificationHandler.js";
import {
  generateSummary,
  removeSummarySection,
  setSummarySections
} from "../handlers/summaryHandler.js";
import { getSummaryRequest } from "../api/openAI.js";

function setSwitchDisableStatus(element, status) {
    if (!status && element.nodeName === 'INPUT') {
        element.checked = false;
        currentSwitchStatus[element.id] = false;
        updateSwitchStatus(element);
    }
    element.disabled = !status;
}

const elements = [
    // switch
    document.getElementById("translate-toggle"),
    document.getElementById("simple-version-toggle"),
    document.getElementById("customize-font-toggle"),
    document.getElementById("summary-toggle"),

    // select
    document.getElementById("targetLanguage"),
    document.getElementById("targetFont"),
];

let currentSwitchStatus = {
    "turn-on-toggle": false,
    'translate-toggle': false,
    'simple-version-toggle': false,
    'customize-font-toggle': false,
    'summary-toggle': false,
    'targetLanguage': 'cn',
    'targetFont': 'Arial',
}

window.onload = () => {
    chrome.storage.sync.get(['extensionSwitchs'], function (result) {
        console.log('onload: Value currently is ' + result.extensionSwitchs);
        console.log(result)
        if (result.extensionSwitchs) {
            currentSwitchStatus = result.extensionSwitchs;
            document.getElementById("turn-on-toggle").checked = currentSwitchStatus["turn-on-toggle"];
            if (currentSwitchStatus["turn-on-toggle"]) {
                elements.forEach(e => setSwitchDisableStatus(e, true));
            }
            elements.forEach(e => {
                if (e.nodeName === 'INPUT') {
                    e.checked = currentSwitchStatus[e.id];
                }
                else if (e.nodeName === 'SELECT') {
                    e.value = currentSwitchStatus[e.id];
                }
            });

        }

        else {
            chrome.storage.sync.set({ extensionSwitchs: currentSwitchStatus }, function () {
                console.log('first time onload: Value is set to ' + currentSwitchStatus);
            });
        }
    });
}

function updateSwitchStatus(element) {
    console.log(element.checked);
    element.nodeName === "INPUT" ?
        currentSwitchStatus[element.id] = element.checked :
        currentSwitchStatus[element.id] = element.value;
    console.log(`updateSwitchStatus: ${currentSwitchStatus}`)
    chrome.storage.sync.set({ extensionSwitchs: currentSwitchStatus }, function () {
        console.log(currentSwitchStatus);
    });
}


function enableExtension() {
    updateSwitchStatus(this);
    if (this.checked) {
        console.log("Checked the turn on option!");
        elements.forEach(e => setSwitchDisableStatus(e, true));
    } else {
        console.log("Unchecked the turn on option!");
        elements.forEach(e => setSwitchDisableStatus(e, false));
    }

}
document.getElementById("turn-on-toggle").addEventListener("click", enableExtension);


function onClickTranslate() {
    updateSwitchStatus(this);
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
document
  .getElementById("translate-toggle")
  .addEventListener("change", onClickTranslate);

function onClickSimpleEnglish() {
    updateSwitchStatus(this);
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
document
  .getElementById("simple-version-toggle")
  .addEventListener("change", onClickSimpleEnglish);

function onChangeCustomizeFont() {
    updateSwitchStatus(this);
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
    updateSwitchStatus(this);
    if (this.checked) {
        console.log("Clicked summary");
    } else {
        console.log('Unchecked the summary option!');
    }
}
document.getElementById("summary-toggle").addEventListener("change", onChangeSummary);

function onChangeTargetLanguage() {
    updateSwitchStatus(this);
    console.log(this.value);
}
document.getElementById("targetLanguage").addEventListener("change", onChangeTargetLanguage);

function onChangeTargetFont() {
    updateSwitchStatus(this);
    console.log(this.value);
}
document.getElementById("targetFont").addEventListener("change", onChangeTargetFont);
