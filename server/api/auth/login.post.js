import bcrypt from "bcryptjs";
import prisma from "~/server/db";
import jwt from "jsonwebtoken";
export default defineEventHandler(async (event) => {
  let user = null;
  const session = event.context.session;
  try {
    // get body from request
    const data = await readBody(event);

    const { password, sessionId, code, phone } = data.body;

    // find user
    user = await prisma.user.findUnique({
      where: {
        phone,
      },
    });
    if (!user) {
      return createError({ statusCode: 401, statusMessage: "user not found" });
    }

    if (user?.id) {
      let userOrders;
      userOrders = await prisma.order.findMany({
        where: {
          userId: user.id,
        },
      });
      // console.log(">>>>>>>", userOrders);
    }

    // compare session
    if (session.id != sessionId) {
      return createError({ statusCode: 401, statusMessage: "session expired" });
    }

    // compare valid code
    if (code != session.validCode) {
      return createError({
        statusCode: 401,
        statusMessage: "valid code is Wrong",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return createError({
        statusCode: 401,
        statusMessage: "password not matched",
      });
    }

    const { jwtSecret } = useRuntimeConfig();

    // generate json web token
    const token = await jwt.sign({ phone: user.phone }, jwtSecret, {
      expiresIn: "30d",
    });

    event.context.user = user;
    // console.log("first", user)
    return { user, token };
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
