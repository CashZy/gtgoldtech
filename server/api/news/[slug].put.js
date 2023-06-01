import formidable from "formidable";
import prisma from "~/server/db";
import uploadImage from "~/server/utils/uploadImage";
import fs from "fs";
import isAuthenticated from "~/server/utils/isAuthenticated";

export default defineEventHandler(async (event) => {
  await isAuthenticated(event, true);
  try {
    const { fileUploadLocation } = useRuntimeConfig();
    const params = event.context.params;
    const id = params.slug;
    // get files and fields from request
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

    // check if news already exist with the title
    let news = await prisma.news.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!news) {
      return createError({
        statusCode: 401,
        statusMessage: "Title already exist",
      });
    }

    // check if news already exist with the title
    let slugNews = await prisma.news.findUnique({
      where: {
        slug: fields.slug,
      },
    });

    if (slugNews && slugNews.id != id) {
      return createError({
        statusCode: 401,
        statusMessage: "Title already exist with another news",
      });
    }

    // check if image exist in req and upload it
    const image = files?.image_0;
    let featuredImage = news?.image || null;
    if (image) {
      featuredImage = await uploadImage(image, "news");

      if (slugNews.image) {
        const fileP = fileUploadLocation + "/news/" + slugNews.image;
        fs.unlink(fileP, (err) => {});
      }
    }

    // // create news
    news = await prisma.news.update({
      where: {
        id: Number(id),
      },
      data: {
        title: fields.title,
        slug: fields.slug,
        body: fields.body,
        featured: fields.featured == "false" ? false : true,
        image: featuredImage,
      },
    });

    return {};
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
