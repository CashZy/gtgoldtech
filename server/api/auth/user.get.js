export default defineEventHandler(async (event) => {
  try {
    const { user } = await isAuthenticated(event);
    return { user };
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
