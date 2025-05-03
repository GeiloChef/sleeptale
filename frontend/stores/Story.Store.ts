// stores/Story.Store.ts
import { defineStore } from 'pinia'
import {useStories} from "@/.nuxt/imports";
import type {StoryDto} from "@/types/Story.types";
import {createDefaultStory} from "@/utils/Story.Utils";
import type {Moment} from "moment";

export const useStoryStore = defineStore('storyStore', () => {
  const { getToday, getStoryByDate } = useStories();
  const selectedStory = ref<StoryDto>(createDefaultStory());

  const getStoryForToday = async () => {
    const fetchedStory = await getToday();
    selectedStory.value = fetchedStory;
  }

  const fetchStoryByDate = async (date: Moment): Promise<any> => {
    const fetchedStory = await getStoryByDate(date.valueOf());
    selectedStory.value = fetchedStory;
  }

  return {
    selectedStory,
    getStoryForToday,
    fetchStoryByDate
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage(),
    pick: ['story'],
  }
});