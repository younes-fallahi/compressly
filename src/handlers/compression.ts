import path from "path";
import fs from "fs";
import { MyContext } from "../types/custom-context";

import { compressImage } from "../services/sharp";
import { compressPdf } from "../services/ghostscript";

const PDF_DIR = path.join(__dirname, "../../tmp/pdf");
const IMAGE_DIR = path.join(__dirname, "../../tmp/image/");
export const compress = async (ctx: MyContext, quality: number) => {
  try {
    const chatId = ctx.chat?.id.toString();

    const polyglot = ctx.polyglot;
    if (!polyglot) {
      return;
    }
    let inputPath = "";
    let outputPath = "";

    if (fs.existsSync(path.join(IMAGE_DIR, `input/${chatId}.jpg`))) {
      inputPath = path.join(IMAGE_DIR, `input/${chatId}.jpg`);
      outputPath = path.join(IMAGE_DIR, `output/${chatId}.jpg`);
      await compressImage(inputPath, outputPath, quality, ".jpg");
    } else if (fs.existsSync(path.join(IMAGE_DIR, `input/${chatId}.png`))) {
      inputPath = path.join(IMAGE_DIR, `input/${chatId}.png`);
      outputPath = path.join(IMAGE_DIR, `output/${chatId}.png`);
      await compressImage(inputPath, outputPath, quality, ".png");
    } else {
      inputPath = path.join(PDF_DIR, `input/${chatId}.pdf`);
      outputPath = path.join(PDF_DIR, `output/${chatId}.pdf`);
      await compressPdf(inputPath, outputPath, quality);
    }
  } catch (error) {
    console.log(error);
  }
};
