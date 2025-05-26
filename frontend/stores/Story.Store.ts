// stores/Story.Store.ts
import { defineStore } from 'pinia'
import {useStories} from "@/.nuxt/imports";
import type {StoryWithoutSections, StoryWithSections} from "@/types/Story.types";
import {createDefaultStory} from "@/utils/Story.Utils";
import type {Moment} from "moment";
import {MomentFormat} from "@/types/Core.Types";

export const useStoryStore = defineStore('storyStore', () => {
  const { getStoryByDate, getAllAvailableStories, getTextToSpeechForSection } = useStories();
  const selectedStory = ref<StoryWithSections>(createDefaultStory());
  const allAvailableStories = ref<StoryWithoutSections[]>([]);

  const storyOfTheDay = ref<StoryWithSections>(createDefaultStory());

  const fetchStoryByDate = async (date: Moment): Promise<StoryWithSections> => {
    return await getStoryByDate(date.format(MomentFormat.UrlParam));
  }
  const fetchStoryOfTheDay = async (): Promise<void> => {
    storyOfTheDay.value = await fetchStoryByDate(moment());
  }

  const fetchAllStories = async (): Promise<void> => {
    const fetchedStory = await getAllAvailableStories();
    allAvailableStories.value = fetchedStory;
  }

  const fetchTextToSpeechForStory = async (storyId: number, sectionId: number): Promise<string> => {
    const fetchedAudio = await getTextToSpeechForSection(storyId, sectionId)

    return fetchedAudio;
  }

  return {
    selectedStory,
    allAvailableStories,
    storyOfTheDay,
    fetchStoryByDate,
    fetchAllStories,
    fetchTextToSpeechForStory,
    fetchStoryOfTheDay
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage(),
    pick: ['story'],
  }
});