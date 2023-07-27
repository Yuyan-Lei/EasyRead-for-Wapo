const saveOptions = () => {
  chrome.storage.sync.get(["settings"]).then((result) => {
    let currSettings = result.settings;
    console.log(JSON.stringify(result));
    const form = document.querySelector(".optionsForm");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Get form values
      const targetLanguage = document.getElementById("targetLanguage").value;
      const simplifyAge = document.getElementById("simplifyAge").value;
      const summaryLength = document.getElementById("summaryLength").value;

      currSettings["translate"]["language"] = targetLanguage;
      currSettings["simple"]["age"] = simplifyAge;
      currSettings["summary"]["length"] = summaryLength;

      // Save settings to chrome.storage.sync
      chrome.storage.sync.set({ settings: currSettings }, function () {
        console.log("New Settings:", JSON.stringify(currSettings));
      });
    });
  });
  console.log("New Settings:", JSON.stringify(currSettings));
};

const restoreOptions = () => {
  chrome.storage.sync.get(["settings"]).then((result) => {
    document.getElementById("targetLanguage").value =
      result.settings["translate"]["language"];
    document.getElementById("simplifyAge").value =
      result.settings["simple"]["age"];
    document.getElementById("summaryLength").value =
      result.settings["summary"]["length"];
  });
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("submit-button").addEventListener("click", saveOptions);
console.log("hello");
