import formidable from "formidable";
import prisma from "~/server/db";
import isAuthenticated from "~/server/utils/isAuthenticated";
export default defineEventHandler(async (event) => {
  console.log("trigereded123");
  const { user } = await isAuthenticated(event, true);
  // Handle POST request to create a new deposit
  try {
    const form = formidable({ multiples: true });
    const { fields } = await new Promise((resolve, reject) => {
      form.parse(event.node.req, (err, fields) => {
        if (err) {
          reject(err);
        }
        resolve({ fields });
      });
    });

    const { paymentChannel, transactionId } = fields;
    const balance = parseInt(fields.balance);
    // const status = Boolean(fields.status);
    console.log("user:", user.balance);
    const deposit = await prisma.deposit.create({
      data: {
        userId: user.id,
        transactionId,
        paymentChannel,
        balance,
        status: false,
      },
    });
    console.log("oka:", deposit);
    return deposit;
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
