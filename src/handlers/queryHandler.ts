import { CallbackQuery as CallbackQueryType } from "telegraf/typings/core/types/typegram";
import { MyContext } from "../types/custom-context";
import { changeLanguage } from "../services/userService";
import { start } from "../commands/start";
import { languageKeyboard } from "../keyboards/languageKeyBoard";
import { compress } from "./compression";
import logger from "../utils/logger";
import { returnKeyboard } from "../keyboards/returnKeyboard";

export const queryHandler = async (ctx: MyContext) => {
  const callbackQuery = ctx.callbackQuery as CallbackQueryType.DataQuery;
  const queryData = callbackQuery.data;
  await ctx.answerCbQuery();
  ctx.deleteMessage();

  const chatId = ctx.chat?.id.toString();
  try {
    if (chatId) {
      switch (queryData) {
        case "lang_en":
          await changeLanguage(ctx, "en");
          await start(ctx);
          break;
        case "lang_fa":
          await changeLanguage(ctx, "fa");
          await start(ctx);
          break;
        case "change_language":
          ctx.reply("Please select your language : ", languageKeyboard());
          break;
        case "compressPdf":
          ctx.reply(ctx.polyglot?.t("askForPdf") || "", returnKeyboard(ctx));
          break;
        case "compressImage":
          ctx.reply(ctx.polyglot?.t("askForImage") || "", returnKeyboard(ctx));
          break;
        case "CH-QL":
          await compress(ctx, 25);
          await start(ctx);
          break;
        case "CM-QM":
          await compress(ctx, 50);
          await start(ctx);
          break;
        case "CL-QH":
          await compress(ctx, 75);
          await start(ctx);
          break;
        case "return":
          await start(ctx);
          break;
        default:
          break;
      }
    }
  } catch (error) {
    logger.error((error as Error).message);
  }
};
