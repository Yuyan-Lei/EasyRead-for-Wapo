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
        console.log('onload:' + result.settings);
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
                e.value = currSettings["customize"]['font-family'];
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
        } else {
            currSettings["customize"]['font-family'] = element.value;
            console.log(currSettings);
        }
        return currSettings;
    }).then((currSettings) => {
        chrome.storage.sync.set({ settings: currSettings });
    });
}

function setSwitchDisableStatus(element, status) {
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
        "language": "Simplified Chinese",
        "color": "grey",
        "style": "none"
    },
    "customize": {
        "toggle": false,
        "font-family": "Arial",
        "font-size": 1.25,
        "bionic-reading": false
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
        if (e.nodeName === 'INPUT') {
            e.checked = false;
        }
        else if (e.id === 'targetLanguage') {
            e.value = defaultSettings["translate"]['language'];
        } else {
            e.value = defaultSettings["customize"]['font-family'];
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
        e.addEventListener("change", () => updateSwitchStatus(e));
    } else {
        e.addEventListener("change", () => updateSwitchStatus(e));
    }
});