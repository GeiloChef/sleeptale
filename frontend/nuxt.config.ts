// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  pages: true,
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@primevue/nuxt-module',
    "@nuxtjs/tailwindcss",
    "@vesp/nuxt-fontawesome",
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],
  i18n: {
    langDir: '',
    locale: 'en',
    locales: [
      { "code": "en", "language": 'en-US', "file": "en.json", "dir": "ltr" }
    ]
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    plugins: [require('tailwindcss-primeui')]
  },
  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  },
  eslint: {
    fix: true,
    lintOnStart: false,
  },
  fontawesome: {
    icons: {
      solid: ['cog', 'trash' ],
    },
    component: 'Icon',
  },
  axios: {
    baseURL: process.env.API_BASE_URL,
  },
})