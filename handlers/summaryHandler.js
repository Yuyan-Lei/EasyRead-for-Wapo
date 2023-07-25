import { getSummaryRequest } from "../api/openAI.js";

export async function generateSummary() {
  console.log("summaryHandler() called");
  let text = await getSummaryRequest(
    "The Russian president had been warned by the Russian security services at least two or three days ahead of time that Prigozhin was preparing a possible rebellion, according to intelligence assessments shared with The Washington Post. Steps were taken to boost security at several strategic facilities, including the Kremlin, where staffing in the presidential guard was increased and more weapons were handed out, but otherwise no actions were taken, these officials said.",
    100
  );
  console.log(text);
  // extract the article body
  const articleBodies = document.querySelectorAll(
    'p[data-testid="drop-cap-letter"]'
  );

  // get summary from API
  // var summaryGenerator = new SummaryGenerator();
  // var text = summaryGenerator.getSummary();
  // console.log(text);

  // Generate a summary
  const summaryDiv = document.createElement("div");
  summaryDiv.id = "short-summary-section";
  summaryDiv.innerText =
    "Summary Summary Summary Summary Summary Summary Summary";

  // insert a summary section before the article body
  const articleDiv = document.querySelector(".grid-body");
  articleDiv.parentNode.insertBefore(summaryDiv, articleDiv);
}

export function removeSummarySection() {
  const shortSummarySection = document.getElementById("short-summary-section");
  const mediumSummarySection = document.getElementById(
    "medium-summary-section"
  );
  if (shortSummarySection) {
    shortSummarySection.remove();
  }
  if (mediumSummarySection) {
    mediumSummarySection.remove();
  }
}
