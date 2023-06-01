import prisma from "~/server/db";
import isAuthenticated from "~/server/utils/isAuthenticated";

export default defineEventHandler(async (event) => {
  try {
    const { user } = await isAuthenticated(event);
    const data = await prisma.bank.findUnique({
      where: {
        userId: (user.id),
      },
    });
    // console.log("2222222222" , data);
    return { data };
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
