import path from "path";
import { Message } from "telegraf/types";
import { MyContext } from "../types/custom-context";
import { downloadFile } from "./downloadFile";
import { qualityCompressionKeyboard } from "../keyboards/qualityCompressionKeyboard";
import logger from "./logger";
import { cleaner } from "./cleaner";

const TEMP_DIR = path.join(__dirname, "../../tmp");

export const saveImage = async (ctx: MyContext) => {
  try {
    cleaner(ctx);
    const message = ctx.message as Message.PhotoMessage;

    const chatId = ctx.chat?.id.toString();

    const photoArray = message.photo;
    if (!photoArray) {
      return;
    }

    const photo = photoArray[photoArray.length - 1];
    const fileId = photo.file_id;

    const file = await ctx.telegram.getFile(fileId);
    const fileUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file.file_path} `;

    const filePath = path.join(TEMP_DIR, `image/input/${chatId}.jpg`);
    const statusMessage = await ctx.reply(ctx.polyglot?.t("downloading"));
    await downloadFile(fileUrl, filePath);
    await ctx.deleteMessage(statusMessage.message_id);

    ctx.reply(
      ctx.polyglot?.t("askForCQlevel"),
      qualityCompressionKeyboard(ctx)
    );
  } catch (error) {
    logger.error((error as Error).message);
  }
};
