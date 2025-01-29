import { startBot } from "./bot";
import logger from "./utils/logger";

async function main() {
  try {
    await startBot();
  } catch (error) {
    logger.error(`Application failed to start: ${(error as Error).message}`);
  }
}
main();
