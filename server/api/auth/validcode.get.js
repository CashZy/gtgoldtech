// import captcha from "nodejs-captcha";
import svgCaptcha from 'svg-captcha';
export default defineEventHandler((event) => {
  // const c = captcha();
  // const code = c.image;
  // const value = c.value;
  const c = svgCaptcha.create();
  const code = c.data;
  const value = c.text;
  event.context.session.validCode = value;
  return {
    code,
    sessionId: event.context.session.id,
  };
});
