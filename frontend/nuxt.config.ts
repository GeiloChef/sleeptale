// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  pages: true,
  ssr: false,
  runtimeConfig: {
    public: {
      apiBase: '',
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
    strategy: 'prefix',
    langDir: '',
    defaultLocale: 'de',
    locale: 'de',
    locales: [
      { "code": "en", "language": 'en-US', "file": "en.json", "dir": "ltr" },
      { "code": "de", "language": 'de-DE', "file": "de.json", "dir": "ltr" }
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
      solid: [
        'cog',
        'trash',
        'bars',
        'bars-staggered',
        'book-open',
        'font',
        'plus',
        'minus',
        'volume-high'
      ],
    },
    component: 'Icon',
  }
})