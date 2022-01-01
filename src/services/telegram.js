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

process.once("SIGTERM", () => bot.stop("SIGTERM"));

module.exports = {
  bot,
};
