// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/device',
  ],
  css: [
    '~/assets/css/main.css',
  ],
  ssr: true,
  experimental: {
    defaults: {
      nuxtLink: {
        // default values
        componentName: 'NuxtLink',
        externalRelAttribute: 'noopener noreferrer',
        activeClass: 'router-link-active',
        exactActiveClass: 'router-link-exact-active',
        prefetchedClass: undefined, // can be any valid string class name
        trailingSlash: undefined // can be 'append' or 'remove'
      }
    }
  },
  app: {
    pageTransition: {
      name: 'slide-right', mode: 'out-in'
    },
  },
})