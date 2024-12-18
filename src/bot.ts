import { Telegraf } from "telegraf";

export function startBot() {
  const bot = new Telegraf(process.env.BOT_TOKEN!);

  bot.start((ctx) => ctx.reply("Welcome to Compressly Bot!"));

  bot.launch();
  console.log("Bot is running...");
}
