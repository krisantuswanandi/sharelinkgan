// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  modules: ["@unocss/nuxt", "@vueuse/nuxt"],
  runtimeConfig: {
    databaseUrl: "",
    databaseAuthToken: "",
  },
  css: ["@unocss/reset/tailwind.css"],
  compatibilityDate: "2025-04-12",
});
