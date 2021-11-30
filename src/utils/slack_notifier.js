const { SLACK_WEBHOOK } = require("./config");
const slack = require("slack-notify")(SLACK_WEBHOOK);

slack.onError = function (err) {
  console.log("API error:", err);
};

export const slackpush = ({ firstName, lastName, chapel }) => {
  slack.alert({
    text: "Member Registration",
    attachments: [
      {
        fields: [
          { title: "Name", value: `${firstName} ${lastName}`, short: true },
          { title: "Chapel", value: chapel, short: true },
        ],
      },
    ],
  });
};
