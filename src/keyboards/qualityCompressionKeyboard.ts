import { Markup } from "telegraf";
import { MyContext } from "../types/custom-context";

export const qualityCompressionKeyboard = (ctx: MyContext) => {
  const polyglot = ctx.polyglot;
  if (!polyglot) {
    return;
  }
  return Markup.inlineKeyboard([
    [Markup.button.callback(polyglot.t("CH-QL"), "CH-QL")],
    [Markup.button.callback(polyglot.t("CM-QM"), "CM-QM")],
    [Markup.button.callback(polyglot.t("CL-QH"), "CL-QH")],
  ]);
};
