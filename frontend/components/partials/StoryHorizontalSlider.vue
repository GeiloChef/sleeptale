<template>
  <div class="flex flex-col gap-6">
    <h3 class="story-section-headline"> {{ title }} </h3>
    <div class="overflow-x-auto scroll-smooth snap-x snap-mandatory">
      <div class="flex gap-8">
        <div
            v-for="(story, key) in stories"
            :key="key"
            class="w-40 h-96 snap-start shrink-0 rounded-xl flex flex-col gap-2">
            <Image
                v-if="story.imageUrl"
                class="rounded-xl overflow-hidden"
                :src="imageUrl(story.imageUrl)" />
          <span class="text-md font-bold">{{ story.title }}</span>
          <span class="text-sm text-gray-500">{{ story.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {imageUrl} from "@/utils/Image.Utils";
import {toRefs} from "vue";

const storyStore = useStoryStore();
const { storyOfTheDay } = storeToRefs(storyStore);

const props = defineProps({
  title: {
    type: String,
    required: true
  },
});

const { title } = toRefs(props);

const stories = computed(() => {
  return [
      storyOfTheDay.value,
      storyOfTheDay.value,
      storyOfTheDay.value,
      storyOfTheDay.value,
      storyOfTheDay.value,
      storyOfTheDay.value,
  ]
})
</script>