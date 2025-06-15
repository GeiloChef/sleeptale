// stores/Story.Store.ts
import { defineStore } from 'pinia'
import {useStories, useUserStore} from "@/.nuxt/imports";
import type {Moment} from "moment";
import {MomentFormat} from "@/types/Core.Types";
import {AgeGroupTypes, type FinishedStory, type StartedStory} from "@/types/Story.types";
import { Story } from "@/types/classes/Story.Class";

export const useStoryStore = defineStore('storyStore', () => {
  const {
    getStory,
    getAllAvailableStories,
    getTextToSpeechForSection,
    fetchStoriesInBulk,
    fetchSuggestedStories,
    getLatestStories
  } = useStories();
  const selectedStory = ref<Story>(new Story());
  const currentSectionIndex = ref<number>(0)

  const allAvailableStories = ref<Story[]>([]);

  const storyOfTheDay = ref<Story>(new Story());

  const startedStoriesList = ref<Story[]>([]);

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
  const finishedStories = ref<FinishedStory[]>([]);

  const markSectionOfStoryAsRead = (sectionIndex: number): void => {
    let startedStory: StartedStory | undefined = startedStories.value.find((startedStory) => startedStory.id === selectedStory.value.id)

    if (!startedStory) {
      startedStory = addStoryAsStarted(selectedStory.value)
    }

    if (!startedStory) {
      console.error('Could not create started story object');
      return;
    }

    const readSection = selectedStory.value.sections[sectionIndex];

    if (!startedStory.readStorySections.includes(readSection.id)) {
      startedStory.readStorySections.push(readSection.id);
    }

    if (startedStory.readStorySections.length === startedStory.sections) {
      addStoryAsFinished(selectedStory.value.id);
    }
  }

  const addStoryAsStarted = (story: Story): StartedStory | undefined => {
    const alreadyIsFinished = finishedStories.value.find((finishedStory) => finishedStory.id === story.id);

    if (alreadyIsFinished) return undefined;

    const newlyStartedStory: StartedStory = {
      id: story.id,
      sections: story.sections.length,
      readStorySections: [story.sections[0].id],
      startedAt: moment().valueOf()
    }

    startedStories.value.push(newlyStartedStory);

    return newlyStartedStory;
  }

  const addStoryAsFinished = (storyId: number): FinishedStory => {
    const newlyFinishedStory: FinishedStory = {
      id: storyId,
      finishedAt: moment().valueOf()
    }

    const alreadyIsFinished = finishedStories.value.find((finishedStory) => finishedStory.id === storyId);

    if (!alreadyIsFinished) {
      finishedStories.value.push(newlyFinishedStory);
    }

    startedStories.value = startedStories.value.filter((startedStory) => startedStory.id !== storyId);

    return newlyFinishedStory;
  }

  const fetchInfoForStartedStories = async (): Promise<void> => {
    const startedStoryIds = startedStories.value.flatMap((story) => story.id);

    if (startedStoryIds.length) {
      startedStoriesList.value = await fetchStoriesInBulk(startedStoryIds);
    }
  }

  const suggestedStories = ref<Story[]>([])

  const getSuggestedStories = async(): Promise<void> => {
    const userStore = useUserStore();
    const favoriteStoryIds = userStore.favoriteStories.flatMap((favoriteStory) => favoriteStory.id);
    const startedStoryIds =  startedStories.value.flatMap((startedStory) => startedStory.id);
    const finishedStoryIds = finishedStories.value.flatMap((finishedStory) => finishedStory.id);

    const storyIdsToExclude = favoriteStoryIds.concat(startedStoryIds).concat(finishedStoryIds) as number[];

    suggestedStories.value = await fetchSuggestedStories(
      userStore.user.getUserAgeGroup(),
      userStore.favoriteGenres,
      storyIdsToExclude
    )
  }

  const latestStories = ref<Story[]>([]);

  const fetchLatestStories = async(): Promise<void> => {
    latestStories.value = await getLatestStories();
  }

  return {
    selectedStory,
    allAvailableStories,
    storyOfTheDay,
    currentSectionIndex,
    startedStories,
    startedStoriesList,
    finishedStories,
    suggestedStories,
    latestStories,
    fetchStoryByDate,
    fetchAllStories,
    fetchTextToSpeechForStory,
    fetchStoryOfTheDay,
    setNewSectionIndex,
    addStoryAsStarted,
    fetchInfoForStartedStories,
    getSuggestedStories,
    fetchLatestStories
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
    pick: ['story', 'startedStories', 'finishedStories'],
  }
});