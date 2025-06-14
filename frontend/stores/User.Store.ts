import {defineStore} from "pinia";
import {User} from "@/types/classes/User.Class";
import {getAvailableLanguages, useStories} from "@/.nuxt/imports";
import type {StoryFavorites} from "@/types/Story.types";
import type {Story} from "@/types/classes/Story.Class";


export const useUserStore = defineStore('userStore', () => {
  const { fetchStoriesInBulk } = useStories();
  const user = ref(new User(getAvailableLanguages()[0]));
  const favoriteStories = ref<StoryFavorites[]>([]);
  const favoriteStoriesList = ref<Story[]>([]);
  const hydrateUser = (data: any): User => {
    return Object.assign(new User(data.language), data);
  }

  if (process.client && sessionStorage.getItem('userStore')) {
    try {
      const parsed = JSON.parse(sessionStorage.getItem('userStore')!);
      if (parsed.user) {
        user.value = hydrateUser(parsed.user);
      }
    } catch (e) {
      console.error('Failed to hydrate user from sessionStorage:', e);
    }
  }

  if (!user.value) {
    user.value = new User(getAvailableLanguages()[0]);
  }

  const addStoryAsFavorite = (storyId: string | number): void => {
    favoriteStories.value.push({
      id: storyId,
      addedAsFavoriteAt: moment()
    })
  }

  const removeStoryFromFavorites = (storyId: string | number): void => {
    favoriteStories.value = favoriteStories.value.filter((story) => story.id !== storyId);
  }

  const fetchInfoForFavoriteStories = async (): Promise<void> => {
    const favoriteStoryIds = favoriteStories.value.flatMap((story) => story.id) as number[];

    if (favoriteStoryIds.length) {
      favoriteStoriesList.value = await fetchStoriesInBulk(favoriteStoryIds);
    }
  }

  return {
    user,
    favoriteStories,
    favoriteStoriesList,
    addStoryAsFavorite,
    removeStoryFromFavorites,
    fetchInfoForFavoriteStories
  }

}, {
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
    pick: ['user', 'favoriteStories'],
  }
});