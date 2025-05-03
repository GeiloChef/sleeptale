<template>
 <div class="h-full flex flex-col gap-16 justify-center items-center">
   <span class="text-2xl">
     {{ $t('story-of-today') }}
   </span>

   <span class="text-4xl text-center">
     {{ selectedStory.title }}
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

const storyStore = useStoryStore();
const { selectedStory } = storeToRefs(storyStore);

const router = useRouter();

const goToTodayStory = () => {
  router.push({ name: 'story-date___en', params: { date: moment().format(MomentFormat.Date) } })
}
</script>