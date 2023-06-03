import prisma from "~/server/db";
export default defineEventHandler(async (event) => {
  const params = event.context.params;
  const id = params.id;
  try {
    const withdrew = await prisma.withdrew.findMany({
      where: {
        userId: Number(id),
      },
    });
    console.log("???????", withdrew);
    return withdrew;
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
