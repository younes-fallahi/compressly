import { Telegraf } from "telegraf";
import { startCommand } from "./commands/start";
import { allCommands } from "./commands";
import { QueryHandler } from "./handlers";

export function startBot() {
  const bot = new Telegraf(process.env.BOT_TOKEN!);
  allCommands(bot);
  bot.on("callback_query", QueryHandler);

  bot.launch();
  console.log("Bot is running...");
}
