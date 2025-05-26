<template>
  <div class="flex flex-col gap-4 w-screen">
    <div class="w-full">

      <Image
        v-if="selectedStory.imageUrl"
        :src="imageUrl(selectedStory.imageUrl)" />
      <StorySettingsBar class="pt-6 px-4" />
    </div>

    <div>
      <Carousel
          :value="selectedStory.sections"
          :numVisible="1"
          :numScroll="1"
          :showNavigators="false"
          circular>
        <template #item="section">
          <div
              class="rounded p-4 max-w-full"
              :style="{fontSize: `${applicationStore.fontSize}px`}">
            {{ section.data.text }}
          </div>
        </template>
      </Carousel>
    </div>
  </div>
</template>


<script setup lang="ts">
import {onMounted} from "vue";
import {MomentFormat} from "@/types/Core.Types";
import {useRoute} from "nuxt/app";
import {imageUrl} from "@/utils/Image.Utils";

definePageMeta({
  layout: 'story',
});

const route = useRoute();

const storyStore = useStoryStore();
const { selectedStory } = storeToRefs(storyStore);

const applicationStore = useApplicationStore();


onMounted(async (): Promise<void> => {
  if (route.params.date) {
    storyStore.selectedStory = await storyStore.fetchStoryByDate(moment(route.params.date, MomentFormat.DateUrl));
  }
})
</script>