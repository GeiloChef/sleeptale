<template>
 <div class="flex flex-col gap-8 max-w-full overflow-y-auto scroll-smooth snap-y snap-mandatory px-8">
   <section class="snap-start min-h-80">
    <StoryOfTheDayOverview />
   </section>
   <Divider />

   <section
     v-show="startedStoriesList.length"
     class="snap-start-container">
    <StoryHorizontalSlider
      :title="$t('started-story', 2)"
      :stories="startedStoriesList" />
    <Divider />
   </section>

   <section
     v-show="suggestedStories.length"
     class="snap-start-container">
    <StoryHorizontalSlider
      :title="$t('suggested-for-you')"
      :stories="suggestedStories" />
    <Divider />
   </section>

   <section
     v-show="latestStories.length"
     class="snap-start-container">
    <StoryHorizontalSlider
      :title="$t('latest-story', 2)"
      :stories="latestStories" />
    <Divider />
   </section>

   <section
     v-show="favoriteStoriesList.length"
     class="snap-start-container">
    <StoryHorizontalSlider
      :title="$t('favorite', 2)"
      :stories="favoriteStoriesList" />
    <Divider />
   </section>
 </div>
</template>

<script setup lang="ts">

import StoryOfTheDayOverview from "@/components/partials/StoryOfTheDayOverview.vue";
import StoryHorizontalSlider from "@/components/partials/StoryHorizontalSlider.vue";

const userStore = useUserStore();
const { favoriteStoriesList } = storeToRefs(userStore);

const storyStore = useStoryStore();
const { startedStoriesList, suggestedStories, latestStories } = storeToRefs(storyStore);

onMounted(async (): Promise<void> => {
  await storyStore.fetchStoryOfTheDay();
  await storyStore.fetchInfoForStartedStories();
  await storyStore.getSuggestedStories();
  await storyStore.fetchLatestStories();
  await userStore.fetchInfoForFavoriteStories();
});
</script>

<style scoped lang="scss">
.snap-start-container {
  @apply snap-start min-h-96
}
</style>