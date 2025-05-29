<template>
  <div class="flex flex-col gap-8 px-4 w-full">
    <div class="flex flex-col gap-4">
      <IconField class="w-full">
        <InputIcon>
          <Icon icon="magnifying-glass"></Icon>
        </InputIcon>
        <InputText
            v-model="searchQuery.query"
            class="w-full"
            :placeholder="$t('search-story')"
            @input="onDebouncedInput"/>
      </IconField>
    </div>

    <div
        v-show="stories.length"
        class="flex flex-col gap-6">
      <div
          v-for="story in stories"
          :key="story.id"
          class="flex flex-col gap-2">
        <div class="rounded-xl overflow-hidden">
          <Image
              v-if="story.imageUrl"
              :src="imageUrl(story.imageUrl)" />
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-sm text-gray-400"> 10 min </span>
          <span class="font-bold">{{story.title}}</span>
          <span class="text-sm italic">{{story.description}}</span>
        </div>
      <divider/>
      </div>
    </div>

    <div
        v-show="!stories.length"
        class="flex flex-row justify-center items-center text-gray-400 font-semibold italic ">
      <span class="text-center w-2/3">{{$t('no-stories-for-search-term')}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">

import type {StorySearchQuery, StoryWithoutSections} from "@/types/Story.types";
import {imageUrl} from "@/utils/Image.Utils";

const storiesApi = useStories()

const searchQuery = ref<StorySearchQuery>({
  query: '',
  genre: [],
  ageGroup: [],
  limit: 100,
  cursor: 0
});

const stories = ref<StoryWithoutSections[]>([])
const isLoadingStories = ref(true);

const onDebouncedInput = useDebounce(() => {
  fetchStories(true);
}, 400);

const fetchStories = async (reset: boolean): Promise<void> => {
  isLoadingStories.value = true;

  const fetchedStories = await storiesApi.getStoriesForSearchQuery(searchQuery.value)
  stories.value = fetchedStories.stories
  isLoadingStories.value = false;
}

onMounted(async (): Promise<void> => {
  await fetchStories(false);
});
</script>