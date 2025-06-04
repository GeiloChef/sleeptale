// stores/Story.Store.ts
import { defineStore } from 'pinia'
import {useStories, useUserStore} from "@/.nuxt/imports";
import type {StoryWithoutSections, StoryWithSections} from "@/types/Story.types";
import {createDefaultStory} from "@/utils/Story.Utils";
import type {Moment} from "moment";
import {MomentFormat} from "@/types/Core.Types";
import {AgeGroupTypes} from "@/types/Story.types";

export const useStoryStore = defineStore('storyStore', () => {
  const { getStory, getAllAvailableStories, getTextToSpeechForSection } = useStories();
  const selectedStory = ref<StoryWithSections>(createDefaultStory());
  const currentSectionIndex = ref<number>(0)

  const allAvailableStories = ref<StoryWithoutSections[]>([]);

  const storyOfTheDay = ref<StoryWithSections>(createDefaultStory());

  const fetchStoryByDate = async (date: Moment, ageGroup: AgeGroupTypes, id?: string | number): Promise<StoryWithSections> => {
    return await getStory({
      date: date.format(MomentFormat.UrlParam),
      ageGroup,
      id
    });
  }
  const fetchStoryOfTheDay = async (): Promise<void> => {
    const userStore = useUserStore();
    storyOfTheDay.value = await fetchStoryByDate(moment(), userStore.user.getUserAgeGroup());
  }

  const fetchAllStories = async (): Promise<void> => {
    const fetchedStory = await getAllAvailableStories();
    allAvailableStories.value = fetchedStory;
  }

  const fetchTextToSpeechForStory = async (storyId: number, sectionId: number): Promise<string> => {
    const fetchedAudio = await getTextToSpeechForSection(storyId, sectionId)

    return fetchedAudio;
  }

  const setNewSectionIndex = (index: number): void => {
    currentSectionIndex.value = index;
  }

  return {
    selectedStory,
    allAvailableStories,
    storyOfTheDay,
    currentSectionIndex,
    fetchStoryByDate,
    fetchAllStories,
    fetchTextToSpeechForStory,
    fetchStoryOfTheDay,
    setNewSectionIndex
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage(),
    pick: ['story'],
  }
});