const { Telegraf } = require("telegraf");
const { TELEGRAM_TOKEN } = require("../utils/config");
const { TWITTER_LINK } = require("../utils/constants");
const { checkTwiter } = require("../utils");

const bot = new Telegraf(TELEGRAM_TOKEN);
bot.launch();

// bot.use(Telegraf.log());

bot.start((ctx) => {
  ctx.reply("Hello " + ctx.from.first_name + "!");
});

bot.help((ctx) => {
  ctx.reply("Send /start to receive a greeting");
  ctx.reply("Send /keyboard to receive a message with a keyboard");
  ctx.reply("Send /quit to stop the bot");
});

bot.command("quit", (ctx) => {
  ctx.reply("Session ended");
});

const sendMessage = (name, type) => {
  if (!name) return;

  if (type === "member") {
    return bot.on((ctx) =>
      ctx.reply(`${name} successfully registered as a amember.`)
    );
  }

  bot.on((ctx) => ctx.reply(`${name} successfully registered as a visitor.`));
};

// bot.command("getMember", (ctx) => {
//   const data = ctx.message.text.slice(11);
//   console.log(data);
//   ctx.reply("Enter member's name");
//   console.log(ctx.message.text);
// });

bot.on("text", async (ctx) => {
  const data = ctx.message.text;

  if (!data) {
    ctx.reply("No message");
  }

  if (data.includes(TWITTER_LINK)) {
    const info = await checkTwiter(data);
    return ctx.reply(info);
  }

  return null;
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

module.exports = {
  bot,
  sendMessage,
};
