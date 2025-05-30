import type {Genre} from "@/types/Genre.types";

export const useGenres = () => {
  const apiBase = useRuntimeConfig().public.apiBase || 'http://localhost:4000';
  const getAllGenres = async (): Promise<Genre[]> => {
    const { data, error } = await useFetch(`${apiBase}/genres`, {
    });

    if (error.value) throw error.value
    return data.value as Genre[];
  }

  return { getAllGenres }
}