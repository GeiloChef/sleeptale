import type {StoryDto} from "@/types/Story.types";
import {mapStoryApiToDomain} from "@/utils/mappers/Story.Mapper";

export const useStories = () => {
  const apiBase = useRuntimeConfig().public.apiBase || 'http://localhost:4000';
  const getToday = async (): Promise<StoryDto> => {
    const { data, error } = await useFetch(`${apiBase}/stories/today`);
    if (error.value) throw error.value
    return mapStoryApiToDomain(data.value as StoryDto);
  }

  const getByDate = async (date: string) => {
    const { data, error } = await useFetch(`/stories/by-date?date=${date}`)
    if (error.value) throw error.value
    return data.value
  }

  return { getToday, getByDate }
}