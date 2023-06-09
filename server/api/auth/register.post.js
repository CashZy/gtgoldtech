import bcrypt from "bcryptjs";
import prisma from "~/server/db";
import captcha from "nodejs-captcha";
import ID from "nodejs-unique-numeric-id-generator";
export default defineEventHandler(async (event) => {
  const session = event.context.session;
  let user = null;
  let findBID = null;
  let findCID = null;
  let findDID = null;
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

    /*................... level B ................*/

    if (invitation) {
      const allusers = await prisma.user.findMany({});

      findBID = await prisma.user.findUnique({
        where: {
          code: invitation,
        },
      });
      const levelBID = findBID?.id;

      await prisma.myteam.create({
        data: {
          userId: allusers.length + 1,
          invitedbyId: levelBID,
          level: "B",
        },
      });
      console.log("B  createddddd");

      /*................... level B ................*/
      /*................... level C ................*/

      if (findBID?.invitationId) {
        findCID = await prisma.user.findUnique({
          where: {
            id: findBID.invitationId,
          },
        });
        const levelCID = findCID?.id;

        await prisma.myteam.create({
          data: {
            userId: allusers.length + 1,
            invitedbyId: levelCID,
            level: "C",
          },
        });

        console.log("C  createddddd");
      }
      /*................... level C ................*/
      /*................... level D ................*/
      if (findCID?.invitationId) {
        findDID = await prisma.user.findUnique({
          where: {
            id: findCID.invitationId,
          },
        });
        const levelDID = findDID?.id;

        await prisma.myteam.create({
          data: {
            userId: allusers.length + 1,
            invitedbyId: levelDID,
            level: "D",
          },
        });
        console.log("D  createddddd");
      }
    }

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
          totalEarning: 0.0,
        },
      });
    }

    return {};
  } catch (e) {
    console.log(e);
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
