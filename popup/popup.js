import {
  translateArticleBody,
  removeTranslation,
} from "../handlers/translationHandler.js";
import { simplifyArticleBody } from "../handlers/simplificationHandler.js";
import {
  generateSummary,
  removeSummarySection,
} from "../handlers/summaryHandler.js";
import { getSummaryRequest } from "../api/openAI.js";



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

const toggleNameToStorageName = {
    "turn-on-toggle": "main-toggle",
    "translate-toggle": "translate",
    "simple-version-toggle": "simple",
    "customize-font-toggle": "customize",
    "summary-toggle": "summary",
    "targetLanguage": "targetLanguage",
    "targetFont": "targetFont"
}

window.onload = () => {
    chrome.storage.sync.get(['settings']).then((result) => {
        console.log('onload:' + JSON.stringify(result.settings));
        let currSettings;
        if (result.settings) {
            currSettings = result.settings;
        }
        document.getElementById("turn-on-toggle").checked = currSettings["main-toggle"]["toggle"];
        if (currSettings["main-toggle"]["toggle"]) {
            elements.forEach(e => setSwitchDisableStatus(e, true));
        }
        elements.forEach(e => {
            if (e.nodeName === 'INPUT') {
                e.checked = currSettings[toggleNameToStorageName[e.id]]['toggle'];
            }
            else if (e.id === 'targetLanguage') {
                e.value = currSettings["translate"]['language'];
            }
            else if (e.id === 'targetFont') {
                e.value = currSettings["customize"]['font'];
            }
        });
    });
}

function updateSwitchStatus(element) {
    chrome.storage.sync.get(['settings']).then((result) => {
        console.log(result)
        let currSettings = result.settings;
        if (element.nodeName === "INPUT") {
            console.log(element.id + " is " + element.checked);
            console.log(currSettings[toggleNameToStorageName[element.id]])
            currSettings[toggleNameToStorageName[element.id]]['toggle'] = element.checked
        }
        else if (element.id === 'targetLanguage') {
            currSettings["translate"]['language'] = element.value;
        }else {
            currSettings["customize"]['font'] = element.value;
        }
        console.log(currSettings);
        return currSettings;
    }).then((currSettings) => {
        chrome.storage.sync.set({ settings: currSettings });
    });
}

function setSwitchDisableStatus(element, status)  {
    if (!status && element.nodeName === 'INPUT' && element.checked) {
        element.checked = false;
        updateSwitchStatus(element);
    }
    element.disabled = !status;
}

const defaultSettings = {
    "main-toggle": {
      "toggle": false,
    },
    "translate": {
      "toggle": false,
      "language": "cn",
      "color": "grey",
      "style": "none"
    },
    "customize": {
      "toggle": false,
      "font": "Arial"
    },
    "simple": {
      "toggle": false,
      "age": 1
    },
    "summary": {
      "toggle": false,
      "short_length": 100,
      "long_length": 200
    }
  }
function setBackToDefault() {
    elements.forEach(e => {
        e.disabled = true;
        if (e.nodeName === 'INPUT'){
            e.checked = false;
        } 
        else if (e.id === 'targetLanguage') {
            e.value = defaultSettings["translate"]['language'];
        }else {
            e.value = defaultSettings["customize"]['font'];
        }
    });
    chrome.storage.sync.set({ settings: defaultSettings })
}


function enableExtension() {
    if (this.checked) {
        console.log("Checked the turn on option!");
        updateSwitchStatus(this);
        elements.forEach(e => e.disabled = false)
    } else {
        console.log("Unchecked the turn on option!");
        setBackToDefault();
        
    }

}
document.getElementById("turn-on-toggle").addEventListener("change", enableExtension);

elements.forEach(e => {
    if (e.nodeName === 'INPUT') {
        e.addEventListener("change", ()=> updateSwitchStatus(e));
    } else{
        e.addEventListener("change", ()=> updateSwitchStatus(e));
    }
});



// function onClickTranslate() {
//     updateSwitchStatus(this);
//     if (this.checked) {
//         console.log("Checked translate");
//         let targetLanguage = document.getElementById('targetLanguage').value;
//         console.log(`targetLanguage: ${targetLanguage}`);
//         chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//             chrome.scripting.executeScript({
//                 target: { tabId: tabs[0].id },
//                 func: translateArticleBody,
//                 args: [targetLanguage]
//             })
//         });
//     } else {
//         console.log('Unchecked the translate option!');
//         chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//             chrome.scripting.executeScript({
//                 target: { tabId: tabs[0].id },
//                 func: removeTranslation
//             })
//         });
//     }
// }
// document
//   .getElementById("translate-toggle")
//   .addEventListener("change", onClickTranslate);

// function onClickSimpleEnglish() {
//     updateSwitchStatus(this);
//     if (this.checked) {
//         console.log("clicked the simple version option");
//         chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//             chrome.scripting.executeScript({
//                 target: { tabId: tabs[0].id },
//                 func: simplifyArticleBody
//             })
//         });
//     } else {
//         console.log("unchecked the simple version option");
//     }
// }
// document
//   .getElementById("simple-version-toggle")
//   .addEventListener("change", onClickSimpleEnglish);

// function onChangeCustomizeFont() {
//     updateSwitchStatus(this);
//     if (this.checked) {
//         console.log('Checkbox is checked!');
//     } else {
//         console.log('Checkbox is unchecked!');
//     }
// }
// document
//   .getElementById("customize-font-toggle")
//   .addEventListener("change", onChangeCustomizeFont);


// function onChangeSummary() {
//     updateSwitchStatus(this);
//     if (this.checked) {
//         console.log("Clicked summary");
//         chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//             chrome.scripting
//               .executeScript({
//                 target: { tabId: tabs[0].id },
//                 func: getSummaryRequest,
//                 args: [100],
//                 // func: function() {
//                 //     chrome.tabs.executeScript({target: {tabId: tabs[0].id}, func: generateSummary})
//                 // },
//               })
//               .then((res) => {
//                 console.log(res[0].result);
//                 chrome.scripting.executeScript({
//                   target: { tabId: tabs[0].id },
//                   func: generateSummary,
//                   args: [res[0].result],
//                 });
//               });
//             });
//     } else {
//         console.log('Unchecked the summary option!');
//         chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//             chrome.scripting.executeScript({
//                 target: { tabId: tabs[0].id },
//                 func: removeSummarySection
//             })
//         });
//     }
// }
// document.getElementById("summary-toggle").addEventListener("change", onChangeSummary);

// function onChangeTargetLanguage() {
//     updateSwitchStatus(this);
// }
// document.getElementById("targetLanguage").addEventListener("change", onChangeTargetLanguage);

// function onChangeTargetFont() {
//     updateSwitchStatus(this);
// }
// document.getElementById("targetFont").addEventListener("change", onChangeTargetFont);
