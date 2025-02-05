import path from "path";
import fs from "fs";
import { MyContext } from "../types/custom-context";
import { compressImage } from "../services/sharp";
import { compressPdf } from "../services/ghostscript";
import logger from "../utils/logger";

const PDF_DIR = path.join(__dirname, "../../tmp/pdf");
const IMAGE_DIR = path.join(__dirname, "../../tmp/image/");
export const compress = async (ctx: MyContext, quality: number) => {
  try {
    const chatId = ctx.chat?.id.toString();

    if (!ctx.polyglot) {
      return;
    }

    let inputPath = "";
    let outputPath = "";

    if (fs.existsSync(path.join(IMAGE_DIR, `input/${chatId}.jpg`))) {
      inputPath = path.join(IMAGE_DIR, `input/${chatId}.jpg`);
      outputPath = path.join(IMAGE_DIR, `output/${chatId}.jpg`);
      const compressMessage = await ctx.reply(ctx.polyglot.t("compressing"));
      await compressImage(inputPath, outputPath, quality, ".jpg");
      await ctx.deleteMessage(compressMessage.message_id);
      const uploadingMessage = await ctx.reply(ctx.polyglot.t("uploading"));
      await ctx.sendPhoto(
        { source: outputPath },
        { caption: ctx.polyglot.t("image-caption") }
      );
      await ctx.deleteMessage(uploadingMessage.message_id);
      await fs.promises.unlink(inputPath);
      await fs.promises.unlink(outputPath);
    } else if (fs.existsSync(path.join(IMAGE_DIR, `input/${chatId}.png`))) {
      inputPath = path.join(IMAGE_DIR, `input/${chatId}.png`);
      outputPath = path.join(IMAGE_DIR, `output/${chatId}.png`);
      const compressMessage = await ctx.reply(ctx.polyglot.t("compressing"));
      await compressImage(inputPath, outputPath, quality, ".png");
      await ctx.deleteMessage(compressMessage.message_id);
      const uploadingMessage = await ctx.reply(ctx.polyglot.t("uploading"));
      await ctx.sendDocument(
        { source: outputPath },
        { caption: ctx.polyglot.t("image-caption") }
      );
      await ctx.deleteMessage(uploadingMessage.message_id);
      await fs.promises.unlink(inputPath);
      await fs.promises.unlink(outputPath);
    } else {
      inputPath = path.join(PDF_DIR, `input/${chatId}.pdf`);
      outputPath = path.join(PDF_DIR, `output/${chatId}.pdf`);
      const compressMessage = await ctx.reply(ctx.polyglot.t("compressing"));
      await compressPdf(inputPath, outputPath, quality);
      await ctx.deleteMessage(compressMessage.message_id);
      const uploadingMessage = await ctx.reply(ctx.polyglot.t("uploading"));
      await ctx.sendDocument(
        { source: outputPath },
        { caption: ctx.polyglot.t("pdf-caption") }
      );
      await ctx.deleteMessage(uploadingMessage.message_id);
      await fs.promises.unlink(inputPath);
      await fs.promises.unlink(outputPath);
    }
  } catch (error) {
    logger.error((error as Error).message);
  }
};
