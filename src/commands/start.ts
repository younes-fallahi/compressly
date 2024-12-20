import prisma from "../db/prisma";
import { Context } from "telegraf";
import { languageKeyboard } from "../keyboards/languageKeyboard";
import initPolyglot from "../utils/i18n";
import Polyglot from "node-polyglot";
import { mainKeyboard } from "../keyboards/mainKeyboard";

export const startCommand = async (ctx: Context) => {
  const chatId = ctx.chat?.id.toString();
  if (!chatId) {
    return;
  }
  let name = "Unknown";
  let username = "";
  if (ctx.chat?.type === "private") {
    name = ctx.chat.first_name || "Unknown";
    username = ctx.chat.username || "";
  }
  let user = await prisma.user.findUnique({ where: { id: chatId } });

  if (user === null) {
    user = await prisma.user.create({
      data: {
        id: chatId,
        name,
        username,
        language: "en", // Default language
        createdAt: new Date(),
      },
    });
    console.log(user);
    await ctx.reply(
      "Please selePlease choose your preferred language: \n لطفا زبان مورد نظر خود را انتخاب کنید:",
      languageKeyboard()
    );
  }
  const polyglot = initPolyglot(user.language);

  await ctx.reply(polyglot.t("start"), mainKeyboard(polyglot));
};
