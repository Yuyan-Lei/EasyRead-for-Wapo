export function generateSummary() {
    console.log('summaryHandler() called');

    // extract the article body
    const articleBodies = document.querySelectorAll('p[data-testid="drop-cap-letter"]');
    
    // get summary from API
    // var summaryGenerator = new SummaryGenerator();
    // var text = summaryGenerator.getSummary();
    // console.log(text);

    // CSS Style
    const style = document.createElement('style');
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
            color: grey;
            display: none;
        }
        #show-short-summary-button {
            background-color: transparent;
            color: #018abe;
            width: 100%;
            display: flex;
            font-weight: bold; 
            padding: 4px 20px;
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
    `;
    document.head.appendChild(style);

    // Create the container div
    const containerDiv = document.createElement('div');
    containerDiv.id = 'short-summary-container';

    // Add the shortButton to the container div
    const shortButton = document.createElement('shortButton');
    shortButton.innerText = 'Short Summary';
    shortButton.id = 'show-short-summary-button';
    const icon = document.createElement('span');
    icon.className = 'short-summary-icon';
    icon.setAttribute('short-summary-arrow-state', 'closed');
    icon.innerHTML = '&#9660;';
    shortButton.insertBefore(icon, shortButton.firstChild);
    containerDiv.appendChild(shortButton);

    // Add the summary section to the container div
    const summaryDiv = document.createElement('p');
    summaryDiv.id = 'short-summary-section';
    summaryDiv.innerText = `This is a short summary. This is a short summary.
        This is a short summary. This is a short summary.   
        This is a short summary. This is a short summary.
        This is a short summary. This is a short summary.
    `;
    containerDiv.appendChild(summaryDiv);

    // Listen for shortButton click
    shortButton.addEventListener('click', function () {
        // Change the arrow icon state
        const icon = this.querySelector('.short-summary-icon');
        const currentState = icon.getAttribute('short-summary-arrow-state');
        if (currentState === 'closed') {
            icon.setAttribute('short-summary-arrow-state', 'open');
        } else {
            icon.setAttribute('short-summary-arrow-state', 'closed');
        }    
        // Toggle the summary section
        const summarySection = document.getElementById('short-summary-section');
        if (!summarySection.style.display ) {
            summarySection.style.display = 'block';

        } else if (summarySection.style.display === 'none') {
            summarySection.style.display = 'block';
        } else {
            summarySection.style.display = 'none';
        }
    });

    // insert the container div before the article body
    const articleDiv = document.querySelector('.article-body');
    if (articleDiv) {
        articleDiv.parentNode.insertBefore(containerDiv, articleDiv);
    } else {
        console.log("Cannot find a valid article body");
    }
}

export function removeSummarySection() {
    const containerDiv = document.getElementById('short-summary-container');
    if (containerDiv) {
        containerDiv.remove();
    }
}