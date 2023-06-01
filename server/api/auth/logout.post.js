export default defineEventHandler(async (event) => {
  try {
    event.context.user = null;

    return {};
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
