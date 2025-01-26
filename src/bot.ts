import { Telegraf } from "telegraf";
import dotenv from "dotenv";
dotenv.config();

export async function  startBot() {
  const bot = new Telegraf(process.env.BOT_TOKEN!);
  bot.on("message", (ctx) => {
    ctx.reply("welcome");
  });

  bot.launch()
}
