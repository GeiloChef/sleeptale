<template>
  <NuxtLayout>
    <InitialSetupDialog />
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">

const genreStore = useGenreStore();

onMounted(async (): Promise<void> => {
  await genreStore.fetchAllAvailableGenres();
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