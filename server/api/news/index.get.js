import prisma from "~/server/db";
export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const pQuery = {};
    if (query.featured) {
      pQuery.where = {
        featured: query.featured == "true" ? true : false,
      };
    }
    const news = await prisma.news.findMany(pQuery);
    return news;
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
