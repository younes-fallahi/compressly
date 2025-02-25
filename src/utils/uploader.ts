import { MyContext } from "../types/custom-context";

export const upload = async (ctx: MyContext, source: string, type: string) => {
  const uploadingMessage = await ctx.reply(ctx.polyglot.t("uploading"));
  if (type === "jpg") {
    await ctx.sendPhoto(
      { source },
      { caption: ctx.polyglot.t("image-caption") }
    );
  } else if (type === "png") {
    await ctx.sendDocument(
      { source },
      { caption: ctx.polyglot.t("image-caption") }
    );
  } else {
    await ctx.sendDocument(
      { source },
      { caption: ctx.polyglot.t("pdf-caption") }
    );
  }
  await ctx.deleteMessage(uploadingMessage.message_id);
};
