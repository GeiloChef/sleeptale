// stores/Story.Store.ts
import { defineStore } from 'pinia'
import {useStories} from "@/.nuxt/imports";
import type {StoryDto} from "@/types/Story.types";
import {createDefaultStory} from "@/utils/Story.Utils";

export const useStoryStore = defineStore('storyStore', () => {
  const { getToday } = useStories();
  const selectedStory = ref<StoryDto>(createDefaultStory());

  const getStoryForToday = async () => {
    const fetchedStory = await getToday();
    selectedStory.value = fetchedStory;
  }

  return {
    selectedStory,
    getStoryForToday
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage(),
    pick: ['story'],
  }
});