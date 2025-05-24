import type {StoryWithoutSections, StoryWithSections} from "@/types/Story.types";
import {mapStoryApiToDomainWithSections} from "@/utils/mappers/Story.Mapper";

export const useStories = () => {
  const apiBase = useRuntimeConfig().public.apiBase || 'http://localhost:4000';
  const getStoryByDate = async (date: string): Promise<StoryWithSections> => {
    const { data, error } = await useFetch(`${apiBase}/stories/by-date?date=${date}`);
    if (error.value) throw error.value
    return mapStoryApiToDomainWithSections(data.value as StoryWithSections);
  }

  const getAllAvailableStories = async (): Promise<StoryWithoutSections[]> => {
    const { data , error } = await useFetch<StoryWithoutSections[]>(`${apiBase}/stories/all`);
    if (error.value || !data.value) throw error.value
    return data.value;
  }

  const getByDate = async (date: string) => {
    const { data, error } = await useFetch(`/stories/by-date?date=${date}`)
    if (error.value) throw error.value
    return data.value
  }

  const getTextToSpeechForSection = async (storyId: number, sectionId: number): Promise<string> => {
    const { data, error } = await useFetch(`${apiBase}/tts/de/${storyId}/${sectionId}`, {
      method: 'POST'
    })
    if (error.value) throw error.value
    return data.value.url as string
  }

  return { getByDate, getStoryByDate, getAllAvailableStories, getTextToSpeechForSection }
}