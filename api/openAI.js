class GPTInterface {
  constructor() {
    this.api = new XMLHttpRequest();
    this.api.setRequestHeader(
      "Authorization",
      "Bearer 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"
    );
    this.api.open("get", "https://api.openai.com/v1/chat/completions");
  }
}

// TODO: other classes implemented here
class SummaryGenerator extends GPTInterface {
  constructor() {
    super();
  }

  getSummary(text, length) {
    const urlParams = URLSearchParams({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a news article summary generator" },
        {
          role: "user",
          content: `In ${length} words, accurately summarize this article: ${text}`,
        },
      ],
      temperature: 0.2,
    });
    this.api.send(urlParams);
    this.api.onload = function () {
      if (this.status === 200) {
        console.log(this.response);
        return this.response;
      } else {
        console.error("Request failed!", this.status, this.response);
        return this.status;
      }
    };
  }
}
