// stores/Story.Store.ts
import { defineStore } from 'pinia'

export const useStoryStore = defineStore('storyStore', () => {
  const story = ref('Test');

  return {
    story
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage(),
    pick: ['story'],
  }
});