import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { start } from "./commands/start";
import { errorHandler } from "./middlewares/errorHandler";
import logger from "./utils/logger";
import { MyContext } from "./types/custom-context";
import { addPolyglot } from "./middlewares/addPolyglot";
import { queryHandler } from "./handlers/queryHandler";
import { saveImage } from "./utils/image-utils/saveImage";
dotenv.config();

export async function startBot() {
  const bot = new Telegraf<MyContext>(process.env.BOT_TOKEN || "");

  // middlewares
  bot.use(errorHandler);
  bot.use(addPolyglot);

  // commands
  bot.command("start", start);

  // handlers
  bot.on("callback_query", queryHandler);
  bot.on("photo", saveImage);

  bot.launch(() => {
    logger.info("bot has been launched !");
  });
}
