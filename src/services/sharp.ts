import sharp from "sharp";
import fs from "fs";
import path from "path";
import logger from "../utils/logger";
import { MyContext } from "../types/custom-context";

export const compressImage = async (
  ctx: MyContext,
  inputFile: string,
  outputFile: string,
  quality: number,
  ext: string
) => {
  try {
    if (!fs.existsSync(inputFile)) {
      ctx.reply(ctx.polyglot.t("inputfileError"));
      return;
    }

    const compressMessage = await ctx.reply(ctx.polyglot.t("compressing"));
    const readStream = fs.createReadStream(inputFile);
    const writeStream = fs.createWriteStream(outputFile);

    await new Promise<void>((resolve, reject) => {
      let transformer;
      if (ext === ".jpg") {
        transformer = sharp().jpeg({ quality });
      } else if (ext === ".png") {
        transformer = sharp().png({ quality });
      } else {
        return;
      }

      readStream
        .pipe(transformer)
        .pipe(writeStream)
        .on("finish", resolve)
        .on("error", reject);
    });

    readStream.close();
    writeStream.close();

    logger.info(
      `image successfully compressed ${path.basename(
        inputFile
      )} => ${path.basename(outputFile)} `
    );
    await ctx.deleteMessage(compressMessage.message_id);
  } catch (error) {
    logger.error((error as Error).message);
  }
};
