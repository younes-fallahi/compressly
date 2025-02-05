import { MyContext } from "../types/custom-context";
import { Markup } from "telegraf";

export const returnKeyboard = (ctx: MyContext) => {
  const polyglot = ctx.polyglot;
  if (!polyglot) {
    return;
  }
  return Markup.inlineKeyboard([
    [Markup.button.callback(polyglot.t("return-btn"), "return")],
  ]);
};
