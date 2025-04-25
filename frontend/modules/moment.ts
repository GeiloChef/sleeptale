import { defineNuxtModule, addImports, addPlugin, createResolver } from '@nuxt/kit'

export interface ModuleOptions {
  locale?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'moment-module',
    configKey: 'moment'
  },

  defaults: {
    locale: 'de'
  },

  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Plugin registrieren
    addPlugin({
      src: resolver.resolve('./runtime/plugin'),
      mode: 'all',
      options
    })

    // Auto-Import für moment
    addImports({
      name: 'default',
      as: 'moment',
      from: 'moment'
    })
  }
});
