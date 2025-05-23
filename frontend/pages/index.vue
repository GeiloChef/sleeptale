<template>
 <div class="h-full flex flex-col gap-8 justify-center items-center">
   <div class="flex flex-col gap-2 text-center">
     <span class="text-xl">
       {{ $t('story-of-the-day') }}
     </span>

     <span class="italic">
       - {{ getDateForStory }} -
     </span>
   </div>

   <div class="rounded-2xl overflow-hidden">
     <Image
         v-if="selectedStory.imageUrl"
         :src="imageUrl(selectedStory.imageUrl)" />
   </div>

   <div class="flex flex-col gap-4">
     <span class="text-4xl text-center">
       {{ selectedStory.title }}
     </span>

     <span class="text-xl text-center">
       {{ selectedStory.description }}
     </span>
   </div>

   <div>
     <Button @click="goToTodayStory">
       {{ $t('read-now') }}
     </Button>
   </div>
 </div>
</template>

<script setup lang="ts">

import {MomentFormat} from "@/types/Core.Types";
import {navigateToStoryPage} from "@/utils/Story.Utils";
import {imageUrl} from "@/.nuxt/imports";

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