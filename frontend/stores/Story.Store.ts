// stores/Story.Store.ts
import { defineStore } from 'pinia'
import {useStories, useUserStore} from "@/.nuxt/imports";
import type {Moment} from "moment";
import {MomentFormat} from "@/types/Core.Types";
import {AgeGroupTypes, type StartedStory} from "@/types/Story.types";
import { Story } from "@/types/classes/Story.Class";

export const useStoryStore = defineStore('storyStore', () => {
  const { getStory, getAllAvailableStories, getTextToSpeechForSection } = useStories();
  const selectedStory = ref<Story>(new Story());
  const currentSectionIndex = ref<number>(0)

  const allAvailableStories = ref<Story[]>([]);

  const storyOfTheDay = ref<Story>(new Story());

  const fetchStoryByDate = async (date: Moment, ageGroup: AgeGroupTypes, id?: string | number): Promise<Story> => {
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
    markSectionOfStoryAsRead(index);
  }

  const startedStories = ref<StartedStory[]>([]);

  const markSectionOfStoryAsRead = (sectionIndex: number): void => {
    let startedStory: StartedStory | undefined = startedStories.value.find((startedStory) => startedStory.id === selectedStory.value.id)

    if (!startedStory) {
      startedStory = addStoryAsStarted(selectedStory.value)
    }

    const readSection = selectedStory.value.sections[sectionIndex];

    if (!startedStory.readStorySections.includes(readSection.id)) {
      startedStory.readStorySections.push(readSection.id);
    }
  }

  const addStoryAsStarted = (story: Story): StartedStory => {
    const newlyStartedStory: StartedStory = {
      id: story.id,
      sections: story.sections.length,
      readStorySections: [story.sections[0].id],
      startedAt: moment()
    }

    startedStories.value.push(newlyStartedStory);

    return newlyStartedStory;
  }

  return {
    selectedStory,
    allAvailableStories,
    storyOfTheDay,
    currentSectionIndex,
    startedStories,
    fetchStoryByDate,
    fetchAllStories,
    fetchTextToSpeechForStory,
    fetchStoryOfTheDay,
    setNewSectionIndex,
    addStoryAsStarted
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage(),
    pick: ['story', 'startedStories'],
  }
});