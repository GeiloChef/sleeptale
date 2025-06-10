import type {Story} from "@/types/classes/Story.Class";

export interface Section {
  id: number
  text: string
  imageUrl?: string | null
  order: number
  storyId: number
}

export interface StoryWithSections {
  id: number
  title: string
  description: string
  imageUrl?: string | null
  createdAt: string
  scheduledAt?: string | null
  ageGroup: AgeGroupTypes
  sections: Section[]
  genre: string;
}

export interface StorySearchQuery {
  query: string,
  genre: string[],
  ageGroup: string[],
  limit: number,
  cursor: number
}

export type StoryWithoutSections = Omit<StoryWithSections, 'sections'>;

export interface PaginatedStories {
  stories: Story[],
  cursor: number
}

export enum AgeGroupTypes {
  Kids = "KIDS",
  Teens = "TEENS",
  Adults = "ADULTS"
}

export interface StoryPageNavigationParams {
  date?: string;
  id?: string | number;
  ageGroup?: AgeGroupTypes
}

export interface StoryFavorites {
  id: string | number;
  addedAsFavoriteAt: number
}