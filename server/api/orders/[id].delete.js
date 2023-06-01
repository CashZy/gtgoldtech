import prisma from "~/server/db";
import fs from "fs";
export default defineEventHandler(async (event) => {
  await isAuthenticated(event, true);
  try {
    const { fileUploadLocation } = useRuntimeConfig();
    const params = event.context.params;
    const id = params.id;

    // find orders
    let orders = await prisma.order.findUnique({
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

    if (orders.image) {
      const fileP = fileUploadLocation + "/orders/" + orders.image;
      fs.unlink(fileP, (err) => {});
    }

    orders = await prisma.order.delete({
      where: {
        id: Number(id),
      },
    });

    return orders;
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
