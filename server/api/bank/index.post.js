import prisma from "~/server/db";
import isAuthenticated from "~/server/utils/isAuthenticated";

export default defineEventHandler(async (event) => {
  try {
    const { user } = await isAuthenticated(event);
    const { name, bank, account, ifsc } = await readBody(event);

    const { card } = await prisma.user.findUnique({
      where: {
        phone: user.phone,
      },
      include: {
        card: true,
      },
    });

    if (!card) {
      const addCard = await prisma.bank.create({
        data: {
          name,
          bank,
          account,
          ifsc,
          userId: user.id,
        },
      });

      return { card: addCard };
    } else {
      const updateCard = await prisma.bank.update({
        where: {
          userId: user.id,
        },
        data: {
          name,
          bank,
          account,
          ifsc,
        },
      });

      return { card: updateCard };
    }
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
