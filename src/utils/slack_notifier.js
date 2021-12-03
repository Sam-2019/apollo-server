const { SLACK_WEBHOOK } = require("./config");
const slack = require("slack-notify")(SLACK_WEBHOOK);

slack.onError = function (err) {
  console.log("API error:", err);
};

const slackpush = (name, chapel) => {
  slack.alert({
    text: "Member Registration",
    attachments: [
      {
        fields: [
          { title: "Name", value: name, short: true },
          { title: "Chapel", value: chapel, short: true },
        ],
      },
    ],
  });
};

module.exports = {
  slackpush,
};
