import { MyContext } from "../types/custom-context";
import prisma from "../utils/prisma";
import { initPolyglot } from "../utils/polyglot";
import logger from "../utils/logger";

export const createUser = async (
  id: string,
  name: string,
  username: string,
  language: string = "en"
) => {
  let user = await prisma.user.create({
    data: {
      id,
      name,
      username,
      language,
      createdAt: new Date(),
    },
  });
  logger.info(`User created successfully : \n ${user}`);
};

export const getUser = async (id: string) => {
  return await prisma.user.findUnique({ where: { id } });
};

export const changeLanguage = async (ctx: MyContext, language: string) => {
  const id = ctx.chat?.id.toString();
  ctx.polyglot = initPolyglot(language);
  await prisma.user.update({
    where: { id },
    data: { language },
  });
};
