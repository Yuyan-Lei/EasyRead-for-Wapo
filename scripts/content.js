const CUSTOMIZE_SETTINGS_DEFAULT = {
  "font-family": null,
  "font-size": 1.25,
  "bionic-reading": false
}

let articleTextElts;

function bionicWord(word) {
  // a rough emulation of bionic word for demo purposes
  let insertSpan = num => `<span class="ext-bionic">${word.substring(0, num)}</span>${word.substring(num)}`;
  if (word.length <= 1) return word;
  else if (word.length <= 3) return insertSpan(1);
  else if (word.length <= 7) return insertSpan(2);
  else if (word.length <= 10) return insertSpan(3);
  else if (word.length <= 12) return insertSpan(4);
  else return insertSpan(5);
}

function prepareBionicReading() {
  articleTextElts.forEach(paragraph =>
    paragraph.innerHTML = [...paragraph.innerHTML.matchAll("<.+?>|[^\\s<>]+")]
      .map(e => e[0].startsWith("<") ? e[0] : bionicWord(e[0]))
      .join(" ")
  );
}

function updateUI(stringifiedOpts) {
  let customizeSettings = JSON.parse(stringifiedOpts);
  let spanElts = document.querySelectorAll("span.ext-bionic");
  articleTextElts.forEach(paragraph => {
    paragraph.style.setProperty("font-size", customizeSettings["font-size"] + "rem", "important");
    if (customizeSettings["font-family"]) {
      paragraph.style.setProperty("font-family", customizeSettings["font-family"], "important");
    } else {
      paragraph.style.removeProperty("font-family");
    }
    if (customizeSettings["bionic-reading"]) {
      spanElts.forEach(span => span.style.setProperty("font-weight", "bolder", "important"));
    } else {
      spanElts.forEach(span => span.style.removeProperty("font-weight"));
    }
  });
}

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key === "customizeSettings") updateUI(newValue);
  }
});

articleTextElts = document.querySelectorAll("div.article-body > p");
prepareBionicReading();
chrome.storage.local.get(["customizeSettings"]).then((result) => {
  let newValue;
  if (Object.keys(result).length === 0) {
    newValue = CUSTOMIZE_SETTINGS_DEFAULT;
    chrome.storage.local.set({"customizeSettings": JSON.stringify(newValue)});
  } else {
    newValue = result["customizeSettings"];
  }
  updateUI(newValue);
});
