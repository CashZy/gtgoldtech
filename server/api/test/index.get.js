import prisma from "~/server/db";
export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  try {
    const tests = await prisma.test.findMany({});
    if (!tests) {
      return createError({ statusCode: 401, statusMessage: "tests not found" });
    }
    return tests;
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
