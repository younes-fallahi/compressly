import { Context } from "telegraf";

export const start = async (ctx: Context) => {
  // only handling users for now (not groups)
  if (ctx.chat?.type === "private") {
    const chatId = ctx.chat.id;

    // check if we have the user in our database

    // check the user prefered language

    // the main keyboard
  }
};
