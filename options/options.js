const saveOptions = () => {
  chrome.storage.sync.get(["settings"]).then((result) => {
    console.log("hello");
    let currSettings = result.settings;
    console.log(JSON.stringify(result));
    // IMPROVEMENT: use one form handler to submit all settings
    // Get form values
    // translate
    const targetLanguage = document.getElementById("targetLanguage").value;
    const service = document.getElementById("translationService").value;
    const color = document.getElementById("displayColor").value;
    const style = document.getElementById("displayStyle").value;

    // summary
    const shortSummaryLength = document.getElementById("shortSummaryLength").value;
    const longSummaryLength = document.getElementById("longSummaryLength").value;

    // simple
    const simplifyAge = document.getElementById("simplifyAge").value;

    // customize
    const targetFont = document.getElementById("targetFont").value;
    const targetFontSize = document.getElementById("font-size").value;
    const bionicReading = document.getElementById("bionic-toggle").checked;

    currSettings["translate"]["language"] = targetLanguage;
    currSettings["translate"]["service"] = service;
    currSettings["translate"]["color"] = color;
    currSettings["translate"]["style"] = style;

    currSettings["summary"]["short_length"] = shortSummaryLength;
    currSettings["summary"]["long_length"] = longSummaryLength;

    currSettings["simple"]["age"] = simplifyAge;

    currSettings["customize"]["font-family"] = targetFont;
    currSettings["customize"]["font-size"] = targetFontSize;
    currSettings["customize"]["bionic-reading"] = bionicReading;

    // Save settings to chrome.storage.sync
    chrome.storage.sync.set({ settings: currSettings }, function () {
      console.log("New Settings:", JSON.stringify(currSettings));
    });
  });
};

// const restoreOptions = () => {
//   chrome.storage.sync.get(["settings"]).then((result) => {
//     console.log(result);
//     document.getElementById("targetLanguage").value =
//       result.settings["translate"]["language"];
//     document.getElementById("simplifyAge").value =
//       result.settings["simple"]["age"];
//     document.getElementById("summaryLength").value =
//       result.settings["summary"]["length"];
//   });
// };

const loadSettings = (currSettings) => {
  // translate
  document.getElementById("targetLanguage").value = currSettings["translate"]["language"]
  document.getElementById("translationService").value = currSettings["translate"]["service"]
  document.getElementById("displayColor").value = currSettings["translate"]["color"]
  document.getElementById("displayStyle").value = currSettings["translate"]["style"]

  // summary
  document.getElementById("shortSummaryLength").value = currSettings["summary"]["short_length"]
  document.getElementById("longSummaryLength").value = currSettings["summary"]["long_length"]

  // simple
  document.getElementById("simplifyAge").value = currSettings["simple"]["age"]

  // customize
  document.getElementById("targetFont").value = currSettings["customize"]["font-family"]
  document.getElementById("font-size").value = currSettings["customize"]["font-size"]
  document.getElementById("bionic-toggle").checked = currSettings["customize"]["bionic-reading"]
};

const load = async () => {
  const result = await chrome.storage.sync.get(["settings"]);
  const fonts = await chrome.runtime.sendMessage("getFontList");
  let innerHTML = fonts
    .map(f => `<option ${f.displayName === result.settings["font-family"] ? "selected" : ""}>${f.displayName}</option>`)
    .join("");

  const targetFontSelector = document.getElementById("targetFont");
  targetFontSelector.innerHTML = `
            <optgroup label="Built-in">
              <option ${!result.settings["font-family"] ? "selected" : ""}>Default</option>
              <option ${result.settings["font-family"] === "OpenDyslexic" ? "selected" : ""}>OpenDyslexic</option>
            </optgroup>
            <optgroup label="System fonts">
              ${innerHTML}
            </optgroup>
          `;
  targetFontSelector.disabled = false;
  loadSettings(result.settings);
}

window.onload = () => {



  const fontSizeSelect = document.getElementById("font-size");
  const options = []
  for (let i = 0.5; i < 4.25; i += 0.25) {
    const option = `<option value=${i}>${i}</option>`
    options.push(option);
  }
  console.log(fontSizeSelect)
  fontSizeSelect.innerHTML = options.join("; ");

  load();

  document.getElementById('submit-button').addEventListener("click", saveOptions);
};


