import type {
  PaginatedStories,
  StoryPageNavigationParams,
  StorySearchQuery,
  StoryWithoutSections,
  StoryWithSections
} from "@/types/Story.types";
import {mapStoryApiToDomainWithSections} from "@/utils/mappers/Story.Mapper";
import {AgeGroupTypes} from "@/types/Story.types";

export const useStories = () => {
  const { locale } = useI18n()
  const apiBase = useRuntimeConfig().public.apiBase || 'http://localhost:4000';
  const getStoryByDate = async (date: string, ageGroup: AgeGroupTypes): Promise<StoryWithSections> => {
    const { data, error } = await useFetch(`${apiBase}/stories/by-date?date=${date}&age-group=${ageGroup}`, {
      headers: {
        'Accept-Language': locale.value,
      },
    });

    if (error.value) throw error.value
    return mapStoryApiToDomainWithSections(data.value as StoryWithSections);
  }

  const getStoryById = async (id: string | number): Promise<StoryWithSections> => {
    const { data, error } = await useFetch(`${apiBase}/stories/id/${id}`, {
      headers: {
        'Accept-Language': locale.value,
      },
    });

    if (error.value) throw error.value
    return mapStoryApiToDomainWithSections(data.value as StoryWithSections);
  }

  const getStory = async (routeParams: StoryPageNavigationParams): Promise<StoryWithSections> => {
    console.log(routeParams);
    if (routeParams.id) {
      return await getStoryById(routeParams.id)
    } else {
      return await getStoryByDate(routeParams.date, routeParams.ageGroup)
    }
  }

  const getAllAvailableStories = async (): Promise<StoryWithoutSections[]> => {
    const { data , error } = await useFetch<StoryWithoutSections[]>(`${apiBase}/stories/all`, {
      headers: {
        'Accept-Language': locale.value,
      },
    });

    if (error.value || !data.value) throw error.value
    return data.value;
  }

  const getByDate = async (date: string) => {
    const { data, error } = await useFetch(`/stories/by-date?date=${date}`, {
      headers: {
        'Accept-Language': locale.value,
      },
    });

    if (error.value) throw error.value
    return data.value
  }

  const getTextToSpeechForSection = async (storyId: number, sectionId: number): Promise<string> => {
    const { data, error } = await useFetch(`${apiBase}/tts/de/${storyId}/${sectionId}`, {
      headers: {
        'Accept-Language': locale.value,
      },
      method: 'POST'
    })
    if (error.value) throw error.value
    return data.value.url as string
  }

  const getStoriesForSearchQuery = async (searchQuery: StorySearchQuery): Promise<PaginatedStories> => {
    const { data, error } = await useFetch(`${apiBase}/stories/search`, {
      headers: {
        'Accept-Language': locale.value,
      },
      body: searchQuery,
      method: 'POST'
    })
    if (error.value) throw error.value
    return data.value as PaginatedStories
  }

  return {
    getByDate,
    getStoryByDate,
    getAllAvailableStories,
    getTextToSpeechForSection,
    getStoriesForSearchQuery,
    getStory
  }
}