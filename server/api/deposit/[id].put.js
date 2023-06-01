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
    // console.log("sjsjkjsks/sksl", id);
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
    console.log("111111111111", fields.userIId);
    // check if news already exist with the title
    let existingorder = await prisma.deposit.findUnique({
      where: {
        id: Number(id),
      },
    });

    // // create orders
    const updatedeposit = await prisma.deposit.update({
      where: {
        id: Number(id),
      },
      data: {
        status: true,
      },
    });
    if (updatedeposit) {
      // console("checker:" , fields.balance)
      const pQuery = {};
      const deposit = await prisma.deposit.findUnique({
        where: {
          id: Number(id),
        },
      });
      let existingorder = await prisma.user.findUnique({
        where: {
          id: Number(fields.userIId),
        },
      });
      const updatedBalance =
        Number(existingorder.balance) + Number(deposit.balance);

      const updateBalance = await prisma.user.update({
        where: {
          id: Number(fields.userIId),
        },
        data: {
          balance: updatedBalance,
        },
      });

      if (updateBalance) {
        console.log("balace:", updateBalance);
      }
      return 500;
    }
    return { updatedeposit };
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
