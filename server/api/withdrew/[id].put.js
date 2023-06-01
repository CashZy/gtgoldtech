import formidable from "formidable";
import prisma from "~/server/db";
import uploadImage from "~/server/utils/uploadImage";
import fs from "fs";
import isAuthenticated from "~/server/utils/isAuthenticated";

export default defineEventHandler(async (event) => {
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
    // // create orders
    const updatewithdrew = await prisma.withdrew.update({
      where: {
        id: Number(id),
      },
      data: {
        status: true,
      },
    });

    let updatebalance; // Declare the variable outside the if condition

    if (updatewithdrew) {
      const withdrew = await prisma.withdrew.findUnique({
        where: {
          id: Number(id),
        },
      });
      let existingorder = await prisma.user.findUnique({
        where: {
          id: Number(fields.userIId),
        },
      });
      const updatedBalance = existingorder.balance - withdrew.amount;
      updatebalance = await prisma.user.update({
        where: {
          id: Number(fields.userIId),
        },
        data: {
          balance: updatedBalance,
        },
      });

      if (updatebalance) {
        console.log("Updated balance:", updatebalance.balance);
      }

      return 500;
    }
    return { updatewithdrew };
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
