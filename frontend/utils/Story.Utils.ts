import type {Section, StoryPageNavigationParams, StoryWithSections} from "@/types/Story.types";
import type {Moment} from "moment";
import {type Dictionary, MomentFormat} from "@/types/Core.Types";
import {navigateByRouteName} from "@/utils/Navigation.Utils";
import {AgeGroupTypes} from "@/types/Story.types";

export const navigateToStoryPage = (navigationParams: StoryPageNavigationParams): void => {
  let query: Record<string, string | number | boolean | undefined> = {
    id: navigationParams.id,
    ageGroup: navigationParams.ageGroup,
    date: navigationParams.date
  };

  query = Object.fromEntries(
    Object.entries(query).filter(([_, value]) => value !== undefined)
  );

  navigateByRouteName('story-date', {}, query)
}

export const createDefaultStory = (): StoryWithSections => {
  return {
    createdAt: '1746223200000',
    sections: createDefaultSections(),
    description: 'Eine kleine Geschichte über den tapferen Teddybär, der sich aufmachte, um das Geheimnis des Waldes zu erkunden.',
    title: "Das Abenteuer der kleinen Eule Ella",
    scheduledAt: '1746136800000',
    id: 0
  }
}

export const createDefaultSections = (): Section[] => {
  return [
    {
      id: Math.random(),
      text: 'This is my second section',
      order: 1,
      storyId: 0
    },
    {
      id: Math.random(),
      text: 'This is my third section',
      order: 2,
      storyId: 0
    },
    {
      id: Math.random(),
      text: 'This is my first section',
      order: 0,
      storyId: 0
    },
    {
      id: Math.random(),
      text: 'This is my fourth section',
      order: 3,
      storyId: 0
    },
    {
      id: Math.random(),
      text: 'This is my fifth section',
      order: 4,
      storyId: 0
    },
  ]
};

export const getAgeGroups = (): Dictionary<AgeGroupTypes>[] => {
  return [
    {
      value: AgeGroupTypes.Kids,
      label: 'age-groups.kids'
    },
    {
      value: AgeGroupTypes.Teens,
      label: 'age-groups.teens'
    },
    {
      value: AgeGroupTypes.Adults,
      label: 'age-groups.adults'
    }
  ];
};