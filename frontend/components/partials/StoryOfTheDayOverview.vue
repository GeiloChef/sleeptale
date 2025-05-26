<template>
  <div class="flex flex-col gap-4">
    <h2 class="story-section-headline">{{ $t('story-of-the-day') }}</h2>
    <span class="text-xl">
       {{ selectedStory.title }}
    </span>
    <div class="flex flex-row gap-2 items-center">
      <div class="rounded-2xl overflow-hidden">
        <Image
            v-if="selectedStory.imageUrl"
            :src="imageUrl(selectedStory.imageUrl)" />
      </div>
      <div class="flex flex-col gap-2">
        <span class="text-sm line-clamp-8">
         {{ selectedStory.description }}
        </span>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import {imageUrl} from "@/utils/Image.Utils";

const storyStore = useStoryStore();
const { selectedStory } = storeToRefs(storyStore);
</script>