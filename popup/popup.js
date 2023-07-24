import { translateArticleBody } from '../handlers/translator.js';
import { simplifyArticleBody } from '../handlers/simplifier.js';

function onClickTranslate () {
    console.log("clicked translate");

    let targetLanguage = document.getElementById('targetLanguage').value;
    console.log(`targetLanguage: ${targetLanguage}`);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs);
    chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: translateArticleBody,
        args: [targetLanguage]
    })
        .then(() => console.log("start to translate"));
    });
}
document.getElementById("translate-option").addEventListener("click", onClickTranslate);


function onClickSimpleEnglish() {
    console.log("clicked simple english");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs);
    chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: simplifyArticleBody
    })
        .then(() => console.log("start to generate a simple version"));
    });
}
document.getElementById("simple-version-option").addEventListener("click", onClickSimpleEnglish);


function onChangeCustomizeFont() {
    console.log("clicked customize font");
}
document.getElementById("customize-font-toggle").addEventListener("change", onChangeCustomizeFont);


function onChangeSummary () {
    console.log("clicked summary");
}
document.getElementById("summary-toggle").addEventListener("change", onChangeSummary);