import { Context } from "telegraf";
import { createUser, getUser } from "../services/userService";
import { MyContext } from "../types/custom-context";
import { mainKeyboard } from "../keyboards/mainKeyboard.ts";
import { languageKeyboard } from "../keyboards/languageKeyBoard";
import logger from "../utils/logger";
import { cleaner } from "../utils/cleaner";

export const start = async (ctx: MyContext) => {
  try {
    if (ctx.chat?.type === "private") {
      const chatId = ctx.chat.id.toString();

      // check if we have the user in our database (if not create user)
      let user = await getUser(chatId);
      if (user === null) {
        const name = ctx.chat.first_name || "";
        const username = ctx.chat.first_name || "";
        createUser(chatId, name, username);
        ctx.reply(
          "Welcome to Compressly,\n 🌎Please select you preferred langauge:",
          languageKeyboard()
        );
      } else {
        if (ctx.polyglot) {
          ctx.reply(ctx.polyglot.t("mainKeyboard"), mainKeyboard(ctx.polyglot));
        }
      }
      await cleaner(ctx);
    }
  } catch (error) {
    logger.error((error as Error).message);
  }
};
