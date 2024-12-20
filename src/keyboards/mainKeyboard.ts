import { Markup } from "telegraf";
import Polyglot from "node-polyglot";

export const mainKeyboard = (polyglot: Polyglot) => {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback(polyglot.t("pdf-btn"), "compressPDF"),
      Markup.button.callback(polyglot.t("image-btn"), "compressImage"),
    ],
    [Markup.button.callback(polyglot.t("contact-btn"), "contact-us")],
    [Markup.button.callback(polyglot.t("language-btn"), "changeLanguage")],
  ]);
};
