<template>
 <div class="h-full flex flex-col gap-8">
   <StoryOfTheDayOverview />
   <Divider />

 </div>
</template>

<script setup lang="ts">

import {MomentFormat} from "@/types/Core.Types";
import {navigateToStoryPage} from "@/utils/Story.Utils";
import {imageUrl} from "@/.nuxt/imports";
import StoryOfTheDayOverview from "@/components/partials/StoryOfTheDayOverview.vue";

const storyStore = useStoryStore();
const { selectedStory } = storeToRefs(storyStore);

const router = useRouter();

const goToTodayStory = () => {
  navigateToStoryPage(moment().format(MomentFormat.DateUrl));
}

const getDateForStory = computed(() => {
  if (selectedStory.value.scheduledAt) {
    return moment(selectedStory.value.scheduledAt).format(MomentFormat.DateDisplay)
  }

  return '';
});

onMounted(async (): Promise<void> => {
  await storyStore.fetchStoryByDate(moment());
});
</script>