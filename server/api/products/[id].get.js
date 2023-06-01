import prisma from "~/server/db";
export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  try {
    const products = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!products) {
      return createError({ statusCode: 401, statusMessage: "products not found" });
    }
    return products;
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
