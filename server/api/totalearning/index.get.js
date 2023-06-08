import prisma from "~/server/db";
import isAuthenticated from "~/server/utils/isAuthenticated";
export default defineEventHandler(async (event) => {
  const { user } = await isAuthenticated(event, true);

  try {
    const totalearning = await prisma.earnings.findFirst({
      where: { userId: Number(user.id) },
    });
    // console.log("getwithdrew:" , withdrew)
    return totalearning;
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
