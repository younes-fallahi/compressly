import { Context, MiddlewareFn } from "telegraf";
import logger from "../utils/logger";

export const errorHandler: MiddlewareFn<Context> = async (ctx, next) => {
  try {
    await next(); 
  } catch (error) {
    logger.error(`from error handler : ${(error as Error).message}`);
  }
};
