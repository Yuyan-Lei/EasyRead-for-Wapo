export function generateSummary() {
    console.log('summaryHandler() called');

    // extract the article body
    const articleBodies = document.querySelectorAll('p[data-testid="drop-cap-letter"]');
    
    // get summary from API
    // var summaryGenerator = new SummaryGenerator();
    // var text = summaryGenerator.getSummary();
    // console.log(text);

    // Generate a summary
    const summaryDiv = document.createElement('div');
    summaryDiv.id = "short-summary-section";
    summaryDiv.innerText = "Summary Summary Summary Summary Summary Summary Summary";
    
    // insert a summary section before the article body
    const articleDiv = document.querySelector('.grid-body');
    articleDiv.parentNode.insertBefore(summaryDiv, articleDiv);
}

export function removeSummarySection() {
    const shortSummarySection = document.getElementById('short-summary-section');
    const mediumSummarySection = document.getElementById('medium-summary-section');
    if (shortSummarySection) {
        shortSummarySection.remove();
    }
    if (mediumSummarySection) {
        mediumSummarySection.remove();
    }
}