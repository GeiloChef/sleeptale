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
</script>