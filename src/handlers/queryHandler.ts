import { CallbackQuery as CallbackQueryType } from "telegraf/typings/core/types/typegram";
import { MyContext } from "../types/custom-context";

export const queryHandler = async (ctx: MyContext) => {
  const callbackQuery = ctx.callbackQuery as CallbackQueryType.DataQuery;
  const queryData = callbackQuery.data;

  console.log(queryData);
};
