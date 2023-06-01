import prisma from "~/server/db";
import jwt from "jsonwebtoken";
const isAuthenticated = async (event, admin = false) => {
  const { jwtSecret } = useRuntimeConfig();
  return new Promise(async (resolve, reject) => {
    try {
      const token = event.node.req.headers.authorization;
      if (!token) {
        return createError({ statusCode: 401, statusMessage: "Un authorized" });
      }
      const decoded = await jwt.verify(token, jwtSecret);

      const user = await prisma.user.findUnique({
        where: {
          phone: decoded.phone,
        },
      });

      if (!user) {
        reject(
          createError({ statusCode: 401, statusMessage: "Un authorized" })
        );
      }

      // if (admin) {
      //   if (!user.isAdmin) {
      //     reject(
      //       createError({
      //         statusCode: 401,
      //         statusMessage: "You Are Not Admin",
      //       })
      //     );
      //   }
      // }

      event.context.user = user;
      resolve({ user });
    } catch (e) {
      reject(createError({ statusCode: e.code, statusMessage: e.message }));
    }
  });
};

export default isAuthenticated;
