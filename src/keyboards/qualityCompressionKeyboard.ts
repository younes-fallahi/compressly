import { Markup } from "telegraf";
import { MyContext } from "../types/custom-context";

export const qualityCompressionKeyboard = (ctx: MyContext) => {
  return Markup.inlineKeyboard([
    [Markup.button.callback(ctx.polyglot.t("CH-QL"), "CH-QL")],
    [Markup.button.callback(ctx.polyglot.t("CM-QM"), "CM-QM")],
    [Markup.button.callback(ctx.polyglot.t("CL-QH"), "CL-QH")],
  ]);
};
