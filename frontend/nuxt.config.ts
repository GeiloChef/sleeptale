// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  pages: true,
  ssr: false,
  runtimeConfig: {
    public: {
      apiBase: '', // is overridden by NUXT_PUBLIC_API_BASE environment variable
      moment: {
        locale: 'de'
      }
    }
  },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@primevue/nuxt-module',
    "@nuxtjs/tailwindcss",
    "@vesp/nuxt-fontawesome",
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    './modules/moment'
  ],
  moment: {
    locale: 'de' // oder 'es', 'fr', 'en-gb' etc.
  },
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
  }
})