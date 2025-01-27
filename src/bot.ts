import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { start } from "./commands/start";
dotenv.config();

export async function startBot() {
  const bot = new Telegraf(process.env.BOT_TOKEN!);
  bot.command("start", start);
  // bot.on("message", (ctx) => console.log(ctx));
  bot.launch();
}
