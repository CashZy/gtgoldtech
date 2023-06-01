import prisma from "~/server/db";
import fs from "fs";
export default defineEventHandler(async (event) => {
  await isAuthenticated(event, true);
  try {
    const { fileUploadLocation } = useRuntimeConfig();
    const params = event.context.params;
    const id = params.id;

    // find coupons
    let coupons = await prisma.coupon.findUnique({
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

    if (coupons.image) {
      const fileP = fileUploadLocation + "/coupons/" + coupons.image;
      fs.unlink(fileP, (err) => {});
    }

    coupons = await prisma.coupon.delete({
      where: {
        id: Number(id),
      },
    });

    return coupons;
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
