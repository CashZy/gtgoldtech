import prisma from "~/server/db";
import isAuthenticated from "~/server/utils/isAuthenticated";

export default defineEventHandler(async (event) => {
  try {
    const { user } = await isAuthenticated(event);

    const team = await prisma.user.findUnique({
      where: {
        phone: user.phone,
      },
      include: {
        team: {
          select: {
            id: true,
            avatar: true,
            createdAt: true,
            phone: true,
          },
        },
      },
    });
    return { team: team.team };
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
