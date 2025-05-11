import {defineStore} from "pinia";

export const useStoryStore = defineStore('storyStore', () => {
  const isMenuOpen = ref(false);

  return {
    isMenuOpen
  }
});