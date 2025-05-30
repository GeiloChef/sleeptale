import type {Dictionary} from "@/types/Core.Types";

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
  sections: Section[]
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
  stories: StoryWithoutSections[],
  cursor: number
}

export enum AgeGroupTypes {
  Kids = "KIDS",
  Teens = "TEENS",
  Adults = "ADULTS"
}
