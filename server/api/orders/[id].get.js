import prisma from "~/server/db";
export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  try {
    const orders = await prisma.order.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!orders) {
      return createError({
        statusCode: 401,
        statusMessage: "orders not found",
      });
    }
    return orders;
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
