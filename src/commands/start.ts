import { Context } from "telegraf";
import { createUser, getUser } from "../services/userService";
import { MyContext } from "../types/custom-context";
import { mainKeyboard } from "../keyboards/main";

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
      }

      // check the user prefered language
     
      if (ctx.polyglot) {
        ctx.reply(ctx.polyglot.t("welcome"), mainKeyboard(ctx.polyglot));
      }
    }
  } catch (error) {
    console.log(error);
  }
};
