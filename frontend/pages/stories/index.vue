<template>
  <div class="flex flex-col gap-8 h-full">
    <div>
      <InputText
          type="text"
          v-model="searchInput"
          class="w-full"/>
    </div>
    <div class="flex flex-col gap-2">
      <Divider />
      <template v-if="filteredStories.length">
        <template v-for="story in filteredStories" :key="story.id">
          <StoryListItem
              :story
              @click="openStory(story)" />
          <Divider />
        </template>
      </template>

    </div>
  </div>
</template>


<script setup lang="ts">
import type {StoryWithoutSections} from "@/types/Story.types";
import {navigateToStoryPage} from "@/utils/Story.Utils";
import {MomentFormat} from "@/types/Core.Types";

const storyStore = useStoryStore();
const { allAvailableStories } = storeToRefs(storyStore);

await storyStore.fetchAllStories();

const filteredStories = computed((): StoryWithoutSections[] => {
  return allAvailableStories.value.filter((story) => {
    return story.title.toLowerCase().includes(searchInput.value);
  })
})

const searchInput = ref('');

const openStory = (story: StoryWithoutSections): void => {
  navigateToStoryPage(moment(story.scheduledAt).format(MomentFormat.DateUrl));
}
</script>