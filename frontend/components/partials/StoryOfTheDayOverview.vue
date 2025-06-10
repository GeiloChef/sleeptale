<template>
  <div class="flex flex-col gap-4" @click="openStory">
    <h2 class="story-section-headline">{{ $t('story-of-the-day') }}</h2>
    <div class="flex flex-col gap-2 items-center">
      <div class="rounded-2xl overflow-hidden">
        <Image
            v-if="storyOfTheDay.imageUrl"
            :src="imageUrl(storyOfTheDay.imageUrl)" />
      </div>
      <div class="flex flex-col gap-2">
        <span class="text-xl">
           {{ storyOfTheDay.title }}
        </span>
        <span class="text-sm line-clamp-8 text-gray-500">
         {{ storyOfTheDay.description }}
        </span>
      </div>

      <div class="flex flex-row gap-2 items-center justify-start w-full">
        <AgeGroupTag :age-group="storyOfTheDay.ageGroup" />
        <GenreTag :genre-key="storyOfTheDay.genre" />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import {imageUrl} from "@/utils/Image.Utils";
import GenreTag from "@/components/partials/GenreTag.vue";
import AgeGroupTag from "@/components/partials/AgeGroupTag.vue";

const storyStore = useStoryStore();
const { storyOfTheDay } = storeToRefs(storyStore);

const openStory = (): void => {
  storyOfTheDay.value.openStoryPage();
}
</script>