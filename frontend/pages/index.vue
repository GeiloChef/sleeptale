<template>
 <div class="h-full flex flex-col gap-16 justify-center items-center">
   <span class="text-2xl">
     {{ $t('story-of-today') }}
   </span>

   <div>
     <Image
         v-if="selectedStory.imageUrl"
         :src="imageUrl(selectedStory.imageUrl)" />
   </div>

   <span class="text-4xl text-center">
     {{ selectedStory.title }}
   </span>

   <span class="text-2xl text-center">
     {{ selectedStory.description }}
   </span>

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

onMounted(async (): Promise<void> => {
  await storyStore.fetchStoryByDate(moment());
});
</script>