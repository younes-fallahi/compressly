import path from "path";
import fs from "fs";
import { MyContext } from "../types/custom-context";
import logger from "./logger";
const TEMP_DIR = path.join(__dirname, "../../tmp");
export const cleaner = async (ctx: MyContext) => {
  try {
    const chatId = ctx.chat?.id.toString();
    // check if there is any file left in the temp directory and remove it
    let filePath = path.join(TEMP_DIR, `image/input/${chatId}.jpg`);
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      logger.info(`Deleted file : ${filePath}`);
    }
    filePath = path.join(TEMP_DIR, `image/output/${chatId}.jpg`);
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      logger.info(`Deleted file : ${filePath}`);
    }
    filePath = path.join(TEMP_DIR, `image/input/${chatId}.png`);
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      logger.info(`Deleted file : ${filePath}`);
    }
    filePath = path.join(TEMP_DIR, `image/output/${chatId}.png`);
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      logger.info(`Deleted file : ${filePath}`);
    }
    filePath = path.join(TEMP_DIR, `pdf/input/${chatId}.pdf`);
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      logger.info(`Deleted file : ${filePath}`);
    }
    filePath = path.join(TEMP_DIR, `pdf/output/${chatId}.pdf`);
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      logger.info(`Deleted file : ${filePath}`);
    }
  } catch (error) {
    logger.error((error as Error).message);
  }
};
