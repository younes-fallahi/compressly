import dotenv from "dotenv";
import { startBot } from "./bot";

// Load environment variables
dotenv.config();

async function main() {
  try {
    await startBot();
  } catch (err) {
    console.log(err);
  }
}

main();
