import { Telegraf } from "telegraf";
import { TELEGRAM_TOKEN } from "../utils/config.js";
import { jobTransformer } from "../utils/linkPreview.js";

const bot = new Telegraf(TELEGRAM_TOKEN);
// bot.launch();

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

const telegramAlert = (name, type) => {
  if (!name) return;

  bot.on((ctx) => ctx.reply(`${name} successfully registered  as a ${type}`));
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

  const info = await jobTransformer(data);
  return ctx.reply(info);
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

export { bot, telegramAlert };
