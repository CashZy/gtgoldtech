import prisma from "~/server/db";
import isAuthenticated from "~/server/utils/isAuthenticated";
export default defineEventHandler(async (event) => {
  try {
    const { user } = await isAuthenticated(event, true);
    const query = getQuery(event);
    const pQuery = {};
    const withdrew = await prisma.withdrew.findMany(pQuery);
    // console.log("getwithdrew:" , withdrew)
    return withdrew;
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
