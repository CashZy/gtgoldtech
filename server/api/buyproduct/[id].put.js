import formidable from "formidable";
import prisma from "~/server/db";
import uploadImage from "~/server/utils/uploadImage";
import fs from "fs";
import isAuthenticated from "~/server/utils/isAuthenticated";

export default defineEventHandler(async (event) => {
  console.log("trigered");
  const { user } = await isAuthenticated(event, true);
  try {
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
    console.log("first", fields);

    const orders = await prisma.order.findUnique({
      where: {
        id: Number(fields.productId),
      },
    });
    const getuser = await prisma.user.findUnique({
      where: {
        id: Number(fields.userIId),
      },
    });

    // // create orders
    if (orders && getuser) {
      const updatedBalance =
        Number(getuser.balance) - Number(orders.totalPrice);
      const updateBalance = await prisma.user.update({
        where: {
          id: Number(fields.userIId),
        },
        data: {
          balance: updatedBalance,
        },
      });

      if (updateBalance) {
        console.log("balace after order:", updateBalance);
      }
      return 500;
    }
    return { getuser };
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
