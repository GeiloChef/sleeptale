<template>
  <div class="flex flex-col gap-4 min-h-0 w-full">
    <div class="w-full flex-shrink-0">
      <Image
        v-if="selectedStory.imageUrl"
        :src="imageUrl(selectedStory.imageUrl)" />
      <StorySettingsBar
          class="pt-6 px-4" />
    </div>

    <div class="flex-1 overflow-y-auto">
      <Carousel
          ref="StorySectionCarousel_Ref"
          :value="selectedStory.sections"
          :page="currentSectionIndex"
          :numVisible="1"
          :numScroll="1"
          :showNavigators="false"
          circular
          class="h-full"
          @update:page="storyStore.setNewSectionIndex">
        <template #item="section">
          <div class="flex h-full w-full p-4">
            <div
                class="flex-1 overflow-y-auto text-center"
                :style="{ fontSize: `${applicationStore.fontSize}px` }">
              {{ section.data.text }}
            </div>
          </div>
        </template>
      </Carousel>
    </div>
    <div class="flex-shrink-0">
      <AudioPlayer v-if="selectedStory.id" />
    </div>
  </div>
</template>


<script setup lang="ts">
import {onMounted} from "vue";
import {MomentFormat} from "@/types/Core.Types";
import {useRoute} from "nuxt/app";
import {imageUrl} from "@/utils/Image.Utils";
import AudioPlayer from "@/components/partials/AudioPlayer.vue";

definePageMeta({
  layout: 'story',
});

const route = useRoute();

const storyStore = useStoryStore();
const { selectedStory, currentSectionIndex } = storeToRefs(storyStore);

const applicationStore = useApplicationStore();

const StorySectionCarousel_Ref = ref();

onMounted(async (): Promise<void> => {
  if (route.params.date) {
    storyStore.selectedStory = await storyStore.fetchStoryByDate(moment(route.params.date, MomentFormat.DateUrl));
  }
})
</script>