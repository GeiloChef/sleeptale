import {defineStore} from "pinia";

export const useApplicationStore = defineStore('applicationStore', () => {
  const isMenuOpen = ref(false);

  const fontSize = ref(24);

  const increaseFontSize = (): void => {
    if (fontSize.value < 32) {
      fontSize.value = fontSize.value + 1
    }
  }

  const decreaseFontSize = (): void => {
    if (fontSize.value > 16) {
      fontSize.value = fontSize.value - 1
    }
  }

  return {
    isMenuOpen,
    fontSize,
    increaseFontSize,
    decreaseFontSize
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage(),
    pick: ['fontSize'],
  }
});