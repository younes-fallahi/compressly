import Polyglot from "node-polyglot";
import { Markup } from "telegraf";

export const mainKeyboard = (polyglot: Polyglot) => {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback(polyglot.t("pdf-btn"), "compressPdf"),
      Markup.button.callback(polyglot.t("img-btn"), "compressImage"),
    ],
    [Markup.button.callback(polyglot.t("change-language"), "change_language")],
  ]);
};
