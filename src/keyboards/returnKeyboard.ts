import { MyContext } from "../types/custom-context";
import { Markup } from "telegraf";

export const returnKeyboard = (ctx: MyContext) => {
  return Markup.inlineKeyboard([
    [Markup.button.callback(ctx.polyglot.t("return-btn"), "return")],
  ]);
};
