const CUSTOMIZE_SETTINGS_DEFAULT = {
  "font-family": null,
  "font-size": 1.25,
  "bionic-reading": false
}

let customizeSettings = structuredClone(CUSTOMIZE_SETTINGS_DEFAULT);
let fontFaceSelect, fontSizeSelect;

function init() {
  // initialize UI (dropdown, default starting values from storage)
  chrome.storage.local.get(["customizeSettings"]).then((result) => {
    if (Object.keys(result).length === 0) {
      saveSettings();
    } else {
      customizeSettings = JSON.parse(result["customizeSettings"]);
    }

    fontSizeSelect.value = customizeSettings["font-size"];
    bionicToggle.checked = customizeSettings["bionic-reading"];

    chrome.runtime.sendMessage("getFontList", (fonts) => {
      let innerHTML = fonts
        .map(f => `<option ${f.displayName === customizeSettings["font-family"] ? "selected" : ""}>${f.displayName}</option>`)
        .join("");

      fontFaceSelect.innerHTML = `
        <optgroup label="Built-in">
          <option ${!customizeSettings["font-family"] ? "selected" : ""}>Default</option>
          <option ${customizeSettings["font-family"] === "OpenDyslexic" ? "selected" : ""}>OpenDyslexic</option>
        </optgroup>
        <optgroup label="System fonts">
          ${innerHTML}
        </optgroup>
      `;
      fontFaceSelect.disabled = false;
    });
  });
}

function saveSettings(reinit=false) {
  chrome.storage.local.set({ "customizeSettings": JSON.stringify(customizeSettings) });
  if (reinit) {
    init();
  }
}

document.addEventListener("DOMContentLoaded", () => {

  fontFaceSelect = document.getElementById("font-face");
  fontSizeSelect = document.getElementById("font-size");
  bionicToggle = document.getElementById("bionic-toggle");

  // register event listeners
  fontFaceSelect.addEventListener("change", e => {
    let newFont = e.target.value;
    if (newFont === "Default") newFont = null;
    customizeSettings["font-family"] = newFont;
    saveSettings();
  });

  fontSizeSelect.addEventListener("input", e => {
    customizeSettings["font-size"] = e.target.value;
    saveSettings();
  });

  bionicToggle.addEventListener("change", e => {
    customizeSettings["bionic-reading"] = bionicToggle.checked;
    saveSettings();
  });

  document.getElementById("reset-btn").addEventListener("click", e => {
    customizeSettings = structuredClone(CUSTOMIZE_SETTINGS_DEFAULT);
    saveSettings(reinit=true);
  })

  init();
});
