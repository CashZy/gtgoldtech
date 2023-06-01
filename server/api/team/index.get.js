import formidable from "formidable";
import prisma from "~/server/db";
import isAuthenticated from "~/server/utils/isAuthenticated";

export default defineEventHandler(async (event) => {
  const { user } = await isAuthenticated(event, true);

  try {
    const userCommitions = await prisma.team.findMany({
      where: {
        userId: user.id,
      },
      // include: {
      //   user: {
      //     select: {
      //       nickName: true,
      //     },
      //   },
      // },
    });
    // console.log("<><><><>", userCommitions);
    return userCommitions;
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
