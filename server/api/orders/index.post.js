import formidable from "formidable";
import prisma from "~/server/db";
import isAuthenticated from "~/server/utils/isAuthenticated";

export default defineEventHandler(async (event) => {
  const { user } = await isAuthenticated(event, true);
  try {
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

    // check if order already exist with the same ID
    // let alreadyExists = await prisma.order.findUnique({
    //   where: {
    //     id: Number(fields.id),
    //   },
    // });

    // if (alreadyExists) {
    //   return createError({
    //     statusCode: 401,
    //     statusMessage: "order already exist",
    //   });
    // }

    // create news
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        productId: Number(fields.productId),
        quantity: Number(fields.quantity),
        totalPrice: Number(fields.totalPrice),
      },
    });

    return order;
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
