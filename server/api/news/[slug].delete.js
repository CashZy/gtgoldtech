import prisma from "~/server/db";
import fs from "fs";
export default defineEventHandler(async (event) => {
  await isAuthenticated(event, true);
  try {
    const { fileUploadLocation } = useRuntimeConfig();
    const params = event.context.params;
    const id = params.slug;

    // find news
    let news = await prisma.news.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!news) {
      return createError({ statusCode: 401, statusMessage: "news not found" });
    }

    if (news.image) {
      const fileP = fileUploadLocation + "/news/" + news.image;
      fs.unlink(fileP, (err) => {});
    }

    news = await prisma.news.delete({
      where: {
        id: Number(id),
      },
    });

    return news;
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
