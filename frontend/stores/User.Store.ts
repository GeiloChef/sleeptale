import {defineStore} from "pinia";
import {User} from "@/types/classes/User.Class";
import {getAvailableLanguages, useStories} from "@/.nuxt/imports";
import type {StoryFavorites} from "@/types/Story.types";
import type {Story} from "@/types/classes/Story.Class";


export const useUserStore = defineStore('userStore', () => {
  const { fetchStoriesInBulk } = useStories();
  const user = ref(new User(getAvailableLanguages()[0]));

  const favoriteGenres = ref<number[]>([]);

  const favoriteStories = ref<StoryFavorites[]>([]);
  const favoriteStoriesList = ref<Story[]>([]);

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
    favoriteGenres,
    addStoryAsFavorite,
    removeStoryFromFavorites,
    fetchInfoForFavoriteStories
  }

}, {
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
    pick: ['user', 'favoriteStories', 'favoriteGenres'],
    serializer: {
      serialize: JSON.stringify,
      deserialize: (value: string) => {
        const parsed = JSON.parse(value);

        if (parsed.user) {
          parsed.user = Object.assign(new User(parsed.user.language), parsed.user);
          console.log(parsed.user)
        } else {
          parsed.user = Object.assign(new User(getAvailableLanguages()[0]), parsed.user)
          console.log(parsed.user)
        }

        return parsed;
      }
    }
  }
});