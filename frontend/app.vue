<template>
  <NuxtLayout>
    <InitialSetupDialog />
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import {useUserStore} from "@/.nuxt/imports";

const genreStore = useGenreStore();
const userStore = useUserStore();



onMounted(async (): Promise<void> => {
  await genreStore.fetchAllAvailableGenres();
  console.log('#########################################################',userStore.user)
})

useHead({
  title: 'Sleeptale',
  meta: [
    { name: 'theme-color', content: '#ffffff' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
  ],
  link: [
    { rel: 'apple-touch-icon', href: '/pwa-192x192.png' }
  ]
});
</script>