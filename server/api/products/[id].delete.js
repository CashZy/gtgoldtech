import prisma from "~/server/db";
import fs from "fs";
export default defineEventHandler(async (event) => {
  await isAuthenticated(event, true);
  try {
    const { fileUploadLocation } = useRuntimeConfig();
    const params = event.context.params;
    const id = params.id;

    // find products
    let products = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!products) {
      return createError({
        statusCode: 401,
        statusMessage: "products not found",
      });
    }

    if (products.image) {
      const fileP = fileUploadLocation + "/products/" + products.image;
      fs.unlink(fileP, (err) => {});
    }

    products = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    return products;
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
