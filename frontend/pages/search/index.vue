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
            @input="onDebouncedQueryInput"/>
      </IconField>

      <div class="flex flex-row gap-4">
        <MultiSelect
            v-model="searchQuery.genre"
            :options="allAvailableGenres"
            optionLabel="label"
            optionValue="key"
            size="small"
            :placeholder="$t('select-genre')"
            class="w-full"
            @change="onDebouncedFilterChange">
            <template #chip="genreText">
              <div class="flex items-center">
                <div>{{ $t(`genre.${genreText.value}`) }}</div>
              </div>
            </template>
            <template #option="genre">
              <div class="flex items-center">
                <div>{{ $t(genre.option.label) }}</div>
              </div>
            </template>
        </MultiSelect>

        <MultiSelect
            v-model="searchQuery.ageGroup"
            :options="ageGroups"
            optionLabel="label"
            optionValue="value"
            size="small"
            :placeholder="$t('age-group')"
            class="w-full"
            @change="onDebouncedFilterChange">
          <template #chip="ageGroup">
            <div class="flex items-center">
              <div>{{ $t(`genre.${ageGroup.value}`) }}</div>
            </div>
          </template>
            <template #option="ageGroup">
              <div class="flex items-center">
                <div>{{ $t(ageGroup.option.label) }}</div>
              </div>
            </template>
        </MultiSelect>
      </div>
    </div>

    <div
        v-show="stories.length"
        class="flex flex-col gap-6">
      <div
          v-for="story in stories"
          :key="story.id"
          class="flex flex-col gap-2"
          @click="story.openStoryPage()">
        <div class="rounded-xl overflow-hidden">
          <Image
              v-if="story.imageUrl"
              :src="imageUrl(story.imageUrl)" />
        </div>
        <div class="flex flex-col gap-2">
          <span class="font-bold">{{story.title}}</span>
          <span class="text-sm italic">{{story.description}}</span>
        </div>

        <div class="flex flex-row gap-2 justify-start items-center right-4 bottom-2">
          <AgeGroupTag :age-group="story.ageGroup" />
          <GenreTag :genre-key="story.genre" />
        </div>
      <Divider/>
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
import { type StorySearchQuery } from "@/types/Story.types";
import { imageUrl } from "@/utils/Image.Utils";
import {debounce} from "lodash-es";
import {getAgeGroups} from "@/utils/Story.Utils";
import {MomentFormat} from "@/types/Core.Types";
import  {Story} from "@/types/classes/Story.Class";
import AgeGroupTag from "@/components/partials/AgeGroupTag.vue";
import GenreTag from "@/components/partials/GenreTag.vue";

const storiesApi = useStories();

const genreStore = useGenreStore();
const {allAvailableGenres} = storeToRefs(genreStore);

const searchQuery = ref<StorySearchQuery>({
  query: '',
  genre: [],
  ageGroup: [],
  limit: 100,
  cursor: 0
});

const stories = ref<Story[]>([])
const isLoadingStories = ref(true);

const ageGroups = getAgeGroups();

const debouncedFetchStories = debounce(() => {
  fetchStories(true);
}, 250);

const onDebouncedQueryInput = () => {
  debouncedFetchStories();
};

const onDebouncedFilterChange = () => {
  debouncedFetchStories();
};

const fetchStories = async (reset: boolean): Promise<void> => {
  isLoadingStories.value = true;
  const fetchedStories = await storiesApi.getStoriesForSearchQuery(searchQuery.value)
  stories.value = fetchedStories.stories;
  isLoadingStories.value = false;
}

onMounted(async (): Promise<void> => {
  await fetchStories(false);
});
</script>