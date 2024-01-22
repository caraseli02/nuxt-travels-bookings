// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'jsdom',
  },
});
