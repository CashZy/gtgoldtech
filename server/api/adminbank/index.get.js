import prisma from "~/server/db";
import isAuthenticated from "~/server/utils/isAuthenticated";

export default defineEventHandler(async (event) => {
  try {
    const { user } = await isAuthenticated(event);
    const data = await prisma.bank.findMany({});

    return { data };
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
