import prisma from "~/server/db";
export default defineEventHandler(async (event) => {
  const { slug } = event.context.params;
  try {
    const news = await prisma.news.findUnique({
      where: {
        slug,
      },
    });
    if (!news) {
      return createError({ statusCode: 401, statusMessage: "news not found" });
    }
    return news;
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
