import { Telegraf } from "telegraf";
import { startCommand } from "./start";

export const allCommands = async (bot: Telegraf) => {
  try {
    bot.command("start", startCommand);
  } catch (err) {
    console.log(err);
  }
};
