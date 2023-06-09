import prisma from "~/server/db";
import isAuthenticated from "~/server/utils/isAuthenticated";

export default defineEventHandler(async (event) => {
  const { user } = await isAuthenticated(event, true);

  try {
    const myteam = await prisma.myteam.findMany({
      where: {
        invitedbyId: user.id,
      },
    });
    // console.log("<><><><>", userCommitions);
    return myteam;
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
