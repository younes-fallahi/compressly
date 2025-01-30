import { MiddlewareFn } from "telegraf";
import { MyContext } from "../types/custom-context";
import { getUser } from "../services/userService";
import { initPolyglot } from "../utils/polyglot";

export const addPolyglot: MiddlewareFn<MyContext> = async (ctx, next) => {
  if (!ctx.chat?.id) {
    return next();
  }

  const chatId = ctx.chat.id.toString();

  const user = await getUser(chatId);

  const language = user?.language;

  ctx.polyglot = initPolyglot(language);

  return next();
};
