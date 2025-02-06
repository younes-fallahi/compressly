import path from "path";
import fs from "fs";
import { MyContext } from "../types/custom-context";
import { compressImage } from "../services/sharp";
import { compressPdf } from "../services/ghostscript";
import logger from "../utils/logger";
import { upload } from "../utils/uploader";
import { cleaner } from "../utils/cleaner";

const PDF_DIR = path.join(__dirname, "../../tmp/pdf");
const IMAGE_DIR = path.join(__dirname, "../../tmp/image/");
export const compress = async (ctx: MyContext, quality: number) => {
  try {
    const chatId = ctx.chat?.id.toString();

    let inputPath = "";
    let outputPath = "";

    if (fs.existsSync(path.join(IMAGE_DIR, `input/${chatId}.jpg`))) {
      inputPath = path.join(IMAGE_DIR, `input/${chatId}.jpg`);
      outputPath = path.join(IMAGE_DIR, `output/${chatId}.jpg`);
      await compressImage(ctx, inputPath, outputPath, quality, ".jpg");
      if (fs.existsSync(outputPath)) {
        await upload(ctx, outputPath, "jpg");
      }
      await cleaner(ctx);
    } else if (fs.existsSync(path.join(IMAGE_DIR, `input/${chatId}.png`))) {
      inputPath = path.join(IMAGE_DIR, `input/${chatId}.png`);
      outputPath = path.join(IMAGE_DIR, `output/${chatId}.png`);
      await compressImage(ctx, inputPath, outputPath, quality, ".png");
      if (fs.existsSync(outputPath)) {
        await upload(ctx, outputPath, "png");
      }
      await cleaner(ctx);
    } else {
      inputPath = path.join(PDF_DIR, `input/${chatId}.pdf`);
      outputPath = path.join(PDF_DIR, `output/${chatId}.pdf`);
      await compressPdf(ctx, inputPath, outputPath, quality);
      if (fs.existsSync(outputPath)) {
        await upload(ctx, outputPath, "pdf");
      }
      await cleaner(ctx);
    }
  } catch (error) {
    logger.error((error as Error).message);
  }
};
