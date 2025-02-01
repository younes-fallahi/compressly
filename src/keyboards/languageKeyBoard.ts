import { Markup } from "telegraf";

export const languageKeyboard = () => {
  return Markup.inlineKeyboard([
    [Markup.button.callback("English", "lang_en")],
    [Markup.button.callback("پارسی", "lang_fa")],
  ]);
};
