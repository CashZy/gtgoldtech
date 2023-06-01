import formidable from "formidable";
import prisma from "~/server/db";
import isAuthenticated from "~/server/utils/isAuthenticated";
import uploadImage from "~/server/utils/uploadImage";

export default defineEventHandler(async (event) => {
  await isAuthenticated(event, true);
  try {
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
        title: fields.title,
      },
    });

    if (news) {
      return createError({
        statusCode: 401,
        statusMessage: "Title already exist",
      });
    }

    // check if image exist in req and upload it
    const image = files?.image_0;
    let featuredImage = null;
    if (image) {
      featuredImage = await uploadImage(image, "news");
    }

    // create news
    news = await prisma.news.create({
      data: {
        title: fields.title,
        slug: fields.slug,
        body: fields.body,
        featured: fields.featured == "false" ? false : true,
        image: featuredImage,
      },
    });

    return news;
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
