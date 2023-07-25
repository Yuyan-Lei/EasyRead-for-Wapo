export function generateSummary() {
    console.log('summaryHandler() called');

    // extract the article body
    const articleBodies = document.getElementsByClassName('article-body');

    // get summary from API
    // var summaryGenerator = new SummaryGenerator();
    // var text = summaryGenerator.getSummary();
    // console.log(text);

    // insert a summary section before the article body
    const summaryDiv = document.createElement('div');
    summaryDiv.innerText = "Summary";
    const articleDiv = document.getElementsByClassName('article');
    articleDiv[0].insertBefore(summaryDiv, articleBodies[0]);
  }