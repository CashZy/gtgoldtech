import prisma from "~/server/db";
import isAuthenticated from "~/server/utils/isAuthenticated";
export default defineEventHandler(async (event) => {
  try {
    const { user } = await isAuthenticated(event, true);
    const query = getQuery(event);
    const pQuery = {};
    const deposit = await prisma.deposit.findMany(pQuery);
    // console.log("use12id:" , user)
    return deposit;
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
