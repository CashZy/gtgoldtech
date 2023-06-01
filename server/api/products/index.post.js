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

    // check if Product already exist with the same ID
    let alreadyExists = await prisma.product.findUnique({
      where: {
        id: Number(fields.id),
      },
    });

    if (alreadyExists) {
      return createError({
        statusCode: 401,
        statusMessage: "Product already exist",
      });
    }

    // check if image exist in req and upload it
    const image = files?.image_0;
    let featuredImage = null;
    if (image) {
      featuredImage = await uploadImage(image, "products");
    }

    // create news
    const product = await prisma.product.create({
      data: {
        title : fields.title,
        price : Number(fields.price),
        days : Number(fields.days),
        dayProfit : Number(fields.dayProfit),
        totalRevenue : Number(fields.totalRevenue),
        content : fields.content,
        rate : Number(fields.rate),
        quantity : Number(fields.quantity),
        published: fields.published == "false" ? false : true,
        image: featuredImage,
        name: fields.title,
      },
    });

    return product;
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
