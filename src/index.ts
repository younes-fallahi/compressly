import { startBot } from "./bot";

async function main() {
  try {
    await startBot();
    console.log("bot is running...");
  } catch (err) {
    console.log(err);
  }
}
main();
