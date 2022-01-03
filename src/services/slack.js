const { IncomingWebhook } = require("@slack/webhook");
const { SLACK_WEBHOOK } = require("../utils/config");

const webhook = new IncomingWebhook(SLACK_WEBHOOK);

const registration = async (name, chapel, type) =>
  await webhook.send({
    text: `${type} Registration`,
    attachments: [
      {
        fields: [
          { title: "Name", value: name, short: true },
          { title: "Chapel", value: chapel, short: true },
        ],
      },
    ],
  });

const memberDetailsUpdate = async (name) =>
  await webhook.send({
    text: "Member Details Update",
    attachments: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: name,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: "*New:*\nPaid Time Off",
          },
        ],
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: "*Old:*\nPaid Time Off",
          },
        ],
      },
    ],
  });

const general = async () =>
  await webhook.send({
    icon_url:
      "https://www.google.com.gh/imgres?imgurl=https%3A%2F%2Fwww.clipartmax.com%2Fpng%2Fmiddle%2F199-1998466_slack-icon-slack-logo.png&imgrefurl=https%3A%2F%2Fwww.clipartmax.com%2Fmiddle%2Fm2i8b1d3m2N4H7K9_slack-icon-slack-logo%2F&tbnid=Pu1eHNYXnx8o-M&vet=12ahUKEwi87qj2qMf0AhWJ0oUKHegVDbkQMygGegUIARDVAQ..i&docid=Nby-1lGU8GUrmM&w=840&h=592&itg=1&q=slaCK&hl=en&ved=2ahUKEwi87qj2qMf0AhWJ0oUKHegVDbkQMygGegUIARDVAQ",
    text: "Here is my notification",
    attachments: [
      {
        fallback: "Required Fallback String",
        fields: [
          { title: "CPU usage", value: "7.51%", short: true },
          { title: "Memory usage", value: "254mb", short: true },
        ],
      },
    ],
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Hello, Assistant to the Regional Manager Dwight! *Michael Scott* wants to know where you'd like to take the Paper Company investors to dinner tonight.\n\n *Please select a restaurant:*",
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Farmhouse Thai Cuisine*\n:star::star::star::star: 1528 reviews\n They do have some vegan options, like the roti and curry, plus they have a ton of salad stuff and noodles can be ordered without meat!! They have something for everyone here",
        },
        accessory: {
          type: "image",
          image_url:
            "https://s3-media3.fl.yelpcdn.com/bphoto/c7ed05m9lC2EmA3Aruue7A/o.jpg",
          alt_text: "alt text for image",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Kin Khao*\n:star::star::star::star: 1638 reviews\n The sticky rice also goes wonderfully with the caramelized pork belly, which is absolutely melt-in-your-mouth and so soft.",
        },
        accessory: {
          type: "image",
          image_url:
            "https://s3-media2.fl.yelpcdn.com/bphoto/korel-1YjNtFtJlMTaC26A/o.jpg",
          alt_text: "alt text for image",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Ler Ros*\n:star::star::star::star: 2082 reviews\n I would really recommend the  Yum Koh Moo Yang - Spicy lime dressing and roasted quick marinated pork shoulder, basil leaves, chili & rice powder.",
        },
        accessory: {
          type: "image",
          image_url:
            "https://s3-media2.fl.yelpcdn.com/bphoto/DawwNigKJ2ckPeDeDM7jAg/o.jpg",
          alt_text: "alt text for image",
        },
      },
      {
        type: "divider",
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Farmhouse",
              emoji: true,
            },
            value: "click_me_123",
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Kin Khao",
              emoji: true,
            },
            value: "click_me_123",
            url: "https://google.com",
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Ler Ros",
              emoji: true,
            },
            value: "click_me_123",
            url: "https://google.com",
          },
        ],
      },
    ],
  });

module.exports = {
  registration,
  general,
  memberDetailsUpdate,
};
