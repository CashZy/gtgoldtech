import formidable from "formidable";
import prisma from "~/server/db";
import uploadImage from "~/server/utils/uploadImage";
import isAuthenticated from "~/server/utils/isAuthenticated";
import fs from "fs";
export default defineEventHandler(async (event) => {
  const { user } = await isAuthenticated(event);
  const { fileUploadLocation } = useRuntimeConfig();
  try {
    const form = formidable({ multiple: true });
    const response = await new Promise((resolve, reject) => {
      form.parse(event.node.req, (err, fields, files) => {
        if (err) {
          reject(err);
        }
        resolve({ fields, files });
      });
    });

    const { fields, files } = response;

    let avatar;
    if (files?.avatar) {
      avatar = await uploadImage(files?.avatar, "users");

      if (user?.avatar) {
        const fileP = fileUploadLocation + "/users/" + user?.avatar;
        fs.unlink(fileP, (err) => {});
      }
    }

    const updatedUser = await prisma.user.update({
      where: {
        phone: user.phone,
      },
      data: {
        nickName: fields.nickName,
        avatar,
      },
    });

    event.context.session.user = updatedUser;

    return updatedUser;
  } catch (e) {
    console.log(e);
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
