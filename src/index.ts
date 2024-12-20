import dotenv from "dotenv";
import { startBot } from "./bot";

// Load environment variables
dotenv.config();

async function main() {
  try {
    startBot();
  } catch (err) {
    console.log(err);
  }
}

main();
