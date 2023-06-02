import prisma from "~/server/db";

export default defineEventHandler(async (event) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true, // Include the related user field
        product: true, // Include the related product field
        // Include the related coupon field
      },
    });
    // console.log("orderss", orders);
    return orders;
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
