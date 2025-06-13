<template>
  <div class="flex flex-col gap-2">
    <h3 class="story-section-headline"> {{ title }} </h3>
    <div class="overflow-x-auto scroll-smooth snap-x snap-mandatory">
      <div class="flex gap-8">
        <div
            v-for="(story, key) in stories"
            :key="key"
            class="w-40 h-96 snap-start shrink-0 rounded-xl flex flex-col gap-2"
            @click="story.openStoryPage()">
            <Image
                v-if="story.imageUrl"
                class="rounded-xl overflow-hidden"
                :src="imageUrl(story.imageUrl)" />
          <span class="text-md font-bold">{{ story.title }}</span>
          <span class="text-sm text-gray-500">{{ story.description }}</span>

          <div class="flex flex-col gap-2 justify-start items-center pb-2">
            <AgeGroupTag class="self-start" :age-group="story.ageGroup" />
            <GenreTag class="self-start" :genre-key="story.genre" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { imageUrl } from "@/utils/Image.Utils";
import {type PropType, toRefs} from "vue";
import AgeGroupTag from "@/components/partials/AgeGroupTag.vue";
import GenreTag from "@/components/partials/GenreTag.vue";
import type {Story} from "@/types/classes/Story.Class";

const storyStore = useStoryStore();
const { storyOfTheDay } = storeToRefs(storyStore);

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  stories: {
    type: Array as PropType<Story[]>,
    required: false
  }
});

const { title } = toRefs(props);

/*const stories = computed(() => {
  return [
      storyOfTheDay.value,
      storyOfTheDay.value,
      storyOfTheDay.value,
      storyOfTheDay.value,
      storyOfTheDay.value,
      storyOfTheDay.value,
  ]
})*/
</script>