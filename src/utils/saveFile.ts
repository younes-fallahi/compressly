import { Message } from "telegraf/types";
import { MyContext } from "../types/custom-context";
import path from "path";
import { downloadFile } from "./downloadFile";
import { qualityCompressionKeyboard } from "../keyboards/qualityCompressionKeyboard";
import logger from "./logger";

const TEMP_DIR = path.join(__dirname, "../../tmp");

export const saveFile = async (ctx: MyContext) => {
  try {
    const message = ctx.message as Message.DocumentMessage;
    const chatId = ctx.chat?.id.toString();
    if (!chatId) {
      return;
    }
    const document = message.document;
    if (!document || !document.mime_type) {
      return;
    }
    const mimeType = document.mime_type;
    const fileSizeMB = (document.file_size || 0) / (1024 * 1024);

    if (fileSizeMB > 50) {
      return ctx.reply("File size should be less than 50MB");
    }

    const fileId = document.file_id;

    const file = await ctx.telegram.getFile(fileId);
    const fileUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file.file_path}`;

    let filePath = "";

    if (mimeType === "image/png") {
      filePath = path.join(TEMP_DIR, `image/input/${chatId}.png`);
      await downloadFile(fileUrl, filePath);
    } else if (mimeType === "application/pdf") {
      filePath = path.join(TEMP_DIR, `pdf/input/${chatId}.pdf`);
      await downloadFile(fileUrl, filePath);
    } else {
      ctx.reply("Unsupported file type");
      return;
    }
    if (!ctx.polyglot) {
      return;
    }
    ctx.reply(
      ctx.polyglot?.t("askForCQlevel"),
      qualityCompressionKeyboard(ctx)
    );
  } catch (error) {
    logger.error((error as Error).message);
  }
};
