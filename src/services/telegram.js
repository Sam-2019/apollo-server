const { Telegraf } = require("telegraf");
const { TELEGRAM_TOKEN } = require("../utils/config");

const bot = new Telegraf(TELEGRAM_TOKEN);
bot.use(Telegraf.log());

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

const sendMessage = (name) => {
  if (!name) return;

  bot.on((ctx) => ctx.reply(`${name} successfully registered`));
};

bot.command("getMember", (ctx) => {
  const data = ctx.message.text.slice(11);
  // console.log(data);
  // ctx.reply("Enter member's name");
  // console.log(ctx.message.text);
});

process.once("SIGTERM", () => bot.stop("SIGTERM"));

module.exports = {
  bot,
  sendMessage,
};
