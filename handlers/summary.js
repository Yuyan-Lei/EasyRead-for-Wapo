import { getSummaryRequest } from "../api/openAI.js";
// import { } from "../api/openAI.js";
export async function getSummary() {
  let text = await getSummaryRequest(
    "The Russian president had been warned by the Russian security services at least two or three days ahead of time that Prigozhin was preparing a possible rebellion, according to intelligence assessments shared with The Washington Post. Steps were taken to boost security at several strategic facilities, including the Kremlin, where staffing in the presidential guard was increased and more weapons were handed out, but otherwise no actions were taken, these officials said.",
    100
  );
  console.log(text);
}
