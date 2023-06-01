import prisma from "~/server/db";
import jwt from "jsonwebtoken";
export default defineEventHandler(async (event) => {
  let user = null;
  const session = event.context.session;
  try {
    // get body from request
    const data = await readBody(event);

    const { token } = data.body;
    // if token is empty
    if (!token) {
      return createError({ statusCode: 401, statusMessage: "no token" });
    }

    const { jwtSecret } = useRuntimeConfig();

    const decoded = await jwt.verify(token, jwtSecret);

    // find user
    user = await prisma.user.findUnique({
      where: {
        phone: decoded.phone,
      },
    });
    if (!user) {
      return createError({ statusCode: 401, statusMessage: "user not found" });
    }

    event.context.user = user;

    return { user };
  } catch (e) {
    console.log(e);
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
