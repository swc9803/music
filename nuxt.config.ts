export default defineNuxtConfig({
  css: ["~/assets/css/main.scss"],
  build: {
    transpile: ["gsap"],
  },
  modules: ["@pinia/nuxt"],
});
