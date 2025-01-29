import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { start } from "./commands/start";
import { errorHandler } from "./middlewares/errorHandler";
dotenv.config();

export async function startBot() {
  const bot = new Telegraf(process.env.BOT_TOKEN!);

  // middlewares
  bot.use(errorHandler);

  // commands
  bot.command("start", start);

  bot.launch();
}
