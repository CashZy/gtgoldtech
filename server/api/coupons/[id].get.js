import prisma from "~/server/db";
export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  try {
    const coupons = await prisma.coupon.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!coupons) {
      return createError({
        statusCode: 401,
        statusMessage: "coupons not found",
      });
    }
    return coupons;
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
