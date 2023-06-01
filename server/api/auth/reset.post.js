import bcrypt from "bcryptjs";
import prisma from "~/server/db";
export default defineEventHandler(async (event) => {
  let user = null;
  const session = event.context.session;
  try {
    // get body from request
    const data = await readBody(event);
    const { password, phone, sessionId, otp } = data.body;

    // compare session
    if (
      session.id != sessionId ||
      session?.otp.value != otp ||
      session?.otp.phone != phone ||
      session?.otp.time >= new Date(Date.now()).toString()
    ) {
      return createError({
        statusCode: 401,
        statusMessage: "phone verification failed",
      });
    }

    // find user
    user = await prisma.user.findUnique({
      where: {
        phone,
      },
    });
    if (!user) {
      return createError({ statusCode: 401, statusMessage: "user not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = await prisma.user.update({
      where: {
        phone,
      },
      data: {
        password: hash,
      },
    });

    return {};
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
