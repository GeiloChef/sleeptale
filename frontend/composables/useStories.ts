import type {
  PaginatedStories,
  StoryPageNavigationParams,
  StorySearchQuery,
  StoryWithoutSections,
  StoryWithSections
} from "@/types/Story.types";
import {mapStoryApiToDomainWithSections} from "@/utils/mappers/Story.Mapper";
import {AgeGroupTypes} from "@/types/Story.types";
import { Story } from "@/types/classes/Story.Class";

export const useStories = () => {
  const { locale } = useI18n()
  const apiBase = useRuntimeConfig().public.apiBase || 'http://localhost:4000';
  const getStoryByDate = async (date: string, ageGroup: AgeGroupTypes): Promise<Story> => {
    const { data, error } = await useFetch(`${apiBase}/stories/by-date?date=${date}&age-group=${ageGroup}`, {
      headers: {
        'Accept-Language': locale.value,
      },
    });

    if (error.value) throw error.value

    const story = new Story();
    story.setValueFromStoryWithSections(data.value as StoryWithSections)

    return story;
  }

  const getStoryById = async (id: string | number): Promise<Story> => {
    const { data, error } = await useFetch(`${apiBase}/stories/id/${id}`, {
      headers: {
        'Accept-Language': locale.value,
      },
    });

    if (error.value) throw error.value

    const story = new Story();
    story.setValueFromStoryWithSections(data.value as StoryWithSections)

    return story;
  }

  const getStory = async (routeParams: StoryPageNavigationParams): Promise<StoryWithSections> => {
    if (routeParams.id) {
      return await getStoryById(routeParams.id)
    } else {
      return await getStoryByDate(routeParams.date, routeParams.ageGroup)
    }
  }

  const getAllAvailableStories = async (): Promise<Story[]> => {
    const { data , error } = await useFetch<StoryWithoutSections[]>(`${apiBase}/stories/all`, {
      headers: {
        'Accept-Language': locale.value,
      },
    });

    if (error.value || !data.value) throw error.value

    const stories: Story[] = [];

    (data.value as StoryWithSections[]).forEach((storyFromBackend) => {
      const story: Story = new Story();

      story.setValueFromStoryWithSections(storyFromBackend);

      stories.push(story);
    })

    return stories;
  }

  const getByDate = async (date: string): Promise<Story> => {
    const { data, error } = await useFetch(`/stories/by-date?date=${date}`, {
      headers: {
        'Accept-Language': locale.value,
      },
    });

    if (error.value) throw error.value

    const story = new Story();
    story.setValueFromStoryWithSections(data.value as StoryWithSections)

    return story;
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
    const paginatedStories = data.value as PaginatedStories;

    paginatedStories.stories = paginatedStories.stories.map((storyFromBackend) => {
      const story = new Story();
      story.setValueFromStoryWithSections(storyFromBackend);

      return story
    });

    return paginatedStories;
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