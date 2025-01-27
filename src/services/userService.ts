import prisma from "../utils/prisma";

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
  console.log(user);
};

export const getUser = async (id: string) => {
  return await prisma.user.findUnique({ where: { id } });
};
