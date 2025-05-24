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

  const fetchStoryByDate = async (date: Moment): Promise<void> => {
    const fetchedStory = await getStoryByDate(date.format(MomentFormat.UrlParam));
    selectedStory.value = fetchedStory;
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
    fetchStoryByDate,
    fetchAllStories,
    fetchTextToSpeechForStory
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage(),
    pick: ['story'],
  }
});