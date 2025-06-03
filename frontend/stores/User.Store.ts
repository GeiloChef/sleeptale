import {defineStore} from "pinia";
import {User} from "@/types/classes/User.Class";
import {getAvailableLanguages} from "@/.nuxt/imports";

export const useUserStore = defineStore('userStore', () => {
  const user = ref(new User(getAvailableLanguages()[0]));

  return {
    user
  }

}, {
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage(),
    pick: ['user'],
  }
});