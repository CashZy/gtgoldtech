export default defineNuxtRouteMiddleware((to, from) => {
  const pages = ["/login", "/register", "/forget"];
  const token = useCookie("token");
  if (!token.value && !pages.includes(to.path)) {
    return navigateTo("/login");
  }
});
