import bcrypt from "bcryptjs";
import prisma from "~/server/db";
import isAuthenticated from "~/server/utils/isAuthenticated";
export default defineEventHandler(async (event) => {
  const session = event.context.session;
  const { user } = await isAuthenticated(event);
  try {
    // get body from request
    const data = await readBody(event);

    const { password, sessionId, otp } = data.body;

    // compare session
    if (
      session.id != sessionId ||
      session?.otp.value != otp ||
      session?.otp.phone != user.phone ||
      session?.otp.time >= new Date(Date.now()).toString()
    ) {
      return createError({
        statusCode: 401,
        statusMessage: "phone verification failed",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await prisma.user.update({
      where: {
        phone: user.phone,
      },
      data: {
        password: hash,
      },
    });

    return {};
  } catch (e) {
    console.log(e);
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
