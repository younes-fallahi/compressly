import { Context, Telegraf } from "telegraf";
import { CallbackQuery as CallbackQueryType } from "telegraf/typings/core/types/typegram";
import { changeLanguage } from "./changeLanguage";

export const QueryHandler = async (ctx: Context) => {
  await ctx.deleteMessage();
  const callbackQuery = ctx.callbackQuery as CallbackQueryType.DataQuery;
  const queryData = callbackQuery.data;
  switch (queryData) {
    case "changeLanguage":
      changeLanguage(ctx);
      break;
    default:
      break;
  }
};
