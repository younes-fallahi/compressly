import { Context } from "telegraf";
import { languageKeyboard } from "../keyboards/languageKeyboard";

export const changeLanguage = (ctx: Context) => {
  ctx.reply(
    "Please selePlease choose your preferred language: \n لطفا زبان مورد نظر خود را انتخاب کنید:",
    languageKeyboard()
  );
};
