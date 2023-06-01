import formidable from "formidable";
import prisma from "~/server/db";
import isAuthenticated from "~/server/utils/isAuthenticated";

export default defineEventHandler(async (event) => {
  await isAuthenticated(event, true);
  try {
    console.log("triggering ");
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

    // check if coupon already exist with the same ID
    // let alreadyExists = await prisma.coupon.findUnique({
    //   where: {
    //     id: Number(fields.id),
    //   },
    // });

    // if (alreadyExists) {
    //   return createError({
    //     statusCode: 401,
    //     statusMessage: "coupon already exist",
    //   });
    // }

    // create news
    const coupon = await prisma.coupon.create({
      data: {
        code: fields.code,
        discount: Number(fields.discount),
        validUntil: fields.validUntil,
        orders: fields.orders,
      },
    });

    return coupon;
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
