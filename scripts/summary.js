(async () => {
    chrome.storage.sync.get(['settings']).then(async(result) => {
        const mainSettings = result.settings['main-toggle']['toggle'];
        const on = result.settings['summary']['toggle'];
        const shortLength = result.settings['summary']['short_length'];
        const longLength = result.settings['summary']['long_length'];
        // set summary sections 
        if (mainSettings && on) {    
            // CSS Style
            const style = document.createElement("style");
            style.innerHTML = `
                #short-summary-container {
                    border: 2px solid #7fb8dd; 
                    padding: 8px;
                    border-radius: 16px;
                    margin-bottom: 16px;
                }
                #short-summary-section {
                    padding-left: 16px;
                    padding-right: 16px;
                    padding-bottom: 8px;
                    color: black;
                    display: none;
                }
                #show-short-summary-button {
                    background-color: transparent;
                    color: #018abe;
                    width: 100%;
                    display: flex;
                    font-weight: bold; 
                    padding: 8px 20px;
                    border: none;
                    cursor: pointer;
                }
                .short-summary-icon {
                    margin-right: 4px;
                    transition: transform 0.3s ease;
                }
                .short-summary-icon[short-summary-arrow-state='open'] {
                    transform: rotate(-180deg);
                }
                #long-summary-container {
                    border: 2px solid #7fb8dd; 
                    padding: 8px;
                    border-radius: 16px;
                    margin-bottom: 16px;
                }
                #long-summary-section {
                    padding-left: 16px;
                    padding-right: 16px;
                    padding-bottom: 8px;
                    color: black;
                    display: none;
                    font-size: 16px;
                }
                #show-long-summary-button {
                    background-color: transparent;
                    color: #018abe;
                    width: 100%;
                    display: flex;
                    font-weight: bold; 
                    padding: 8px 20px;
                    border: none;
                    cursor: pointer;
                }
                .long-summary-icon {
                    margin-right: 4px;
                    transition: transform 0.3s ease;
                }
                .long-summary-icon[long-summary-arrow-state='open'] {
                    transform: rotate(-180deg);
                }
            `;
            document.head.appendChild(style);
        
            // Create the container div
            const shortContainer = document.createElement("div");
            shortContainer.id = "short-summary-container";
            shortContainer.style.fontSize = "18px";
            const longContainer = document.createElement("div");
            longContainer.style.fontSize = "18px";
            longContainer.id = "long-summary-container";
        
            // Add the button to the container div
            const shortButton = document.createElement("shortButton");
            shortButton.innerText = "Short Summary";
            shortButton.id = "show-short-summary-button";
            const icon1 = document.createElement("span");
            icon1.className = "short-summary-icon";
            icon1.setAttribute("short-summary-arrow-state", "closed");
            icon1.innerHTML = "&#9660;";
            shortButton.insertBefore(icon1, shortButton.firstChild);
            shortContainer.appendChild(shortButton);
        
            const longButton = document.createElement("button");
            longButton.innerText = "Long Summary";
            longButton.id = "show-long-summary-button";
            const icon2 = document.createElement("span");
            icon2.className = "long-summary-icon";
            icon2.setAttribute("long-summary-arrow-state", "closed");
            icon2.innerHTML = "&#9660;";
            longButton.insertBefore(icon2, longButton.firstChild);
            longContainer.appendChild(longButton);
        
            // Add the summary section to the container div
            const shortSummaryDiv = document.createElement("p");
            shortSummaryDiv.id = "short-summary-section";
            shortSummaryDiv.innerText = `Loading...`;
            shortSummaryDiv.style.color = "grey";
            shortSummaryDiv.style.fontSize = "18px";
            shortContainer.appendChild(shortSummaryDiv);
        
            const longSummaryDiv = document.createElement("p");
            longSummaryDiv.id = "long-summary-section";
            longSummaryDiv.innerText = `Loading...`;
            longSummaryDiv.style.color = "grey";
            longSummaryDiv.style.fontSize = "18px";
            longContainer.appendChild(longSummaryDiv);
        
            // Listen for button clicks
            shortButton.addEventListener("click", function () {
            // Change the arrow icon state
            const icon = this.querySelector(".short-summary-icon");
            const currentState = icon.getAttribute("short-summary-arrow-state");
            if (currentState === "closed") {
                icon.setAttribute("short-summary-arrow-state", "open");
            } else {
                icon.setAttribute("short-summary-arrow-state", "closed");
            }
            // Toggle the summary section
            const summarySection = document.getElementById("short-summary-section");
            if (!summarySection.style.display) {
                summarySection.style.display = "block";
            } else if (summarySection.style.display === "none") {
                summarySection.style.display = "block";
            } else {
                summarySection.style.display = "none";
            }
            });
        
            longButton.addEventListener("click", function () {
            // Change the arrow icon state
            const icon = this.querySelector(".long-summary-icon");
            const currentState = icon.getAttribute("long-summary-arrow-state");
            if (currentState === "closed") {
                icon.setAttribute("long-summary-arrow-state", "open");
            } else {
                icon.setAttribute("long-summary-arrow-state", "closed");
            }
            // Toggle the summary section
            const summarySection = document.getElementById("long-summary-section");
            if (!summarySection.style.display) {
                summarySection.style.display = "block";
            } else if (summarySection.style.display === "none") {
                summarySection.style.display = "block";
            } else {
                summarySection.style.display = "none";
            }
            });
        
            // insert the container div before the article body
            const articleDiv = document.querySelector(".article-body");
            if (articleDiv) {
            articleDiv.parentNode.insertBefore(shortContainer, articleDiv);
            articleDiv.parentNode.insertBefore(longContainer, articleDiv);
            } else {
            console.log("Cannot find a valid article body");
            }

            
            // extract the article body
            const articleBodies = document.querySelectorAll(
                'p[data-testid="drop-cap-letter"]'
            );

            let articleText = '';
            for (let i = 0; i < articleBodies.length; i++) {
                if (articleText.length < 12000) articleText += articleBodies[i].innerText;
            }

            // get summary from API
            const shortSummaryResponse = await chrome.runtime.sendMessage({
                action: 'getSummary',
                articleText: articleText,
                length: shortLength,
            })
            const shortSummaryText = shortSummaryResponse.result;
            const longSummaryResponse = await chrome.runtime.sendMessage({
                action: 'getSummary',
                articleText: articleText,
                length: longLength,
            })
            const longSummaryText = longSummaryResponse.result;

            // insert nodes
            const shortSectionNode = document.getElementById("short-summary-section");
            shortSectionNode.innerText = shortSummaryText;
            const longSectionNode = document.getElementById("long-summary-section");
            longSectionNode.innerText = longSummaryText;
            
        } else {
            // remove the summary sections
            const shortContainer = document.getElementById("short-summary-container");
            const longContainer = document.getElementById("long-summary-container");
            if (shortContainer) {
            shortContainer.remove();
            }
            if (longContainer) {
            longContainer.remove();
            }
        }
    });
})();