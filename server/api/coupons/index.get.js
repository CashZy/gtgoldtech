import prisma from "~/server/db";
export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const pQuery = {};
    // if (query.featured) {
    //   pQuery.where = {
    //     featured: query.featured == "true" ? true : false,
    //   };
    // }
    //right now just exclude the unpubished
    // pQuery.where = {
    //   puhlished: true
    // }

    const coupons = await prisma.coupon.findMany(pQuery);
    return coupons;
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
