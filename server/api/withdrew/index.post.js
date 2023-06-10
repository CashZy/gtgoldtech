import formidable from "formidable";
import prisma from "~/server/db";
import isAuthenticated from "~/server/utils/isAuthenticated";

export default defineEventHandler(async (event) => {
  const { user } = await isAuthenticated(event, true);

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

    const { username, walletId, paymentChannel } = fields;
    const amount = parseFloat(fields.amount); // Parse the amount as float
    // console.log("withdrew12:", fields);
    const withdrew = await prisma.withdrew.create({
      data: {
        userId: user.id,
        username,
        walletId,
        paymentChannel,
        amount: amount,
        status: false,
      },
    });

    return withdrew;
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
