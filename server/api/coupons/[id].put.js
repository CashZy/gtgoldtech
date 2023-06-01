import formidable from "formidable";
import prisma from "~/server/db";
import uploadImage from "~/server/utils/uploadImage";
import fs from "fs";

export default defineEventHandler(async (event) => {
  await isAuthenticated(event, true);
  try {
    const { fileUploadLocation } = useRuntimeConfig();
    const params = event.context.params;
    const id = params.id;
    // get files and fields from request
    const form = formidable({ multiple: true });
    const response = await new Promise((resolve, reject) => {
      form.parse(event.node.req, (err, fields, files) => {
        if (err) {
          reject(err);
        }
        resolve({ fields, files });
      });
    });

    const { fields, files } = response;

    // check if news already exist with the title
    let existingcoupon = await prisma.coupon.findUnique({
      where: {
        id: Number(id),
      },
    });

    // check if image exist in req and upload it
    const image = files?.image_0;
    let featuredImage;
    if (image) {
      featuredImage = await uploadImage(image, "coupons");

      if (existingcoupon.image) {
        const fileP = fileUploadLocation + "/coupons/" + existingcoupon.image;
        fs.unlink(fileP, (err) => {});
      }
    }

    // // create coupons
    const coupons = await prisma.coupon.update({
      where: {
        id: Number(id),
      },
      data: {
        title: fields.title,
        price: Number(fields.price),
        days: Number(fields.days),
        dayProfit: Number(fields.dayProfit),
        totalRevenue: Number(fields.totalRevenue),
        quantity: Number(fields.quantity),
        content: fields.content,
        rate: Number(fields.rate),
        published: fields.published == "false" ? false : true,
        image: featuredImage,
      },
    });

    return {};
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
