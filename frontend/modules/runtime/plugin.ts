import { defineNuxtPlugin } from '#app'
import moment from 'moment'

export default defineNuxtPlugin(nuxtApp => {
  const locale = <string>nuxtApp.$config.public.moment?.locale || 'en'

  try {
    require(`moment/locale/${locale}`)
    moment.locale(locale)
  } catch (err) {
    console.warn(`[moment-module] Locale "${locale}" not found. Using default "en".`)
    moment.locale('en')
  }

  return {
    provide: {
      moment
    }
  }
})
