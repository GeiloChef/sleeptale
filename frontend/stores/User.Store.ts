import {defineStore} from "pinia";
import {User} from "@/types/classes/User.Class";
import {getAvailableLanguages} from "@/.nuxt/imports";
import type {StoryFavorites} from "@/types/Story.types";


export const useUserStore = defineStore('userStore', () => {
  const user = ref(new User(getAvailableLanguages()[0]));
  const favoriteStories = ref<StoryFavorites[]>([]);
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

  return {
    user,
    favoriteStories,
    addStoryAsFavorite,
    removeStoryFromFavorites
  }

}, {
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage(),
    pick: ['user', 'favoriteStories'],
  }
});