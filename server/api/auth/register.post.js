import bcrypt from "bcryptjs";
import prisma from "~/server/db";
import captcha from "nodejs-captcha";
import ID from "nodejs-unique-numeric-id-generator";
export default defineEventHandler(async (event) => {
  const session = event.context.session;
  let user = null;
  // const c = captcha();
  const uniqueInvitationCode = ID.generate(new Date().toJSON());
  try {
    // get body
    const data = await readBody(event);
    const { password, phone, sessionId, otp, invitation } = data.body;
    // find user
    user = await prisma.user.findUnique({
      where: {
        phone,
      },
    });

    if (user) {
      return createError({
        statusCode: 401,
        statusMessage: "user already exist",
      });
    }

    const users = await prisma.user.count();
    let invitationUser;
    //:dev: admin flag for first user
    let isAdmin = false;
    if (users !== 0) {
      invitationUser = await prisma.user.findUnique({
        where: {
          code: invitation,
        },
      });

      if (!invitationUser) {
        return createError({
          statusCode: 401,
          statusMessage: "invitation link is incorrect",
        });
      }
    } else {
      isAdmin = true;
    }

    // if (invitation) {
    //  await prisma.myteam.create({
    //     data: {
    //       userId: allusers.length + 1,
    //       invitedbyCode: invitation,
    //       level: 'B',
    //     },
    //   });

    //   const findBID = await prisma.user.findUnique({
    //     where: {
    //       code: invitation,
    //     },
    //   });
    //   levelBID = findBID?.invitationId;

    //   if (levelBID) {
    //     const updatedBalanceD = await prisma.user.update({
    //       where: {
    //         id: levelBID,
    //       },
    //       data: {
    //         balance: {
    //           increment: new Prisma.Decimal((5 / 100) * total), // Set the balance field to the sum of existing value and new value
    //         },
    //       },
    //     });
    //   }

    //   const findDID = await prisma.user.findUnique({
    //     where: {
    //       id: levelBID,
    //     },
    //   });
    //   levelDID = findDID?.invitationId;

    //   if (levelDID) {
    //     const updatedBalanceD = await prisma.user.update({
    //       where: {
    //         id: levelDID,
    //       },
    //       data: {
    //         balance: {
    //           increment: new Prisma.Decimal((2 / 100) * total), // Set the balance field to the sum of existing value and new value
    //         },
    //       },
    //     });
    //   }
    // }

    // compare session
    // if (
    //   session.id != sessionId ||
    //   session?.otp.value != otp ||
    //   session?.otp.phone != phone ||
    //   session?.otp.time >= new Date(Date.now()).toString()
    // ) {
    //   return createError({
    //     statusCode: 401,
    //     statusMessage: "phone verification failed",
    //   });
    // }

    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      user = await prisma.user.create({
        data: {
          phone,
          password: hash,
          code: uniqueInvitationCode,
          invitationId: invitationUser ? invitationUser.id : null,
          isAdmin,
          balance: 0.0,
        },
      });
    }

    return {};
  } catch (e) {
    console.log(e);
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
