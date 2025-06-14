import { defineStore } from 'pinia'
import { useGenres } from "@/.nuxt/imports";
import type {Genre} from "@/types/Genre.types";
export const useGenreStore = defineStore('genreStore', () => {
  const { getAllGenres } = useGenres();

  const allAvailableGenres = ref<Genre[]>([]);

  const fetchAllAvailableGenres = async (): Promise<void> => {
    allAvailableGenres.value = await getAllGenres();
  }

  return {
    allAvailableGenres,
    fetchAllAvailableGenres
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
    pick: ['allAvailableGenres'],
  }
});