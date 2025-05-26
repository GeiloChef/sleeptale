<template>
 <div class="flex flex-col gap-8 max-w-full overflow-y-auto scroll-smooth snap-y snap-mandatory px-8">
   <section class="snap-start min-h-80">
    <StoryOfTheDayOverview />
   </section>
   <Divider />

   <section class="snap-start-container">
    <StoryHorizontalSlider :title="$t('new-story', 2)" />
   </section>
   <Divider />
   <section class="snap-start-container">
    <StoryHorizontalSlider :title="$t('new-story', 2)" />
   </section>
   <Divider />
   <section class="snap-start-container">
    <StoryHorizontalSlider :title="$t('new-story', 2)" />
   </section>
   <Divider />
   <section class="snap-start-container">
    <StoryHorizontalSlider :title="$t('new-story', 2)" />
   </section>
 </div>
</template>

<script setup lang="ts">

import StoryOfTheDayOverview from "@/components/partials/StoryOfTheDayOverview.vue";
import StoryHorizontalSlider from "@/components/partials/StoryHorizontalSlider.vue";

const storyStore = useStoryStore();

onMounted(async (): Promise<void> => {
  await storyStore.fetchStoryOfTheDay();
});
</script>

<style scoped lang="scss">
.snap-start-container {
  @apply snap-start min-h-96
}
</style>