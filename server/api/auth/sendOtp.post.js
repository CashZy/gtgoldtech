import captcha from "nodejs-captcha";
import prisma from "~/server/db";
import { addSeconds } from "date-fns";
import sendSMS from "~/server/utils/sendSMS";
export default defineEventHandler(async (event) => {
  let user = null;
  try {
    // get body from request
    const data = await readBody(event);

    const { phone } = data.body;

    const c = captcha();
    const value = c.value;
    const time = addSeconds(Date.now(), 60).toString();
    event.context.session.otp = {
      value,
      phone,
      expireTime: time,
    };
    //:dev: didn't added any await/catch because API not finalized
    sendSMS(phone, value)

    setTimeout(() => {
      event.context.session.otp = {};
    }, 20000);

    return { otp: value, sessionId: event.context.session.id };
  } catch (e) {
    return createError({ statusCode: e.code, statusMessage: e.message });
  }
});
