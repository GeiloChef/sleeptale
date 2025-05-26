import { StoryAgeGroup, StoryGenre } from '../../story/types/story.types';

export const AGE_GROUP_PROMPTS: Record<string, string> = {
  [StoryAgeGroup.Kids]: `Erstelle eine kinderfreundliche Geschichte. Sie soll sich als Gute-Nacht-Geschichte eignen und beruhigend wirken.`,
  [StoryAgeGroup.Teens]: `Erstelle eine spannende Kurzgeschichte für Jugendliche. Die Geschichte darf fantasievoll oder nachdenklich sein.`,
  [StoryAgeGroup.Adults]: `Erstelle eine packende Kurzgeschichte für Erwachsene. Die Geschichte darf tiefgründig oder emotional sein.`,
};

export interface GeneratedStoryContent {
  title: string;
  description: string;
  sections: string[];
  ageGroup: StoryAgeGroup;
  genre: StoryGenre;
}
