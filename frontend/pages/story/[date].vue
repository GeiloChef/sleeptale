<template>
  <div class="flex flex-col flex-grow w-full min-h-0">
    <div
        v-if="!isInReadMode"
        class="h-full flex flex-col gap-16 justify-center items-center">
      <div>
        <Image
            v-if="selectedStory.imageUrl"
            :src="imageUrl(selectedStory.imageUrl)" />
      </div>

      <span class="text-4xl text-center">
        {{ selectedStory.title }}
      </span>

      <span class="text-xl text-center">
        {{ selectedStory.description }}
      </span>

      <div class="flex flex-row justify-end w-full">
        <Button @click="startReading">
          {{ $t('read-book') }}
        </Button>
      </div>
    </div>

    <div
        v-else
        class="flex flex-grow flex-col gap-8 min-h-0">

      <StorySettingsBar class="h-6" />

      <div
          class="text-center flex flex-1 justify-center items-center overflow-y-auto"
          :style="{fontSize: `${applicationStore.fontSize}px`}">
        {{ currentSection.text }}
      </div>

      <div class="flex flex-row justify-between items-center w-full h-8">
        <Button
            :disabled="isFirstSection"
            @click="previousPage">
          {{ $t('previous-page') }}
        </Button>

        <span>
          {{ currentSection.order + 1 }} / {{ selectedStory.sections.length }}
        </span>

        <Button
            @click="nextPage">
          {{ nextPageLabel }}
        </Button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">

import {onMounted} from "vue";
import {useRoute} from "nuxt/app";
import {MomentFormat} from "@/types/Core.Types";
import type {Section} from "@/types/Story.types";
import {imageUrl} from "@/utils/Image.Utils";
import StorySettingsBar from "@/components/StorySettingsBar.vue";

const route = useRoute();

const { t } = useI18n();

const storyStore = useStoryStore();
const { selectedStory } = storeToRefs(storyStore);

const applicationStore = useApplicationStore();

const isInReadMode = ref(true);

const currentSectionIndex = ref(0);

const startReading = (): void => {
  isInReadMode.value = true;
}

const currentSection = computed((): Section => {
  return selectedStory.value.sections[currentSectionIndex.value];
});

const previousPage = (): void => {
  currentSectionIndex.value = currentSectionIndex.value - 1
}

const nextPage = (): void => {
  if (isLastSection.value) {
    endStory();
    return;
  }

  currentSectionIndex.value = currentSectionIndex.value + 1
}

const endStory = (): void => {
  currentSectionIndex.value = 0;
  isInReadMode.value = false;
}

const isFirstSection = computed((): boolean => {
  const indexOfObject = selectedStory.value.sections.indexOf(currentSection.value);
  if (indexOfObject === -1) return false;

  return !!selectedStory.value.sections.length && indexOfObject === 0
})

const isLastSection = computed((): boolean => {
  const indexOfObject = selectedStory.value.sections.indexOf(currentSection.value);
  if (indexOfObject === -1) return false;

  return !!selectedStory.value.sections.length && indexOfObject === selectedStory.value.sections.length - 1
})

const nextPageLabel = computed((): string => {
  return isLastSection.value ? t('end-story') : t('next-page')
});

onMounted(async (): Promise<void> => {
  if (route.params.date) {
    await storyStore.fetchStoryByDate(moment(route.params.date, MomentFormat.DateUrl));
  }
})
</script>