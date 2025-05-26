<template>
 <div class="h-full flex flex-col gap-8">
   <StoryOfTheDayOverview />
   <Divider />

 </div>
</template>

<script setup lang="ts">

import StoryOfTheDayOverview from "@/components/partials/StoryOfTheDayOverview.vue";

const storyStore = useStoryStore();

onMounted(async (): Promise<void> => {
  await storyStore.fetchStoryOfTheDay();
});
</script>