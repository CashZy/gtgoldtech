import prisma from "~/server/db";
export default defineEventHandler(async (event) => {
  const params = event.context.params;
  const id = params.id;
  try {
    const deposit = await prisma.deposit.findMany({
      where: {
        userId: Number(id),
      },
    });
    return deposit;
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
