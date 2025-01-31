import Polyglot from "node-polyglot";
import { MyContext } from "../types/custom-context";
import { Markup } from "telegraf";

export const mainKeyboard = (polyglot: Polyglot) => {
  return Markup.inlineKeyboard([
    [Markup.button.callback(polyglot.t("pdf-btn"), "compressPdf")],
    [Markup.button.callback(polyglot.t("img-btn"), "compressImage")],
  ]);
};
