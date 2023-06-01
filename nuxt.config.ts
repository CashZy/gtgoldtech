// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // @ts-ignore
  modules: ["@nuxtjs/tailwindcss", "@vant/nuxt", "@sidebase/nuxt-session"],
  // @ts-ignore
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    fileUploadLocation: process.env.FILE_UPLOAD_LOACTION,
    public: {
      fileUploadLocation: process.env.FILE_UPLOAD_LOACTION,
    },
  },
});
